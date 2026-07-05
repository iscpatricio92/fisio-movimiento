import { GraduationCap, BadgeCheck, MapPin, CreditCard } from 'lucide-react';

/**
 * Trust bar - banda de credenciales y sedes justo debajo del Hero.
 * Refuerza la confianza (doble titulación, cédula, sedes, pagos) antes de que
 * el usuario baje. Estático y ligero para no afectar el LCP.
 */
const items = [
  {
    icon: GraduationCap,
    title: 'Doble titulación',
    detail: 'México & España',
  },
  {
    icon: BadgeCheck,
    title: 'Cédula profesional',
    detail: 'No. 10909109',
  },
  {
    icon: MapPin,
    title: '2 consultorios',
    detail: 'CDMX y Metepec',
  },
  {
    icon: CreditCard,
    title: 'Pagos flexibles',
    detail: 'Tarjeta y efectivo',
  },
];

export const TrustBar = () => {
  return (
    <div className="border-y border-border bg-card">
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-2 md:grid-cols-4 divide-y divide-border md:divide-y-0 md:divide-x">
          {items.map(({ icon: Icon, title, detail }) => (
            <li
              key={title}
              className="flex items-center gap-3 px-2 py-4 md:px-6 md:py-5 md:justify-center"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-foreground">
                  {title}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
