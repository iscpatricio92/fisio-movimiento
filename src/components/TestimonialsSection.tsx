import { Star, Quote, ExternalLink } from 'lucide-react';

// Testimonios destacados seleccionados manualmente del sitio de Doctoralia
// Estos se actualizarán periódicamente con testimonios recientes y relevantes
const featuredTestimonials = [
  {
    name: 'Paciente',
    rating: 5,
    text: 'Excelente consulta, todo bien, muy clara en su explicación',
    date: 'Reciente',
    category: 'General',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Excelente atención, explica a detalle y te hace sentir cómoda. 100% recomendable.',
    date: 'Reciente',
    category: 'Atención',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'La doctora es muy profesional, explica de manera detallada el tratamiento a seguir y resuelve cada una de las dudas que han surgido, además he visto una gran mejoría con el tratamiento indicado.',
    date: 'Reciente',
    category: 'Tratamiento',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Diagnóstico y atención de buena calidad, acompañamiento en el proceso y se preocupa por integrar ejercicios y rutinas que mejoren la calidad de vida',
    date: 'Reciente',
    category: 'Calidad de vida',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Ha sido una grata experiencia. El trato por parte de la especialista es siempre cordial, empático y muy humano. Los ejercicios y la explicación es clara, me han ayudado mucho.',
    date: 'Reciente',
    category: 'Experiencia',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Todo excelente, con mi primera sesión hubo mejoría notable, la Lic. Muy atenta y Professional. Bueno experiencia y muy agradecido por la atención',
    date: 'Reciente',
    category: 'Primera sesión',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Excelente la fisioterapia recibida, llevaba dolor y salí con mucho menor molesta, gracias',
    date: 'Reciente',
    category: 'Dolor',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Muy acertada como siempre en su exploración y terapia.',
    date: 'Reciente',
    category: 'Terapia',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Excelente atención y buena explicación, sobre todo paciencia',
    date: 'Reciente',
    category: 'Atención',
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

        {/* Featured Testimonials - Testimonios Destacados */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Testimonios <span className="text-primary">Destacados</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Reseñas seleccionadas de nuestros pacientes. Cada testimonio refleja la dedicación y profesionalismo en cada tratamiento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTestimonials.slice(0, 6).map((testimonial, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border border-border/50 hover:border-primary/30 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote className="w-10 h-10 text-primary/20 group-hover:text-primary/30 transition-colors duration-300" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Category badge */}
                {testimonial.category && (
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                      {testimonial.category}
                    </span>
                  </div>
                )}

                {/* Text */}
                <p className="text-foreground mb-6 leading-relaxed font-medium italic min-h-[80px]">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground font-medium">{testimonial.date}</div>
                  </div>
                  <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ver más testimonios destacados */}
          {featuredTestimonials.length > 6 && (
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Mostrando 6 de {featuredTestimonials.length} testimonios destacados
              </p>
            </div>
          )}
        </div>

       

        {/* CTA Final */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-card rounded-2xl shadow-soft border border-border/50">
            <h3 className="font-display text-xl font-bold text-foreground">
              ¿Quieres ver más opiniones?
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              Visita mi perfil en Doctoralia para leer todas las reseñas de mis pacientes
            </p>
            <a
              href="https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-cta text-accent-foreground font-semibold shadow-md hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              Ver todas las opiniones en Doctoralia
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
