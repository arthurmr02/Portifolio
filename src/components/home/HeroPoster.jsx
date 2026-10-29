/**
 * Ilustração leve (SVG puro) que ocupa o lugar da cena 3D. Aparece no celular, quando o
 * visitante prefere menos movimento, e enquanto o 3D ainda não baixou.
 */
export default function HeroPoster() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="text-accent absolute inset-0 h-full w-full"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <g strokeWidth="1.2" opacity=".85">
        <ellipse cx="100" cy="100" rx="78" ry="30" />
        <ellipse cx="100" cy="100" rx="78" ry="30" transform="rotate(60 100 100)" />
        <ellipse cx="100" cy="100" rx="78" ry="30" transform="rotate(120 100 100)" />
      </g>
      <circle cx="100" cy="100" r="9" fill="currentColor" stroke="none" />
      <circle
        cx="100"
        cy="100"
        r="92"
        strokeWidth="0.6"
        strokeDasharray="2 6"
        opacity=".5"
      />
    </svg>
  );
}
