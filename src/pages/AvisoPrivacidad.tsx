import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollAnimated } from '@/components/ScrollAnimated';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useMetaTags } from '@/hooks/use-meta-tags';

const AvisoPrivacidad = () => {
  useMetaTags({
    title: 'Aviso de Privacidad | FisioAnalaura - Protección de Datos',
    description:
      'Aviso de Privacidad de FisioAnalaura. Conoce cómo protegemos tus datos personales según la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).',
    url: 'https://fisio-movimiento.com/aviso-privacidad',
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
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Aviso de <span className="text-primary">Privacidad</span>
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

          {/* Contenido */}
          <div className="prose prose-lg max-w-none space-y-8">
            {/* Responsable */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                1. Responsable del Tratamiento de Datos Personales
              </h2>
              <p className="text-foreground mb-4">
                En cumplimiento de lo dispuesto por la{' '}
                <strong>
                  Ley Federal de Protección de Datos Personales en Posesión de
                  los Particulares (LFPDPPP)
                </strong>
                , se informa que el responsable del tratamiento de sus datos
                personales es:
              </p>
              <div className="bg-background/50 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-foreground">
                  Lic. Analaura Reyes Priego
                </p>
                <p className="text-muted-foreground">
                  Cédula Profesional: 10909109
                </p>
                <div className="flex items-start gap-2 text-muted-foreground mt-3">
                  <MapPin className="w-4 h-4 shrink-0 mt-1" />
                  <div>
                    <p>
                      Consultorio Iztapalapa: Andres Tutino 25c, 09360
                      Iztapalapa, CDMX
                    </p>
                    <p className="mt-1">
                      Consultorio Metepec: Priv. 5 de Mayo 5, San Jerónimo
                      Chicahualco, 52179 Metepec, Estado de México
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mt-3">
                  <Phone className="w-4 h-4" />
                  <a
                    href="tel:+525565053202"
                    className="hover:text-primary transition-colors"
                  >
                    +52 55 6505 3202
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mt-2">
                  <Mail className="w-4 h-4" />
                  <a
                    href="mailto:fisio-movimiento.mx@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    fisio-movimiento.mx@gmail.com
                  </a>
                </div>
              </div>
            </section>

            {/* Datos Recabados */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                2. Datos Personales que se Recaban
              </h2>
              <p className="text-foreground mb-4">
                Para la prestación de servicios de fisioterapia, se recaban los
                siguientes datos personales:
              </p>
              <ul className="space-y-2 text-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Datos de identificación:</strong> Nombre completo,
                    edad, fecha de nacimiento
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Datos de contacto:</strong> Teléfono, correo
                    electrónico, dirección
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Datos de salud:</strong> Historial médico,
                    diagnóstico, síntomas, tratamientos previos
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Datos financieros:</strong> Información de pago
                    (únicamente para procesamiento de transacciones)
                  </span>
                </li>
              </ul>
            </section>

            {/* Finalidad */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                3. Finalidad del Tratamiento de Datos Personales
              </h2>
              <p className="text-foreground mb-4">
                Sus datos personales serán utilizados para las siguientes
                finalidades:
              </p>
              <ul className="space-y-2 text-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Prestar servicios de fisioterapia y atención médica
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Gestionar citas, confirmaciones y recordatorios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Mantener historial clínico y expediente médico</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Procesar pagos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Comunicación sobre servicios, promociones y actualizaciones
                    (con su consentimiento)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cumplir con obligaciones legales y regulatorias</span>
                </li>
              </ul>
            </section>

            {/* Transferencias */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                4. Transferencias de Datos Personales
              </h2>
              <p className="text-foreground mb-4">
                Sus datos personales podrán ser compartidos únicamente con:
              </p>
              <ul className="space-y-2 text-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Plataformas de reserva:</strong> Doctoralia (para
                    gestión de citas en línea)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Proveedores de servicios:</strong> Procesadores de
                    pago, servicios de hosting (bajo estrictos acuerdos de
                    confidencialidad)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Autoridades:</strong> Cuando sea requerido por ley o
                    por orden judicial
                  </span>
                </li>
              </ul>
              <p className="text-muted-foreground mt-4 text-sm">
                No se realizarán transferencias de datos personales con fines
                comerciales sin su consentimiento expreso.
              </p>
            </section>

            {/* Derechos ARCO */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                5. Derechos ARCO (Acceso, Rectificación, Cancelación y
                Oposición)
              </h2>
              <p className="text-foreground mb-4">Usted tiene derecho a:</p>
              <div className="space-y-3">
                <div className="bg-background/50 rounded-lg p-4">
                  <p className="font-semibold text-foreground mb-2">
                    • <strong>Acceso:</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Conocer qué datos personales tenemos sobre usted y para qué
                    los utilizamos.
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <p className="font-semibold text-foreground mb-2">
                    • <strong>Rectificación:</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Solicitar la corrección de sus datos personales cuando sean
                    inexactos o incompletos.
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <p className="font-semibold text-foreground mb-2">
                    • <strong>Cancelación:</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Solicitar que eliminemos sus datos personales de nuestros
                    registros (salvo cuando la ley nos obligue a conservarlos).
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <p className="font-semibold text-foreground mb-2">
                    • <strong>Oposición:</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Oponerse al tratamiento de sus datos personales para fines
                    específicos.
                  </p>
                </div>
              </div>
              <p className="text-foreground mt-6">
                Para ejercer cualquiera de estos derechos, puede contactarnos a
                través de:
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mt-4">
                <p className="text-foreground font-semibold mb-2">
                  Medios de contacto:
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    • Correo electrónico:{' '}
                    <a
                      href="mailto:fisio-movimiento.mx@gmail.com"
                      className="text-primary hover:underline"
                    >
                      fisio-movimiento.mx@gmail.com
                    </a>
                  </li>
                  <li>
                    • Teléfono:{' '}
                    <a
                      href="tel:+525565053202"
                      className="text-primary hover:underline"
                    >
                      +52 55 6505 3202
                    </a>
                  </li>
                  <li>
                    • Presencialmente en cualquiera de nuestros consultorios
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  Su solicitud será atendida en un plazo máximo de 20 días
                  hábiles.
                </p>
              </div>
            </section>

            {/* Medidas de Seguridad */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                6. Medidas de Seguridad
              </h2>
              <p className="text-foreground mb-4">
                Implementamos medidas técnicas, administrativas y físicas para
                proteger sus datos personales contra daño, pérdida, alteración,
                destrucción o uso no autorizado. Sus datos de salud son tratados
                con especial confidencialidad conforme a la normativa aplicable.
              </p>
            </section>

            {/* Consentimiento */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                7. Consentimiento
              </h2>
              <p className="text-foreground mb-4">
                Al proporcionar sus datos personales a través de este sitio web,
                formularios de contacto, o durante la prestación de servicios,
                usted otorga su consentimiento para el tratamiento de sus datos
                personales conforme a lo establecido en este Aviso de
                Privacidad.
              </p>
              <p className="text-muted-foreground text-sm">
                Si no está de acuerdo con alguno de los términos de este aviso,
                le solicitamos que no proporcione sus datos personales.
              </p>
            </section>

            {/* Cambios al Aviso */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                8. Cambios al Aviso de Privacidad
              </h2>
              <p className="text-foreground">
                Nos reservamos el derecho de modificar este Aviso de Privacidad.
                Cualquier cambio será publicado en este sitio web con la fecha
                de última actualización. Le recomendamos revisar periódicamente
                este aviso.
              </p>
            </section>

            {/* Autoridad */}
            <section className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                9. Autoridad de Control
              </h2>
              <p className="text-foreground mb-4">
                Si considera que sus derechos de protección de datos personales
                han sido vulnerados, puede presentar una queja o denuncia ante
                el{' '}
                <strong>
                  Instituto Nacional de Transparencia, Acceso a la Información y
                  Protección de Datos Personales (INAI)
                </strong>
                .
              </p>
              <div className="bg-background/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>INAI:</strong> www.inai.org.mx | Teléfono: 800 835
                  4324
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

export default AvisoPrivacidad;
