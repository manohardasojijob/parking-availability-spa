import { useEffect, useState } from 'react'
import './App.css'
import type { ParkingSlot } from './api/parkingApi'
import { createReservation, fetchAvailability } from './api/parkingApi'
import { ParkingGrid } from './components/ParkingGrid'
import { ReservationModal } from './components/ReservationModal'

function App() {
  const [slots, setSlots] = useState<ParkingSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadAvailability = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchAvailability()
      setSlots(result)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load availability')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadAvailability()
    const intervalId = setInterval(() => {
      void loadAvailability()
    }, 10000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const handleSlotClick = (slot: ParkingSlot) => {
    if (slot.status !== 'AVAILABLE') return
    setSelectedSlot(slot)
    setBookingError(null)
    setModalOpen(true)
  }

  const handleConfirmReservation = async () => {
    if (!selectedSlot) return
    try {
      setBookingLoading(true)
      setBookingError(null)
      await createReservation(selectedSlot.slotId, 'demo-user')
      setModalOpen(false)
      setSelectedSlot(null)
      await loadAvailability()
    } catch (e) {
      setBookingError(
        e instanceof Error ? e.message : 'Failed to create reservation',
      )
    } finally {
      setBookingLoading(false)
    }
  }

  const handleCancelModal = () => {
    setModalOpen(false)
    setSelectedSlot(null)
    setBookingError(null)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Parking Availability Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Live view of parking slots from the MuleSoft Experience API.
            </p>
          </div>
          {lastUpdated && (
            <p className="text-xs text-slate-500">
              Last updated:{' '}
              {lastUpdated.toLocaleTimeString(undefined, {
                hour12: false,
              })}
            </p>
          )}
        </header>

        {loading && (
          <p className="mb-3 text-sm text-slate-300">Loading availability…</p>
        )}
        {error && (
          <p className="mb-3 rounded-md bg-red-900/40 px-3 py-2 text-xs text-red-100 border border-red-500/60">
            {error}
          </p>
        )}

        <main>
          <ParkingGrid slots={slots} onSlotClick={handleSlotClick} />
        </main>
      </div>

      <ReservationModal
        isOpen={modalOpen}
        slot={selectedSlot}
        loading={bookingLoading}
        error={bookingError}
        onConfirm={handleConfirmReservation}
        onCancel={handleCancelModal}
      />
    </div>
  )
}

export default App
