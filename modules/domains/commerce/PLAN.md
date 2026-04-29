# Commerce Domain — Development Plan

## Directory Structure

```
modules/domains/commerce/
├── product/       ← Product cards, detail, gallery, variant picker, reviews, badges
├── category/      ← Category and brand cards
├── cart/          ← Add-to-cart button, cart drawer
├── checkout/      ← 4-step checkout flow
├── order/         ← Order card, status badge, timeline, detail
├── shipment/      ← Shipment tracker, status badge, shipping method card
└── return/        ← Return status badge, return request form
```

---

## Priority Queue

### P0 — Blocker (implement first)

| Component | File | Status |
|---|---|---|
| `StockStatusBadge` | `product/StockStatusBadge.tsx` | ⬜ |
| `ProductCard` | `product/ProductCard.tsx` | ⬜ |
| `ProductGrid` | `product/ProductGrid.tsx` | ⬜ |
| `AddToCartButton` | `cart/AddToCartButton.tsx` | ⬜ |
| `CartDrawer` | `cart/CartDrawer.tsx` | ⬜ |
| `OrderStatusBadge` | `order/OrderStatusBadge.tsx` | ⬜ |

### P1 — Core

| Component | File | Status |
|---|---|---|
| `ProductGallery` | `product/ProductGallery.tsx` | ⬜ |
| `ProductVariantPicker` | `product/ProductVariantPicker.tsx` | ⬜ |
| `ProductDetail` | `product/ProductDetail.tsx` | ⬜ |
| `CheckoutAddressStep` | `checkout/CheckoutAddressStep.tsx` | ⬜ |
| `CheckoutShippingStep` | `checkout/CheckoutShippingStep.tsx` | ⬜ |
| `CheckoutPaymentStep` | `checkout/CheckoutPaymentStep.tsx` | ⬜ |
| `CheckoutSummary` | `checkout/CheckoutSummary.tsx` | ⬜ |

### P2 — Supporting

| Component | File | Status |
|---|---|---|
| `OrderCard` | `order/OrderCard.tsx` | ⬜ |
| `OrderStatusTimeline` | `order/OrderStatusTimeline.tsx` | ⬜ |
| `OrderItemRow` | `order/OrderItemRow.tsx` | ⬜ |
| `OrderDetail` | `order/OrderDetail.tsx` | ⬜ |
| `ShipmentStatusBadge` | `shipment/ShipmentStatusBadge.tsx` | ⬜ |
| `ShipmentTracker` | `shipment/ShipmentTracker.tsx` | ⬜ |
| `ShippingMethodCard` | `shipment/ShippingMethodCard.tsx` | ⬜ |

### P3 — Completing

| Component | File | Status |
|---|---|---|
| `ProductBadge` | `product/ProductBadge.tsx` | ⬜ |
| `ProductStatusBadge` | `product/ProductStatusBadge.tsx` | ⬜ |
| `ProductReviewCard` | `product/ProductReviewCard.tsx` | ⬜ |
| `ProductReviewList` | `product/ProductReviewList.tsx` | ⬜ |
| `ProductReviewForm` | `product/ProductReviewForm.tsx` | ⬜ |
| `CategoryCard` | `category/CategoryCard.tsx` | ⬜ |
| `BrandCard` | `category/BrandCard.tsx` | ⬜ |
| `ReturnStatusBadge` | `return/ReturnStatusBadge.tsx` | ⬜ |
| `ReturnRequestForm` | `return/ReturnRequestForm.tsx` | ⬜ |

---

## Decisions

- **Common components are never re-implemented** — `CartItem`, `CartSummary`, `CouponInput`, `PriceDisplay`, `OrderTotalsCard`, `AddressForm`, `AddressSelector`, `PaymentMethodSelector`, `CreditCardForm`, and all payment/address badges are used as-is from `modules/domains/common/`.
- **`ProductVariantPicker`** owns the attribute → variant resolution logic; `ProductDetail` simply passes the selected variant up via `onVariantChange`.
- **`CartDrawer`** composes `common/cart/CartPreview` + `common/discount/CouponInput`; it does not re-render the item list itself.
- **`CheckoutSummary`** is read-only — it receives already-resolved address, shipping method, and cart totals as props; it does not fetch or mutate.
- **`OrderStatusTimeline`** derives step state purely from `OrderStatus` enum — no extra props needed.
- All components use controlled input patterns; validation messages are shown via `modules/ui/Input` `error` prop.
- No component in this layer fetches data or navigates; all data is passed as props and callbacks.
