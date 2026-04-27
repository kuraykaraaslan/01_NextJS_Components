# Blog Domain — Geliştirme Planı

## Klasör Yapısı

```
modules/domains/blog/
├── post/          ← Kart, hero, içerik, meta, durum rozeti, beğeni, grid/list, form
├── category/      ← Etiket, kart, liste, form
├── author/        ← Yazar bilgi kartı
├── comment/       ← Liste, tekil yorum, form, moderasyon
├── series/        ← Seri kartı, seri navigasyonu, form
└── translation/   ← Dil başına çeviri formu
```

---

## Öncelik Sırası

### P0 — Blokör (önce tamamlanacak)

| Bileşen | Dosya | Durum |
|---|---|---|
| `PostCard` | `post/PostCard.tsx` | ✅ |
| `PostContent` | `post/PostContent.tsx` | ✅ |
| `PostMeta` | `post/PostMeta.tsx` | ✅ |
| `PostStatusBadge` | `post/PostStatusBadge.tsx` | ✅ |
| `CategoryBadge` | `category/CategoryBadge.tsx` | ✅ |
| `CommentList` | `comment/CommentList.tsx` | ✅ |
| `CommentForm` | `comment/CommentForm.tsx` | ✅ |

### P1 — Çekirdek

| Bileşen | Dosya | Durum |
|---|---|---|
| `PostHero` | `post/PostHero.tsx` | ⬜ |
| `PostGrid` | `post/PostGrid.tsx` | ⬜ |
| `PostList` | `post/PostList.tsx` | ⬜ |
| `CategoryCard` | `category/CategoryCard.tsx` | ⬜ |
| `CategoryList` | `category/CategoryList.tsx` | ⬜ |
| `PostAuthorCard` | `author/PostAuthorCard.tsx` | ⬜ |
| `PostLikeButton` | `post/PostLikeButton.tsx` | ⬜ |
| `CommentItem` | `comment/CommentItem.tsx` | ✅ |

### P2 — Yönetici

| Bileşen | Dosya | Durum |
|---|---|---|
| `PostForm` | `post/PostForm.tsx` | ⬜ |
| `PostStatusControl` | `post/PostStatusControl.tsx` | ⬜ |
| `CategoryForm` | `category/CategoryForm.tsx` | ⬜ |
| `CommentStatusBadge` | `comment/CommentStatusBadge.tsx` | ⬜ |
| `CommentModerationList` | `comment/CommentModerationList.tsx` | ⬜ |

### P3 — Seri & i18n

| Bileşen | Dosya | Durum |
|---|---|---|
| `PostSeriesCard` | `series/PostSeriesCard.tsx` | ⬜ |
| `PostSeriesNav` | `series/PostSeriesNav.tsx` | ⬜ |
| `SeriesForm` | `series/SeriesForm.tsx` | ⬜ |
| `PostTranslationForm` | `translation/PostTranslationForm.tsx` | ⬜ |
| `PostViewCounter` | `post/PostViewCounter.tsx` | ⬜ |

---

## Kararlar

- **`PostStatusBadge`** — `common/status/PublishStatusBadge` baz alınır; `SCHEDULED` değeri blog domain'inde ek olarak eklenir, common bileşeni değiştirilmez.
- **`PostAuthorCard`** — `common/user/UserAvatar` ve `common/user/UserProfileCard` compose edilir; `SafeUser.userProfile` (name, username, biography, profilePicture) prop olarak alınır.
- **`CommentForm`** — `parentId` prop'u opsiyoneldir; sağlandığında cevap modu aktif olur (form başlığı "Cevapla" olarak değişir).
- **`CommentList`** — `parentId === null` olan yorumlar kök seviyede, `parentId` dolu olanlar ilgili yorumun altında render edilir; maksimum 2 seviye derinlik.
- **`PostForm`** — `common/seo/SeoForm` ve `common/seo/SeoPreview` gömülü olarak içerir; kategori seçimi `CategorySchema` listesiyle beslenir.
- **`PostTranslationForm`** — `common/i18n/LanguageSwitcher` ve `common/i18n/DirectionProvider` ile sarmalanır; her dil sekmesi ayrı `PostTranslation` instance'ı günceller.
- **`SeriesForm`** — Giriş sıralama `SeriesEntry.order` alanını günceller; sürükle-bırak yerine ↑↓ butonları kullanılır (bağımlılık minimizasyonu).
- Tüm bileşenler `modules/ui/` atomlarını compose eder; kendi içlerinde `fetch`, `router` veya dış API çağrısı barındırmaz.
- Form bileşenleri controlled pattern kullanır; hata mesajları `Input` / `Textarea` bileşenlerinin `error` prop'u ile gösterilir.
