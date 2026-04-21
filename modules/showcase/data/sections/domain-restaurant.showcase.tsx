'use client';
import { MenuCategoryTabs } from '@/modules/domain/restaurant/MenuCategoryTabs';
import { RestaurantProductCard } from '@/modules/domain/restaurant/RestaurantProductCard';
import { CartSummaryPanel } from '@/modules/domain/restaurant/CartSummaryPanel';
import { RestaurantDeliverySlotPicker } from '@/modules/domain/restaurant/RestaurantDeliverySlotPicker';
import { OrderTrackingTimeline } from '@/modules/domain/restaurant/OrderTrackingTimeline';
import { KitchenQueueBoard } from '@/modules/domain/restaurant/KitchenQueueBoard';
import type { ShowcaseComponent } from '../showcase.types';

export function buildRestaurantData(): ShowcaseComponent[] {
  return [
    {
      id: 'rest-menu-tabs',
      title: 'MenuCategoryTabs',
      category: 'Domain' as const,
      abbr: 'Mt',
      description: 'Horizontal tabs for menu categories (Starters/Mains/Desserts/Drinks) with item count badges and searchable grid.',
      filePath: 'modules/domain/restaurant/MenuCategoryTabs.tsx',
      sourceCode: `import { MenuCategoryTabs } from '@/modules/domain/restaurant/MenuCategoryTabs';\n\n<MenuCategoryTabs />`,
      variants: [
        {
          title: 'Menu category tabs',
          layout: 'stack' as const,
          preview: (<div className="w-full"><MenuCategoryTabs /></div>),
          code: `<MenuCategoryTabs />`,
        },
      ],
    },
    {
      id: 'rest-product-card',
      title: 'RestaurantProductCard',
      category: 'Domain' as const,
      abbr: 'Pc',
      description: 'Menu item card with price, dietary badges, and an add-to-cart button with quantity counter.',
      filePath: 'modules/domain/restaurant/RestaurantProductCard.tsx',
      sourceCode: `import { RestaurantProductCard } from '@/modules/domain/restaurant/RestaurantProductCard';\n\n<RestaurantProductCard />`,
      variants: [
        {
          title: 'Product card',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><RestaurantProductCard /></div>),
          code: `<RestaurantProductCard />`,
        },
      ],
    },
    {
      id: 'rest-cart-summary',
      title: 'CartSummaryPanel',
      category: 'Domain' as const,
      abbr: 'Cs',
      description: 'Order summary with item table, promo code input, tax/delivery breakdown, and checkout button.',
      filePath: 'modules/domain/restaurant/CartSummaryPanel.tsx',
      sourceCode: `import { CartSummaryPanel } from '@/modules/domain/restaurant/CartSummaryPanel';\n\n<CartSummaryPanel />`,
      variants: [
        {
          title: 'Cart summary',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><CartSummaryPanel /></div>),
          code: `<CartSummaryPanel />`,
        },
      ],
    },
    {
      id: 'rest-delivery-slot',
      title: 'RestaurantDeliverySlotPicker',
      category: 'Domain' as const,
      abbr: 'Ds',
      description: 'Delivery slot picker with delivery type, date picker, and time slot selector.',
      filePath: 'modules/domain/restaurant/RestaurantDeliverySlotPicker.tsx',
      sourceCode: `import { RestaurantDeliverySlotPicker } from '@/modules/domain/restaurant/RestaurantDeliverySlotPicker';\n\n<RestaurantDeliverySlotPicker />`,
      variants: [
        {
          title: 'Delivery slot picker',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><RestaurantDeliverySlotPicker /></div>),
          code: `<RestaurantDeliverySlotPicker />`,
        },
      ],
    },
    {
      id: 'rest-order-tracking',
      title: 'OrderTrackingTimeline',
      category: 'Domain' as const,
      abbr: 'Ot',
      description: 'Order status stepper from Placed to Delivered with timestamp badges.',
      filePath: 'modules/domain/restaurant/OrderTrackingTimeline.tsx',
      sourceCode: `import { OrderTrackingTimeline } from '@/modules/domain/restaurant/OrderTrackingTimeline';\n\n<OrderTrackingTimeline />`,
      variants: [
        {
          title: 'Order tracking',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><OrderTrackingTimeline /></div>),
          code: `<OrderTrackingTimeline />`,
        },
      ],
    },
    {
      id: 'rest-kitchen-queue',
      title: 'KitchenQueueBoard',
      category: 'Domain' as const,
      abbr: 'Kq',
      description: 'Kitchen order queue table with elapsed-time badges (red when >15min), status, and Start/Done action buttons.',
      filePath: 'modules/domain/restaurant/KitchenQueueBoard.tsx',
      sourceCode: `import { KitchenQueueBoard } from '@/modules/domain/restaurant/KitchenQueueBoard';\n\n<KitchenQueueBoard />`,
      variants: [
        {
          title: 'Kitchen queue',
          layout: 'stack' as const,
          preview: (<div className="w-full"><KitchenQueueBoard /></div>),
          code: `<KitchenQueueBoard />`,
        },
      ],
    },
  ];
}
