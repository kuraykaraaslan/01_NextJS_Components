# Common Domain — Geliştirme Planı

## Klasör Yapısı

```
modules/domains/common/
├── auth/          ← Giriş, kayıt, şifre, OAuth
├── user/          ← Avatar, profil, menü, rol/durum rozetleri
├── money/         ← Fiyat gösterimi, sipariş toplamları, para birimi
├── discount/      ← Kupon girişi, indirim rozeti
├── payment/       ← Ödeme yöntemi, durum rozeti, özet kart
├── address/       ← Adres formu, kart, seçici
├── location/      ← Konum seçici, geo nokta
├── seo/           ← SEO formu, önizleme
├── status/        ← Yayın durumu, görünürlük, işlem durumu
└── i18n/          ← Dil değiştirici, RTL yön sağlayıcı
```

---

## Öncelik Sırası

### P0 — Blokör (önce tamamlanacak)

| Bileşen | Dosya | Durum |
|---|---|---|
| `LoginForm` | `auth/LoginForm.tsx` | ✅ |
| `RegisterForm` | `auth/RegisterForm.tsx` | ✅ |
| `OAuthButtons` | `auth/OAuthButtons.tsx` | ✅ |
| `UserAvatar` | `user/UserAvatar.tsx` | ✅ |
| `UserRoleBadge` | `user/UserRoleBadge.tsx` | ✅ |
| `UserStatusBadge` | `user/UserStatusBadge.tsx` | ✅ |
| `UserMenu` | `user/UserMenu.tsx` | ✅ |
| `PriceDisplay` | `money/PriceDisplay.tsx` | ✅ |
| `PaymentStatusBadge` | `payment/PaymentStatusBadge.tsx` | ✅ |

### P1 — Çekirdek

| Bileşen | Dosya | Durum |
|---|---|---|
| `AddressForm` | `address/AddressForm.tsx` |  |
| `AddressCard` | `address/AddressCard.tsx` |  |
| `OrderTotalsCard` | `money/OrderTotalsCard.tsx` |  |
| `PublishStatusBadge` | `status/PublishStatusBadge.tsx` |  |
| `VisibilityBadge` | `status/VisibilityBadge.tsx` |  |
| `LanguageSwitcher` | `i18n/LanguageSwitcher.tsx` |  |

### P2 — Destekleyici

| Bileşen | Dosya | Durum |
|---|---|---|
| `ChangePasswordForm` | `auth/ChangePasswordForm.tsx` |  |
| `UserProfileCard` | `user/UserProfileCard.tsx` |  |
| `UserProfileForm` | `user/UserProfileForm.tsx` |  |
| `UserPreferencesForm` | `user/UserPreferencesForm.tsx` |  |
| `CouponInput` | `discount/CouponInput.tsx` |  |
| `DiscountBadge` | `discount/DiscountBadge.tsx` |  |
| `PaymentMethodSelector` | `payment/PaymentMethodSelector.tsx` |  |
| `PaymentSummaryCard` | `payment/PaymentSummaryCard.tsx` |  |

### P3 — Tamamlayıcı

| Bileşen | Dosya | Durum |
|---|---|---|
| `ForgotPasswordForm` | `auth/ForgotPasswordForm.tsx` |  |
| `SessionExpiredBanner` | `auth/SessionExpiredBanner.tsx` |  |
| `SeoForm` | `seo/SeoForm.tsx` |  |
| `SeoPreview` | `seo/SeoPreview.tsx` |  |
| `AddressSelector` | `address/AddressSelector.tsx` |  |
| `LocationPicker` | `location/LocationPicker.tsx` |  |
| `GeoPointDisplay` | `location/GeoPointDisplay.tsx` |  |
| `ProcessingStatusIndicator` | `status/ProcessingStatusIndicator.tsx` |  |
| `CurrencySelector` | `money/CurrencySelector.tsx` |  |
| `DirectionProvider` | `i18n/DirectionProvider.tsx` |  |

---

## Kararlar

- **`modules/app/UserMenu.tsx`** → Domain versiyonu `common/user/UserMenu.tsx` olarak yeniden yazılıyor; app katmanındaki değiştirilmiyor.
- **`modules/app/LanguageSwitcher.tsx`** → Domain versiyonu `common/i18n/LanguageSwitcher.tsx` olarak `I18nTypes` kullanarak yazılıyor.
- Tüm bileşenler `modules/ui/` atomlarını compose eder; kendi içlerinde fetch/routing içermez.
- Form bileşenleri controlled input pattern kullanır; validasyon mesajları `Input` bileşeninin `error` prop'u ile gösterilir.
