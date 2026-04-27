# Blog Domain

Çok dilli, seri destekli, yorum ve beğeni sistemi içeren blog platformu. `PostWithData`, `Category`, `Comment`, `PostSeries` ve `PostLike` tiplerini kullanır; kullanıcı kimliği yönetimini `common` domain'ine bırakır.

---

## MVP Tanımı

Blog domain'inin MVP kapsamı:

1. **İçerik yönetimi** — Post oluşturma, düzenleme, yayınlama, arşivleme ve zamanlama (`PostStatusEnum`: `DRAFT | PUBLISHED | ARCHIVED | SCHEDULED`).
2. **Kategori sistemi** — Kategori oluşturma/düzenleme ve post'ları kategoriye göre filtreleme.
3. **Çok dil desteği** — `PostTranslation` ve `CategoryTranslation` ile per-lang içerik; `AppLanguageEnum` tarafından yönetilir.
4. **Seri (series) yönetimi** — Birden fazla postu sıralı bir seri altında toplama; okuyuculara seri içi navigasyon sunma.
5. **Yorum moderasyonu** — Kullanıcı yorumları `NOT_PUBLISHED → PUBLISHED | SPAM` akışıyla; iç içe (nested) yorum desteği (`parentId`).
6. **Beğeni (like) sistemi** — Oturumsuz (IP + fingerprint) ve oturumlu beğeni kaydı.
7. **SEO** — Post ve kategori düzeyinde `seoTitle`, `seoDescription`, `keywords`; `common/seo` bileşenleri kullanılır.
8. **Yazar profili** — `SafeUser.userProfile` üzerinden yazar adı, biyografi ve avatar gösterimi; `common/user` bileşenleri kullanılır.

---

## Dosya Yapısı

```
modules/domains/blog/
├── types.ts                     ← Tüm Zod şemaları ve TypeScript tipleri
│
├── post/
│   ├── PostCard.tsx             ← Liste kartı (görsel, başlık, açıklama, meta)
│   ├── PostHero.tsx             ← Öne çıkan / hero post
│   ├── PostContent.tsx          ← HTML içerik renderer
│   ├── PostMeta.tsx             ← Yazar · tarih · okuma süresi · görüntülenme
│   ├── PostStatusBadge.tsx      ← DRAFT | PUBLISHED | ARCHIVED | SCHEDULED rozeti
│   ├── PostLikeButton.tsx       ← Beğeni butonu + sayacı
│   ├── PostViewCounter.tsx      ← Görüntülenme sayısı gösterimi
│   ├── PostGrid.tsx             ← Kart grid düzeni
│   ├── PostList.tsx             ← Liste düzeni
│   ├── PostForm.tsx             ← Oluştur / düzenle formu (yönetici)
│   └── PostStatusControl.tsx   ← Yayınla / taslağa al / zamanla kontrolü
│
├── category/
│   ├── CategoryBadge.tsx        ← Küçük kategori etiketi / pill
│   ├── CategoryCard.tsx         ← Kategori liste kartı
│   ├── CategoryList.tsx         ← Kategori listesi (sidebar / filtreleme)
│   └── CategoryForm.tsx         ← Oluştur / düzenle formu (yönetici)
│
├── author/
│   └── PostAuthorCard.tsx       ← Yazar bilgi kartı (avatar + biyografi)
│
├── comment/
│   ├── CommentList.tsx          ← Yorum listesi (iç içe destekli)
│   ├── CommentItem.tsx          ← Tekil yorum: ad, tarih, içerik, cevapla
│   ├── CommentForm.tsx          ← Yorum gönderme formu (name, email, content)
│   ├── CommentStatusBadge.tsx   ← NOT_PUBLISHED | PUBLISHED | SPAM rozeti
│   └── CommentModerationList.tsx ← Yönetici moderasyon paneli
│
├── series/
│   ├── PostSeriesCard.tsx       ← Seri bilgi kartı (başlık, açıklama, giriş listesi)
│   ├── PostSeriesNav.tsx        ← Serideki önceki / sonraki post navigasyonu
│   └── SeriesForm.tsx           ← Oluştur / düzenle + giriş sıralama (yönetici)
│
└── translation/
    └── PostTranslationForm.tsx  ← Dil başına çeviri formu (yönetici)
```

---

## Tip Şemaları Özeti

### Enum'lar

| Enum | Değerler | Kaynak |
|---|---|---|
| `PostStatusEnum` | `DRAFT \| PUBLISHED \| ARCHIVED \| SCHEDULED` | `blog/types.ts` |
| `CommentStatusEnum` | `NOT_PUBLISHED \| PUBLISHED \| SPAM` | `blog/types.ts` |
| `AppLanguageEnum` | `.env NEXT_PUBLIC_I18N_LANGUAGES` (fallback `en`) | `common/I18nTypes.ts` |

### Post

| Şema | Alan adları | Notlar |
|---|---|---|
| `PostSchema` | `postId`, `title`, `content`, `authorId`, `description`, `slug`, `keywords`, `seoTitle`, `seoDescription`, `categoryId`, `image`, `status`, `views`, `createdAt`, `updatedAt`, `publishedAt`, `deletedAt` | `status` varsayılan `DRAFT`; `views` ≥ 0 |
| `PostWithDataSchema` | `PostSchema` + `author` (userId, userProfile), `category`, `translations?`, `seriesEntry?` | Listing ve detail sayfaları bu tipi kullanır |
| `PostTranslationSchema` | `id`, `postId`, `lang`, `title`, `content`, `description`, `slug` | Per-dil içerik |

### Category

| Şema | Alan adları |
|---|---|
| `CategorySchema` | `categoryId`, `title`, `description`, `slug`, `image`, `keywords`, `seoTitle`, `seoDescription`, `createdAt`, `updatedAt`, `deletedAt` |
| `CategoryTranslationSchema` | `id`, `categoryId`, `lang`, `title`, `description`, `slug` |

### Comment

| Şema | Alan adları | Notlar |
|---|---|---|
| `CommentSchema` | `commentId`, `content`, `postId`, `parentId`, `email`, `name`, `status`, `createdAt`, `deletedAt` | `parentId` nullable → nested yorumlar |
| `CommentWithDataSchema` | `CommentSchema` + `post` (postId, title, slug) | Moderasyon paneli için |

### Series

| Şema | Alan adları |
|---|---|
| `PostSeriesSchema` | `id`, `title`, `slug`, `description`, `image`, `createdAt`, `updatedAt`, `deletedAt`, `entries` |
| `SeriesEntrySchema` | `id`, `order`, `postId`, `seriesId`, `post` (SeriesPostStub) |
| `PostSeriesRefSchema` | `order`, `seriesId`, `series` |
| `SeriesPostStubSchema` | `postId`, `title`, `slug`, `status`, `category.slug` |

### Like

| Şema | Alan adları | Notlar |
|---|---|---|
| `PostLikeSchema` | `postLikeId`, `postId`, `userId?`, `ipAddress?`, `deviceFingerprint?`, `createdAt` | `userId` nullable → oturumsuz beğeni |

---

## Mevcut Bileşenler

> Bu domain henüz React bileşeni içermemektedir. Yalnızca `types.ts` tip şema dosyası mevcuttur.

---

## Gerekli Bileşenler

### Post

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `PostCard` | `post/PostCard.tsx` | `PostWithData` | Liste kartı: görsel, başlık, açıklama, kategori, yazar, tarih, views |
| `PostHero` | `post/PostHero.tsx` | `PostWithData` | Öne çıkan büyük hero kartı |
| `PostContent` | `post/PostContent.tsx` | `Post.content` | HTML / Markdown içerik render alanı |
| `PostMeta` | `post/PostMeta.tsx` | `PostWithData` | Yazar · tarih · tahmini okuma süresi · views sayacı |
| `PostStatusBadge` | `post/PostStatusBadge.tsx` | `PostStatus` | `DRAFT` / `PUBLISHED` / `ARCHIVED` / `SCHEDULED` renkli rozeti |
| `PostLikeButton` | `post/PostLikeButton.tsx` | `PostLike` | Beğeni ikon butonu, sayaç, aktif/pasif durumu |
| `PostViewCounter` | `post/PostViewCounter.tsx` | `Post.views` | Görüntülenme sayısı gösterimi |
| `PostGrid` | `post/PostGrid.tsx` | `PostWithData[]` | Responsive kart grid düzeni |
| `PostList` | `post/PostList.tsx` | `PostWithData[]` | Yatay liste düzeni |
| `PostForm` | `post/PostForm.tsx` | `Post`, `PostWithData`, `SeoFields` | Oluştur/düzenle: başlık, slug, içerik, kategori, görsel, SEO, durum, zamanlama |
| `PostStatusControl` | `post/PostStatusControl.tsx` | `PostStatus` | Yayınla / taslağa al / arşivle / zamanla buton grubu |

### Category

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `CategoryBadge` | `category/CategoryBadge.tsx` | `Category` | Küçük kategori pill / etiket |
| `CategoryCard` | `category/CategoryCard.tsx` | `Category` | Kategori görsel kartı (görsel, başlık, açıklama) |
| `CategoryList` | `category/CategoryList.tsx` | `Category[]` | Sidebar veya filtreleme için kategori listesi |
| `CategoryForm` | `category/CategoryForm.tsx` | `Category`, `SeoFields` | Oluştur/düzenle: başlık, slug, görsel, açıklama, SEO |

### Yazar

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `PostAuthorCard` | `author/PostAuthorCard.tsx` | `SafeUser` (userProfile) | Yazar kartı: avatar, ad, biyografi, varsa kullanıcı adı |

### Yorum

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `CommentList` | `comment/CommentList.tsx` | `Comment[]` | Düz ve iç içe (parentId) yorum listesi |
| `CommentItem` | `comment/CommentItem.tsx` | `Comment` | Tekil yorum: ad, tarih, içerik, cevapla butonu |
| `CommentForm` | `comment/CommentForm.tsx` | `CommentSchema` | Ad, e-posta, içerik giriş formu; `parentId` desteği |
| `CommentStatusBadge` | `comment/CommentStatusBadge.tsx` | `CommentStatus` | `NOT_PUBLISHED` / `PUBLISHED` / `SPAM` rozeti |
| `CommentModerationList` | `comment/CommentModerationList.tsx` | `CommentWithData[]` | Yönetici: onayla / spam / sil aksiyonları |

### Seri (Series)

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `PostSeriesCard` | `series/PostSeriesCard.tsx` | `PostSeries` | Seri başlık, açıklama, giriş listesi (tıklanabilir) |
| `PostSeriesNav` | `series/PostSeriesNav.tsx` | `PostSeriesRef`, `SeriesEntry[]` | Serideki önceki / sonraki bağlantılar + seri adı |
| `SeriesForm` | `series/SeriesForm.tsx` | `PostSeries`, `SeriesEntry[]` | Oluştur/düzenle + sürükle-bırak giriş sıralama |

### Çeviri (Translation)

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---|---|---|---|
| `PostTranslationForm` | `translation/PostTranslationForm.tsx` | `PostTranslation`, `AppLanguage` | Dil sekmeli çeviri formu: başlık, slug, açıklama, içerik |

---

## Common Domain'den Kullanılan Bileşenler

Blog domain'i aşağıdaki `common` bileşenlerini doğrudan compose eder; bunları yeniden yazmaz.

| Common Bileşen | Nereden | Kullanım Yeri |
|---|---|---|
| `UserAvatar` | `common/user/UserAvatar.tsx` | `PostMeta`, `PostAuthorCard`, `CommentItem` — yazar/yorum sahibi avatarı |
| `UserProfileCard` | `common/user/UserProfileCard.tsx` | `PostAuthorCard` — genişletilmiş yazar bilgisi |
| `PublishStatusBadge` | `common/status/PublishStatusBadge.tsx` | `PostStatusBadge` için baz; `SCHEDULED` ek değeri blog kendi rozeti olarak ekler |
| `SeoForm` | `common/seo/SeoForm.tsx` | `PostForm`, `CategoryForm` — SEO alanları editörü |
| `SeoPreview` | `common/seo/SeoPreview.tsx` | `PostForm`, `CategoryForm` — Google önizlemesi |
| `LanguageSwitcher` | `common/i18n/LanguageSwitcher.tsx` | `PostTranslationForm` — aktif dil seçimi |
| `DirectionProvider` | `common/i18n/DirectionProvider.tsx` | Çeviri içerik alanının RTL/LTR yönünü sarmalar |

---

## Bileşen Öncelik Sırası

| Öncelik | Bileşenler |
|---|---|
| P0 — Blokör | `PostCard`, `PostContent`, `PostMeta`, `PostStatusBadge`, `CategoryBadge`, `CommentList`, `CommentForm` |
| P1 — Çekirdek | `PostHero`, `PostGrid`, `PostList`, `CategoryCard`, `CategoryList`, `PostAuthorCard`, `PostLikeButton`, `CommentItem` |
| P2 — Yönetici | `PostForm`, `PostStatusControl`, `CategoryForm`, `CommentStatusBadge`, `CommentModerationList` |
| P3 — Seri & i18n | `PostSeriesCard`, `PostSeriesNav`, `SeriesForm`, `PostTranslationForm`, `PostViewCounter` |
