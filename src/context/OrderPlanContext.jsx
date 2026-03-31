/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'la-cafe-order-plan'
const OrderPlanContext = createContext(undefined)

function readStoredPlan() {
  if (typeof window === 'undefined') return []

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function OrderPlanProvider({ children }) {
  const [plannedItems, setPlannedItems] = useState(readStoredPlan)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plannedItems))
    } catch {
      // Ignore storage write failures so the ordering UI still works.
    }
  }, [plannedItems])

  const addItem = (item) => {
    setPlannedItems((current) => {
      const existing = current.find((entry) => entry.id === item.id)

      if (existing) {
        return current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        )
      }

      return [...current, { ...item, quantity: 1 }]
    })
  }

  const incrementItem = (id) => {
    setPlannedItems((current) =>
      current.map((entry) =>
        entry.id === id
          ? { ...entry, quantity: entry.quantity + 1 }
          : entry
      )
    )
  }

  const decrementItem = (id) => {
    setPlannedItems((current) =>
      current
        .map((entry) =>
          entry.id === id
            ? { ...entry, quantity: Math.max(0, entry.quantity - 1) }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    )
  }

  const clearPlan = () => setPlannedItems([])

  const itemCount = plannedItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = plannedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <OrderPlanContext.Provider
      value={{
        plannedItems,
        itemCount,
        subtotal,
        addItem,
        incrementItem,
        decrementItem,
        clearPlan,
      }}
    >
      {children}
    </OrderPlanContext.Provider>
  )
}

export function useOrderPlan() {
  const value = useContext(OrderPlanContext)

  if (!value) {
    throw new Error('useOrderPlan must be used within OrderPlanProvider')
  }

  return value
}
