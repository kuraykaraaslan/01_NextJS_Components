## UI Library Gap Check (vs. AGENTS spec)

### Eksik element
- Yok. AGENTS’te listelenen tüm atom ve molekül bileşenleri `modules/ui/` altında mevcut.

### Eksik varyasyon / davranış
- `modules/ui/FileInput.tsx`: Tasarımda `onFiles` ile seçilen dosyaları üst bileşene iletme desteği bekleniyor; mevcut bileşen dosyaları yalnızca iç state’te tutuyor ve callback yayımlamıyor.
- `modules/ui/Pagination.tsx`: API `page` + `totalPages` ile sınırlı; spesifikasyondaki `page`, `total` ve `pageSize` parametrelerini desteklemiyor, bu nedenle öğe sayısı ve sayfa boyutu kontrolü eksik.
- `modules/ui/TabGroup.tsx`: Yalnızca internal state ile çalışıyor; spesifikasyonda yer alan kontrollü kullanım (`activeTab`, `onChange`) ve dışarıdan sekme seçimini yönetme desteği yok.
- `modules/ui/MultiSelect.tsx`: Arama kutusu bulunmuyor; “searchable” varyasyonu desteklenmiyor.
- `modules/ui/ComboBox.tsx`: Opsiyonlar statik; async/harici arama isteği için bir hook/callback veya loading durumu yok.
- `modules/ui/TagInput.tsx`: Öneri listesi (`suggestions`) prop’u yok; serbest giriş dışında otomatik tamamlama yapılamıyor.
- `modules/ui/Avatar.tsx`: `alt` prop’u ayrı verilse de fallback yalnızca `name` üzerinden üretiliyor; doğrudan alt metni kontrol eden bir prop bulunmuyor (erişilebilirlik varyasyonu eksik).
- `modules/ui/Stepper.tsx`: Adım durumu `steps[].state` ile sağlanıyor; spesifikasyondaki tekil `currentStep` API’si bulunmuyor, bu nedenle basit “aktif adım” kullanımı için sarmalayıcı varyasyon eksik.

### Not
- AGENTS listesinde olmayan ekstra bileşenler: `DropdownMenu.tsx`, `Slider.tsx`, `Spinner.tsx`.
