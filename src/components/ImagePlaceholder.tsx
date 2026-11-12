import { PhotoIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'

export type ImagePlaceholderProps = {
  /** The real photograph. Given one, it renders instead of the placeholder. */
  src?: string
  /** Required with `src`, and the two sizes that reserve its box. */
  alt?: string
  width?: number
  height?: number
  /** What the photograph will show. */
  label: string
  /** The smaller line under the label: why it is not here yet. */
  caption?: string
  /** The box itself — its aspect ratio and radius come from the caller. */
  className?: string
}

/**
 * The frame a photograph will land in, drawn until it is delivered.
 *
 * The placeholder and the photograph are the same box, so the page's layout
 * is final before any image exists: passing `src`, `alt`, `width` and
 * `height` swaps the dashed frame for the real picture, cropped to the box,
 * and nothing around it moves.
 */
export function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  label,
  caption,
  className,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? ''}
        width={width}
        height={height}
        className={cn('size-full object-cover', className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/25 bg-petrol p-6 text-center',
        className,
      )}
    >
      <PhotoIcon size={40} className="text-white/70" />

      <p className="text-body-sm font-semibold text-white">{label}</p>

      {caption ? (
        <p className="max-w-measure text-caption text-white/80">{caption}</p>
      ) : null}
    </div>
  )
}
