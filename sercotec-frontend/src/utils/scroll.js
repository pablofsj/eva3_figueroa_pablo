/**
 * Utilidad de scroll suave para elementos del DOM
 * @param {string} target - Selector CSS del elemento destino (e.g. '#contacto')
 * @param {number} offset - Compensación en píxeles (por ejemplo, altura de la cabecera sticky)
 */
export const scrollTo = (target, offset = 100) => {
  const element = document.querySelector(target);
  if (!element) return;
  
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};
