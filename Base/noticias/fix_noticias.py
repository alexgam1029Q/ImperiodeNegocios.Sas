import random
import re
from pathlib import Path

ROOT = Path("c:/Users/alexg/Documents/Proyectos/Imperio de Negocios/Base/noticias")
GAME_DATA = ROOT.parent / "js" / "data" / "gameData.js"

INDUSTRY_FACTS = {
    "Aeroespacial": {"focus": "satélites, cohetes y sensores", "gain": "lanzamientos, conectividad y observación remota", "stack": "ingeniería aeroespacial y control de calidad", "risk": "pruebas de vuelo, certificación y materiales especializados", "market": "mercados institucionales y defensa", "supply": "cadenas de producción aeroespacial"},
    "Agricultura": {"focus": "cultivos, logística agrícola y riego", "gain": "rendimiento agrícola y trazabilidad de la cadena", "stack": "agrotecnología y monitoreo de campo", "risk": "clima, fertilizantes y costos logísticos rurales", "market": "agroexportación y retail alimentario", "supply": "sistemas agrícolas y almacenamiento"},
    "Alimentacion": {"focus": "ingredientes, procesamiento y distribución de alimentos", "gain": "eficiencia operativa y menor desperdicio", "stack": "automatización de planta y trazabilidad", "risk": "materias primas, precios y cumplimiento sanitario", "market": "retail masivo y exportación alimentaria", "supply": "cadenas de frío y distribución"},
    "Automotriz": {"focus": "EV, semiconductores y cadena automotriz", "gain": "desarrollo eléctrico, eficiencia y cuota de mercado", "stack": "electrificación, software y manufactura inteligente", "risk": "chips, baterías y costos de producción", "market": "mercados premium y de volumen", "supply": "sistemas de batería y logística industrial"},
    "Bebidas": {"focus": "insumos, envases y distribución de consumo", "gain": "mix premium, low sugar y canales de retail", "stack": "automatización de logística y trazabilidad", "risk": "materias primas, transporte y presión regulatoria", "market": "retail, horeca y exportación", "supply": "redes de distribución y cadenas de frío"},
    "Biotecnologia": {"focus": "investigación, biofabricación y ensayos clínicos", "gain": "aprobaciones regulatorias y escalamiento comercial", "stack": "bioprocesos, datos genómicos y laboratorio digital", "risk": "ensayos, cumplimiento y costos de I+D", "market": "farmacias, hospitales y biofarmacéutica", "supply": "cadenas de producción y validación clínica"},
    "Construccion": {"focus": "materiales, obra civil y energías limpias", "gain": "infraestructura, productividad y rentabilidad de proyecto", "stack": "digital twin, BIM y automatización de obra", "risk": "precios de materiales, permisos y ejecución", "market": "infraestructura pública y privada", "supply": "proveedores, logística y planificación de obra"},
    "Consumo": {"focus": "productos masivos, branding y retail", "gain": "venta repetida, mix premium y digitalización", "stack": "CRM, omnicanal y analítica de demanda", "risk": "inflación, promociones y presión de precios", "market": "retail, e-commerce y consumo urbano", "supply": "inventario, retail y distribución local"},
    "Criptomonedas": {"focus": "blockchain, stablecoins y wallets", "gain": "adopción institucional, liquidez y tokenización", "stack": "infraestructura on-chain, seguridad y compliance", "risk": "volatilidad, regulación y ciberseguridad", "market": "fintech, trading y treasury digital", "supply": "validación, nodos y infraestructura blockchain"},
    "Defensa": {"focus": "equipos, sensores y sistemas militares", "gain": "contratos públicos, modernización y capacidad operativa", "stack": "ciberseguridad, integración de sistemas y mantenimiento", "risk": "regulación, costos de producción y cadenas críticas", "market": "gobiernos y aliados estratégicos", "supply": "proveedores especializados y logística militar"},
    "E-Commerce": {"focus": "logística, marketplace y experiencia digital", "gain": "ventas transaccionales, retención y mejor CAC", "stack": "comercio digital, IA y gestión de inventarios", "risk": "comisión, logística y competencia online", "market": "consumo digital y comercio omnicanal", "supply": "fulfillment, pagos y logística último milla"},
    "Educacion": {"focus": "plataformas, LMS y contenido digital", "gain": "matrícula, retención y aprendizaje híbrido", "stack": "edtech, IA y analítica de rendimiento", "risk": "adopción, regulación y retención de usuarios", "market": "escuelas, universidades y corporativos", "supply": "contenido, infraestructura y soporte docente"},
    "Energia": {"focus": "energías renovables, almacenamiento y red eléctrica", "gain": "descarbonización, generación y eficiencia energética", "stack": "grid digital, baterías y optimización de flujo", "risk": "capex, regulación y costos de infraestructura", "market": "industria, retail y grandes usuarios", "supply": "interconexión, distribución y almacenamiento"},
    "Entretenimiento": {"focus": "streaming, contenido y experiencia digital", "gain": "audiencia, engagement y monetización", "stack": "plataformas, personalización y producción digital", "risk": "licencias, competencia y atención fragmentada", "market": "streaming, gaming y cultura digital", "supply": "contenido, distribución y monetización"},
    "Finanzas": {"focus": "pagos, riesgo crediticio y tesorería", "gain": "margen financiero, liquidez y cobertura de riesgo", "stack": "data, automatización y gestión de cartera", "risk": "volatilidad, crédito y regulación", "market": "banca, seguros y inversión institucional", "supply": "infraestructura financiera y cumplimiento"},
    "Fintech": {"focus": "pagos, fintech lending y infraestructura bancaria", "gain": "captura de clientes, crecimiento de volumen y eficiencia", "stack": "API, analytics y compliance digital", "risk": "fraud, regulación y presión competitiva", "market": "SMB, pagos y banca digital", "supply": "servicios de pago y orquestación financiera"},
    "Gaming": {"focus": "live ops, monetización y comunidad gamer", "gain": "retención, engagement y ventas digitales", "stack": "cloud gaming, analytics y backend en vivo", "risk": "retención, monetización y competencia de contenido", "market": "mobile, esports y plataformas de distribución", "supply": "infraestructura, monetización y soporte en vivo"},
    "IA": {"focus": "modelos, infraestructura de IA y datos", "gain": "automatización, productividad y adopción empresarial", "stack": "training, fine-tuning y inferencia escalable", "risk": "costos de compute, regulación y calidad de datos", "market": "empresas y software verticales", "supply": "chips, nube y pipelines de datos"},
    "Logistica": {"focus": "transporte, warehousing y última milla", "gain": "operación eficiente, ruta óptima y visibilidad", "stack": "supply chain digital y optimización de rutas", "risk": "fletes, congestión y cumplimiento aduanero", "market": "retail, industria y comercio internacional", "supply": "transportistas, almacenes y coordinación digital"},
    "Mineria": {"focus": "extracción, metales y eficiencia operativa", "gain": "producción y recuperación de valor mineral", "stack": "automatización, sensores y proceso industrial", "risk": "precios, seguridad y costos ambientales", "market": "metalurgia, energía y fabricación", "supply": "procesamiento, transporte y abastecimiento crítico"},
    "Moda": {"focus": "diseño, tendencias y retail premium", "gain": "marca, relevancia y conversion en canales digitales", "stack": "diseño asistido, CRM y merchandising digital", "risk": "temporada, inventario y tendencias cambiantes", "market": "luxury, retail y omnicanal", "supply": "diseño, producción y distribución global"},
    "Quimica": {"focus": "materias primas, procesos y sostenibilidad", "gain": "eficiencia industrial y mezcla de productos", "stack": "automatización y gestión de procesos", "risk": "precio de insumos, regulación y seguridad industrial", "market": "manufactura, agricultura y energía", "supply": "materias primas y logística especializada"},
    "Real Estate": {"focus": "desarrollo, finanzas inmobiliarias y gestión de activos", "gain": "valor de activos, ocupación y flujo de caja", "stack": "data inmobiliaria, gestión de portafolio y experiencia digital", "risk": "tasas, arbitraje y demanda residencial", "market": "urbano, comercial y residencial", "supply": "desarrollo, construcción y financiamiento"},
    "Retail": {"focus": "ventas, merchandising y experiencia de cliente", "gain": "retención, ticket promedio y omnicanalidad", "stack": "analytics, CRM y distribución inteligente", "risk": "margen, competencia y consumo sensible al precio", "market": "retail físico y digital", "supply": "inventario, logística y operaciones tienda"},
    "Salud": {"focus": "pacientes, diagnóstico y dispositivos médicos", "gain": "calidad de atención, acceso y eficiencia clínica", "stack": "digital health, IA y gestión clínica", "risk": "regulación, costos y adopción de sistemas", "market": "hospitales, clínicas y farmacéutica", "supply": "insumos, diagnóstico y atención médica"},
    "Seguros": {"focus": "riesgos, underwriting y gestión de cartera", "gain": "margen, retención y digitalización de procesos", "stack": "data, IA y experiencia digital del cliente", "risk": "siniestralidad, regulación y volatilidad actuarial", "market": "personas, pyme y riesgos corporativos", "supply": "análisis de riesgo y distribución de pólizas"},
    "Tecnologia": {"focus": "software, cloud y ciberseguridad", "gain": "escalabilidad, SaaS y adopción empresarial", "stack": "plataformas, observabilidad y automatización", "risk": "competencia, costos de infraestructura y seguridad", "market": "empresas, nube y software vertical", "supply": "infraestructura cloud, seguridad y soporte"},
    "Telecomunicaciones": {"focus": "redes, conectividad y fibra", "gain": "cobertura, ancho de banda y calidad de servicio", "stack": "redes 5G, IA operativa y automatización", "risk": "capex de red, competencia y regulación", "market": "broadband, enterprise y móvil", "supply": "infraestructura, mantenimiento y conectividad"},
    "Textil": {"focus": "fibra, producción y moda sostenible", "gain": "eficiencia, trazabilidad y menor desperdicio", "stack": "procesamiento digital y abastecimiento responsable", "risk": "costos de insumos, ritmos de producción y moda", "market": "retail, exportación y marcas premium", "supply": "hilados, tintes y cadena de fabricación"},
    "Turismo": {"focus": "hospitalidad, viajes y experiencia local", "gain": "ocupación, ticket promedio y experiencia del cliente", "stack": "CRM, distribución digital y gestión operativa", "risk": "temporadas, geopolítica y costos operativos", "market": "viajes de ocio, business y regional", "supply": "hoteles, transporte y servicios turísticos"},
}

DEFAULT_FACTS = {"focus": "innovación y operación comercial", "gain": "expansión, rentabilidad y cuota de mercado", "stack": "automatización y analítica", "risk": "costos operativos y competencia", "market": "mercados regionales", "supply": "cadena de suministro y operación"}


def sector_facts(category: str):
    return INDUSTRY_FACTS.get(category, DEFAULT_FACTS)


def extract_companies(text: str):
    matches = re.findall(r"^##\s+(.+?)(?=###|\r?\n|$)", text, re.M)
    return list(dict.fromkeys(company.strip() for company in matches if company.strip()))


def load_game_companies():
    if not GAME_DATA.exists():
        return {}
    source = GAME_DATA.read_text(encoding="utf-8")
    categories = re.findall(r'"([^"]+)":\s*\{.*?empresas:\s*\[(.*?)\]\s*\n\s*\}', source, re.S)
    return {
        category: list(dict.fromkeys(re.findall(r'\{n:"([^"]+)"', companies)))
        for category, companies in categories
    }


def generate_news(company: str, category: str):
    facts = sector_facts(category)
    positive_templates = [
        ("Resultados financieros", f"{company} cerró el periodo con una mejora en sus resultados, apoyada por el crecimiento de {facts['market']} y una mayor eficiencia en {facts['supply']}."),
        ("Inversión", f"{company} anunció nuevas inversiones destinadas a fortalecer {facts['focus']}, con mejoras de infraestructura, tecnología y capacidad operativa."),
        ("Expansión", f"{company} prepara una expansión hacia nuevos mercados vinculados con {facts['market']}, buscando diversificar sus ingresos."),
        ("Tecnología", f"{company} incorporó soluciones de {facts['stack']} para automatizar procesos, analizar información y mejorar decisiones."),
        ("Producto", f"{company} presentó una nueva oferta relacionada con {facts['focus']}, diseñada para responder a cambios en la demanda."),
        ("Clientes", f"{company} consiguió nuevos clientes en {facts['market']}, fortaleciendo su cartera comercial y sus oportunidades de crecimiento."),
        ("Alianza", f"{company} estableció una alianza estratégica para desarrollar soluciones relacionadas con {facts['focus']} y ampliar su alcance."),
        ("Producción", f"{company} aumentó su capacidad y mejoró procesos relacionados con {facts['focus']}, permitiendo atender una mayor demanda."),
        ("Logística", f"{company} optimizó su cadena de suministro mediante nuevos sistemas de planificación y seguimiento de {facts['supply']}."),
        ("Regulación", f"{company} avanzó en sus procesos de cumplimiento vinculados con {facts['focus']}, facilitando nuevas oportunidades comerciales."),
        ("Competencia", f"{company} ganó participación frente a competidores gracias a una propuesta más competitiva en {facts['market']}."),
        ("Investigación", f"{company} incrementó su investigación y desarrollo para encontrar nuevas aplicaciones comerciales en {facts['focus']}."),
        ("Sostenibilidad", f"{company} presentó medidas para reducir el impacto ambiental de sus operaciones y mejorar la eficiencia en {facts['supply']}."),
        ("Ciberseguridad", f"{company} reforzó sus sistemas de seguridad digital para proteger información crítica y asegurar la continuidad operativa."),
        ("Estrategia", f"{company} presentó una estrategia enfocada en {facts['gain']}, con prioridad en crecimiento, eficiencia y expansión comercial."),
    ]
    negative_templates = [
        ("Resultados financieros", f"{company} registró presión sobre sus resultados debido al aumento de {facts['risk']}, afectando sus expectativas financieras."),
        ("Inversión", f"{company} revisó a la baja inversiones previstas por mayores costos relacionados con {facts['risk']} y un entorno incierto."),
        ("Expansión", f"{company} retrasó parte de su expansión por dificultades en {facts['supply']} y menor visibilidad sobre la demanda."),
        ("Tecnología", f"{company} enfrenta dificultades para integrar herramientas en áreas relacionadas con {facts['focus']}, aumentando los tiempos de implementación."),
        ("Producto", f"{company} revisó parte de su oferta tras una respuesta inferior a la esperada en segmentos de {facts['market']}."),
        ("Clientes", f"{company} experimentó una reducción de pedidos provenientes de {facts['market']}, obligando a ajustar sus previsiones."),
        ("Producción", f"{company} enfrentó interrupciones en operaciones relacionadas con {facts['supply']}, provocando retrasos y mayores costos."),
        ("Logística", f"Los problemas en {facts['supply']} generaron retrasos para {company}, elevando el transporte y reduciendo su capacidad de respuesta."),
        ("Regulación", f"Nuevos requisitos regulatorios sobre {facts['focus']} obligaron a {company} a aumentar gastos de cumplimiento."),
        ("Competencia", f"La competencia aumentó en {facts['market']}, presionando precios y obligando a {company} a revisar su estrategia."),
        ("Investigación", f"Un proyecto de investigación de {company} sufrió retrasos por mayores costos, dificultades técnicas y validaciones adicionales."),
        ("Sostenibilidad", f"{company} enfrenta mayores costos para adaptar sus operaciones a exigencias ambientales relacionadas con {facts['focus']}."),
        ("Ciberseguridad", f"{company} tuvo que reforzar controles digitales después de detectar vulnerabilidades en sistemas relacionados con {facts['focus']}."),
        ("Precios", f"La presión sobre los precios en {facts['market']} redujo los márgenes de {company} y aumentó la necesidad de controlar costos."),
        ("Deuda", f"{company} enfrenta mayor presión financiera por el costo de la deuda y las necesidades de capital vinculadas con {facts['focus']}."),
    ]
    random.shuffle(positive_templates)
    random.shuffle(negative_templates)
    positives = [f"**{kind}:** {text}" for kind, text in positive_templates[:10]]
    negatives = [f"**{kind}:** {text}" for kind, text in negative_templates[:10]]
    return positives, negatives


game_companies = load_game_companies()

for path in sorted(ROOT.glob("*.md")):
    if path.name == "README.md":
        continue
    text = path.read_text(encoding="utf-8")
    companies = game_companies.get(path.stem, extract_companies(text))
    if not companies:
        continue

    category = path.stem
    lines = [f"# Noticias {category}"]
    for company in companies:
        heading = f"## {company}"
        pos_list, neg_list = generate_news(company, category)
        lines.append("")
        lines.append(heading)
        lines.append("")
        lines.append("### Positivas")
        for i, item in enumerate(pos_list, start=1):
            lines.append(f"{i}. {item}")
        lines.append("")
        lines.append("### Negativas")
        for i, item in enumerate(neg_list, start=1):
            lines.append(f"{i}. {item}")

    path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")

# validation
bad = []
for path in sorted(ROOT.glob("*.md")):
    if path.name == "README.md":
        continue
    text = path.read_text(encoding="utf-8")
    companies = game_companies.get(path.stem, extract_companies(text))
    for company in companies:
        heading = f"## {company}"
        start = text.index(heading)
        next_heading = text.find("\n## ", start + len(heading))
        end = next_heading if next_heading != -1 else len(text)
        section = text[start:end]
        pos_block = section[section.index("### Positivas") + len("### Positivas"): section.index("### Negativas")]
        neg_block = section[section.index("### Negativas") + len("### Negativas"):]
        pos_count = len(re.findall(r"^\d+\. ", pos_block, re.M))
        neg_count = len(re.findall(r"^\d+\. ", neg_block, re.M))
        if pos_count != 10 or neg_count != 10:
            bad.append((path.name, heading, pos_count, neg_count))

print("ARCHIVOS_PROCESADOS=" + str(len(list(ROOT.glob('*.md'))) - 1))
print("ERRORES=" + str(len(bad)))
if bad:
    for item in bad[:5]:
        print(item)
