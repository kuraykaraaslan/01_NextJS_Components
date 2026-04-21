'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Tooltip } from '@/modules/ui/Tooltip';

export type MenuProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  vegan?: boolean;
  spicy?: boolean;
};

const DEFAULT_PRODUCT: MenuProduct = {
  id: 'p1',
  name: 'Spicy Mushroom Tacos',
  description: 'Three corn tortillas with roasted mushrooms, chipotle salsa, pickled onion, and cilantro.',
  price: 14,
  vegan: true,
  spicy: true,
};

export function RestaurantProductCard({ product = DEFAULT_PRODUCT }: { product?: MenuProduct }) {
  const [qty, setQty] = useState(0);

  return (
    <Card className="max-w-sm">
      <div className="p-4 space-y-3">
        <div className="h-32 bg-surface-sunken rounded-lg flex items-center justify-center text-4xl">🌮</div>
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-text-primary">{product.name}</h3>
            <Badge variant="success" size="sm">${product.price}</Badge>
          </div>
          <p className="text-xs text-text-secondary">{product.description}</p>
        </div>
        <div className="flex gap-1 flex-wrap">
          {product.vegan && (
            <Tooltip content="100% plant-based ingredients">
              <span><Badge variant="success" size="sm">🌱 Vegan</Badge></span>
            </Tooltip>
          )}
          {product.spicy && (
            <Tooltip content="Contains chilli — mild to medium heat">
              <span><Badge variant="warning" size="sm">🌶 Spicy</Badge></span>
            </Tooltip>
          )}
        </div>
        <div className="flex items-center gap-3">
          {qty === 0 ? (
            <Button variant="primary" fullWidth onClick={() => setQty(1)}>Add to cart</Button>
          ) : (
            <div className="flex items-center gap-2 w-full justify-between">
              <Button variant="outline" size="sm" onClick={() => setQty((q) => Math.max(0, q - 1))}>−</Button>
              <span className="text-sm font-semibold text-text-primary">{qty}</span>
              <Button variant="outline" size="sm" onClick={() => setQty((q) => q + 1)}>+</Button>
              <Button variant="primary" size="sm" onClick={() => setQty(0)} className="ml-auto">Remove</Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
