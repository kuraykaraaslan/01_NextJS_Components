# Common Domain

Tüm dikey domainlerin paylaştığı temel tip şemaları ve cross-cutting bileşenler. Hiçbir domain vertical'ına özgü iş mantığı içermez; yalnızca evrensel yapı taşlarını sağlar.

---

## MVP Tanımı

**Common** domain'in amacı şunlardır:

1. **Tip tutarlılığı** — Tüm domain'lerin `Id`, `Money`, `Address`, `Status` gibi kavramlar için tek bir doğru kaynağı referans alması.
2. **Auth akışı** — Uygulama genelinde geçerli giriş, kayıt ve oturum yönetimi.
3. **Kullanıcı yönetimi** — Profil, tercihler ve rol tabanlı erişim kontrolü.
4. **Para ve ödeme** — Çok para birimli fiyat gösterimi ve ödeme durumu takibi.
5. **Adres ve konum** — Form doldurma ve görüntüleme için standart adres/konum yapısı.
6. **i18n** — Dil seçimi ve RTL/LTR yön desteği.

MVP, kimlik doğrulaması gerektiren her uygulamada sıfırdan yazılmak zorunda kalınan bileşenleri kapsayacaktır.

---

## Dosya Yapısı

```
modules/domains/common/
├── types.ts           ← Temel primitifler, User, Auth şemaları
├── BaseTypes.ts       ← Ek primitifler, Url, Visibility, ProcessingStatus
├── AddressTypes.ts    ← Address (LocationSchema'yı genişletir)
├── LocationTypes.ts   ← GeoPoint, Location
├── MoneyTypes.ts      ← Money, PriceFields, OrderTotals, Currency
├── DiscountTypes.ts   ← DiscountType, CouponBase
├── PaymentTypes.ts    ← PaymentStatus, PaymentMethod, PaymentBase
├── SeoTypes.ts        ← SeoFields
├── StatusTypes.ts     ← PublishStatus, Visibility, ProcessingStatus
├── I18nTypes.ts       ← AppLanguage, RTL yardımcıları, bayrak/isim eşlemleri
└── README.md
```

---

## Tip Şemaları Özeti

### Temel Primitifler (`types.ts`, `BaseTypes.ts`)

| Şema / Enum | Açıklama |
|---|---|
| `IdSchema` | `string` — boş olamaz |
| `UuidSchema` | RFC-4122 UUID |
| `SlugSchema` | `kebab-case` slug |
| `DateSchema` | Coerce edilmiş Date |
| `EmailSchema` | RFC e-posta |
| `PasswordSchema` | Min 8 karakter |
| `BaseEntitySchema` | `createdAt`, `updatedAt`, `deletedAt` |
| `SortOrderEnum` | `asc \| desc` |
| `StatusEnum` | `ACTIVE \| INACTIVE \| DRAFT \| PUBLISHED \| ARCHIVED` |
| `PaginationSchema` | `page`, `limit` (max 100) |
| `ApiSuccessSchema` | `{ success: true, message? }` |
| `ApiErrorSchema` | `{ success: false, message, code?, errors? }` |
| `VisibilityEnum` | `PUBLIC \| PRIVATE \| UNLISTED` |
| `ProcessingStatusEnum` | `UPLOADING \| PROCESSING \| READY \| FAILED` |

### Kullanıcı (`types.ts`)

| Şema / Enum | Açıklama |
|---|---|
| `UserSchema` | Tam kullanıcı (password dahil) |
| `SafeUserSchema` | `UserSchema` — password omit edilmiş |
| `UserRoleEnum` | `ADMIN \| AUTHOR \| USER` |
| `UserStatusEnum` | `ACTIVE \| INACTIVE \| BANNED` |
| `UserPreferencesSchema` | Tema, dil, bildirimler, timezone |
| `UserProfileSchema` | name, username, biography, profilePicture |
| `ThemeEnum` | `LIGHT \| DARK \| SYSTEM` |

### Auth (`types.ts`)

| Şema | Açıklama |
|---|---|
| `LoginRequestSchema` | email + password |
| `RegisterRequestSchema` | email + password + confirmPassword (refinement) |
| `ChangePasswordSchema` | currentPassword + newPassword + confirmPassword |
| `AuthSessionSchema` | sessionId, token, refreshToken, expiresAt |
| `AuthResponseSchema` | success, token, refreshToken, SafeUser |
| `OAuthProviderEnum` | `GOOGLE \| GITHUB \| DISCORD \| MICROSOFT` |
| `OAuthCallbackSchema` | code, state, provider |

### Para & Fiyat (`MoneyTypes.ts`)

| Şema | Açıklama |
|---|---|
| `CurrencySchema` | 3 harfli ISO kodu, varsayılan `TRY` |
| `MoneySchema` | amount + currency |
| `PriceFieldsSchema` | price + currency |
| `OrderTotalsSchema` | subtotal, discountTotal, taxTotal, serviceFee, shippingTotal, deliveryFee, total |

### İndirim (`DiscountTypes.ts`)

| Şema / Enum | Açıklama |
|---|---|
| `DiscountTypeEnum` | `PERCENTAGE \| FIXED \| FREE_SHIPPING` |
| `CouponBaseSchema` | code, discountType, discountValue, maxUsage, validFrom/Until, isActive |

### Ödeme (`PaymentTypes.ts`)

| Şema / Enum | Açıklama |
|---|---|
| `PaymentStatusEnum` | `PENDING \| AUTHORIZED \| PAID \| FAILED \| CANCELLED \| REFUNDED` |
| `PaymentMethodEnum` | `CREDIT_CARD \| DEBIT_CARD \| BANK_TRANSFER \| CASH \| WALLET \| CRYPTO` |
| `PaymentBaseSchema` | paymentId, provider, method, status, amount, currency |

### Konum & Adres

| Şema | Dosya | Açıklama |
|---|---|---|
| `GeoPointSchema` | `LocationTypes.ts` | latitude + longitude |
| `LocationSchema` | `LocationTypes.ts` | city, state, country, countryCode, postalCode, lat/lng |
| `AddressSchema` | `AddressTypes.ts` | LocationSchema + addressLine1/2, fullName, phone |

### SEO (`SeoTypes.ts`)

| Şema | Açıklama |
|---|---|
| `SeoFieldsSchema` | seoTitle, seoDescription, keywords |

### Durum (`StatusTypes.ts`)

| Enum | Açıklama |
|---|---|
| `PublishStatusEnum` | `DRAFT \| PUBLISHED \| ARCHIVED` |
| `VisibilityEnum` | `PUBLIC \| PRIVATE \| UNLISTED` (re-export) |
| `ProcessingStatusEnum` | `UPLOADING \| PROCESSING \| READY \| FAILED` (re-export) |

### i18n (`I18nTypes.ts`)

| Export | Açıklama |
|---|---|
| `AppLanguageEnum` | `.env` `NEXT_PUBLIC_I18N_LANGUAGES`'dan türetilir, fallback `en` |
| `AVAILABLE_LANGUAGES` | Aktif dil listesi |
| `DEFAULT_LANGUAGE` | İlk dil |
| `isRTL(lang)` | RTL kontrolü (ar, he, fa, ur) |
| `getDirection(lang)` | `'rtl' \| 'ltr'` |
| `getLanguageName(lang)` | ISO 639-1 tam ad |
| `getLangFlag(lang)` | Emoji bayrak |
| `getLangFlagUrl(lang)` | flagcdn.com URL |
| `getOgLocale(lang)` | Open Graph locale (`en_US`) |

---

## Mevcut Bileşenler

> Bu domain henüz React bileşeni içermemektedir. Tüm dosyalar tip şeması tanımlarından oluşmaktadır.

---

## Gerekli Bileşenler

Aşağıdaki bileşenler `modules/domains/common/` altında oluşturulmalıdır. Her bileşen `modules/ui/` atomlarını compose eder; kendi içinde `fetch` veya routing barındırmaz.

### Auth

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `LoginForm` | `auth/LoginForm.tsx` | `LoginRequest` | E-posta + şifre formu, "Beni hatırla" seçeneği |
| `RegisterForm` | `auth/RegisterForm.tsx` | `RegisterRequest` | Kayıt formu, gerçek zamanlı şifre eşleşme doğrulaması |
| `ChangePasswordForm` | `auth/ChangePasswordForm.tsx` | `ChangePassword` | Mevcut + yeni şifre, confirmPassword |
| `OAuthButtons` | `auth/OAuthButtons.tsx` | `OAuthProviderEnum` | Google, GitHub, Discord, Microsoft butonları |
| `ForgotPasswordForm` | `auth/ForgotPasswordForm.tsx` | `EmailSchema` | E-posta gönder akışı |
| `SessionExpiredBanner` | `auth/SessionExpiredBanner.tsx` | `AuthSession` | Oturum süresi dolduğunda uyarı |

### Kullanıcı

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `UserAvatar` | `user/UserAvatar.tsx` | `SafeUser` | Profil resmi, yoksa baş harf fallback |
| `UserProfileCard` | `user/UserProfileCard.tsx` | `SafeUser` | Ad, kullanıcı adı, biyografi, avatar |
| `UserProfileForm` | `user/UserProfileForm.tsx` | `UserProfile` | Profil düzenleme formu |
| `UserPreferencesForm` | `user/UserPreferencesForm.tsx` | `UserPreferences` | Tema, dil, bildirim, timezone |
| `UserRoleBadge` | `user/UserRoleBadge.tsx` | `UserRole` | ADMIN / AUTHOR / USER rozeti |
| `UserStatusBadge` | `user/UserStatusBadge.tsx` | `UserStatus` | ACTIVE / INACTIVE / BANNED rozeti |
| `UserMenu` | `user/UserMenu.tsx` | `SafeUser` | Avatar + dropdown: profil, tercihler, çıkış |

### Para & Fiyat

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `PriceDisplay` | `money/PriceDisplay.tsx` | `Money`, `PriceFields` | Para birimi sembollü biçimlendirilmiş fiyat |
| `OrderTotalsCard` | `money/OrderTotalsCard.tsx` | `OrderTotals` | Sepet/sipariş özeti: ara toplam, indirim, vergi, kargo, genel toplam |
| `CurrencySelector` | `money/CurrencySelector.tsx` | `CurrencySchema` | Para birimi seçici dropdown |

### İndirim & Kupon

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `CouponInput` | `discount/CouponInput.tsx` | `CouponBase` | Kupon kodu giriş + uygula butonu |
| `DiscountBadge` | `discount/DiscountBadge.tsx` | `DiscountType` | `%10`, `50 TRY`, `Ücretsiz Kargo` rozeti |

### Ödeme

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `PaymentMethodSelector` | `payment/PaymentMethodSelector.tsx` | `PaymentMethodEnum` | Kart, havale, nakit, cüzdan seçici |
| `PaymentStatusBadge` | `payment/PaymentStatusBadge.tsx` | `PaymentStatus` | PENDING / PAID / FAILED vb. renkli rozet |
| `PaymentSummaryCard` | `payment/PaymentSummaryCard.tsx` | `PaymentBase` | Ödeme detayı: sağlayıcı, tutar, durum |

### Adres & Konum

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `AddressForm` | `address/AddressForm.tsx` | `Address` | Satır1/2, şehir, ülke, posta kodu, telefon |
| `AddressCard` | `address/AddressCard.tsx` | `Address` | Salt okunur adres gösterimi |
| `AddressSelector` | `address/AddressSelector.tsx` | `Address[]` | Kayıtlı adreslerden seçim + yeni ekle |
| `LocationPicker` | `location/LocationPicker.tsx` | `Location` | Şehir / ülke seçici |
| `GeoPointDisplay` | `location/GeoPointDisplay.tsx` | `GeoPoint` | Enlem/boylam gösterimi, harita linki |

### SEO

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `SeoForm` | `seo/SeoForm.tsx` | `SeoFields` | Başlık, açıklama, anahtar kelimeler editörü |
| `SeoPreview` | `seo/SeoPreview.tsx` | `SeoFields` | Google arama sonucu önizlemesi |

### Durum

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `PublishStatusBadge` | `status/PublishStatusBadge.tsx` | `PublishStatus` | DRAFT / PUBLISHED / ARCHIVED rozeti |
| `VisibilityBadge` | `status/VisibilityBadge.tsx` | `Visibility` | PUBLIC / PRIVATE / UNLISTED rozeti |
| `ProcessingStatusIndicator` | `status/ProcessingStatusIndicator.tsx` | `ProcessingStatus` | Upload → Processing → Ready / Failed adım göstergesi |

### i18n

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `LanguageSwitcher` | `i18n/LanguageSwitcher.tsx` | `AppLanguage`, `LANG_FLAGS`, `LANG_NAMES` | Dropdown: bayrak + dil adı |
| `DirectionProvider` | `i18n/DirectionProvider.tsx` | `AppLanguage`, `getDirection` | `dir` attribute'lu RTL/LTR sarmalayıcı |

---

## Bileşen Öncelik Sırası

| Öncelik | Bileşenler |
|---|---|
| P0 — Blokör | `LoginForm`, `RegisterForm`, `UserAvatar`, `UserMenu`, `PriceDisplay`, `PaymentStatusBadge` |
| P1 — Çekirdek | `OAuthButtons`, `AddressForm`, `AddressCard`, `OrderTotalsCard`, `PublishStatusBadge`, `LanguageSwitcher` |
| P2 — Destekleyici | `ChangePasswordForm`, `UserProfileCard`, `UserProfileForm`, `UserPreferencesForm`, `CouponInput`, `DiscountBadge`, `PaymentMethodSelector` |
| P3 — Tamamlayıcı | `ForgotPasswordForm`, `SessionExpiredBanner`, `SeoForm`, `SeoPreview`, `GeoPointDisplay`, `LocationPicker`, `DirectionProvider`, `ProcessingStatusIndicator` |
