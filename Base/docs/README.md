# Imperio de Negocios

Imperio de Negocios es un simulador web de gestión financiera y desarrollo empresarial. El juego combina inversiones, cartera, habilidades, reputación, relaciones sociales y progresión del usuario en una experiencia pensada para practicar decisiones de negocio dentro de un entorno amigable.

## Estado del proyecto

El proyecto sigue en desarrollo activo y cuenta con:

- autenticación con usuario/contraseña y OAuth de Google
- gestión de perfil, ajustes y cierre de sesión
- sistema de inversiones, activo, cartera y seguimiento
- panel social con amigos, solicitudes y chat
- propuestas cooperativas y proyectos compartidos
- almacenamiento persistente mediante Supabase
- noticias de sectores, ranking y evolución del progreso del jugador

## Cómo ejecutar la app

El punto de entrada del proyecto se sirve desde la raíz del repositorio y redirige a la aplicación principal ubicada en `Base`.

### Opción recomendada

Desde la carpeta principal:

```powershell
py -m http.server 8000
```

Luego abre en el navegador:

```text
http://127.0.0.1:8000/
```

La raíz redirige a:

```text
http://127.0.0.1:8000/Base/login.html
```

> El servidor local solo sirve la app. La persistencia real del usuario y del progreso se gestiona en Supabase.

## Estructura principal

```text
Imperio de Negocios/
├── index.html                     # Entrada principal del proyecto
├── server.js                      # Servidor de apoyo o despliegue
├── Base/
│   ├── index.html                 # App principal
│   ├── login.html                 # Login
│   ├── registro.html              # Registro
│   ├── sw.js                      # Service worker
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── core/
│   │   │   └── app.js
│   │   ├── data/
│   │   │   └── gameData.js
│   │   └── services/
│   │       └── db.js
│   ├── json/
│   │   └── manifest.webmanifest
│   ├── assets/
│   │   ├── avatares/
│   │   ├── Fondos/
│   │   ├── logos/
│   │   ├── mascotas/
│   │   ├── perfiles/
│   │   ├── qr/
│   │   └── Pack de Iconos Botones/
│   ├── noticias/
│   │   ├── README.md
│   │   └── *.md
│   └── docs/
│       ├── README.md
│       ├── actualizaciones
│       ├── Manual de Programador.md
│       ├── Manual de usuario.md
│       └── Link.md
├── Manuales/
├── .vscode/
│   └── launch.json
└── README.md                     # Documento general del repositorio
```

## Documentación relevante

- [README.md](README.md): guía técnica y de estructura del proyecto.
- [actualizaciones](actualizaciones): historial de cambios y mejoras recientes.
- [Manual de usuario.md](Manual%20de%20usuario.md): uso general de la aplicación.
- [Manual de Programador.md](Manual%20de%20Programador.md): detalles de desarrollo y mantenimiento.
- [../noticias/README.md](../noticias/README.md): contenido de noticias del juego.

## Persistencia y configuración

La lógica de acceso a base de datos está en:

```text
Base/js/services/db.js
```

La conexión a Supabase usa las variables `SUPABASE_URL` y `SUPABASE_ANON_KEY`, que están definidas en `Base/index.html`.

El proyecto está diseñado para usar la clave pública `anon` del frontend y evitar cualquier credencial sensible dentro del navegador.

## Flujo principal del sistema

```text
Usuario -> navegador -> Base/index.html
        -> Base/js/core/app.js
        -> Base/js/services/db.js
        -> Supabase
        -> persistencia, perfil, inversiones, social, progreso
```

## Notas importantes

- La aplicación fue diseñada como simulación estratégica de negocios y finanzas.
- El proyecto combina frontend estático con backend gestionado por Supabase.
- La estructura de carpetas se mantiene separada entre aplicación, documentación y recursos visuales.

## Licencia y mantenimiento

Este repositorio está orientado a uso interno de desarrollo del juego. Si se amplía, conviene mantener la documentación de usuario, desarrollador y cambios actualizados junto con la lógica del juego.
* **Supabase es la fuente principal de datos del juego.**
* El servidor Python solamente sirve la aplicación durante el desarrollo.
* El progreso del usuario debe permanecer sincronizado con Supabase.
* Para modificar la conexión o las consultas de la base de datos, revisa `Base/js/services/db.js`.
* Para modificar empresas, sectores o parámetros del mercado, revisa `Base/js/data/gameData.js`.
* Para modificar la apariencia, revisa `Base/css/styles.css`.
