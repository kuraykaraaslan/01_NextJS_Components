'use client';
import { useState } from 'react';
import { TabGroup } from '@/modules/ui/TabGroup';
import { Badge } from '@/modules/ui/Badge';
import { Card } from '@/modules/ui/Card';
import { SearchBar } from '@/modules/ui/SearchBar';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
};

const MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', price: '$8', category: 'starters' },
  { id: 'm2', name: 'Calamari Fritti', description: 'Crispy fried squid with lemon aioli', price: '$12', category: 'starters' },
  { id: 'm3', name: 'Soup of the Day', description: "Chef's seasonal soup selection", price: '$7', category: 'starters' },
  { id: 'm4', name: 'Grilled Salmon', description: 'Atlantic salmon with herb butter', price: '$26', category: 'mains' },
  { id: 'm5', name: 'Beef Tenderloin', description: '8oz tenderloin with truffle fries', price: '$38', category: 'mains' },
  { id: 'm6', name: 'Mushroom Risotto', description: 'Arborio rice with porcini mushrooms', price: '$22', category: 'mains' },
  { id: 'm7', name: 'Tiramisu', description: 'Classic Italian espresso dessert', price: '$9', category: 'desserts' },
  { id: 'm8', name: 'Crème Brûlée', description: 'Vanilla custard with caramel crust', price: '$8', category: 'desserts' },
  { id: 'm9', name: 'House Wine', description: 'Cabernet Sauvignon, glass', price: '$11', category: 'drinks' },
  { id: 'm10', name: 'Craft Beer', description: 'Local IPA on draft', price: '$7', category: 'drinks' },
];

function ItemGrid({ items }: { items: MenuItem[] }) {
  const [search, setSearch] = useState('');
  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <SearchBar value={search} onChange={setSearch} placeholder="Search items…" />
      {filtered.length === 0 ? (
        <p className="text-sm text-text-secondary text-center py-6">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((item) => (
            <Card key={item.id}>
              <div className="p-3 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-text-primary">{item.name}</p>
                  <p className="text-xs text-text-secondary">{item.description}</p>
                </div>
                <Badge variant="success" size="sm">{item.price}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

const CATEGORIES = [
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
];

export function MenuCategoryTabs() {
  const tabs = CATEGORIES.map((cat) => {
    const items = MENU_ITEMS.filter((i) => i.category === cat.id);
    return {
      id: cat.id,
      label: cat.label,
      badge: <Badge variant="neutral" size="sm">{items.length}</Badge>,
      content: <ItemGrid items={items} />,
    };
  });

  return <TabGroup tabs={tabs} label="Menu categories" />;
}
