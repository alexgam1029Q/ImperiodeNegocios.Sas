# Manual de Programador: Imperio de Negocios

Documento técnico para instalar, mantener y ampliar el simulador web de gestión financiera Imperio de Negocios. Para las instrucciones dirigidas al jugador, consulta Manual de usuario.md.

## Cómo ejecutar el proyecto

El frontend es estático y se sirve mediante un servidor HTTP local. Supabase gestiona autenticación y persistencia.

### Ejecutar localmente
Abre la carpeta raíz del proyecto en Visual Studio Code.
Presiona F5 si el proyecto tiene configurado el lanzador de VS Code, o inicia un servidor HTTP desde la carpeta raíz.
El navegador abrirá automáticamente el juego en:
```text
http://127.0.0.1:8000/
```

El servidor local únicamente se utiliza para ejecutar correctamente la aplicación web. Los datos del juego se gestionan mediante Supabase.

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
├── .github/
│   └── workflows/
│       └── deploy.yml
│
└── .vscode/
    └── launch.json
## Estadísticas del código

| Lenguaje | Archivos | Líneas de código |
|----------|----------|-----------------|
| JavaScript (.js) | 5 | 7.277 |
| HTML (.html) | 4 | 1.030 |
| CSS (.css) | 1 | 818 |
| Manifest (.webmanifest) | 1 | 27 |
| JSON (.json) | 2 | 34 |
| TOML (.toml) | 1 | 6 |
| **TOTAL** | **14** | **9.192** |

Las cifras incluyen los archivos fuente y de configuración del proyecto, pero excluyen las imágenes de Base/assets.

## Funcionalidades principales
* Login y registro normal mediante usuario y contraseña guardados en `users`.
* Inicio de sesión con Google OAuth, con selección inicial de nombre de usuario.
Ranking público de jugadores por ganancias de operaciones y dividendos acumulados.
ID público secuencial para encontrar perfiles sin compartir el correo.
Propuestas de inversión cooperativa entre amigos con aporte y participación.
Migración preparada para billeteras, transacciones y amistades protegidas con RLS.
Panel de control con resumen financiero.
Sistema de inversiones.
Compra y venta de activos.
Portafolio con seguimiento de inversiones.
Asesores financieros y recomendaciones estratégicas.
Árbol de habilidades.
Sistema de reputación.
Sistema de logros.
Ajustes de usuario.
Confirmaciones antes de realizar acciones importantes.
Guardado de progreso directamente en Supabase.
Sincronización de los datos del usuario con la base de datos.
* Logotipos de empresas obtenidos dinámicamente mediante Logo.dev.
* Compras y suscripciones procesadas mediante PayPal Developer.

## Servicios externos y claves de API

El proyecto depende de varios servicios externos, cada uno con su propia clave pública. Todas se cargan desde el frontend porque no existe backend propio, por lo que todas deben ser claves públicas/restringidas, nunca claves secretas o privadas.

| Servicio | Uso en el proyecto | Tipo de clave | Dónde se declara |
|----------|--------------------|---------------|------------------|
| Supabase | Autenticación y persistencia (`users`, `save_data`) | `anon` pública | `Base/index.html` |
| Logo.dev | Logotipos de empresas y sectores del mercado | Publishable/API key pública | `Base/index.html` o `Base/js/data/gameData.js` |
| PayPal Developer | Procesamiento de pagos y compras | Client ID Sandbox/Live | `Base/index.html` |
| GitHub | Control de versiones y CI/CD | Token solo en Actions | Secretos del repositorio |

Ninguna clave secreta (service_role de Supabase, secret de PayPal, tokens de GitHub) debe aparecer jamás en archivos HTML/JS servidos al navegador. Las claves secretas solo viven como secrets de GitHub Actions o en el panel de cada proveedor.

### Logo.dev

logo.dev se utiliza para resolver dinámicamente el logotipo de cada empresa del mercado a partir de su nombre o dominio, evitando mantener manualmente los archivos de imagen en Base/assets/logos/.

#### Configuración

```javascript
window.LOGODEV_API_KEY = '<clave-publica-logodev>';
```
Declara la clave junto a la configuración de Supabase en Base/index.html.
Las peticiones se construyen normalmente como https://img.logo.dev/<dominio>?token=<clave-publica-logodev>.
Usa el token público (pk_...) de logo.dev; este tipo de clave está pensado para exponerse en el cliente, pero igualmente debe configurarse con restricciones de dominio desde el panel de logo.dev para evitar abuso desde otros sitios.
Si logo.dev no responde o el dominio no tiene logo disponible, la interfaz debe recurrir a un logotipo local de respaldo en Base/assets/logos/ en lugar de dejar un espacio roto.

#### Dónde se integra

La función encargada de renderizar cada empresa en Base/js/core/app.js debe construir la URL del logotipo y aplicar el fallback local.
Los datos base de cada empresa (nombre, dominio si aplica) se mantienen en Base/js/data/gameData.js.
### PayPal Developer

PayPal se utiliza para procesar pagos reales o simulados asociados a funciones del juego (por ejemplo, compras dentro de la aplicación o suscripciones), a través del SDK de JavaScript de PayPal cargado por CDN.

#### Configuración

```javascript
window.PAYPAL_CLIENT_ID = '<client-id-paypal>';
```
El Client ID se obtiene desde el panel de PayPal Developer y se declara junto a las demás variables públicas en Base/index.html.
Usa un Client ID de entorno Sandbox durante el desarrollo y pruebas, y el Client ID de Live únicamente en producción. Nunca mezcles ambos entornos en el mismo despliegue.
El SDK se importa normalmente así:
```html
<script src="https://www.paypal.com/sdk/js?client-id=<client-id-paypal>&currency=USD"></script>
```
El Client ID es público por diseño (equivalente a la anon key de Supabase), pero cualquier confirmación de pago debe validarse también contra la API de PayPal antes de acreditar el resultado en save_data; nunca confíes únicamente en el evento del frontend.
El Client Secret de PayPal no se usa en el frontend. Si en el futuro se necesita verificar pagos desde un backend, ese secret debe vivir en un servicio propio o en una función serverless, nunca en Base/.

#### Dónde se integra

La lógica de botones de pago y confirmación de compra se ubica junto al resto de flujos financieros en Base/js/core/app.js.
El registro del resultado de la transacción (éxito, monto, fecha) se guarda como parte del historial dentro de save_data, siguiendo el mismo patrón que el resto de operaciones financieras del juego.
## Repositorio de GitHub

El código fuente se aloja en GitHub y sirve como única fuente de verdad del proyecto.

### Buenas prácticas de trabajo

Usa una rama principal estable (main) y ramas de trabajo por función o corrección (feature/..., fix/...).
No subas nunca archivos .env ni claves secretas al repositorio; usa .gitignore para excluir configuraciones locales sensibles.
Las claves públicas (Supabase anon, logo.dev, PayPal Client ID) pueden vivir en el código porque están diseñadas para exponerse en el cliente; aun así, evita hardcodearlas repetidas veces y mantenlas centralizadas en Base/index.html.
Los secrets usados por GitHub Actions (por ejemplo, tokens de despliegue) se configuran en Settings > Secrets and variables > Actions del repositorio, nunca en el código.
Antes de fusionar cambios a main, verifica manualmente el flujo descrito en Verificación de cambios, ya que el proyecto no cuenta con pruebas automatizadas.
## Despliegue con GitHub Pages

La aplicación, al ser un frontend 100% estático, se despliega directamente con GitHub Pages, sin necesidad de servidor propio.

### Configuración inicial
En GitHub, entra a Settings > Pages del repositorio.
Selecciona la fuente de despliegue:
Deploy from a branch, apuntando a la rama main y la carpeta /Base (o / si Base se promueve a raíz del build de despliegue), o
GitHub Actions, si se usa un flujo de trabajo personalizado (recomendado si se necesita algún paso de build o de sustitución de variables antes de publicar).
GitHub Pages sirve la aplicación mediante HTTPS automáticamente en una URL del tipo:
```text
https://<usuario>.github.io/<repositorio>/
```

o en un dominio propio si se configura un CNAME.

### Flujo de trabajo con GitHub Actions (recomendado)

Un flujo típico en .github/workflows/deploy.yml publica el contenido de Base/ cada vez que se actualiza main:

```yaml
name: Deploy a GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: Base
      - uses: actions/deploy-pages@v4
    ```
### Puntos importantes al desplegar en GitHub Pages

* **Redirect URLs de Supabase:** agrega la URL final en `Authentication > URL Configuration > Redirect URLs`.
* **Rutas relativas:** revisa que `css/`, `js/` y `assets/` funcionen bajo la subruta del repositorio.
* **Logo.dev:** actualiza los dominios permitidos para incluir GitHub Pages.
* **PayPal:** confirma que el Client ID de producción corresponde a Live.
* **Caché PWA:** verifica que `Base/sw.js` invalide la caché anterior.
* GitHub Pages no ejecuta código de servidor ni reemplaza un backend para validar pagos.

## Persistencia de datos

Supabase es el sistema principal de persistencia del proyecto.

El archivo:

```text
Base/js/services/db.js
```

se encarga de gestionar la comunicación con Supabase y las operaciones relacionadas con los datos del usuario.

Los datos importantes del juego, como:

Usuarios.
Progreso.
Capital.
Inversiones.
Portafolio.
Habilidades.
Reputación.
Logros.
Configuración del usuario.

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

La aplicación usa únicamente la tabla users y el campo users.save_data para guardar las cuentas y el progreso. La configuración de Supabase se administra directamente desde el panel del proyecto.

El registro normal requiere usuario y contraseña; ambos se guardan en la tabla users. Google continúa usando OAuth y permite elegir el nombre de usuario en la configuración inicial.

La aplicación debe utilizar únicamente la clave pública anon de Supabase en el frontend. Nunca debe incluirse una clave secreta como service_role dentro de index.html o de archivos JavaScript que se ejecuten en el navegador.

### Inicio de sesión con Google

En el panel de Supabase, activa Authentication > Providers > Google y configura las credenciales OAuth del proyecto de Google. Añade la URL pública de la aplicación en Authentication > URL Configuration > Redirect URLs; el código la utiliza automáticamente como retorno después de la autenticación.

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

La configuración .vscode/launch.json inicia un servidor HTTP local con el módulo integrado de Python. El servidor no almacena el progreso del jugador; su única función es servir los archivos de la aplicación.

Al presionar F5, se inicia el servidor y se abre http://127.0.0.1:8000/. También puede ejecutarse manualmente desde la raíz:

```powershell
py -3 -m http.server 8000 --directory "Base"
```

Para comprobar recursos estáticos, la aplicación debe abrirse mediante HTTP y no directamente con file:///.

La aplicación se conecta posteriormente con Supabase, logo.dev y PayPal para autenticar usuarios, guardar información, mostrar logotipos y procesar pagos.

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
                ├──────────────┬──────────────┐
                ▼              ▼              ▼
             Supabase       logo.dev        PayPal
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
El proyecto está diseñado como una simulación educativa de decisiones financieras.
Supabase es la fuente principal de datos del juego.
El servidor Python solamente sirve la aplicación durante el desarrollo.
El progreso del usuario debe permanecer sincronizado con Supabase.
Para modificar la conexión o las consultas de la base de datos, revisa Base/js/services/db.js.
Para modificar empresas, sectores o parámetros del mercado, revisa Base/js/data/gameData.js.
Para modificar la apariencia, revisa Base/css/styles.css.
Para modificar la obtención de logotipos, revisa la integración de logo.dev en Base/js/core/app.js.
Para modificar el flujo de pagos, revisa la integración de PayPal en Base/js/core/app.js.
## Arquitectura

La aplicación es un frontend estático: no utiliza bundler, servidor de API propio ni proceso de compilación. El navegador carga las páginas HTML, ejecuta los módulos JavaScript y se comunica directamente con Supabase, logo.dev y PayPal.

```text
Navegador
        ├── login.html / registro.html  Autenticación
        └── index.html                  Interfaz autenticada
                                ├── js/core/app.js        Estado, reglas y eventos del juego
                                ├── js/services/db.js     Cliente y persistencia en Supabase
                                ├── js/data/gameData.js   Sectores, empresas y precios
                                └── css/styles.css        Estilos y diseño responsive
```

El servidor local solamente entrega archivos. El progreso se guarda en Supabase. En producción, GitHub Pages cumple ese mismo rol de servidor de archivos estáticos.

## Responsabilidad de los módulos
### `Base/index.html`

Contiene el shell de la aplicación, los paneles, formularios y modales. Las vistas principales se muestran u ocultan desde el menú lateral. También declara la configuración pública de Supabase, logo.dev y PayPal, y carga las dependencias CDN, como Chart.js y el SDK de PayPal.

### `Base/js/core/app.js`

Es el controlador principal. Gestiona la sesión, el estado financiero, inversiones, portafolio, gráficas, asesores, habilidades, reputación, desafíos, bancos, tarjetas, transferencias, perfil, ajustes, amigos, ranking, proyectos cooperativos, notificaciones, temporizadores, guardado, logotipos vía logo.dev y pagos vía PayPal.

Antes de crear una función nueva, localiza el controlador del módulo relacionado y conserva su patrón de actualización de interfaz y persistencia.

### `Base/js/services/db.js`

Define BackendDB, que centraliza la comunicación con Supabase. Sus responsabilidades incluyen crear usuarios, iniciar sesión, trabajar con Google OAuth, consultar perfiles y guardar el objeto de progreso.

Las consultas nuevas deben incorporarse preferentemente a este servicio para evitar que la interfaz mantenga accesos directos dispersos al backend.

### `Base/js/data/gameData.js`

Define CATEGORIAS y los datos estáticos del mercado. Cada sector incluye nivel, color, volatilidad, ingreso base, crecimiento, costo de mejora y empresas. Cada empresa conserva n como nombre y p como precio inicial.

### `Base/css/styles.css`

Contiene variables visuales, layout, tablas, formularios, modales y reglas responsive. Los estilos generales deben añadirse aquí en lugar de acumular nuevos estilos inline.

## Modelo de datos

La tabla principal de Supabase es users y utiliza, como mínimo, estos campos:

username: nombre de usuario normalizado en minúsculas.
password_hash: hash del acceso tradicional.
save_data: objeto JSON con el perfil y el progreso.
created_at: fecha de creación.
updated_at: fecha de última modificación.

Dentro de save_data se almacenan capital, experiencia, nivel, deuda, portafolio, habilidades, reputación, logros, historial, tarjeta, preferencias, plan, mascota, amigos y proyectos cooperativos. Cualquier campo nuevo debe tener un valor predeterminado para no romper cuentas existentes.

El identificador de sesión del frontend se guarda temporalmente en sessionStorage con la clave imperio_session_token.

## Configuración de variables públicas

Las páginas HTML utilizan estas variables públicas, todas declaradas juntas para facilitar su mantenimiento:

```javascript
// Supabase
window.SUPABASE_URL = 'https://<proyecto>.supabase.co';
window.SUPABASE_ANON_KEY = '<clave-publica-anon>';

// logo.dev
window.LOGODEV_API_KEY = '<clave-publica-logodev>';

// PayPal
window.PAYPAL_CLIENT_ID = '<client-id-paypal>';
```

Para habilitar Google, configura Authentication > Providers > Google y agrega la URL pública en Authentication > URL Configuration > Redirect URLs.

### Seguridad
Nunca incluyas una clave service_role de Supabase, un Client Secret de PayPal, ni un token de GitHub en HTML o JavaScript del navegador.
Configura políticas RLS en Supabase para limitar los datos a los usuarios autorizados.
Restringe la clave de logo.dev por dominio desde su panel de control.
Usa siempre el entorno Sandbox de PayPal en desarrollo y valida cualquier transacción crítica también del lado de un backend o función serverless antes de darla por confirmada.
Valida montos, usuarios e identificadores antes de enviarlos al backend.
Mantén las confirmaciones para ventas, transferencias, pagos y eliminaciones.
El acceso tradicional actual calcula SHA-256 en el cliente. Para producción se recomienda migrar las contraseñas a Supabase Auth o a un backend con Argon2id, scrypt o bcrypt.
Guarda cualquier secret real (tokens de despliegue, futuras integraciones de backend) exclusivamente en GitHub Secrets, nunca en el repositorio ni en archivos servidos al navegador.
## Flujo de ejecución
El navegador carga login.html o registro.html.
db.js inicializa el cliente de Supabase.
Tras autenticarse, el usuario entra en index.html.
app.js recupera el progreso e inicializa menús, mercado, gráficas, temporizadores y logotipos vía logo.dev.
Las acciones modifican el estado en memoria, actualizan la interfaz y llaman a las funciones de guardado.
Los pagos, cuando aplica, se procesan mediante el SDK de PayPal y su resultado se refleja en save_data.
Supabase conserva el progreso para la siguiente sesión.
## Incorporar una función
Define los datos iniciales y sus valores predeterminados.
Añade el panel o control necesario en index.html.
Implementa el comportamiento en app.js.
Añade la operación de persistencia en db.js si es necesaria.
Si la función depende de logo.dev o PayPal, declara la configuración necesaria junto a las demás variables públicas.
Actualiza la carga de datos para cuentas antiguas.
Incluye estados de carga, error, vacío y confirmación.
Comprueba que se actualizan capital, experiencia, historial y estadísticas.
Documenta la función en el manual de usuario y en docs/actualizaciones.
## PWA y caché

Base/sw.js gestiona la caché y Base/json/manifest.webmanifest define la aplicación instalable. Cuando cambies un recurso:

Revisa la lista de archivos precargados por el Service Worker.
Actualiza las versiones de las URLs si es necesario invalidar caché.
Prueba una carga normal y una recarga completa.
Comprueba que la aplicación instalada recibe la versión nueva.
Tras desplegar en GitHub Pages, confirma que la versión nueva se sirve también en el sitio publicado, no solo en local.
## Verificación de cambios

No existe actualmente una suite automatizada de pruebas. Antes de entregar una modificación, ejecuta el servidor y comprueba manualmente:

Registro, inicio de sesión y cierre de sesión.
Recuperación y guardado del progreso.
Compra, venta y actualización del portafolio.
Carga correcta de logotipos vía logo.dev, incluyendo el caso de fallback local.
Flujo de pago de PayPal en entorno Sandbox, incluyendo cancelación y error.
Apertura, confirmación y cancelación de modales.
Cambios de perfil y configuración después de recargar.
Funcionamiento de las vistas principales en escritorio y móvil.
Ausencia de errores nuevos en la consola del navegador.

Usa una cuenta de prueba para operaciones financieras y cambios de autenticación, y el entorno Sandbox de PayPal para cualquier prueba de pago.

## Diagnóstico
### La página no carga

Verifica que el servidor se ejecuta desde la raíz del proyecto y publica la carpeta Base. No abras la aplicación con file:///. En producción, verifica el estado del despliegue en Settings > Pages del repositorio de GitHub.

### Supabase no está disponible

Comprueba la carga del SDK, las variables SUPABASE_URL y SUPABASE_ANON_KEY, la conexión a Internet y las políticas RLS.

### Los logotipos no cargan (Logo.dev)

Comprueba LOGODEV_API_KEY, la restricción de dominio configurada en el panel de logo.dev (debe incluir la URL de GitHub Pages en producción) y que la interfaz aplique correctamente el logotipo de respaldo local.

### Los pagos fallan (PayPal)

Comprueba PAYPAL_CLIENT_ID, que el entorno (Sandbox/Live) coincida con el resto de la configuración, la consola del navegador para errores del SDK, y el estado de la transacción desde el panel de PayPal Developer.

### El progreso desaparece

Revisa la consola, la respuesta de actualización de users.save_data, la sesión activa y el campo updated_at.

### No aparecen cambios visuales

Limpia la caché, revisa las versiones de recursos enlazados, actualiza el Service Worker y confirma que el despliegue en GitHub Pages corresponde al último commit de main.

## Despliegue

El despliegue se realiza publicando la carpeta Base mediante GitHub Pages (ver la sección Despliegue con GitHub Pages para el procedimiento detallado). Antes de publicar:

Usa la configuración correcta de Supabase, logo.dev y PayPal para el entorno de producción.
Revisa las políticas RLS de Supabase.
Elimina cualquier secreto del frontend; confirma que solo existan claves públicas/restringidas.
Prueba autenticación, guardado, OAuth, cierre de sesión, carga de logotipos, un pago de prueba y actualización de caché.
Verifica que la URL final de GitHub Pages esté registrada en las Redirect URLs de Supabase y en las restricciones de dominio de logo.dev.