'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import type { FaqItem } from '../types';

type FaqAccordionItemProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqAccordionItem({ item, isOpen, onToggle }: FaqAccordionItemProps) {
  const answerId = `faq-answer-${item.faqId}`;
  const buttonId = `faq-btn-${item.faqId}`;

  return (
    <div className="border-b border-border last:border-0">
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
        className={cn(
          'flex w-full items-center justify-between gap-4 py-5 text-left',
          'text-sm font-semibold text-text-primary transition-colors hover:text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-sm',
        )}
      >
        <span>{item.question}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={cn(
            'w-3.5 h-3.5 flex-shrink-0 text-text-secondary transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={answerId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="pb-5"
      >
        <p className="text-sm text-text-secondary leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

type FaqAccordionProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: FaqItem[];
  allowMultiple?: boolean;
  className?: string;
};

export function FaqAccordion({
  eyebrow,
  title,
  subtitle,
  items,
  allowMultiple = false,
  className,
}: FaqAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([items[0]?.faqId]));

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <section className={cn('py-16 lg:py-24', className)}>
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-10">
          {eyebrow && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-3 text-base text-text-secondary leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-surface-raised px-6">
          {items.map((item) => (
            <FaqAccordionItem
              key={item.faqId}
              item={item}
              isOpen={openIds.has(item.faqId)}
              onToggle={() => toggle(item.faqId)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
