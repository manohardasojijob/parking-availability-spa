import type { ParkingSlot } from '../api/parkingApi'

interface ReservationModalProps {
  isOpen: boolean
  slot: ParkingSlot | null
  loading: boolean
  error: string | null
  onConfirm: () => void
  onCancel: () => void
}

export function ReservationModal({
  isOpen,
  slot,
  loading,
  error,
  onConfirm,
  onCancel,
}: ReservationModalProps) {
  if (!isOpen || !slot) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-slate-900 p-6 shadow-2xl border border-slate-700">
        <h2 className="text-lg font-semibold text-slate-50 mb-2">
          Confirm Reservation
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          You are about to reserve{' '}
          <span className="font-semibold">slot {slot.slotId}</span> on level{' '}
          <span className="font-semibold">{slot.level}</span>.
        </p>
        <p className="text-xs text-slate-400 mb-4">
          For this demo, the reservation will be created for user ID{' '}
          <span className="font-mono text-sky-300">demo-user</span>.
        </p>

        {error && (
          <p className="mb-3 rounded-md bg-red-900/40 px-3 py-2 text-xs text-red-100 border border-red-500/60">
            {error}
          </p>
        )}

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            className="px-3 py-1.5 text-xs rounded-full border border-slate-600 text-slate-200 hover:bg-slate-800"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-1.5 text-xs rounded-full bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 disabled:opacity-60"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Booking…' : 'Confirm booking'}
          </button>
        </div>
      </div>
    </div>
  )
}

