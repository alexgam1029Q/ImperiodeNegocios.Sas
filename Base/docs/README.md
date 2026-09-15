# Imperio de Negocios

Simulador web de gestión financiera. Permite invertir en empresas, administrar capital, desarrollar habilidades, contratar asesores y avanzar mediante reputación y logros.

## Cómo ejecutar el proyecto

El frontend es estático y se sirve mediante un servidor HTTP local. Supabase gestiona autenticación y persistencia.

### Ejecutar localmente

1. Abre la carpeta raíz del proyecto en Visual Studio Code.

2. Presiona **F5** si el proyecto tiene configurado el lanzador de VS Code, o inicia un servidor HTTP desde la carpeta raíz.

3. El navegador abrirá automáticamente el juego en:

```text
http://127.0.0.1:8000/
```

El servidor local únicamente se utiliza para ejecutar correctamente la aplicación web. **Los datos del juego se gestionan mediante Supabase.**

## Estructura del proyecto

```text
Imperio-de-Negocios/
│
├── Base/
│   ├── index.html
│   ├── login.html
│   ├── registro.html
│   ├── css/
│   │   └── styles.css
│   ├── sw.js
│   ├── assets/
│   │   ├── avatares/
│   │   ├── logos/
│   │   ├── mascotas/
│   │   ├── perfiles/
│   │   └── qr/
│   ├── json/
│   │   └── manifest.webmanifest
│   └── js/
│       ├── core/app.js
│       ├── services/db.js
│       └── data/gameData.js
│
└── .vscode/
    └── launch.json
```

## Estadísticas del código

| Lenguaje | Líneas de código |
|----------|-----------------|
| JavaScript (.js) | 7.167 |
| HTML (.html) | 1.027 |
| CSS (.css) | 818 |
| Manifest (.webmanifest) | 27 |
| JSON (.json) | 17 |
| TOML (.toml) | 6 |
| **TOTAL** | **9.062** |

Las cifras incluyen los archivos fuente y de configuración del proyecto, pero excluyen las imágenes de `Base/assets`.

## Funcionalidades principales

* Login y registro normal mediante usuario y contraseña guardados en `users`.
* Inicio de sesión con Google OAuth, con selección inicial de nombre de usuario.
* Ranking público de jugadores por ganancias de operaciones y dividendos acumulados.
* ID público secuencial para encontrar perfiles sin compartir el correo.
* Sistema social con búsqueda, solicitudes de amistad, lista de amigos y perfiles públicos.
* Chat de amigos emergente con mensajes sincronizados en segundo plano.
* Propuestas de inversión cooperativa entre amigos con aporte y participación.
* Panel de proyectos cooperativos para aceptar, rechazar, vender o limpiar inversiones pendientes.
* Migración preparada para billeteras, transacciones y amistades protegidas con RLS.
* Panel de control con resumen financiero.
* Sistema de inversiones.
* Compra y venta de activos.
* Portafolio con seguimiento de inversiones.
* Asesores financieros y recomendaciones estratégicas.
* Árbol de habilidades.
* Sistema de reputación.
* Sistema de logros.
* Ajustes de usuario.
* Confirmaciones antes de realizar acciones importantes.
* Guardado de progreso directamente en Supabase.
* Sincronización de los datos del usuario con la base de datos.

## Persistencia de datos

**Supabase es el sistema principal de persistencia del proyecto.**

El archivo:

```text
Base/js/services/db.js
```

se encarga de gestionar la comunicación con Supabase y las operaciones relacionadas con los datos del usuario.

Los datos importantes del juego, como:

* Usuarios.
* Progreso.
* Capital.
* Inversiones.
* Portafolio.
* Habilidades.
* Reputación.
* Logros.
* Configuración del usuario.

deben almacenarse y recuperarse desde Supabase.

### Configuración de Supabase

La conexión se configura mediante:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
```

Estas variables se encuentran en:

```text
Base/index.html
```

La aplicación usa únicamente la tabla `users` y el campo `users.save_data` para guardar las cuentas y el progreso. La configuración de Supabase se administra directamente desde el panel del proyecto.

El registro normal requiere usuario y contraseña; ambos se guardan en la tabla `users`. Google continúa usando OAuth y permite elegir el nombre de usuario en la configuración inicial.

> La aplicación debe utilizar únicamente la clave pública `anon` de Supabase en el frontend. Nunca debe incluirse una clave secreta como `service_role` dentro de `index.html` o de archivos JavaScript que se ejecuten en el navegador.

### Inicio de sesión con Google

En el panel de Supabase, activa `Authentication > Providers > Google` y configura las credenciales OAuth del proyecto de Google. Añade la URL pública de la aplicación en `Authentication > URL Configuration > Redirect URLs`; el código la utiliza automáticamente como retorno después de la autenticación.

## Desarrollo y edición

### Interfaz

La interfaz principal se encuentra en:

```text
Base/index.html
Base/css/styles.css
```

### Lógica de la aplicación

La lógica, eventos, botones y actualizaciones de la interfaz se encuentran principalmente en:

```text
Base/js/core/app.js
```

### Base de datos y Supabase

La conexión, consultas, guardado y recuperación de datos desde Supabase se encuentran en:

```text
Base/js/services/db.js
```

### Datos del juego

Los sectores, empresas, precios y parámetros principales del mercado se encuentran en:

```text
Base/js/data/gameData.js
```

## Servidor local

La configuración `.vscode/launch.json` inicia un servidor HTTP local con el módulo integrado de Python. El servidor **no almacena el progreso del jugador**; su única función es servir los archivos de la aplicación.

Al presionar **F5**, se inicia el servidor y se abre `http://127.0.0.1:8000/`. También puede ejecutarse manualmente desde la raíz:

```powershell
py -3 -m http.server 8000 --directory "Base"
```

Para comprobar recursos estáticos, la aplicación debe abrirse mediante HTTP y no directamente con `file:///`.

La aplicación se conecta posteriormente con Supabase para autenticar usuarios, guardar información y recuperar el progreso.

## Flujo de funcionamiento

```text
Visual Studio Code
        │
        │ F5
        ▼
        Python http.server
        │
        ▼
Base/index.html
        │
        ├── core/app.js
        ├── services/db.js
        └── data/gameData.js
                │
                ▼
             Supabase
                │
                ├── Usuarios
                ├── Progreso
                ├── Inversiones
                ├── Portafolio
                ├── Habilidades
                ├── Reputación
                └── Logros
```

## Notas

* El proyecto está diseñado como una simulación educativa de decisiones financieras.
* **Supabase es la fuente principal de datos del juego.**
* El servidor Python solamente sirve la aplicación durante el desarrollo.
* El progreso del usuario debe permanecer sincronizado con Supabase.
* Para modificar la conexión o las consultas de la base de datos, revisa `Base/js/services/db.js`.
* Para modificar empresas, sectores o parámetros del mercado, revisa `Base/js/data/gameData.js`.
* Para modificar la apariencia, revisa `Base/css/styles.css`.
