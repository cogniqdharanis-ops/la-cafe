import { Clock } from 'lucide-react'
import { useCafeStatus } from '../../hooks/useCafeStatus'

export function WaitTimeBadge({
  className = '',
  compact = false,
  showTimestamp = false,
}) {
  const { cafeTime, wait } = useCafeStatus()

  const colors = {
    low: 'border-black/10 bg-white/70 text-brand-cream',
    moderate: 'border-black/12 bg-brand-brown/50 text-brand-cream',
    busy: 'border-black bg-black text-white',
  }

  const dotColors = {
    low: 'bg-brand-gold',
    moderate: 'bg-brand-amber',
    busy: 'bg-white',
  }

  return (
    <div
      className={`inline-flex min-h-11 items-center gap-2 border px-3 py-2 font-body text-[11px] uppercase tracking-[0.16em] backdrop-blur-sm ${colors[wait.level]} ${className}`}
      aria-live="polite"
      role="status"
    >
      <span className={`w-2 h-2 rounded-full ${dotColors[wait.level]} animate-pulse`} />
      <Clock size={14} />
      <span className="font-semibold">
        Live Wait: {wait.time}
      </span>
      {!compact ? <span className="opacity-70">· {wait.label}</span> : null}
      {showTimestamp ? (
        <span className="hidden opacity-70 sm:inline">· {cafeTime}</span>
      ) : null}
    </div>
  )
}
