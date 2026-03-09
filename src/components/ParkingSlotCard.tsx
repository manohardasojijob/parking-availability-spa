import type { ParkingSlot } from '../api/parkingApi'

interface ParkingSlotCardProps {
  slot: ParkingSlot
  onClick: (slot: ParkingSlot) => void
}

export function ParkingSlotCard({ slot, onClick }: ParkingSlotCardProps) {
  const isAvailable = slot.status === 'AVAILABLE'

  const statusColors: Record<string, string> = {
    AVAILABLE: 'bg-green-100 border-green-400 text-green-800',
    OCCUPIED: 'bg-red-100 border-red-400 text-red-800',
    HELD: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  }

  const containerClasses = [
    'rounded-lg border p-4 transition transform',
    isAvailable
      ? 'hover:-translate-y-0.5 hover:shadow-lg cursor-pointer'
      : 'opacity-70 cursor-not-allowed',
  ].join(' ')

  const badgeClasses = [
    'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
    statusColors[slot.status] ?? 'bg-slate-200 border-slate-400 text-slate-800',
  ].join(' ')

  const handleClick = () => {
    if (!isAvailable) return
    onClick(slot)
  }

  return (
    <button
      type="button"
      className={containerClasses}
      onClick={handleClick}
      disabled={!isAvailable}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-mono text-slate-700">
          Slot <span className="font-semibold">{slot.slotId}</span>
        </span>
        <span className={badgeClasses}>{slot.status}</span>
      </div>
      <div className="text-xs text-slate-600">
        Level <span className="font-semibold">{slot.level}</span>
      </div>
    </button>
  )
}

