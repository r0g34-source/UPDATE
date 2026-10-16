# Enkapta - Plataforma Inmobiliaria PropTech

Plataforma digital para la búsqueda, compra, venta y alquiler de propiedades verificadas en Venezuela. Este repositorio contiene el código fuente de la versión Web (`web/`) y la versión móvil/App (`app/`).

---

## 📁 Estructura del Proyecto

```text
enkpata/
├── index.html              # Redirección automática a /web/
├── web/                    # Plataforma Web
│   ├── assets/             # Imágenes, logotipos, iconos y banners
│   │   ├── partners/       # Logos de empresas aliadas
│   │   ├── properties/     # Fotos de inmuebles y portadas
│   │   │   └── gallery/    # Galerías fotográficas de cada inmueble
│   │   └── realtors/       # Fotos de perfil de agentes y asesores
│   ├── index.html          # Portada principal
│   ├── propiedades.html    # Catálogo y buscador de propiedades
│   ├── propiedad-detalle.html # Ficha técnica de propiedad
│   ├── planes.html         # Planes y suscripciones
│   ├── quienes-somos.html  # Sobre Enkapta, pilares y visión
│   ├── contacto.html       # Formulario y banner de contacto
│   ├── iniciar-sesion.html # Pantalla de inicio de sesión con banner
│   ├── registrarse.html    # Pantalla de creación de cuenta
│   ├── perfil.html         # Perfil público de Realtor / Asesor
│   └── mi-cuenta.html      # Panel privado de usuario
├── app/                    # Aplicación móvil / PWA
└── README.md               # Documentación y especificaciones
```

---

## 🎨 Guía Maestra de Imágenes y Medidas (Para Diseñadores y Desarrolladores)

Todos los archivos en `web/assets/` cuentan con nombres claros, descriptivos y autoexplicativos que identifican exactamente dónde se utiliza cada imagen y cuál es su dimensión recomendada al exportar:

### 1. Banners Principales (Formularios y Pantallas Divididas)

| Nombre de Archivo Claro | Ubicación | Páginas donde se usa | Medida Exacta | Proporción | Especificaciones de Diseño |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **`banner-login-registro.jpg`** | `web/assets/` | `iniciar-sesion.html`<br>`registrarse.html` | **1200 × 1000 px**<br>*(o 1280 × 1080 px)* | **1.2 : 1 (6:5)** | Fondo naranja `#ff7201`. Dejar **80 a 100 px** de fondo naranja libre en la parte inferior para los iconos de redes sociales (TikTok, Facebook, Instagram) y copyright. Logo en esquina superior izquierda con margen de 40-50 px. |
| **`banner-contacto.jpg`** | `web/assets/` | `contacto.html` | **1024 × 1024 px**<br>*(o 1200 × 1200 px)* | **1 : 1 (Cuadrado)** | Fondo oscuro `#0d1114`. Ilustración "Tu Hogar Verificado" con la mascota 3D y llaves. Se ajusta automáticamente sin generar barras de scroll. |

---

### 2. Sliders de Portada y Cabeceras (Hero Sections)

| Nombre de Archivo Claro | Ubicación | Páginas donde se usa | Medida Exacta | Aspect Ratio | Formato |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **`hero-home-1.png`**<br>**`hero-home-2.jpg`**<br>**`hero-home-3.jpg`** | `web/assets/` | `index.html` (Slider Principal) | **1920 × 1080 px** | 16:9 | JPG/PNG optimizado web (< 350 KB) |
| **`hero-quienes-1.jpg`**<br>**`hero-quienes-2.jpg`**<br>**`hero-quienes-3.jpg`** | `web/assets/` | `quienes-somos.html` (Cabecera Slider) | **1920 × 1080 px** | 16:9 | JPG |

---

### 3. Tarjetas de Beneficios y Pilares

| Nombre de Archivo Claro | Ubicación | Páginas donde se usa | Medida Exacta | Aspect Ratio | Descripción |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **`beneficio-1-ia.jpg`** | `web/assets/` | `index.html` | **800 × 600 px** | 4:3 | Card 1: Búsqueda Inteligente con IA |
| **`beneficio-2-recorridos.jpg`** | `web/assets/` | `index.html` | **800 × 600 px** | 4:3 | Card 2: Fotografías y recorridos virtuales |
| **`beneficio-3-verificados.jpg`** | `web/assets/` | `index.html` | **800 × 600 px** | 4:3 | Card 3: Inmuebles 100% verificados |
| **`beneficio-4-contacto.jpg`** | `web/assets/` | `index.html` | **800 × 600 px** | 4:3 | Card 4: Contacto directo e inmediato |
| **`pilar-1-confianza.jpg`** | `web/assets/` | `quienes-somos.html` | **800 × 600 px** | 4:3 | Pilar institucional: Confianza |
| **`pilar-2-tecnologia.jpg`** | `web/assets/` | `quienes-somos.html` | **800 × 600 px** | 4:3 | Pilar institucional: Tecnología |
| **`pilar-3-servicio.jpg`** | `web/assets/` | `quienes-somos.html` | **800 × 600 px** | 4:3 | Pilar institucional: Servicio |
| **`pilar-4-historia.jpg`** | `web/assets/` | `quienes-somos.html` | **800 × 600 px** | 4:3 | Pilar institucional: Nuestra Historia |

---

### 4. Mascota e Ilustraciones de Secciones

| Nombre de Archivo Claro | Ubicación | Páginas donde se usa | Medida Exacta | Formato |
| :--- | :--- | :--- | :---: | :---: |
| **`mascota-relax-home.jpg`** | `web/assets/` | `index.html` (Sección intermedia) | **1024 × 600 px** | JPG |
| **`banner-hogar-verificado.png`** | `web/assets/` | `index.html` (Tarjeta verificación) | **800 × 600 px** | PNG |
| **`fondo-parallax-edificio.jpg`** | `web/assets/` | `index.html`<br>`quienes-somos.html` | **1920 × 1080 px** | JPG (Fondo parallax) |
| **`fondo-banner-planes.jpg`** | `web/assets/` | `planes.html` | **1920 × 600 px** | JPG (Fondo decorativo) |

---

### 5. Inmuebles y Galerías de Propiedades

| Categoría | Ruta en el Proyecto | Medida Recomendada | Formato |
| :--- | :--- | :---: | :---: |
| **Portadas de Inmuebles** | `web/assets/properties/prop-1.jpg`, `prop-2.png`, `prop-3.jpg`, `fav-apto.jpg` | **1200 × 800 px** (3:2) | JPG / PNG |
| **Galería de Fotos** | `web/assets/properties/gallery/oficina-1.jpg` al `7.jpg` | **1600 × 1060 px** (3:2) | JPG alta resolución |

---

### 6. Identidad de Marca, Partners y Asesores

| Elemento | Nombre de Archivo | Ubicación | Medida Exacta | Formato |
| :--- | :--- | :--- | :---: | :---: |
| **Logo Icono / Isotipo** | `enkapta-logo1.png` / `logo.png` | `web/assets/` | **512 × 512 px** | PNG Transparente |
| **Logo Partner Inmobiliario** | `logo-inmobiliaria-duenas.jpg` | `web/assets/` | **960 × 960 px** | JPG |
| **Fotos de Perfil Asesores** | `web/assets/realtors/` (`carlos.jpg`, `valeria.jpg`, `roberto.jpg`, etc.) | `web/assets/realtors/` | **500 × 500 px** (1:1) | JPG cuadrado |

---

## 📥 ¿Cómo Extraer las Imágenes desde Git mediante un Commit?

Git guarda los archivos binarios de imagen con precisión exacta. Para que el programador o diseñador descargue las imágenes usando el **Hash del Commit**:

### Opción 1: Descarga directa desde GitHub / GitLab / Bitbucket
1. Entrar al repositorio web y buscar el commit específico (`https://github.com/usuario/repositorio/commit/<HASH>`).
2. O navegar a la carpeta `web/assets/` en ese commit.
3. Hacer clic sobre la imagen deseada y presionar el botón **Download** o **View raw** para guardarla en calidad original.

### Opción 2: Clonar o cambiar al Commit en local (Terminal)
```bash
# Cambiar al commit exacto:
git checkout <HASH_DEL_COMMIT>

# Las imágenes estarán listas en:
# ./web/assets/
```

### Opción 3: Exportar solo la carpeta de imágenes en un ZIP
Sin necesidad de descargar todo el repositorio:
```bash
git archive --format=zip <HASH_DEL_COMMIT> web/assets/ -o imagenes-enkapta.zip
```
Esto genera un archivo `imagenes-enkapta.zip` que contiene todas las imágenes en su resolución exacta original.
