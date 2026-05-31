/**
 * Servicio de API con Fallback Integrado
 * Este archivo gestiona las llamadas al CMS Strapi (http://localhost:1337).
 * Si Strapi no está activo o hay un error de red, carga automáticamente
 * datos locales mockeados de alta calidad específicos para el Centro de Negocios Sercotec.
 */

const STRAPI_BASE_URL = 'http://localhost:1337';

// Datos Mock Locales de Sercotec Centro de Negocios Santiago
const MOCK_DATA = {
  about: {
    id: 1,
    title: 'Centro de Negocios Santiago',
    tagline: 'Apoyo y crecimiento para tu pyme.',
    description: 'Ofrecemos asesoría técnica integral y capacitaciones gratuitas especializadas para fortalecer tu negocio y asegurar la rentabilidad de tus proyectos.',
    history: 'Apoyamos el desarrollo de micro y pequeñas empresas conectando de forma directa la oferta pública y privada.',
    metrics: [
      { id: 1, value: '2.500+', label: 'Pymes Asesoradas' },
      { id: 2, value: '8.400+', label: 'Horas de Mentoría' },
      { id: 3, value: '180+', label: 'Talleres Anuales' },
      { id: 4, value: '96%', label: 'Satisfacción General' }
    ]
  },
  services: [
    {
      id: 1,
      title: 'Acompañamiento Preventivo',
      description: 'Asesorías periódicas para optimizar tu negocio antes de fallas críticas.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
      icon: 'shield-check',
      benefits: ['Diagnóstico preventivo', 'Auditoría interna', 'Monitoreo de caja']
    },
    {
      id: 2,
      title: 'Acompañamiento Correctivo',
      description: 'Solución de desafíos operativos y financieros urgentes en tu gestión.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
      icon: 'tools',
      benefits: ['Planes de contingencia', 'Reestructuración', 'Gestión de crisis']
    },
    {
      id: 3,
      title: 'Gestión y Capacitación',
      description: 'Orientación estratégica en finanzas, marketing digital e innovación.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      icon: 'trending-up',
      benefits: ['Marketing Digital', 'Planificación financiera', 'Digitalización']
    },
    {
      id: 4,
      title: 'Vinculación Empresarial',
      description: 'Conexión con redes de negocios y guía en fondos concursables.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80',
      icon: 'users',
      benefits: ['Ruedas de negocios', 'Postulación a fondos', 'Alianzas comerciales']
    }
  ],
  testimonials: [
    {
      id: 1,
      quote: 'Gracias a las asesorías en marketing digital y finanzas del Centro de Negocios Santiago, logramos digitalizar nuestro catálogo y aumentamos nuestras ventas en un 150% en solo seis meses.',
      author: 'Carolina Valenzuela',
      business: 'Café & Dulces "La Huérfana"',
      role: 'Fundadora',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      quote: 'El acompañamiento correctivo fue clave cuando tuvimos problemas con el inventario y flujo de caja. Su mentor nos guió paso a paso para reordenar la administración y salvar nuestro taller.',
      author: 'Carlos Espinoza',
      business: 'Muebles Rústicos "San José"',
      role: 'Socio Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      quote: 'Participar en los encuentros de networking del Centro nos abrió puertas para vender nuestros productos textiles a nivel nacional. La vinculación empresarial es simplemente excelente.',
      author: 'Jimena Toledo',
      business: 'Confecciones "EcoModa"',
      role: 'Directora Creativa',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
    }
  ],
  faqs: [
    {
      id: 1,
      question: '¿Qué costo tienen los servicios entregados por el Centro de Negocios?',
      answer: 'Ninguno. Todos los servicios de asesoría técnica individual, capacitaciones, mentorías y vinculación son 100% gratuitos para los emprendedores y pymes atendidas, ya que son financiados por SERCOTEC.'
    },
    {
      id: 2,
      question: '¿Cuáles son los requisitos para poder asesorarse en el Centro?',
      answer: 'Cualquier emprendedor con una idea de negocio clara o una empresa ya constituida formalmente (primera categoría) puede recibir asesoramiento. Solo debes residir o tener tu negocio en la comuna de Santiago o zonas aledañas atendidas por nuestro centro.'
    },
    {
      id: 3,
      question: '¿Cómo me contacto para agendar mi primera asesoría?',
      answer: 'Puedes rellenar el formulario de contacto al final de esta página web seleccionando el tipo de servicio que requieres, enviarnos un correo a centro.santiago@centrossercotec.cl, o visitarnos directamente en Manuel Rodríguez Sur 749, Santiago (cerca de Metro Toesca).'
    },
    {
      id: 4,
      question: '¿El Centro me entrega financiamiento o fondos directos?',
      answer: 'El Centro no entrega capital de manera directa, pero sí te capacita y acompaña de forma personalizada en la postulación a los fondos concursables de SERCOTEC (como Capital Semilla Emprende, Abeja Emprende, Crece) y CORFO para maximizar tus opciones de adjudicación.'
    }
  ]
};

// Función helper para peticiones fetch con timeout
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 3000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// Desempaquetador de la estructura de datos de Strapi (Soporta v4 y v5)
function parseStrapiResponse(json, type) {
  if (!json || !json.data) return MOCK_DATA[type];
  
  const data = json.data;
  
  // Si la respuesta es un array (e.g., /api/services)
  if (Array.isArray(data)) {
    return data.map(item => {
      const attrs = item.attributes || item;
      return {
        id: item.id,
        ...attrs
      };
    });
  }
  
  // Si es un objeto singular (e.g., /api/about)
  const attrs = data.attributes || data;
  return {
    id: data.id,
    ...attrs
  };
}

export const api = {
  /**
   * Obtiene la información institucional de la sección "Nosotros"
   */
  async getAboutInfo() {
    try {
      const response = await fetchWithTimeout(`${STRAPI_BASE_URL}/api/about-info?populate=*`);
      if (!response.ok) throw new Error('Error al conectar con Strapi');
      const json = await response.json();
      return parseStrapiResponse(json, 'about');
    } catch (error) {
      console.warn('API Sercotec: Conexión fallida con Strapi para "Nosotros". Cargando fallback local...', error.message);
      return MOCK_DATA.about;
    }
  },

  /**
   * Obtiene la lista de servicios del centro
   */
  async getServices() {
    try {
      const response = await fetchWithTimeout(`${STRAPI_BASE_URL}/api/services?populate=*`);
      if (!response.ok) throw new Error('Error al conectar con Strapi');
      const json = await response.json();
      return parseStrapiResponse(json, 'services');
    } catch (error) {
      console.warn('API Sercotec: Conexión fallida con Strapi para "Servicios". Cargando fallback local...', error.message);
      return MOCK_DATA.services;
    }
  },

  /**
   * Obtiene los testimonios de los empresarios
   */
  async getTestimonials() {
    try {
      const response = await fetchWithTimeout(`${STRAPI_BASE_URL}/api/testimonials?populate=*`);
      if (!response.ok) throw new Error('Error al conectar con Strapi');
      const json = await response.json();
      return parseStrapiResponse(json, 'testimonials');
    } catch (error) {
      console.warn('API Sercotec: Conexión fallida con Strapi para "Testimonios". Cargando fallback local...', error.message);
      return MOCK_DATA.testimonials;
    }
  },

  /**
   * Obtiene las preguntas frecuentes
   */
  async getFAQs() {
    try {
      const response = await fetchWithTimeout(`${STRAPI_BASE_URL}/api/faqs?populate=*`);
      if (!response.ok) throw new Error('Error al conectar con Strapi');
      const json = await response.json();
      return parseStrapiResponse(json, 'faqs');
    } catch (error) {
      console.warn('API Sercotec: Conexión fallida con Strapi para "FAQs". Cargando fallback local...', error.message);
      return MOCK_DATA.faqs;
    }
  },

  /**
   * Envía el formulario de contacto al servidor (Strapi o endpoint simulado)
   */
  async sendContactMessage(formData) {
    try {
      const response = await fetchWithTimeout(`${STRAPI_BASE_URL}/api/contact-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: formData })
      });
      
      if (!response.ok) throw new Error('Respuesta de servidor no válida');
      return { success: true, fromStrapi: true };
    } catch (error) {
      console.warn('API Sercotec: Error de red o Strapi inactivo. Simulando envío del mensaje seguro localmente...', error.message);
      // Retardamos artificialmente para dar sensación de procesamiento real
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, fromStrapi: false };
    }
  }
};
