import { getSectorById, type SectorId } from '@/data/sectorIndex'
import type { SectorContent, SectorDetail } from './types'

/**
 * A sector page's data: its entry in the light index (number, icon, title,
 * summary) joined with the content written in its own file. The index
 * stays the one place those four fields live.
 */
export function defineSector(id: SectorId, content: SectorContent): SectorDetail {
  const entry = getSectorById(id)

  if (!entry) {
    throw new Error(`Unknown sector id: ${id}`)
  }

  return { ...entry, ...content }
}
