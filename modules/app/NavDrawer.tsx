'use client';
import { useState } from 'react';
import { Drawer } from '@/modules/ui/Drawer';
import { cn } from '@/libs/utils/cn';

type NavDrawerProps = {
  trigger: React.ReactNode;
  title?: string;
  side?: 'left' | 'right';
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function NavDrawer({
  trigger,
  title = 'Menu',
  side = 'left',
  footer,
  children,
  className,
}: NavDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        role="none"
        onClick={() => setOpen(true)}
        className={cn('inline-flex', className)}
      >
        {trigger}
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        side={side}
        footer={footer}
      >
        {children}
      </Drawer>
    </>
  );
}
