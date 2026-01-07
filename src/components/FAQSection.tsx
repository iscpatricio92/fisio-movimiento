import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollAnimated } from './ScrollAnimated';
import { trackFAQInteraction, trackCTAClick, trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics';
import { useEffect } from 'react';

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

// Genera el schema FAQPage para SEO
const generateFAQSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

const faqs: FAQ[] = [
  {
    question: '¿Qué es la fisioterapia y cómo puede ayudarme?',
    answer: 'La fisioterapia es una disciplina de la salud que utiliza técnicas manuales, ejercicios terapéuticos y agentes físicos para tratar, prevenir y rehabilitar lesiones y condiciones que afectan el movimiento y la función del cuerpo. Puede ayudarte a aliviar el dolor, recuperar la movilidad, mejorar la fuerza y prevenir futuras lesiones.',
    category: 'General',
  },
  {
    question: '¿Cuánto tiempo dura una sesión de fisioterapia?',
    answer: 'Las sesiones de fisioterapia generalmente duran entre 45 y 60 minutos. La primera consulta puede tomar un poco más de tiempo (60 minutos) ya que incluye una evaluación integral, diagnóstico y elaboración de un plan de tratamiento personalizado.',
    category: 'Sesiones',
  },
  {
    question: '¿Necesito una referencia médica para acudir a fisioterapia?',
    answer: 'No necesariamente. En México, los fisioterapeutas pueden atender pacientes de forma directa. Sin embargo, si tienes una referencia médica o estudios previos, es recomendable traerlos para una mejor evaluación y tratamiento.',
    category: 'General',
  },
  {
    question: '¿Qué debo traer a mi primera consulta?',
    answer: 'Para tu primera consulta, te recomendamos traer: estudios médicos previos (radiografías, resonancias, etc.), referencias médicas si las tienes, ropa cómoda que permita movimiento, y una lista de medicamentos que estés tomando. También es útil traer información sobre tu historial médico relevante.',
    category: 'Sesiones',
  },
  {
    question: '¿Ofrecen consultas en línea o virtuales?',
    answer: 'Sí, ofrezco consultas virtuales por videollamada. Estas son ideales para evaluaciones iniciales, seguimientos, educación sobre ejercicios y consultas de seguimiento. La consulta en línea tiene una duración de 45 minutos y cuesta $400 MXN.',
    category: 'Servicios',
  },
  {
    question: '¿Qué condiciones trata la fisioterapia?',
    answer: 'La fisioterapia puede tratar una amplia variedad de condiciones incluyendo: dolor de espalda y cuello, lesiones deportivas, ciática, tendinitis, contracturas musculares, problemas de ATM (articulación temporomandibular), dolor crónico, rehabilitación post-quirúrgica, problemas de equilibrio en adultos mayores, y muchas más.',
    category: 'Tratamientos',
  },
  {
    question: '¿Cuántas sesiones necesitaré?',
    answer: 'El número de sesiones varía según tu condición, la gravedad de la lesión y tu respuesta al tratamiento. Generalmente, se puede ver mejoría en 3-6 sesiones para condiciones agudas, mientras que condiciones crónicas pueden requerir más sesiones. Durante tu primera consulta, elaboraremos un plan de tratamiento personalizado con estimaciones de duración.',
    category: 'Tratamientos',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos efectivo y transferencias bancarias. Los pagos se realizan al momento de la consulta. Para más información sobre precios y métodos de pago, puedes contactarnos por teléfono o WhatsApp.',
    category: 'General',
  },
  {
    question: '¿Trabajan con seguros médicos?',
    answer: 'Actualmente no trabajamos directamente con seguros médicos. Sin embargo, algunos seguros pueden reembolsar parte del costo de las sesiones de fisioterapia. Te recomendamos verificar con tu aseguradora si ofrecen este tipo de cobertura y qué documentación necesitan.',
    category: 'General',
  },
  {
    question: '¿Qué diferencia hay entre fisioterapia y masaje?',
    answer: 'La fisioterapia es una profesión sanitaria que incluye evaluación, diagnóstico y tratamiento de condiciones que afectan el movimiento. Incluye técnicas manuales, ejercicios terapéuticos, electroterapia y educación. El masaje es solo una de las técnicas que puede usar un fisioterapeuta, pero la fisioterapia es mucho más completa e incluye un enfoque científico y basado en evidencia.',
    category: 'General',
  },
  {
    question: '¿Puedo recibir fisioterapia si estoy embarazada?',
    answer: 'Sí, la fisioterapia es segura durante el embarazo y puede ayudar con dolores de espalda, problemas posturales y preparación para el parto. Sin embargo, es importante informar a tu fisioterapeuta sobre tu embarazo para adaptar el tratamiento adecuadamente. También ofrezco fisioterapia post-parto.',
    category: 'Tratamientos',
  },
  {
    question: '¿Qué horarios de atención tienen?',
    answer: 'Atiendo de lunes a viernes de 9:00 AM a 7:00 PM en ambos consultorios (Iztapalapa, CDMX y Metepec, México). Las consultas en línea también están disponibles en estos horarios. Para agendar una cita, puedes usar el calendario en línea, llamar o contactar por WhatsApp.',
    category: 'General',
  },
];

export const FAQSection = () => {
  // Inyectar schema FAQPage para SEO
  useEffect(() => {
    const existingScript = document.querySelector('script[data-faq-schema]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-faq-schema', 'true');
      script.textContent = JSON.stringify(generateFAQSchema(faqs));
      document.head.appendChild(script);
    }
    return () => {
      const script = document.querySelector('script[data-faq-schema]');
      if (script) script.remove();
    };
  }, []);

  return (
    <section id="faqs" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollAnimated animation="fade-up" delay={0}>
          <div className="text-center mb-10 lg:mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Preguntas Frecuentes
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              ¿Tienes <span className="text-primary">Preguntas?</span>
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground mt-3 lg:mt-4 max-w-2xl mx-auto">
              Respuestas a las preguntas más comunes sobre fisioterapia y nuestros servicios.
            </p>
          </div>
        </ScrollAnimated>

        {/* FAQs Accordion */}
        <ScrollAnimated animation="fade-up" delay={100}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/50">
              <Accordion 
                type="single" 
                collapsible 
                className="w-full"
                onValueChange={(value) => {
                  if (value) {
                    const faq = faqs.find((_, index) => `item-${index}` === value);
                    if (faq) {
                      trackFAQInteraction(faq.question, 'expand');
                    }
                  }
                }}
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-border/50 last:border-b-0"
                  >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-4 text-base md:text-lg">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4 pl-8">
                    {faq.answer}
                  </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </ScrollAnimated>

        {/* CTA */}
        <ScrollAnimated animation="fade-up" delay={200}>
          <div className="mt-8 lg:mt-12 text-center">
            <p className="text-sm lg:text-base text-muted-foreground mb-4 lg:mb-6">
              ¿No encontraste la respuesta?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-4">
              <a
                href="tel:+525565053202"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-glow hover:scale-105 transition-all duration-300 active:scale-95"
                onClick={() => {
                  trackCTAClick('Llamar Ahora', 'FAQ Section');
                  trackPhoneClick('+525565053202', 'FAQ Section');
                }}
              >
                Llamar Ahora
              </a>
              <a
                href="https://wa.me/525565053202?text=Hola,%20tengo%20una%20pregunta%20sobre%20fisioterapia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl gradient-cta text-accent-foreground font-semibold shadow-md hover:shadow-glow hover:scale-105 transition-all duration-300 active:scale-95"
                onClick={() => {
                  trackCTAClick('Escribir por WhatsApp', 'FAQ Section');
                  trackWhatsAppClick('Pregunta sobre fisioterapia', 'FAQ Section');
                }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
};

