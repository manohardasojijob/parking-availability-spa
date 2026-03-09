import type { ParkingSlot } from '../api/parkingApi'
import { ParkingSlotCard } from './ParkingSlotCard'

interface ParkingGridProps {
  slots: ParkingSlot[]
  onSlotClick: (slot: ParkingSlot) => void
}

export function ParkingGrid({ slots, onSlotClick }: ParkingGridProps) {
  if (!slots.length) {
    return (
      <p className="text-sm text-slate-500">
        No parking slots returned from the API.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {slots.map((slot) => (
        <ParkingSlotCard key={slot.slotId} slot={slot} onClick={onSlotClick} />
      ))}
    </div>
  )
}

