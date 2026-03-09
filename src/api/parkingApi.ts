export type SlotStatus = 'AVAILABLE' | 'OCCUPIED' | 'HELD'

export interface ParkingSlot {
  slotId: string
  status: SlotStatus
  level: string | number
}

function getBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_MULE_API_BASE_URL as string | undefined
  if (!baseUrl) {
    throw new Error(
      'VITE_MULE_API_BASE_URL is not set. Configure it in your .env.local or Vercel project settings.',
    )
  }
  return baseUrl.replace(/\/+$/, '')
}

export async function fetchAvailability(): Promise<ParkingSlot[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/availability`, {
    method: 'GET',
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(
      `Failed to fetch availability (${response.status}): ${text || response.statusText}`,
    )
  }

  const data = (await response.json()) as ParkingSlot[]
  return data
}

export async function createReservation(slotId: string, userId = 'demo-user') {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slotId, userId }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(
      `Failed to create reservation (${response.status}): ${text || response.statusText}`,
    )
  }
}

