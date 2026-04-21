'use client';
import { ProductCard } from '@/modules/domain/ecommerce/ProductCard';
import { ProductVariantPicker } from '@/modules/domain/ecommerce/ProductVariantPicker';
import { AddToCartPanel } from '@/modules/domain/ecommerce/AddToCartPanel';
import { CartSummary } from '@/modules/domain/ecommerce/CartSummary';
import { CheckoutAddressStep } from '@/modules/domain/ecommerce/CheckoutAddressStep';
import { useState } from 'react';
import type { ShowcaseComponent } from '../showcase.types';

export function buildEcommerceData(): ShowcaseComponent[] {
  return [
    {
      id: 'ec-product-card',
      title: 'ProductCard',
      category: 'Domain' as const,
      abbr: 'Pc',
      description: 'Product listing card with image, price, discount badge, rating, wishlist, and add-to-cart.',
      filePath: 'modules/domain/ecommerce/ProductCard.tsx',
      sourceCode: `import { ProductCard } from '@/modules/domain/ecommerce/ProductCard';\n\n<ProductCard product={{\n  id: '1', name: 'Wireless Headphones', price: 79.99,\n  originalPrice: 129.99, brand: 'SoundPro', badge: 'New',\n  badgeVariant: 'success', rating: 4, reviewCount: 128,\n  inStock: true, onAddToCart: () => {}, onWishlist: () => {},\n}} />`,
      variants: [
        {
          title: 'Product card with discount',
          layout: 'stack' as const,
          preview: (
            <div className="max-w-xs">
              <ProductCard product={{
                id: '1', name: 'Premium Wireless Headphones Pro Max', price: 79.99,
                originalPrice: 129.99, brand: 'SoundPro', badge: 'Sale',
                badgeVariant: 'error', rating: 4, reviewCount: 128,
                inStock: true, onAddToCart: () => {}, onWishlist: () => {},
              }} />
            </div>
          ),
          code: `<ProductCard product={{\n  id: '1',\n  name: 'Premium Wireless Headphones',\n  price: 79.99,\n  originalPrice: 129.99,\n  brand: 'SoundPro',\n  badge: 'Sale',\n  badgeVariant: 'error',\n  rating: 4,\n  reviewCount: 128,\n  inStock: true,\n  onAddToCart: handleAddToCart,\n  onWishlist: handleWishlist,\n}} />`,
        },
      ],
    },

    {
      id: 'ec-variant-picker',
      title: 'ProductVariantPicker',
      category: 'Domain' as const,
      abbr: 'Vp',
      description: 'Flexible variant selector supporting select dropdowns, button groups, multi-select, and tag inputs.',
      filePath: 'modules/domain/ecommerce/ProductVariantPicker.tsx',
      sourceCode: `import { ProductVariantPicker } from '@/modules/domain/ecommerce/ProductVariantPicker';\n\n<ProductVariantPicker\n  variants={[\n    { type: 'buttons', id: 'size', label: 'Size', options: [{value:'S',label:'S'},{value:'M',label:'M'},{value:'L',label:'L'}] },\n    { type: 'select',  id: 'color', label: 'Color', options: [{value:'black',label:'Black'},{value:'white',label:'White'}] },\n  ]}\n  values={values}\n  onChange={(id, val) => setValues(v => ({...v,[id]:val}))}\n/>`,
      variants: [
        {
          title: 'Variant picker',
          layout: 'stack' as const,
          preview: (() => {
            function Demo() {
              const [values, setValues] = useState<Record<string, string | string[]>>({ size: 'M', color: 'black' });
              return (
                <div className="w-full max-w-sm">
                  <ProductVariantPicker
                    variants={[
                      { type: 'buttons', id: 'size', label: 'Size', options: [{ value: 'XS', label: 'XS' }, { value: 'S', label: 'S' }, { value: 'M', label: 'M' }, { value: 'L', label: 'L' }, { value: 'XL', label: 'XL' }] },
                      { type: 'select', id: 'color', label: 'Color', options: [{ value: 'black', label: 'Black' }, { value: 'white', label: 'White' }, { value: 'navy', label: 'Navy' }] },
                    ]}
                    values={values}
                    onChange={(id, val) => setValues(v => ({ ...v, [id]: val }))}
                  />
                </div>
              );
            }
            return <Demo />;
          })(),
          code: `<ProductVariantPicker\n  variants={[\n    { type: 'buttons', id: 'size', label: 'Size',\n      options: [{value:'S',label:'S'},{value:'M',label:'M'},{value:'L',label:'L'}] },\n    { type: 'select', id: 'color', label: 'Color',\n      options: [{value:'black',label:'Black'},{value:'white',label:'White'}] },\n  ]}\n  values={values}\n  onChange={(id, val) => setValues(v => ({...v, [id]: val}))}\n/>`,
        },
      ],
    },

    {
      id: 'ec-add-to-cart',
      title: 'AddToCartPanel',
      category: 'Domain' as const,
      abbr: 'Ac',
      description: 'Quantity selector with total price calculation, validation, loading state, and success toast.',
      filePath: 'modules/domain/ecommerce/AddToCartPanel.tsx',
      sourceCode: `import { AddToCartPanel } from '@/modules/domain/ecommerce/AddToCartPanel';\n\n<AddToCartPanel\n  productName="Wireless Headphones"\n  price={79.99}\n  maxQuantity={10}\n  onAddToCart={async (qty) => { /* add to cart */ }}\n/>`,
      variants: [
        {
          title: 'Add to cart panel',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <AddToCartPanel productName="Wireless Headphones" price={79.99} maxQuantity={10} />
            </div>
          ),
          code: `<AddToCartPanel\n  productName="Wireless Headphones"\n  price={79.99}\n  maxQuantity={10}\n  onAddToCart={async (qty) => {\n    await addToCart(productId, qty);\n  }}\n/>`,
        },
      ],
    },

    {
      id: 'ec-cart-summary',
      title: 'CartSummary',
      category: 'Domain' as const,
      abbr: 'Cs',
      description: 'Cart item table with subtotal, coupon discount, shipping, and checkout button.',
      filePath: 'modules/domain/ecommerce/CartSummary.tsx',
      sourceCode: `import { CartSummary } from '@/modules/domain/ecommerce/CartSummary';\n\n<CartSummary\n  items={[{id:'1',name:'Headphones',qty:1,unitPrice:79.99},{id:'2',name:'Case',variant:'Black',qty:2,unitPrice:19.99}]}\n  coupon={{ code: 'SAVE10', discount: 10 }}\n  shippingCost={5.99}\n  onCheckout={handleCheckout}\n/>`,
      variants: [
        {
          title: 'Cart with coupon',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-md">
              <CartSummary
                items={[
                  { id: '1', name: 'Wireless Headphones', qty: 1, unitPrice: 79.99 },
                  { id: '2', name: 'Carry Case', variant: 'Black', qty: 2, unitPrice: 19.99 },
                ]}
                coupon={{ code: 'SAVE10', discount: 10 }}
                shippingCost={5.99}
              />
            </div>
          ),
          code: `<CartSummary\n  items={[\n    { id: '1', name: 'Wireless Headphones', qty: 1, unitPrice: 79.99 },\n    { id: '2', name: 'Carry Case', qty: 2, unitPrice: 19.99 },\n  ]}\n  coupon={{ code: 'SAVE10', discount: 10 }}\n  shippingCost={5.99}\n  onCheckout={handleCheckout}\n  onRemove={(id) => removeFromCart(id)}\n/>`,
        },
      ],
    },

    {
      id: 'ec-checkout-address',
      title: 'CheckoutAddressStep',
      category: 'Domain' as const,
      abbr: 'Ca',
      description: 'Multi-field checkout address form with stepper progress, validation, and save-address toggle.',
      filePath: 'modules/domain/ecommerce/CheckoutAddressStep.tsx',
      sourceCode: `import { CheckoutAddressStep } from '@/modules/domain/ecommerce/CheckoutAddressStep';\n\n<CheckoutAddressStep onNext={(address) => goToShipping(address)} />`,
      variants: [
        {
          title: 'Checkout address step',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-lg">
              <CheckoutAddressStep />
            </div>
          ),
          code: `<CheckoutAddressStep\n  onNext={(address) => {\n    console.log(address);\n    goToNextStep();\n  }}\n/>`,
        },
      ],
    },
  ];
}
