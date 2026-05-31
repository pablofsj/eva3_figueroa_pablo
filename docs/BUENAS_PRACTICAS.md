# Guía de Buenas Prácticas: Sercotec CDN Santiago

## 1. Nomenclatura y Estructura
* **Componentes Vue**: PascalCase para nombres de archivo y de definición (ej: `ServiceCard.vue`).
* **Propiedades (Props)**: Definición en camelCase (ej: `initialService`).
* **Eventos (Emits)**: kebab-case (ej: `@contact-service`).
* **Clases CSS**: Clases semánticas en kebab-case. Estilos aislados en `<style scoped>` dentro de cada componente para evitar contaminación del CSS global.

---

## 2. Sistema de Diseño (Variables CSS)
* **Unificación de estilos**: Centralización de colores corporativos, bordes y sombras en `variables.css`.
* **Modo Alto Contraste**: Inyección automática en `html.high-contrast` de colores de alto contraste (fondo negro y letras blancas/amarillas) que cumplen con el ratio de contraste **7:1 (WCAG AAA)**.

---

## 3. Accesibilidad Web (WCAG 2.1 AA) y Usabilidad
* **Bypass de Bloques**: Enlace de salto directo al inicio (`.skip-link`) visible con foco por teclado.
* **Navegación por Teclado**: Foco de teclado visible de 3px (`:focus-visible`) para todos los elementos interactivos.
* **Semántica HTML5**: Uso exclusivo de elementos estructurales nativos (`<nav>`, `<header>`, `<main>`, `<section>`).
* **Roles ARIA**: Etiquetas correctivas (`aria-expanded`, `aria-controls`, `aria-live`, `aria-roledescription="carousel"`) implementadas en el carrusel de testimonios y acordeón de FAQs.

---

## 4. Rendimiento del Desarrollo y Carga
* **Carga Diferida**: Atributo `loading="lazy"` nativo en imágenes decorativas.
* **Skeletons Visuales**: Uso de `<BaseSkeleton />` para simular cargas fluidas antes del render final, eliminando saltos de pantalla (CLS).
* **CMS Online Cliente**: Gestión reactiva con `localStorage` como fallback, permitiendo independencia de red y rapidez de prototipado.
