'use client';
import { cn } from '@/libs/utils/cn';

type PostContentProps = {
  content: string;
  className?: string;
};

export function PostContent({ content, className }: PostContentProps) {
  return (
    <div
      className={cn(
        'text-text-primary leading-relaxed',
        '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-text-primary [&_h1]:mt-8 [&_h1]:mb-4',
        '[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-text-primary [&_h2]:mt-7 [&_h2]:mb-3',
        '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-text-primary [&_h3]:mt-6 [&_h3]:mb-2',
        '[&_p]:mb-5 [&_p]:text-base',
        '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-hover',
        '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul_li]:mb-1',
        '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol_li]:mb-1',
        '[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:py-1',
        '[&_blockquote]:italic [&_blockquote]:text-text-secondary [&_blockquote]:my-6',
        '[&_code]:bg-surface-sunken [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono',
        '[&_pre]:bg-surface-sunken [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-5',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
        '[&_img]:rounded-lg [&_img]:max-w-full [&_img]:my-6',
        '[&_hr]:border-border [&_hr]:my-8',
        '[&_table]:w-full [&_table]:text-sm [&_table]:border-collapse [&_table]:mb-5',
        '[&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:bg-surface-raised [&_th]:font-semibold [&_th]:text-left',
        '[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2',
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
