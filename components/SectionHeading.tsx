type SectionHeadingProps = {
  id?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
};

export default function SectionHeading({
  id,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      <h2 id={id} className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--foreground)] mb-3">
        {title}
      </h2>
      {description ? (
        <p
          className={`text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
