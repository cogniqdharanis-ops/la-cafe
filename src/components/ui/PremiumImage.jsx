import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '../../utils/helpers'

const themePresets = {
  default: {
    label: 'House Signature',
    base:
      'radial-gradient(circle at 20% 20%, rgba(245, 166, 35, 0.34), transparent 28%), radial-gradient(circle at 80% 10%, rgba(200, 16, 46, 0.26), transparent 34%), linear-gradient(145deg, #241109 0%, #1A0A00 44%, #0f0704 100%)',
    glow:
      'linear-gradient(140deg, rgba(255, 248, 240, 0.28), transparent 38%), radial-gradient(circle at 80% 0%, rgba(212, 168, 67, 0.3), transparent 30%)',
    pattern:
      'linear-gradient(120deg, rgba(255, 255, 255, 0.05), transparent 30%), linear-gradient(0deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
  },
  hero: {
    label: 'Downtown Energy',
    base:
      'radial-gradient(circle at 18% 12%, rgba(245, 166, 35, 0.42), transparent 26%), radial-gradient(circle at 88% 0%, rgba(200, 16, 46, 0.42), transparent 32%), linear-gradient(135deg, #140805 0%, #241109 44%, #090403 100%)',
    glow:
      'linear-gradient(130deg, rgba(255, 248, 240, 0.2), transparent 40%), radial-gradient(circle at 62% 100%, rgba(212, 168, 67, 0.2), transparent 38%)',
    pattern:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)',
  },
  brunch: {
    label: 'Brunch Favorite',
    base:
      'radial-gradient(circle at 12% 20%, rgba(255, 202, 129, 0.44), transparent 24%), radial-gradient(circle at 92% 0%, rgba(200, 16, 46, 0.26), transparent 28%), linear-gradient(145deg, #42210c 0%, #2c1408 42%, #160904 100%)',
    glow:
      'linear-gradient(140deg, rgba(255, 248, 240, 0.24), transparent 40%), radial-gradient(circle at 85% 100%, rgba(245, 166, 35, 0.3), transparent 38%)',
    pattern:
      'linear-gradient(120deg, rgba(255, 255, 255, 0.05), transparent 26%), linear-gradient(0deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px)',
  },
  burger: {
    label: 'Griddle Favorite',
    base:
      'radial-gradient(circle at 20% 18%, rgba(200, 16, 46, 0.45), transparent 26%), radial-gradient(circle at 84% 100%, rgba(245, 166, 35, 0.3), transparent 32%), linear-gradient(145deg, #31110d 0%, #180908 54%, #090403 100%)',
    glow:
      'linear-gradient(160deg, rgba(255, 255, 255, 0.12), transparent 42%), radial-gradient(circle at 0% 100%, rgba(255, 202, 129, 0.18), transparent 32%)',
    pattern:
      'linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.03) 75%, transparent 75%, transparent)',
  },
  vegan: {
    label: 'Plant Based',
    base:
      'radial-gradient(circle at 16% 20%, rgba(52, 211, 153, 0.4), transparent 26%), radial-gradient(circle at 100% 0%, rgba(212, 168, 67, 0.2), transparent 32%), linear-gradient(145deg, #0c1912 0%, #10261c 48%, #08100c 100%)',
    glow:
      'linear-gradient(140deg, rgba(255, 255, 255, 0.16), transparent 36%), radial-gradient(circle at 85% 90%, rgba(110, 231, 183, 0.16), transparent 38%)',
    pattern:
      'linear-gradient(120deg, rgba(255, 255, 255, 0.04), transparent 24%), linear-gradient(0deg, rgba(255, 255, 255, 0.026) 1px, transparent 1px)',
  },
  coffee: {
    label: 'Cafe Ritual',
    base:
      'radial-gradient(circle at 22% 16%, rgba(212, 168, 67, 0.34), transparent 24%), radial-gradient(circle at 88% 10%, rgba(90, 56, 24, 0.46), transparent 30%), linear-gradient(145deg, #2a160c 0%, #1b0d07 44%, #0a0403 100%)',
    glow:
      'linear-gradient(140deg, rgba(255, 248, 240, 0.14), transparent 36%), radial-gradient(circle at 100% 100%, rgba(245, 166, 35, 0.16), transparent 36%)',
    pattern:
      'linear-gradient(45deg, rgba(255, 255, 255, 0.025) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.025) 50%, rgba(255, 255, 255, 0.025) 75%, transparent 75%, transparent)',
  },
  drinks: {
    label: 'Bar Favorite',
    base:
      'radial-gradient(circle at 18% 16%, rgba(255, 173, 97, 0.34), transparent 25%), radial-gradient(circle at 100% 0%, rgba(231, 111, 81, 0.28), transparent 28%), linear-gradient(145deg, #2b120d 0%, #1b0d0b 48%, #0c0505 100%)',
    glow:
      'linear-gradient(150deg, rgba(255, 255, 255, 0.16), transparent 34%), radial-gradient(circle at 85% 100%, rgba(255, 183, 3, 0.14), transparent 36%)',
    pattern:
      'linear-gradient(120deg, rgba(255, 255, 255, 0.035), transparent 28%), linear-gradient(0deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px)',
  },
  interior: {
    label: 'Inside The Room',
    base:
      'radial-gradient(circle at 12% 12%, rgba(212, 168, 67, 0.32), transparent 22%), radial-gradient(circle at 94% 0%, rgba(200, 16, 46, 0.22), transparent 28%), linear-gradient(145deg, #22110a 0%, #170c07 48%, #090403 100%)',
    glow:
      'linear-gradient(145deg, rgba(255, 248, 240, 0.16), transparent 40%), radial-gradient(circle at 80% 88%, rgba(212, 168, 67, 0.12), transparent 36%)',
    pattern:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px)',
  },
}

function PremiumImageInner({
  src,
  alt,
  className = '',
  imgClassName = '',
  theme = 'default',
  fallbackSrc = '/images/site/fallback-image.svg',
  fallbackLabel,
  fallbackTitle,
  showFallbackDetails = true,
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes,
}) {
  const [status, setStatus] = useState(src || fallbackSrc ? 'loading' : 'error')
  const [currentSrc, setCurrentSrc] = useState(src ?? fallbackSrc ?? '')
  const [usedFallbackSrc, setUsedFallbackSrc] = useState(!src && Boolean(fallbackSrc))

  const preset = themePresets[theme] ?? themePresets.default
  const resolvedLabel = fallbackLabel === undefined ? preset.label : fallbackLabel
  const resolvedTitle = fallbackTitle ?? alt
  const showFallback = status !== 'loaded'

  const handleError = () => {
    if (!usedFallbackSrc && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setUsedFallbackSrc(true)
      setStatus('loading')
      return
    }

    setStatus('error')
  }

  return (
    <div className={cn('relative isolate overflow-hidden bg-brand-brown/40', className)}>
      <div
        className="absolute inset-0"
        style={{ backgroundImage: preset.base }}
      />
      <div
        className="absolute inset-0 opacity-80 mix-blend-screen"
        style={{ backgroundImage: preset.glow }}
      />
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: preset.pattern,
          backgroundSize: 'auto, 30px 30px, 30px 30px',
        }}
      />

      {currentSrc ? (
        <img
          src={currentSrc}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          sizes={sizes}
          onLoad={() => setStatus('loaded')}
          onError={handleError}
          className={cn(
            'absolute inset-0 z-10 h-full w-full object-cover transition-all duration-700 ease-out',
            showFallback ? 'scale-[1.04] opacity-0' : 'scale-100 opacity-100',
            imgClassName
          )}
        />
      ) : null}

      <div className="absolute inset-0 z-[11] bg-gradient-to-t from-brand-dark/70 via-brand-dark/15 to-transparent" />

      {showFallback && (resolvedLabel || showFallbackDetails) ? (
        <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
          {resolvedLabel ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-[0.22em] text-brand-gold/90 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand-gold" />
              {resolvedLabel}
            </div>
          ) : null}

          {showFallbackDetails ? (
            <div className="mt-3 max-w-[15rem]">
              <div className="flex items-center gap-2 text-white/68">
                <ImageOff size={14} />
                <span className="font-body text-[11px] uppercase tracking-[0.2em]">
                  Image Preview
                </span>
              </div>
              <p className="mt-2 font-display text-lg font-semibold leading-tight text-white">
                {resolvedTitle}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export function PremiumImage(props) {
  const imageKey = `${props.src ?? ''}::${props.fallbackSrc ?? ''}`

  return <PremiumImageInner key={imageKey} {...props} />
}
