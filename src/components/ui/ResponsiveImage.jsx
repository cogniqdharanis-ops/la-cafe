import { memo, useState } from 'react'
import { cn } from '../../utils/helpers'

function ResponsiveImageInner({
  src,
  alt,
  className = '',
  imgClassName = '',
  fallbackSrc = '/images/site/fallback-image.svg',
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes,
  width,
  height,
}) {
  const [currentSrc, setCurrentSrc] = useState(src ?? fallbackSrc ?? '')
  const [usedFallbackSrc, setUsedFallbackSrc] = useState(!src && Boolean(fallbackSrc))
  const [loaded, setLoaded] = useState(false)

  const handleError = () => {
    if (!usedFallbackSrc && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setUsedFallbackSrc(true)
      setLoaded(false)
      return
    }

    setLoaded(true)
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-brand-brown/30',
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 transition-opacity duration-300',
          loaded ? 'opacity-0' : 'opacity-100'
        )}
        style={{
          backgroundColor: 'rgba(217, 207, 191, 0.38)',
          backgroundImage: 'url("/images/brand/paper-texture.png")',
          backgroundRepeat: 'repeat',
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
          width={width}
          height={height}
          onLoad={() => setLoaded(true)}
          onError={handleError}
          className={cn(
            'h-full w-full object-cover transition-[transform,opacity] duration-500 ease-out',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName
          )}
        />
      ) : null}
    </div>
  )
}

function ResponsiveImageComponent(props) {
  const imageKey = `${props.src ?? ''}::${props.fallbackSrc ?? ''}`

  return <ResponsiveImageInner key={imageKey} {...props} />
}

export const ResponsiveImage = memo(ResponsiveImageComponent)
