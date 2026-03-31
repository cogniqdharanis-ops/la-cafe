// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ShoppingBag, Star } from 'lucide-react'
import { useOrderPlan } from '../../context/OrderPlanContext'
import { formatPrice } from '../../utils/helpers'
import { ResponsiveImage } from './ResponsiveImage'

const notesByCategory = {
  Breakfast: 'All-day breakfast',
  Burgers: 'Counter favorite',
  Sandwiches: 'Made fresh',
  Vegan: 'Plant-based',
  Drinks: 'Cafe pour',
}

export function MenuCard({ item }) {
  const { addItem, plannedItems } = useOrderPlan()
  const plannedEntry = plannedItems.find((entry) => entry.id === item.id)
  const plannedQuantity = plannedEntry?.quantity ?? 0
  const descriptionId = `menu-item-description-${item.id}`

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="group panel flex h-full flex-col overflow-hidden p-3"
    >
      <div className="relative overflow-hidden border border-black/12 bg-white/60">
        <ResponsiveImage
          src={item.image}
          alt={item.name}
          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 44vw, 100vw"
          className="aspect-[4/3] h-full w-full"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {item.popular ? (
            <span className="inline-flex items-center gap-1 bg-black px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              <Star size={10} fill="currentColor" />
              Popular
            </span>
          ) : null}
          {item.badge ? (
            <span className="border border-black/12 bg-white/80 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-[0.14em] text-brand-cream">
              {item.badge}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-brand-amber">
              {notesByCategory[item.category]}
            </p>
            <h3 className="mt-2 font-body text-lg font-bold uppercase tracking-[0.03em] text-brand-cream">
              {item.name}
            </h3>
          </div>
          <span className="shrink-0 self-start border border-black/10 bg-white/72 px-3 py-2 font-display text-2xl font-semibold text-brand-cream sm:text-3xl">
            {formatPrice(item.price)}
          </span>
        </div>

        <p id={descriptionId} className="mt-3 flex-1 font-body text-sm leading-relaxed text-brand-cream/62">
          {item.description}
        </p>

        <div className="mt-5 flex flex-col gap-3 border-t border-black/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-body text-[10px] uppercase tracking-[0.16em] text-brand-cream/45">
            {plannedQuantity ? `In order plan x${plannedQuantity}` : item.category}
          </div>
          <button
            type="button"
            onClick={() => addItem(item)}
            aria-label={`Add ${item.name} to order`}
            aria-describedby={descriptionId}
            className="btn-primary w-full sm:w-auto"
          >
            <ShoppingBag size={14} />
            {plannedQuantity ? 'Add Another' : 'Add to Plan'}
          </button>
        </div>
      </div>
    </motion.article>
  )
}
