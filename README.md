# Portal Web Sercotec - Centro de Negocios Santiago

Rediseño interactivo y accesible del portal **Sercotec Centro de Negocios Santiago**, con panel de administración integrado y modo de alto contraste.

---

## Información del Cliente
* **Sitio Oficial**: [Sercotec CDN Santiago](https://sitios.sercotec.cl/centros-de-negocios/centro-de-desarrollo-de-negocios-santiago/)
* **Dirección**: Manuel Rodríguez Sur 749, Santiago (Metro Toesca).
* **Correo**: centro.santiago@centrossercotec.cl

---

## Estructura del Proyecto

```text
sercotec/
├── README.md
├── docs/ 
│   └── BUENAS_PRACTICAS.md
└── sercotec-frontend/
    ├── index.html
    ├── src/
    │   ├── main.js
    │   ├── App.vue
    │   ├── components/
    │   │   ├── AppHeader.vue
    │   │   ├── AppFooter.vue
    │   │   ├── ServiceCard.vue
    │   │   ├── TestimonialCarousel.vue
    │   │   ├── FAQAccordion.vue
    │   │   ├── ContactForm.vue
    │   │   ├── BaseSkeleton.vue
    │   │   └── AdminPanel.vue
    │   ├── services/
    │   │   └── api.js
    │   └── styles/
    │       ├── variables.css
    │       └── main.css
```

---

## Ejecución Local

```bash
cd sercotec-frontend
npm install
npm run dev
```

Acceso: **http://localhost:5173/**

---

## Demo en línea

https://eva3-figueroa-pablo.vercel.app/

---
