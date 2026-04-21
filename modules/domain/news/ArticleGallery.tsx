'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Button } from '@/modules/ui/Button';
import { Modal } from '@/modules/ui/Modal';
import { Tooltip } from '@/modules/ui/Tooltip';

type GalleryImage = {
  id: string;
  color: string;
  caption: string;
  credit: string;
  altText: string;
};

const DEFAULT_IMAGES: GalleryImage[] = [
  { id: '1', color: 'from-blue-400 to-blue-700', caption: 'World leaders arrive at the Palais des Nations for the opening session', credit: 'Photo: Reuters / Jean-Pierre Clatot', altText: 'Delegates entering the summit venue' },
  { id: '2', color: 'from-green-400 to-teal-700', caption: 'Youth climate activists gather outside during the negotiations', credit: 'Photo: Getty / Fabrice Coffrini', altText: 'Protesters holding climate signs' },
  { id: '3', color: 'from-orange-400 to-red-600', caption: 'UN Secretary-General addresses the plenary session', credit: 'Photo: AP / Markus Schreiber', altText: 'Secretary-General at the podium' },
  { id: '4', color: 'from-violet-400 to-purple-700', caption: 'Delegates from 147 nations sign the historic accord', credit: 'Photo: AFP / Fabrice Coffrini', altText: 'Signing ceremony of the Geneva Carbon Accord' },
  { id: '5', color: 'from-sky-400 to-cyan-700', caption: 'The final text is reviewed before the closing plenary', credit: 'Photo: EPA / Martial Trezzini', altText: 'Document review session' },
  { id: '6', color: 'from-amber-400 to-yellow-600', caption: 'Celebration outside as news of the agreement breaks', credit: 'Photo: Reuters / Denis Balibouse', altText: 'Crowds celebrating outside the venue' },
];

export function ArticleGallery({
  images = DEFAULT_IMAGES,
  className,
}: {
  images?: GalleryImage[];
  className?: string;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  function openLightbox(idx: number) {
    setCurrentIdx(idx);
    setLightboxOpen(true);
  }

  function prev() {
    setCurrentIdx((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setCurrentIdx((i) => (i + 1) % images.length);
  }

  const currentImg = images[currentIdx];

  return (
    <div className={className}>
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-text-primary">Photo Gallery</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {images.map((img, idx) => (
            <Tooltip key={img.id} content={img.caption}>
              <button
                onClick={() => openLightbox(idx)}
                className="relative rounded-lg overflow-hidden aspect-video focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus hover:opacity-90 transition-opacity"
                aria-label={img.altText}
              >
                <div className={`w-full h-full bg-gradient-to-br ${img.color} flex items-center justify-center`}>
                  <span className="text-white/50 text-2xl">{idx + 1}</span>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-lg">⊕</span>
                </div>
              </button>
            </Tooltip>
          ))}
        </div>
        <p className="text-xs text-text-disabled">{images.length} photos — click any image to expand</p>
      </div>

      <Modal
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={`Photo ${currentIdx + 1} of ${images.length}`}
        size="lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button variant="secondary" size="sm" onClick={prev}>← Previous</Button>
            <span className="text-xs text-text-secondary">{currentIdx + 1} / {images.length}</span>
            <Button variant="secondary" size="sm" onClick={next}>Next →</Button>
          </div>
        }
      >
        {currentImg && (
          <div className="space-y-3">
            <div className={`w-full aspect-video rounded-lg bg-gradient-to-br ${currentImg.color} flex items-center justify-center`}>
              <span className="text-white/30 text-6xl font-bold">{currentIdx + 1}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{currentImg.caption}</p>
              <p className="text-xs text-text-disabled mt-1">{currentImg.credit}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
