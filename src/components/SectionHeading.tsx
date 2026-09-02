import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

export function SectionHeading({
  id,
  index,
  title,
  description,
  className,
}: {
  id?: string
  index: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <Reveal className={cn('mb-12', className)}>
      <div id={id ?? undefined} className="scroll-mt-24">
        <p className="mb-2 font-mono text-sm text-accent">{index} //</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
        )}
      </div>
    </Reveal>
  )
}
