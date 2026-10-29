const TONES = {
  neutral: 'border-line text-muted',
  accent: 'border-accent/40 text-accent',
};

export default function Badge({ tone = 'neutral', className = '', ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONES[tone]} ${className}`}
      {...props}
    />
  );
}
