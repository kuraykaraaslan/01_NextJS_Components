# Commerce Domain

A full-featured e-commerce vertical covering product catalogue, cart, checkout, order management, shipping, returns, and reviews. Composes `modules/ui/` atoms and reusable `modules/domains/common/` components.

---

## MVP Definition

The Commerce MVP delivers a fully functional storefront where a visitor can browse products, add items to a cart, complete checkout, and track their order. Admin-side features (warehouse management, inventory movements, supplier administration) are explicitly post-MVP.

**MVP scope:**

1. **Product catalogue** — browsing, filtering by category/brand, product detail with variant selection and stock indication.
2. **Cart** — add/remove/update items, coupon application, running totals.
3. **Checkout** — address selection → shipping method → payment → confirmation.
4. **Order management** — order history list and detail view with status timeline.
5. **Shipment tracking** — carrier / tracking number display with status progression.
6. **Reviews** — read existing reviews, submit a new review with star rating.
7. **Returns** — initiate a return request from a delivered order.

Out-of-scope for MVP: `Warehouse`, `Inventory`, `InventoryMovement`, `Supplier` admin UIs.

---

## Directory Structure

```
modules/domains/commerce/
├── types.ts                    ← All domain type schemas
│
├── product/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductGallery.tsx
│   ├── ProductDetail.tsx
│   ├── ProductVariantPicker.tsx
│   ├── ProductBadge.tsx
│   ├── ProductStatusBadge.tsx
│   ├── StockStatusBadge.tsx
│   ├── ProductReviewCard.tsx
│   ├── ProductReviewList.tsx
│   └── ProductReviewForm.tsx
│
├── category/
│   ├── CategoryCard.tsx
│   └── BrandCard.tsx
│
├── cart/
│   ├── AddToCartButton.tsx
│   └── CartDrawer.tsx
│
├── checkout/
│   ├── CheckoutAddressStep.tsx
│   ├── CheckoutShippingStep.tsx
│   ├── CheckoutPaymentStep.tsx
│   └── CheckoutSummary.tsx
│
├── order/
│   ├── OrderCard.tsx
│   ├── OrderStatusBadge.tsx
│   ├── OrderStatusTimeline.tsx
│   ├── OrderItemRow.tsx
│   └── OrderDetail.tsx
│
├── shipment/
│   ├── ShipmentStatusBadge.tsx
│   ├── ShipmentTracker.tsx
│   └── ShippingMethodCard.tsx
│
└── return/
    ├── ReturnStatusBadge.tsx
    └── ReturnRequestForm.tsx
```

---

## Type Schema Summary

### Enums

| Enum | Values |
|---|---|
| `ProductStatusEnum` | `DRAFT \| PUBLISHED \| ARCHIVED \| OUT_OF_STOCK` |
| `ProductTypeEnum` | `PHYSICAL \| DIGITAL \| SERVICE` |
| `StockStatusEnum` | `IN_STOCK \| LOW_STOCK \| OUT_OF_STOCK \| BACKORDER` |
| `CartStatusEnum` | `ACTIVE \| ABANDONED \| CONVERTED` |
| `OrderStatusEnum` | `PENDING \| CONFIRMED \| PAID \| PROCESSING \| SHIPPED \| DELIVERED \| CANCELLED \| REFUNDED \| PARTIALLY_REFUNDED` |
| `ShipmentStatusEnum` | `PENDING \| READY \| SHIPPED \| IN_TRANSIT \| DELIVERED \| FAILED \| RETURNED` |
| `ReturnStatusEnum` | `REQUESTED \| APPROVED \| REJECTED \| RECEIVED \| REFUNDED` |
| `ProductReviewStatusEnum` | `PENDING \| APPROVED \| REJECTED \| SPAM` |
| `InventoryMovementTypeEnum` | `IN \| OUT \| RESERVE \| RELEASE \| ADJUSTMENT \| RETURN` |

### Catalogue

| Schema | Key Fields |
|---|---|
| `ProductCategorySchema` | `categoryId`, `title`, `slug`, `image`, `parentId` (tree) |
| `BrandSchema` | `brandId`, `name`, `slug`, `logo`, `website` |
| `SupplierSchema` | `supplierId`, `name`, `contactName`, `email` |
| `ProductSchema` | `productId`, `title`, `slug`, `type`, `status`, `basePrice`, `salePrice`, `currency`, `stockStatus`, `gallery`, `tags` |
| `ProductWithDataSchema` | `ProductSchema` + embedded `category`, `brand`, `variants[]`, `translations[]` |

### Variants & Attributes

| Schema | Key Fields |
|---|---|
| `ProductAttributeSchema` | `attributeId`, `name`, `slug` (e.g. Color, Size) |
| `ProductAttributeValueSchema` | `attributeValueId`, `value`, `slug`, `sortOrder` |
| `ProductVariantSchema` | `variantId`, `sku`, `price`, `salePrice`, `image`, `stockStatus` |
| `ProductVariantOptionSchema` | links `variantId` → `attributeId` → `attributeValueId` |

### Inventory (post-MVP)

| Schema | Key Fields |
|---|---|
| `WarehouseSchema` | `warehouseId`, `name`, `code`, `city`, `country` |
| `InventorySchema` | `quantity`, `reservedQuantity`, `lowStockThreshold` |
| `InventoryMovementSchema` | `type`, `quantity`, `reason`, `orderId` |

### Customer & Address

| Schema | Key Fields |
|---|---|
| `CustomerSchema` | `customerId`, `userId?`, `email`, `firstName`, `lastName` |
| `AddressSchema` | extends `common/AddressTypes` + `isDefaultBilling`, `isDefaultShipping` |

### Cart

| Schema | Key Fields |
|---|---|
| `CartSchema` | `cartId`, `status`, `subtotal`, `discountTotal`, `taxTotal`, `shippingTotal`, `total`, `currency` |
| `CartItemSchema` | `cartItemId`, `productId`, `variantId?`, `title`, `quantity`, `unitPrice`, `totalPrice` |

### Order

| Schema | Key Fields |
|---|---|
| `OrderSchema` | `orderId`, `orderNumber`, `status`, `subtotal`, `discountTotal`, `taxTotal`, `shippingTotal`, `total`, `currency` |
| `OrderItemSchema` | `orderItemId`, `productId`, `variantId?`, `title`, `quantity`, `unitPrice`, `totalPrice` |

### Payment

| Schema | Key Fields |
|---|---|
| `PaymentSchema` | extends `common/PaymentTypes.PaymentBaseSchema` + `orderId`, `paidAt`, `failedAt`, `refundedAt` |

### Shipping

| Schema | Key Fields |
|---|---|
| `ShippingMethodSchema` | `shippingMethodId`, `name`, `code`, `basePrice`, `currency` |
| `ShipmentSchema` | `shipmentId`, `orderId`, `carrier`, `trackingNumber`, `trackingUrl`, `status` |

### Coupon

| Schema | Key Fields |
|---|---|
| `CouponSchema` | extends `common/DiscountTypes.CouponBaseSchema` + `minOrderTotal`, `maxUses`, `startsAt`, `expiresAt` |

### Review & Return

| Schema | Key Fields |
|---|---|
| `ProductReviewSchema` | `reviewId`, `productId`, `rating` (1–5), `title`, `content`, `status` |
| `ReturnRequestSchema` | `returnId`, `orderId`, `status`, `reason`, `refundAmount` |
| `ReturnItemSchema` | `returnItemId`, `returnId`, `orderItemId`, `quantity`, `reason` |

---

## Existing Components

> No React components exist yet. The domain currently contains `types.ts` only.

---

## Common Components Used

The following components from `modules/domains/common/` are composed directly inside commerce components — do not re-implement them.

| Component | Path | Used By |
|---|---|---|
| `CartBadge` | `common/cart/CartBadge.tsx` | `CartDrawer` (header badge) |
| `CartItem` | `common/cart/CartItem.tsx` | `CartDrawer`, `CartPreview` |
| `CartPreview` | `common/cart/CartPreview.tsx` | `CartDrawer` |
| `CartSummary` | `common/cart/CartSummary.tsx` | `CheckoutSummary` |
| `CouponInput` | `common/discount/CouponInput.tsx` | `CartDrawer`, `CheckoutSummary` |
| `DiscountBadge` | `common/discount/DiscountBadge.tsx` | `ProductCard`, `CartItem` |
| `PriceDisplay` | `common/money/PriceDisplay.tsx` | `ProductCard`, `ProductDetail`, `OrderItemRow` |
| `OrderTotalsCard` | `common/money/OrderTotalsCard.tsx` | `CheckoutSummary`, `OrderDetail` |
| `PaymentMethodSelector` | `common/payment/PaymentMethodSelector.tsx` | `CheckoutPaymentStep` |
| `PaymentStatusBadge` | `common/payment/PaymentStatusBadge.tsx` | `OrderDetail` |
| `PaymentSummaryCard` | `common/payment/PaymentSummaryCard.tsx` | `OrderDetail` |
| `CreditCardForm` | `common/payment/CreditCardForm.tsx` | `CheckoutPaymentStep` |
| `AddressCard` | `common/address/AddressCard.tsx` | `CheckoutAddressStep`, `OrderDetail` |
| `AddressForm` | `common/address/AddressForm.tsx` | `CheckoutAddressStep` |
| `AddressSelector` | `common/address/AddressSelector.tsx` | `CheckoutAddressStep` |

---

## Required Components

### Product

| Component | File | Types Used | Description |
|---|---|---|---|
| `ProductCard` | `product/ProductCard.tsx` | `ProductWithData`, `StockStatus` | Thumbnail, title, brand, base/sale price, stock badge, add-to-cart CTA |
| `ProductGrid` | `product/ProductGrid.tsx` | `ProductWithData[]` | Responsive grid of `ProductCard`s with loading skeleton |
| `ProductGallery` | `product/ProductGallery.tsx` | `Product.gallery` | Main image + thumbnail strip, zoom on hover |
| `ProductDetail` | `product/ProductDetail.tsx` | `ProductWithData` | Full product page body: gallery, title, variant picker, price, add-to-cart, description |
| `ProductVariantPicker` | `product/ProductVariantPicker.tsx` | `ProductAttribute`, `ProductVariant`, `ProductVariantOption` | Attribute group buttons (Color, Size…), highlights selected, disables out-of-stock combos |
| `ProductBadge` | `product/ProductBadge.tsx` | `ProductType` | `PHYSICAL / DIGITAL / SERVICE` type label |
| `ProductStatusBadge` | `product/ProductStatusBadge.tsx` | `ProductStatus` | `DRAFT / PUBLISHED / ARCHIVED / OUT_OF_STOCK` badge |
| `StockStatusBadge` | `product/StockStatusBadge.tsx` | `StockStatus` | Coloured pill: green IN_STOCK, amber LOW_STOCK, red OUT_OF_STOCK, gray BACKORDER |
| `ProductReviewCard` | `product/ProductReviewCard.tsx` | `ProductReview` | Star rating, title, content, reviewer name, date |
| `ProductReviewList` | `product/ProductReviewList.tsx` | `ProductReview[]` | Average rating, distribution bars, paginated list of `ProductReviewCard` |
| `ProductReviewForm` | `product/ProductReviewForm.tsx` | `ProductReview` | Interactive star picker, title + content fields, submit |

### Category & Brand

| Component | File | Types Used | Description |
|---|---|---|---|
| `CategoryCard` | `category/CategoryCard.tsx` | `ProductCategory` | Cover image, title, optional item count |
| `BrandCard` | `category/BrandCard.tsx` | `Brand` | Logo, name, website link |

### Cart

| Component | File | Types Used | Description |
|---|---|---|---|
| `AddToCartButton` | `cart/AddToCartButton.tsx` | `Product`, `ProductVariant` | Quantity stepper + "Add to cart" button, disabled when out of stock |
| `CartDrawer` | `cart/CartDrawer.tsx` | `Cart`, `CartItem[]` | Slide-in panel: item list, totals, coupon input, checkout CTA |

### Checkout

| Component | File | Types Used | Description |
|---|---|---|---|
| `CheckoutAddressStep` | `checkout/CheckoutAddressStep.tsx` | `Address[]`, `Customer` | Address selector + inline add-new form |
| `CheckoutShippingStep` | `checkout/CheckoutShippingStep.tsx` | `ShippingMethod[]` | Selectable shipping method cards with price |
| `CheckoutPaymentStep` | `checkout/CheckoutPaymentStep.tsx` | `Payment` | Payment method selector + credit card form |
| `CheckoutSummary` | `checkout/CheckoutSummary.tsx` | `Cart`, `Address`, `ShippingMethod` | Read-only review of address, items, and totals before placing order |

### Order

| Component | File | Types Used | Description |
|---|---|---|---|
| `OrderCard` | `order/OrderCard.tsx` | `Order` | Order number, date, status badge, total — for listing pages |
| `OrderStatusBadge` | `order/OrderStatusBadge.tsx` | `OrderStatus` | Coloured pill for each of the 9 order states |
| `OrderStatusTimeline` | `order/OrderStatusTimeline.tsx` | `Order` | Step timeline: Placed → Confirmed → Paid → Processing → Shipped → Delivered |
| `OrderItemRow` | `order/OrderItemRow.tsx` | `OrderItem` | Product thumbnail, title, variant, quantity × unit price |
| `OrderDetail` | `order/OrderDetail.tsx` | `Order`, `OrderItem[]`, `Payment`, `Shipment` | Full order detail: timeline, items table, address, payment & shipment summary |

### Shipment

| Component | File | Types Used | Description |
|---|---|---|---|
| `ShipmentStatusBadge` | `shipment/ShipmentStatusBadge.tsx` | `ShipmentStatus` | Coloured badge for each shipment state |
| `ShipmentTracker` | `shipment/ShipmentTracker.tsx` | `Shipment` | Carrier, tracking number (external link), status timeline |
| `ShippingMethodCard` | `shipment/ShippingMethodCard.tsx` | `ShippingMethod` | Selectable card: name, description, price |

### Return

| Component | File | Types Used | Description |
|---|---|---|---|
| `ReturnStatusBadge` | `return/ReturnStatusBadge.tsx` | `ReturnStatus` | `REQUESTED / APPROVED / REJECTED / RECEIVED / REFUNDED` badge |
| `ReturnRequestForm` | `return/ReturnRequestForm.tsx` | `ReturnRequest`, `ReturnItem`, `OrderItem[]` | Item picker with quantities, reason field, submit |

---

## Component Priority

| Priority | Components |
|---|---|
| P0 — Blocker | `ProductCard`, `ProductGrid`, `StockStatusBadge`, `AddToCartButton`, `CartDrawer`, `OrderStatusBadge` |
| P1 — Core | `ProductDetail`, `ProductGallery`, `ProductVariantPicker`, `CheckoutAddressStep`, `CheckoutShippingStep`, `CheckoutPaymentStep`, `CheckoutSummary` |
| P2 — Supporting | `OrderCard`, `OrderStatusTimeline`, `OrderItemRow`, `OrderDetail`, `ShipmentTracker`, `ShipmentStatusBadge`, `ShippingMethodCard` |
| P3 — Completing | `ProductReviewCard`, `ProductReviewList`, `ProductReviewForm`, `ReturnStatusBadge`, `ReturnRequestForm`, `CategoryCard`, `BrandCard`, `ProductBadge`, `ProductStatusBadge` |
