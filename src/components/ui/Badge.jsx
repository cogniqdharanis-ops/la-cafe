import { cn } from '../../utils/helpers'

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-brand-red/20 text-brand-red border border-brand-red/30',
    gold: 'bg-brand-gold/20 text-brand-gold border border-brand-gold/30',
    green: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    cream: 'bg-brand-cream/10 text-brand-cream border border-brand-cream/20',
  }

  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-xs font-body font-semibold px-3 py-1 rounded-full uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
