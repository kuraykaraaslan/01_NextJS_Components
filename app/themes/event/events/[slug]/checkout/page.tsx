'use client';
import { useState, use } from 'react';
import { Button } from '@/modules/ui/Button';
import { Input } from '@/modules/ui/Input';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { Spinner } from '@/modules/ui/Spinner';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { CreditCardForm } from '@/modules/domains/common/payment/CreditCardForm';
import { CouponInput } from '@/modules/domains/common/discount/CouponInput';
import { OrderTotalsCard } from '@/modules/domains/common/money/OrderTotalsCard';
import { SectionPricingCard } from '@/modules/domains/event/SectionPricingCard';
import { TicketCard } from '@/modules/domains/event/TicketCard';
import {
  getEventBySlug,
  getPricingsByEventId,
  VENUES,
} from '@/app/themes/event/event.data';
import type { EventSectionPricing } from '@/modules/domains/event/types';
import type { CreditCardInput } from '@/modules/domains/common/PaymentTypes';
import type { OrderTotals } from '@/modules/domains/common/MoneyTypes';

/* ── types ── */

type Step = 'tickets' | 'buyer' | 'payment' | 'confirm';

type BuyerInfo = {
  name: string;
  email: string;
  phone: string;
};

type CartItem = {
  pricing: EventSectionPricing;
  quantity: number;
};

const FMT = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 });
const FMT_DATE = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const FMT_TIME = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' });

const SERVICE_FEE_RATE = 0.05;
const VALID_COUPON = 'BILLET20';

/* ── StepIndicator ── */

function StepIndicator({ current }: { current: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: 'tickets', label: 'Biletler' },
    { id: 'buyer', label: 'Bilgiler' },
    { id: 'payment', label: 'Ödeme' },
    { id: 'confirm', label: 'Onay' },
  ];
  const currentIdx = steps.findIndex((s) => s.id === current);

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  done
                    ? 'bg-success text-white'
                    : active
                      ? 'bg-primary text-primary-fg'
                      : 'bg-surface-overlay text-text-disabled border border-border'
                }`}
              >
                {done ? '✓' : i + 1}
              </div>
              <span className={`text-[10px] font-medium whitespace-nowrap ${active ? 'text-primary' : done ? 'text-text-secondary' : 'text-text-disabled'}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px w-12 sm:w-16 mb-4 transition-colors ${done ? 'bg-success' : 'bg-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════
   Page
════════════════════════════════════════════ */

export default function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const event = getEventBySlug(slug);
  const pricings = event ? getPricingsByEventId(event.eventId) : [];
  const venue = VENUES[0];

  /* ── state ── */
  const [step, setStep] = useState<Step>('tickets');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [buyer, setBuyer] = useState<BuyerInfo>({ name: '', email: '', phone: '' });
  const [couponCode, setCouponCode] = useState<string | undefined>();
  const [discountPct, setDiscountPct] = useState(0);
  const [paying, setPaying] = useState(false);
  const [ticketId] = useState(`TKT-${Math.random().toString(36).slice(2, 9).toUpperCase()}`);
  const [orderId] = useState(`ORD-${Math.random().toString(36).slice(2, 9).toUpperCase()}`);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-text-secondary">Etkinlik bulunamadı.</p>
        <a
          href="/themes/event/events"
          className="inline-flex items-center justify-center mt-4 rounded-md border border-border text-text-primary hover:bg-surface-overlay px-4 py-2 text-sm font-medium transition-colors"
        >
          Etkinliklere Dön
        </a>
      </div>
    );
  }

  /* ── cart calculations ── */
  const cartItems: CartItem[] = pricings
    .map((p) => ({ pricing: p, quantity: quantities[p.eventSectionPricingId] ?? 0 }))
    .filter((i) => i.quantity > 0);

  const subtotal = cartItems.reduce((acc, i) => acc + i.pricing.price * i.quantity, 0);
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);
  const discount = Math.round(subtotal * discountPct);
  const total = subtotal + serviceFee - discount;
  const totalQty = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const orderTotals: OrderTotals = {
    subtotal,
    serviceFee,
    discountTotal: discount,
    taxTotal: 0,
    shippingTotal: 0,
    total,
    currency: 'TRY',
  };

  /* ── handlers ── */

  function setQty(pricingId: string, qty: number) {
    setQuantities((prev) => ({ ...prev, [pricingId]: qty }));
  }

  async function handleCouponApply(code: string) {
    await new Promise((r) => setTimeout(r, 700));
    if (code.toUpperCase() === VALID_COUPON) {
      setDiscountPct(0.2);
      setCouponCode(code.toUpperCase());
      return { success: true, message: '20% indirim uygulandı!' };
    }
    return { success: false, message: `Geçersiz kupon. "${VALID_COUPON}" deneyin.` };
  }

  async function handlePay(_card: CreditCardInput) {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 1800));
    setPaying(false);
    setStep('confirm');
  }

  /* ── success view ── */

  if (step === 'confirm') {
    const ticket = {
      ticketId,
      orderId,
      orderItemId: `OI-${ticketId}`,
      eventId: event.eventId,
      hallId: 'hall-1',
      sectionId: cartItems[0]?.pricing.sectionId ?? 'sec-1',
      seatId: 'seat-auto',
      eventSeatId: 'eseat-auto',
      pricingId: cartItems[0]?.pricing.eventSectionPricingId ?? 'price-1',
      attendeeName: buyer.name || null,
      attendeeEmail: buyer.email || null,
      qrCode: `QR-${ticketId}-${event.eventId}`.toUpperCase(),
      barcode: null,
      status: 'VALID' as const,
      checkedInAt: null,
      checkedInBy: null,
      transferredToUserId: null,
      transferredAt: null,
      createdAt: new Date(),
    };

    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 space-y-6">
        <div className="text-center space-y-3">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-success-subtle text-4xl mx-auto">
            ✓
          </span>
          <h1 className="text-2xl font-black text-text-primary">Ödeme Başarılı!</h1>
          <p className="text-text-secondary">
            Biletiniz oluşturuldu. Sipariş numaranız: <strong>{orderId}</strong>
          </p>
          {buyer.email && (
            <p className="text-xs text-text-secondary">
              Bilet detayları <strong>{buyer.email}</strong> adresine gönderildi.
            </p>
          )}
        </div>

        <TicketCard
          ticket={ticket}
          event={{
            title: event.title,
            startAt: event.startAt,
            venueName: venue.name,
            venueCity: venue.city,
          }}
          section={cartItems[0] ? {
            sectionName: cartItems[0].pricing.name,
          } : undefined}
        />

        <div className="rounded-xl border border-border bg-surface-raised p-4 space-y-2 text-sm">
          <p className="font-semibold text-text-primary">Sipariş özeti</p>
          {cartItems.map((item) => (
            <div key={item.pricing.eventSectionPricingId} className="flex justify-between text-text-secondary">
              <span>{item.pricing.name} × {item.quantity}</span>
              <span className="font-mono">{FMT.format(item.pricing.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2 flex justify-between font-bold text-text-primary">
            <span>Toplam</span>
            <span className="font-mono">{FMT.format(total)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => window.print()}
          >
            Yazdır / PDF
          </Button>
          <a
            href={`/themes/event/events/${slug}`}
            className="flex flex-1 items-center justify-center rounded-md bg-primary text-primary-fg hover:bg-primary-hover px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            Etkinliğe Dön
          </a>
        </div>
      </div>
    );
  }

  /* ── main checkout ── */

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <Breadcrumb
        items={[
          { label: 'Ana Sayfa', href: '/themes/event' },
          { label: 'Etkinlikler', href: '/themes/event/events' },
          { label: event.title, href: `/themes/event/events/${slug}` },
          { label: 'Bilet Al' },
        ]}
        className="mb-6"
      />

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-text-primary">{event.title}</h1>
          <p className="text-text-secondary text-sm mt-0.5">
            {FMT_DATE.format(event.startAt)} · {FMT_TIME.format(event.startAt)} · {venue.name}
          </p>
        </div>
        <StepIndicator current={step} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px] items-start">
        {/* ── left: step content ── */}
        <div className="space-y-4">

          {/* STEP 1: Ticket selection */}
          {step === 'tickets' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-primary bg-surface-raised p-5 space-y-3">
                <h2 className="font-bold text-text-primary">Bilet Seçimi</h2>
                <p className="text-xs text-text-secondary">Bilet kategorisi ve adet seçin.</p>
                <div className="space-y-3">
                  {pricings.map((p) => (
                    <SectionPricingCard
                      key={p.eventSectionPricingId}
                      pricing={p}
                      quantity={quantities[p.eventSectionPricingId] ?? 0}
                      onQuantityChange={(qty) => setQty(p.eventSectionPricingId, qty)}
                      selected={(quantities[p.eventSectionPricingId] ?? 0) > 0}
                    />
                  ))}
                </div>
              </div>

              <Button
                fullWidth
                disabled={totalQty === 0}
                onClick={() => setStep('buyer')}
                size="lg"
              >
                Devam Et ({totalQty} bilet)
              </Button>
            </div>
          )}

          {/* STEP 2: Buyer info */}
          {step === 'buyer' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-primary bg-surface-raised p-5 space-y-4">
                <h2 className="font-bold text-text-primary">Kişisel Bilgiler</h2>
                <Input
                  id="buyer-name"
                  label="Ad Soyad"
                  value={buyer.name}
                  onChange={(e) => setBuyer((b) => ({ ...b, name: e.target.value }))}
                  placeholder="Adınız ve soyadınız"
                  required
                />
                <Input
                  id="buyer-email"
                  label="E-posta"
                  type="email"
                  value={buyer.email}
                  onChange={(e) => setBuyer((b) => ({ ...b, email: e.target.value }))}
                  placeholder="ornek@email.com"
                  hint="Biletiniz bu adrese gönderilecek."
                  required
                />
                <Input
                  id="buyer-phone"
                  label="Telefon"
                  type="tel"
                  value={buyer.phone}
                  onChange={(e) => setBuyer((b) => ({ ...b, phone: e.target.value }))}
                  placeholder="+90 5xx xxx xx xx"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('tickets')}>
                  Geri
                </Button>
                <Button
                  fullWidth
                  disabled={!buyer.name || !buyer.email}
                  onClick={() => setStep('payment')}
                  size="lg"
                >
                  Ödemeye Geç
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-primary bg-surface-raised p-5 space-y-5">
                <h2 className="font-bold text-text-primary">Ödeme Bilgileri</h2>

                <CouponInput
                  appliedCode={couponCode}
                  onApply={handleCouponApply}
                  onRemove={() => { setCouponCode(undefined); setDiscountPct(0); }}
                />

                {paying ? (
                  <div className="flex flex-col items-center gap-3 py-8">
                    <Spinner size="lg" />
                    <p className="text-text-secondary text-sm">Ödeme işleniyor...</p>
                  </div>
                ) : (
                  <CreditCardForm
                    onSubmit={handlePay}
                    onCancel={() => setStep('buyer')}
                  />
                )}
              </div>

              <AlertBanner
                variant="info"
                message="🔒 Ödeme bilgileriniz 256-bit SSL şifreleme ile korunmaktadır."
              />
            </div>
          )}
        </div>

        {/* ── right: order summary ── */}
        <aside className="lg:sticky lg:top-24 space-y-4">
          {/* event info */}
          <div className="rounded-xl border border-border bg-surface-raised overflow-hidden">
            {event.image && (
              <img src={event.image} alt={event.title} className="w-full h-32 object-cover" />
            )}
            <div className="p-4 space-y-1">
              <p className="font-bold text-text-primary text-sm line-clamp-2">{event.title}</p>
              <p className="text-xs text-text-secondary">{FMT_DATE.format(event.startAt)}</p>
              <p className="text-xs text-text-secondary">{venue.name}, {venue.city}</p>
            </div>
          </div>

          {/* cart items */}
          {cartItems.length > 0 && (
            <div className="rounded-xl border border-border bg-surface-raised p-4 space-y-2">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Sepetiniz</p>
              {cartItems.map((item) => (
                <div key={item.pricing.eventSectionPricingId} className="flex justify-between text-sm">
                  <span className="text-text-secondary">
                    {item.pricing.name} × {item.quantity}
                  </span>
                  <span className="font-semibold text-text-primary font-mono">
                    {FMT.format(item.pricing.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* order totals */}
          <OrderTotalsCard totals={orderTotals} />

          {step !== 'tickets' && (
            <p className="text-xs text-center text-text-secondary">
              İpucu: Kupon kodu <strong>{VALID_COUPON}</strong> — %20 indirim
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
