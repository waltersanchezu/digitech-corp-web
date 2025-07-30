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

Para compilar los estilos SASS:

```bash
# Compilación normal
sass styles/inicio.scss styles/inicio.css

# Compilación comprimida
sass --style compressed styles/inicio.scss styles/inicio.css
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

### Performance
- Imágenes optimizadas y responsive
- CSS y JS minificados
- Lazy loading de componentes
- Debounce y throttle en eventos

### Accesibilidad
- ARIA labels implementados
- Navegación por teclado
- Contraste de colores optimizado
- Estructura semántica HTML5

### SEO
- Meta tags completos
- Open Graph tags
- Twitter Cards
- Estructura de headings optimizada

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