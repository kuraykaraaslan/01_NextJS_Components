# Event Domain

Etkinlik biletleme platformu için domain katmanı. Etkinlik keşfinden bilet satışına, koltuk seçiminden check-in'e kadar tüm akışı kapsar.

---

## MVP Tanımı

**Hedef:** Kullanıcıların etkinlikleri keşfedip bilet satın alabildiği, organizatörlerin etkinlik yönetimi yapabildiği ve personelin check-in gerçekleştirebildiği tam döngülü bir biletleme uygulaması.

### Aktörler

| Aktör | Rol |
|-------|-----|
| Ziyaretçi | Etkinlikleri görüntüler, bilet satın alır |
| Organizatör | Etkinlik oluşturur ve yönetir |
| Personel / Gişe | Check-in scanner kullanır |
| Admin | Kategori ve organizatör yönetimi yapar |

### Temel Varlık Hiyerarşisi

```
EventCategory
└── Event  (format: PHYSICAL | ONLINE | HYBRID)
    ├── Organizer
    ├── Venue → VenueHall → VenueSection → VenueSeat
    ├── EventHall  (event ↔ hall bağlantısı)
    ├── EventSectionPricing  (bölüm fiyatlandırması)
    └── EventSeat  (koltuk durumu: AVAILABLE | HELD | SOLD | BLOCKED)
```

### Satın Alma Akışı

```
[Etkinlik Listesi]
    → [Etkinlik Detayı]
        → [Koltuk / Bölüm Seçimi]
            → [Hold (geçici rezervasyon, süre sınırlı)]
                → [Ödeme Formu + Kupon]
                    → [Sipariş Onayı]
                        → [IssuedTicket (QR kod)]
                            → [Check-in]
```

### Durum Makineleri

**Etkinlik:** `DRAFT → PUBLISHED | SCHEDULED → SOLD_OUT | CANCELLED | POSTPONED → ARCHIVED`

**Koltuk:** `AVAILABLE → HELD → SOLD | AVAILABLE` (hold süresi bitince geri döner)

**Sipariş:** `PENDING → PAID | FAILED | CANCELLED → REFUNDED | PARTIALLY_REFUNDED`

**Bilet:** `VALID → USED | CANCELLED | REFUNDED | TRANSFERRED`

---

## Veri Modeli Özeti (`types.ts`)

| Schema | Açıklama |
|--------|----------|
| `EventCategorySchema` | Hiyerarşik kategori (parentId destekler) |
| `OrganizerSchema` | Logo, web sitesi, doğrulama bayrağı |
| `VenueSchema` | Lokasyon koordinatlı mekan |
| `VenueHallSchema` | Salon — kapasite, kat, koltuk haritası görseli |
| `VenueSectionSchema` | Bölüm (iç içe destekli, sortOrder) |
| `VenueSeatSchema` | Koltuk — sıra/numara, koordinatlar, erişilebilir |
| `EventSchema` | Ana etkinlik — format, fiyat aralığı, kapasite |
| `EventHallSchema` | Etkinlik-salon bağlantısı, kapasite override |
| `EventSectionPricingSchema` | Bölüm bazlı fiyat, satış penceresi |
| `EventSeatSchema` | Etkinlik bazlı koltuk durumu ve hold bilgisi |
| `TicketHoldSchema` | Geçici rezervasyon — session + expiry |
| `OrderSchema` | Sipariş başlığı — alıcı, toplam, vergi |
| `OrderItemSchema` | Sipariş kalemi — koltuk + fiyat detayı |
| `PaymentSchema` | Ödeme kaydı — gateway, durum, ham yanıt |
| `IssuedTicketSchema` | Düzenlenen bilet — QR, barkod, check-in |
| `TicketCheckInSchema` | Check-in logu — geçer/geçersiz, cihaz, kapı |
| `CouponSchema` | İndirim kodu — tip, değer, maks kullanım |

---

## Bileşen Listesi

### Mevcut Bileşenler

> Henüz hiçbir bileşen oluşturulmamıştır. Aşağıdaki tablolar MVP için gerekli tüm bileşenleri listeler.

---

### Gerekli Bileşenler — Halka Açık (Public)

#### Etkinlik Keşfi

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---------|-------|-------------------|----------|
| `EventCard` | `EventCard.tsx` | `EventWithData` | Kapak görseli, başlık, tarih, fiyat aralığı, format ve durum badge'i |
| `EventStatusBadge` | `EventStatusBadge.tsx` | `EventStatus` | DRAFT / PUBLISHED / SOLD_OUT / CANCELLED renkli badge |
| `EventFormatBadge` | `EventFormatBadge.tsx` | `EventFormat` | PHYSICAL / ONLINE / HYBRID ikonu ve etiketi |
| `EventCategoryBadge` | `EventCategoryBadge.tsx` | `EventCategory` | Kategori chip'i, isteğe bağlı görsel |
| `EventGrid` | `EventGrid.tsx` | `EventWithData[]` | Responsive kart grid'i, yükleniyor ve boş durumları |
| `EventFilterBar` | `EventFilterBar.tsx` | `EventCategory[]`, `EventFormat`, `EventStatus` | Kategori, format, tarih aralığı, fiyat filtreleri |

#### Etkinlik Detayı

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---------|-------|-------------------|----------|
| `EventDetailHero` | `EventDetailHero.tsx` | `EventWithData` | Banner, başlık, kısa açıklama, tarih/saat |
| `EventScheduleBlock` | `EventScheduleBlock.tsx` | `Event` | Başlangıç/bitiş saati, timezone gösterimi |
| `OrganizerCard` | `OrganizerCard.tsx` | `Organizer` | Logo, isim, doğrulanmış rozet, web sitesi |
| `VenueCard` | `VenueCard.tsx` | `Venue` | Adres, şehir, harita linki veya embed |
| `EventTagList` | `EventTagList.tsx` | `Event['tags']` | Etiket chip listesi |

#### Koltuk Seçimi

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---------|-------|-------------------|----------|
| `SectionPricingCard` | `SectionPricingCard.tsx` | `EventSectionPricing` | Bölüm adı, fiyat, kalan kapasite, satış zamanı |
| `SectionPricingList` | `SectionPricingList.tsx` | `EventSectionPricing[]` | Tüm bölümlerin fiyat listesi, seçim kontrolü |
| `SeatMapViewer` | `SeatMapViewer.tsx` | `VenueHall`, `EventSeat[]` | Salon koltuk haritası, durum renklendirmesi |
| `SeatStatusLegend` | `SeatStatusLegend.tsx` | `SeatStatus` | AVAILABLE / HELD / SOLD / BLOCKED renk açıklaması |
| `SeatSelector` | `SeatSelector.tsx` | `EventSeat[]`, `VenueSeat[]` | Koltuk seçme/bırakma, erişilebilir koltuk filtresi |
| `TicketQuantityPicker` | `TicketQuantityPicker.tsx` | `EventSectionPricing` | Bölüm bazlı adet artırıcı, kapasite sınırı |

#### Sepet & Hold

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---------|-------|-------------------|----------|
| `TicketHoldTimer` | `TicketHoldTimer.tsx` | `TicketHold` | Geri sayım sayacı, hold sona erince uyarı |
| `CartItemRow` | `CartItemRow.tsx` | `TicketHold`, `EventSectionPricing` | Koltuk etiket, bölüm, fiyat, sil butonu |
| `CartSummary` | `CartSummary.tsx` | `TicketHold[]`, `EventSectionPricing[]` | Seçilen koltuklar, ara toplam, hizmet bedeli |

#### Ödeme Akışı

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---------|-------|-------------------|----------|
| `BuyerInfoForm` | `BuyerInfoForm.tsx` | `Order` (buyerName, buyerEmail, buyerPhone) | Ad, e-posta, telefon form alanları |
| `CouponInput` | `CouponInput.tsx` | `Coupon` | Kupon kodu girişi, doğrulama mesajı, indirim gösterimi |
| `OrderPriceSummary` | `OrderPriceSummary.tsx` | `Order` | Ara toplam, hizmet bedeli, indirim, vergi, genel toplam |
| `PaymentStatusBadge` | `PaymentStatusBadge.tsx` | `PaymentStatus` | Ödeme durum badge'i |

#### Onay & Bilet

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---------|-------|-------------------|----------|
| `OrderConfirmationBanner` | `OrderConfirmationBanner.tsx` | `Order` | Sipariş başarılı/başarısız mesajı, sipariş numarası |
| `TicketCard` | `TicketCard.tsx` | `IssuedTicket`, `Event`, `VenueSeat` | QR kod, barkod, koltuk ve etkinlik bilgisi |
| `TicketStatusBadge` | `TicketStatusBadge.tsx` | `TicketStatus` | VALID / USED / CANCELLED / REFUNDED / TRANSFERRED |
| `TicketList` | `TicketList.tsx` | `IssuedTicket[]` | Sipariş altındaki tüm biletler |

---

### Gerekli Bileşenler — Organizatör Paneli

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---------|-------|-------------------|----------|
| `EventForm` | `EventForm.tsx` | `Event` | Oluşturma/düzenleme — tüm alanlar, format seçimi |
| `EventStatusControl` | `EventStatusControl.tsx` | `EventStatus` | Yayınla / iptal et / ertele / arşivle aksiyon butonları |
| `EventHallPicker` | `EventHallPicker.tsx` | `Venue`, `VenueHall` | Mekan → salon seçimi |
| `SectionPricingForm` | `SectionPricingForm.tsx` | `EventSectionPricing` | Bölüm adı, fiyat, kapasite, satış penceresi |
| `SectionPricingTable` | `SectionPricingTable.tsx` | `EventSectionPricing[]` | Tüm bölüm fiyatlarını listeler, düzenle/sil |
| `OrganizerForm` | `OrganizerForm.tsx` | `Organizer` | Organizatör oluşturma/düzenleme |
| `OrderList` | `OrderList.tsx` | `Order[]` | Sipariş tablosu — durum, alıcı, toplam, tarih |
| `OrderDetailCard` | `OrderDetailCard.tsx` | `Order`, `OrderItem[]`, `Payment`, `IssuedTicket[]` | Sipariş detay genişletme paneli |
| `OrderStatusControl` | `OrderStatusControl.tsx` | `OrderStatus` | İptal et / iade et aksiyonları |
| `AttendeeList` | `AttendeeList.tsx` | `IssuedTicket[]` | Katılımcı listesi — ad, e-posta, koltuk, durum |
| `CouponForm` | `CouponForm.tsx` | `Coupon` | Kupon kodu oluşturma/düzenleme |
| `CouponTable` | `CouponTable.tsx` | `Coupon[]` | Kupon listesi — kullanım sayısı, aktiflik toggle |

---

### Gerekli Bileşenler — Check-in / Gişe

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---------|-------|-------------------|----------|
| `CheckInScanner` | `CheckInScanner.tsx` | `IssuedTicket`, `TicketCheckIn` | QR / barkod tarama arayüzü |
| `CheckInResult` | `CheckInResult.tsx` | `TicketCheckIn` | Geçerli (yeşil) / geçersiz (kırmızı) sonuç ekranı |
| `CheckInStats` | `CheckInStats.tsx` | `TicketCheckIn[]`, `Event` | Taranan / toplam kapasite sayacı |
| `CheckInLogTable` | `CheckInLogTable.tsx` | `TicketCheckIn[]` | Check-in geçmişi — zaman, kapı, cihaz |

---

### Gerekli Bileşenler — Admin

| Bileşen | Dosya | Kullandığı Tipler | Açıklama |
|---------|-------|-------------------|----------|
| `EventCategoryForm` | `EventCategoryForm.tsx` | `EventCategory` | Kategori oluşturma/düzenleme, üst kategori seçimi |
| `EventCategoryTree` | `EventCategoryTree.tsx` | `EventCategory[]` | Hiyerarşik kategori ağacı |
| `VenueForm` | `VenueForm.tsx` | `Venue` | Mekan oluşturma/düzenleme, lokasyon seçimi |
| `VenueHallForm` | `VenueHallForm.tsx` | `VenueHall` | Salon oluşturma, kapasite, koltuk haritası yükleme |
| `VenueSectionForm` | `VenueSectionForm.tsx` | `VenueSection` | Bölüm tanımlama, üst bölüm seçimi |
| `VenueSeatBulkUpload` | `VenueSeatBulkUpload.tsx` | `VenueSeat[]` | Toplu koltuk import (CSV/JSON) |
| `OrganizerVerifyToggle` | `OrganizerVerifyToggle.tsx` | `Organizer` | Doğrulanmış rozeti aç/kapat |

---

## Öncelik Sıralaması (MVP Build Order)

```
1. Badge bileşenleri      EventStatusBadge, EventFormatBadge, TicketStatusBadge, PaymentStatusBadge
2. Card bileşenleri       EventCard, OrganizerCard, VenueCard, SectionPricingCard, TicketCard
3. Liste bileşenleri      EventGrid, SectionPricingList, TicketList
4. Seçim bileşenleri      SeatSelector, SeatMapViewer, TicketQuantityPicker
5. Sepet akışı            TicketHoldTimer, CartItemRow, CartSummary
6. Ödeme akışı            BuyerInfoForm, CouponInput, OrderPriceSummary
7. Sonuç ekranları        OrderConfirmationBanner, CheckInResult
8. Yönetim formları       EventForm, SectionPricingForm, CouponForm
9. Check-in               CheckInScanner, CheckInStats, CheckInLogTable
10. Admin                 EventCategoryTree, VenueForm, VenueHallForm
```
