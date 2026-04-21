'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CartSummary, type CartItem } from '@/modules/domain/ecommerce/CartSummary';
import { CheckoutAddressStep } from '@/modules/domain/ecommerce/CheckoutAddressStep';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { Card } from '@/modules/ui/Card';
import { EmptyState } from '@/modules/ui/EmptyState';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Input } from '@/modules/ui/Input';
import { DEMO_CART_ITEMS } from '../shop.data';

type Step = 'cart' | 'checkout' | 'confirmed';

const COUPON_CODE = 'SAVE15';
const COUPON_DISCOUNT = 15;

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(DEMO_CART_ITEMS);
  const [step, setStep] = useState<Step>('cart');
  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | undefined>();
  const [couponError, setCouponError] = useState('');

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function applyCoupon() {
    if (couponInput.trim().toUpperCase() === COUPON_CODE) {
      setCoupon({ code: COUPON_CODE, discount: COUPON_DISCOUNT });
      setCouponError('');
    } else {
      setCoupon(undefined);
      setCouponError('Invalid coupon code. Try SAVE15.');
    }
  }

  if (step === 'confirmed') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-black text-text-primary">Order Confirmed!</h1>
        <p className="text-text-secondary">
          Thanks for your order. You'll receive a confirmation email shortly.
        </p>
        <Badge variant="success" size="sm">Order #NX-{Math.floor(Math.random() * 90000) + 10000}</Badge>
        <div className="flex justify-center gap-3">
          <Link href="/theme/shop">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
          <Button variant="outline" onClick={() => {
            setItems(DEMO_CART_ITEMS);
            setCoupon(undefined);
            setCouponInput('');
            setStep('cart');
          }}>
            Reset Demo
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'checkout') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/theme/shop' },
            { label: 'Cart', href: '/theme/shop/cart' },
            { label: 'Checkout' },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-black text-text-primary mb-6">Checkout</h1>
            <CheckoutAddressStep onNext={() => setStep('confirmed')} />
            <div className="mt-4">
              <Button variant="ghost" size="sm" onClick={() => setStep('cart')}>
                ← Back to cart
              </Button>
            </div>
          </div>

          <aside>
            <Card>
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-bold text-text-primary">Order Summary</h3>
              </div>
              <div className="p-4">
                <CartSummary
                  items={items}
                  coupon={coupon}
                  shippingCost={0}
                />
              </div>
            </Card>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/theme/shop' },
          { label: 'Cart' },
        ]}
      />

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-black text-text-primary">Shopping Cart</h1>
        <Badge variant={items.length > 0 ? 'primary' : 'neutral'} size="sm">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Start browsing and add items you love."
          action={
            <Link href="/theme/shop/products">
              <Button variant="primary">Start Shopping</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items + coupon */}
          <div className="lg:col-span-2 space-y-4">
            <AlertBanner
              variant="info"
              message="Demo tip: Try coupon code SAVE15 for $15 off your order."
            />

            <CartSummary
              items={items}
              coupon={coupon}
              shippingCost={0}
              onRemove={removeItem}
            />

            {/* Coupon input */}
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Have a coupon?</h3>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    id="coupon"
                    label=""
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError('');
                    }}
                    error={couponError}
                  />
                </div>
                <div className="pt-0.5">
                  <Button variant="outline" size="sm" onClick={applyCoupon}>
                    Apply
                  </Button>
                </div>
              </div>
              {coupon && (
                <p className="mt-2 text-xs text-success-fg flex items-center gap-1">
                  <span>✓</span> Coupon <strong>{coupon.code}</strong> applied — $15 off!
                </p>
              )}
            </Card>

            <div className="flex justify-between items-center pt-2">
              <Link href="/theme/shop/products">
                <Button variant="ghost" size="sm">← Continue Shopping</Button>
              </Link>
            </div>
          </div>

          {/* Order summary sidebar */}
          <aside className="space-y-4">
            <Card>
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-bold text-text-primary">Order Summary</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${items.reduce((s, i) => s + i.qty * i.unitPrice, 0).toFixed(2)}</span>
                </div>
                {coupon && (
                  <div className="flex justify-between text-sm text-success-fg">
                    <span>Coupon ({coupon.code})</span>
                    <span>-${coupon.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Shipping</span>
                  <span className="text-success-fg font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold text-text-primary pt-2 border-t border-border">
                  <span>Total</span>
                  <span>
                    ${(
                      items.reduce((s, i) => s + i.qty * i.unitPrice, 0) -
                      (coupon?.discount ?? 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="px-4 pb-4 space-y-2">
                <Button
                  variant="primary"
                  fullWidth
                  iconRight="→"
                  onClick={() => setStep('checkout')}
                >
                  Proceed to Checkout
                </Button>
                <div className="flex justify-center gap-2 pt-1">
                  {['🔒 Secure', '📦 Free returns'].map((t) => (
                    <span key={t} className="text-xs text-text-disabled">{t}</span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Payment icons */}
            <Card className="p-4">
              <p className="text-xs text-text-secondary mb-2 font-medium">We accept</p>
              <div className="flex flex-wrap gap-1.5">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'].map((pm) => (
                  <Badge key={pm} variant="neutral" size="sm">{pm}</Badge>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}
