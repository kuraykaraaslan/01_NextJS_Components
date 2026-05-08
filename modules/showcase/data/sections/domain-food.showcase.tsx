'use client';
import type { ShowcaseComponent } from '../showcase.types';
import { RestaurantStatusBadge } from '@/modules/domains/food/restaurant/RestaurantStatusBadge';
import { OrderStatusBadge } from '@/modules/domains/food/order/OrderStatusBadge';
import { DeliveryStatusBadge } from '@/modules/domains/food/order/DeliveryStatusBadge';
import { RestaurantCard } from '@/modules/domains/food/restaurant/RestaurantCard';
import { MenuItemCard } from '@/modules/domains/food/menu/MenuItemCard';

/* ─── demo data ─── */

const DEMO_RESTAURANT = {
  restaurantId: 'r-demo',
  name: 'Bella Napoli',
  slug: 'bella-napoli',
  description: 'Authentic Neapolitan pizza and pasta made with imported Italian ingredients.',
  cuisineTypes: ['Italian'],
  address: '12 Piazza Verde',
  city: 'New York',
  rating: 4.8,
  deliveryTimeMin: 25,
  deliveryTimeMax: 40,
  status: 'ACTIVE' as const,
};

const DEMO_RESTAURANT_CLOSED = {
  ...DEMO_RESTAURANT,
  restaurantId: 'r-demo-2',
  name: 'Sakura Bento',
  cuisineTypes: ['Japanese'],
  rating: 4.6,
  deliveryTimeMin: 30,
  deliveryTimeMax: 50,
  status: 'CLOSED' as const,
};

const DEMO_MENU_ITEM_VEG = {
  menuItemId: 'mi-demo-1',
  name: 'Margherita Pizza',
  description: 'Classic San Marzano tomato base, fior di latte mozzarella, fresh basil, extra virgin olive oil.',
  price: 14.5,
  currency: 'USD',
  imageUrl: null,
  calories: 780,
  isVegetarian: true,
  isVegan: false,
  status: 'AVAILABLE' as const,
};

const DEMO_MENU_ITEM_VEGAN = {
  menuItemId: 'mi-demo-2',
  name: 'Vegetable Biryani',
  description: 'Fragrant basmati rice layered with seasonal vegetables, saffron, and fried onions.',
  price: 12.0,
  currency: 'USD',
  imageUrl: null,
  calories: 710,
  isVegetarian: true,
  isVegan: true,
  status: 'AVAILABLE' as const,
};

const DEMO_MENU_ITEM_OOS = {
  menuItemId: 'mi-demo-3',
  name: 'Tonkotsu Ramen',
  description: 'Rich pork bone broth, chashu pork, soft-boiled egg, bamboo shoots.',
  price: 15.5,
  currency: 'USD',
  imageUrl: null,
  calories: 850,
  isVegetarian: false,
  isVegan: false,
  status: 'OUT_OF_STOCK' as const,
};

/* ─── builder ─── */

export function buildFoodDomainData(): ShowcaseComponent[] {
  return [
    {
      id: 'food-restaurant-status-badge',
      title: 'RestaurantStatusBadge',
      category: 'Domain',
      abbr: 'RS',
      description: 'Displays restaurant operational status with semantic colour coding.',
      filePath: 'modules/domains/food/restaurant/RestaurantStatusBadge.tsx',
      sourceCode: `import { RestaurantStatusBadge } from '@/modules/domains/food/restaurant/RestaurantStatusBadge';
<RestaurantStatusBadge status="ACTIVE" />`,
      variants: [
        {
          title: 'All statuses',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['ACTIVE', 'INACTIVE', 'CLOSED'] as const).map((s) => (
                <RestaurantStatusBadge key={s} status={s} />
              ))}
            </div>
          ),
          code: `{(['ACTIVE', 'INACTIVE', 'CLOSED'] as const).map((s) => (
  <RestaurantStatusBadge key={s} status={s} />
))}`,
        },
        {
          title: 'Sizes',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              <RestaurantStatusBadge status="ACTIVE" size="sm" />
              <RestaurantStatusBadge status="ACTIVE" size="md" />
            </div>
          ),
          code: `<RestaurantStatusBadge status="ACTIVE" size="sm" />
<RestaurantStatusBadge status="ACTIVE" size="md" />`,
        },
      ],
    },
    {
      id: 'food-order-status-badge',
      title: 'OrderStatusBadge',
      category: 'Domain',
      abbr: 'FO',
      description: 'Tracks a food order through its full lifecycle with semantic colours.',
      filePath: 'modules/domains/food/order/OrderStatusBadge.tsx',
      sourceCode: `import { OrderStatusBadge } from '@/modules/domains/food/order/OrderStatusBadge';
<OrderStatusBadge status="PREPARING" />`,
      variants: [
        {
          title: 'All statuses',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'PICKED_UP', 'ON_THE_WAY', 'DELIVERED', 'CANCELLED', 'REFUNDED'] as const).map((s) => (
                <OrderStatusBadge key={s} status={s} />
              ))}
            </div>
          ),
          code: `{(['PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'PICKED_UP', 'ON_THE_WAY', 'DELIVERED', 'CANCELLED', 'REFUNDED'] as const).map((s) => (
  <OrderStatusBadge key={s} status={s} />
))}`,
        },
        {
          title: 'Key states',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              <OrderStatusBadge status="PREPARING" size="sm" />
              <OrderStatusBadge status="DELIVERED" size="sm" />
              <OrderStatusBadge status="CANCELLED" size="sm" />
            </div>
          ),
          code: `<OrderStatusBadge status="PREPARING" size="sm" />
<OrderStatusBadge status="DELIVERED" size="sm" />
<OrderStatusBadge status="CANCELLED" size="sm" />`,
        },
      ],
    },
    {
      id: 'food-delivery-status-badge',
      title: 'DeliveryStatusBadge',
      category: 'Domain',
      abbr: 'DS',
      description: 'Shows courier delivery progress from assignment through completion.',
      filePath: 'modules/domains/food/order/DeliveryStatusBadge.tsx',
      sourceCode: `import { DeliveryStatusBadge } from '@/modules/domains/food/order/DeliveryStatusBadge';
<DeliveryStatusBadge status="ON_THE_WAY" />`,
      variants: [
        {
          title: 'All statuses',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['PENDING', 'ASSIGNED', 'PICKED_UP', 'ON_THE_WAY', 'DELIVERED', 'FAILED'] as const).map((s) => (
                <DeliveryStatusBadge key={s} status={s} />
              ))}
            </div>
          ),
          code: `{(['PENDING', 'ASSIGNED', 'PICKED_UP', 'ON_THE_WAY', 'DELIVERED', 'FAILED'] as const).map((s) => (
  <DeliveryStatusBadge key={s} status={s} />
))}`,
        },
        {
          title: 'Sizes',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              <DeliveryStatusBadge status="ON_THE_WAY" size="sm" />
              <DeliveryStatusBadge status="ON_THE_WAY" size="md" />
            </div>
          ),
          code: `<DeliveryStatusBadge status="ON_THE_WAY" size="sm" />
<DeliveryStatusBadge status="ON_THE_WAY" size="md" />`,
        },
      ],
    },
    {
      id: 'food-restaurant-card',
      title: 'RestaurantCard',
      category: 'Domain',
      abbr: 'RC',
      description: 'Hoverable restaurant summary card with gradient image placeholder, cuisine tags, star rating, and delivery estimate.',
      filePath: 'modules/domains/food/restaurant/RestaurantCard.tsx',
      sourceCode: `import { RestaurantCard } from '@/modules/domains/food/restaurant/RestaurantCard';
<RestaurantCard restaurant={restaurant} href="/theme/food/restaurants/bella-napoli" />`,
      variants: [
        {
          title: 'Active with link',
          preview: (
            <div className="max-w-xs">
              <RestaurantCard restaurant={DEMO_RESTAURANT} href="#" />
            </div>
          ),
          code: `<RestaurantCard restaurant={restaurant} href="/restaurants/slug" />`,
        },
        {
          title: 'Closed restaurant',
          preview: (
            <div className="max-w-xs">
              <RestaurantCard restaurant={DEMO_RESTAURANT_CLOSED} />
            </div>
          ),
          code: `<RestaurantCard restaurant={{ ...restaurant, status: 'CLOSED' }} />`,
        },
      ],
    },
    {
      id: 'food-menu-item-card',
      title: 'MenuItemCard',
      category: 'Domain',
      abbr: 'MI',
      description: 'Horizontal menu item card showing name, description, dietary badges, calories, price, and an add-to-cart button.',
      filePath: 'modules/domains/food/menu/MenuItemCard.tsx',
      sourceCode: `import { MenuItemCard } from '@/modules/domains/food/menu/MenuItemCard';
<MenuItemCard item={item} onAddToCart={() => addToCart(item)} />`,
      variants: [
        {
          title: 'Vegetarian with add to cart',
          preview: (
            <div className="max-w-sm">
              <MenuItemCard item={DEMO_MENU_ITEM_VEG} onAddToCart={() => {}} />
            </div>
          ),
          code: `<MenuItemCard item={item} onAddToCart={() => addToCart(item)} />`,
        },
        {
          title: 'Vegan item',
          preview: (
            <div className="max-w-sm">
              <MenuItemCard item={DEMO_MENU_ITEM_VEGAN} onAddToCart={() => {}} />
            </div>
          ),
          code: `<MenuItemCard item={{ ...item, isVegan: true }} onAddToCart={() => addToCart(item)} />`,
        },
        {
          title: 'Out of stock',
          preview: (
            <div className="max-w-sm">
              <MenuItemCard item={DEMO_MENU_ITEM_OOS} />
            </div>
          ),
          code: `<MenuItemCard item={{ ...item, status: 'OUT_OF_STOCK' }} />`,
        },
      ],
    },
  ];
}
