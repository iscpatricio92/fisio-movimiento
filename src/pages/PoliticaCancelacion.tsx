import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollAnimated } from '@/components/ScrollAnimated';
import { CalendarX, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useMetaTags } from '@/hooks/use-meta-tags';

const PoliticaCancelacion = () => {
  useMetaTags({
    title: 'Política de Cancelación y Reagendación | FisioAnalaura',
    description:
      'Política de cancelación y reagendación de citas de fisioterapia. Conoce los tiempos límite, penalizaciones y condiciones para cancelar o reagendar tu cita sin cargo.',
    url: 'https://fisio-movimiento.com/politica-cancelacion',
    type: 'article',
  });

  return (
    <div className="min-h-screen bg-background pt-24 lg:pt-0">
      <Navbar />
      <main className="container mx-auto px-4 py-12 lg:py-24 max-w-4xl">
        <ScrollAnimated animation="fade-up">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4">
              <CalendarX className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Política de{' '}
              <span className="text-primary">Cancelación y Reagendación</span>
            </h1>
            <p className="text-muted-foreground">
              Última actualización:{' '}
              {new Date().toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Introducción */}
          <div className="bg-primary/10 rounded-2xl p-6 lg:p-8 mb-8 border border-primary/20">
            <p className="text-foreground text-lg">
              En fisioterapia, el tiempo es nuestro activo más valioso. Esta
              política establece las reglas claras para cancelaciones,
              reagendaciones y no-presentaciones, garantizando un servicio de
              calidad para todos nuestros pacientes.
            </p>
          </div>

          {/* Contenido */}
          <div className="prose prose-lg max-w-none space-y-8">
            {/* Cancelación sin cargo */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  1. Cancelación sin Cargo
                </h2>
              </div>
              <p className="text-foreground mb-4">
                Puede cancelar su cita <strong>sin ningún cargo</strong> si lo
                hace con al menos <strong>24 horas de anticipación</strong>a la
                fecha y hora programada.
              </p>
              <div className="bg-background/50 rounded-lg p-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Ejemplo:</strong> Si su cita es el viernes a las 2:00
                  PM, debe cancelar antes del jueves a las 2:00 PM.
                </p>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-foreground mb-2">
                  Formas de cancelar:
                </p>
                <ul className="space-y-2 text-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Llamando al{' '}
                      <a
                        href="tel:+525565053202"
                        className="text-primary hover:underline"
                      >
                        +52 55 6505 3202
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Por WhatsApp al mismo número</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      A través de la plataforma Doctoralia (si reservó en línea)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Enviando un correo a{' '}
                      <a
                        href="mailto:fisio-movimiento.mx@gmail.com"
                        className="text-primary hover:underline"
                      >
                        fisio-movimiento.mx@gmail.com
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Cancelación con menos de 24 horas */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-accent" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  2. Cancelación con Menos de 24 Horas
                </h2>
              </div>
              <p className="text-foreground mb-4">
                Si cancela su cita con{' '}
                <strong>menos de 24 horas de anticipación</strong>, se aplicará
                un cargo del <strong>50% del costo de la sesión</strong>.
              </p>
              <div className="bg-accent/10 rounded-lg p-4 mt-4 border border-accent/20">
                <p className="text-sm text-foreground">
                  <strong>Razón:</strong> Este tiempo no nos permite ofrecer el
                  espacio a otro paciente que lo necesite. El cargo ayuda a
                  cubrir los costos operativos del consultorio.
                </p>
              </div>
            </section>

            {/* No-Show */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-destructive" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  3. No-Presentación (No-Show)
                </h2>
              </div>
              <p className="text-foreground mb-4">
                <strong>
                  Las sesiones a las que no se asista (sin previo aviso) se
                  tomarán como sesiones dadas.
                </strong>
              </p>
              <div className="bg-destructive/10 rounded-lg p-4 mt-4 border border-destructive/20">
                <p className="text-sm text-foreground">
                  <strong>Importante:</strong> Las citas no presentadas sin
                  aviso previo afectan a otros pacientes que podrían haber
                  utilizado ese horario. Por favor, siempre notifique si no
                  podrá asistir.{' '}
                  <strong>
                    No hay reembolsos en caso de cancelación o no-presentación.
                  </strong>
                </p>
              </div>
            </section>

            {/* Tolerancia de retardo */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  4. Tolerancia de Retardo
                </h2>
              </div>
              <p className="text-foreground mb-4">
                Entendemos que pueden surgir imprevistos. Si llega tarde a su
                cita:
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-4 border border-primary/20">
                <p className="text-foreground font-semibold mb-2">
                  ⚠️ Política de retardo:
                </p>
                <p className="text-foreground">
                  <strong>
                    Se le dará únicamente el tiempo restante de la sesión
                  </strong>{' '}
                  según la hora de llegada. La cita no se considera cancelada,
                  pero el tiempo de atención será proporcional al tiempo
                  disponible.
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <p className="text-sm text-foreground mb-2">
                  <strong>Ejemplos:</strong>
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Si su cita es de 60 minutos y llega 15 minutos tarde,
                      recibirá 45 minutos de atención
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Si llega 30 minutos tarde a una sesión de 60 minutos,
                      recibirá 30 minutos de atención
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-background/50 rounded-lg p-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Recomendación:</strong> Si sabe que llegará tarde,
                  llámenos con anticipación. Podremos evaluar si es posible
                  ajustar su horario o reagendar su cita para aprovechar el
                  tiempo completo de la sesión.
                </p>
              </div>
            </section>

            {/* Reagendación */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <CalendarX className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  5. Reagendación de Citas
                </h2>
              </div>
              <p className="text-foreground mb-4">
                Para reprogramar una cita, debe avisar con al menos{' '}
                <strong>3 horas de anticipación</strong>.
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-4 border border-primary/20">
                <p className="text-foreground font-semibold mb-2">
                  ⚠️ Condiciones importantes:
                </p>
                <ul className="space-y-2 text-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Las citas reprogramadas se podrán reagendar{' '}
                      <strong>únicamente en esa misma semana</strong> (sujeto a
                      disponibilidad de horarios)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Si no hay disponibilidad en esa semana, la sesión se
                      considerará como <strong>sesión dada</strong>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-foreground mb-2">
                  Formas de reprogramar:
                </p>
                <ul className="space-y-2 text-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Llamando al{' '}
                      <a
                        href="tel:+525565053202"
                        className="text-primary hover:underline"
                      >
                        +52 55 6505 3202
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Por WhatsApp al mismo número</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      A través de la plataforma Doctoralia (si reservó en línea)
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Emergencias */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                8. Excepciones y Emergencias
              </h2>
              <p className="text-foreground mb-4">
                Entendemos que pueden surgir situaciones de emergencia. En casos
                justificados (emergencias médicas, fallecimientos familiares,
                desastres naturales), evaluaremos cada situación de manera
                individual y podremos hacer excepciones a esta política.
              </p>
              <p className="text-muted-foreground text-sm">
                Por favor, comuníquese con nosotros lo antes posible para que
                podamos evaluar su situación.
              </p>
              <div className="bg-accent/10 rounded-lg p-4 mt-4 border border-accent/20">
                <p className="text-sm text-foreground">
                  <strong>Nota:</strong> Aún en casos de emergencia, los
                  paquetes mantienen su vigencia de 6 semanas y no son
                  reembolsables.
                </p>
              </div>
            </section>

            {/* Paquetes de sesiones */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                6. Política de Paquetes de Sesiones
              </h2>
              <div className="space-y-4">
                <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                  <p className="font-semibold text-foreground mb-2">
                    Vigencia de Paquetes:
                  </p>
                  <p className="text-foreground">
                    Los{' '}
                    <strong>
                      paquetes de 10 sesiones tienen vigencia de 6 semanas
                    </strong>{' '}
                    desde la fecha de compra. Las sesiones caducan
                    automáticamente después de este período,{' '}
                    <strong>se tomen o no se tomen</strong>.
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <p className="font-semibold text-foreground mb-2">
                    Transferibilidad:
                  </p>
                  <p className="text-foreground">
                    Los paquetes son{' '}
                    <strong>personales y no son transferibles</strong>. Las
                    sesiones no pueden ser utilizadas por otra persona diferente
                    al titular del paquete.
                  </p>
                </div>
                <div className="bg-destructive/10 rounded-lg p-4 border border-destructive/20">
                  <p className="font-semibold text-foreground mb-2">
                    Reembolsos:
                  </p>
                  <p className="text-foreground">
                    <strong>No hay reembolsos en caso de cancelación</strong>,
                    no-presentación, o vencimiento del paquete. Una vez
                    adquirido el paquete, el pago no es reembolsable bajo
                    ninguna circunstancia.
                  </p>
                </div>
              </div>
            </section>

            {/* Aplicación de cargos */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                7. Aplicación de Cargos y Sesiones
              </h2>
              <p className="text-foreground mb-4">
                Para pacientes con paquetes de sesiones:
              </p>
              <ul className="space-y-2 text-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Las sesiones no asistidas (sin previo aviso) se descontarán
                    del paquete como <strong>sesiones dadas</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Las sesiones canceladas con menos de 3 horas de anticipación
                    también se considerarán como <strong>sesiones dadas</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    No se realizarán reembolsos por sesiones no utilizadas
                    dentro del período de vigencia
                  </span>
                </li>
              </ul>
              <div className="bg-background/50 rounded-lg p-4 mt-4">
                <p className="text-sm text-foreground">
                  <strong>Métodos de pago aceptados:</strong> Efectivo,
                  transferencia bancaria, tarjeta de débito/crédito
                </p>
              </div>
            </section>

            {/* Recordatorios */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                9. Recordatorios de Citas
              </h2>
              <p className="text-foreground mb-4">
                Para ayudarle a recordar sus citas, enviamos recordatorios:
              </p>
              <ul className="space-y-2 text-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    48 horas antes de su cita (por WhatsApp o correo
                    electrónico)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>24 horas antes de su cita (por WhatsApp o SMS)</span>
                </li>
              </ul>
              <p className="text-muted-foreground text-sm mt-4">
                Asegúrese de que sus datos de contacto estén actualizados para
                recibir estos recordatorios.
              </p>
            </section>

            {/* Contacto */}
            <section className="bg-primary/10 rounded-2xl p-6 lg:p-8 border border-primary/20">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                ¿Tiene preguntas sobre esta política?
              </h2>
              <p className="text-foreground mb-4">
                Si tiene alguna duda o necesita aclaración sobre nuestra
                política de cancelación y reagendación, no dude en contactarnos:
              </p>
              <div className="space-y-2 text-foreground">
                <p>
                  • Teléfono:{' '}
                  <a
                    href="tel:+525565053202"
                    className="text-primary hover:underline font-semibold"
                  >
                    +52 55 6505 3202
                  </a>
                </p>
                <p>
                  • WhatsApp:{' '}
                  <a
                    href="https://wa.me/525565053202"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary hover:underline font-semibold"
                  >
                    Enviar mensaje
                  </a>
                </p>
                <p>
                  • Correo:{' '}
                  <a
                    href="mailto:fisio-movimiento.mx@gmail.com"
                    className="text-primary hover:underline font-semibold"
                  >
                    fisio-movimiento.mx@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Botón de regreso */}
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/">Volver al inicio</Link>
            </Button>
          </div>
        </ScrollAnimated>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaCancelacion;
