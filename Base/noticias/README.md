# Carpeta de Noticias

Esta carpeta contiene las noticias locales del simulador, separadas por sector y empresa. Los archivos son la fuente editable del contenido que aparece en la sección **Noticias** y que influye en el comportamiento de los precios.

## Sectores

Cada sector definido en `js/data/gameData.js` debe tener un archivo `.md` con el mismo nombre:

- `Finanzas.md`
- `Tecnologia.md`
- `Bebidas.md`
- `Energia.md`
- `Salud.md`
- `Alimentacion.md`
- `Automotriz.md`
- `Consumo.md`
- `E-Commerce.md`
- `Gaming.md`
- `Criptomonedas.md`
- `Entretenimiento.md`
- `Logistica.md`
- `Seguros.md`
- `Agricultura.md`
- `Construccion.md`
- `Fintech.md`
- `Moda.md`
- `Quimica.md`
- `Textil.md`
- `Aeroespacial.md`
- `Biotecnologia.md`
- `Educacion.md`
- `Telecomunicaciones.md`
- `Turismo.md`
- `Defensa.md`
- `Mineria.md`
- `Real Estate.md`
- `Retail.md`
- `IA.md`

## Formato de cada archivo

Cada empresa debe utilizar esta estructura:

```markdown
## Nombre de la empresa

### Positivas

1. Noticia favorable específica de la empresa.
2. Otra noticia favorable diferente.

### Negativas

1. Riesgo o problema específico de la empresa.
2. Otro riesgo diferente.
```

El cargador reconoce encabezados `##` para empresas, encabezados `### Positivas` y `### Negativas`, y listas numeradas con `1.` o `1)`.

## Reglas de contenido

- Escribir noticias relacionadas con la actividad real de cada empresa.
- Evitar cambiar únicamente el nombre dentro de una plantilla repetida.
- Combinar resultados, contratos, productos, regulación, competencia, costos y riesgos operativos.
- Mantener separadas las noticias positivas y negativas.
- No repetir el mismo texto dentro de una empresa.
- Usar exactamente el nombre de la empresa definido en `gameData.js`.
- Mantener las noticias en español y con suficiente detalle para que resulten informativas.

## Integración con la aplicación

`js/core/app.js` carga automáticamente los archivos de esta carpeta mediante `fetch`. Las noticias se registran por empresa y se utilizan para:

- mostrar titulares y detalles en el canal de noticias
- aplicar impactos positivos o negativos
- modificar temporalmente el impulso del sector
- influir en la variación de precios
- alimentar el análisis local de los asesores

Si un archivo no está disponible, la aplicación conserva el contenido interno de respaldo cuando existe. En GitHub Pages debe publicarse también la carpeta `Base/noticias`.

## Agregar un sector nuevo

1. Añadir el sector y sus empresas en `js/data/gameData.js`.
2. Crear `noticias/NombreDelSector.md` con el nombre exacto del sector.
3. Añadir un bloque para cada empresa.
4. Incluir noticias positivas y negativas distintas.
5. Comprobar que el archivo se publique junto con `index.html`.

No es necesario editar `app.js` para cada sector: el cargador obtiene los nombres directamente de `CATEGORIAS`.
