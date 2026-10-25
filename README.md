# Imperio de Negocios

Este repositorio contiene el código, los recursos y la documentación de la aplicación web Imperio de Negocios, un simulador de gestión financiera y estrategia empresarial.

## Descripción

El juego permite al usuario:

- gestionar capital y decisiones de inversión
- comprar y vender activos
- controlar un portafolio
- desarrollar habilidades, logros y reputación
- interactuar con amigos y proyectos cooperativos
- guardar el progreso y la configuración en Supabase

## Inicio rápido

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Ejecuta un servidor local desde la raíz:

```powershell
py -m http.server 8000
```

3. Abre esta URL en el navegador:

```text
http://127.0.0.1:8000/
```

La página raíz redirige automáticamente a la pantalla de acceso principal de la app.

## Estructura del repositorio

```text
Imperio de Negocios/
├── index.html
├── server.js
├── README.md
├── Base/
│   ├── index.html
│   ├── login.html
│   ├── registro.html
│   ├── css/
│   ├── js/
│   ├── json/
│   ├── assets/
│   ├── noticias/
│   └── docs/
├── Manuales/
├── .vscode/
└── desktop.ini
```

## Documentación

- [Base/docs/README.md](Base/docs/README.md)
- [Base/docs/actualizaciones](Base/docs/actualizaciones)
- [Base/docs/Manual de usuario.md](Base/docs/Manual%20de%20usuario.md)
- [Base/docs/Manual de Programador.md](Base/docs/Manual%20de%20Programador.md)
- [Base/noticias/README.md](Base/noticias/README.md)

## Arquitectura general

La aplicación se compone de una interfaz estática en HTML, CSS y JavaScript, con lógica principal en:

- `Base/index.html`
- `Base/js/core/app.js`
- `Base/js/services/db.js`
- `Base/js/data/gameData.js`

La persistencia del juego se lleva a cabo con Supabase, y la conexión se configura desde el frontend con las variables de entorno del proyecto.

## Recomendaciones de mantenimiento

- mantener la documentación actualizada cuando cambie la lógica del juego
- separar cambios funcionales de cambios visuales o de contenido
- revisar periódicamente los archivos de noticias y actualizaciones para no dejar documentos duplicados o desordenados

## Notas

Este proyecto está pensado como simulación abierta de decisiones financieras y empresariales. La estructura se ha organizado para mantener una base clara de trabajo, documentación y contenido complementario.
