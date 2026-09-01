# 🚀 DIGITECH CORP - Sitio Web Profesional

Sitio web profesional, elegante y mobile-first para DIGITECH CORP, empresa líder en soluciones tecnológicas.

## 📋 Descripción

Sitio web corporativo desarrollado con tecnologías modernas y enfoque mobile-first, diseñado para mostrar los servicios y soluciones tecnológicas de DIGITECH CORP.

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica y accesible
- **CSS3/SASS** - Estilos modulares y responsive
- **JavaScript ES6+** - Funcionalidad interactiva y modular
- **Font Awesome** - Iconografía profesional
- **Google Fonts** - Tipografías optimizadas

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Primary**: `#002141` - Azul muy oscuro principal
- **Accent**: `#0056B3` - Azul accent vibrante
- **Obra360**: `#0075C5` - Azul específico para obra360
- **Success**: `#28A745` - Verde profesional
- **Warning**: `#FFC107` - Amarillo para alertas
- **Danger**: `#DC3545` - Rojo para errores

### Tipografías
- **Títulos**: Montserrat (300-800)
- **Cuerpo**: Be Vietnam Pro (200-700)
- **Obra360**: Comfortaa (300-700)

## 📁 Estructura del Proyecto

```
website_DC/
├── assets/
│   ├── images/
│   │   ├── hero/           # Imágenes del carousel
│   │   ├── logo/           # Logos de la empresa
│   │   └── index/          # Imágenes específicas del index
├── design-system/
│   ├── _variables.scss     # Variables globales
│   ├── _mixins.scss        # Mixins reutilizables
│   ├── _typography.scss    # Sistema de tipografía
│   ├── _buttons.scss       # Sistema de botones
│   ├── global.scss         # Estilos globales
│   └── components/
│       └── _navbar.scss    # Estilos del navbar
├── styles/
│   ├── inicio.scss         # Estilos específicos del index
│   └── inicio.css          # CSS compilado
├── scripts/
│   ├── inicio.js           # JavaScript principal
│   └── components/
│       └── navbar.js       # Componente navbar
├── pages/                  # Páginas adicionales
├── index.html              # Página principal
└── README.md              # Documentación
```

## 🚀 Características Principales

### ✨ Hero Carousel
- Carousel automático con 6 slides
- Navegación manual y automática
- Imágenes responsive (mobile/desktop)
- Animaciones elegantes
- Pausa en hover y cambio de pestaña

### 🎯 Sección de Innovación
- Animaciones scroll-triggered
- Contadores animados
- Diseño responsive
- Efectos visuales profesionales

### 🧭 Navbar Sticky
- Fondo transparente/blanco según scroll
- Dropdowns responsivos
- Menú hamburguesa para mobile
- Botón Obra360 integrado

### 📱 Footer Profesional
- Información de contacto
- Enlaces rápidos
- Redes sociales
- Newsletter
- Layout responsive

## 🎨 Componentes del Sistema de Diseño

### Botones
- `.btn-primary` - Botón principal
- `.btn-secondary` - Botón secundario
- `.btn-accent` - Botón de acento
- `.btn-success` - Botón de éxito
- `.btn-outline` - Botón outline
- `.btn-obra360` - Botón específico Obra360

### Utilidades CSS
- Sistema de espaciado (mt-1, mb-2, etc.)
- Flexbox utilities (flex-center, flex-between)
- Display utilities (d-none, d-block, d-flex)
- Responsive utilities (mobile-hidden, desktop-block)

### Mixins
- `@include flex-center` - Centrado con flexbox
- `@include transition` - Transiciones
- `@include shadow-md` - Sombras
- `@include mobile` - Media queries
- `@include container-responsive` - Container responsive

## 🔧 Instalación y Uso

### Prerrequisitos
- Python 3.x (para servidor local)
- Navegador moderno

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd website_DC
   ```

2. **Iniciar servidor local**
   ```bash
   python3 -m http.server 8015
   ```

3. **Abrir en navegador**
   ```
   http://localhost:8015
   ```

### Compilación SASS

> ⚠️ **No recompiles sin leer esto.** `styles/inicio.css` diverge de
> `styles/inicio.scss` en unas 700 líneas porque se editó a mano. Ejecutar
> `sass` ahora sobrescribiría esos cambios y alteraría el diseño.
> Hasta reconciliar ambos archivos, edita el `.css` y el `.scss` en paralelo.

```bash
sass styles/inicio.scss styles/inicio.css
```

## 📱 Responsive Design

El sitio está optimizado para:

- **📱 Mobile**: 320px - 767px
- **📱 Tablet**: 768px - 1023px
- **🖥️ Desktop**: 1024px+

### Breakpoints
- `@include mobile` - max-width: 767px
- `@include tablet` - 768px - 1023px
- `@include desktop` - min-width: 1024px

## 🎯 Servicios Incluidos

1. **Software a medida**
2. **Apps móviles**
3. **Gobierno Digital**
4. **Metodología BIM**
5. **Transformación Digital**
6. **Consultoría Tecnológica**

## 🔗 Enlaces Importantes

- **Obra360**: App móvil para sector construcción
- **Contacto**: +51 989 975 369
- **Email**: info@digitech-corp.pe

## 🏢 Oficinas

- **Principal**: Jade Mz. J Lote 17, Urb. Los Cedros - Trujillo
- **Chiclayo**: Los Naranjos 362, Urb. Magisterial - Chiclayo
- **Lima**: Mayta Capac 838, Jesus María - Lima

## 🚀 Optimizaciones Implementadas

_Revisión de septiembre 2026._

### Performance
- **Imágenes en WebP con respaldo**: cada `.png/.jpg` tiene su gemelo `.webp`.
  El HTML usa `<picture><source type="image/webp">` y el CSS usa `image-set()`,
  así que los navegadores antiguos siguen recibiendo el formato original.
- **Imágenes redimensionadas** a su tamaño real de uso (antes había un logo de
  8514px de ancho para mostrarse a 155px).
- **Fondos del carrusel diferidos**: solo el primer slide se descarga en la carga
  inicial; los otros cinco entran al dispararse `window.load` mediante la clase
  `.heroes-listos` que añade `HeroCarousel.cargarFondosRestantes()`.
- **Fuentes sin bloquear el render**: Google Fonts se enlaza desde el `<head>`
  (antes era un `@import` dentro del CSS, que encadenaba HTML → CSS → CSS → fuente).
  Font Awesome carga con `media="print" onload` y un respaldo en `<noscript>`.
- `loading="lazy"`, `decoding="async"` y `width`/`height` en todas las imágenes.
- Compresión gzip/brotli y cache del navegador configuradas en `.htaccess`.

**Resultado en la portada:** de ~7.3 MB y 46 peticiones a ~0.7 MB en la ruta
crítica (~1.4 MB con todo el carrusel ya cargado). `DOMContentLoaded` bajó de
1253 ms a ~210 ms.

### Accesibilidad
- Áreas táctiles de 44×44 px como mínimo (menú, indicadores de carrusel,
  enlaces del footer y de servicios).
- `:focus-visible` con contorno visible para navegación por teclado.
- Campos de formulario a 16px en móvil, para que iOS no haga zoom al enfocarlos.
- Soporte de `prefers-reduced-motion`.
- `autocomplete` e `inputmode` en el formulario de contacto.

### SEO
- `<link rel="canonical">`, Open Graph y Twitter Cards en las 17 páginas.
- Un solo `<h1>` por página (la portada tenía seis, uno por slide).
- `sitemap.xml` con las 17 URLs y `robots.txt`.
- `rel="noopener noreferrer"` en todos los enlaces con `target="_blank"`.

### Deuda técnica pendiente
- **`styles/inicio.css` y `styles/inicio.scss` están desincronizados** (~700 líneas
  de diferencia): el CSS fue editado a mano después de la última compilación.
  Recompilar con `sass` hoy cambiaría el aspecto del sitio. Antes de volver a usar
  el flujo SASS hay que reconciliar ambos archivos. Mientras tanto, **todo cambio
  de estilos debe aplicarse en los dos archivos**.
- El carrusel automático infla la métrica LCP: cada slide que entra se registra
  como un candidato nuevo. Corregirlo implica replantear las animaciones de entrada.
- `components-loader.js` reescribe rutas de imágenes y enlaces en tiempo de
  ejecución. Funciona para la raíz y para `pages/`, pero se rompería con un tercer
  nivel de carpetas.

## 🔄 Mantenimiento

### Actualización de Contenido
1. Editar archivos HTML directamente
2. Modificar variables SASS en `_variables.scss`
3. Actualizar imágenes en `assets/images/`

### Agregar Nuevas Páginas
1. Crear archivo HTML en `pages/`
2. Crear archivo SCSS específico
3. Compilar SASS
4. Actualizar navegación

## 📝 Notas de Desarrollo

- **Mobile-first**: Todos los estilos comienzan con mobile
- **Modular**: Componentes reutilizables y modulares
- **Escalable**: Fácil agregar nuevas funcionalidades
- **Mantenible**: Código bien documentado y estructurado

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto es propiedad de DIGITECH CORP. Todos los derechos reservados.

## 📞 Contacto

- **Empresa**: DIGITECH CORP
- **Teléfono**: +51 989 975 369
- **Email**: info@digitech-corp.pe
- **Website**: https://digitech-corp.pe

---

**Desarrollado con ❤️ por DIGITECH CORP** 