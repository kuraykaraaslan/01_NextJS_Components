'use client';
import dynamic from 'next/dynamic';
import { SkeletonCard, SkeletonTableRow } from './Skeleton';
import type { ComponentType } from 'react';

// Lazy-loaded wrappers for heavy components. Import from this file instead of
// the direct path when the component is below-the-fold or conditionally rendered.
// Each uses next/dynamic with an appropriate Skeleton fallback and ssr: false.

/* eslint-disable @typescript-eslint/no-explicit-any */

export const LazyDataTable: ComponentType<any> = dynamic(
  () => import('./DataTable').then((m) => m.DataTable as any),
  { loading: () => <SkeletonTableRow cols={4} />, ssr: false },
);

export const LazyAdvancedDataTable: ComponentType<any> = dynamic(
  () => import('./AdvancedDataTable').then((m) => m.AdvancedDataTable as any),
  { loading: () => <SkeletonTableRow cols={4} />, ssr: false },
);

export const LazyServerDataTable: ComponentType<any> = dynamic(
  () => import('./ServerDataTable').then((m) => m.ServerDataTable as any),
  { loading: () => <SkeletonTableRow cols={4} />, ssr: false },
);

export const LazyDateRangePicker: ComponentType<any> = dynamic(
  () => import('./DateRangePicker').then((m) => m.DateRangePicker as any),
  { loading: () => <SkeletonCard />, ssr: false },
);

export const LazyMapView: ComponentType<any> = dynamic(
  () => import('./MapView').then((m) => m.MapView as any),
  { loading: () => <SkeletonCard />, ssr: false },
);

export const LazyVideoPlayer: ComponentType<any> = dynamic(
  () => import('./VideoPlayer').then((m) => m.VideoPlayer as any),
  { loading: () => <SkeletonCard />, ssr: false },
);

/* eslint-enable @typescript-eslint/no-explicit-any */
