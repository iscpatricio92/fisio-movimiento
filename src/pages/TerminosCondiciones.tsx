import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollAnimated } from '@/components/ScrollAnimated';
import { FileText, AlertTriangle, Shield, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useMetaTags } from '@/hooks/use-meta-tags';

const TerminosCondiciones = () => {
  useMetaTags({
    title: 'Términos y Condiciones | FisioAnalaura - Servicios de Fisioterapia',
    description:
      'Términos y condiciones de uso del sitio web y servicios de fisioterapia de FisioAnalaura. Conoce las condiciones, métodos de pago y políticas de servicio.',
    url: 'https://fisio-movimiento.com/terminos-condiciones',
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
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Términos y <span className="text-primary">Condiciones</span>
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
          <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50 mb-8">
            <p className="text-foreground">
              Al acceder y utilizar este sitio web y los servicios de
              fisioterapia ofrecidos por la{' '}
              <strong>Lic. Analaura Reyes Priego</strong>, usted acepta estar
              sujeto a los siguientes términos y condiciones. Le recomendamos
              leerlos cuidadosamente.
            </p>
          </div>

          {/* Contenido */}
          <div className="prose prose-lg max-w-none space-y-8">
            {/* Aceptación */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                1. Aceptación de los Términos
              </h2>
              <p className="text-foreground">
                Al utilizar este sitio web, reservar una cita, o utilizar
                nuestros servicios, usted reconoce que ha leído, entendido y
                acepta estar vinculado por estos términos y condiciones, así
                como por nuestra
                <Link
                  to="/aviso-privacidad"
                  className="text-primary hover:underline"
                >
                  {' '}
                  Política de Privacidad
                </Link>{' '}
                y
                <Link
                  to="/politica-cancelacion"
                  className="text-primary hover:underline"
                >
                  {' '}
                  Política de Cancelación
                </Link>
                .
              </p>
            </section>

            {/* Información del sitio */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                2. Información del Sitio Web
              </h2>
              <p className="text-foreground mb-4">
                Este sitio web es propiedad y está operado por:
              </p>
              <div className="bg-background/50 rounded-lg p-4">
                <p className="font-semibold text-foreground">
                  Lic. Analaura Reyes Priego
                </p>
                <p className="text-muted-foreground">
                  Cédula Profesional: 10909109
                </p>
                <p className="text-muted-foreground mt-2">
                  Fisioterapeuta registrada y certificada
                </p>
              </div>
            </section>

            {/* Uso del sitio */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                3. Uso del Sitio Web
              </h2>
              <p className="text-foreground mb-4">
                Usted se compromete a utilizar este sitio web de manera legal y
                apropiada. Está prohibido:
              </p>
              <ul className="space-y-2 text-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Utilizar el sitio para fines ilegales o no autorizados
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Intentar acceder a áreas restringidas del sitio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Transmitir virus, malware o código malicioso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Copiar, modificar o distribuir el contenido sin autorización
                  </span>
                </li>
              </ul>
            </section>

            {/* Servicios médicos */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-accent" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  4. Información Médica y Deslinde de Responsabilidad
                </h2>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 mb-4 border border-accent/20">
                <p className="text-foreground font-semibold mb-2">
                  ⚠️ IMPORTANTE:
                </p>
                <p className="text-foreground">
                  La información proporcionada en este sitio web tiene fines
                  informativos y educativos únicamente.
                  <strong>
                    {' '}
                    No sustituye una consulta médica profesional, un diagnóstico
                    o un tratamiento personalizado.
                  </strong>
                </p>
              </div>
              <ul className="space-y-2 text-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    La información del sitio no constituye asesoramiento médico
                    profesional
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    No debe utilizarse para autodiagnóstico o autotratamiento
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Consulte siempre con un profesional de la salud calificado
                    antes de tomar decisiones sobre su salud
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    En caso de emergencia médica, contacte inmediatamente a los
                    servicios de emergencia (911)
                  </span>
                </li>
              </ul>
            </section>

            {/* Reserva de citas */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                5. Reserva de Citas y Servicios
              </h2>
              <p className="text-foreground mb-4">
                Al reservar una cita a través de este sitio web o cualquier
                plataforma asociada (como Doctoralia), usted acepta:
              </p>
              <ul className="space-y-2 text-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Proporcionar información veraz y completa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Cumplir con nuestra{' '}
                    <Link
                      to="/politica-cancelacion"
                      className="text-primary hover:underline"
                    >
                      Política de Cancelación y Reagendación
                    </Link>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Llegar puntualmente a su cita</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Comunicar cualquier cambio en su estado de salud antes de la
                    cita
                  </span>
                </li>
              </ul>
              <p className="text-muted-foreground text-sm mt-4">
                La confirmación de una cita está sujeta a disponibilidad. Nos
                reservamos el derecho de cancelar o reagendar citas en caso de
                emergencias o circunstancias imprevistas.
              </p>
            </section>

            {/* Métodos de pago */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  6. Métodos de Pago
                </h2>
              </div>
              <p className="text-foreground mb-4">
                Aceptamos los siguientes métodos de pago:
              </p>
              <ul className="space-y-2 text-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Efectivo:</strong> Pago en el consultorio al momento
                    de la consulta
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Transferencia bancaria:</strong> Se proporcionarán
                    los datos bancarios al confirmar la cita
                  </span>
                </li>
                {/*  <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Tarjeta de débito/crédito:</strong> Aceptadas en el consultorio (sujeto a disponibilidad del terminal)</span>
                </li> */}
              </ul>
              {/* <div className="bg-background/50 rounded-lg p-4 mt-4">
                <p className="text-sm text-foreground">
                  <strong>Facturación:</strong> Se proporciona factura electrónica (CFDI) cuando se solicita.
                  Para facturación, se requiere proporcionar los datos fiscales completos (RFC, razón social, dirección fiscal).
                </p>
              </div> */}
            </section>

            {/* Precios */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                7. Precios y Tarifas
              </h2>
              <p className="text-foreground mb-4">
                Los precios mostrados en este sitio web están sujetos a cambios
                sin previo aviso. El precio final de los servicios se confirmará
                al momento de la reserva de la cita.
              </p>
              <p className="text-muted-foreground text-sm">
                Los precios pueden variar según el tipo de servicio, duración de
                la sesión, y si es consulta presencial u online.
              </p>
            </section>

            {/* Propiedad intelectual */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                8. Propiedad Intelectual
              </h2>
              <p className="text-foreground mb-4">
                Todo el contenido de este sitio web, incluyendo textos,
                imágenes, logotipos, gráficos, y diseño, es propiedad de la Lic.
                Analaura Reyes Priego y está protegido por las leyes de
                propiedad intelectual de México.
              </p>
              <p className="text-muted-foreground text-sm">
                Está prohibida la reproducción, distribución, modificación o uso
                comercial del contenido sin autorización escrita.
              </p>
            </section>

            {/* Enlaces externos */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                9. Enlaces a Sitios de Terceros
              </h2>
              <p className="text-foreground">
                Este sitio web puede contener enlaces a sitios de terceros (como
                Doctoralia, redes sociales, etc.). No somos responsables del
                contenido, políticas de privacidad o prácticas de estos sitios
                externos. Le recomendamos revisar los términos y condiciones de
                cualquier sitio de terceros que visite.
              </p>
            </section>

            {/* Limitación de responsabilidad */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  10. Limitación de Responsabilidad
                </h2>
              </div>
              <p className="text-foreground mb-4">
                En la medida permitida por la ley aplicable, no seremos
                responsables de:
              </p>
              <ul className="space-y-2 text-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Daños directos, indirectos, incidentales o consecuentes
                    derivados del uso de este sitio web
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Interrupciones en el servicio, errores técnicos o fallas en
                    el sitio web
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Pérdida de datos o información</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Decisiones médicas tomadas basándose únicamente en la
                    información del sitio web
                  </span>
                </li>
              </ul>
            </section>

            {/* Modificaciones */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                11. Modificaciones a los Términos
              </h2>
              <p className="text-foreground">
                Nos reservamos el derecho de modificar estos términos y
                condiciones en cualquier momento. Los cambios serán publicados
                en esta página con la fecha de última actualización. Le
                recomendamos revisar periódicamente estos términos.
              </p>
            </section>

            {/* Ley aplicable */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                12. Ley Aplicable y Jurisdicción
              </h2>
              <p className="text-foreground">
                Estos términos y condiciones se rigen por las leyes de los
                Estados Unidos Mexicanos. Cualquier disputa relacionada con
                estos términos o con nuestros servicios será resuelta en los
                tribunales competentes de la Ciudad de México o del Estado de
                México, según corresponda.
              </p>
            </section>

            {/* Contacto */}
            <section className="bg-primary/10 rounded-2xl p-6 lg:p-8 border border-primary/20">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                ¿Tiene preguntas sobre estos términos?
              </h2>
              <p className="text-foreground mb-4">
                Si tiene alguna duda o necesita aclaración sobre estos términos
                y condiciones, no dude en contactarnos:
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

export default TerminosCondiciones;
