import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'María González',
    rating: 5,
    text: 'Excelente atención, muy profesional y dedicada. Me ayudó muchísimo con mi dolor de espalda crónico. Altamente recomendada.',
    date: 'Hace 2 semanas',
  },
  {
    name: 'Carlos Ramírez',
    rating: 5,
    text: 'Después de mi operación de rodilla, la Lic. Analaura me guió en mi recuperación. Ahora puedo volver a correr sin dolor.',
    date: 'Hace 1 mes',
  },
  {
    name: 'Laura Martínez',
    rating: 5,
    text: 'El tratamiento de ATM fue increíble. Llevaba años con bruxismo y en pocas sesiones noté una mejora significativa.',
    date: 'Hace 3 semanas',
  },
  {
    name: 'Roberto Hernández',
    rating: 5,
    text: 'Muy profesional y empática. Explica todo detalladamente y te hace parte activa de tu recuperación. La mejor fisio que he tenido.',
    date: 'Hace 2 meses',
  },
  {
    name: 'Ana Sánchez',
    rating: 5,
    text: 'Los ejercicios hipopresivos cambiaron mi vida. Analaura es muy paciente y se asegura de que hagas los ejercicios correctamente.',
    date: 'Hace 1 mes',
  },
  {
    name: 'Pedro López',
    rating: 5,
    text: 'Excelente atención tanto presencial como en línea. La consulta virtual es muy práctica y efectiva.',
    date: 'Hace 2 semanas',
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="opiniones" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
            Lo que Dicen Mis <span className="text-primary">Pacientes</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            La satisfacción de mis pacientes es mi mayor recompensa
          </p>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-2xl font-bold text-foreground">5.0</span>
            <span className="text-muted-foreground">• Basado en +150 opiniones</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/50"
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-primary/20" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.date}</div>
                </div>
                <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Ver todas las opiniones en Doctoralia
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
