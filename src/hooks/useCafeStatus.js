import { useEffect, useState } from 'react'
import { getCafeTimeLabel, getServiceStatus, getWaitTime } from '../utils/helpers'

function getSnapshot() {
  return {
    cafeTime: getCafeTimeLabel(),
    service: getServiceStatus(),
    wait: getWaitTime(),
  }
}

export function useCafeStatus() {
  const [snapshot, setSnapshot] = useState(getSnapshot)

  useEffect(() => {
    const update = () => setSnapshot(getSnapshot())

    update()
    const intervalId = window.setInterval(update, 60_000)

    return () => window.clearInterval(intervalId)
  }, [])

  return snapshot
}
