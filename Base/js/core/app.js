// CATEGORIAS data imported from js/data/gameData.js
// Lista plana de todas las empresas para predicciones
let TODAS_EMPRESAS = [];

// Precio actual y metadatos por empresa
let preciosMercado = {};
let empresaMeta = {};
let sectorBoost = {};
let eventoActivo = null;

// Estado del juego
let capital = 10000, deuda = 0, gananciasTotal = 0, perdidasTotal = 0;
let xp = 0, nivel = 1, totalInv = 0, dividendosTotal = 0;
let usuarioActual = "";
let correoActual = "";
let idPublico = "";
let googleUserId = "";
let usernamePendiente = false;
let googleUsernameElegido = false;
let usernameElegido = false;
let registroEnCurso = false;
let amigos = [];
let solicitudesAmistad = [];
let proyectosCooperativos = [];
const FOTOS_PERFIL_PREDETERMINADAS = Array.from({ length: 10 }, (_, index) => `assets/perfiles/perfil-${String(index + 1).padStart(2, '0')}.png?v=1`);
const getAssetUrl = path => new URL(path, document.baseURI).href;
let usuarioFotoPerfil = "";
let avatarSeleccionado = 0;
let monedaActual = "USD";
let planActual = null;
let planSeleccionado = null;
let planPagoPendiente = null;
let volverAjustesDesdePlanesActivo = false;
let compraDineroPendiente = null;
let mascotaActual = { id: 'toro', nombre: 'Toro', nivel: 1, xp: 0, animo: 'Feliz', vinculo: 0 };
let petScene = null;
let petModel = null;
let petAnimationFrame = null;
const MASCOTAS = [
    { id: 'toro', nombre: 'Toro', emoji: '🐂', especialidad: 'Mercados alcistas', descripcion: 'Impulsa las decisiones cuando el mercado sube.' },
    { id: 'oso', nombre: 'Oso', emoji: '🐻', especialidad: 'Mercados bajistas', descripcion: 'Mantiene la calma durante las caídas del mercado.' },
    { id: 'buho', nombre: 'Búho', emoji: '🦉', especialidad: 'Análisis financiero', descripcion: 'Observa los datos antes de tomar una decisión.' },
    { id: 'zorro', nombre: 'Zorro', emoji: '🦊', especialidad: 'Diversificación', descripcion: 'Encuentra oportunidades entre varios sectores.' },
    { id: 'aguila', nombre: 'Águila', emoji: '🦅', especialidad: 'Tendencias', descripcion: 'Detecta tendencias antes de que sean evidentes.' },
    { id: 'gato', nombre: 'Gato', emoji: '🐈', especialidad: 'Dividendos', descripcion: 'Prefiere ingresos constantes y decisiones pacientes.' },
    { id: 'dragon', nombre: 'Dragón', emoji: '🐉', especialidad: 'Grandes inversiones', descripcion: 'Protege las inversiones ambiciosas de alto valor.' },
    { id: 'robot', nombre: 'Robot', emoji: '🤖', especialidad: 'Tecnología', descripcion: 'Analiza patrones y oportunidades tecnológicas.' },
    { id: 'pinguino', nombre: 'Pingüino', emoji: '🐧', especialidad: 'Ahorro', descripcion: 'Construye capital con disciplina y constancia.' },
    { id: 'pulpo', nombre: 'Pulpo', emoji: '🐙', especialidad: 'Multisector', descripcion: 'Gestiona oportunidades en muchos sectores a la vez.' },
    { id: 'lobo', nombre: 'Lobo', emoji: '🐺', especialidad: 'Estrategia', descripcion: 'Trabaja en equipo y aprovecha los movimientos del mercado.' },
    { id: 'leon', nombre: 'León', emoji: '🦁', especialidad: 'Liderazgo', descripcion: 'Toma decisiones firmes para hacer crecer el imperio.' },
    { id: 'tiburon', nombre: 'Tiburón', emoji: '🦈', especialidad: 'Oportunidades', descripcion: 'Detecta oportunidades antes que los demás inversores.' },
    { id: 'halcon', nombre: 'Halcón', emoji: '🦅', especialidad: 'Precisión', descripcion: 'Observa el mercado y actúa en el momento exacto.' },
    { id: 'serpiente', nombre: 'Serpiente', emoji: '🐍', especialidad: 'Adaptabilidad', descripcion: 'Se adapta rápidamente a los cambios del mercado.' }
];
const PLANES = {
    basico: { nombre: 'Básico', precioCOP: 0, capitalInicial: 10000, multiplicadorXP: 1, clase: 'basic', beneficios: ['Acceso completo al mercado', 'Comprar y vender sin límites', 'Todas las empresas, noticias y eventos', 'Misiones, logros y portafolio'] },
    premium: { nombre: 'Premium', precioCOP: 5000, precioPaypalUSD: 1.25, capitalInicial: 25000, multiplicadorXP: 1.15, clase: 'premium', beneficios: ['Todo lo incluido en Básico', '+15% de experiencia', 'Estadísticas e informes avanzados', 'Recompensas adicionales en misiones'] },
    pro: { nombre: 'Pro', precioCOP: 10000, precioPaypalUSD: 2.50, capitalInicial: 50000, multiplicadorXP: 1.3, clase: 'pro', beneficios: ['Todo lo incluido en Premium', '+30% de experiencia', 'Análisis completo de empresas y sectores', 'Asesores avanzados y recompensas exclusivas'] }
};
const tiposCambio = { USD: 1, COP: 4000, EUR: 0.92, GBP: 0.78, JPY: 157, CNY: 7.18, INR: 86.5, MXN: 19.2, BRL: 5.48, CAD: 1.38, AUD: 1.53, CHF: 0.80, KRW: 1390, RUB: 80, TRY: 41, ZAR: 17.8, SEK: 9.5, NOK: 9.7, PLN: 3.65, AED: 3.67, CLP: 950 };
const precioPlanBase = plan => (plan.precioCOP || 0) / tiposCambio.COP;
const TRADUCCIONES = {
    en: {
        '🏠 Panel General': '🏠 Dashboard', '💰 Invertir': '💰 Invest', '📊 Portafolio': '📊 Portfolio', '📈 Mercado': '📈 Market', '📰 Noticias': '📰 News', '🧠 Aprender': '🧠 Learn', '🏦 Bancos': '🏦 Banks', '🏆 Logros': '🏆 Achievements', '🎩 Asesores': '🎩 Advisors', '⚡ Habilidades': '⚡ Skills', '⭐ Reputacion': '⭐ Reputation', '🎯 Desafios': '🎯 Challenges', 'ℹ️ Acerca de': 'ℹ️ About',
        'Menu Principal': 'Main Menu', 'Experiencia': 'Experience', 'Panel de Control': 'Control Panel', 'Estado Financiero': 'Financial Status', 'Logros Recientes': 'Recent Achievements', 'Realizar Inversion': 'Make an Investment', 'Promedio general': 'General average', 'Tu Cartera de Activos': 'Your Asset Portfolio', 'Centro de Asesores Financieros': 'Financial Advisors Center', 'Predicciones Activas': 'Active Predictions', 'Historial de Predicciones': 'Prediction History', 'Arbol de Habilidades': 'Skills Tree', 'Sistema de Reputacion': 'Reputation System', 'Misiones de Reputacion Activas': 'Active Reputation Missions', 'Historial de Eventos': 'Event History', 'Desafios Diarios': 'Daily Challenges', 'Valores de Mercado en Tiempo Real — Todas las Empresas': 'Real-time Market Values — All Companies', 'Canal de Noticias con Impacto': 'Impact News Channel', 'Historial Bancario': 'Bank History', 'Wiki de Inversion': 'Investment Wiki', 'Historial General': 'General History', 'Acerca de Imperio de Negocios': 'About Business Empire', 'Tabla de Logros': 'Achievements Table', 'Capital Disponible': 'Available Capital', 'Ganancias Totales': 'Total Earnings', 'Perdidas Totales': 'Total Losses', 'Deuda Pendiente': 'Outstanding Debt', 'Patrimonio Neto': 'Net Worth', 'Registrarse': 'Register', 'Iniciar sesion': 'Sign in', 'Usuario': 'Username', 'Contraseña': 'Password', 'Ajustes': 'Settings', 'Cerrar sesión': 'Sign out', 'Cambiar contraseña': 'Change password', 'Cancelar': 'Cancel', 'Guardar': 'Save', 'Eliminar cuenta': 'Delete account', 'Comprar': 'Buy', 'Vender': 'Sell', 'Todos': 'All', 'Riesgo': 'Risk', 'Psicologia': 'Psychology', 'Basicos': 'Basics', 'Mecanicas': 'Mechanics', 'Generar tarjeta': 'Generate card', 'Recargar saldo': 'Top up balance', 'Ver saldo': 'View balance', 'Refrescar historial': 'Refresh history', 'Inversion': 'Investment', 'Reputacion': 'Reputation', 'Desafios': 'Challenges'
    },
    fr: {
        '🏠 Panel General': '🏠 Tableau de bord', '💰 Invertir': '💰 Investir', '📊 Portafolio': '📊 Portefeuille', '📈 Mercado': '📈 Marché', '📰 Noticias': '📰 Actualités', '🧠 Aprender': '🧠 Apprendre', '🏦 Bancos': '🏦 Banques', '🏆 Logros': '🏆 Succès', '🎩 Asesores': '🎩 Conseillers', '⚡ Habilidades': '⚡ Compétences', '⭐ Reputacion': '⭐ Réputation', '🎯 Desafios': '🎯 Défis', 'ℹ️ Acerca de': 'ℹ️ À propos',
        'Menu Principal': 'Menu principal', 'Experiencia': 'Expérience', 'Panel de Control': 'Tableau de contrôle', 'Estado Financiero': 'Situation financière', 'Logros Recientes': 'Succès récents', 'Realizar Inversion': 'Faire un investissement', 'Promedio general': 'Moyenne générale', 'Tu Cartera de Activos': 'Votre portefeuille', 'Capital Disponible': 'Capital disponible', 'Ganancias Totales': 'Gains totaux', 'Perdidas Totales': 'Pertes totales', 'Deuda Pendiente': 'Dette en cours', 'Patrimonio Neto': 'Valeur nette', 'Registrarse': "S'inscrire", 'Iniciar sesion': 'Se connecter', 'Usuario': 'Utilisateur', 'Contraseña': 'Mot de passe', 'Ajustes': 'Paramètres', 'Cerrar sesión': 'Déconnexion', 'Cambiar contraseña': 'Changer le mot de passe', 'Cancelar': 'Annuler', 'Guardar': 'Enregistrer', 'Eliminar cuenta': 'Supprimer le compte', 'Comprar': 'Acheter', 'Vender': 'Vendre', 'Todos': 'Tous', 'Riesgo': 'Risque', 'Psicologia': 'Psychologie', 'Basicos': 'Bases', 'Mecanicas': 'Mécaniques'
    },
    pt: { '🏠 Panel General': '🏠 Painel geral', '💰 Invertir': '💰 Investir', '📊 Portafolio': '📊 Portfólio', '📈 Mercado': '📈 Mercado', '📰 Noticias': '📰 Notícias', '🧠 Aprender': '🧠 Aprender', '🏦 Bancos': '🏦 Bancos', '🏆 Logros': '🏆 Conquistas', '🎩 Asesores': '🎩 Consultores', '⚡ Habilidades': '⚡ Habilidades', '⭐ Reputacion': '⭐ Reputação', '🎯 Desafios': '🎯 Desafios', 'Menu Principal': 'Menu principal', 'Experiencia': 'Experiência', 'Capital Disponible': 'Capital disponível', 'Ganancias Totales': 'Ganhos totais', 'Perdidas Totales': 'Perdas totais', 'Deuda Pendiente': 'Dívida pendente', 'Patrimonio Neto': 'Patrimônio líquido', 'Registrarse': 'Cadastrar', 'Iniciar sesion': 'Entrar', 'Usuario': 'Usuário', 'Contraseña': 'Senha', 'Ajustes': 'Configurações', 'Cancelar': 'Cancelar', 'Guardar': 'Salvar', 'Comprar': 'Comprar', 'Vender': 'Vender' },
    de: { '🏠 Panel General': '🏠 Übersicht', '💰 Invertir': '💰 Investieren', '📊 Portafolio': '📊 Portfolio', '📈 Mercado': '📈 Markt', '📰 Noticias': '📰 Nachrichten', '🧠 Aprender': '🧠 Lernen', '🏦 Bancos': '🏦 Banken', '🏆 Logros': '🏆 Erfolge', '🎩 Asesores': '🎩 Berater', '⚡ Habilidades': '⚡ Fähigkeiten', '⭐ Reputacion': '⭐ Ruf', '🎯 Desafios': '🎯 Herausforderungen', 'Menu Principal': 'Hauptmenü', 'Experiencia': 'Erfahrung', 'Capital Disponible': 'Verfügbares Kapital', 'Ganancias Totales': 'Gesamteinnahmen', 'Perdidas Totales': 'Gesamtverluste', 'Deuda Pendiente': 'Offene Schulden', 'Patrimonio Neto': 'Nettovermögen', 'Registrarse': 'Registrieren', 'Iniciar sesion': 'Anmelden', 'Usuario': 'Benutzername', 'Contraseña': 'Passwort', 'Ajustes': 'Einstellungen', 'Cancelar': 'Abbrechen', 'Guardar': 'Speichern', 'Comprar': 'Kaufen', 'Vender': 'Verkaufen' },
    it: { '🏠 Panel General': '🏠 Pannello', '💰 Invertir': '💰 Investi', '📊 Portafolio': '📊 Portafoglio', '📈 Mercado': '📈 Mercato', '📰 Noticias': '📰 Notizie', '🧠 Aprender': '🧠 Impara', '🏦 Bancos': '🏦 Banche', '🏆 Logros': '🏆 Obiettivi', '🎩 Asesores': '🎩 Consulenti', '⚡ Habilidades': '⚡ Abilità', '⭐ Reputacion': '⭐ Reputazione', '🎯 Desafios': '🎯 Sfide', 'Menu Principal': 'Menu principale', 'Experiencia': 'Esperienza', 'Capital Disponible': 'Capitale disponibile', 'Ganancias Totales': 'Guadagni totali', 'Perdidas Totales': 'Perdite totali', 'Deuda Pendiente': 'Debito residuo', 'Patrimonio Neto': 'Patrimonio netto', 'Registrarse': 'Registrati', 'Iniciar sesion': 'Accedi', 'Usuario': 'Nome utente', 'Contraseña': 'Password', 'Ajustes': 'Impostazioni', 'Cancelar': 'Annulla', 'Guardar': 'Salva', 'Comprar': 'Compra', 'Vender': 'Vendi' },
    zh: { '🏠 Panel General': '🏠 控制面板', '💰 Invertir': '💰 投资', '📊 Portafolio': '📊 投资组合', '📈 Mercado': '📈 市场', '📰 Noticias': '📰 新闻', '🧠 Aprender': '🧠 学习', '🏦 Bancos': '🏦 银行', '🏆 Logros': '🏆 成就', '🎩 Asesores': '🎩 顾问', '⚡ Habilidades': '⚡ 技能', '⭐ Reputacion': '⭐ 声望', '🎯 Desafios': '🎯 挑战', 'Menu Principal': '主菜单', 'Experiencia': '经验', 'Capital Disponible': '可用资金', 'Ganancias Totales': '总收益', 'Perdidas Totales': '总损失', 'Deuda Pendiente': '未偿债务', 'Patrimonio Neto': '净资产', 'Registrarse': '注册', 'Iniciar sesion': '登录', 'Usuario': '用户名', 'Contraseña': '密码', 'Ajustes': '设置', 'Cancelar': '取消', 'Guardar': '保存', 'Comprar': '买入', 'Vender': '卖出' }
};

const TRADUCCIONES_EVENTOS = {
    en: {
        'Duracion': 'Duration', 'segundos': 'seconds', 'Sectores': 'Sectors',
        'El evento mundial ha finalizado. El mercado se normaliza.': 'The global event has ended. The market is returning to normal.',
        '🚀 Innovación en IA: la nueva generación de chips reduce costos de centros de datos.': '🚀 AI innovation: the next generation of chips reduces data center costs.',
        '⚡ Transición energética: grandes productores firman contratos para parques eólicos.': '⚡ Energy transition: major producers sign contracts for wind farms.',
        '🧪 Avance médico: aprobación de vacuna de tercera generación acelera inversiones.': '🧪 Medical breakthrough: approval of a third-generation vaccine accelerates investment.',
        '💎 Litio estratégico: se descubre yacimiento clave para baterías eléctricas.': '💎 Strategic lithium: a key deposit for electric batteries is discovered.',
        '🏗️ Infraestructura verde: gobierno lanza plan de construcción sostenible.': '🏗️ Green infrastructure: the government launches a sustainable construction plan.',
        '🛰️ 6G en piloto: operadores anuncian red de próxima generación para 2028.': '🛰️ 6G pilot: operators announce a next-generation network for 2028.',
        '🚗 Autos eléctricos: fabricante anuncia producción masiva de modelos de bajo costo.': '🚗 Electric cars: a manufacturer announces mass production of low-cost models.',
        '🛒 Temporada récord: ventas online globales superan pronósticos en un 20%.': '🛒 Record season: global online sales beat forecasts by 20%.',
        '🏦 Tasas en baja: bancos ofrecen créditos hipotecarios con condiciones más holgadas.': '🏦 Rates fall: banks offer mortgages with more flexible terms.',
        '✈️ Turismo abierto: reapertura completa de fronteras aumenta reservas internacionales.': '✈️ Tourism reopens: fully reopened borders increase international bookings.',
        '☢️ Energía limpia: planta de fusión anuncia su primer kilovatio estable.': '☢️ Clean energy: a fusion plant announces its first stable kilowatt.',
        '🌍 Comercio estable: nuevo tratado reduce barreras arancelarias globales.': '🌍 Stable trade: a new treaty reduces global tariff barriers.',
        '📉 Corrección tecnológica: el sector ajusta valoraciones tras exceso de optimismo.': '📉 Technology correction: the sector adjusts valuations after excessive optimism.',
        '📉 Inflación alta: los consumidores recortan gastos en bienes no esenciales.': '📉 High inflation: consumers cut spending on non-essential goods.',
        '☣️ Brote viral: turismo y ocio sufren cancelaciones masivas.': '☣️ Viral outbreak: tourism and leisure suffer mass cancellations.',
        '⛏️ Huelga minera: producción de cobre y litio se detiene por conflictos laborales.': '⛏️ Mining strike: copper and lithium production stops due to labor disputes.',
        '⚖️ Control de IA: nuevos reglamentos frenan despliegue comercial de algoritmos.': '⚖️ AI controls: new regulations slow the commercial rollout of algorithms.',
        '📉 Escasez de material: retrasos en proyectos de construcción y energía.': '📉 Material shortage: delays hit construction and energy projects.',
        '⛈️ Sequía severa: cultivos y exportaciones agrícolas caen en picada.': '⛈️ Severe drought: crops and agricultural exports plunge.',
        '🔧 Retiro masivo: fabricante automotriz detiene ventas por problema en baterías.': '🔧 Mass recall: an automaker halts sales due to a battery problem.',
        '🔐 Ciberataque: red de pagos global sufre brecha de seguridad.': '🔐 Cyberattack: the global payments network suffers a security breach.',
        '📉 Capital fuga: bancos regionales enfrentan retiros acelerados.': '📉 Capital flight: regional banks face accelerated withdrawals.',
        '⛽ Crisis energética: el petróleo y el gas suben ante escombros de oferta.': '⛽ Energy crisis: oil and gas prices rise amid supply disruption.',
        '🏘️ Colapso inmobiliario: el crédito caro frena la compra de viviendas.': '🏘️ Real estate collapse: expensive credit slows home purchases.',
        '📵 Caída de redes: interrupción masiva deja dispositivos sin conexión.': '📵 Network outage: a massive disruption leaves devices disconnected.',
        '🌪️ Clima extremo: fenómenos naturales provocan contracción económica.': '🌪️ Extreme weather: natural disasters cause an economic contraction.'
    }
};

function traducirTexto(texto) {
    return texto;
}

function obtenerIndiceAvatarPerfil(fotoPerfil, indiceAlternativo = 0) {
    const match = String(fotoPerfil || '').match(/(?:^|\/)perfil-(\d{2})\.png(?:\?|$)/i);
    const index = match ? Number(match[1]) - 1 : Number(indiceAlternativo);
    return Number.isInteger(index) && index >= 0 && index < FOTOS_PERFIL_PREDETERMINADAS.length ? index : 0;
}

function estaEnPreferencias() {
    const preferencias = document.getElementById('preferencesScreen');
    const planes = document.getElementById('plansScreen');
    return (preferencias && preferencias.style.display !== 'none') || (planes && planes.style.display !== 'none');
}

function estaEnAjustes() {
    const ajustes = document.getElementById('settingsModal');
    const ajustesExtra = document.getElementById('extraSettingsModal');
    return (ajustes && ajustes.classList.contains('active')) || (ajustesExtra && ajustesExtra.classList.contains('active'));
}

function estaEnPerfil() {
    const perfil = document.getElementById('profileModal');
    return perfil && perfil.classList.contains('active');
}

function aplicarIdioma() {
    // La interfaz permanece en español hasta reactivar idiomas.
}
let portafolio = {};
let logrosCompletados = [];
let flagProfit1k = false, flagNoDebt = false, flagFirstBuy = false;
let prestamosActivos = 0;

const tarjetaDefault = {
    usado: 0,
    saldo: 0,
    tasa: 0.03,
    bloqueada: false,
    numero: '',
    cvv: '',
    fechaExp: '',
    nombre: '',
    cupo: 0,
    emisor: ''
};
let tarjetaGlobal = JSON.parse(JSON.stringify(tarjetaDefault));
let tarjetaSaldoVisible = false;
let historialGlobal = [];
let historialBancario = [];
let bancos = JSON.parse(JSON.stringify(bancosDefault));
let ultimoAvisoMisiones = 0;
let alertaMisionesMostrada = false;

function renderSidebarMenu() {
    const sidebar = document.getElementById('sidebarMenu');
    if (!sidebar) return;
        sidebar.innerHTML = SECTION_CONFIG.map(section => `
        <button id="btn-${section.id}" onclick="mostrar('${section.id}')">${traducirTexto(section.label)}</button>
    `).join('');
}

// Nuevas variables globales
let puntosHabilidadTotal = 0; // PH totales ganados (para tracking)
let prediccionesHistorial = []; // Historial de predicciones
let misionesReputacion = []; // Misiones activas de reputacion
let desafiosDiarios = []; // Desafios diarios
let desafiosCompletadosHoy = 0; // Contador
let ultimaActualizacionDesafios = null; // Timestamp ultima actualizacion

function calcularTargetMision(base) {
    if (!base.targetBase) return base.target || 0;
    let actual = 0;
    switch(base.tipo) {
        case 'ganancia_objetivo': actual = gananciasTotal; break;
        case 'capital_objetivo': actual = capital; break;
        case 'patrimonio_objetivo': actual = getPatrimonioNeto(); break;
        default: actual = 0;
    }
    let step = base.targetStep || 100000;
    let multiplier = 1 + Math.floor(actual / step);
    let target = base.targetBase * Math.max(1, multiplier);
    return Math.min(base.targetCap || target, target);
}

function crearInstanciaMision(base) {
    let m = {
        ...base,
        uid: 'mr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        tiempoRestante: base.tiempo,
        duracion: base.tiempo,
        estado: 'activa',
        progreso: 0
    };
    if (base.targetBase) {
        m.target = calcularTargetMision(base);
    }
    if (typeof base.desc === 'function') {
        m.desc = base.desc(m);
    }
    if (['comprar_3sectores', 'comprar_4sectores', 'comprar_5sectores'].includes(base.tipo)) {
        m.sectoresComprados = [];
    }
    return m;
}

let ultimoSpawnMisionReputacion = Date.now();
const INTERVALO_SPAWN_MISION_REPUTACION = 10 * 60 * 1000;

// Contador interno para intervalos del DOM
let siguienteMisionCountdownTimer = null;
let siguienteMisionCountdownRetries = 0;

// Contador para la proxima mision
function getMsParaProximaMision() {
    const ahora = Date.now();
    const pasado = ahora - ultimoSpawnMisionReputacion;
    const restante = Math.max(0, INTERVALO_SPAWN_MISION_REPUTACION - pasado);
    return restante;
}

function startCountdownSiguienteMision() {
    // Evitar crear múltiples timers
    if (siguienteMisionCountdownTimer) return;
    const el = document.getElementById('siguienteMisionCountdown');
    if (!el) {
        // Si el elemento aún no existe, reintentar hasta 10 veces
        if (siguienteMisionCountdownRetries < 10) {
            siguienteMisionCountdownRetries++;
            setTimeout(startCountdownSiguienteMision, 500);
        }
        return;
    }
    function actualizar() {
        try {
            const ms = getMsParaProximaMision();
            const s = Math.max(0, Math.ceil(ms / 1000));
            const min = Math.floor(s / 60).toString().padStart(2, '0');
            const sec = (s % 60).toString().padStart(2, '0');
            el.innerText = `${min}:${sec}`;
            const nextDelay = Math.max(250, ms % 1000 || 1000);
            siguienteMisionCountdownTimer = setTimeout(actualizar, nextDelay);
        } catch (e) {
            siguienteMisionCountdownTimer = null;
        }
    }
    actualizar();
}

function getDescripcionMisionInfo(base) {
    let preview = { ...base };
    if (base.targetBase) preview.target = calcularTargetMision(base);
    if (typeof base.descInfo === 'function') return base.descInfo(preview);
    if (typeof base.desc === 'function') return base.desc(preview);
    return base.descInfo || base.desc || '';
}

// La sección de información de reputación fue removida del HTML; las funciones que manipulaban
// ese DOM también se han eliminado para evitar referencias residuales.

// ==========================================
// INICIALIZACION DEL MERCADO
// ==========================================
function initMercado() {
    TODAS_EMPRESAS = [];
    Object.keys(CATEGORIAS).forEach(cat => {
        sectorBoost[cat] = 1.0;
        CATEGORIAS[cat].empresas.forEach(e => {
            let vol = CATEGORIAS[cat].vol * (0.8 + Math.random()*0.4);
            let precio = e.p * (0.95 + Math.random()*0.1);
            preciosMercado[e.n] = Math.max(0.00001, precio);
            empresaMeta[e.n] = {
                sector: cat,
                basePrice: e.p,
                vol: vol,
                historial: [0,0,0,0,0]
            };
            TODAS_EMPRESAS.push(e.n);
        });
    });
}
initMercado();
renderSidebarMenu();

// ==========================================
// GRAFICA
// ==========================================
let chartPanel = null;
let startNetPanel = 10000;

// Registrar plugin global para mostrar el último valor
if (typeof Chart !== 'undefined') Chart.register({
    id: 'lastValueLabel',
    afterDatasetsDraw(chart) {
        const ctx = chart.ctx;
        const visibleDatasets = chart.data.datasets.filter(ds => !ds.hidden);
        
        if (visibleDatasets.length === 0) return;
        
        // Obtener el último dataset visible
        const lastDataset = visibleDatasets[visibleDatasets.length - 1];
        if (!lastDataset || !lastDataset.data.length) return;
        
        // Encontrar el último valor no nulo
        let lastIndex = lastDataset.data.length - 1;
        while (lastIndex >= 0 && lastDataset.data[lastIndex] === null) lastIndex--;
        
        if (lastIndex < 0) return;
        
        // Obtener la posición del punto
        const datasetIndex = chart.data.datasets.indexOf(lastDataset);
        const meta = chart.getDatasetMeta(datasetIndex);
        if (!meta || !meta.data || !meta.data[lastIndex]) return;
        
        const point = meta.data[lastIndex];
        if (!point) return;
        
        const x = point.x;
        const y = point.y;
        
        // Determinar el color según tendencia
        let color = '#4aec57';
        if (lastIndex > 0) {
            const current = lastDataset.data[lastIndex];
            const previous = lastDataset.data[lastIndex - 1];
            if (typeof current === 'number' && typeof previous === 'number' && current < previous) {
                color = '#ff4c4c';
            }
        }
        
        // Detectar si es gráfica del panel (dólares) o portafolio (porcentaje)
        const isPanel = chart.canvas.id === 'graficaPanel';
        
        // Obtener el valor para mostrar
        let displayValue = '';
        let label = lastDataset.label;
        
        if (isPanel) {
            // Panel: en dólares
            displayValue = formatD(lastDataset.data[lastIndex]);
        } else {
            // Portafolio: todo en porcentaje
            displayValue = (lastDataset.data[lastIndex] || 0).toFixed(2) + '%';
            const isAverage = lastDataset.label === portafolioAverageLabel || lastDataset.label === 'Promedio cartera';
            if (isAverage) {
                label = portafolioAverageLabel || 'Promedio general';
            }
        }
        
        const tooltipText = `${label} ${displayValue}`;
        
        // Dibujar el tooltip con mejor estética
        ctx.save();
        ctx.font = '13px Arial';
        ctx.fillStyle = '#fff';
        const textWidth = ctx.measureText(tooltipText).width;
        const padding = 10;
        const boxWidth = textWidth + padding * 2 + 10;
        const boxHeight = 28;
        let boxX = x - boxWidth / 2;
        let boxY = y - boxHeight - 16;
        
        // Asegurar que el tooltip no se salga de los bordes
        if (boxX < 5) boxX = 5;
        if (boxX + boxWidth > chart.width - 5) boxX = chart.width - boxWidth - 5;
        if (boxY < 5) boxY = y + 16;
        
        // Fondo del tooltip con sombra
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.fillStyle = 'rgba(15, 15, 15, 0.98)';
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 6);
        ctx.fill();
        
        // Borde elegante
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.shadowColor = 'transparent';
        
        // Punto de color indicador
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(boxX + padding + 2, boxY + boxHeight / 2, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Texto
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(tooltipText, boxX + padding + 14, boxY + boxHeight / 2);
        ctx.restore();
    }
});

function initChart() {
    if (typeof Chart === 'undefined') return;
    const ctxPanel = document.getElementById('graficaPanel').getContext('2d');
    startNetPanel = getPatrimonioNeto() || 10000;
        chartPanel = new Chart(ctxPanel, {
        type: 'line',
        data: {
            labels: ['Inicio'],
            datasets: [{
                label: 'Ganancia/Pérdida',
                data: [0],
                borderWidth: 2,
                backgroundColor: 'rgba(255,255,255,0.08)',
                tension: 0.2,
                fill: false,
                spanGaps: true,
                borderJoinStyle: 'round',
                borderCapStyle: 'round',
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: ctx => {
                    const index = ctx.dataIndex;
                    if (index === 0) return '#4aec57';
                    const current = ctx.dataset.data[index];
                    const previous = ctx.dataset.data[index - 1];
                    return current < previous ? '#ff4c4c' : '#4aec57';
                },
                pointBorderColor: ctx => {
                    const index = ctx.dataIndex;
                    if (index === 0) return '#4aec57';
                    const current = ctx.dataset.data[index];
                    const previous = ctx.dataset.data[index - 1];
                    return current < previous ? '#ff4c4c' : '#4aec57';
                },
                segment: {
                    borderColor: ctx => ctx.p0.parsed.y <= ctx.p1.parsed.y ? '#4aec57' : '#ff4c4c'
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#aaa' } },
                tooltip: {
                    backgroundColor: '#111',
                    titleColor: '#fff',
                    bodyColor: '#ddd',
                    borderColor: '#444',
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => ctx.parsed.y >= 0 ? ` +${formatD(ctx.parsed.y)}` : ` ${formatD(ctx.parsed.y)}`
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255,255,255,0.06)' },
                    ticks: {
                        color: '#aaa',
                        callback: value => value >= 0 ? `+${formatD(value)}` : formatD(value)
                    },
                    border: { color: 'rgba(255,255,255,0.12)' }
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0.06)' },
                    ticks: { color: '#aaa' },
                    border: { color: 'rgba(255,255,255,0.12)' }
                }
            }
        }
    });
}

function updateChartLineColor(chart) {
    if (!chart || !chart.data || !chart.data.datasets || !chart.data.datasets[0]) return;
    const dataset = chart.data.datasets[0];
    const points = dataset.data || [];
    if (points.length < 2) return;
    const last = Number(points[points.length - 1]);
    const prev = Number(points[points.length - 2]);
    const rising = last > prev;
    dataset.borderColor = rising ? '#4aec57' : '#ff4c4c';
    dataset.backgroundColor = rising ? 'rgba(74,236,87,0.15)' : 'rgba(255,76,76,0.15)';
    dataset.pointBackgroundColor = rising ? '#4aec57' : '#ff4c4c';
    dataset.pointBorderColor = rising ? '#4aec57' : '#ff4c4c';
}

// ==========================================
// 02. AUTENTICACION Y PERSISTENCIA
// ==========================================
async function registrar() {
    if (registroEnCurso) return;
    let username = String(document.getElementById("emailUser").value || '').trim().toLowerCase();
    let pass = String(document.getElementById("passUser").value || '');
    if (!username || !pass) return toast("Completa usuario y contraseña", "error", { allowOnLoginScreen: true });
    if (!/^[a-z0-9_]{3,20}$/.test(username)) return toast('El usuario debe tener entre 3 y 20 caracteres: letras, números o guion bajo', 'error', { allowOnLoginScreen: true });
    if (pass.length < 8) {
        console.error('Registro fallido: contraseña demasiado corta', pass.length);
        return toast("La contraseña debe tener al menos 8 caracteres", "error", { allowOnLoginScreen: true });
    }
    const avatarInicial = Math.floor(Math.random() * FOTOS_PERFIL_PREDETERMINADAS.length);
    registroEnCurso = true;
    const initialState = {
        username,
        capital: 10000, xp: 0, nivel: 1, deuda: 0,
        portafolio: {}, g: 0, p: 0, ti: 0, div: 0,
        logros: [], flags: {}, precios: null,
        historial: [],
        asesores: {},
        predicciones: [],
        predHistorial: [],
        habilidades: {},
        reputacion: 50,
        eventosRep: [],
        misionesRep: [],
        tarjetaGlobal: JSON.parse(JSON.stringify(tarjetaDefault)),
        historialGlobal: [],
        historialBancario: [],
        puntosHabilidadTotal: 0,
        desafios: [],
        desafiosCompletados: 0,
        ultimaActDesafios: null,
        fotoPerfil: FOTOS_PERFIL_PREDETERMINADAS[avatarInicial],
        avatarSeleccionado: avatarInicial,
        preferencias: { moneda: null },
        plan: null,
        mascota: mascotaActual,
        ventaPendienteTimer: null
    };
    try {
        await db.createUser(username, pass, initialState);
        toast("Usuario creado. Ya puedes iniciar sesión.", "success", { allowOnLoginScreen: true });
    } catch (e) {
        const message = String(e.message || '').toLowerCase();
        const alreadyRegistered = message.includes('already registered') || message.includes('user already exists') || message.includes('usuario ya existe');
        toast(alreadyRegistered ? 'Ese usuario ya existe. Inicia sesión o elige otro.' : (e.message || "Error al registrar"), "error", { allowOnLoginScreen: true });
    } finally {
        registroEnCurso = false;
    }
}

async function reenviarConfirmacion() {
    const email = String(document.getElementById('emailUser')?.value || '').trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return toast('Para reenviar la confirmación, escribe un correo electrónico', 'error', { allowOnLoginScreen: true });
    }
    try {
        await db.resendSignupConfirmation(email);
        toast('Correo reenviado. Revisa Spam o Promociones.', 'success', { allowOnLoginScreen: true });
    } catch (e) {
        const message = String(e.message || '').toLowerCase();
        const alreadyConfirmed = message.includes('already confirmed') || message.includes('user confirmed');
        toast(alreadyConfirmed ? 'Este correo ya está confirmado. Intenta iniciar sesión.' : (e.message || 'No se pudo reenviar el correo'), 'error', { allowOnLoginScreen: true });
    }
}

async function recuperarContrasena() {
    const email = String(document.getElementById('emailUser')?.value || '').trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return toast('Para recuperar la contraseña, escribe un correo electrónico', 'error', { allowOnLoginScreen: true });
    }
    try {
        await db.resetPasswordForEmail(email);
        toast('Te enviamos un enlace para crear una contraseña nueva. Revisa tu correo.', 'success', { allowOnLoginScreen: true });
    } catch (e) {
        toast(e.message || 'No se pudo enviar el enlace de recuperación', 'error', { allowOnLoginScreen: true });
    }
}

async function login(authUser = '', authData = null, isGoogle = false, isNewGoogle = false) {
    const loginValue = String(document.getElementById("emailUser")?.value || '').trim().toLowerCase();
    const pass = String(document.getElementById("passUser")?.value || '');
    const loginFromOAuth = Boolean(authData || isGoogle);
    if (!loginFromOAuth && (!loginValue || !pass)) return toast('Completa usuario y contraseña', 'error', { allowOnLoginScreen: true });
    if (!loginFromOAuth && pass.length < 8) return toast('La contraseña debe tener al menos 8 caracteres', 'error', { allowOnLoginScreen: true });
    let user = authUser || loginValue;
    let u;
    try {
        u = authData || await db.signIn(user, pass);
    } catch (e) {
        const errorCode = String(e.code || e.error_code || '').toLowerCase();
        const errorMessage = String(e.message || '').toLowerCase();
        const noConfirmado = errorCode.includes('not_confirmed') || errorMessage.includes('email not confirmed');
        const credencialesInvalidas = errorMessage.includes('invalid login credentials') || errorMessage.includes('invalid user credentials');
        const mensaje = noConfirmado
            ? 'Confirma tu correo electrónico antes de iniciar sesión.'
            : credencialesInvalidas
                ? 'Correo o contraseña incorrectos. Si acabas de registrarte, confirma primero tu correo.'
                : (e.message || 'Datos incorrectos');
        return toast(mensaje, 'error', { allowOnLoginScreen: true });
    }
    if (!u) return toast("Datos incorrectos", "error", { allowOnLoginScreen: true });
    user = u.__username || user;
    usuarioActual = user.toLowerCase();
    try {
        idPublico = await db.getSequentialPublicId(usuarioActual);
    } catch (error) {
        console.warn('No se pudo actualizar el ID público secuencial:', error);
        idPublico = null;
    }
    idPublico = idPublico || (/^\d+$/.test(String(u.publicId || '')) ? String(u.publicId) : generarIdPublico());
    const nombreActual = String(u.__username || user).toLowerCase();
    const cuentaEmailSinNombre = !isGoogle && /^usuario_[a-z0-9]+$/.test(nombreActual);
    const cuentaGoogleSinNombre = isGoogle
        && !u.googleUsernameElegido
        && /^(google_|usuario_)/.test(nombreActual);
    usernamePendiente = Boolean(u.usernameSetupPending || (isGoogle && isNewGoogle) || cuentaEmailSinNombre || cuentaGoogleSinNombre);
    googleUserId = u.googleUserId || '';
    googleUsernameElegido = Boolean(u.googleUsernameElegido);
    usernameElegido = Boolean(u.usernameElegido);
    correoActual = String(u.email || '').trim().toLowerCase();
    actualizarNombreAjustes();
    capital = Number.isFinite(Number(u.capital)) ? Number(u.capital) : 10000;
    xp = Number.isFinite(Number(u.xp)) ? Number(u.xp) : 0;
    nivel = Number.isFinite(Number(u.nivel)) && Number(u.nivel) > 0 ? Number(u.nivel) : 1;
    deuda = Number.isFinite(Number(u.deuda)) ? Number(u.deuda) : 0;
    portafolio = u.portafolio || {};
    gananciasTotal = u.g || 0;
    perdidasTotal = u.p || 0;
    totalInv = u.ti || 0;
    dividendosTotal = u.div || 0;
    logrosCompletados = u.logros || [];
    amigos = Array.isArray(u.amigos) ? u.amigos : [];
    solicitudesAmistad = Array.isArray(u.friendRequests) ? u.friendRequests : [];
    proyectosCooperativos = normalizarProyectosCooperativos(u.cooperativeProjects);
    let flags = u.flags || {};
    flagProfit1k = flags.profit1k || false;
    flagNoDebt = flags.nodebt || false;
    flagFirstBuy = flags.firstbuy || false;

    // Cargar datos de nuevos sistemas
    asesoresEstado = u.asesores || {};
    // Inicializar asesores faltantes para usuarios nuevos
    ASESORES_DEF.forEach(a => {
        if (!asesoresEstado[a.id]) {
            asesoresEstado[a.id] = { contratado: false, nivel: 1, exp: 0 };
        }
    });
    prediccionesActivas = u.predicciones || [];
    prediccionesHistorial = u.predHistorial || [];
    habilidadesDesbloqueadas = u.habilidades || {};
    reputacion = u.reputacion || 50;
    eventosReputacion = u.eventosRep || [];
    misionesReputacion = (u.misionesRep || []).map(m => ({
        ...m,
        tiempo: 300,
        duracion: 300,
        tiempoRestante: Math.min(300, Number(m.tiempoRestante) || 300)
    }));
    historialGlobal = u.historialGlobal || [];
    historialBancario = u.historialBancario || [];
    prestamosActivos = u.prestamosActivos || 0;
    puntosHabilidadTotal = u.puntosHabilidadTotal || 0;
    desafiosDiarios = u.desafios || [];
    usuarioFotoPerfil = u.fotoPerfil || FOTOS_PERFIL_PREDETERMINADAS[Math.floor(Math.random() * FOTOS_PERFIL_PREDETERMINADAS.length)];
    const avatarGuardado = Number.isInteger(u.avatarSeleccionado) ? u.avatarSeleccionado : FOTOS_PERFIL_PREDETERMINADAS.indexOf(u.fotoPerfil);
    avatarSeleccionado = obtenerIndiceAvatarPerfil(u.fotoPerfil, u.avatarSeleccionado);
    desafiosCompletadosHoy = u.desafiosCompletados || 0;
    ultimaActualizacionDesafios = u.ultimaActDesafios;
    const monedaGuardada = tiposCambio[u.preferencias?.moneda] ? u.preferencias.moneda : null;
    monedaActual = monedaGuardada || 'USD';
    planActual = PLANES[u.plan] ? u.plan : null;
    mascotaActual = u.mascota && MASCOTAS.some(m => m.id === u.mascota.id) ? { ...mascotaActual, ...u.mascota } : { ...mascotaActual };
    tarjetaGlobal = u.tarjetaGlobal ? Object.assign(JSON.parse(JSON.stringify(tarjetaDefault)), u.tarjetaGlobal) : JSON.parse(JSON.stringify(tarjetaDefault));
    deuda = 0;
    renderTarjetaVirtual();

    if (eventosReputacion.length === 0) {
        eventosReputacion.push({ razon: "Bienvenido al mercado financiero", cantidad: 0, tiempo: new Date().toLocaleTimeString(), positivo: true });
    }

    // Restaurar precios si existen
    if (u.precios) {
        try {
            let saved = JSON.parse(u.precios);
            Object.keys(saved).forEach(k => {
                if (preciosMercado[k] !== undefined) preciosMercado[k] = saved[k];
            });
        } catch(e){}
    }

    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("preferencesScreen").style.display = usernamePendiente || !monedaGuardada ? "flex" : "none";
    const usernameField = document.getElementById('usernameField');
    const usernameInput = document.getElementById('usernameInput');
    if (usernameField) usernameField.style.display = usernamePendiente ? 'block' : 'none';
    if (usernameInput && usernamePendiente) usernameInput.value = '';
    if (usernamePendiente) {
        const errorLabel = document.getElementById('usernameError');
        if (errorLabel) errorLabel.textContent = '';
        return;
    }
    if (isGoogle) {
        iniciarJuego();
        return;
    }
    document.getElementById("currencySelect").value = monedaActual;
    if (monedaGuardada && !planActual) {
        await iniciarJuego();
        await new Promise(resolve => setTimeout(resolve, 1000));
        document.getElementById('plansScreen').style.display = 'flex';
        renderPlanes();
    } else if (monedaGuardada && planActual) {
        iniciarJuego();
    }
}

async function loginConGoogle() {
    try {
        await db.signInWithGoogle();
    } catch (e) {
        toast(e.message || 'No se pudo iniciar sesión con Google', 'error', { allowOnLoginScreen: true });
    }
}

async function cargarSesionAuth() {
    try {
        const profile = await db.getAuthProfile();
        if (profile) {
            window.history.replaceState({}, document.title, window.location.pathname);
            await login(profile.username, profile.data, profile.isGoogle, profile.isNew);
        }
    } catch (e) {
        console.error('Google Auth:', e);
        toast(e.message || 'No se pudo recuperar la sesión de Google', 'error', { allowOnLoginScreen: true });
        window.location.replace('login.html');
    }
}

async function cargarSesionGuardada() {
    const token = sessionStorage.getItem('imperio_session_token');
    if (!token || usuarioActual) return;
    try {
        const data = await db.getUserData(token);
        await login(token, { ...data, __username: token });
    } catch (error) {
        sessionStorage.removeItem('imperio_session_token');
        console.warn('No se pudo restaurar la sesión guardada:', error);
        window.location.replace('login.html');
    }
}

async function confirmarPreferencias() {
    if (usernamePendiente) {
        const input = document.getElementById('usernameInput');
        const errorLabel = document.getElementById('usernameError');
        const nuevoNombre = String(input?.value || '').trim().toLowerCase();
        if (!/^[a-z0-9_]{3,20}$/.test(nuevoNombre)) {
            if (errorLabel) errorLabel.textContent = 'Usa entre 3 y 20 caracteres: letras, números o guion bajo.';
            input?.focus();
            return;
        }
        try {
            if (nuevoNombre !== usuarioActual) {
                const response = await db.changeUsername(usuarioActual, '', nuevoNombre);
                usuarioActual = response.token;
            }
            usernamePendiente = false;
            usernameElegido = true;
            googleUsernameElegido = true;
        } catch (error) {
            if (errorLabel) errorLabel.textContent = error.message || 'Ese nombre de usuario no está disponible.';
            input?.focus();
            return;
        }
    }
    monedaActual = document.getElementById('currencySelect').value;
    try {
        await guardar(true);
    } catch (error) {
        toast(error.message || 'No se pudieron guardar tus preferencias.', 'error', { allowOnLoginScreen: true });
        return;
    }
    document.getElementById('preferencesScreen').style.display = 'none';
    await iniciarJuego();
    await new Promise(resolve => setTimeout(resolve, 1000));
    document.getElementById('plansScreen').style.display = 'flex';
    renderPlanes();
}

function renderPlanes() {
    const grid = document.getElementById('plansGrid');
    if (!grid) return;
    if (!planSeleccionado || !PLANES[planSeleccionado]) planSeleccionado = planActual;
    grid.innerHTML = Object.entries(PLANES).map(([id, plan]) => `
        <article class="plan-card ${plan.clase}${planSeleccionado === id ? ' selected' : ''}" onclick="seleccionarPlan('${id}')">
            <h2>${plan.nombre}</h2>
            <div class="plan-price">${plan.precioCOP === 0 ? 'Gratis' : formatD(precioPlanBase(plan))}</div>
            <div class="plan-capital">Capital inicial: ${formatD(plan.capitalInicial)}</div>
            <ul class="plan-benefits">${plan.beneficios.map(beneficio => `<li>${beneficio}</li>`).join('')}</ul>
        </article>
    `).join('');
    const boton = document.getElementById('confirmPlanBtn');
    if (boton) {
        boton.disabled = !planSeleccionado;
        const planElegido = planSeleccionado ? PLANES[planSeleccionado] : null;
        boton.textContent = planElegido?.precioCOP > 0
            ? `Pagar y activar ${planElegido.nombre}`
            : planActual ? `Continuar con ${PLANES[planActual].nombre}` : 'Elegir plan';
    }
}

function seleccionarPlan(id) {
    if (!PLANES[id]) return;
    planSeleccionado = id;
    renderPlanes();
}

function abrirSelectorPlan() {
    volverAjustesDesdePlanesActivo = document.getElementById('extraSettingsModal')?.classList.contains('active') || false;
    if (volverAjustesDesdePlanesActivo) cerrarMasAjustes(false);
    cerrarPerfil();
    const planes = document.getElementById('plansScreen');
    const botonVolver = document.getElementById('plansBackButton');
    if (planes) planes.style.display = 'flex';
    if (botonVolver) botonVolver.style.display = volverAjustesDesdePlanesActivo ? 'block' : 'none';
    renderPlanes();
}

function volverAjustesDesdePlanes() {
    const planes = document.getElementById('plansScreen');
    const botonVolver = document.getElementById('plansBackButton');
    if (planes) planes.style.display = 'none';
    if (botonVolver) botonVolver.style.display = 'none';
    if (volverAjustesDesdePlanesActivo) {
        volverAjustesDesdePlanesActivo = false;
        abrirMasAjustes();
    }
}

function confirmarPlan() {
    if (!planSeleccionado || !PLANES[planSeleccionado]) return;
    const plan = PLANES[planSeleccionado];
    if (plan.precioCOP > 0) {
        solicitarPagoPlan(planSeleccionado);
        return;
    }
    activarPlanSeleccionado();
}

function activarPlanSeleccionado() {
    if (!planSeleccionado || !PLANES[planSeleccionado]) return;
    const esPrimeraEleccion = !planActual;
    planActual = planSeleccionado;
    if (esPrimeraEleccion) capital = PLANES[planActual].capitalInicial;
    iniciarJuego();
}

function solicitarPagoPlan(planId) {
    const plan = PLANES[planId];
    resetModalConfirmState();
    planPagoPendiente = planId;
    modalActionType = 'pago_plan';
    document.getElementById("modalTitle").innerText = `Pagar plan ${plan.nombre}`;
    document.getElementById("modalText").innerHTML = `
        <p>Completa el pago de <strong>${formatD(precioPlanBase(plan))}</strong> para activar el plan ${plan.nombre}.</p>
        <p style="margin-top:6px; color:#aaa; font-size:0.85em;">PayPal procesará el equivalente aproximado de US$ ${plan.precioPaypalUSD.toFixed(2)}.</p>
        <div id="paypalPlanButton" style="margin-top:16px; min-height:42px;"></div>
        <p id="paypalPlanStatus" style="margin-top:8px; color:#aaa; font-size:0.85em;">Cargando PayPal...</p>
    `;
    const confirmBtn = document.getElementById("modalConfirmBtn");
    if (confirmBtn) {
        confirmBtn.style.display = "none";
        confirmBtn.dataset.action = 'pago_plan';
    }
    document.getElementById("modalConfirm").classList.add("active");
    renderPaypalPlanButton(planId);
}

function toggleMoneyShop(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('moneyShopMenu');
    const button = document.getElementById('moneyShopBtn');
    if (!menu || !button) return;
    const abierto = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(abierto));
}

function cerrarMoneyShop() {
    const menu = document.getElementById('moneyShopMenu');
    const button = document.getElementById('moneyShopBtn');
    if (menu) menu.classList.remove('open');
    if (button) button.setAttribute('aria-expanded', 'false');
}

function actualizarImportesMoneyShop() {
    document.querySelectorAll('[data-money-amount]').forEach(element => {
        element.textContent = `+${formatD(Number(element.dataset.moneyAmount))}`;
    });
    document.querySelectorAll('[data-money-price-usd]').forEach(element => {
        element.textContent = formatD(Number(element.dataset.moneyPriceUsd));
    });
}

document.addEventListener('click', event => {
    const shop = document.querySelector('.money-shop-wrap');
    if (shop && !shop.contains(event.target)) cerrarMoneyShop();
});

function iniciarCompraDinero(cantidad, precioUsd) {
    cerrarMoneyShop();
    compraDineroPendiente = { cantidad, precioUsd };
    resetModalConfirmState();
    modalActionType = 'compra_dinero';
    document.getElementById('modalTitle').innerText = 'Comprar dinero';
    document.getElementById('modalText').innerHTML = `
        <p>Recibirás <strong>$${cantidad.toLocaleString('en-US')}</strong> de capital.</p>
        <p class="money-payment-note">Pago único de US$ ${precioUsd.toFixed(2)} procesado por PayPal.</p>
        <div id="paypalMoneyButton" style="margin-top:16px; min-height:42px;"></div>
        <p id="paypalMoneyStatus" class="money-payment-note" style="margin-top:8px;">Cargando PayPal...</p>
    `;
    const confirmBtn = document.getElementById('modalConfirmBtn');
    if (confirmBtn) confirmBtn.style.display = 'none';
    document.getElementById('modalConfirm').classList.add('active');
    renderPaypalMoneyButton();
}

async function renderPaypalMoneyButton() {
    const status = document.getElementById('paypalMoneyStatus');
    const container = document.getElementById('paypalMoneyButton');
    if (!container || !compraDineroPendiente) return;
    if (!String(window.PAYPAL_CLIENT_ID || '').trim()) {
        if (status) status.innerText = 'Configura PAYPAL_CLIENT_ID para mostrar el botón.';
        return;
    }
    try {
        const paypalApi = await cargarPaypalSdk();
        if (!paypalApi) throw new Error('PayPal no está disponible');
        await paypalApi.Buttons({
            createOrder: (_, actions) => actions.order.create({
                purchase_units: [{
                    description: `Capital de $${compraDineroPendiente.cantidad.toLocaleString('en-US')}`,
                    amount: { currency_code: window.PAYPAL_CURRENCY || 'USD', value: compraDineroPendiente.precioUsd.toFixed(2) }
                }]
            }),
            onApprove: async (_, actions) => {
                await actions.order.capture();
                acreditarCompraDinero();
            },
            onError: () => toast('PayPal no pudo procesar el pago.', 'error')
        }).render('#paypalMoneyButton');
        if (status) status.innerText = 'Pago seguro procesado por PayPal.';
    } catch (error) {
        if (status) status.innerText = 'No se pudo cargar PayPal. Revisa tu conexión.';
        console.error('PayPal:', error);
    }
}

function acreditarCompraDinero() {
    if (!compraDineroPendiente) return;
    const { cantidad } = compraDineroPendiente;
    compraDineroPendiente = null;
    cerrarModal();
    capital += cantidad;
    actualizarTodo();
    guardar();
    toast(`Capital añadido: $${cantidad.toLocaleString('en-US')}`, 'success');
}

async function cargarPaypalSdk() {
    if (window.paypal) return window.paypal;
    const clientId = String(window.PAYPAL_CLIENT_ID || '').trim();
    if (!clientId) return null;
    await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const currency = window.PAYPAL_CURRENCY || 'USD';
        script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${currency}&intent=capture`;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
    return window.paypal;
}

async function renderPaypalPlanButton(planId) {
    const status = document.getElementById('paypalPlanStatus');
    const container = document.getElementById('paypalPlanButton');
    if (!container) return;
    if (!String(window.PAYPAL_CLIENT_ID || '').trim()) {
        if (status) status.innerText = 'Configura PAYPAL_CLIENT_ID con tu Client ID de Sandbox para mostrar el botón.';
        return;
    }
    try {
        const paypalApi = await cargarPaypalSdk();
        if (!paypalApi) throw new Error('PayPal no está disponible');
        container.innerHTML = '';
        await paypalApi.Buttons({
            createOrder: (_, actions) => actions.order.create({
                purchase_units: [{
                    description: `Plan ${PLANES[planId].nombre}`,
                    amount: { currency_code: window.PAYPAL_CURRENCY || 'USD', value: PLANES[planId].precioPaypalUSD.toFixed(2) }
                }]
            }),
            onApprove: async (_, actions) => {
                await actions.order.capture();
                activarPlanTrasPagoPaypal(planId);
            },
            onError: () => toast('PayPal no pudo procesar el pago.', 'error')
        }).render('#paypalPlanButton');
        if (status) status.innerText = 'Pago seguro procesado por PayPal.';
    } catch (error) {
        if (status) status.innerText = 'No se pudo cargar PayPal. Revisa tu Client ID y conexión.';
        console.error('PayPal:', error);
    }
}

function activarPlanTrasPagoPaypal(planId) {
    if (planPagoPendiente !== planId) return;
    planSeleccionado = planId;
    cerrarModal();
    planPagoPendiente = null;
    activarPlanSeleccionado();
    toast(`Pago aprobado: ${PLANES[planId].precioCOP.toLocaleString('es-CO')} COP`, "success");
}

function confirmarPagoPlan() {
    cerrarModal();
}

async function iniciarJuego() {
    document.getElementById('plansScreen').style.display = 'none';
    renderSidebarMenu();
    initChart();
    dibujarTienda();
    actualizarTodo();
    renderLogros();
    mostrar('panel');
    initAsesores();
    initHabilidades();
    renderReputacion();
    initChartPortafolio();
    initDesafios();
    initQR();
    actualizarFotoPerfil();
    aplicarIdioma();
    toast("Bienvenido de vuelta, " + usuarioActual, "success");

    guardar().catch(e => {
        console.warn("Error guardando progreso en segundo plano:", e);
    });
}

async function guardar(propagateError = false) {
    if (!usuarioActual) return;
    const saveData = {
        capital, xp, nivel, deuda, portafolio,
        g: gananciasTotal, p: perdidasTotal, ti: totalInv, div: dividendosTotal,
        logros: logrosCompletados,
        flags: { profit1k: flagProfit1k, nodebt: flagNoDebt, firstbuy: flagFirstBuy },
        precios: JSON.stringify(preciosMercado),
        asesores: asesoresEstado,
        predicciones: prediccionesActivas,
        predHistorial: prediccionesHistorial,
        habilidades: habilidadesDesbloqueadas,
        reputacion: reputacion,
        eventosRep: eventosReputacion,
        misionesRep: misionesReputacion,
        tarjetaGlobal: tarjetaGlobal,
        historialGlobal: historialGlobal,
        historialBancario: historialBancario,
        puntosHabilidadTotal: puntosHabilidadTotal,
        desafios: desafiosDiarios,
        desafiosCompletados: desafiosCompletadosHoy,
        ultimaActDesafios: ultimaActualizacionDesafios,
        fotoPerfil: usuarioFotoPerfil,
        avatarSeleccionado: avatarSeleccionado,
        preferencias: { moneda: monedaActual },
        plan: planActual,
        mascota: mascotaActual,
        publicId: idPublico,
        googleUserId: googleUserId,
        googleUsernameElegido: googleUsernameElegido,
        usernameElegido: usernameElegido,
        usernameSetupPending: usernamePendiente,
        amigos: amigos,
        friendRequests: solicitudesAmistad,
        cooperativeProjects: proyectosCooperativos
    };
    saveData.sectores = new Set(Object.keys(portafolio).map(empresa => empresaMeta[empresa]?.sector).filter(Boolean)).size;
    if (correoActual) saveData.email = correoActual;
    try {
        await db.saveUser(usuarioActual, saveData);
    } catch (e) {
        console.warn("Error guardando progreso:", e);
        if (propagateError) throw e;
    }
}

function actualizarNombreAjustes() {
    const el = document.getElementById('settingsUserName');
    if (el) el.textContent = usuarioActual || 'Sin sesión';
}

function abrirAjustes() {
    const modal = document.getElementById('settingsModal');
    if (!modal) return;
    limpiarNotificaciones();
    const usernameInput = document.getElementById('settingsUsernameInput');
    if (usernameInput) {
        usernameInput.value = usuarioActual || '';
        toggleSaveUsernameButton();
    }
    const settingsName = document.getElementById('settingsUserName');
    if (settingsName) {
        settingsName.textContent = usuarioActual || 'Sin sesión';
    }
    const currencySelect = document.getElementById('settingsCurrencySelect');
    if (currencySelect) currencySelect.value = monedaActual;
    const profileInput = document.getElementById('settingsProfilePhotoInput');
    if (profileInput) profileInput.value = '';
    actualizarFotoPerfil();
    modal.classList.add('active');
}

function cambiarMonedaDesdeAjustes() {
    const select = document.getElementById('settingsCurrencySelect');
    if (!select || !tiposCambio[select.value]) return;
    monedaActual = select.value;
    actualizarTodo();
    guardar();
}

function abrirMasAjustes() {
    const modal = document.getElementById('extraSettingsModal');
    limpiarNotificaciones();
    document.getElementById('settingsModal')?.classList.remove('active');
    const currencySelect = document.getElementById('settingsCurrencySelect');
    if (currencySelect) currencySelect.value = monedaActual;
    if (modal) modal.classList.add('active');
}

function cerrarMasAjustes(reabrirAjustes = true) {
    const modal = document.getElementById('extraSettingsModal');
    if (modal) modal.classList.remove('active');
    if (reabrirAjustes) document.getElementById('settingsModal')?.classList.add('active');
}

function abrirPerfil() {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    limpiarNotificaciones();
    actualizarFotoPerfil();
    actualizarAvatarCuerpoCompleto();
    const valores = {
        profileName: usuarioActual || 'Sin sesión',
        profilePublicId: formatearIdPublico(idPublico),
        profilePlan: planActual && PLANES[planActual] ? `Plan ${PLANES[planActual].nombre}` : 'Plan sin elegir',
        profileCapital: formatD(capital),
        profileNetWorth: formatD(calcNeto()),
        profileLevel: nivel,
        profileExperience: `${xp} / ${calcXPMax()} XP`,
        profileInvestments: totalInv,
        profileReputation: reputacion,
        profileProfits: formatD(gananciasTotal),
        profileLosses: formatD(perdidasTotal),
        profileAchievements: `${logrosCompletados.length} / ${LOGROS_DEF.length}`
    };
    Object.entries(valores).forEach(([id, valor]) => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = valor;
    });
    renderAvataresPerfil();
    renderMascotas();
    modal.classList.add('active');
}

function crearPiezaGeometrica(grupo, geometria, material, posicion, escala = [1, 1, 1]) {
    const pieza = new THREE.Mesh(geometria, material);
    pieza.position.set(...posicion);
    pieza.scale.set(...escala);
    pieza.castShadow = true;
    grupo.add(pieza);
    return pieza;
}

function crearModeloMascota(mascota) {
    const grupo = new THREE.Group();
    const colores = {
        toro: 0x9b4d32, oso: 0x6b4632, buho: 0x76533c, zorro: 0xd86627, aguila: 0x5b463d,
        gato: 0xd49b57, dragon: 0x2e9c77, robot: 0x9aa8c8, pinguino: 0x34485e, pulpo: 0xe85b91
    };
    const color = colores[mascota.id] || 0x00d4ff;
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: mascota.id === 'robot' ? 0.65 : 0.05 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4, metalness: 0.2 });
    const accent = new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: 0x003d55, emissiveIntensity: 1.4 });
    crearPiezaGeometrica(grupo, new THREE.SphereGeometry(0.68, 20, 14), material, [0, -0.18, 0]);
    crearPiezaGeometrica(grupo, new THREE.SphereGeometry(0.5, 20, 14), material, [0, 0.58, 0.02], [1, 0.9, 0.9]);
    crearPiezaGeometrica(grupo, new THREE.SphereGeometry(0.075, 12, 8), accent, [-0.19, 0.66, 0.43]);
    crearPiezaGeometrica(grupo, new THREE.SphereGeometry(0.075, 12, 8), accent, [0.19, 0.66, 0.43]);
    for (const x of [-0.38, 0.38]) crearPiezaGeometrica(grupo, new THREE.CapsuleGeometry(0.11, 0.48, 6, 12), dark, [x, -0.82, 0]);
    if (mascota.id === 'robot') {
        crearPiezaGeometrica(grupo, new THREE.BoxGeometry(0.7, 0.42, 0.08), accent, [0, 0.58, 0.47]);
        crearPiezaGeometrica(grupo, new THREE.CylinderGeometry(0.06, 0.06, 0.3, 10), accent, [-0.35, 1.05, 0]);
        crearPiezaGeometrica(grupo, new THREE.CylinderGeometry(0.06, 0.06, 0.3, 10), accent, [0.35, 1.05, 0]);
    } else if (mascota.id === 'pulpo') {
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            crearPiezaGeometrica(grupo, new THREE.CapsuleGeometry(0.08, 0.45, 5, 10), material, [Math.cos(angle) * 0.55, -0.78, Math.sin(angle) * 0.2], [1, 1, 1.2]);
        }
    } else {
        const orejas = mascota.id === 'aguila' ? [[-0.48, 0.76, 0], [0.48, 0.76, 0]] : [[-0.32, 0.98, 0], [0.32, 0.98, 0]];
        orejas.forEach(posicion => crearPiezaGeometrica(grupo, new THREE.ConeGeometry(0.2, 0.42, 8), material, posicion));
    }
    if (mascota.id === 'dragon' || mascota.id === 'aguila') {
        crearPiezaGeometrica(grupo, new THREE.ConeGeometry(0.28, 0.95, 4), accent, [0, 0.05, -0.62], [1, 1, 0.35]);
    }
    grupo.userData.baseY = 0;
    return grupo;
}

function renderMascota3D(mascota) {
    const contenedor = document.getElementById('profilePetDisplay');
    if (!contenedor) return;
    if (typeof THREE === 'undefined') {
        renderMascota2D(mascota);
        return;
    }
    try {
        if (!petScene) {
        const escena = new THREE.Scene();
        const camara = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        camara.position.set(0, 0.15, 4.2);
        camara.lookAt(0, 0, 0);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(contenedor.clientWidth || 132, contenedor.clientHeight || 132, false);
        renderer.shadowMap.enabled = true;
        contenedor.replaceChildren(renderer.domElement);
        escena.add(new THREE.HemisphereLight(0xbbeeff, 0x101522, 2.1));
        const luz = new THREE.DirectionalLight(0xffffff, 2.6);
        luz.position.set(2, 3, 4);
        luz.castShadow = true;
        escena.add(luz);
        petScene = { escena, camara, renderer };
        const redimensionar = () => {
            const ancho = contenedor.clientWidth || 132;
            const alto = contenedor.clientHeight || 132;
            petScene.camara.aspect = ancho / alto;
            petScene.camara.updateProjectionMatrix();
            petScene.renderer.setSize(ancho, alto, false);
        };
        window.addEventListener('resize', redimensionar);
        const animar = tiempo => {
            if (!petScene) return;
            if (petModel) {
                petModel.rotation.y = Math.sin(tiempo * 0.00055) * 0.32;
                petModel.position.y = Math.sin(tiempo * 0.0022) * 0.06;
                petModel.scale.setScalar(1 + Math.sin(tiempo * 0.0022) * 0.018);
            }
            petScene.renderer.render(petScene.escena, petScene.camara);
            petAnimationFrame = requestAnimationFrame(animar);
        };
            petAnimationFrame = requestAnimationFrame(animar);
        }
        if (petModel) petScene.escena.remove(petModel);
        petModel = crearModeloMascota(mascota);
        petModel.rotation.y = -0.15;
        petScene.escena.add(petModel);
    } catch (error) {
        console.warn('No se pudo iniciar la mascota 3D:', error);
        petScene = null;
        petModel = null;
        contenedor.replaceChildren();
        renderMascota2D(mascota);
    }
}

function renderMascota2D(mascota) {
    const contenedor = document.getElementById('profilePetDisplay');
    if (!contenedor) return;
    if (petAnimationFrame) cancelAnimationFrame(petAnimationFrame);
    const imagen = document.createElement('img');
    imagen.src = getAssetUrl(`assets/mascotas/${mascota.id}.png`);
    imagen.alt = mascota.nombre;
    imagen.className = 'profile-pet-image';
    imagen.onerror = () => {
        imagen.replaceWith(document.createTextNode(mascota.emoji));
    };
    contenedor.replaceChildren(imagen);
    contenedor.classList.remove('pet-floating');
    void imagen.offsetWidth;
    contenedor.classList.add('pet-floating');
}

function renderMascotas() {
    const mascota = MASCOTAS.find(item => item.id === mascotaActual.id) || MASCOTAS[0];
    const nivel = Math.min(20, Math.max(1, Number(mascotaActual.nivel) || 1));
    const bonus = Math.min(30, nivel * 1.5);
    const etapa = Math.floor(nivel / 5);
    const evolucion = nivel >= 20 ? 'MAX · Evolucionada' : etapa > 0 ? `Etapa ${etapa} · Evoluciona en nivel ${Math.min(20, (etapa + 1) * 5)}` : `Base · Evoluciona en nivel 5`;
    const rareza = nivel >= 20 ? 'Legendaria' : nivel >= 15 ? 'Épica' : nivel >= 10 ? 'Rara' : nivel >= 5 ? 'Poco común' : 'Común';
    const display = document.getElementById('profilePetDisplay');
    const name = document.getElementById('profilePetName');
    const status = document.getElementById('profilePetStatus');
    const perks = document.getElementById('profilePetPerks');
    const grid = document.getElementById('profilePetsGrid');
    renderMascota3D(mascota);
    if (name) name.textContent = `${mascotaActual.nombre || mascota.nombre} · Nivel ${nivel}`;
    const description = document.getElementById('profilePetDescription');
    if (description) description.textContent = mascota.descripcion;
    if (status) status.textContent = `${mascota.especialidad} · Estado: ${mascotaActual.animo}`;
    if (perks) {
        const extra = nivel >= 20 ? `MAX · Evolución completa · +${bonus}% de bonus` : `+${bonus}% de bonus de inversión`;
        perks.textContent = extra;
    }
    const petBonus = planActual === 'pro' ? '+30% XP de mascota' : planActual === 'premium' ? '+15% XP de mascota' : 'Bonificación base';
    const petValues = {
        profilePetSpecialty: mascota.especialidad,
        profilePetLevel: nivel,
        profilePetExperience: `${mascotaActual.xp} XP`,
        profilePetMood: mascotaActual.animo,
        profilePetBonus: `+${bonus}% · ${petBonus}`,
        profilePetBond: `${mascotaActual.vinculo || 0}%`,
        profilePetEvolution: evolucion,
        profilePetRarity: rareza,
        profileSectors: new Set(Object.keys(portafolio).map(empresa => empresaMeta[empresa]?.sector).filter(Boolean)).size
    };
    Object.entries(petValues).forEach(([id, value]) => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = value;
    });
    if (grid) {
        grid.innerHTML = MASCOTAS.map(item => `
            <button type="button" class="profile-pet-option${item.id === mascotaActual.id ? ' selected' : ''}" onclick="seleccionarMascota('${item.id}')" title="${item.especialidad}">
                <img src="${getAssetUrl(`assets/mascotas/${item.id}.png`)}" alt="${item.nombre}" loading="lazy" decoding="async" onerror="this.replaceWith(document.createTextNode('${item.emoji}'))"><small>${item.nombre}</small>
            </button>
        `).join('');
    }
}

function seleccionarMascota(id) {
    const mascota = MASCOTAS.find(item => item.id === id);
    if (!mascota) return;
    mascotaActual = { ...mascotaActual, id: mascota.id, nombre: mascota.nombre };
    renderMascotas();
    guardar();
    cerrarPersonalizarMascota();
}

function togglePersonalizarMascota() {
    const modal = document.getElementById('petCustomizeModal');
    limpiarNotificaciones();
    if (modal) modal.classList.add('active');
}

function cerrarPersonalizarMascota() {
    const modal = document.getElementById('petCustomizeModal');
    if (modal) modal.classList.remove('active');
}

function cerrarPerfil() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.remove('active');
}

function triggerProfileInput(event, inputId = 'settingsProfilePhotoInput') {
    event?.stopPropagation();
    const input = document.getElementById(inputId);
    if (input) input.click();
}

function submitPasswordChange() {
    const currentPassword = document.getElementById('currentPasswordInput')?.value;
    const newPassword = document.getElementById('newPasswordInput')?.value;
    cambiarPasswordDesdeAjustes(currentPassword, newPassword);
}

async function cambiarPasswordDesdeAjustes(currentPassword, newPassword) {
    if (!usuarioActual) return toast('Inicia sesión para cambiar tu contraseña', 'error');
    if (!currentPassword || !newPassword) return toast('Completa la contraseña actual y la nueva', 'error');
    if (newPassword.length < 4) return toast('La nueva contraseña debe tener al menos 4 caracteres', 'error');
    try {
        await db.changePassword(usuarioActual, currentPassword, newPassword);
        document.getElementById('currentPasswordInput').value = '';
        document.getElementById('newPasswordInput').value = '';
        document.getElementById('passwordChangeBoxSeguridad')?.classList.add('hidden');
        toast('Contraseña actualizada correctamente', 'success');
    } catch (e) {
        toast(e.message || 'No se pudo cambiar la contraseña', 'error');
    }
}

function saveUsernameFromInput(event) {
    if (event && event.preventDefault) event.preventDefault();
    const input = document.getElementById('settingsUsernameInput');
    const saveButton = document.getElementById('saveUsernameButton');
    if (!input) return;
    const newName = input.value.trim();
    if (!newName || newName.length < 3) return toast('El usuario debe tener al menos 3 caracteres', 'error');
    if (newName === usuarioActual) {
        if (saveButton) saveButton.classList.add('hidden');
        return toast('No hay cambios para guardar', 'info');
    }
    cambiarNombreActual(newName, saveButton);
}

async function cambiarNombreActual(newName, saveButton) {
    if (!usuarioActual) return toast('Inicia sesión para cambiar tu nombre', 'error');
    const normalizedName = newName.toLowerCase();
    try {
        const response = await db.changeUsername(usuarioActual, '', normalizedName);
        if (response && response.token) {
            db.token = response.token;
            sessionStorage.setItem('imperio_session_token', response.token);
        }
        usuarioActual = normalizedName;
        actualizarNombreAjustes();
        if (saveButton) saveButton.classList.add('hidden');
        toast('Nombre actualizado correctamente', 'success');
    } catch (e) {
        toast(e.message || 'No se pudo cambiar el nombre', 'error');
    }
}

function toggleSaveUsernameButton() {
    const input = document.getElementById('settingsUsernameInput');
    const saveButton = document.getElementById('saveUsernameButton');
    if (!input || !saveButton) return;
    const newName = input.value.trim();
    if (newName && newName !== usuarioActual && newName.length >= 3) {
        saveButton.classList.remove('hidden');
    } else {
        saveButton.classList.add('hidden');
    }
}

function securityDeleteAction() {
    if (!usuarioActual) return toast('No hay sesión activa', 'error');
    cerrarAjustes();
    abrirModalDelete();
}

function toggleNameEdit() {
    const box = document.getElementById('usuarioProfileBox');
    if (!box) return;
    box.classList.toggle('hidden');
}

function togglePasswordChange() {
    const boxes = [
        document.getElementById('passwordChangeBox'),
        document.getElementById('passwordChangeBoxSeguridad')
    ].filter(Boolean);
    boxes.forEach(box => box.classList.toggle('hidden'));
}

function showSettingsSection(sectionId, button) {
    document.querySelectorAll('.settings-section').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
    const section = document.getElementById(sectionId);
    if (section) section.classList.remove('hidden');
    if (button) button.classList.add('active');
    document.getElementById('passwordChangeBox')?.classList.add('hidden');
    document.getElementById('passwordChangeBoxSeguridad')?.classList.add('hidden');
    document.getElementById('usuarioProfileBox')?.classList.add('hidden');
}

function showSettingsSectionById(sectionId) {
    const tabButton = Array.from(document.querySelectorAll('.settings-tab')).find(btn => btn.getAttribute('onclick')?.includes(sectionId));
    showSettingsSection(sectionId, tabButton);
}

function cerrarAjustes() {
    const modal = document.getElementById('settingsModal');
    if (modal) modal.classList.remove('active');
}

function actualizarFotoPerfil() {
    const avatar = document.getElementById('headerProfilePhoto');
    const preview = document.getElementById('settingsProfilePhotoPreview');
    const profilePhoto = document.getElementById('profilePhotoDisplay');
    const fotoUrl = usuarioFotoPerfil && !usuarioFotoPerfil.startsWith('data:image/')
        ? getAssetUrl(usuarioFotoPerfil)
        : usuarioFotoPerfil;
    const foto = fotoUrl ? `url("${fotoUrl}")` : '';
    [avatar, profilePhoto].filter(Boolean).forEach(elemento => {
        elemento.style.backgroundImage = foto;
        elemento.style.backgroundSize = 'cover';
        elemento.style.backgroundPosition = 'center';
        elemento.textContent = '';
    });
    if (preview) {
        preview.innerHTML = usuarioFotoPerfil
            ? `<img src="${fotoUrl}" alt="Foto de perfil" loading="lazy" decoding="async" onerror="this.replaceWith(document.createTextNode('👤'))">`
            : '';
    }
}

function renderAvataresPerfil() {
    const grid = document.getElementById('profileAvatarsGrid');
    if (!grid) return;
    grid.innerHTML = FOTOS_PERFIL_PREDETERMINADAS.map((foto, index) => `
        <button type="button" class="profile-avatar-option${index === avatarSeleccionado ? ' selected' : ''}" onclick="seleccionarAvatarPerfil(${index}, event)" aria-label="Elegir avatar de cuerpo completo ${index + 1}">
            <img src="${getAssetUrl(foto)}" alt="Avatar ${index + 1}" loading="lazy" decoding="async" onerror="this.replaceWith(document.createTextNode('👤'))">
        </button>
    `).join('');
}

function actualizarAvatarCuerpoCompleto() {
    const avatar = document.getElementById('profileFullAvatar');
    if (!avatar) return;
    avatar.src = getAssetUrl(`assets/avatares/avatar-${String(avatarSeleccionado + 1).padStart(2, '0')}.png?v=6`);
    avatar.onerror = () => {
        avatar.onerror = null;
        avatar.src = getAssetUrl('assets/logos/logo-mark.png');
    };
    avatar.alt = 'Avatar de cuerpo completo';
}

function toggleMenuAvatares(event) {
    event?.stopPropagation();
    document.getElementById('profileAvatarsGrid')?.classList.toggle('open');
}

function seleccionarAvatarPerfil(index, event) {
    event?.preventDefault();
    event?.stopPropagation();
    if (!Number.isInteger(index) || index < 0 || index >= FOTOS_PERFIL_PREDETERMINADAS.length) return;
    avatarSeleccionado = index;
    actualizarAvatarCuerpoCompleto();
    if (!usuarioFotoPerfil.startsWith('data:image/')) {
        usuarioFotoPerfil = FOTOS_PERFIL_PREDETERMINADAS[index];
        actualizarFotoPerfil();
    }
    renderAvataresPerfil();
    document.getElementById('profileAvatarsGrid')?.classList.remove('open');
    guardar();
}

function prepararFotoPerfil(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('No se pudo leer la imagen'));
        reader.onload = event => {
            const image = new Image();
            image.onerror = () => reject(new Error('La imagen no es válida'));
            image.onload = () => {
                const maxSize = 512;
                const scale = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
                const canvas = document.createElement('canvas');
                canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
                canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
                canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.82));
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

async function cambiarFotoPerfil(inputId = 'settingsProfilePhotoInput') {
    const input = document.getElementById(inputId);
    if (!input || !input.files || !input.files[0]) {
        return toast('Selecciona una imagen para tu perfil', 'error');
    }
    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
        return toast('Solo se permiten imágenes', 'error');
    }
    try {
        const fotoOptimizada = await prepararFotoPerfil(file);
        usuarioFotoPerfil = fotoOptimizada;
        actualizarFotoPerfil();
        input.value = '';
        await guardar();
        toast('Foto de perfil actualizada', 'success');
    } catch (error) {
        toast(error.message || 'No se pudo actualizar la foto', 'error');
    }
}

async function cambiarNombreDesdeAjustes() {
    if (!usuarioActual) return toast('Inicia sesión para cambiar tu nombre', 'error');
    const newName = document.getElementById('settingsNewName').value.trim();
    const password = document.getElementById('settingsNamePassword').value;
    if (!newName || !password) return toast('Completa el nombre y la contraseña actual', 'error');
    const normalizedName = newName.toLowerCase();
    if (normalizedName.length < 3) return toast('El nombre debe tener al menos 3 caracteres', 'error');
    try {
        const response = await db.changeUsername(usuarioActual, password, normalizedName);
        if (response && response.token) {
            db.token = response.token;
            sessionStorage.setItem('imperio_session_token', response.token);
        }
        usuarioActual = normalizedName;
        actualizarNombreAjustes();
        cerrarAjustes();
        toast('Nombre actualizado correctamente', 'success');
    } catch (e) {
        toast(e.message || 'No se pudo cambiar el nombre', 'error');
    }
}

async function cambiarPasswordDesdeAjustesForm() {
    if (!usuarioActual) return toast('Inicia sesión para cambiar tu contraseña', 'error');
    const currentInput = document.getElementById('settingsCurrentPassword') || document.getElementById('settingsCurrentPassword2');
    const newInput = document.getElementById('settingsNewPassword') || document.getElementById('settingsNewPassword2');
    if (!currentInput || !newInput) return toast('Formulario de contraseña no encontrado', 'error');
    const currentPassword = currentInput.value;
    const newPassword = newInput.value;
    if (!currentPassword || !newPassword) return toast('Completa la contraseña actual y la nueva', 'error');
    if (newPassword.length < 4) return toast('La nueva contraseña debe tener al menos 4 caracteres', 'error');
    try {
        await db.changePassword(usuarioActual, currentPassword, newPassword);
        cerrarAjustes();
        toast('Contraseña actualizada correctamente', 'success');
    } catch (e) {
        toast(e.message || 'No se pudo cambiar la contraseña', 'error');
    }
}

async function eliminarCuentaDesdeAjustes(prompted = false) {
    if (!usuarioActual) return toast('No hay sesión activa', 'error');
    try {
        await db.deleteUser(usuarioActual, '');
        await db.signOutGoogle();
        sessionStorage.removeItem('imperio_session_token');
        db.token = '';
        usuarioActual = '';
        correoActual = '';
        cerrarModalDelete();
        cerrarAjustes();
        toast('Cuenta eliminada correctamente', 'success');
        setTimeout(() => window.location.reload(), 350);
    } catch (e) {
        toast(e.message || 'No se pudo eliminar la cuenta', 'error');
    }
}

function abrirModalDelete() {
    const modal = document.getElementById('modalDeleteAccount');
    const input = document.getElementById('deleteAccountConfirmInput');
    const confirmBtn = document.getElementById('modalDeleteConfirmBtn');
    if (!modal || !input || !confirmBtn) return;
    document.getElementById('extraSettingsModal')?.classList.remove('active');
    cerrarAjustes();
    document.body.appendChild(modal);
    modal.style.zIndex = '20000';
    input.value = '';
    confirmBtn.disabled = true;
    modal.classList.add('active');
    input.focus();
}

function cerrarModalDelete() {
    const modal = document.getElementById('modalDeleteAccount');
    const input = document.getElementById('deleteAccountConfirmInput');
    const confirmBtn = document.getElementById('modalDeleteConfirmBtn');
    if (modal) modal.classList.remove('active');
    if (input) input.value = '';
    if (confirmBtn) confirmBtn.disabled = true;
}

function updateDeleteConfirmButton() {
    const input = document.getElementById('deleteAccountConfirmInput');
    const confirmBtn = document.getElementById('modalDeleteConfirmBtn');
    if (!input || !confirmBtn) return;
    confirmBtn.disabled = input.value.trim().toUpperCase() !== 'CONFIRM ACCOUNT DELETION';
}

async function confirmDeleteAccount() {
    const input = document.getElementById('deleteAccountConfirmInput');
    if (!input) return;
    if (input.value.trim().toUpperCase() !== 'CONFIRM ACCOUNT DELETION') {
        return toast('Escribe "CONFIRM ACCOUNT DELETION" para confirmar', 'error');
    }
    await eliminarCuentaDesdeAjustes(true);
}

async function cerrarSesion() {
    try {
        await db.signOutAuth();
    } catch (error) {
        console.warn('No se pudo cerrar sesión en Google:', error);
    }
    sessionStorage.removeItem('imperio_session_token');
    db.token = '';
    usuarioActual = '';
    correoActual = '';
    cerrarAjustes();
    toast('Sesión cerrada', 'info');
    setTimeout(() => window.location.reload(), 250);
}

// Guardado automatico cada 15s
setInterval(() => { if(usuarioActual) guardar(); }, 15000);

// ==========================================
// UTILIDADES DE CALCULO
// ==========================================
const formatD = (n) => new Intl.NumberFormat('es', {style:'currency', currency: monedaActual || 'USD'}).format(Number(n || 0) * (tiposCambio[monedaActual] || 1));
const formatUSD = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n || 0));

function formatearMontoInversion(input) {
    const digits = String(input.value || '').replace(/\D/g, '');
    input.value = digits ? Number(digits).toLocaleString('es-CO') : '';
}

function leerMontoInversion(value) {
    const digits = String(value || '').replace(/\D/g, '');
    return digits ? Number(digits) / (tiposCambio[monedaActual] || 1) : 0;
}

function calcNeto() {
    let valorActivos = Object.keys(portafolio).reduce((acc, e) => acc + (portafolio[e].cant * preciosMercado[e]), 0);
    return getCapitalConTarjeta() + valorActivos - deuda;
}

function calcularValorActivos() {
    return Object.keys(portafolio).reduce((acc, e) => acc + (portafolio[e].cant * preciosMercado[e]), 0);
}

function getCapitalConTarjeta() {
    return capital + (tarjetaGlobal.saldo || 0);
}

function calcXPMax() { return nivel * 1000; }

function empresaEnPortafolioDeSector(sector) {
    return Object.keys(portafolio).some(emp => empresaMeta[emp] && empresaMeta[emp].sector === sector);
}

function hasSectors(list) {
    return list.every(s => empresaEnPortafolioDeSector(s));
}

function getPatrimonioNeto() {
    let valorActivos = Object.keys(portafolio).reduce((acc, e) => acc + (portafolio[e].cant * preciosMercado[e]), 0);
    return getCapitalConTarjeta() + valorActivos - deuda;
}

// Salario escalonado segun patrimonio
function getSalarioEscalonado(salarioBase) {
    let pat = getPatrimonioNeto();
    if (pat < 50000) return Math.round(salarioBase * 0.3);
    if (pat < 150000) return Math.round(salarioBase * 0.5);
    if (pat < 500000) return Math.round(salarioBase * 0.75);
    if (pat < 1000000) return Math.round(salarioBase * 1.0);
    if (pat < 3000000) return Math.round(salarioBase * 1.5);
    if (pat < 10000000) return Math.round(salarioBase * 2.0);
    return Math.round(salarioBase * 3.0);
}

// ==========================================
// SISTEMA DE LOGROS
// ==========================================
const LOGROS_DEF = [
    // === BASICOS (1-20) ===
    {id:"firstbuy", titulo:"Primer Inversor", desc:"Realiza tu primera compra de acciones.", xp:50, check:()=>flagFirstBuy},
    {id:"firstsell", titulo:"Primer Vendedor", desc:"Realiza tu primera venta de acciones.", xp:50, check:()=>totalInv>=2},
    {id:"diversify3", titulo:"Diversificador Principiante", desc:"Ten al menos 3 empresas diferentes.", xp:100, check:()=>Object.keys(portafolio).length>=3},
    {id:"diversify5", titulo:"Cartera Diversificada", desc:"Ten al menos 5 empresas diferentes.", xp:200, check:()=>Object.keys(portafolio).length>=5},
    {id:"diversify10", titulo:"Portafolio Variado", desc:"Ten al menos 10 empresas diferentes.", xp:400, check:()=>Object.keys(portafolio).length>=10},
    {id:"diversify20", titulo:"Maestro de la Diversificacion", desc:"Ten al menos 20 empresas diferentes.", xp:800, check:()=>Object.keys(portafolio).length>=20},
    {id:"level3", titulo:"Ascenso Garantizado", desc:"Alcanza el nivel 3.", xp:300, check:()=>nivel>=3},
    {id:"level5", titulo:"Experto en Accion", desc:"Alcanza el nivel 5.", xp:600, check:()=>nivel>=5},
    {id:"level8", titulo:"Elite del Mercado", desc:"Alcanza el nivel 30.", xp:1200, check:()=>nivel>=30},
    {id:"level10", titulo:"Leyenda Viva", desc:"Alcanza el nivel 10.", xp:2500, check:()=>nivel>=10},
    {id:"level15", titulo:"Semi-Dios Financiero", desc:"Alcanza el nivel 15.", xp:5000, check:()=>nivel>=15},
    {id:"level20", titulo:"Dios del Dinero", desc:"Alcanza el nivel 20.", xp:10000, check:()=>nivel>=20},
    {id:"profit1k", titulo:"Primer Gran Beneficio", desc:"Gana mas de $1,000 en una sola venta.", xp:150, check:()=>flagProfit1k},
    {id:"profit5k", titulo:"Ganancia Significativa", desc:"Gana mas de $5,000 en una sola venta.", xp:500, check:()=>gananciasTotal>=5000},
    {id:"profit10k", titulo:"Golpe Maestro", desc:"Gana mas de $10,000 en una sola venta.", xp:1000, check:()=>gananciasTotal>=10000},
    {id:"profit50k", titulo:"Transaccion Historica", desc:"Gana mas de $50,000 en una sola venta.", xp:3000, check:()=>gananciasTotal>=50000},
    {id:"nodebt", titulo:"Libertad Financiera", desc:"Paga una deuda completamente.", xp:200, check:()=>flagNoDebt},
    {id:"nodebt5", titulo:"Angel del Credito", desc:"Paga 5 prestamos completamente.", xp:800, check:()=>flagNoDebt && totalInv>=20},
    {id:"capital50k", titulo:"Ahorrador", desc:"Mantén $50,000 en capital disponible.", xp:150, check:()=>capital>=50000},
    {id:"capital200k", titulo:"Capital Fuerte", desc:"Mantén $200,000 en capital disponible.", xp:600, check:()=>capital>=200000},

    // === PATRIMONIO (21-40) ===
    {id:"neto200k", titulo:"Patrimonio Creciente", desc:"Alcanza un patrimonio neto de $200,000.", xp:350, check:()=>calcNeto()>=200000},
    {id:"neto500k", titulo:"Medio Millonario", desc:"Alcanza un patrimonio neto de $500,000.", xp:700, check:()=>calcNeto()>=500000},
    {id:"million", titulo:"Millonario", desc:"Alcanza un patrimonio neto superior a $1,000,000.", xp:1000, check:()=>calcNeto()>1000000},
    {id:"multi2m", titulo:"Multimillonario", desc:"Alcanza un patrimonio neto de $2,000,000.", xp:1500, check:()=>calcNeto()>=2000000},
    {id:"empire", titulo:"Magnate Supremo", desc:"Alcanza un patrimonio de $5,000,000.", xp:2000, check:()=>calcNeto()>5000000},
    {id:"empire10m", titulo:"Emperador del Capital", desc:"Alcanza un patrimonio de $10,000,000.", xp:5000, check:()=>calcNeto()>=10000000},
    {id:"empire50m", titulo:"Dios de la Economia", desc:"Alcanza un patrimonio de $50,000,000.", xp:10000, check:()=>calcNeto()>=50000000},
    {id:"trader", titulo:"Trader Activo", desc:"Realiza 20 operaciones de compra/venta.", xp:300, check:()=>totalInv>=20},
    {id:"trader50", titulo:"Inversor Profesional", desc:"Realiza 50 operaciones.", xp:600, check:()=>totalInv>=50},
    {id:"trader100", titulo:"Inversor Intensivo", desc:"Realiza 100 operaciones.", xp:1200, check:()=>totalInv>=100},
    {id:"trader200", titulo:"Maniaco del Trading", desc:"Realiza 200 operaciones.", xp:2500, check:()=>totalInv>=200},
    {id:"trader500", titulo:"Maquina de Inversion", desc:"Realiza 500 operaciones.", xp:5000, check:()=>totalInv>=500},
    {id:"div1k", titulo:"Primeros Dividendos", desc:"Recibe $1,000 en dividendos totales.", xp:200, check:()=>dividendosTotal>=1000},
    {id:"div10k", titulo:"Rey de los Dividendos", desc:"Recibe $10,000 en dividendos totales.", xp:800, check:()=>dividendosTotal>=10000},
    {id:"div50k", titulo:"Imperio de Dividendos", desc:"Recibe $50,000 en dividendos totales.", xp:2000, check:()=>dividendosTotal>=50000},
    {id:"prestamo1", titulo:"Primer Prestamo", desc:"Solicita tu primer credito.", xp:100, check:()=>prestamosActivos>=1},
    {id:"prestamo5", titulo:"Cliente Bancario", desc:"Solicita 5 prestamos a lo largo del juego.", xp:500, check:()=>prestamosActivos>=5},
    {id:"ganancia100k", titulo:"Cien Mil de Ganancia", desc:"Acumula $100,000 en ganancias totales.", xp:1000, check:()=>gananciasTotal>=100000},
    {id:"ganancia500k", titulo:"Medio Millon Ganado", desc:"Acumula $500,000 en ganancias totales.", xp:3000, check:()=>gananciasTotal>=500000},

    // === SECTORES (41-65) ===
    {id:"risky", titulo:"Alta Volatilidad", desc:"Posee al menos una accion del sector Criptomonedas o IA.", xp:150, check:()=>hasSectors(["Criptomonedas"]) || hasSectors(["IA"])},
    {id:"stable", titulo:"Inversor Conservador", desc:"Ten acciones de Salud y Consumo simultaneamente.", xp:150, check:()=>hasSectors(["Salud","Consumo"])},
    {id:"energy", titulo:"Energia Limpia", desc:"Invierte en el sector Energia desbloqueado (Nivel 2+).", xp:100, check:()=>nivel>=2 && hasSectors(["Energia"])},
    {id:"retail", titulo:"Rey del Retail", desc:"Ten 3 empresas del sector Retail en tu portafolio.", xp:250, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Retail") c+=portafolio[e].cant;}); return c>=3;}},
    {id:"retail5", titulo:"Imperio del Retail", desc:"Ten 5 empresas del sector Retail.", xp:500, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Retail") c++;}); return c>=5;}},
    {id:"tech5", titulo:"Fanatico de la Tecnologia", desc:"Ten 5 empresas del sector Tecnologia.", xp:300, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Tecnologia") c++;}); return c>=5;}},
    {id:"tech10", titulo:"Silicon Valley Local", desc:"Ten 10 empresas del sector Tecnologia.", xp:700, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Tecnologia") c++;}); return c>=10;}},
    {id:"finanzas3", titulo:"Banca Personal", desc:"Ten 3 empresas del sector Finanzas.", xp:200, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Finanzas") c++;}); return c>=3;}},
    {id:"salud3", titulo:"Doctor de Inversiones", desc:"Ten 3 empresas del sector Salud.", xp:200, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Salud") c++;}); return c>=3;}},
    {id:"energia3", titulo:"Baron del Petroleo", desc:"Ten 3 empresas del sector Energia.", xp:200, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Energia") c++;}); return c>=3;}},
    {id:"consumo3", titulo:"Consumista Inversor", desc:"Ten 3 empresas del sector Consumo.", xp:200, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Consumo") c++;}); return c>=3;}},
    {id:"auto3", titulo:"Coleccionista de Autos", desc:"Ten 3 empresas del sector Automotriz.", xp:250, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Automotriz") c++;}); return c>=3;}},
    {id:"crypto1", titulo:"Entusiasta Cripto", desc:"Ten al menos una criptomoneda.", xp:150, check:()=>hasSectors(["Criptomonedas"])},
    {id:"crypto5", titulo:"Cripto-Millonario", desc:"Ten 5 criptomonedas diferentes.", xp:600, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Criptomonedas") c++;}); return c>=5;}},
    {id:"ia1", titulo:"Visionario IA", desc:"Ten al menos una empresa de IA.", xp:200, check:()=>hasSectors(["IA"])},
    {id:"ia5", titulo:"Lord de la IA", desc:"Ten 5 empresas de IA.", xp:1000, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="IA") c++;}); return c>=5;}},
    {id:"entretenimiento3", titulo:"Productor de Cine", desc:"Ten 3 empresas de Entretenimiento.", xp:200, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Entretenimiento") c++;}); return c>=3;}},
    {id:"construccion3", titulo:"Constructor", desc:"Ten 3 empresas de Construccion.", xp:200, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Construccion") c++;}); return c>=3;}},
    {id:"agricultura3", titulo:"Agricultor", desc:"Ten 3 empresas de Agricultura.", xp:200, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Agricultura") c++;}); return c>=3;}},
    {id:"telecom3", titulo:"Conectado", desc:"Ten 3 empresas de Telecomunicaciones.", xp:200, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Telecomunicaciones") c++;}); return c>=3;}},
    {id:"turismo3", titulo:"Viajero", desc:"Ten 3 empresas de Turismo.", xp:200, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Turismo") c++;}); return c>=3;}},
    {id:"mineria3", titulo:"Minero", desc:"Ten 3 empresas de Mineria.", xp:250, check:()=>{let c=0; Object.keys(portafolio).forEach(e=>{if(empresaMeta[e]&&empresaMeta[e].sector==="Mineria") c++;}); return c>=3;}},
    {id:"sectores8", titulo:"Polivalente", desc:"Invierte en 8 sectores diferentes.", xp:500, check:()=>new Set(Object.keys(portafolio).map(e=>empresaMeta[e]?.sector).filter(Boolean)).size>=8},
    {id:"sectores12", titulo:"Conquistador de Mercados", desc:"Invierte en 12 sectores diferentes.", xp:1200, check:()=>new Set(Object.keys(portafolio).map(e=>empresaMeta[e]?.sector).filter(Boolean)).size>=12},
    {id:"sectores15", titulo:"Dios de la Diversificacion", desc:"Invierte en todos los sectores disponibles.", xp:2500, check:()=>new Set(Object.keys(portafolio).map(e=>empresaMeta[e]?.sector).filter(Boolean)).size>=15},

    // === ASESORES Y PREDICCIONES (66-85) ===
    {id:"asesor1", titulo:"Primer Asesor", desc:"Contrata tu primer asesor financiero.", xp:150, check:()=>Object.values(asesoresEstado).some(e=>e.contratado)},
    {id:"asesor3", titulo:"Equipo de Expertos", desc:"Contrata 3 asesores simultaneamente.", xp:400, check:()=>Object.values(asesoresEstado).filter(e=>e.contratado).length>=3},
    {id:"asesor5", titulo:"Consejo de Sabios", desc:"Contrata 5 asesores simultaneamente.", xp:800, check:()=>Object.values(asesoresEstado).filter(e=>e.contratado).length>=5},
    {id:"asesor8", titulo:"Ejercito de Analistas", desc:"Contrata 8 asesores simultaneamente.", xp:1500, check:()=>Object.values(asesoresEstado).filter(e=>e.contratado).length>=8},
    {id:"asesor10", titulo:"Corte Real", desc:"Contrata 10 asesores simultaneamente.", xp:2500, check:()=>Object.values(asesoresEstado).filter(e=>e.contratado).length>=10},
    {id:"prediccion1", titulo:"Prediccion Acertada", desc:"Un asesor acierta una prediccion.", xp:200, check:()=>prediccionesHistorial.some(p=>p.resultado==='acierto')},
    {id:"prediccion10", titulo:"Visionario", desc:"Acumula 10 predicciones acertadas.", xp:600, check:()=>prediccionesHistorial.filter(p=>p.resultado==='acierto').length>=10},
    {id:"prediccion25", titulo:"Oraculo", desc:"Acumula 25 predicciones acertadas.", xp:1500, check:()=>prediccionesHistorial.filter(p=>p.resultado==='acierto').length>=25},
    {id:"prediccion50", titulo:"Vidente Supremo", desc:"Acumula 50 predicciones acertadas.", xp:3000, check:()=>prediccionesHistorial.filter(p=>p.resultado==='acierto').length>=50},
    {id:"nivelasesor3", titulo:"Mentor", desc:"Sube un asesor a nivel 3.", xp:300, check:()=>Object.values(asesoresEstado).some(e=>e.nivel>=3)},
    {id:"nivelasesor5", titulo:"Maestro", desc:"Sube un asesor a nivel 5 (maximo).", xp:800, check:()=>Object.values(asesoresEstado).some(e=>e.nivel>=5)},
    {id:"asesor_oracle", titulo:"Poseedor del Oraculo", desc:"Contrata a Morgan F. (el Oraculo).", xp:1000, check:()=>asesoresEstado['oracle']?.contratado},
    {id:"asesor_legend", titulo:"Consejero Legendario", desc:"Contrata a Arthur P. (Legendario).", xp:1000, check:()=>asesoresEstado['legend']?.contratado},
    {id:"gastoasesores10k", titulo:"Inversor en Conocimiento", desc:"Gasta $10,000 en salarios de asesores.", xp:400, check:()=>{let t=0; Object.keys(asesoresEstado).forEach(k=>{let a=ASESORES_DEF.find(x=>x.id===k); if(a&&asesoresEstado[k].contratado) t+=getSalario(k,asesoresEstado[k].nivel);}); return t>=10000;}},
    {id:"asesor_despedir", titulo:"Despedida Dolorosa", desc:"Despide a un asesor.", xp:50, check:()=>false},
    {id:"asesor_all", titulo:"Coleccion Completa", desc:"Contrata todos los asesores disponibles.", xp:3000, check:()=>ASESORES_DEF.every(a=>asesoresEstado[a.id]?.contratado)},
    {id:"prediccion_streak3", titulo:"Racha de Aciertos", desc:"3 predicciones acertadas seguidas.", xp:500, check:()=>{let h=prediccionesHistorial.slice(-10); let s=0,maxS=0; h.forEach(p=>{if(p.resultado==='acierto'){s++;maxS=Math.max(maxS,s);}else s=0;}); return maxS>=3;}},
    {id:"prediccion_streak5", titulo:"Racha Perfecta", desc:"5 predicciones acertadas seguidas.", xp:1200, check:()=>{let h=prediccionesHistorial.slice(-20); let s=0,maxS=0; h.forEach(p=>{if(p.resultado==='acierto'){s++;maxS=Math.max(maxS,s);}else s=0;}); return maxS>=5;}},
    {id:"asesor_especialista", titulo:"Especialista Contratado", desc:"Contrata un asesor especialista (IA, Cripto, Energia, Salud).", xp:300, check:()=>Object.keys(asesoresEstado).some(k=>asesoresEstado[k].contratado && ['IA','Cripto','Energia','Salud'].includes(ASESORES_DEF.find(x=>x.id===k)?.especialidad))},
    {id:"asesor_quant", titulo:"Revolucion Cuantica", desc:"Contrata a Zhang W. (Quant).", xp:500, check:()=>asesoresEstado['quant1']?.contratado},

    // === HABILIDADES Y REPUTACION (86-105) ===
    {id:"habilidad1", titulo:"Primer Poder", desc:"Desbloquea tu primera habilidad.", xp:150, check:()=>Object.values(habilidadesDesbloqueadas).some(n=>n>0)},
    {id:"habilidad5", titulo:"Cinco Poderes", desc:"Desbloquea 5 habilidades al menos a nivel 1.", xp:500, check:()=>Object.values(habilidadesDesbloqueadas).filter(n=>n>0).length>=5},
    {id:"habilidad10", titulo:"Diez Poderes", desc:"Desbloquea 10 habilidades al menos a nivel 1.", xp:1000, check:()=>Object.values(habilidadesDesbloqueadas).filter(n=>n>0).length>=10},
    {id:"habilidad15", titulo:"Semi-Completo", desc:"Desbloquea 15 habilidades al menos a nivel 1.", xp:2000, check:()=>Object.values(habilidadesDesbloqueadas).filter(n=>n>0).length>=15},
    {id:"habilidad_max1", titulo:"Maestria", desc:"Sube una habilidad a nivel maximo (5).", xp:800, check:()=>Object.values(habilidadesDesbloqueadas).some(n=>n>=5)},
    {id:"habilidad_max5", titulo:"Maestro de 5 Artes", desc:"Sube 5 habilidades a nivel maximo.", xp:2500, check:()=>Object.values(habilidadesDesbloqueadas).filter(n=>n>=5).length>=5},
    {id:"ph50", titulo:"Acumulador de PH", desc:"Acumula 50 Puntos de Habilidad totales.", xp:300, check:()=>puntosHabilidadTotal>=50},
    {id:"ph100", titulo:"Cien Puntos de Poder", desc:"Acumula 100 Puntos de Habilidad totales.", xp:800, check:()=>puntosHabilidadTotal>=100},
    {id:"ph200", titulo:"Semi-Dios del Conocimiento", desc:"Acumula 200 Puntos de Habilidad totales.", xp:1500, check:()=>puntosHabilidadTotal>=200},
    {id:"rep60", titulo:"Respetado", desc:"Alcanza 60 de reputacion.", xp:300, check:()=>reputacion>=60},
    {id:"rep80", titulo:"Reconocido", desc:"Alcanza 80 de reputacion.", xp:600, check:()=>reputacion>=80},
    {id:"rep95", titulo:"Celebridad", desc:"Alcanza 95 de reputacion.", xp:1000, check:()=>reputacion>=95},
    {id:"rep100", titulo:"Leyenda del Mercado", desc:"Alcanza 100 de reputacion (maximo).", xp:2000, check:()=>reputacion>=100},
    {id:"mision5", titulo:"Completador de Misiones", desc:"Completa 5 misiones de reputacion.", xp:400, check:()=>eventosReputacion.filter(e=>e.razon.includes('Mision completada')).length>=5},
    {id:"mision20", titulo:"Agente Secreto", desc:"Completa 20 misiones de reputacion.", xp:1200, check:()=>eventosReputacion.filter(e=>e.razon.includes('Mision completada')).length>=20},
    {id:"mision50", titulo:"Espia Financiero", desc:"Completa 50 misiones de reputacion.", xp:2500, check:()=>eventosReputacion.filter(e=>e.razon.includes('Mision completada')).length>=50},
    {id:"rango_celebridad", titulo:"Fama Mundial", desc:"Alcanza el rango Celebridad o superior.", xp:800, check:()=>reputacion>=81},
    {id:"rango_leyenda", titulo:"Eterno", desc:"Alcanza el rango Leyenda.", xp:1500, check:()=>reputacion>=96},
    {id:"rep_evento_pos", titulo:"Buena Fama", desc:"Recibe 10 eventos de reputacion positivos.", xp:300, check:()=>eventosReputacion.filter(e=>e.positivo).length>=10},
    {id:"rep_negativo", titulo:"Controversia", desc:"Recibe un evento de reputacion negativo.", xp:50, check:()=>eventosReputacion.some(e=>!e.positivo)},

    // === DESAFIOS Y EVENTOS (106-120) ===
    {id:"desafio5", titulo:"Retador", desc:"Completa 5 desafios diarios.", xp:200, check:()=>desafiosCompletadosHoy>=5},
    {id:"desafio12", titulo:"Maestro de Desafios", desc:"Completa los 12 desafios diarios en un dia.", xp:800, check:()=>desafiosCompletadosHoy>=12},
    {id:"desafio50", titulo:"Veterano", desc:"Completa 50 desafios diarios acumulados.", xp:1500, check:()=>desafiosCompletadosHoy>=50},
    {id:"evento_boom", titulo:"Aprovecha el Boom", desc:"Beneficiate de un evento mundial tipo Boom.", xp:200, check:()=>eventosReputacion.some(e=>e.razon.includes('Boom'))},
    {id:"evento_crisis", titulo:"Sobreviviente", desc:"Sobrevive a un evento mundial tipo Crisis sin perder mas del 20%.", xp:400, check:()=>false},
    {id:"noticia_pos", titulo:"Lector de Noticias", desc:"Se beneficia de 5 noticias positivas.", xp:200, check:()=>false},
    {id:"noticia_neg", titulo:"Esceptico", desc:"Se beneficia de una noticia negativa (compra en baja).", xp:200, check:()=>false},
    {id:"megaoperacion", titulo:"Mega Operacion", desc:"Compra acciones por valor de $50,000 en una sola transaccion.", xp:600, check:()=>false},
    {id:"megaoperacion100k", titulo:"Operacion Titanica", desc:"Compra acciones por valor de $100,000 en una sola transaccion.", xp:1200, check:()=>false},
    {id:"volumen100", titulo:"Volumen Cien", desc:"Compra 100 acciones en una sola transaccion.", xp:300, check:()=>false},
    {id:"volumen500", titulo:"Volumen Quinientos", desc:"Compra 500 acciones en una sola transaccion.", xp:800, check:()=>false},
    {id:"volumen1000", titulo:"Volumen Mil", desc:"Compra 1,000 acciones en una sola transaccion.", xp:1500, check:()=>false},
    {id:"venta_rapida", titulo:"Scalper", desc:"Vende con ganancia en menos de 60 segundos de compra.", xp:400, check:()=>false},
    {id:"venta_perfecta", titulo:"Venta Perfecta", desc:"Vende con un rendimiento de +20% o mas.", xp:500, check:()=>false},
    {id:"todos_los_sectores", titulo:"Conquistador Universal", desc:"Compra al menos 1 empresa de cada sector.", xp:2000, check:()=>new Set(Object.keys(portafolio).map(e=>empresaMeta[e]?.sector).filter(Boolean)).size>=16},

    // === ESPECIALES Y COMBINACIONES (121-130) ===
    {id:"riconriesgo", titulo:"Rico con Riesgo", desc:"Ten $500,000 patrimonio teniendo deuda activa.", xp:600, check:()=>calcNeto()>=500000 && deuda>0},
    {id:"sindeuda_millon", titulo:"Millonario Limpio", desc:"Alcanza $1,000,000 sin deuda.", xp:1500, check:()=>calcNeto()>=1000000 && deuda<=0},
    {id:"contrario", titulo:"Inversor Contrario", desc:"Compra cuando una accion baja 10% o mas.", xp:300, check:()=>false},
    {id:"longterm", titulo:"Inversor de Largo Plazo", desc:"Mantén una accion por mas de 10 minutos.", xp:400, check:()=>false},
    {id:"todas_tech", titulo:"Fanatico Absoluto", desc:"Ten todas las empresas del sector Tecnologia.", xp:2000, check:()=>{let sec='Tecnologia'; let emp=CATEGORIAS[sec]?.empresas||[]; return emp.length>0 && emp.every(e=>portafolio[e.n]);}},
    {id:"todas_finanzas", titulo:"Banquero", desc:"Ten todas las empresas del sector Finanzas.", xp:1500, check:()=>{let sec='Finanzas'; let emp=CATEGORIAS[sec]?.empresas||[]; return emp.length>0 && emp.every(e=>portafolio[e.n]);}},
    {id:"todas_salud", titulo:"Farmaceutico", desc:"Ten todas las empresas del sector Salud.", xp:1500, check:()=>{let sec='Salud'; let emp=CATEGORIAS[sec]?.empresas||[]; return emp.length>0 && emp.every(e=>portafolio[e.n]);}},
    {id:"todas_crypto", titulo:"Cripto-Dios", desc:"Ten todas las empresas del sector Criptomonedas.", xp:3000, check:()=>{let sec='Criptomonedas'; let emp=CATEGORIAS[sec]?.empresas||[]; return emp.length>0 && emp.every(e=>portafolio[e.n]);}},
    {id:"todas_ia", titulo:"Singularidad", desc:"Ten todas las empresas del sector IA.", xp:5000, check:()=>{let sec='IA'; let emp=CATEGORIAS[sec]?.empresas||[]; return emp.length>0 && emp.every(e=>portafolio[e.n]);}},
    {id:"balance_positivo", titulo:"Siempre Positivo", desc:"Mantén ganancias totales superiores a perdidas totales.", xp:300, check:()=>gananciasTotal>perdidasTotal},
    {id:"xp1000", titulo:"Veterano de XP", desc:"Acumula 1,000 XP.", xp:200, check:()=>xp>=1000 || nivel>=5},
    {id:"xp5000", titulo:"Maestro de XP", desc:"Acumula 5,000 XP.", xp:800, check:()=>xp>=5000 || nivel>=10},
    {id:"xp10000", titulo:"Dios del XP", desc:"Acumula 10,000 XP.", xp:2000, check:()=>xp>=10000 || nivel>=15},
    {id:"doble_rendimiento", titulo:"Doble o Nada", desc:"Vende con +50% de rendimiento.", xp:1000, check:()=>false},
    {id:"triple_rendimiento", titulo:"Triple Corona", desc:"Vende con +100% de rendimiento.", xp:2500, check:()=>false},
    {id:"cuadruple_rendimiento", titulo:"Inversion Legendaria", desc:"Vende con +200% de rendimiento.", xp:5000, check:()=>false},
    {id:"imperio_30", titulo:"Conquistador Supremo", desc:"Invierte en al menos 1 empresa de cada uno de los 30 sectores disponibles.", xp:10000, check:()=>new Set(Object.keys(portafolio).map(e=>empresaMeta[e]?.sector).filter(Boolean)).size>=30}
];

function checkLogros() {
    let nuevo = false;
    LOGROS_DEF.forEach(l => {
        if (logrosCompletados.includes(l.id)) return;
        if (l.check()) {
            logrosCompletados.push(l.id);
            subirXP(l.xp);
            toast(`🏆 Logro desbloqueado: ${l.titulo} (+${l.xp} XP)`, "success");
            nuevo = true;
        }
    });
    if (nuevo) {
        renderLogros();
        guardar();
    }
}

function renderLogros() {
    const c = document.getElementById("logrosContainer");
    if (!c) return;
    c.innerHTML = "";
    LOGROS_DEF.forEach(l => {
        let ok = logrosCompletados.includes(l.id);
        let div = document.createElement("div");
        div.className = "logro-card" + (ok ? " completado" : "");
        div.innerHTML = `
            <div class="logro-icon">${ok ? "🌟" : "🔒"}</div>
            <div class="logro-info">
                <div class="logro-title">${l.titulo}</div>
                <div class="logro-desc">${l.desc}</div>
                <div class="logro-xp">+${l.xp} XP</div>
            </div>
        `;
        c.appendChild(div);
    });
    const mini = document.getElementById("logrosPanelMini");
    if (mini) {
        mini.innerHTML = "";
        LOGROS_DEF.filter(l => logrosCompletados.includes(l.id)).slice(-3).forEach(l => {
            let tag = document.createElement("span");
            tag.style.cssText = "background:rgba(0,255,136,0.1); color:var(--success); padding:6px 12px; border-radius:20px; font-size:0.8em; font-weight:700; border:1px solid rgba(0,255,136,0.2);";
            tag.innerText = "🌟 " + l.titulo;
            mini.appendChild(tag);
        });
    }
}


function getPatrimonioNetoBancario() {
    let valorActivos = Object.keys(portafolio).reduce((acc, e) => acc + (portafolio[e].cant * preciosMercado[e]), 0);
    return Math.max(0, getCapitalConTarjeta() + totalBancos() + valorActivos - deuda);
}

function totalBancos() {
    return bancos.reduce((acc, b) => acc + b.ahorro + b.corriente, 0);
}

function deudaTarjetas() {
    return tarjetaGlobal.usado;
}

function obtenerBanco(index) {
    return bancos[Math.min(Math.max(0, Number(index)), bancos.length - 1)];
}

function obtenerFactorScore() {
    if (scoreCrediticio >= 750) return 1.0;
    if (scoreCrediticio >= 700) return 0.9;
    if (scoreCrediticio >= 650) return 0.8;
    if (scoreCrediticio >= 600) return 0.7;
    return 0.6;
}

function calcularCupoTarjeta(banco) {
    let patrimonio = Math.max(50000, getPatrimonioNetoBancario());
    let base = patrimonio * 0.15;
    let ajuste = banco.nombre === "Nu Bank" ? 0.95 : 1.0;
    return Math.max(50000, Math.round(base * obtenerFactorScore() * ajuste));
}

function obtenerBloqueo() {
    let patrimonio = Math.max(1, getPatrimonioNetoBancario());
    let deudaTotal = deudaTarjetas();
    if (deudaTotal > patrimonio) return "CUENTAS CONGELADAS";
    if (deudaTotal > patrimonio * 0.7) return "Transferencias grandes bloqueadas";
    return "Ninguno";
}

function getMaxPrestamo(banco) {
    let patrimonio = Math.max(0, getPatrimonioNetoBancario());
    return Math.max(0, Math.floor(patrimonio * 0.5 * obtenerFactorScore()));
}

function generarNumeroTarjeta() {
    let digits = [];
    for (let i = 0; i < 16; i++) digits.push(Math.floor(Math.random() * 10));
    return digits.join('').replace(/(\d{4})(?=\d)/g, '$1 ');
}

function generarFechaExpedicion() {
    const year = 2030 + Math.floor(Math.random() * 5); // 2030-2034
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    return `${month}/${String(year).slice(-2)}`;
}

function esFechaVencimientoAntigua(fecha) {
    if (!fecha) return true;
    const partes = fecha.split('/');
    if (partes.length !== 2) return true;
    const yy = Number(partes[1]);
    return Number.isNaN(yy) || yy < 30;
}

function generarCVV() {
    return String(Math.floor(100 + Math.random() * 900));
}

function generarIdPublico() {
    return '1';
}

function formatearIdPublico(id) {
    return /^\d+$/.test(String(id || '')) ? String(id).padStart(8, '0') : '--------';
}

async function copiarIdPublico() {
    if (!idPublico) return;
    try {
        await navigator.clipboard.writeText(idPublico);
        toast('ID público copiado', 'success');
    } catch (error) {
        toast(`Tu ID público es ${idPublico}`, 'info');
    }
}

async function buscarUsuarioPorDestino(destino) {
    if (!destino) return null;
    destino = destino.trim().toLowerCase();
    if (!destino) return null;

    // Buscar por nombre de usuario primero
    try {
        const resultado = await db.findUserByDestino(destino);
        return resultado;
    } catch (error) {
        console.warn('Error buscando usuario por destino:', error);
        return null;
    }
}

async function guardarUsuarioRemoto(username, data) {
    try {
        await db.saveUser(username, data);
    } catch (e) {
        console.warn('No se pudo guardar usuario remoto:', username, e);
    }
}

async function emitirTarjetaBanco() {
    const esNuevaTarjeta = !tarjetaGlobal.numero;
    if (esNuevaTarjeta) {
        tarjetaGlobal.numero = generarNumeroTarjeta();
        tarjetaGlobal.cvv = generarCVV();
        tarjetaGlobal.tasa = 0.03;
        tarjetaGlobal.emisor = 'GLOBAL';
        tarjetaGlobal.bloqueada = false;
        tarjetaGlobal.nombre = usuarioActual.toUpperCase() || 'USUARIO';
    }
    if (!tarjetaGlobal.fechaExp || esFechaVencimientoAntigua(tarjetaGlobal.fechaExp)) {
        tarjetaGlobal.fechaExp = generarFechaExpedicion();
    }
    if (esNuevaTarjeta) {
        toast("Tarjeta virtual emitida exitosamente", "success");
    } else {
        toast("Tarjeta virtual ya existente restaurada.", "info");
    }
    renderTarjetaVirtual();
    await guardar();
}

async function generarTarjeta() {
    await emitirTarjetaBanco();
}

function toggleSaldoTarjeta() {
    tarjetaSaldoVisible = !tarjetaSaldoVisible;
    const btn = document.getElementById('toggleSaldoBtn');
    if (btn) btn.innerText = tarjetaSaldoVisible ? 'Ocultar saldo' : 'Ver saldo';
    renderTarjetaVirtual();
}

function recargarTarjeta() {
    resetModalConfirmState();
    modalActionType = 'recarga_tarjeta';
    const disponible = capital;
    document.getElementById("modalTitle").innerText = "Recargar saldo de tarjeta";
    document.getElementById("modalText").innerHTML = `
        <p>Ingresa el valor que deseas cargar a tu tarjeta virtual.</p>
        <input id="modalRechargeAmount" class="modal-input" type="text" inputmode="numeric" placeholder="Monto en ${monedaActual}" autocomplete="off" oninput="formatearMontoInversion(this)" />
        <p style="margin-top:8px; color:#ccc; font-size:0.9em;">Saldo disponible: <strong>${formatD(disponible)}</strong></p>
    `;
    const confirmBtn = document.getElementById("modalConfirmBtn");
    if (confirmBtn) {
        confirmBtn.innerText = "Confirmar";
        confirmBtn.style.background = "var(--success)";
        confirmBtn.dataset.action = 'recarga_tarjeta';
    }
    document.getElementById("modalConfirm").classList.add("active");
    setTimeout(() => {
        const input = document.getElementById("modalRechargeAmount");
        if (input) input.focus();
    }, 120);
}

function confirmarRecargaTarjeta() {
    const amountStr = document.getElementById("modalRechargeAmount")?.value;
    const monto = leerMontoInversion(amountStr);
    if (!monto || monto <= 0) {
        return toast("Ingresa un monto válido para recargar.", "error");
    }
    if (monto > capital) {
        return toast("No tienes suficiente saldo disponible para esa recarga.", "error");
    }
    if (!tarjetaGlobal.numero) {
        tarjetaGlobal.numero = generarNumeroTarjeta();
        tarjetaGlobal.cvv = generarCVV();
        tarjetaGlobal.fechaExp = generarFechaExpedicion();
        tarjetaGlobal.tasa = 0.03;
        tarjetaGlobal.emisor = 'GLOBAL';
        tarjetaGlobal.bloqueada = false;
        tarjetaGlobal.nombre = tarjetaGlobal.nombre || usuarioActual.toUpperCase() || 'USUARIO';
        registrarOperacion("Emitir tarjeta independiente", 0, `Tarjeta global independiente`);
    }
    if (!tarjetaGlobal.fechaExp || esFechaVencimientoAntigua(tarjetaGlobal.fechaExp)) {
        tarjetaGlobal.fechaExp = generarFechaExpedicion();
    }
    capital = Math.max(0, capital - monto);
    tarjetaGlobal.saldo = (tarjetaGlobal.saldo || 0) + monto;
    tarjetaGlobal.nombre = tarjetaGlobal.nombre || usuarioActual.toUpperCase() || 'USUARIO';
    tarjetaGlobal.bloqueada = false;
    toast(`Saldo recargado: ${formatD(monto)}`, "success");
    cerrarModal();
    renderTarjetaVirtual(); actualizarTodo(); guardar();
}

function retirarTarjeta() {
    if (!tarjetaGlobal?.numero) return toast("Genera tu tarjeta virtual antes de retirar dinero.", "error");
    const saldo = Number(tarjetaGlobal.saldo || 0);
    if (saldo <= 0) return toast("No hay saldo disponible para retirar.", "info");

    resetModalConfirmState();
    modalActionType = 'retiro_tarjeta';
    document.getElementById("modalTitle").innerText = "Retirar dinero de tarjeta";
    document.getElementById("modalText").innerHTML = `
        <p>Ingresa el valor que deseas retirar de tu tarjeta virtual.</p>
        <input id="modalWithdrawAmount" class="modal-input" type="text" inputmode="numeric" placeholder="Monto en ${monedaActual}" autocomplete="off" oninput="formatearMontoInversion(this)" />
        <p style="margin-top:8px; color:#ccc; font-size:0.9em;">Saldo disponible: <strong>${formatD(saldo)}</strong></p>
    `;
    const confirmBtn = document.getElementById("modalConfirmBtn");
    if (confirmBtn) {
        confirmBtn.innerText = "Retirar";
        confirmBtn.style.background = "var(--success)";
        confirmBtn.dataset.action = 'retiro_tarjeta';
    }
    document.getElementById("modalConfirm").classList.add("active");
    setTimeout(() => document.getElementById("modalWithdrawAmount")?.focus(), 120);
}

function confirmarRetiroTarjeta() {
    const monto = leerMontoInversion(document.getElementById("modalWithdrawAmount")?.value);
    const saldo = Number(tarjetaGlobal.saldo || 0);
    if (!Number.isFinite(monto) || monto <= 0) return toast("Ingresa un monto válido para retirar.", "error");
    if (monto > saldo) return toast("No tienes suficiente saldo en la tarjeta.", "error");

    tarjetaGlobal.saldo = saldo - monto;
    capital += monto;
    registrarOperacion("Retiro tarjeta", monto, "Retiro desde tarjeta virtual");
    toast(`Dinero retirado: ${formatD(monto)}`, "success");
    cerrarModal();
    renderTarjetaVirtual();
    actualizarTodo();
    guardar();
}

function renderTarjetaVirtual() {
    const tarjetaCard = document.getElementById("tarjetaVirtualCard");
    if (!tarjetaCard) return;
    if (!tarjetaGlobal || !tarjetaGlobal.numero) {
        tarjetaCard.innerHTML = `
            <div class="tarjeta-placeholder">
                <p>Crea o selecciona una tarjeta para verla aquí.</p>
                <button class="btn-bank-action primary generar-tarjeta-center" onclick="generarTarjeta()">Generar tarjeta</button>
            </div>
        `;
        return;
    }
    const btn = document.getElementById('toggleSaldoBtn');
    if (btn) btn.innerText = tarjetaSaldoVisible ? 'Ocultar saldo' : 'Ver saldo';
    if (!tarjetaGlobal.fechaExp || esFechaVencimientoAntigua(tarjetaGlobal.fechaExp)) {
        tarjetaGlobal.fechaExp = generarFechaExpedicion();
    }
    const nombreTitular = tarjetaGlobal.nombre || usuarioActual || 'USUARIO';
    const emisorTarjeta = tarjetaGlobal.emisor || 'GLOBAL';
    const mostrarNombre = `
                <div>
                    <div class="meta-label">Titular</div>
                    <div class="meta-value">${nombreTitular}</div>
                </div>`;
    const saldoTexto = tarjetaSaldoVisible ? formatD(tarjetaGlobal.saldo) : '••••••';
    tarjetaCard.innerHTML = `
        <div class="tarjeta-virtual">
            <div class="tarjeta-top">
                <span>${emisorTarjeta}</span>
            </div>
            <div class="tarjeta-number">${tarjetaGlobal.numero}</div>
            <div class="tarjeta-saldo-box">
                <div class="meta-label">Saldo</div>
                <div class="meta-value">${saldoTexto}</div>
            </div>
            <div class="tarjeta-meta">
                ${mostrarNombre}
                <div>
                    <div class="meta-label">Vence</div>
                    <div class="meta-value">${tarjetaGlobal.fechaExp}</div>
                </div>
                <div>
                    <div class="meta-label">CVV</div>
                    <div class="meta-value">${tarjetaGlobal.cvv}</div>
                </div>
            </div>
        </div>
    `;
}

function renderBankSelectors() {
    const bancoSel = document.getElementById("bancoSeleccionado");
    const bancoDest = document.getElementById("bancoDestino");
    const listContainer = document.getElementById("bankListContainer");
    if (!bancoSel || !bancoDest || !listContainer) return;

    const selectedIndex = Number(bancoSel.value) >= 0 ? Number(bancoSel.value) : 0;
    bancoSel.innerHTML = bancos.map((b, index) => `<option value="${index}">${b.nombre}</option>`).join('');
    bancoDest.innerHTML = bancos.map((b, index) => `<option value="${index}">${b.nombre}</option>`).join('');
    bancoSel.value = selectedIndex;
    bancoDest.value = selectedIndex === 0 ? 1 : selectedIndex;

    listContainer.innerHTML = bancos.map((b, index) => `
        <button type="button" class="bank-chip ${index === selectedIndex ? 'active' : ''}" onclick="seleccionarBanco(${index})">${b.nombre}</button>
    `).join('');
}

function seleccionarBanco(index) {
    const bancoSel = document.getElementById("bancoSeleccionado");
    if (!bancoSel) return;
    bancoSel.value = index;
    actualizarInfoBancos();
    renderBankSelectors();
}

function getMaxPrestamo(banco) {
    let patrimonio = Math.max(0, getPatrimonioNetoBancario());
    return Math.max(0, Math.floor(patrimonio * 0.5));
}

function pedirPrestamoBanco() {
    const banco = obtenerBanco(document.getElementById("bancoSeleccionado").value);
    const monto = Math.max(0, Math.floor(Number(document.getElementById("montoPrestamo")?.value)));
    if (!usuarioActual) return toast("Inicia sesión para pedir un préstamo", "error");
    if (!banco) return toast("Selecciona un banco", "error");
    if (monto <= 0) return toast("Monto inválido", "error");
    const maxLoan = getMaxPrestamo(banco);
    const disponible = Math.max(0, maxLoan - banco.prestamo);
    if (monto > disponible) return toast(`Máximo disponible: ${formatD(disponible)} según tu score crediticio`, "error");
    banco.prestamo += monto;
    capital += monto;
    registrarOperacion("Préstamo", monto, `${banco.nombre} (Tasa ${Math.round(banco.prestamoTasa*100)}%)`);
    toast(`✅ Préstamo aprobado por ${formatD(monto)}`, "success");
    sincronizarDeudaGlobal(); actualizarTodo(); guardar();
}

function pagarPrestamoBanco() {
    const banco = obtenerBanco(document.getElementById("bancoSeleccionado").value);
    const monto = Math.max(0, Math.floor(Number(document.getElementById("montoPagoPrestamo")?.value)));
    if (!usuarioActual) return toast("Inicia sesión para pagar un préstamo", "error");
    if (!banco) return toast("Selecciona un banco", "error");
    if (monto <= 0) return toast("Monto inválido", "error");
    if (capital < monto) return toast("Capital insuficiente", "error");
    if (banco.prestamo <= 0) return toast("No tienes préstamo activo en este banco", "info");
    const pago = Math.min(monto, banco.prestamo);
    banco.prestamo -= pago;
    capital -= pago;
    registrarOperacion("Pago préstamo", pago, `Pago préstamo ${banco.nombre}`);
    toast(`✅ Pagaste ${formatD(pago)} de tu préstamo`, "success");
    sincronizarDeudaGlobal(); actualizarTodo(); guardar();
}

async function enviarDineroJugador() {
    const destino = String(document.getElementById("destinoJugador")?.value || '').trim();
    const monto = Math.max(0, Math.floor(Number(document.getElementById("montoJugador")?.value)));
    if (!usuarioActual) return toast("Inicia sesión para enviar dinero", "error");
    if (!destino) return toast("Ingresa usuario o número de tarjeta destino", "error");
    if (monto <= 0) return toast("Monto inválido", "error");
    if (!tarjetaGlobal.numero) return toast("Genera tu tarjeta virtual antes de enviar dinero", "error");
    if (tarjetaGlobal.bloqueada) return toast("Tu tarjeta está bloqueada", "error");
    if ((tarjetaGlobal.saldo || 0) < monto) return toast("Saldo insuficiente en la tarjeta", "error");
    const encontrado = await buscarUsuarioPorDestino(destino);
    if (!encontrado) return toast("Usuario o tarjeta destino no encontrado", "error");
    const { username, data } = encontrado;
    if (username.toLowerCase() === usuarioActual.toLowerCase()) return toast("No puedes enviarte dinero a ti mismo", "error");
    if (!data.tarjetaGlobal?.numero) return toast("El destinatario aún no tiene una tarjeta virtual", "error");
    data.tarjetaGlobal.saldo = (data.tarjetaGlobal.saldo || 0) + monto;
    data.historialBancario = data.historialBancario || [];
    data.historialBancario.unshift({
        tiempo: new Date().toLocaleTimeString(),
        tipo: "Transferencia recibida",
        monto,
        detalle: `De ${usuarioActual}`
    });
    if (data.historialBancario.length > 40) data.historialBancario.pop();
    try {
        await db.saveUser(username, data);
    } catch (error) {
        return toast(error.message || "No se pudo completar la transferencia", "error");
    }
    tarjetaGlobal.saldo -= monto;
    registrarOperacion("Transferencia con tarjeta", monto, `A ${username} / ${destino}`);
    toast(`✅ ${formatD(monto)} enviado a ${username}`, "success");
    renderTarjetaVirtual();
    actualizarInfoBancos();
    actualizarTodo();
    document.getElementById("destinoJugador").value = "";
    document.getElementById("montoJugador").value = "";
    toggleTransferPlayer(false);
    await guardar();
}

function toggleTransferPlayer(forceOpen) {
    const form = document.getElementById("playerTransferForm");
    if (!form) return;
    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : form.classList.contains("hidden");
    form.classList.toggle("hidden", !shouldOpen);
    form.closest(".player-transfer-card")?.classList.toggle("hidden", !shouldOpen);
}

function registrarOperacion(tipo, monto, detalle) {
    historialBancario.unshift({
        tiempo: new Date().toLocaleTimeString(),
        tipo,
        monto,
        detalle
    });
    if (historialBancario.length > 40) historialBancario.pop();
    renderHistorialBancario();
}

function depositarBanco() {
    const banco = obtenerBanco(document.getElementById("bancoSeleccionado").value);
    const cuenta = document.getElementById("cuentaTipo").value;
    const monto = Math.max(0, Math.floor(Number(document.getElementById("montoBanco")?.value)));
    if (monto <= 0) return toast("Monto invalido", "error");
    if (cuenta === "tarjeta") return toast("Usa el pago de tarjeta para reducir deuda.", "error");
    if (capital < monto) return toast("Capital insuficiente", "error");

    let maxSaldo = Math.max(100000, Math.round(getPatrimonioNetoBancario() * 2));
    if (totalBancos() + monto > maxSaldo) {
        return toast(`❌ Límite bancario superado. Máximo permitido: ${formatD(maxSaldo)}.`, "error");
    }

    banco[cuenta] += monto;
    capital -= monto;
    registrarOperacion("Deposito", monto, `${banco.nombre} / ${cuenta}`);
    toast(`✅ Deposito de ${formatD(monto)} en ${banco.nombre} / ${cuenta}`, "success");
    sincronizarDeudaGlobal();
    actualizarTodo(); guardar();
}

function retirarBanco() {
    const banco = obtenerBanco(document.getElementById("bancoSeleccionado").value);
    const cuenta = document.getElementById("cuentaTipo").value;
    const monto = Math.max(0, Math.floor(Number(document.getElementById("montoBanco")?.value)));
    if (monto <= 0) return toast("Monto invalido", "error");
    if (cuenta === "tarjeta") return toast("No puedes retirar desde la tarjeta de crédito.", "error");

    let saldo = banco[cuenta];
    let maxRetiro = Math.max(0, Math.floor(saldo * 0.2));
    if (monto > maxRetiro) return toast(`❌ Máximo por retiro: ${formatD(maxRetiro)} (20% del saldo).`, "error");
    if (saldo < monto) return toast("Saldo insuficiente en la cuenta seleccionada.", "error");
    if (obtenerBloqueo() === "CUENTAS CONGELADAS") return toast("⚠️ Cuentas congeladas por deuda excesiva.", "error");

    banco[cuenta] -= monto;
    capital += monto;
    registrarOperacion("Retiro", monto, `${banco.nombre} / ${cuenta}`);
    toast(`✅ Retiro de ${formatD(monto)} desde ${banco.nombre} / ${cuenta}`, "success");
    sincronizarDeudaGlobal();
    actualizarTodo(); guardar();
}

function transferirBanco() {
    const origen = obtenerBanco(document.getElementById("bancoSeleccionado").value);
    const destino = obtenerBanco(document.getElementById("bancoDestino").value);
    const cuenta = document.getElementById("cuentaTipo").value;
    const monto = Math.max(0, Math.floor(Number(document.getElementById("montoBancoDestino")?.value)));
    if (monto <= 0) return toast("Monto invalido", "error");
    if (origen === destino) return toast("Selecciona un banco destino distinto.", "error");
    if (cuenta === "tarjeta") return toast("No se permiten transferencias desde tarjeta de crédito.", "error");

    let saldo = origen[cuenta];
    let comision = Math.max(100, Math.ceil(monto * 0.01));
    let costoTotal = monto + comision;
    if (saldo < costoTotal) return toast("Saldo insuficiente para monto y comisión.", "error");
    if (obtenerBloqueo() === "CUENTAS CONGELADAS") return toast("⚠️ Cuentas congeladas por deuda excesiva.", "error");
    if (obtenerBloqueo() === "Transferencias grandes bloqueadas" && monto > Math.max(1000, saldo * 0.15)) {
        return toast("❌ Transferencia grande bloqueada por nivel de deuda.", "error");
    }

    origen[cuenta] -= costoTotal;
    destino[cuenta] += monto;
    registrarOperacion("Transferencia", monto, `De ${origen.nombre} a ${destino.nombre} / ${cuenta} (Comisión ${formatD(comision)})`);
    toast(`✅ Transferencia con comisión aplicada: ${formatD(comision)}`, "info");
    sincronizarDeudaGlobal();
    actualizarTodo(); guardar();
}

function pagarTarjetaBanco() {
    const banco = obtenerBanco(document.getElementById("bancoSeleccionado").value);
    const monto = Math.max(0, Math.floor(Number(document.getElementById("montoPagoTarjeta")?.value)));
    if (tarjetaGlobal.usado <= 0) return toast("No hay deuda en la tarjeta.", "info");
    if (monto <= 0) return toast("Monto invalido", "error");
    if (capital < monto) return toast("Capital insuficiente para pagar la tarjeta.", "error");

    let cupo = tarjetaGlobal.cupo || calcularCupoTarjeta(banco);
    let ratioAntes = tarjetaGlobal.usado / cupo;
    let pago = Math.min(monto, tarjetaGlobal.usado);
    tarjetaGlobal.usado -= pago;
    capital -= pago;

    if (pago > 0) {
        misionesReputacion.forEach(m => {
            if (m.estado !== 'activa' || m.tipo !== 'pagar_deuda') return;
            m.progreso = Math.min(1, m.progreso + (pago / 5000));
        });
    }
    if (tarjetaGlobal.usado / cupo > 0.8) {
        scoreCrediticio = Math.max(300, scoreCrediticio - 2);
        toast("⚠️ Estás cerca del límite de tu tarjeta. Paga más pronto.", "warning");
    } else {
        scoreCrediticio = Math.min(850, scoreCrediticio + 5);
    }

    if (ratioAntes > 0.8 && tarjetaGlobal.usado / cupo <= 0.8) {
        scoreCrediticio = Math.min(850, scoreCrediticio + 5);
        toast("✅ Tu score subió al reducir el uso de la tarjeta.", "success");
    }

    registrarOperacion("Pago Tarjeta", pago, `Pago tarjeta global (${banco.nombre})`);
    prestamosActivos = tarjetaGlobal.usado > 0 ? 1 : 0;
    sincronizarDeudaGlobal();
    actualizarTodo(); guardar();
}

function actualizarInfoBancos() {
    renderBankSelectors();
    const bancoSelEl = document.getElementById("bancoSeleccionado");
    if (!bancoSelEl) return; // Elemento no existe aún (estamos en login)
    const index = Number(bancoSelEl.value);
    const banco = obtenerBanco(index);
    const cupo = calcularCupoTarjeta(banco);
    tarjetaGlobal.cupo = cupo;
    const cuentaTipoEl = document.getElementById("cuentaTipo");
    if (!cuentaTipoEl) return;
    const cuenta = cuentaTipoEl.value;
    const bancoActivoEl = document.getElementById("bancoActivoTexto");
    const cuentaActivaEl = document.getElementById("cuentaActivaTexto");
    const scoreEl = document.getElementById("scoreCrediticioTexto");
    const saldoEl = document.getElementById("saldoBancosTexto");
    const deudaEl = document.getElementById("deudaTarjetasTexto");
    const bloqueoEl = document.getElementById("bloqueoBancoTexto");
    const tarjetaTexto = document.getElementById("tarjetaCupoTexto");
    const tarjetaActivaEl = document.getElementById("tarjetaActivaTexto");
    const disponibleTexto = document.getElementById("cupoDisponibleTexto");
    const alertaTexto = document.getElementById("alertaCupoTexto");
    const ahorroTexto = document.getElementById("saldoAhorroTexto");
    const corrienteTexto = document.getElementById("saldoCorrienteTexto");
    const tarjetaSaldoTexto = document.getElementById("saldoTarjetaTexto");

    const deudaTotal = deudaTarjetas();
    const ratioTarjeta = Math.min(1, tarjetaGlobal.usado / tarjetaGlobal.cupo);

    if (bancoActivoEl) bancoActivoEl.innerText = banco.nombre;
    if (cuentaActivaEl) cuentaActivaEl.innerText = cuenta === 'tarjeta' ? 'Tarjeta de Crédito' : cuenta === 'ahorro' ? 'Ahorros' : 'Corriente';
    if (scoreEl) {
        scoreEl.innerText = scoreCrediticio;
        scoreEl.style.color = scoreCrediticio >= 700 ? 'var(--success)' : scoreCrediticio >= 600 ? 'var(--warning)' : 'var(--danger)';
    }
    if (saldoEl) saldoEl.innerText = formatD(totalBancos());
    if (deudaEl) deudaEl.innerText = formatD(deudaTotal);
    if (bloqueoEl) bloqueoEl.innerText = obtenerBloqueo();
    if (tarjetaTexto) {
        tarjetaTexto.innerText = tarjetaSaldoVisible ? `${formatD(tarjetaGlobal.usado)} / ${formatD(tarjetaGlobal.cupo)}` : `•••••• / ${formatD(tarjetaGlobal.cupo)}`;
    }
    if (tarjetaActivaEl) tarjetaActivaEl.innerText = tarjetaGlobal.numero ? `Global (${tarjetaGlobal.emisor || banco.nombre})` : 'Ninguna';
    if (disponibleTexto) disponibleTexto.innerText = `${Math.round((1 - ratioTarjeta) * 100)}%`;
    if (alertaTexto) alertaTexto.innerText = ratioTarjeta >= 0.8 ? 'Sí - cerca del límite' : 'No';
    if (ahorroTexto) ahorroTexto.innerText = formatD(banco.ahorro);
    if (corrienteTexto) corrienteTexto.innerText = formatD(banco.corriente);
    if (tarjetaSaldoTexto) tarjetaSaldoTexto.innerText = tarjetaSaldoVisible ? formatD(tarjetaGlobal.usado) : '••••••';

    prestamosActivos = bancos.filter(b => b.tarjeta.usado > 0).length;
    sincronizarDeudaGlobal();
    renderTarjetaVirtual();
    renderHistorialBancario();
}

function renderHistorialBancario() {
    const tbody = document.getElementById("historialBanco");
    if (!tbody) return;
    tbody.innerHTML = '';
    if (historialBancario.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="color:#666; text-align:center;">No hay movimientos bancarios aun.</td></tr>`;
        return;
    }
    historialBancario.slice(0, 12).forEach(item => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.tiempo}</td>
            <td>${item.tipo}</td>
            <td>${formatD(item.monto)}</td>
            <td>${item.detalle}</td>
        `;
        tbody.appendChild(tr);
    });
}

async function refrescarHistorialBancario() {
    try {
        const datosRemotos = await db.getUserData(usuarioActual);
        if (datosRemotos.historialBancario) historialBancario = datosRemotos.historialBancario;
        if (datosRemotos.tarjetaGlobal) {
            tarjetaGlobal = Object.assign(JSON.parse(JSON.stringify(tarjetaDefault)), datosRemotos.tarjetaGlobal);
        }
        renderTarjetaVirtual();
        actualizarInfoBancos();
        renderHistorialBancario();
    } catch (error) {
        console.warn("No se pudo refrescar el historial bancario:", error);
    }
}

setInterval(() => {
    const bancosPanel = document.getElementById("bancos");
    if (usuarioActual && bancosPanel && !bancosPanel.classList.contains("hidden")) {
        refrescarHistorialBancario();
    }
}, 5000);

function aplicarInteresesTarjetas() {
    if (!usuarioActual || tarjetaGlobal.usado <= 0) return;
    let totalIntereses = 0;
    let tasa = tarjetaGlobal.tasa + (Math.random() * 0.02);
    let interes = Math.max(100, Math.round(tarjetaGlobal.usado * tasa));
    tarjetaGlobal.usado += interes;
    totalIntereses += interes;
    if (tarjetaGlobal.usado > tarjetaGlobal.cupo) {
        tarjetaGlobal.bloqueada = true;
    }
    if (totalIntereses > 0) {
        toast(`💳 Intereses de tarjeta aplicados: ${formatD(totalIntereses)}`, "warning");
        actualizarTodo(); guardar();
    }
}

function sincronizarDeudaGlobal() {
    deuda = deudaTarjetas();
}

setInterval(() => { if (usuarioActual) aplicarInteresesTarjetas(); }, 60000);

// ==========================================
// EVENTOS MUNDIALES CON DURACION
// ==========================================
const EVENTOS = [
    {m:"🚀 Innovación en IA: la nueva generación de chips reduce costos de centros de datos.", cats:["IA","Tecnologia"], mul:1.6, tipo:"boom"},
    {m:"⚡ Transición energética: grandes productores firman contratos para parques eólicos.", cats:["Energia"], mul:1.5, tipo:"boom"},
    {m:"🧪 Avance médico: aprobación de vacuna de tercera generación acelera inversiones.", cats:["Salud","Biotecnologia"], mul:1.5, tipo:"boom"},
    {m:"💎 Litio estratégico: se descubre yacimiento clave para baterías eléctricas.", cats:["Mineria","Energia"], mul:1.7, tipo:"boom"},
    {m:"🏗️ Infraestructura verde: gobierno lanza plan de construcción sostenible.", cats:["Construccion","Energia"], mul:1.4, tipo:"boom"},
    {m:"🛰️ 6G en piloto: operadores anuncian red de próxima generación para 2028.", cats:["Telecomunicaciones"], mul:1.4, tipo:"boom"},
    {m:"🚗 Autos eléctricos: fabricante anuncia producción masiva de modelos de bajo costo.", cats:["Automotriz","Energia"], mul:1.5, tipo:"boom"},
    {m:"🛒 Temporada récord: ventas online globales superan pronósticos en un 20%.", cats:["Retail","Consumo","E-Commerce"], mul:1.4, tipo:"boom"},
    {m:"🏦 Tasas en baja: bancos ofrecen créditos hipotecarios con condiciones más holgadas.", cats:["Finanzas","Real Estate"], mul:1.3, tipo:"boom"},
    {m:"✈️ Turismo abierto: reapertura completa de fronteras aumenta reservas internacionales.", cats:["Turismo"], mul:1.5, tipo:"boom"},
    {m:"☢️ Energía limpia: planta de fusión anuncia su primer kilovatio estable.", cats:["Energia"], mul:1.8, tipo:"boom"},
    {m:"🌍 Comercio estable: nuevo tratado reduce barreras arancelarias globales.", cats:Object.keys(CATEGORIAS), mul:1.2, tipo:"boom"},
    {m:"📉 Corrección tecnológica: el sector ajusta valoraciones tras exceso de optimismo.", cats:["Tecnologia","IA"], mul:0.5, tipo:"crisis"},
    {m:"📉 Inflación alta: los consumidores recortan gastos en bienes no esenciales.", cats:["Consumo","Retail"], mul:0.6, tipo:"crisis"},
    {m:"☣️ Brote viral: turismo y ocio sufren cancelaciones masivas.", cats:["Turismo","Consumo","Salud"], mul:0.4, tipo:"crisis"},
    {m:"⛏️ Huelga minera: producción de cobre y litio se detiene por conflictos laborales.", cats:["Mineria"], mul:0.5, tipo:"crisis"},
    {m:"⚖️ Control de IA: nuevos reglamentos frenan despliegue comercial de algoritmos.", cats:["IA","Tecnologia"], mul:0.6, tipo:"crisis"},
    {m:"📉 Escasez de material: retrasos en proyectos de construcción y energía.", cats:["Construccion","Energia"], mul:0.55, tipo:"crisis"},
    {m:"⛈️ Sequía severa: cultivos y exportaciones agrícolas caen en picada.", cats:["Agricultura","Alimentacion"], mul:0.5, tipo:"crisis"},
    {m:"🔧 Retiro masivo: fabricante automotriz detiene ventas por problema en baterías.", cats:["Automotriz"], mul:0.6, tipo:"crisis"},
    {m:"🔐 Ciberataque: red de pagos global sufre brecha de seguridad.", cats:["Tecnologia","Fintech","Telecomunicaciones"], mul:0.5, tipo:"crisis"},
    {m:"📉 Capital fuga: bancos regionales enfrentan retiros acelerados.", cats:["Finanzas"], mul:0.6, tipo:"crisis"},
    {m:"⛽ Crisis energética: el petróleo y el gas suben ante escombros de oferta.", cats:["Energia","Automotriz"], mul:0.6, tipo:"crisis"},
    {m:"🏘️ Colapso inmobiliario: el crédito caro frena la compra de viviendas.", cats:["Construccion","Real Estate"], mul:0.45, tipo:"crisis"},
    {m:"📵 Caída de redes: interrupción masiva deja dispositivos sin conexión.", cats:["Telecomunicaciones"], mul:0.5, tipo:"crisis"},
    {m:"🌪️ Clima extremo: fenómenos naturales provocan contracción económica.", cats:Object.keys(CATEGORIAS), mul:0.55, tipo:"crisis"}
];

function aplicarEvento(ev) {
    Object.keys(sectorBoost).forEach(k => sectorBoost[k] = 1.0);
    ev.cats.forEach(cat => sectorBoost[cat] = ev.mul);
    eventoActivo = {
        mensaje: ev.m,
        duracion: 60,
        restante: 60,
        tipo: ev.tipo,
        cats: ev.cats
    };
    let box = document.getElementById("eventoMundial");
    const mensaje = traducirTexto(ev.m);
    const duracion = traducirTexto('Duracion');
    const sectores = traducirTexto('Sectores');
    document.getElementById("eventoMundialTexto").innerHTML = `<b>${mensaje}</b><br><small style='color:#888'>${duracion}: 60 ${traducirTexto('segundos')} | ${sectores}: ${ev.cats.slice(0,3).map(traducirTexto).join(", ")}${ev.cats.length>3?"...":""}</small>`;
    box.style.display = "block";
    box.className = "evento-box active " + ev.tipo;
    document.getElementById("eventoTimer").style.width = "100%";
    toast(mensaje, ev.tipo === "boom" ? "success" : "error");
}

setInterval(() => {
    if (estaEnPreferencias()) return;
    if (!eventoActivo) {
        if (Math.random() > 0.65) {
            let ev = EVENTOS[Math.floor(Math.random() * EVENTOS.length)];
            aplicarEvento(ev);
        }
        return;
    }
    eventoActivo.restante--;
    let pct = (eventoActivo.restante / eventoActivo.duracion) * 100;
    document.getElementById("eventoTimer").style.width = pct + "%";
    if (eventoActivo.restante <= 0) {
        eventoActivo = null;
        Object.keys(sectorBoost).forEach(k => sectorBoost[k] = 1.0);
        document.getElementById("eventoMundial").style.display = "none";
        toast(traducirTexto("El evento mundial ha finalizado. El mercado se normaliza."), "info");
    }
}, 1000);

// ==========================================
// NOTICIAS CON IMPACTO REAL
// ==========================================
let noticiasHistorial = [];
const NOTICIAS_POS = [
    "anuncia ingresos trimestrales por encima de lo esperado",
    "firma un acuerdo estratégico con un proveedor global",
    "lanzará un nuevo servicio premium este trimestre",
    "obtiene inversión adicional para expansión internacional",
    "recibe aprobación regulatoria para su nuevo producto",
    "supera las previsiones de ventas del mercado",
    "presenta resultados récord durante el último periodo",
    "eleva su guía de crecimiento anual",
    "amplía su red de operaciones a nuevos mercados",
    "reduce sus costes operativos más de lo previsto",
    "gana cuota de mercado frente a sus competidores",
    "firma contratos con tres grandes clientes internacionales",
    "mejora sus márgenes gracias a una gestión eficiente",
    "inaugura una nueva planta de producción sostenible",
    "aumenta la demanda de sus productos principales",
    "recibe una valoración positiva de los analistas",
    "anuncia un programa de recompra de acciones",
    "obtiene una patente para su tecnología innovadora",
    "completa con éxito su expansión regional",
    "fortalece su balance con nueva financiación",
    "lanza una plataforma digital con gran acogida",
    "incrementa sus exportaciones durante el trimestre",
    "alcanza un nuevo récord de usuarios activos",
    "mejora sus previsiones para el próximo ejercicio",
    "cierra una alianza con una empresa líder del sector",
    "reduce su deuda por encima de las expectativas",
    "presenta un producto que supera las pruebas técnicas",
    "aumenta sus dividendos para los accionistas",
    "recibe un premio internacional por su innovación",
    "abre nuevas oficinas en mercados estratégicos",
    "incorpora talento clave a su equipo directivo",
    "logra una producción récord en sus instalaciones",
    "firma un acuerdo de distribución a largo plazo",
    "mejora su calificación crediticia",
    "supera los objetivos de rentabilidad anual",
    "recibe fuertes pedidos de clientes corporativos",
    "reduce el impacto ambiental de sus operaciones",
    "aumenta la productividad de su plantilla",
    "consolida su liderazgo en el mercado nacional",
    "publica una previsión optimista para el futuro",
    "completa la integración de su nueva adquisición",
    "mejora la experiencia de sus clientes",
    "obtiene financiación para un ambicioso proyecto",
    "anuncia nuevas contrataciones para acelerar su crecimiento",
    "eleva sus ventas online a un máximo histórico",
    "recupera la confianza de los inversores",
    "firma un acuerdo tecnológico con un socio estratégico",
    "reduce los tiempos de entrega de sus productos",
    "aumenta la capacidad de sus centros logísticos",
    "presenta beneficios superiores a los del año anterior",
    "recibe autorización para operar en un nuevo país",
    "mejora sus indicadores de satisfacción del cliente",
    "refuerza sus reservas de efectivo",
    "anuncia una inversión récord en investigación",
    "logra una rápida recuperación de sus ventas",
    "incorpora una solución que reduce sus costes",
    "alcanza un acuerdo laboral con sus empleados",
    "consigue nuevos permisos para ampliar su actividad",
    "aumenta su producción sin elevar los precios",
    "presenta una aplicación con excelentes resultados",
    "mejora la eficiencia de su cadena de suministro",
    "anuncia un crecimiento sólido en todas sus regiones",
    "recibe recomendaciones de compra de varios analistas",
    "amplía su catálogo con productos de alta demanda",
    "completa una emisión de bonos con gran demanda",
    "aumenta la asistencia a sus establecimientos",
    "reduce sus emisiones por encima del objetivo anual",
    "firma una alianza para desarrollar nuevas tecnologías",
    "supera el récord histórico de pedidos",
    "mejora sus resultados gracias a la diversificación",
    "anuncia un plan de expansión más ambicioso",
    "obtiene resultados positivos en sus ensayos",
    "incrementa sus ingresos recurrentes",
    "fortalece su presencia en el comercio electrónico",
    "logra un crecimiento excepcional en mercados emergentes",
    "presenta cuentas auditadas sin observaciones relevantes",
    "reduce sus gastos financieros durante el trimestre",
    "recibe apoyo público para un proyecto estratégico",
    "aumenta la fidelidad de sus clientes",
    "mejora su posición frente a la volatilidad del mercado",
    "abre un centro de innovación de última generación",
    "obtiene una licencia para comercializar su producto",
    "eleva sus objetivos de ventas para el próximo año",
    "concluye una negociación favorable con sus proveedores",
    "alcanza un nuevo máximo de producción diaria",
    "aumenta sus reservas y mejora su liquidez",
    "recibe una respuesta excelente a su nueva campaña",
    "desarrolla una solución que lidera su categoría",
    "supera las metas de crecimiento previstas",
    "firma un acuerdo para reducir sus costes energéticos",
    "mejora sus resultados en el mercado internacional",
    "anuncia beneficios récord para sus accionistas",
    "consigue una mayor eficiencia en sus operaciones",
    "amplía su red de socios comerciales",
    "recibe una certificación de calidad internacional",
    "incrementa su inversión en energías renovables",
    "logra una recuperación superior a la esperada",
    "presenta una estrategia que convence al mercado",
    "aumenta el valor de sus activos principales",
    "cierra el trimestre con crecimiento en todas sus divisiones"
];
const NOTICIAS_NEG = [
    "es demandada por prácticas comerciales abusivas",
    "revela pérdidas operativas tras una retirada de productos",
    "cambia a la baja su guía de crecimiento anual",
    "sufre un ciberataque que expone datos de usuarios",
    "anuncia una reducción del 30% en su plantilla",
    "incumple las previsiones de ventas del mercado",
    "aplaza el lanzamiento de su nuevo producto",
    "enfrenta una investigación de los organismos reguladores",
    "advierte de problemas en su cadena de suministro",
    "registra una caída significativa de sus beneficios",
    "pierde un contrato importante con un cliente internacional",
    "afronta un aumento inesperado de sus costes",
    "reduce sus previsiones de ingresos para el año",
    "sufre retrasos en la producción de sus principales productos",
    "recibe una rebaja en su calificación crediticia",
    "reporta una disminución de usuarios activos",
    "anuncia el cierre de varias instalaciones",
    "pierde cuota de mercado frente a sus competidores",
    "detecta defectos en una línea de productos",
    "suspende temporalmente sus operaciones en una región",
    "ve caer sus márgenes por la presión de los costes",
    "recibe críticas por problemas en su servicio",
    "aplaza una inversión prevista por falta de financiación",
    "informa de una fuerte caída de pedidos",
    "enfrenta la salida de varios directivos",
    "sufre una interrupción en su cadena logística",
    "pierde valor tras unos resultados decepcionantes",
    "advierte de una menor demanda para el próximo trimestre",
    "debe pagar una multa por incumplimientos regulatorios",
    "cancela un proyecto estratégico por sobrecostes",
    "registra pérdidas superiores a las previsiones",
    "reduce sus objetivos de producción anual",
    "pierde acceso a un mercado clave",
    "inicia despidos por la caída de la actividad",
    "sufre una avería que detiene parte de su producción",
    "reconoce errores en sus estados financieros",
    "enfrenta protestas por sus condiciones laborales",
    "suspende el pago de dividendos a sus accionistas",
    "recibe una demanda colectiva de sus clientes",
    "informa de problemas técnicos en su plataforma",
    "sufre una caída de ventas en sus mercados principales",
    "revisa a la baja su objetivo de rentabilidad",
    "pierde a un socio estratégico de distribución",
    "anuncia una subida de precios por falta de suministros",
    "afronta una investigación por prácticas anticompetitivas",
    "sufre una fuga de datos de sus sistemas internos",
    "reduce su inversión en investigación y desarrollo",
    "reporta un descenso de la producción trimestral",
    "recibe una valoración negativa de los analistas",
    "cierra el trimestre con deuda superior a la prevista",
    "enfrenta problemas para renovar sus licencias",
    "pierde pedidos tras una campaña fallida",
    "anuncia la venta de una división poco rentable",
    "sufre una huelga que afecta a sus operaciones",
    "detecta irregularidades en sus controles internos",
    "rebaja sus previsiones por la debilidad del mercado",
    "afronta un encarecimiento de sus materias primas",
    "registra una caída histórica en el valor de sus acciones",
    "reconoce retrasos en el cumplimiento de sus contratos",
    "cancela la apertura de nuevas instalaciones",
    "pierde clientes tras varios fallos de servicio",
    "anuncia pérdidas en su división internacional",
    "sufre restricciones que limitan sus exportaciones",
    "recibe sanciones por incumplir normas de seguridad",
    "reduce su capacidad operativa durante el trimestre",
    "enfrenta dificultades para refinanciar su deuda",
    "reporta resultados inferiores a los del año anterior",
    "aplaza el pago a varios proveedores",
    "pierde una patente clave tras una disputa legal",
    "advierte de una posible escasez de productos",
    "sufre una caída de reservas y cancelaciones",
    "recorta sus planes de contratación",
    "recibe una recomendación de venta de varios analistas",
    "enfrenta daños materiales en una de sus plantas",
    "reduce sus operaciones por la falta de personal",
    "reporta un descenso de sus ingresos recurrentes",
    "pierde competitividad por el aumento de sus precios",
    "suspende el lanzamiento de su nueva plataforma",
    "admite fallos en su sistema de atención al cliente",
    "afronta costes legales superiores a lo previsto",
    "registra menor actividad en sus mercados emergentes",
    "anuncia una revisión de sus cuentas anteriores",
    "sufre una caída de la confianza de sus inversores",
    "reduce sus previsiones de crecimiento a largo plazo",
    "pierde una alianza comercial de gran importancia",
    "enfrenta dificultades para entregar pedidos",
    "recibe quejas por la calidad de sus productos",
    "anuncia el retraso de sus resultados financieros",
    "reporta un aumento de devoluciones y reclamaciones",
    "sufre pérdidas por la depreciación de sus activos",
    "cierra varios puntos de venta por baja rentabilidad",
    "afronta una caída de la demanda en su principal sector",
    "reduce sus inversiones por la incertidumbre económica",
    "recibe una sanción por problemas medioambientales",
    "pierde terreno frente a nuevas empresas competidoras",
    "anuncia una reestructuración con impacto en sus empleados",
    "registra un flujo de caja negativo durante el trimestre",
    "advierte de resultados débiles para el siguiente periodo",
    "cancela una expansión internacional por falta de recursos",
    "termina el año con beneficios muy inferiores a lo esperado"
];

// Mapeo de emoji por sector (restaurado desde respaldo)
const sectorEmoji = {
    "Tecnologia": "💻", "Finanzas": "🏦", "Energia": "⚡", "Salud": "🏥", "Consumo": "🛍️",
    "Automotriz": "🚗", "Criptomonedas": "₿", "Entretenimiento": "🎬", "Construccion": "🏗️",
    "Agricultura": "🌾", "Telecomunicaciones": "📡", "Turismo": "✈️", "Retail": "🛒",
    "Mineria": "⛏️", "IA": "🤖", "Real Estate": "🏘️", "Aeroespacial": "🚀", "Quimica": "⚗️",
    "Seguros": "🛡️", "Alimentacion": "🍽️", "Moda": "👗", "Logistica": "📦", "Educacion": "📚",
    "Defensa": "🎖️", "Bebidas": "🍷", "Textil": "🧵", "Gaming": "🎮", "E-Commerce": "💻",
    "Biotecnologia": "🧬", "Fintech": "💳"
};

function generarNoticia() {
    let cats = Object.keys(CATEGORIAS);
    let cat = cats[Math.floor(Math.random() * cats.length)];
    let empObj = CATEGORIAS[cat].empresas[Math.floor(Math.random() * CATEGORIAS[cat].empresas.length)];
    let emp = empObj.n;
    let positiva = Math.random() > 0.45;
    let titulo = positiva ? NOTICIAS_POS[Math.floor(Math.random()*NOTICIAS_POS.length)] : NOTICIAS_NEG[Math.floor(Math.random()*NOTICIAS_NEG.length)];
    let impactoPct = positiva ? (0.08 + Math.random()*0.12) : -(0.08 + Math.random()*0.12);
    preciosMercado[emp] *= (1 + impactoPct);
    if (preciosMercado[emp] < 0.00001) preciosMercado[emp] = 0.00001;
    let boostKey = "news_" + cat;
    sectorBoost[boostKey] = positiva ? 1.08 : 0.92;
    setTimeout(() => { if (sectorBoost[boostKey]) sectorBoost[boostKey] = 1.0; }, 8000);

    let colorCat = CATEGORIAS[cat]?.color || "#888";
    let imagen = getImagenNoticia(emp);

    let div = document.createElement("div");
    div.className = "noticia";
    div.style.animation = "fadeIn 0.5s";
    div.innerHTML = `
        <img class="noticia-logo" src="${imagen}" data-empresa-logo="${emp}" alt="Logo de ${emp}" loading="lazy" onerror="this.onerror=null;this.src='assets/logos/logo-mark.png';">
        <div>
            <b style="color:${colorCat}">${emp}</b> ${titulo}<br>
            <span class="impacto ${positiva?'pos':'neg'}">${positiva ? '📈 Impacto Positivo +' + Math.abs(impactoPct*100).toFixed(1) + '%' : '📉 Impacto Negativo ' + impactoPct.toFixed(1) + '%'}</span>
            <span style="color:#555;font-size:0.75em;margin-left:8px;">${cat}</span>
        </div>`;
    let cont = document.getElementById("noticiasLista");
    if (cont) {
        cont.prepend(div);
        if (cont.children.length > 10) cont.lastChild.remove();
    }
}

function slugEmpresa(nombre) {
    return String(nombre || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'default';
}

const dominiosEmpresas = {
    "Visa": "visa.com", "Mastercard": "mastercard.com", "PayPal": "paypal.com", "Goldman Sachs": "goldmansachs.com",
    "Morgan Stanley": "morganstanley.com", "JPMorgan": "jpmorganchase.com", "Citi": "citi.com", "Bank of America": "bankofamerica.com",
    "Wells Fargo": "wellsfargo.com", "HSBC": "hsbc.com", "Santander": "santander.com", "BBVA": "bbva.com",
    "Apple": "apple.com", "Google": "google.com", "Microsoft": "microsoft.com", "Amazon": "amazon.com", "Meta": "meta.com",
    "Netflix": "netflix.com", "Samsung": "samsung.com", "Intel": "intel.com", "Nvidia": "nvidia.com", "Oracle": "oracle.com",
    "Adobe": "adobe.com", "Tesla": "tesla.com", "Xiaomi": "mi.com", "Sony": "sony.com", "Dell": "dell.com", "HP": "hp.com",
    "Lenovo": "lenovo.com", "Spotify": "spotify.com", "Uber": "uber.com", "Airbnb": "airbnb.com", "Palantir": "palantir.com",
    "OpenAI": "openai.com", "DeepMind": "deepmind.google", "Anthropic": "anthropic.com", "AI21 Labs": "ai21.com",
    "Brain Corp": "braincorp.com", "Databricks": "databricks.com", "Neuralink": "neuralink.com", "SenseTime": "sensetime.com",
    "Scale AI": "scale.com", "C3.ai": "c3.ai", "Cognizant": "cognizant.com", "Boston Dynamics": "bostondynamics.com",
    "Synthesia": "synthesia.io", "Graphcore": "graphcore.ai", "Hugging Face": "huggingface.co", "Jasper AI": "jasper.ai",
    "DataRobot": "datarobot.com", "Shield AI": "shield.ai", "Cohere": "cohere.com", "Stability AI": "stability.ai",
    "Runway ML": "runwayml.com", "Midjourney": "midjourney.com", "Perplexity": "perplexity.ai", "Character.AI": "character.ai",
    "ExxonMobil": "corporate.exxonmobil.com", "Shell": "shell.com", "Chevron": "chevron.com", "BP": "bp.com",
    "TotalEnergies": "totalenergies.com", "Petrobras": "petrobras.com.br", "Ecopetrol": "ecopetrol.com.co", "Enel": "enel.com",
    "Iberdrola": "iberdrola.com", "Repsol": "repsol.com", "Pfizer": "pfizer.com", "Moderna": "modernatx.com", "AstraZeneca": "astrazeneca.com",
    "J&J": "jnj.com", "Novartis": "novartis.com", "Roche": "roche.com", "Sanofi": "sanofi.com", "GSK": "gsk.com",
    "Bayer": "bayer.com", "Abbott": "abbott.com", "Merck": "merck.com", "Amgen": "amgen.com", "Eli Lilly": "lilly.com",
    "Coca-Cola": "coca-cola.com", "PepsiCo": "pepsico.com", "Nestle": "nestle.com", "Unilever": "unilever.com", "Nike": "nike.com",
    "Keurig Dr Pepper": "keurigdrpepper.com", "Coca-Cola Europacific": "cocacolaep.com", "Fomento Economico": "femsa.com",
    "Embotelladora Andina": "andina.com", "Coca-Cola Femsa": "coca-colafemsa.com", "Arca Continental": "arcacontal.com", "Danone": "danone.com",
    "Heineken": "heineken.com", "Diageo": "diageo.com", "Pernod Ricard": "pernod-ricard.com", "Constellation": "cbrands.com",
    "Brown-Forman": "brown-forman.com", "Ambev": "ambev.com.br", "Carlsberg": "carlsberggroup.com", "Boston Beer": "bostonbeer.com",
    "Monster Beverage": "monsterbevcorp.com", "Celsius": "celsius.com", "Pepsi": "pepsi.com", "P&G": "pg.com", "Colgate": "colgatepalmolive.com",
    "Adidas": "adidas.com", "Starbucks": "starbucks.com", "McDonald's": "mcdonalds.com", "Walmart": "walmart.com", "Costco": "costco.com",
    "Toyota": "toyota.com", "Ford": "ford.com", "BMW": "bmw.com", "Audi": "audi.com", "Mercedes": "mercedes-benz.com",
    "Nissan": "nissan-global.com", "Hyundai": "hyundai.com", "Kia": "kia.com", "Volkswagen": "volkswagen.com", "Ferrari": "ferrari.com",
    "Volvo": "volvocars.com", "Chevrolet": "chevrolet.com", "BYD": "byd.com", "Rivian": "rivian.com", "Disney": "disney.com",
    "Nintendo": "nintendo.com", "Sony": "sony.com", "YouTube": "youtube.com", "TikTok": "tiktok.com", "eBay": "ebay.com",
    "Shopify": "shopify.com", "Mercado Libre": "mercadolibre.com", "FedEx": "fedex.com", "Boeing": "boeing.com", "AT&T": "att.com",
    "Square Enix": "square-enix-games.com", "Sega": "sega.com", "Bandai Namco": "bandainamcoent.com", "Konami": "konami.com",
    "Nexon": "nexon.com", "NetEase": "neteasegames.com", "Sea Limited": "sea.com", "Roblox": "roblox.com",
    "Verizon": "verizon.com", "T-Mobile": "t-mobile.com", "Deutsche Bank": "db.com", "BlackRock": "blackrock.com", "Capital One": "capitalone.com"
};

const LOGO_DEV_TOKEN = 'pk_VKLWjmOBT_qzjtp___qpiQ';

function getEmpresaLogo(emp, tipo = 'empresa') {
    if (!emp) return tipo === 'noticia' ? 'assets/news/default.svg' : 'assets/logos/logo-mark.png';
    if (tipo === 'empresa') {
        if (LOGO_DEV_TOKEN) {
            const dominio = dominiosEmpresas[emp] || `${slugEmpresa(emp)}.com`;
            return `https://img.logo.dev/${dominio}?token=${encodeURIComponent(LOGO_DEV_TOKEN)}&size=128`;
        }
        return 'assets/logos/logo-mark.png';
    }
    return tipo === 'noticia' ? 'assets/news/default.svg' : 'assets/logos/logo-mark.png';
}

function getImagenNoticia(emp) {
    return getEmpresaLogo(emp);
}

setInterval(() => { if(usuarioActual) generarNoticia(); }, 10000);

// ==========================================
// DIVIDENDOS PASIVOS
// ==========================================
const SECTORES_DIVIDENDO = ["Salud","Consumo","Energia","Finanzas"];
setInterval(() => {
    if (!usuarioActual) return;
    let totalDiv = 0;
    Object.keys(portafolio).forEach(emp => {
        let meta = empresaMeta[emp];
        if (!meta || !SECTORES_DIVIDENDO.includes(meta.sector)) return;
        let valor = portafolio[emp].cant * preciosMercado[emp];
        let div = valor * 0.003;
        totalDiv += div;
    });
    if (totalDiv > 0) {
        capital += totalDiv;
        dividendosTotal += totalDiv;
        toast("💰 Dividendos recibidos: " + formatD(totalDiv), "success");
        checkDesafio("dividendos", 1);
        actualizarTodo(); guardar();
    }
}, 20000);

// ==========================================
// MOTOR DE MERCADO EN TIEMPO REAL
// ==========================================
let precioUpdateTimers = {};

function getRandomPrecioDelayMs() {
    return 1000 + Math.random() * 4000;
}

function updatePrecioEmpresa(emp) {
    let meta = empresaMeta[emp];
    if (!meta) {
        let delay = getRandomPrecioDelayMs();
        precioUpdateTimers[emp] = setTimeout(() => updatePrecioEmpresa(emp), delay);
        return;
    }
    if (usuarioActual) {
        let cat = meta.sector;
        let catMult = sectorBoost[cat] || 1.0;
        let newsMult = sectorBoost["news_"+cat] || 1.0;
        let variacion = (Math.random() - 0.5) * 2 * meta.vol * catMult * newsMult * 0.35;
        let oldPrice = preciosMercado[emp];
        let newPrice = oldPrice * (1 + variacion);
        if (newPrice < 0.00001) newPrice = 0.00001;
        preciosMercado[emp] = newPrice;
        let pctChange = ((newPrice - oldPrice) / oldPrice) * 100;
        meta.historial.push(pctChange);
        if (meta.historial.length > 5) meta.historial.shift();
        let safeId = obtenerIdSeguro(emp);
        let priceEl = document.getElementById(`price-${safeId}`);
        if (priceEl) {
            priceEl.innerText = formatD(newPrice);
        }
        let arrow = pctChange >= 0 ? "▲" : "▼";
        let arrowEl = document.getElementById(`arrow-${safeId}`);
        if (arrowEl) arrowEl.innerText = arrow;
        actualizarPreciosCooperativos(emp);
    }
    let delay = getRandomPrecioDelayMs();
    precioUpdateTimers[emp] = setTimeout(() => updatePrecioEmpresa(emp), delay);
}

function iniciarActualizacionPreciosAleatoria() {
    Object.keys(preciosMercado).forEach(emp => {
        if (precioUpdateTimers[emp]) clearTimeout(precioUpdateTimers[emp]);
        let delay = getRandomPrecioDelayMs();
        precioUpdateTimers[emp] = setTimeout(() => updatePrecioEmpresa(emp), delay);
    });
}

// Iniciar la actualizacion de precios despues de inicializar el mercado
iniciarActualizacionPreciosAleatoria();

// ==========================================
// TIENDA / INVERSIONES
// ==========================================
function obtenerIdSeguro(text) {
    return String(text).trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

function dibujarTienda() {
    const cont = document.getElementById("inversionesContenedor");
    cont.innerHTML = "";
    Object.entries(CATEGORIAS).forEach(([cat, data]) => {
        let div = document.createElement("div");
        div.className = "card categoria-card";
        div.dataset.categoria = cat;
        let locked = nivel < data.lvl;
        div.innerHTML = `<h3 style="color:${data.color}">${cat} <small style="color:#666; font-size:0.7em;">(Nivel ${data.lvl}${locked?' 🔒':''})</small></h3>`;
        let list = document.createElement("div");
        list.className = "empresa-list";
        data.empresas.forEach(e => {
            let emp = e.n;
            let safeId = obtenerIdSeguro(emp);
            let meta = empresaMeta[emp];
            let trend = meta.historial.slice(-3);
            let avgTrend = trend.reduce((a,b)=>a+b,0)/trend.length;
            let arrow = avgTrend >= 0 ? "▲" : "▼";
            let trendColor = avgTrend >= 0 ? 'var(--success)' : 'var(--danger)';
            let row = document.createElement("div");
            row.className = "empresa-row";
            row.dataset.empresa = emp;
            row.dataset.categoryColor = data.color;
            row.style.cssText = `border-top: 1px solid rgba(255,255,255,0.1) !important; border-right: 1px solid rgba(255,255,255,0.1) !important; border-bottom: 1px solid rgba(255,255,255,0.1) !important; border-left: 4px solid ${data.color} !important;`;
            row.innerHTML = `
                <button class="btn-comprar-accion" id="btn-${safeId}" ${locked ? 'disabled' : ''}>Comprar</button>
                <div class="empresa-logo">
                    <img src="${getEmpresaLogo(emp)}" data-empresa-logo="${emp}" alt="${emp}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/logos/logo-mark.png';">
                </div>
                <div class="empresa-meta">
                    <div class="emp-name">${emp}</div>
                    <div class="emp-sector">Sector: ${meta.sector}</div>
                </div>
                <div class="company-price">
                    <div class="price-label">Precio por acción</div>
                    <div class="price-tag" id="price-${safeId}">${formatD(preciosMercado[emp])}</div>
                </div>
                <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
                    <span class="trend-arrow" id="arrow-${safeId}" style="color:${trendColor};">${arrow}</span>
                    <span class="volat-tag">Vol ${Math.round(meta.vol*100)}%</span>
                </div>
            `;
            row.querySelector('.btn-comprar-accion').onclick = () => {
                solicitarCompraAccion(emp);
            };
            list.appendChild(row);
        });
        div.appendChild(list);
        cont.appendChild(div);
    });
}

let compraPendiente = null;
let modalActionType = null;

function resetModalConfirmState() {
    compraPendiente = null;
    ventaPendiente = null;
    modalActionType = null;
    const btn = document.getElementById("modalConfirmBtn");
    if (btn) {
        btn.style.display = "";
        btn.innerText = "Confirmar";
        btn.style.background = "";
        btn.removeAttribute('data-action');
    }
}

function refreshConfirmModal() {
    const modal = document.getElementById("modalConfirm");
    if (!modal || !modal.classList.contains("active")) return;
    if (modalActionType === 'venta' && ventaPendiente) {
        const p = portafolio[ventaPendiente];
        if (!p) return;
        const precio = preciosMercado[ventaPendiente] || 0;
        const ingreso = precio * p.cant;
        const costoTotal = p.precioCompra * p.cant;
        const beneficio = ingreso - costoTotal;
        const rendPct = ((precio - p.precioCompra) / p.precioCompra * 100).toFixed(2);
        const ingresoEl = document.getElementById("modalIngresoInfo");
        if (ingresoEl) ingresoEl.innerText = formatD(ingreso);
        const rendSpan = document.getElementById("modalRendimientoInfo");
        if (rendSpan) {
            rendSpan.innerText = `${rendPct}% (${formatD(beneficio)})`;
            rendSpan.style.color = beneficio >= 0 ? 'var(--success)' : 'var(--danger)';
        }
        const btn = document.getElementById("modalConfirmBtn");
        if (btn) {
            btn.innerText = "Vender";
            btn.style.background = beneficio >= 0 ? "var(--success)" : "var(--danger)";
        }
    } else if (modalActionType === 'compra' && compraPendiente) {
        const precio = preciosMercado[compraPendiente] || 0;
        const precioInfoEl = document.getElementById("modalPriceInfo");
        if (precioInfoEl) precioInfoEl.innerText = formatD(precio);
        const capitalInfoEl = document.getElementById("modalCapitalInfo");
        if (capitalInfoEl) capitalInfoEl.innerText = formatD(capital);
    }
}

function solicitarCompraAccion(empresa) {
    resetModalConfirmState();
    compraPendiente = empresa;
    modalActionType = 'compra';
    const precio = preciosMercado[empresa] || 0;
    document.getElementById("modalTitle").innerText = `Comprar ${empresa}`;
    document.getElementById("modalText").innerHTML = `
        <p>¿Cuánto deseas invertir en <b>${empresa}</b>?</p>
        <input id="modalPurchaseAmount" class="modal-input" type="text" inputmode="numeric" autocomplete="off" placeholder="Monto en ${monedaActual}" value="" oninput="formatearMontoInversion(this)" />
        <p style="margin-top: 8px; color: #ccc; font-size: 0.9em;">Precio por acción: <strong id="modalPriceInfo">${formatD(precio)}</strong> • Capital disponible: <strong id="modalCapitalInfo">${formatD(capital)}</strong></p>
    `;
    const confirmBtn = document.getElementById("modalConfirmBtn");
    if (confirmBtn) {
        confirmBtn.innerText = "Comprar";
        confirmBtn.style.background = "var(--success)";
        confirmBtn.dataset.action = 'compra';
    }
    document.getElementById("modalConfirm").classList.add("active");
    refreshConfirmModal();
    setTimeout(() => {
        const input = document.getElementById("modalPurchaseAmount");
        if (input) input.focus();
    }, 120);
}

function confirmarModalAccion() {
    const confirmBtn = document.getElementById("modalConfirmBtn");
    const action = confirmBtn?.dataset?.action || modalActionType;

    if (action === 'compra') {
        let amountInput = leerMontoInversion(document.getElementById("modalPurchaseAmount")?.value);
        if (amountInput <= 0) {
            return toast("Ingresa un monto válido para invertir.", "error");
        }
        comprarAccion(compraPendiente, amountInput);
        cerrarModal();
        return;
    }
    if (action === 'venta') {
        confirmarVenta();
        return;
    }
    if (action === 'venta_cooperativa') {
        confirmarVentaCooperativa();
        return;
    }
    if (action === 'recarga_tarjeta') {
        confirmarRecargaTarjeta();
        return;
    }
    if (action === 'retiro_tarjeta') {
        confirmarRetiroTarjeta();
        return;
    }
    if (action === 'pago_plan') {
        confirmarPagoPlan();
        return;
    }

    const title = document.getElementById("modalTitle")?.innerText || "";
    const btnText = confirmBtn?.innerText || "";
    if (title.toLowerCase().includes('venta') || btnText.toLowerCase().includes('vender')) {
        confirmarVenta();
        return;
    }
    if (title.toLowerCase().includes('comprar') || btnText.toLowerCase().includes('comprar')) {
        let amountInput = leerMontoInversion(document.getElementById("modalPurchaseAmount")?.value);
        if (amountInput <= 0) {
            return toast("Ingresa un monto válido para invertir.", "error");
        }
        comprarAccion(compraPendiente, amountInput);
        cerrarModal();
        return;
    }
    if (title.toLowerCase().includes('recargar') || btnText.toLowerCase().includes('confirmar')) {
        confirmarRecargaTarjeta();
        return;
    }
    console.warn('confirmarModalAccion: acción desconocida', action, modalActionType, title, btnText);
}

function comprarAccion(empresa, montoInput) {
    let precio = preciosMercado[empresa] || 0;
    let cant = 0;
    let amountValue = montoInput !== undefined && montoInput !== null ? montoInput : '';
    let isMax = String(amountValue).trim().toUpperCase() === "MAX";
    if (isMax) {
        cant = Math.round((capital / precio) * 10000) / 10000;
        if (cant <= 0) return toast("Capital insuficiente", "error");
    } else {
        let monto = parseFloat(amountValue);
        if (!isNaN(monto) && monto > 0) {
            cant = Math.round((monto / precio) * 10000) / 10000;
            if (cant <= 0) return toast(`Con ${formatD(monto)} no alcanza para 1 acción de ${empresa}.`, "error");
        } else {
            cant = Math.round((1 / precio) * 10000) / 10000;
        }
    }
    let costo = precio * cant;
    if (capital < costo) return toast("Fondos insuficientes", "error");
    if (cant <= 0) return toast("Cantidad invalida", "error");

    capital -= costo;
    let sector = empresaMeta[empresa]?.sector;
    let sectorNuevo = sector && !Object.keys(portafolio).some(e => empresaMeta[e]?.sector === sector);
    let historialEmpresa = empresaMeta[empresa]?.historial || [];
    let trend = historialEmpresa.length ? historialEmpresa.slice(-3).reduce((acc, value) => acc + value, 0) / Math.min(historialEmpresa.length, 3) : 0;
    if (trend < 0) forzarProgresoMision('comprar_baja');
    if (sectorNuevo) forzarProgresoMision('nuevo_sector');
    if (sector === 'Salud' || sector === 'Consumo') forzarProgresoMision('sector_seguro');
    avanzarProgresoMision('compras_rapidas', 1/3);

    if (!portafolio[empresa]) portafolio[empresa] = { cant: 0, precioCompra: 0, compraTime: Date.now() };
    let oldCant = portafolio[empresa].cant;
    let newCant = oldCant + cant;
    portafolio[empresa].precioCompra = ((portafolio[empresa].precioCompra * oldCant) + costo) / newCant;
    portafolio[empresa].cant = newCant;
    portafolio[empresa].compraTime = portafolio[empresa].compraTime || Date.now();

    totalInv++;
    if (!flagFirstBuy) { flagFirstBuy = true; checkLogros(); }
    subirXP(Math.max(1, Math.round(cant * 0.5)));


    toast(`Compraste ${cant} de ${empresa} (${empresaMeta[empresa].sector})`, "success");
    
    // Check desafios
    checkDesafio("comprar", 1);
    checkDesafio("comprar_monto", cant);
    checkDesafio("diversificar", Object.keys(portafolio).length);
    checkDesafio("sector", empresaMeta[empresa].sector);
    checkDesafio("comprar_baja", 1);
    checkDesafio("operaciones", 1);
    checkDesafio("nuevo_sector", empresaMeta[empresa].sector);
    
    actualizarTodo(); guardar(); checkLogros();
}

// ==========================================
// VENTA CON MODAL DE CONFIRMACION
// ==========================================
let ventaPendiente = null;

function venderAccion(empresa) {
    resetModalConfirmState();
    let p = portafolio[empresa];
    if (!p) return;
    let ingreso = preciosMercado[empresa] * p.cant;
    let costoTotal = p.precioCompra * p.cant;
    let beneficio = ingreso - costoTotal;
    let rendPct = ((preciosMercado[empresa] - p.precioCompra) / p.precioCompra * 100).toFixed(2);

    ventaPendiente = empresa;
    modalActionType = 'venta';
    document.getElementById("modalTitle").innerText = "Confirmar Venta";
    document.getElementById("modalText").innerHTML = `
        Vas a vender <b>${p.cant}</b> acciones de <b>${empresa}</b>.<br><br>
        Ingreso estimado: <b id="modalIngresoInfo">${formatD(ingreso)}</b><br>
        Rendimiento: <span id="modalRendimientoInfo" style="color:${beneficio>=0?'var(--success)':'var(--danger)'}">${rendPct}% (${formatD(beneficio)})</span>
    `;
    const confirmBtn = document.getElementById("modalConfirmBtn");
    if (confirmBtn) {
        confirmBtn.innerText = "Vender";
        confirmBtn.style.background = beneficio >= 0 ? "var(--success)" : "var(--danger)";
        confirmBtn.dataset.action = 'venta';
    }
    document.getElementById("modalConfirm").classList.add("active");
    refreshConfirmModal();
}

function confirmarVenta() {
    let empresa = ventaPendiente;
    if (!empresa || !portafolio[empresa]) {
        cerrarModal();
        return;
    }

    let p = portafolio[empresa];
    let ingreso = preciosMercado[empresa] * p.cant;
    let costoTotal = p.precioCompra * p.cant;
    let beneficio = ingreso - costoTotal;

    capital += ingreso;
    if (beneficio > 0) gananciasTotal += beneficio;
    else perdidasTotal += Math.abs(beneficio);

    if (beneficio >= 1000 && !flagProfit1k) { flagProfit1k = true; checkLogros(); }

    if (beneficio > 0) {
        let pctGan = beneficio / Math.max(1, costoTotal);
        if (pctGan > 0.25) safeModificarReputacion(3, `Venta exitosa: ${empresa}`);
        forzarProgresoMision('vender_ganancia');
        if (beneficio >= 2000) forzarProgresoMision('ganancia_2k');
    }

    delete portafolio[empresa];
    if (selectedEmpresaPortafolio === empresa) {
        selectedEmpresaPortafolio = null;
        actualizarPortafolioInfoLabel();
    }
    totalInv++;
    subirXP(10);
    toast(beneficio >= 0 ? "Venta exitosa" : "Venta realizada con perdidas", beneficio >= 0 ? "success" : "warning");
    
    // Check desafios
    checkDesafio("vender", 1);
    checkDesafio("ganancia_venta", beneficio);
    checkDesafio("rendimiento", parseFloat(((preciosMercado[empresa] - p.precioCompra) / p.precioCompra * 100).toFixed(2)));
    checkDesafio("operaciones", 1);

    cerrarModal();
    actualizarTodo(); guardar(); checkLogros();
}

function cerrarModal() {
    document.getElementById("modalConfirm").classList.remove("active");
    resetModalConfirmState();
}


// ==========================================
// ACTUALIZACION GLOBAL DE UI
// ==========================================
function actualizarTodo() {
    let valorActivos = Object.keys(portafolio).reduce((acc, e) => acc + (portafolio[e].cant * preciosMercado[e]), 0);
    let neto = getCapitalConTarjeta() + valorActivos - deuda;
    let capitalVisible = getCapitalConTarjeta();

    document.getElementById("capitalHeader").innerText = formatD(capitalVisible);
    actualizarImportesMoneyShop();
    document.getElementById("panelCapital").innerText = formatD(capitalVisible);
    document.getElementById("ganancias").innerText = formatD(gananciasTotal);
    document.getElementById("perdidas").innerText = formatD(perdidasTotal);
    document.getElementById("panelDeuda").innerText = formatD(deuda);
    document.getElementById("balance").innerText = formatD(neto);
    document.getElementById("nivelHeader").innerText = nivel;
    document.getElementById("capitalPortafolio").innerText = formatD(capitalVisible);
    document.getElementById("totalInv").innerText = totalInv;
    document.getElementById("deudaTexto").innerText = formatD(deuda);
    document.getElementById("dividendosTotal").innerText = formatD(dividendosTotal);
    aplicarIdioma();

    let xpMax = calcXPMax();
    document.getElementById("xpTexto").innerText = `${xp} / ${xpMax} XP`;
    document.getElementById("xpBar").style.width = Math.min(100, (xp/xpMax)*100) + "%";

    // ===== PORTAFOLIO TABLE - CORREGIDA =====
    const lista = document.getElementById("listaPortafolio");
    const portafolioVacio = document.getElementById("portafolioVacio");
    const tablaContainer = lista ? lista.closest('table') : null;
    
    if (lista) {
        lista.innerHTML = "";
        let empresasPortafolio = Object.keys(portafolio);
        
        if (empresasPortafolio.length === 0) {
            if (portafolioVacio) portafolioVacio.style.display = "block";
            if (tablaContainer) tablaContainer.style.display = "none";
        } else {
            if (portafolioVacio) portafolioVacio.style.display = "none";
            if (tablaContainer) tablaContainer.style.display = "table";
            
            empresasPortafolio.forEach(emp => {
                let p = portafolio[emp];
                let actual = preciosMercado[emp];
                let rend = ((actual - p.precioCompra) / p.precioCompra * 100);
                let totalVal = p.cant * actual;
                let meta = empresaMeta[emp];
                let spark = meta.historial.map((v,i) => {
                    let h = Math.max(10, Math.min(30, 15 + v*3));
                    let col = v >= 0 ? 'var(--success)' : 'var(--danger)';
                    return `<div style="display:inline-block;width:3px;height:${h}px;background:${col};margin-right:2px;border-radius:1px;opacity:${0.4 + (i/10)};"></div>`;
                }).join('');
                let ganancias = (actual - p.precioCompra) * p.cant;
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div class="empresa-logo empresa-logo-sm">
                                <img src="${getEmpresaLogo(emp)}" data-empresa-logo="${emp}" alt="${emp}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/logos/logo-mark.png';">
                            </div>
                            <div>
                                <b>${emp}</b><br><small style="color:#666">${meta.sector}</small>
                            </div>
                        </div>
                    </td>
                    <td>${p.cant}</td>
                    <td>${formatD(p.precioCompra)}</td>
                    <td style="color:${actual>=p.precioCompra?'var(--success)':'var(--danger)'}">${formatD(actual)}</td>
                    <td style="color:${rend>=0?'var(--success)':'var(--danger)'}">${rend.toFixed(2)}%</td>
                    <td style="color:${ganancias>=0?'var(--success)':'var(--danger)'}">${formatD(ganancias)}</td>
                    <td>${spark}</td>
                    <td><button class="btn-vender" onclick="event.stopPropagation(); venderAccion('${emp}')">Vender</button></td>
                `;
                tr.className = selectedEmpresaPortafolio === emp ? 'selected-row' : '';
                tr.style.cursor = 'pointer';
                tr.onclick = () => seleccionarEmpresaPortafolio(emp);
                lista.appendChild(tr);
            });
        }
    }

    // Estado financiero
    const txt = document.getElementById("estadoTexto");
    txt.classList.remove("estado-critico");
    if (neto < 30000) { 
            txt.innerText = "🚨 Situacion Critica — Liquidez de emergencia recomendada"; 
            txt.classList.add("estado-critico"); 
            // Penalizacion por critico sostenido (probabilidad baja para no ser excesiva)
            // La reputacion ya no se ajusta por situacion financiera pasiva; solo por decisiones del jugador
        }
    else if (neto > 5000000) { txt.innerText = "👑 Magnate Supremo del Mercado"; txt.style.color = "var(--primary)"; }
    else if (neto > 1000000) { txt.innerText = "🏆 Magnate de Negocios"; txt.style.color = "var(--primary)"; }
    else if (neto > 500000) { txt.innerText = "📈 Inversor Exitoso"; txt.style.color = "var(--success)"; }
    else { txt.innerText = "📊 Cartera Estable — Sigue diversificando"; txt.style.color = "#aaa"; }

    // Grafica
    if (chartPanel) {
        const delta = neto - startNetPanel;
        chartPanel.data.datasets[0].data.push(delta);
        chartPanel.data.labels.push("");
        if (chartPanel.data.datasets[0].data.length > 30) {
            chartPanel.data.datasets[0].data.shift();
            chartPanel.data.labels.shift();
        }
        updateChartLineColor(chartPanel);
        chartPanel.update('none');
    }

    actualizarChartPortafolio();
    actualizarInfoBancos();
    
    // Update reputation, advisors, skills, challenges, missions if visible
    if (asesoresRenderPending) renderAsesores();
    if (habilidadesRenderPending) renderHabilidades();
    if (reputacionRenderPending) renderReputacion();
    if (desafiosRenderPending) renderDesafios();
    
    // Check desafios that depend on state
    checkDesafio("capital", capital);
    checkDesafio("patrimonio", neto);
    checkDesafio("sectores_dif", new Set(Object.keys(portafolio).map(e => empresaMeta[e]?.sector).filter(Boolean)).size);

    // Asegurar que el contador de próxima misión esté activo (no crea múltiples intervalos)
    try { startCountdownSiguienteMision(); } catch (e) {}
}

// Render flags to avoid unnecessary renders
let asesoresRenderPending = false;
let habilidadesRenderPending = false;
let reputacionRenderPending = false;
let desafiosRenderPending = false;

// ==========================================
// MERCADO LISTA COMPLETO — TODAS LAS CATEGORIAS
// ==========================================
function renderMercadoCompleto() {
    if (!usuarioActual) return;
    let cont = document.getElementById("mercadoCategorias");
    if (!cont) return;
    cont.innerHTML = "";
    Object.entries(CATEGORIAS).forEach(([cat, data]) => {
        let catDiv = document.createElement("div");
        catDiv.style.cssText = "margin-bottom: 20px;";
        let locked = nivel < data.lvl;
        let header = document.createElement("div");
        header.style.cssText = `display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:linear-gradient(90deg, ${data.color}22, transparent); border-left:4px solid ${data.color}; border-radius:8px; margin-bottom:10px;`;
        header.innerHTML = `<div><b style="color:${data.color}; font-size:1.1em;">${cat}</b> <small style="color:#666">(${data.empresas.length} empresas${locked ? ' — 🔒 Nivel ' + data.lvl : ''})</small></div>`;
        catDiv.appendChild(header);

        let grid = document.createElement("div");
        grid.style.cssText = "display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px;";

        data.empresas.forEach(e => {
            let emp = e.n;
            let meta = empresaMeta[emp];
            let p = preciosMercado[emp];
            let trend = meta.historial[meta.historial.length-1] || 0;
            let displayColor = trend >= 0 ? "#00e676" : "#ff5252";
            let arrow = trend >= 0 ? "▲" : "▼";
            let trendPct = trend.toFixed(1);
            let safeId = obtenerIdSeguro(emp);

            let card = document.createElement("div");
            card.id = `mercado-card-${emp}`;
            card.style.cssText = `background:rgba(0,0,0,0.3); padding:10px; border-radius:8px; border:1px solid ${data.color}33; transition:all 0.3s;`;
            card.innerHTML = `
                <div class="mercado-card-header">
                    <img class="mercado-logo" src="${getEmpresaLogo(emp)}" data-empresa-logo="${emp}" alt="Logo de ${emp}" loading="lazy" onerror="this.onerror=null;this.src='assets/logos/logo-mark.png';">
                    <div class="mercado-company-name" style="color:${data.color};">${emp}</div>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; gap: 8px;">
                    <span class="price-tag" id="price-${safeId}" style="color:${displayColor}; font-size:0.9em; font-weight:800;">${formatD(p)}</span>
                    <span class="trend-arrow" id="trend-arrow-${safeId}" style="color:${displayColor}; font-size:0.95em; font-weight:800;">${arrow}</span>
                    <span class="trend-pct" id="trend-pct-${safeId}" style="color:${displayColor}; font-size:0.75em; font-weight:700;">${trendPct}%</span>
                </div>
                <div class="volat-tag" style="font-size:0.6em; color:#666; margin-top:3px;">vol: ${(meta.vol*100).toFixed(1)}%</div>
            `;
            grid.appendChild(card);
        });

        catDiv.appendChild(grid);
        cont.appendChild(catDiv);
    });
}

// Actualizar precios en el mercado sin re-renderizar todo
setInterval(() => {
    if (!usuarioActual) return;
    Object.entries(CATEGORIAS).forEach(([cat, data]) => {
        data.empresas.forEach(e => {
            let emp = e.n;
            let card = document.getElementById(`mercado-card-${emp}`);
            if (!card) return;
            let meta = empresaMeta[emp];
            let p = preciosMercado[emp];
            let trend = meta.historial[meta.historial.length-1] || 0;
            let arrow = trend >= 0 ? "▲" : "▼";
            let trendPct = trend.toFixed(1);

            // Colores de mercado ajustados - verde/rojo mas claros para mejor visibilidad
            let marketGreen = "#00e676";
            let marketRed = "#ff5252";
            let displayColor = trend >= 0 ? marketGreen : marketRed;

            const priceTag = card.querySelector('.price-tag');
            const arrowEl = card.querySelector('.trend-arrow');
            const trendPctEl = card.querySelector('.trend-pct');
            const volTag = card.querySelector('.volat-tag');

            if (priceTag) priceTag.innerText = formatD(p);
            if (arrowEl) {
                arrowEl.innerText = arrow;
                arrowEl.style.color = displayColor;
            }
            if (trendPctEl) {
                trendPctEl.innerText = `${trendPct}%`;
                trendPctEl.style.color = displayColor;
            }
            if (volTag) volTag.innerText = `vol: ${(meta.vol*100).toFixed(1)}%`;
        });
    });

    if (document.getElementById("modalConfirm")?.classList.contains("active")) {
        refreshConfirmModal();
    }

    // Si el mercado no ha sido renderizado aún, renderizarlo
    let cont = document.getElementById("mercadoCategorias");
    if (cont && cont.children.length === 0) renderMercadoCompleto();
}, 800);

// ==========================================
// CONSEJOS / APRENDIZAJE
// ==========================================

// ==========================================
// WIKI EDUCATIVA - Articulos de Aprendizaje
// ==========================================
const WIKI_ARTICULOS = [
    // ========== ESTRATEGIA (9) ==========
    {
        id: "w1", cat: "estrategia", nivel: "basico", color: "#00ff88",
        titulo: "No pongas todos los huevos en una canasta",
        explicacion: "Diversificar significa repartir tu dinero entre varias empresas. Asi si una cae, las otras te protegen.",
        ejemplo: "Invierte $20,000 en 4 empresas de sectores distintos (Tecnologia, Salud, Consumo, Finanzas). Si Tecnologia cae 10%, Salud puede subir y compensar.",
        cuando: ["Al empezar el juego", "Cuando tienes mas de $50,000", "Antes de un evento mundial"],
        error: "Comprar 500 acciones de la misma empresa porque 'sube mucho'. Un evento crisis puede borrar el 40%.",
        impacto: "Reduccion de riesgo del 60%. Ganancias mas estables por minuto. +50 XP al diversificar en 5 sectores.",
        consejo: "Nunca mas del 30% de tu capital en una sola empresa.",
        frase: "La diversificacion es el unico almuerzo gratis de la inversion.",
        relacion: ["w4", "w7"]
    },
    {
        id: "w2", cat: "estrategia", nivel: "basico", color: "#00ff88",
        titulo: "Compra en rojo, vende en verde",
        explicacion: "Las acciones bajan y suben constantemente. Comprar cuando estan bajas y vender cuando suben es la base de la ganancia.",
        ejemplo: "Apple esta a $150 y baja a $135 (-10%). Si compras 100 acciones a $135 y vuelve a $150, ganas $1,500.",
        cuando: ["Cuando una accion baja mas de 8%", "Durante un evento crisis", "Cuando un asesor predice subida"],
        error: "Vender en panico cuando una accion baja un 5%. Luego sube y te arrepientes.",
        impacto: "Diferencia de +15% a +25% en rendimiento por operacion. +100 XP por venta con +15%.",
        consejo: "Fijate en la flecha de tendencia antes de comprar. ▲ = subiendo, ▼ = bajando.",
        frase: "El dinero se hace esperando, no corriendo.",
        relacion: ["w6", "w10"]
    },
    {
        id: "w3", cat: "estrategia", nivel: "basico", color: "#00ff88",
        titulo: "El prestamo como trampolin, no como red",
        explicacion: "Pedir prestamo multiplica tu capital inicial. Pero si pierdes, la deuda te come con intereses.",
        ejemplo: "Tienes $100,000. Pides $50,000 al banco con baja tasa. Inviertes todo en Energia. Si Energia sube 20% con un Boom, ganas $30,000 neto.",
        cuando: ["Cuando tienes un asesor con alta precision", "Durante un evento Boom", "Si tu deuda es 0 y capital > $80,000"],
        error: "Pedir prestamo maximo e invertir todo en Criptomonedas. Un crash te deja con deuda imposible.",
        impacto: "Multiplicador 1.5x a 2x de velocidad de crecimiento. Riesgo de quiebra si el mercado gira.",
        consejo: "Solo apalancate si la inversion tiene +70% probabilidad de subir segun tus asesores.",
        frase: "El apalancamiento acelera tu victoria... o tu caida.",
        relacion: ["w9", "w14"]
    },
    {
        id: "w16", cat: "estrategia", nivel: "intermedio", color: "#00ff88",
        titulo: "Promedia a la baja para reducir costos",
        explicacion: "Si compraste caro y el precio baja, comprar mas acciones a menor precio reduce tu costo promedio total.",
        ejemplo: "Compraste 100 acciones de Microsoft a $330. Baja a $300. Compras 100 mas a $300. Tu nuevo costo promedio es $315, no $330.",
        cuando: ["Cuando una accion baja 10%+ desde tu compra", "Si la empresa tiene fundamentales solidos", "Cuando el sector tiene un boom pendiente"],
        error: "Promediar acciones de sectores en crisis prolongada como Cripto durante regulacion severa.",
        impacto: "Recuperacion de perdidas un 30% mas rapida. Reduce punto de breakeven.",
        consejo: "Solo promedia en empresas de sectores estables (Salud, Consumo, Energia).",
        frase: "El promedio inteligente es el arte de comprar miedo.",
        relacion: ["w2", "w10"]
    },
    {
        id: "w17", cat: "estrategia", nivel: "intermedio", color: "#00ff88",
        titulo: "La estrategia de dividendo compuesto",
        explicacion: "Reinvertir los dividendos que recibes crece tu capital exponencialmente sin necesidad de depositar mas dinero.",
        ejemplo: "Recibes $500 en dividendos de empresas de Salud. En lugar de gastarlos, compras 5 acciones mas de Pfizer. Esas 5 acciones generan mas dividendos luego.",
        cuando: ["Al recibir cualquier dividendo", "Cuando tu portafolio tiene mas de 10 empresas de dividendos", "Al alcanzar nivel 5+"],
        error: "Dejar dividendos acumulados sin reinvertir. Pierdes el efecto bola de nieve.",
        impacto: "+15% a +25% de crecimiento anual adicional por reinversion. +200 XP al reinvertir 10 dividendos.",
        consejo: "Empresas de Salud, Consumo, Energia y Finanzas pagan dividendos cada 20 segundos.",
        frase: "El octavo milagro del mundo es el interes compuesto.",
        relacion: ["w10", "w11"]
    },
    {
        id: "w18", cat: "estrategia", nivel: "intermedio", color: "#00ff88",
        titulo: "Timing de sector: rotacion estrategica",
        explicacion: "Los sectores suben y bajan en ciclos. Vender un sector caro para comprar uno barato maximiza rendimientos.",
        ejemplo: "Tecnologia subio 40% en 5 minutos. Mineria esta estancada. Vendes Apple con +35% y compras BHP barato. Cuando Mineria tenga su Boom, ganas doble.",
        cuando: ["Cuando un sector subio mas de 30%", "Durante un evento que favorece otro sector", "Si tienes asesores especializados en el sector destino"],
        error: "Vender un sector que apenas empieza a subir porque 'ya subio mucho'. Deja correr las ganancias.",
        impacto: "+20% a +40% extra por rotacion correcta. Aprovechas multiples ciclos.",
        consejo: "Nunca vendas todo. Deja un 30% para seguir beneficiandote si sigue subiendo.",
        frase: "Los sectores son como las estaciones: cada uno tiene su momento.",
        relacion: ["w6", "w16"]
    },
    {
        id: "w19", cat: "estrategia", nivel: "avanzado", color: "#00ff88",
        titulo: "Arbitraje de eventos: compra antes del rumor",
        explicacion: "Si un asesor predice un evento y tu habilidad de noticias esta alta, puedes anticiparte al mercado y comprar antes del Boom.",
        ejemplo: "Tu asesor Macro predice subida de Energia. Compras Ecopetrol, SolarEdge y NextEra. Llega el Boom +70% en 60 segundos. Vendes al pico.",
        cuando: ["Cuando un asesor de 80%+ precision hace una prediccion", "Si tienes la habilidad Visor de Noticias nivel 5+", "Si tu reputacion es Celebridad o superior"],
        error: "Comprar antes de confirmar la prediccion del asesor. Las predicciones fallan.",
        impacto: "+50% a +100% en ganancias de evento. Riesgo alto si el asesor falla.",
        consejo: "Diversifica dentro del sector. Compra 3-5 empresas del sector objetivo, no solo 1.",
        frase: "La informacion es el activo mas valioso del mercado.",
        relacion: ["w14", "w15"]
    },
    {
        id: "w20", cat: "estrategia", nivel: "avanzado", color: "#00ff88",
        titulo: "Gestión de salarios de asesores: ROI por asesor",
        explicacion: "Cada asesor cuesta salario cada 30 segundos. Un asesor caro que no acierta es un agujero de capital. Calcula su ROI.",
        ejemplo: "Contratas al Oraculo ($2,500/30s). Si acierta 3 de 4 predicciones y cada acierto te gana $15,000: ROI = $45,000 ganado - $2,500 salario = positivo.",
        cuando: ["Al contratar asesores de nivel 7+", "Cada 5 minutos revisa el historial de predicciones", "Si tu capital baja rapidamente sin razon"],
        error: "Contratar 5 asesores caros simultaneamente sin tener el capital para mantenerlos 10 minutos.",
        impacto: "Ahorro del 40% en salarios. Solo manten asesores rentables.",
        consejo: "Despide asesores con menos de 40% de aciertos. Contrata especialistas del sector que esta en auge.",
        frase: "Un equipo pequeno y eficiente vence a un ejercito de incompetentes.",
        relacion: ["w14", "w12"]
    },
    {
        id: "w21", cat: "estrategia", nivel: "avanzado", color: "#00ff88",
        titulo: "La sinergia completa: habilidades + asesores + reputacion",
        explicacion: "Las 3 mecanicas principales se potencian mutuamente. Maximizar las tres juntas es la clave del crecimiento exponencial.",
        ejemplo: "Ojo de Aguila nivel 10 (+80% precision) + Asesor Legendario (78% base = 98% final) + Reputacion Leyenda (-12% descuento en compras) = Compras baratas, predicciones casi infalibles.",
        cuando: ["Al alcanzar nivel 15+", "Cuando tienes 50+ PH acumulados", "Si ya tienes 5+ asesores contratados"],
        error: "Subir una sola mecanica y descuidar las otras dos. Necesitan balance.",
        impacto: "Multiplicador 3x a 5x en velocidad de crecimiento. Patrimonio de $1M en tiempo record.",
        consejo: "Prioridad: Ojo de Aguila > Negociador > Prestigio. Esas 3 habilidades cambian todo.",
        frase: "El todo es mayor que la suma de sus partes.",
        relacion: ["w15", "w18"]
    },
    // ========== RIESGO (9) ==========
    {
        id: "w4", cat: "riesgo", nivel: "basico", color: "#ff4444",
        titulo: "El 30% de tu patrimonio es tu limite de emergencia",
        explicacion: "Si tu patrimonio cae debajo de $30,000, el juego entra en zona critica. Comprar mas es suicidio financiero.",
        ejemplo: "Tu patrimonio es $45,000. Una crisis global hace que todo caiga un 30%. Ahora tienes $31,500. Para. No compres. Espera.",
        cuando: ["Cuando el panel muestra 'Situacion Critica'", "Durante un evento crisis prolongado", "Si tu capital < $15,000"],
        error: "Seguir comprando acciones baratas con capital en $8,000. Si el mercado sigue cayendo, quiebras.",
        impacto: "Evitar perdidas totales. Conservar capital para recomprar en el fondo. +200 XP al recuperarse de critico.",
        consejo: "Si el panel dice critico, vende lo peor de tu portafolio y espera.",
        frase: "Sobrevivir es ganar. Los muertos no invierten.",
        relacion: ["w1", "w11"]
    },
    {
        id: "w5", cat: "riesgo", nivel: "basico", color: "#ff4444",
        titulo: "Cripto e IA: Oro o Veneno",
        explicacion: "Estos sectores tienen volatilidad del 12% y 8%. Pueden duplicarse en minutos... o desplomarse un 60%.",
        ejemplo: "Invirtiendo $10,000 en Bitcoin al inicio de un Boom de IA: +$8,000 en 2 minutos. Pero en crisis: -$6,000.",
        cuando: ["Solo si tienes +$200,000 de patrimonio", "Cuando un asesor de IA/Cripto acierta 3 veces seguidas", "Con habilidad 'Resistencia' al maximo"],
        error: "Meter el 50% del portafolio en Cripto porque 'Bitcoin siempre sube'. En este simulador, no siempre.",
        impacto: "Potencial de x2 a x5 en ganancias. Riesgo de perder el 50% del valor en 30 segundos.",
        consejo: "Maximo 15% de tu portafolio en sectores de alta volatilidad.",
        frase: "El que juega con fuego puede calentarse... o quemarse.",
        relacion: ["w3", "w13"]
    },
    {
        id: "w6", cat: "riesgo", nivel: "basico", color: "#ff4444",
        titulo: "Los eventos mundiales son tu calendario de oportunidades",
        explicacion: "Un Boom sube sectores especificos un 20-80%. Una Crisis los baja igual. Lee y actua en los primeros 10 segundos.",
        ejemplo: "Evento: 'Fiebre del Litio' (Mineria x1.7). Si tienes BHP, Rio Tinto o Vale: +70% en 60 segundos. Si no tienes, compra rapido antes de que suban.",
        cuando: ["Al ver el banner de evento activo", "Si tienes capital disponible > $30,000", "Cuando el timer del evento esta > 40s"],
        error: "Ignorar el evento y seguir con tu estrategia normal. Es como ignorar un tsunami.",
        impacto: "+50% a +150% de ganancia en 1 minuto si juegas bien. -40% si compras en crisis sin darte cuenta.",
        consejo: "Si el evento es Boom de tu sector: vende cerca del final del timer. Si es Crisis: no compres, vende.",
        frase: "El mercado no castiga al que espera. Castiga al que ignora.",
        relacion: ["w2", "w10"]
    },
    {
        id: "w22", cat: "riesgo", nivel: "intermedio", color: "#ff4444",
        titulo: "Ratio deuda-patrimonio: la regla del 0.5x",
        explicacion: "Nunca permitas que tu deuda supere el 50% de tu patrimonio neto. Superar ese limite es zona de peligro mortal.",
        ejemplo: "Patrimonio: $300,000. Deuda: $180,000 (60%). Una crisis de -30% te deja con $210,000 - $180,000 = solo $30,000. Casi quiebra.",
        cuando: ["Antes de pedir cada prestamo", "Cuando la deuda supera el 40% del patrimonio", "Durante cualquier evento crisis"],
        error: "Pedir prestamo tras prestamo sin revisar el ratio. La banca te dara el dinero, pero tu quiebras.",
        impacto: "Evitar quiebra segura. Mantener margen de maniobra para oportunidades.",
        consejo: "Paga deuda antes de pedir mas. Un prestamo bien usado crece tu capital; uno mal usado te destruye.",
        frase: "La deuda es como el fuego: sirve para cocinar o para quemar.",
        relacion: ["w3", "w9"]
    },
    {
        id: "w23", cat: "riesgo", nivel: "intermedio", color: "#ff4444",
        titulo: "Stop mental: define tu limite de perdida antes de comprar",
        explicacion: "Antes de comprar, decide: ¿A que porcentaje de perdida vendo? Esto evita que el panico o la esperanza cieguen tus decisiones.",
        ejemplo: "Compras Tesla a $240. Tu stop mental es -10% ($216). Si baja a $216, vendes sin preguntar. Si sube a $280, subes el stop a $252.",
        cuando: ["Antes de cada compra", "Cuando el mercado es muy volatil", "Si eres propenso a vender en panico o aferrarte a perdidas"],
        error: "Cambiar el stop mental porque 'va a recuperar'. Si bajo 10%, puede bajar 40% mas.",
        impacto: "Limita perdidas al 10% maximo por posicion. Protege capital para otras oportunidades.",
        consejo: "Un stop del 10% es agresivo pero necesario en este simulador. En la vida real usa 15-20%.",
        frase: "El mejor inversor no es quien gana mas, es quien pierde menos.",
        relacion: ["w7", "w11"]
    },
    {
        id: "w24", cat: "riesgo", nivel: "intermedio", color: "#ff4444",
        titulo: "La trampa de los sectores correlacionados",
        explicacion: "Algunos sectores suben y bajan juntos. Tener todo en sectores correlacionados es pseudo-diversificacion.",
        ejemplo: "Tecnologia e IA suben y bajan casi juntas. Automotriz y Energia tambien. Diversifica en sectores anticorrelados: Salud vs Cripto, Finanzas vs Construccion.",
        cuando: ["Al revisar tu portafolio semanalmente", "Si tienes mas de 5 empresas del mismo sector grupo", "Durante un evento que afecta multiples sectores"],
        error: "Tener 10 empresas pero 6 son Tecnologia o IA. Un crash tech destruye tu portafolio.",
        impacto: "Reduccion del 50% en volatilidad del portafolio total. Proteccion en crisis sectoriales.",
        consejo: "Maximo 20% en sectores de alta correlacion (Tecnologia+IA, Energia+Automotriz, Retail+Consumo).",
        frase: "La verdadera diversificacion no es cantidad, es independencia.",
        relacion: ["w1", "w5"]
    },
    {
        id: "w25", cat: "riesgo", nivel: "avanzado", color: "#ff4444",
        titulo: "Cobertura con cash: el poder de no estar invertido",
        explicacion: "Mantener 20-30% de tu capital en efectivo te permite comprar oportunidades cuando todas las acciones estan en oferta.",
        ejemplo: "Crisis global: todo cae 40%. Tienes $200,000 en cash de $500,000. Compras 20 empresas baratas. Cuando recuperan, ganas $100,000+.",
        cuando: ["Cuando el mercado sube 20%+ sin correccion", "Si ya tienes 80%+ invertido", "Antes de temporadas de eventos frecuentes"],
        error: "Estar 100% invertido siempre. Cuando aparece la oportunidad del siglo, no tienes cash para comprar.",
        impacto: "Capacidad de comprar en minimos. Rendimiento superior en ciclos completos.",
        consejo: "Regla: 70% invertido, 30% cash disponible. Ajusta segun la volatilidad del mercado.",
        frase: "El mejor momento para comprar es cuando todos venden... si tienes cash.",
        relacion: ["w22", "w19"]
    },
    {
        id: "w26", cat: "riesgo", nivel: "avanzado", color: "#ff4444",
        titulo: "Stress testing: simula lo peor antes de invertir",
        explicacion: "Antes de una inversion grande, pregunta: ¿Que pasa si hay crisis justo despues? ¿Sobrevivo? Si la respuesta es no, reduce la posicion.",
        ejemplo: "Vas a invertir $150,000 en Cripto. Stress test: Crisis de -60% inmediata. Perdida: $90,000. Patrimonio restante: $50,000. Deuda: $0. ¿Sobrevives? Si. Pero justo al limite. Reduce a $75,000.",
        cuando: ["Antes de inversiones mayores a $100,000", "Cuando usas prestamo para invertir", "Al entrar en sectores volatiles"],
        error: "Invertir sin considerar el escenario pesimista. El optimismo mata carteras.",
        impacto: "Evitar quiebras. Mantener capital suficiente para recuperarse de cualquier escenario.",
        consejo: "Si la simulacion pesimista te deja por debajo de $30,000: REDUCE LA POSICION.",
        frase: "Planifica para lo peor, espera lo mejor.",
        relacion: ["w4", "w20"]
    },
    {
        id: "w27", cat: "riesgo", nivel: "avanzado", color: "#ff4444",
        titulo: "Black Swan: preparate para lo imposible",
        explicacion: "En el simulador pueden ocurrir eventos catastroficos que afectan TODOS los sectores. Nadie esta 100% a salvo.",
        ejemplo: "Evento 'Desastre Climatico': todos los sectores caen 45% x0.55. Solo el cash y las habilidades de proteccion te salvan. La habilidad Resistencia reduce el impacto.",
        cuando: ["Siempre manten un colchon de cash", "Sube la habilidad Resistencia a nivel maximo", "Diversifica en sectores defensivos (Salud, Consumo, Finanzas)"],
        error: "Creer que 'nunca pasa lo peor'. Los eventos globales suceden cada pocos minutos.",
        impacto: "Supervivencia en crisis totales. Capacidad de recomprar en el fondo absoluto.",
        consejo: "Nunca estes 100% invertido. Nunca tengas deuda >30% de patrimonio. Nunca tengas todo en un solo sector.",
        frase: "Lo que nunca ha pasado, eventualmente pasara.",
        relacion: ["w25", "w21"]
    },
    // ========== PSICOLOGIA (9) ==========
    {
        id: "w7", cat: "psicologia", nivel: "basico", color: "#aa00ff",
        titulo: "La codicia ciega los numeros",
        explicacion: "Ver una accion subir un 25% y no vender porque 'va a subir mas' es la trampa mas comun. Vende cuando ganas.",
        ejemplo: "Compraste Tesla a $200. Ahora esta a $250 (+25%). Tu instinto dice 'espera a $300'. El mercado baja a $210. Perdiste $40 por accion.",
        cuando: ["Cuando una accion sube +20% desde tu compra", "Antes de que termine un evento Boom", "Cuando un asesor dice 'vende'"],
        error: "Poner 'precio objetivo' mental sin base. El simulador no respeta tus suenos.",
        impacto: "Convertir ganancias virtuales en dinero real. +300 XP por venta con +20%.",
        consejo: "Vende la mitad al +20% y deja la otra mitad correr con 'stop' mental en +10%.",
        frase: "Los toros ganan, los osos ganan, los cerdos son los que mueren.",
        relacion: ["w2", "w8"]
    },
    {
        id: "w8", cat: "psicologia", nivel: "basico", color: "#aa00ff",
        titulo: "El FOMO te hace comprar caro",
        explicacion: "FOMO = Fear Of Missing Out. Ver que todos ganan y comprar tarde es la forma mas rapida de perder.",
        ejemplo: "Bitcoin sube un 40% en 2 minutos. Todo el mundo habla de ello. Tu compras a $91,000. Inmediatamente corrige a $75,000. Perdiste.",
        cuando: ["Nunca", "Ok, solo si es el inicio de un Boom confirmado por un asesor de 80%+ precision"],
        error: "Comprar una accion que ya subio +30% en 5 minutos 'porque sigue subiendo'.",
        impacto: "Evitar perdidas del 15% a 30% por comprar en el pico. +150 XP por comprar en tendencia negativa (contrario).",
        consejo: "Si ya subio mucho, espera la correccion. El mercado siempre respira.",
        frase: "El mercado puede permanecer irracional mas tiempo del que tu puedes permanecer solvente.",
        relacion: ["w7", "w12"]
    },
    {
        id: "w9", cat: "psicologia", nivel: "basico", color: "#aa00ff",
        titulo: "Juega frio: las emociones cuestan dinero",
        explicacion: "El simulador tiene noticias, eventos, caidas y subidas rapidas. Reaccionar emocional siempre es error.",
        ejemplo: "Pierdes $5,000 en una venta. Te enojas. Compras Cripto arriesgado para 'recuperarlo'. Pierdes otros $8,000. Ahora estas en deuda.",
        cuando: ["Despues de una gran perdida", "Cuando ves 'Situacion Critica'", "Cuando todos en el chat hablan de caida"],
        error: "Operar para 'recuperar' perdidas. Cada operacion nueva debe tener su propia logica.",
        impacto: "Reduccion de perdidas emocionales del 40%. Mejora de rendimiento a largo plazo.",
        consejo: "Si pierdes >10% del patrimonio, cierra el juego 2 minutos y vuelve con cabeza fria.",
        frase: "Planifica el trade. Luego tradea el plan.",
        relacion: ["w4", "w11"]
    },
    {
        id: "w28", cat: "psicologia", nivel: "intermedio", color: "#aa00ff",
        titulo: "El seso de confirmacion: buscas lo que quieres ver",
        explicacion: "Cuando quieres que una accion suba, solo ves noticias positivas de ella. Ignoras las senales de peligro.",
        ejemplo: "Tienes $50,000 en Bitcoin. Ves una noticia positiva y dices 'lo sabia'. Ignoras 3 noticias negativas del mismo dia. Bitcoin cae 20%.",
        cuando: ["Cuando tienes una posicion grande en una empresa", "Al leer noticias sobre tus inversiones", "Cuando un asesor contradice tu opinion"],
        error: "Ignorar las predicciones de bajada de tus propios asesores porque 'ellos estan equivocados'.",
        impacto: "Tomas decisiones objetivas. Vendes a tiempo cuando las senales son negativas.",
        consejo: "Pide opinion a un asesor de especialidad opuesta. El disenso te hace mejor inversor.",
        frase: "La verdad no importa; lo que importa es lo que crees que es verdad... y eso te destruye.",
        relacion: ["w7", "w8"]
    },
    {
        id: "w29", cat: "psicologia", nivel: "intermedio", color: "#aa00ff",
        titulo: "Anclaje de precio: el precio de compra te esclaviza",
        explicacion: "Te aferras al precio que pagaste como 'valor real'. Si sube, es buena; si baja, 'se recuperara'. El mercado no conoce tu precio.",
        ejemplo: "Compraste Nvidia a $880. Baja a $700. Dices 'espero que vuelva a $880 para no perder'. El mercado la valora en $650 y sigue cayendo. Perdiste $230 extra.",
        cuando: ["Cuando una accion baja 15%+ desde tu compra", "Al evaluar si vender con perdida", "Cuando dices 'la voy a mantener hasta recuperar'"],
        error: "No vender por el precio de compra. Vende por la situacion actual y futura del mercado.",
        impacto: "Evitar perdidas adicionales del 20% a 40%. Capital libre para mejores oportunidades.",
        consejo: "El precio de compra es historia. Lo unico que importa es: ¿Subira o bajara desde aqui?",
        frase: "El mercado no sabe ni le importa lo que pagaste por una accion.",
        relacion: ["w2", "w23"]
    },
    {
        id: "w30", cat: "psicologia", nivel: "intermedio", color: "#aa00ff",
        titulo: "Efecto manada: por que sigues a la multitud al matadero",
        explicacion: "Cuando todos compran, tu compras. Cuando todos venden, tu vendes. La manada siempre llega tarde.",
        ejemplo: "Evento Boom de IA. Todos compran OpenAI, Anthropic y DeepMind. Tu compras al pico. 60 segundos despues, el evento termina y todos venden. Tu compraste caro y vendes barato.",
        cuando: ["Cuando sientes urgencia de comprar porque 'todos lo hacen'", "En los primeros 10 segundos de un evento", "Cuando hay euforia generalizada"],
        error: "Seguir la estrategia de otros jugadores sin saber su nivel, habilidades o capital.",
        impacto: "Evitar comprar en picos y vender en minimos. Mejora de 25% en timing.",
        consejo: "Se contrariano: compra cuando todos tienen miedo, vende cuando todos tienen euforia.",
        frase: "Seras derrotado cuando todos piensen igual... porque no habra nadie comprando despues de ti.",
        relacion: ["w6", "w8"]
    },
    {
        id: "w31", cat: "psicologia", nivel: "avanzado", color: "#aa00ff",
        titulo: "Disciplina algoritmica: conviertete en una maquina",
        explicacion: "Las mejores decisiones son sistematicas, no emocionales. Crea reglas claras y siguelas al pie de la letra sin excepciones.",
        ejemplo: "Reglas: Compro solo si baja 8%+. Vendo si sube 20%+. Nunca mas de 25% en un sector. Nunca pido prestamo si deuda >20% patrimonio. La disciplina vence a la intuicion.",
        cuando: ["Al crear tu primer plan de inversion", "Cuando tienes 5+ desafios completados", "Si tu reputacion fluctua mucho"],
        error: "Crear reglas y romperlas 'solo esta vez'. Esa 'vez' cuesta miles.",
        impacto: "Elimina errores emocionales. Consistencia en resultados. Reputacion estable.",
        consejo: "Escribe tus 5 reglas en un papel y pegalas donde veas. No operes sin revisarlas.",
        frase: "La disciplina es hacer lo que debes, cuando debes, aunque no quieras.",
        relacion: ["w9", "w20"]
    },
    {
        id: "w32", cat: "psicologia", nivel: "avanzado", color: "#aa00ff",
        titulo: "La trampa del 'patrimonio mental'",
        explicacion: "Contabilizas ganancias virtuales como tuyas antes de vender. Cuando el mercado corrige, sientes que 'perdiste' algo que nunca tuviste.",
        ejemplo: "Tu portafolio valia $500,000. Subio a $600,000. Ya mentalmente gastaste esos $100,000. Baja a $520,000. Sientes que 'perdiste' $80,000. En realidad ganaste $20,000.",
        cuando: ["Cuando tu portafolio sube 20%+", "Al revisar tu patrimonio cada minuto", "Cuando cuentas ganancias antes de vender"],
        error: "Vender en panico porque 'perdi $80,000 de ganancia' cuando en realidad aun ganas.",
        impacto: "Evitar ventas prematuras. Mantener posiciones ganadoras. Reduccion de estres.",
        consejo: "El patrimonio real = capital + valor de venta actual. Lo demas es expectativa, no dinero.",
        frase: "No cuentes el dinero de la mesa... hasta que te levantes.",
        relacion: ["w7", "w29"]
    },
    {
        id: "w33", cat: "psicologia", nivel: "avanzado", color: "#aa00ff",
        titulo: "Flow state: el estado mental de maximo rendimiento",
        explicacion: "Existe un estado mental donde tomas decisiones rapidas y precisas. Se alcanza con experiencia, no con esfuerzo forzado.",
        ejemplo: "Llevas 30 minutos jugando. Has visto 5 eventos, 20 noticias, tus asesores acertaron 8 veces. Sin pensarlo mucho, compras el sector correcto en cada ciclo. Ese es el flow.",
        cuando: ["Despues de 20+ minutos de juego continuo", "Cuando ya dominas las mecanicas basicas", "Al tener sistema de asesores + habilidades optimizado"],
        error: "Forzar decisiones rapidas sin experiencia. El flow requiere dominio previo.",
        impacto: "Decisiones 3x mas rapidas. Mejor timing. Menos errores de distraccion.",
        consejo: "Practica primero sin apalancamiento. Domina el juego base antes de operar rapido.",
        frase: "El maestro no piensa; simplemente sabe.",
        relacion: ["w31", "w21"]
    },
    // ========== BASICOS (9) ==========
    {
        id: "w10", cat: "basicos", nivel: "basico", color: "#ffd000",
        titulo: "Comprende el precio de compra promedio",
        explicacion: "Si compras 100 acciones a $10 y otras 100 a $20, tu costo promedio es $15. Vender por encima = ganancia.",
        ejemplo: "Compras 50 de Coca-Cola a $60 y 50 a $65. Tu costo promedio es $62.50. Si el precio actual es $70, tu ganancia es $7.50 x 100 = $750.",
        cuando: ["Siempre que compres la misma empresa 2 veces", "Cuando promedias a la baja para reducir perdidas"],
        error: "Pensar que 'comprar mas caro' es malo sin ver el promedio. A veces promediar al alza tambien funciona.",
        impacto: "Calcul correcto de rendimiento. Evitar vender creyendo que ganas cuando pierdes.",
        consejo: "El simulador muestra tu costo promedio en la tabla de portafolio. Comparalo con el precio actual.",
        frase: "No es lo que ganas, es lo que conservas despues de impuestos... y aqui no hay impuestos.",
        relacion: ["w2", "w7"]
    },
    {
        id: "w11", cat: "basicos", nivel: "basico", color: "#ffd000",
        titulo: "Las flechas no mienten: lee la tendencia",
        explicacion: "Las flechas ▲ y ▼ junto al precio indican la direccion reciente. No son futuro, pero si contexto.",
        ejemplo: "Uber tiene ▼▼▼ (bajando fuerte). Si compras ahora, apuestas a la reversión. Apple tiene ▲▲ (subiendo suave). Si compras, sigues la ola.",
        cuando: ["Antes de cada compra", "Cuando revisas el portafolio", "Cuando filtras empresas por buscador"],
        error: "Comprar una accion con ▼▼▼ pensando 'esta barata' sin saber por que cae. Podria seguir cayendo.",
        impacto: "+5% a +10% mejora en timing de entrada. Menos compras en caida libre.",
        consejo: "Tres flechas iguales = tendencia fuerte. Espera una flecha contraria antes de entrar contra la tendencia.",
        frase: "La tendencia es tu amiga... hasta que termina.",
        relacion: ["w6", "w12"]
    },
    {
        id: "w12", cat: "basicos", nivel: "basico", color: "#ffd000",
        titulo: "La reputacion es tu tarjeta de credito invisible",
        explicacion: "Reputacion alta te da descuentos en compras, mejores tasas de prestamo y mas misiones. Reputacion baja te castiga.",
        ejemplo: "Con reputacion 90 (Celebridad), compras acciones 8% mas baratas. Con reputacion 20, pagas 5% mas. En 100 operaciones, eso es una fortuna.",
        cuando: ["Siempre que puedas completar una mision de reputacion", "Antes de pedir un prestamo grande", "Cuando contratas asesores"],
        error: "Ignorar las misiones de reputacion. Fallar una mision te quita puntos y te hace perder descuentos.",
        impacto: "Hasta 12% de descuento en compras. Acceso a rangos exclusivos. +500 XP al alcanzar Leyenda.",
        consejo: "Prioriza misiones de reputacion sobre ganancias inmediatas. El descuento a largo plazo vale mas.",
        frase: "Tu nombre en el mercado vale mas que tu cartera.",
        relacion: ["w9", "w14"]
    },
    {
        id: "w34", cat: "basicos", nivel: "intermedio", color: "#ffd000",
        titulo: "El costo de oportunidad: cada decision cierra otra puerta",
        explicacion: "Cuando inviertes $50,000 en una empresa, no solo eliges esa empresa: rechazas todas las demas en ese momento.",
        ejemplo: "Pones $50,000 en Apple. El mismo dia, Ecopetrol sube 25% con un Boom de Energia. Tu oportunidad costo = $12,500 que no ganaste porque tu capital estaba ocupado.",
        cuando: ["Antes de cada inversion grande", "Cuando varias oportunidades aparecen simultaneamente", "Si tienes capital limitado"],
        error: "Dejar capital parado en empresas que no se mueven mientras otras suben. Revisa y rota.",
        impacto: "Mayor eficiencia de capital. Mas ganancias por minuto. Portafolio mas dinamico.",
        consejo: "Si una accion no se mueve en 3 minutos, considera vender y buscar otra oportunidad.",
        frase: "No es solo lo que eliges, es lo que dejas de elegir.",
        relacion: ["w10", "w17"]
    },
    {
        id: "w35", cat: "basicos", nivel: "intermedio", color: "#ffd000",
        titulo: "La magia del interes compuesto dentro del simulador",
        explicacion: "Cada ganancia se reinvierte y genera mas ganancia. En 10 operaciones consecutivas exitosas, el crecimiento es exponencial.",
        ejemplo: "$100,000 -> +10% = $110,000. +10% = $121,000. +10% = $133,100. En solo 3 operaciones, ganaste $33,100, no $30,000.",
        cuando: ["Desde la primera operacion", "Cuando reinviertes ganancias", "Al calcular objetivos a largo plazo"],
        error: "Retirar ganancias pequenas en lugar de dejarlas crecer. Cada $1 que retiras deja de generar $0.10 extra.",
        impacto: "+10% a +15% extra por efecto compuesto en 10+ operaciones. Diferencia entre $1M y $1.6M.",
        consejo: "Nunca retires capital hasta alcanzar tu objetivo. Reinvierte todo.",
        frase: "El interes compuesto es la fuerza mas poderosa del universo.",
        relacion: ["w17", "w35"]
    },
    {
        id: "w36", cat: "basicos", nivel: "intermedio", color: "#ffd000",
        titulo: "Lectura de portafolio: el dashboard de tu imperio",
        explicacion: "La tabla de portafolio no solo muestra precios. Las columnas de rendimiento, tendencia y valor total te cuentan una historia.",
        ejemplo: "Ves que 3 empresas tienen rendimiento negativo y tendencia ▼▼. Las otras 5 tienen rendimiento positivo y ▲▲. Decision: vende las 3 perdedoras, manten las 5 ganadoras.",
        cuando: ["Cada 2-3 minutos revisa tu portafolio completo", "Antes de decidir comprar mas", "Cuando un evento mundial activo"],
        error: "No revisar el portafolio por 10+ minutos. Las empresas cambian rapidamente.",
        impacto: "Decisiones informadas en tiempo real. Ventas oportunas. Menos sorpresas desagradables.",
        consejo: "Ordena mentalmente tus empresas: ganadoras, neutrales, perdedoras. Actua sobre las perdedoras primero.",
        frase: "Lo que no se mide, no se mejora. Mide tu portafolio constantemente.",
        relacion: ["w11", "w36"]
    },
    {
        id: "w37", cat: "basicos", nivel: "avanzado", color: "#ffd000",
        titulo: "Matematicas de la recuperacion: por que perder menos es ganar mas",
        explicacion: "Perder 50% requiere ganar 100% para recuperar. Perder 20% solo requiere ganar 25%. Proteger capital es mas importante que perseguir ganancias.",
        ejemplo: "$100,000 -> -50% = $50,000. Para volver a $100,000 necesitas +100% ($50,000 mas). Si solo hubieras perdido 20%: $80,000 -> +25% = $100,000.",
        cuando: ["Al evaluar riesgo de cada inversion", "Cuando decides entre una oportunidad segura y una arriesgada", "Si tu patrimonio acaba de caer 30%+"],
        error: "Buscar 'recuperar rapido' con inversiones arriesgadas despues de una perdida. Eso agrava todo.",
        impacto: "Mantenimiento del capital base. Crecimiento sostenible sin pozos profundos.",
        consejo: "Una ganancia del 10% constante vence a una ganancia del 50% seguida de una perdida del 40%.",
        frase: "La regla numero 1: nunca pierdas dinero. La regla numero 2: nunca olvides la regla numero 1.",
        relacion: ["w4", "w37"]
    },
    {
        id: "w38", cat: "basicos", nivel: "avanzado", color: "#ffd000",
        titulo: "El tiempo es tu recurso mas escaso",
        explicacion: "En el simulador todo ocurre en minutos, no dias. Cada segundo de indecision es una oportunidad perdida o un riesgo ignorado.",
        ejemplo: "Un evento Boom dura 60 segundos. Tardas 20 en decidir. Solo tienes 40 para comprar y beneficiarte. Si esperas otros 20, el pico paso y quedan 20 segundos de bajada.",
        cuando: ["Durante eventos activos", "Al recibir una prediccion de asesor", "Cuando ves una oportunidad clara"],
        error: "Pensar 'lo voy a dejar un minuto mas a ver si sube'. El mercado no espera.",
        impacto: "Aprovechamiento completo de eventos. Mejor timing de entrada y salida.",
        consejo: "Toma la decision en 10 segundos o menos. La accion mediocre a tiempo vence a la accion perfecta tarde.",
        frase: "El timing en el mercado lo es todo... y el mejor timing es AHORA.",
        relacion: ["w6", "w38"]
    },
    {
        id: "w39", cat: "basicos", nivel: "avanzado", color: "#ffd000",
        titulo: "La ecuacion del imperio: Patrimonio = Capital + Activos - Deuda",
        explicacion: "Todo el juego se resume en esta formula. Cada accion que tomas afecta uno de los 3 componentes. Comprenderlo todo se simplifica.",
        ejemplo: "Capital: $50,000. Activos (acciones a precio actual): $200,000. Deuda: $30,000. Patrimonio: $220,000. Si vendes todo: Patrimonio = $250,000 - $30,000 = $220,000.",
        cuando: ["Siempre que revises tu situacion financiera", "Antes de pedir prestamo", "Al calcular si puedes permitirte una inversion"],
        error: "Ver solo tu capital disponible e ignorar los activos y la deuda. Eso lleva a decisiones desequilibradas.",
        impacto: "Vision completa de tu situacion. Decisiones mas equilibradas. Menos sorpresas.",
        consejo: "El panel general muestra todo. Revisalo cada minuto. Si deuda crece rapido, para todo y paga.",
        frase: "Controla tus numeros, o ellos te controlaran a ti.",
        relacion: ["w12", "w39"]
    },
    // ========== MECANICAS (9) ==========
    {
        id: "w13", cat: "mecanicas", nivel: "basico", color: "#00d4ff",
        titulo: "Sube de nivel para desbloquear sectores",
        explicacion: "Sectores estan bloqueados por nivel. Cada nivel desbloquea exactamente 1 categoria nueva (30 categorias en total). Subir de nivel = mas opciones.",
        ejemplo: "Nivel 1: Finanzas. Nivel 2: Tecnologia. Nivel 3: Bebidas. Cada nivel desbloquea 1 categoria. A nivel 8, IA multiplica tu capital.",
        cuando: ["Al principio, enfocate en comprar para ganar XP", "No vendas todo, manten empresas para seguir recibiendo dividendos y XP"],
        error: "Quedarte solo comprando en Tecnologia y no diversificar para ganar mas XP rapido.",
        impacto: "Desbloquear sectores rentables. +3 PH por nivel. Habilidades mas poderosas.",
        consejo: "Cada compra da XP = cantidad x 2. Comprar volumen alto sube nivel mas rapido.",
        frase: "El nivel es la llave. Las acciones son solo el tesoro.",
        relacion: ["w1", "w15"]
    },
    {
        id: "w14", cat: "mecanicas", nivel: "basico", color: "#00d4ff",
        titulo: "Los asesores son GPS del mercado, no garantia",
        explicacion: "Un asesor con 70% precision falla 3 de cada 10 veces. Pero usarlos bien aumenta tus probabilidades de ganar.",
        ejemplo: "Contratas a Elena M. (Macro, 55% precision). Predice subida de Energia. Compras 200 acciones de Ecopetrol. Acierta: +15% = $360 de ganancia.",
        cuando: ["Cuando tienes capital para pagar salarios", "Si tienes habilidad 'Ojo de Aguila' desbloqueada", "Cuando necesitas orientacion de sector"],
        error: "Seguir ciegamente al asesor sin ver tu propio analisis. Incluso un 85% de precision falla.",
        impacto: "+15% a +30% en rendimiento promedio cuando sigues predicciones acertadas. Gasto fijo de salarios cada 30s.",
        consejo: "Contrata asesores de especialidades distintas para cubrir mas sectores.",
        frase: "Un buen asesor no predice el futuro. Te da mejores probabilidades.",
        relacion: ["w5", "w12"]
    },
    {
        id: "w15", cat: "mecanicas", nivel: "basico", color: "#00d4ff",
        titulo: "Las habilidades son inversiones permanentes",
        explicacion: "Cada nivel subido te da 3 Puntos de Habilidad (PH). Usarlos en habilidades correctas multiplica tus ganancias para siempre.",
        ejemplo: "'Ojo de Aguila' nivel 5 da +40% precision a asesores. Si tu asesor tenia 60%, ahora tiene 84%. Eso es enorme.",
        cuando: ["Al subir de nivel, gasta PH inmediatamente", "Prioriza habilidades que afectan tu estilo de juego"],
        error: "Acumular PH sin gastarlos. Son recursos que deben convertirse en ventajas activas.",
        impacto: "Hasta +40% precision, +50% dividendos, -50% costos de mejora. Efecto compuesto.",
        consejo: "Primero desbloquea 'Ojo de Aguila' y 'Negociador'. Luego 'Magnetismo' y 'Vision Futura'.",
        frase: "Las habilidades trabajan por ti, incluso cuando duermes.",
        relacion: ["w13", "w14"]
    },
    {
        id: "w40", cat: "mecanicas", nivel: "intermedio", color: "#00d4ff",
        titulo: "El reloj del juego: entiende los intervalos ocultos",
        explicacion: "El simulador funciona con intervalos programados: precios cambian cada 800ms, dividendos cada 20s, salarios cada 30s, noticias cada 10s.",
        ejemplo: "Sabes que en 15 segundos tus asesores cobran salario. Tienes $2,000 de capital. Un asesor cuesta $1,500. No contrates mas hasta tener $5,000 de colchon.",
        cuando: ["Al planificar tu flujo de caja", "Antes de contratar asesores caros", "Cuando capital es menor al gasto fijo cada 30s"],
        error: "Ignorar el gasto fijo de asesores. Tu capital puede ir a 0 sin que compres nada.",
        impacto: "Mejor gestion de liquidez. Evitar quiebra por gastos fijos. Timing de compras optimizado.",
        consejo: "Nunca dejes capital por debajo de 10x el salario total de asesores. Eso es tu minimo de seguridad.",
        frase: "El que domina el tiempo, domina el juego.",
        relacion: ["w14", "w15"]
    },
    {
        id: "w41", cat: "mecanicas", nivel: "intermedio", color: "#00d4ff",
        titulo: "Sincronizacion de sistemas: como las mecanicas se potencian",
        explicacion: "Habilidades + Asesores + Reputacion + Desafios + Logros = un sistema interconectado. Activa todos simultaneamente.",
        ejemplo: "Subes de nivel (PH nuevos) -> mejoras habilidad Magnetismo (+dividendos) -> completas desafio (PH + Reputacion) -> mejor reputacion (descuento en compras) -> compras mas barato -> mas ganancias.",
        cuando: ["Al alcanzar nivel 5+", "Cuando tienes 3+ asesores", "Al completar desafios"],
        error: "Focalizarte solo en una mecanica y descuidar las demas. Todas estan conectadas.",
        impacto: "Multiplicador de 2x a 4x en velocidad de crecimiento. Cada mecanica potencia las demas.",
        consejo: "Cada vez que subas de nivel, revisa: habilidades disponibles, desafios activos, asesores contratables.",
        frase: "Una sola maquina funciona; un sistema de maquinas domina.",
        relacion: ["w15", "w40"]
    },
    {
        id: "w42", cat: "mecanicas", nivel: "intermedio", color: "#00d4ff",
        titulo: "Los desafios diarios: rutina de crecimiento garantizado",
        explicacion: "Los 12 desafios diarios te dan XP, PH y Reputacion. Completarlos todos es un boost diario obligatorio.",
        ejemplo: "Desafio 'Diversificador': Ten 3 empresas diferentes. Recompensa: 200 XP, 2 PH, 4 Rep. Lo completas sin esfuerzo y ganas recursos valiosos.",
        cuando: ["Al iniciar sesion cada dia", "Cada 24h cuando se renuevan", "Cuando necesitas PH o Reputacion rapido"],
        error: "Ignorar los desafios porque 'no dan mucho'. Acumulados son miles de XP y decenas de PH.",
        impacto: "+1,500 XP diario, +15 PH diario, +50 Rep diario. En una semana es un nivel extra.",
        consejo: "Prioriza los desafios faciles primero. Luego ataca los dificiles con planificacion.",
        frase: "La consistencia vence al talento cuando el talento no es consistente.",
        relacion: ["w13", "w41"]
    },
    {
        id: "w43", cat: "mecanicas", nivel: "avanzado", color: "#00d4ff",
        titulo: "Optimizacion de builds: rutas de progresion eficientes",
        explicacion: "Existen rutas optimas para subir habilidades segun tu estilo: trader agresivo, inversor conservador, o maestro de asesores.",
        ejemplo: "Build Trader Agresivo: Mano Rapida(Nv.10) -> Rapido y Furioso(Nv.10) -> Lobo de Wall St(Nv.10) -> Cripto Dios(Nv.10). Compra rapido, vende rapido, multiplica.",
        cuando: ["Al alcanzar nivel 10+", "Si tienes 30+ PH disponibles", "Cuando quieres especializarte en un estilo"],
        error: "Subir habilidades al azar sin una estrategia. Cada PH mal gastado es permanentemente menos potente.",
        impacto: "Build optimizada = 2x mas eficiente que habilidades dispersas. Maximiza tu estilo de juego.",
        consejo: "Build Conservador: Ojo de Aguila + Negociador + Resistencia + Inmortal + Diversificador.",
        frase: "Un arbol de habilidades bien podado da frutos mejores que un bosque salvaje.",
        relacion: ["w15", "w43"]
    },
    {
        id: "w44", cat: "mecanicas", nivel: "avanzado", color: "#00d4ff",
        titulo: "La economia del jugador: ingresos, egresos y flujo neto",
        explicacion: "Tu economia tiene ingresos (ventas, dividendos) y egresos (salarios, compras). Mantener flujo positivo es la clave.",
        ejemplo: "Ingresos: $5,000/min en dividendos + $20,000/min en ventas. Egresos: $8,000/min en salarios. Flujo neto: +$17,000/min. Eso es sostenible.",
        cuando: ["Cada 5 minutos calcula tu flujo", "Antes de contratar mas asesores", "Cuando consideras pedir prestamo"],
        error: "Tener egresos mayores a ingresos sostenidos. Agotas capital aun sin comprar nada.",
        impacto: "Sostenibilidad a largo plazo. Crecimiento exponencial sin quiebras.",
        consejo: "Regla de oro: Ingresos pasivos (dividendos) deben cubrir al menos 50% de tus egresos (salarios).",
        frase: "No es cuanto ganas, es cuanto conservas despues de pagar todo.",
        relacion: ["w40", "w44"]
    },
    {
        id: "w45", cat: "mecanicas", nivel: "avanzado", color: "#00d4ff",
        titulo: "Meta-progresion: como cada partida mejora la siguiente",
        explicacion: "Tus datos se guardan automaticamente. Cada sesion acumula habilidades, reputacion y patrones aprendidos que aplicas en futuras sesiones.",
        ejemplo: "Sesion 1: Aprendes que Cripto es volatil. Sesion 2: Aplicas conocimiento, evitas Cripto temprano. Sesion 3: Dominas la rotacion de sectores. Sesion 10: Eres un maestro.",
        cuando: ["Al revisar tu historial de predicciones", "Cuando analizas que funciono y que no", "Cada vez que guardas y vuelves"],
        error: "Repetir los mismos errores en cada sesion sin aprender. Es la definicion de locura.",
        impacto: "Mejora continua. Menos errores repetidos. Mas ganancias por sesion.",
        consejo: "Al terminar cada sesion, pregunta: ¿Cual fue mi mejor decision? ¿Cual fue mi peor error?",
        frase: "El inversor mas rico no es quien tiene mas dinero, es quien aprende mas rapido.",
        relacion: ["w45", "w43"]
    }
];

function filtrarWiki(filtro) {
    document.querySelectorAll('.btn-filtro-wiki').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderWiki(filtro);
}

function renderWiki(filtro = 'todos') {
    const cont = document.getElementById('wikiContainer');
    if (!cont) return;
    cont.innerHTML = '';

    let articulos = WIKI_ARTICULOS;
    if (filtro !== 'todos') {
        articulos = WIKI_ARTICULOS.filter(a => a.cat === filtro);
    }

    articulos.forEach(art => {
        let div = document.createElement('div');
        div.className = 'wiki-card ' + art.cat;

        let relacionHTML = art.relacion.map(r => {
            let rel = WIKI_ARTICULOS.find(x => x.id === r);
            return rel ? `<span style="color:var(--primary);cursor:pointer;" onclick="scrollToWiki('${r}')">${rel.titulo}</span>` : '';
        }).join(' <span style="color:#555">|</span> ');

        div.innerHTML = `
            <div class="wiki-cat-tag" style="color:${art.color}">${art.cat === 'estrategia' ? '📈 Estrategia' : art.cat === 'riesgo' ? '⚠️ Riesgo' : art.cat === 'psicologia' ? '🧠 Psicologia' : art.cat === 'basicos' ? '💰 Conceptos Basicos' : '🎮 Mecanicas'}</div>
            <div class="wiki-header">
                <div class="wiki-titulo" style="color:${art.color}">${art.titulo}</div>
                <div class="wiki-nivel ${art.nivel}">${art.nivel}</div>
            </div>
            <div class="wiki-seccion"><b>🧠 Explicacion:</b> ${art.explicacion}</div>
            <div class="wiki-seccion"><b>📊 Ejemplo:</b> ${art.ejemplo}</div>
            <div class="wiki-seccion"><b>🎯 Cuando usarlo:</b> ${art.cuando.map(c => `<span style="display:inline-block;background:rgba(255,255,255,0.05);padding:3px 8px;border-radius:6px;margin:2px;font-size:0.75em;color:#ccc">${c}</span>`).join('')}</div>
            <div class="wiki-seccion"><b>❌ Error comun:</b> ${art.error}</div>
            <div class="wiki-impacto"><b>🎮 Impacto en el juego:</b> ${art.impacto}</div>
            <div class="wiki-consejo">⚡ ${art.consejo}</div>
            <div class="wiki-frase">"${art.frase}"</div>
            <div class="wiki-relacion">🔗 Ver tambien: ${relacionHTML}</div>
        `;
        cont.appendChild(div);
    });
}

function scrollToWiki(id) {
    renderWiki('todos');
    setTimeout(() => {
        let cards = document.querySelectorAll('.wiki-card');
        cards.forEach(c => {
            if (c.innerHTML.includes(id)) {
                c.scrollIntoView({behavior: 'smooth', block: 'center'});
                c.style.borderColor = 'var(--primary)';
                setTimeout(() => c.style.borderColor = '', 2000);
            }
        });
    }, 100);
}

// ==========================================
// NAVEGACION, TOASTS Y UTILIDADES UI
// ==========================================
function llenarSelectsBancos() {
    const bancoSelEl = document.getElementById("bancoSeleccionado");
    const bancoDestEl = document.getElementById("bancoDestino");
    if (!bancoSelEl || !bancoDestEl) return;
    
    bancoSelEl.innerHTML = "";
    bancoDestEl.innerHTML = "";
    
    bancos.forEach((banco, index) => {
        const option1 = document.createElement("option");
        option1.value = index;
        option1.textContent = banco.nombre;
        bancoSelEl.appendChild(option1);
        
        const option2 = document.createElement("option");
        option2.value = index;
        option2.textContent = banco.nombre;
        bancoDestEl.appendChild(option2);
    });
    
    if (bancoSelEl.options.length > 0) {
        bancoSelEl.selectedIndex = 0;
        actualizarInfoBancos();
    }
}

function mostrar(id) {
    SECTION_CONFIG.forEach(section => {
        let el = document.getElementById(section.id);
        if (el) el.classList.add("hidden");
        let btn = document.getElementById("btn-" + section.id);
        if (btn) {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        }
    });
    let active = document.getElementById(id);
    if (active) active.classList.remove("hidden");
    let activeBtn = document.getElementById("btn-" + id);
    if (activeBtn) {
        activeBtn.classList.add("active");
        activeBtn.setAttribute("aria-pressed", "true");
    }
    
    // Set render flags based on view
    asesoresRenderPending = (id === 'asesores');
    habilidadesRenderPending = (id === 'habilidades');
    reputacionRenderPending = (id === 'reputacion');
    desafiosRenderPending = (id === 'desafios');
    
    // Force render on navigation
    if (id === 'invertir') dibujarTienda();
    if (id === 'asesores') { renderAsesores(); renderPredicciones(); renderHistorialPredicciones(); }
    if (id === 'habilidades') renderHabilidades();
    if (id === 'reputacion') renderReputacion();
    if (id === 'desafios') renderDesafios();
    if (id === 'logros') renderLogros();
    if (id === 'aprendizaje') renderWiki();
    if (id === 'mercado') renderMercadoCompleto();
    if (id === 'historial') renderHistorial();
    if (id === 'ranking') cargarRankingGanancias();
    if (id === 'amigos') {
        actualizarDatosSociales();
    }
    if (id === 'bancos') { llenarSelectsBancos(); actualizarInfoBancos(); }
    if (id === 'qr') { /* QR se inicializa automaticamente */ }
    aplicarIdioma();
}

async function cargarRankingGanancias() {
    const body = document.getElementById('rankingBody');
    const status = document.getElementById('rankingStatus');
    if (!body || !status) return;
    status.textContent = 'Cargando ranking...';
    try {
        const ranking = (await db.getProfitRanking(50)).filter(jugador => jugador.total > 0);
        const escaparHtml = valor => String(valor).replace(/[&<>"']/g, caracter => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[caracter]));
        body.innerHTML = ranking.length
            ? ranking.map((jugador, index) => `
                <tr class="${jugador.username === usuarioActual ? 'ranking-current' : ''}">
                    <td class="ranking-position">${index + 1}</td>
                    <td>${escaparHtml(jugador.username === usuarioActual ? `${jugador.username} (tú)` : jugador.username)}</td>
                    <td class="ranking-profit">${formatD(jugador.total)}</td>
                </tr>`).join('')
            : '<tr><td colspan="3" class="ranking-empty">Aún no hay jugadores con ganancias.</td></tr>';
        status.textContent = `Actualizado: ${new Date().toLocaleTimeString('es-CO')}`;
    } catch (error) {
        body.innerHTML = '<tr><td colspan="3" class="ranking-empty">No se pudo cargar el ranking.</td></tr>';
        status.textContent = error.message || 'Error al cargar el ranking.';
    }
}

async function buscarPerfilSocial() {
    const input = document.getElementById('socialSearchInput');
    const status = document.getElementById('socialSearchStatus');
    const result = document.getElementById('socialProfileResult');
    const query = String(input?.value || '').trim();
    if (!query) return;
    status.textContent = 'Buscando...';
    try {
        const profiles = await db.getSocialUsers(query);
        result.innerHTML = profiles.length ? profiles.map(profile => {
            const avatarIndex = obtenerIndiceAvatarPerfil(profile.fotoPerfil, profile.avatarSeleccionado);
            const profilePhoto = String(profile.fotoPerfil || '');
            const avatarSource = profilePhoto.startsWith('data:image/')
                ? profilePhoto
                : getAssetUrl(profilePhoto || `assets/perfiles/perfil-${String(avatarIndex + 1).padStart(2, '0')}.png?v=1`);
            return `
            <article class="social-profile-result">
                <img class="social-friend-avatar" src="${escaparHtmlSocial(avatarSource)}" alt="Foto de ${escaparHtmlSocial(profile.username)}" loading="lazy" decoding="async">
                <div class="social-friend-identity"><strong>${escaparHtmlSocial(profile.username)}</strong><small>ID: ${escaparHtmlSocial(formatearIdPublico(profile.publicId))}</small></div>
                <div class="social-profile-stats">Nivel ${profile.nivel} · ${profile.ganancias + profile.dividendos > 0 ? formatD(profile.ganancias + profile.dividendos) : 'Sin ganancias'}</div>
                <button type="button" class="ranking-refresh-btn" onclick="verPerfilSocial('${encodeURIComponent(profile.username)}')">Inspeccionar</button>
                <button type="button" class="ranking-refresh-btn" onclick="enviarSolicitudAmistad('${encodeURIComponent(profile.username)}')">${amigos.some(friend => String(friend.username).toLowerCase() === String(profile.username).toLowerCase()) ? 'Ya es amigo' : 'Agregar amigo'}</button>
            </article>`;
        }).join('') : '<div class="social-empty">No se encontraron perfiles.</div>';
        status.textContent = `${profiles.length} perfil(es) encontrado(s)`;
    } catch (error) {
        status.textContent = error.message || 'No se pudo buscar el perfil.';
    }
}

async function verPerfilSocial(encodedUsername) {
    try {
        const profile = await db.getSocialProfile(decodeURIComponent(encodedUsername));
        const plan = profile.plan && PLANES[profile.plan] ? `Plan ${PLANES[profile.plan].nombre}` : 'Plan sin elegir';
        const avatarIndex = obtenerIndiceAvatarPerfil(profile.fotoPerfil, profile.avatarSeleccionado);
        const mascota = MASCOTAS.find(item => item.id === profile.mascota?.id) || MASCOTAS[0];
        const profilePhoto = String(profile.fotoPerfil || '');
        document.getElementById('socialInspectPetDisplay').innerHTML = `<img class="profile-pet-image" src="${getAssetUrl(`assets/mascotas/${mascota.id}.png`)}" alt="${mascota.nombre}" loading="lazy" decoding="async">`;
        document.getElementById('socialInspectPetName').textContent = `${mascota.nombre} · Nivel ${profile.mascota?.nivel || 1}`;
        document.getElementById('socialInspectPetDescription').textContent = mascota.descripcion;
        document.getElementById('socialInspectAvatar').src = profilePhoto.startsWith('data:image/')
            ? profilePhoto
            : getAssetUrl(profilePhoto || `assets/perfiles/perfil-${String(avatarIndex + 1).padStart(2, '0')}.png?v=1`);
        document.getElementById('socialInspectFullAvatar').src = getAssetUrl(`assets/avatares/avatar-${String(avatarIndex + 1).padStart(2, '0')}.png?v=6`);
        document.getElementById('socialInspectName').textContent = profile.username;
        document.getElementById('socialInspectId').textContent = `ID público: ${formatearIdPublico(profile.publicId)}`;
        document.getElementById('socialInspectPlan').textContent = plan;
        document.getElementById('socialInspectCapital').textContent = formatD(profile.capital || 0);
        document.getElementById('socialInspectNetWorth').textContent = formatD(profile.capital || 0);
        document.getElementById('socialInspectLevel').textContent = profile.nivel;
        document.getElementById('socialInspectExperience').textContent = `${profile.xp} XP`;
        document.getElementById('socialInspectReputation').textContent = profile.reputacion;
        document.getElementById('socialInspectProfits').textContent = formatD(profile.ganancias + (profile.dividendos || 0));
        document.getElementById('socialInspectLosses').textContent = formatD(profile.perdidas || 0);
        document.getElementById('socialInspectInvestments').textContent = profile.inversiones;
        document.getElementById('socialInspectAchievements').textContent = profile.logros;
        document.getElementById('socialInspectSectors').textContent = profile.sectores;
        document.getElementById('socialInspectModal').classList.add('active');
    } catch (error) {
        toast(error.message || 'No se pudo cargar el perfil', 'error');
    }
}

function cerrarPerfilSocial() {
    document.getElementById('socialInspectModal')?.classList.remove('active');
}

function escaparHtmlSocial(value) {
    return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

async function enviarSolicitudAmistad(encodedUsername) {
    const username = decodeURIComponent(encodedUsername);
    if (!username || username.toLowerCase() === usuarioActual.toLowerCase()) {
        return toast('No puedes agregarte a ti mismo', 'error');
    }
    if (amigos.some(friend => String(friend.username).toLowerCase() === username.toLowerCase())) {
        return toast('Este jugador ya está entre tus amigos', 'info');
    }
    try {
        await db.sendFriendRequest(username, usuarioActual, idPublico);
        toast('Solicitud de amistad enviada', 'success');
        await actualizarDatosSociales();
    } catch (error) {
        toast(error.message || 'No se pudo enviar la solicitud', 'error');
    }
}

async function aceptarSolicitudAmistad(index) {
    const request = solicitudesAmistad[index];
    if (!request) return;
    try {
        const normalizedRequester = String(request.username || '').trim().toLowerCase();
        const normalizedCurrentUser = String(usuarioActual || '').trim().toLowerCase();
        if (!normalizedRequester || !normalizedCurrentUser) throw new Error('No se pudo identificar a los participantes');
        const uniqueFriends = (friends, friend) => [...(Array.isArray(friends) ? friends : []), friend]
            .filter((item, friendIndex, list) => list.findIndex(candidate => String(candidate.username).trim().toLowerCase() === String(item.username).trim().toLowerCase()) === friendIndex);
        const acceptedData = await db.updateSocialData(normalizedCurrentUser, data => ({
            ...data,
            friendRequests: (Array.isArray(data.friendRequests) ? data.friendRequests : []).filter(item => String(item.username).trim().toLowerCase() !== normalizedRequester),
            amigos: uniqueFriends(data.amigos, { username: normalizedRequester, publicId: request.publicId })
        }));
        await db.updateSocialData(normalizedRequester, data => ({
            ...data,
            amigos: uniqueFriends(data.amigos, { username: normalizedCurrentUser, publicId: idPublico })
        }));
        amigos = acceptedData.amigos || [];
        solicitudesAmistad = acceptedData.friendRequests || [];
        await renderSocial();
        toast('Solicitud aceptada. Ya son amigos.', 'success');
    } catch (error) {
        toast(error.message || 'No se pudo aceptar la solicitud', 'error');
    }
}

async function rechazarSolicitudAmistad(index) {
    solicitudesAmistad.splice(index, 1);
    await guardar(true);
    await renderSocial();
}

async function eliminarAmigo(encodedUsername) {
    const username = decodeURIComponent(encodedUsername);
    if (!username || !confirm(`¿Eliminar a ${username} de tus amigos?`)) return;
    try {
        amigos = amigos.filter(friend => String(friend.username).toLowerCase() !== username.toLowerCase());
        await db.updateSocialData(username, data => ({
            ...data,
            amigos: (Array.isArray(data.amigos) ? data.amigos : []).filter(friend => String(friend.username).toLowerCase() !== usuarioActual.toLowerCase())
        }));
        await guardar(true);
        await renderSocial();
        toast('Amigo eliminado', 'success');
    } catch (error) {
        toast(error.message || 'No se pudo eliminar al amigo', 'error');
    }
}

async function renderSocial() {
    const requestsList = document.getElementById('socialRequestsList');
    const friendsList = document.getElementById('socialFriendsList');
    const projectsList = document.getElementById('cooperativeProjectsList');
    if (!requestsList || !friendsList || !projectsList) return;
    const requestsHtml = solicitudesAmistad.map((request, index) => `<div class="social-list-item"><span>Solicitud de <strong>${escaparHtmlSocial(request.username)}</strong></span><span><button onclick="aceptarSolicitudAmistad(${index})">Aceptar</button><button onclick="rechazarSolicitudAmistad(${index})">Rechazar</button></span></div>`).join('');
    const friendProfiles = await Promise.all(amigos.map(async friend => {
        try {
            return await db.getSocialProfile(friend.username);
        } catch (error) {
            return { ...friend, avatarSeleccionado: 0, fotoPerfil: '' };
        }
    }));
    const friendsHtml = friendProfiles.map(friend => {
        const avatarIndex = obtenerIndiceAvatarPerfil(friend.fotoPerfil, friend.avatarSeleccionado);
        const profilePhoto = String(friend.fotoPerfil || '');
        const avatarSource = profilePhoto.startsWith('data:image/')
            ? profilePhoto
            : getAssetUrl(profilePhoto || `assets/perfiles/perfil-${String(avatarIndex + 1).padStart(2, '0')}.png?v=1`);
        return `<div class="social-list-item social-friend-item"><img class="social-friend-avatar" src="${escaparHtmlSocial(avatarSource)}" alt="Foto de ${escaparHtmlSocial(friend.username)}" loading="lazy" decoding="async"><span class="social-friend-identity"><strong>${escaparHtmlSocial(friend.username)}</strong><small>ID público: ${escaparHtmlSocial(formatearIdPublico(friend.publicId))}</small></span><span class="social-list-actions"><button type="button" onclick="verPerfilSocial('${encodeURIComponent(friend.username)}')">Inspeccionar</button><button type="button" onclick="prepararProyectoCooperativo('${encodeURIComponent(friend.username)}')">Proponer inversión</button><button type="button" onclick="eliminarAmigo('${encodeURIComponent(friend.username)}')">Eliminar amigo</button></span></div>`;
    }).join('');
    requestsList.innerHTML = requestsHtml || '<div class="social-empty">No tienes solicitudes pendientes.</div>';
    friendsList.innerHTML = friendsHtml || '<div class="social-empty">Aún no tienes amigos agregados.</div>';
    projectsList.onclick = event => {
        const button = event.target.closest('button[data-cooperative-project-id]');
        if (!button) return;
        event.preventDefault();
        event.stopPropagation();
        responderProyectoCooperativo(button.dataset.cooperativeProjectId, button.dataset.cooperativeAnswer === 'accept');
    };
    const visibleProjects = proyectosCooperativos
        .filter((project, index, projects) => project.status === 'Aceptado' || !projects.some((other, otherIndex) => otherIndex !== index && other.status === 'Aceptado' && other.name === project.name && other.company === project.company));
    projectsList.innerHTML = visibleProjects.length ? visibleProjects.map(project => {
        const investment = project.investment;
        const currentValue = investment ? (preciosMercado[investment.company] || investment.price) * investment.quantity : 0;
        const result = investment ? currentValue - investment.totalCost : 0;
            const resultClass = result >= 0 ? 'cooperative-profit' : 'cooperative-loss';
        const valueLabel = investment ? `Valor actual: ${formatD(currentValue)}` : 'Valor actual: pendiente de aceptación';
        const resultLabel = investment ? `Resultado: ${formatD(result)}` : 'Resultado: pendiente';
            const action = project.status === 'Pendiente de respuesta' && project.owner !== usuarioActual
                ? `<button type="button" data-cooperative-project-id="${escaparHtmlSocial(project.id)}" data-cooperative-answer="accept">Aceptar</button><button type="button" data-cooperative-project-id="${escaparHtmlSocial(project.id)}" data-cooperative-answer="reject">Rechazar</button>`
                : project.status === 'Aceptado' && investment
                ? `<button type="button" class="cooperative-sell-button" onclick="venderProyectoCooperativo('${encodeURIComponent(project.id)}')">Vender inversión</button>`
            : project.owner === usuarioActual && (!investment || project.status !== 'Aceptado')
                ? `<button type="button" onclick="eliminarProyectoCooperativo('${encodeURIComponent(project.id)}')">Eliminar proyecto</button>`
                : '';
        const amountLabel = project.status === 'Aceptado' && investment ? '' : ` · Aporte: ${formatD(project.amount || 0)}`;
        return `<div class="social-list-item" data-cooperative-project-id="${escaparHtmlSocial(project.id)}"><span class="cooperative-project-summary"><span class="cooperative-company-logo"><img src="${getEmpresaLogo(project.company)}" alt="Logo de ${escaparHtmlSocial(project.company || 'empresa')}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/logos/logo-mark.png';"></span><span><strong>${escaparHtmlSocial(project.name || `${obtenerPropietarioProyecto(project) || 'Jugador'} + ${project.partner || 'jugador'}`)}</strong><small>${escaparHtmlSocial(project.company || 'Sin empresa')} · ${escaparHtmlSocial(project.status || 'Pendiente')}${amountLabel} · <span class="cooperative-project-price cooperative-project-value">${valueLabel}</span> · <span class="cooperative-project-price cooperative-project-result ${resultClass}">${resultLabel}</span></small></span></span><span class="social-list-actions">${action}</span></div>`;
    }).join('') : '<div class="social-empty">Todavía no hay proyectos cooperativos.</div>';
}

let actualizacionSocialEnCurso = null;

function obtenerPropietarioProyecto(project) {
    const explicitOwner = project?.owner || project?.from || project?.sender || project?.creator
        || project?.proposer || project?.requester || project?.initiator || project?.fromUsername
        || project?.senderUsername || project?.createdBy || project?.username;
    if (explicitOwner) return String(explicitOwner).trim();
    const participants = [project?.player1, project?.player2, project?.participant1, project?.participant2, project?.name]
        .filter(Boolean)
        .flatMap(value => String(value).split('+'))
        .map(value => value.trim())
        .filter(Boolean);
    return participants.find(username => username.toLowerCase() !== usuarioActual.toLowerCase()) || '';
}

function normalizarProyectosCooperativos(projects) {
    return (Array.isArray(projects) ? projects : []).map((project, index) => ({
        ...project,
        id: String(project.id || `coop_legacy_${project.createdAt || index}_${project.company || 'empresa'}_${index}`),
        _sourceIndex: index
    }));
}

async function limpiarProyectosCooperativos() {
    const projectsToRemove = proyectosCooperativos.filter(project => project.status !== 'Aceptado' || !project.investment);
    if (!projectsToRemove.length) return toast('No hay proyectos pendientes para limpiar', 'info');
    if (!confirm(`¿Limpiar ${projectsToRemove.length} proyecto(s) pendiente(s) o incompleto(s)? Las inversiones activas se conservarán.`)) return;
    const projectIds = new Set(projectsToRemove.map(project => project.id));
    const matchesProject = item => projectIds.has(String(item.id));
    const participants = [...new Set(projectsToRemove.flatMap(project => [project.owner, project.partner]).filter(Boolean))];
    try {
        const removeProjects = data => ({
            ...data,
            cooperativeProjects: (Array.isArray(data.cooperativeProjects) ? data.cooperativeProjects : []).filter(item => !matchesProject(item))
        });
        for (const participant of participants) await db.updateSocialData(participant, removeProjects);
        proyectosCooperativos = proyectosCooperativos.filter(project => !projectIds.has(project.id));
        await actualizarDatosSociales();
        toast('Proyectos pendientes limpiados', 'success');
    } catch (error) {
        toast(error.message || 'No se pudieron limpiar los proyectos', 'error');
        await actualizarDatosSociales();
    }
}

function esMismoProyecto(first, second) {
    if (first?.id && second?.id && !String(first.id).startsWith('coop_legacy_') && !String(second.id).startsWith('coop_legacy_')) {
        return String(first.id) === String(second.id);
    }
    const sameTimestamp = first?.createdAt && second?.createdAt && first.createdAt === second.createdAt;
    const sameDetails = Boolean(first?.company || first?.name)
        && first?.company === second?.company
        && Number(first?.amount || 0) === Number(second?.amount || 0)
        && (!first?.name || !second?.name || first.name === second.name);
    return Boolean(sameTimestamp || sameDetails);
}

async function actualizarDatosSociales() {
    if (!usuarioActual) return false;
    if (actualizacionSocialEnCurso) return actualizacionSocialEnCurso;
    actualizacionSocialEnCurso = (async () => {
        try {
            const data = await db.getUserData(usuarioActual);
            const storedFriends = Array.isArray(data.amigos) ? data.amigos : [];
            amigos = storedFriends.filter((friend, index, list) => list.findIndex(item => String(item.username).toLowerCase() === String(friend.username).toLowerCase()) === index);
            const oneSidedFriends = await db.getUsersWithFriend(usuarioActual);
            const knownFriends = new Set(amigos.map(friend => String(friend.username).toLowerCase()));
            const missingFriends = oneSidedFriends
                .filter(user => user.username.toLowerCase() !== usuarioActual.toLowerCase() && !knownFriends.has(user.username.toLowerCase()))
                .map(user => ({ username: user.username, publicId: user.save_data?.publicId || '' }));
            if (missingFriends.length) {
                amigos = [...amigos, ...missingFriends];
                await db.updateSocialData(usuarioActual, currentData => ({
                    ...currentData,
                    amigos: [...(Array.isArray(currentData.amigos) ? currentData.amigos : []), ...missingFriends]
                        .filter((friend, index, list) => list.findIndex(item => String(item.username).toLowerCase() === String(friend.username).toLowerCase()) === index)
                }));
            }
            solicitudesAmistad = Array.isArray(data.friendRequests) ? data.friendRequests : [];
            const cooperativeProjects = Array.isArray(data.cooperativeProjects) ? data.cooperativeProjects : [];
            const cooperativeRequests = Array.isArray(data.cooperativeRequests) ? data.cooperativeRequests : [];
            const remoteProjects = await db.getCooperativeProjectsForPartner(usuarioActual);
            proyectosCooperativos = normalizarProyectosCooperativos([...cooperativeProjects, ...cooperativeRequests, ...remoteProjects]
                .filter((project, index, list) => list.findIndex(item => String(item.id) === String(project.id)) === index)
                .map(project => String(project.partner || '').trim().toLowerCase() === usuarioActual.toLowerCase()
                    && String(project.owner || '').trim().toLowerCase() !== usuarioActual.toLowerCase()
                    && project.status !== 'Aceptado'
                    ? { ...project, status: 'Pendiente de respuesta' }
                    : project));
            if (document.getElementById('amigos')?.classList.contains('hidden') === false) await renderSocial();
            return true;
        } catch (error) {
            console.warn('No se pudo actualizar la sección Amigos:', error);
            return false;
        }
    })().finally(() => {
        actualizacionSocialEnCurso = null;
    });
    return actualizacionSocialEnCurso;
}

async function actualizarAmigos() {
    const button = document.getElementById('socialRefreshButton');
    const status = document.getElementById('socialStatus');
    if (button) {
        button.disabled = true;
        button.textContent = '↻ Actualizando...';
    }
    const actualizado = await actualizarDatosSociales();
    if (status) status.textContent = actualizado
        ? `Actualizado: ${new Date().toLocaleTimeString('es-CO')}`
        : 'No se pudo actualizar. Comprueba tu sesión.';
    if (button) {
        button.disabled = false;
        button.textContent = '↻ Actualizar';
    }
}

async function recargarAmigos() {
    return actualizarAmigos();
}

let propuestaCooperativaPendiente = '';
let ventaCooperativaPendiente = null;

function prepararProyectoCooperativo(encodedUsername) {
    const username = decodeURIComponent(encodedUsername);
    propuestaCooperativaPendiente = username;
    const target = document.getElementById('cooperativeProposalTarget');
    const amountInput = document.getElementById('cooperativeProposalAmount');
    const amountLabel = document.getElementById('cooperativeProposalAmountLabel');
    const companySearch = document.getElementById('cooperativeProposalCompanySearch');
    if (companySearch) companySearch.value = '';
    renderCooperativeCompanyOptions('');
    if (target) target.textContent = `Elige el monto para invertir con ${username}.`;
    if (amountLabel) amountLabel.textContent = `Monto de tu aporte (${monedaActual})`;
    if (amountInput) {
        amountInput.value = '1000';
        amountInput.focus();
    }
    document.getElementById('cooperativeProposalModal')?.classList.add('active');
}

function actualizarPreciosCooperativos(company) {
    document.querySelectorAll('.cooperative-company-option').forEach(option => {
        if (option.dataset.company !== company) return;
        const price = option.querySelector('small');
        if (price) price.textContent = formatD(preciosMercado[company] || 0);
    });
    const selected = document.getElementById('cooperativeProposalCompany');
    const selectedLabel = document.getElementById('cooperativeSelectedCompany');
    if (selected?.value === company && selectedLabel) selectedLabel.textContent = `Empresa seleccionada: ${company} · ${formatD(preciosMercado[company] || 0)}`;
    document.querySelectorAll('[data-cooperative-project-id]').forEach(row => {
        const project = proyectosCooperativos.find(item => item.id === row.dataset.cooperativeProjectId);
        const investment = project?.investment;
        if (!investment || investment.company !== company) return;
        const currentValue = (preciosMercado[company] || investment.price) * investment.quantity;
        const result = currentValue - investment.totalCost;
        const valueEl = row.querySelector('.cooperative-project-value');
        const resultEl = row.querySelector('.cooperative-project-result');
        if (valueEl) valueEl.textContent = `Valor actual: ${formatD(currentValue)}`;
        if (resultEl) resultEl.textContent = `Resultado: ${formatD(result)}`;
    });
}

function renderCooperativeCompanyOptions(query = '') {
    const options = document.getElementById('cooperativeCompanyOptions');
    const selected = document.getElementById('cooperativeProposalCompany');
    const selectedLabel = document.getElementById('cooperativeSelectedCompany');
    const countLabel = document.getElementById('cooperativeCompanyCount');
    if (!options || !selected) return;
    const normalizedQuery = String(query).trim().toLowerCase();
    const companies = [...new Set(TODAS_EMPRESAS)].filter(company => company.toLowerCase().includes(normalizedQuery));
    if (countLabel) countLabel.textContent = `${companies.length} empresa${companies.length === 1 ? '' : 's'} disponible${companies.length === 1 ? '' : 's'}`;
    options.innerHTML = companies.length ? companies.map(company => `<button type="button" class="cooperative-company-option${selected.value === company ? ' selected' : ''}" data-company="${escaparHtmlSocial(company)}" onclick="seleccionarEmpresaCooperativa('${encodeURIComponent(company)}')"><span class="cooperative-company-logo"><img src="${getEmpresaLogo(company)}" alt="Logo de ${escaparHtmlSocial(company)}" loading="lazy" onerror="this.onerror=null;this.src='assets/logos/logo-mark.png';"></span><span class="cooperative-company-copy"><strong>${escaparHtmlSocial(company)}</strong><small>${formatD(preciosMercado[company] || 0)}</small></span></button>`).join('') : '<div class="social-empty">No se encontraron empresas.</div>';
    if (selectedLabel) selectedLabel.textContent = selected.value ? `Empresa seleccionada: ${selected.value} · ${formatD(preciosMercado[selected.value] || 0)}` : 'Selecciona una empresa';
}

function seleccionarEmpresaCooperativa(encodedCompany) {
    const company = decodeURIComponent(encodedCompany);
    const selected = document.getElementById('cooperativeProposalCompany');
    const search = document.getElementById('cooperativeProposalCompanySearch');
    if (!selected || !preciosMercado[company]) return;
    selected.value = company;
    if (search) search.value = company;
    renderCooperativeCompanyOptions(company);
}

function cerrarPropuestaCooperativa() {
    propuestaCooperativaPendiente = '';
    document.getElementById('cooperativeProposalModal')?.classList.remove('active');
}

async function confirmarPropuestaCooperativa() {
    const username = propuestaCooperativaPendiente;
    const company = String(document.getElementById('cooperativeProposalCompany')?.value || '').trim();
    const amountInput = Number(document.getElementById('cooperativeProposalAmount')?.value);
    const amount = amountInput / (tiposCambio[monedaActual] || 1);
    if (!username) return cerrarPropuestaCooperativa();
    if (!company || !preciosMercado[company]) return toast('Selecciona una empresa válida', 'error');
    if (!Number.isFinite(amountInput) || amountInput <= 0 || amount > capital) return toast(`El aporte en ${monedaActual} debe ser mayor que cero y no superar tu capital disponible`, 'error');
    const project = { id: `coop_${Date.now()}`, name: `${usuarioActual} + ${username}`, partner: username, owner: usuarioActual, company, amount, share: 50, status: 'Esperando aceptación', createdAt: new Date().toISOString() };
    try {
        await db.updateSocialData(username, data => ({
            ...data,
            cooperativeProjects: [...(Array.isArray(data.cooperativeProjects) ? data.cooperativeProjects : []), { ...project, status: 'Pendiente de respuesta' }],
            cooperativeRequests: [...(Array.isArray(data.cooperativeRequests) ? data.cooperativeRequests : []), { ...project, status: 'Pendiente de respuesta' }]
        }));
        const senderData = await db.updateSocialData(usuarioActual, data => {
            const projects = Array.isArray(data.cooperativeProjects) ? data.cooperativeProjects : [];
            return {
                ...data,
                cooperativeProjects: [...projects, project].filter((item, index, list) => list.findIndex(candidate => String(candidate.id) === String(item.id)) === index)
            };
        });
        proyectosCooperativos = normalizarProyectosCooperativos(senderData.cooperativeProjects);
        renderSocial();
        await actualizarDatosSociales();
        cerrarPropuestaCooperativa();
        toast('Propuesta cooperativa enviada a ambos perfiles', 'success');
    } catch (error) {
        toast(error.message || 'No se pudo enviar la propuesta cooperativa', 'error');
    }
}

async function responderProyectoCooperativo(encodedProjectId, aceptado) {
    const projectId = decodeURIComponent(encodedProjectId);
    const project = proyectosCooperativos.find(item => item.id === projectId && item.owner !== usuarioActual && item.status === 'Pendiente de respuesta');
    const owner = obtenerPropietarioProyecto(project);
    if (!project) return toast('La solicitud ya no está disponible', 'error');
    if (aceptado && !owner) return toast('La solicitud no tiene un propietario válido para aceptar', 'error');
    const nuevoEstado = aceptado ? 'Aceptado' : 'Rechazado';
    try {
        let investment = null;
        let recipientData = await db.getUserData(usuarioActual);
        let ownerData = owner ? await db.getUserData(owner) : null;
        if (aceptado) {
            const contribution = Number(project.amount);
            const price = Number(preciosMercado[project.company]);
            if (!Number.isFinite(contribution) || contribution <= 0 || !Number.isFinite(price) || price <= 0) {
                throw new Error('La propuesta no tiene una empresa o aporte válido');
            }
            if (!ownerData || Number(recipientData.capital) < contribution || Number(ownerData.capital) < contribution) {
                throw new Error('Uno de los participantes no tiene capital suficiente');
            }
            const totalCost = contribution * 2;
            investment = {
                company: project.company,
                quantity: Math.round((totalCost / price) * 10000) / 10000,
                price,
                totalCost,
                ownerContribution: contribution,
                partnerContribution: contribution,
                openedAt: new Date().toISOString()
            };
        }
        const updateProject = (item, index) => (item.id === project.id || (String(project.id).startsWith('coop_legacy_') && index === project._sourceIndex))
            ? { ...item, id: project.id, status: nuevoEstado, ...(investment ? { investment } : {}) } : item;
        const removeProject = data => (Array.isArray(data.cooperativeProjects) ? data.cooperativeProjects : []).filter((item, index) =>
            !(item.id === project.id || (String(project.id).startsWith('coop_legacy_') && index === project._sourceIndex))
        );
        const removeRequest = data => (Array.isArray(data.cooperativeRequests) ? data.cooperativeRequests : []).filter(item => item.id !== project.id);
        await db.updateSocialData(usuarioActual, data => ({
            ...data,
            capital: aceptado ? Number(data.capital || 0) - investment.partnerContribution : data.capital,
            cooperativeProjects: aceptado ? (Array.isArray(data.cooperativeProjects) ? data.cooperativeProjects : []).map(updateProject) : removeProject(data),
            cooperativeRequests: aceptado ? (Array.isArray(data.cooperativeRequests) ? data.cooperativeRequests : []).map(updateProject) : removeRequest(data)
        }));
        if (owner && owner.toLowerCase() !== usuarioActual.toLowerCase()) {
            await db.updateSocialData(owner, data => ({
                ...data,
                capital: aceptado ? Number(data.capital || 0) - investment.ownerContribution : data.capital,
                cooperativeProjects: aceptado ? (Array.isArray(data.cooperativeProjects) ? data.cooperativeProjects : []).map(updateProject) : removeProject(data),
                cooperativeRequests: aceptado ? (Array.isArray(data.cooperativeRequests) ? data.cooperativeRequests : []).map(updateProject) : removeRequest(data)
            }));
        }
        proyectosCooperativos = aceptado ? proyectosCooperativos.map(updateProject) : proyectosCooperativos.filter((item, index) =>
            !(item.id === project.id || (String(project.id).startsWith('coop_legacy_') && index === project._sourceIndex))
        );
        if (aceptado) capital -= investment.partnerContribution;
        actualizarTodo();
        await actualizarDatosSociales();
        toast(aceptado ? `Inversión creada en ${project.company}` : 'Solicitud cooperativa rechazada', 'success');
    } catch (error) {
        toast(error.message || 'No se pudo responder la solicitud cooperativa', 'error');
        await actualizarDatosSociales();
    }
}

async function eliminarProyectoCooperativo(encodedProjectId) {
    const projectId = decodeURIComponent(encodedProjectId);
    const project = proyectosCooperativos.find(item => item.id === projectId && item.owner === usuarioActual && (item.status !== 'Aceptado' || !item.investment));
    if (!project) return toast('Solo puedes eliminar proyectos pendientes o sin inversión', 'error');
    if (!confirm(`¿Eliminar el proyecto cooperativo con ${project.partner || 'tu socio'}?`)) return;
    const matchesProject = (item, index) => item.id === projectId
        || (String(projectId).startsWith('coop_legacy_') && index === project._sourceIndex);
    try {
        const removeProject = data => ({
            ...data,
            cooperativeProjects: (Array.isArray(data.cooperativeProjects) ? data.cooperativeProjects : []).filter((item, index) => !matchesProject(item, index))
        });
        await db.updateSocialData(usuarioActual, removeProject);
        if (project.partner && project.partner.toLowerCase() !== usuarioActual.toLowerCase()) {
            await db.updateSocialData(project.partner, removeProject);
        }
        proyectosCooperativos = proyectosCooperativos.filter((item, index) => !matchesProject(item, index));
        await guardar();
        await actualizarDatosSociales();
        toast('Proyecto cooperativo eliminado', 'success');
    } catch (error) {
        toast(error.message || 'No se pudo eliminar el proyecto cooperativo', 'error');
        await actualizarDatosSociales();
    }
}

async function venderProyectoCooperativo(encodedProjectId, confirmado = false) {
    const projectId = decodeURIComponent(encodedProjectId);
    const project = proyectosCooperativos.find(item => item.id === projectId && item.status === 'Aceptado' && item.investment);
    if (!project) return toast('La inversión cooperativa ya no está disponible', 'error');
    const investment = project.investment;
    const currentValue = (preciosMercado[investment.company] || investment.price) * investment.quantity;
    const ownerPayout = currentValue * investment.ownerContribution / investment.totalCost;
    const partnerPayout = currentValue * investment.partnerContribution / investment.totalCost;
    const ownerProfit = ownerPayout - investment.ownerContribution;
    const partnerProfit = partnerPayout - investment.partnerContribution;
    if (!confirmado) {
        ventaCooperativaPendiente = projectId;
        modalActionType = 'venta_cooperativa';
        document.getElementById('modalTitle').innerText = 'Confirmar venta cooperativa';
        document.getElementById('modalText').innerHTML = `
            Vas a vender la inversión cooperativa en <b>${project.company}</b>.<br><br>
            Ingreso estimado: <b>${formatD(currentValue)}</b><br>
            Resultado: <span style="color:${ownerProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatD(ownerProfit)}</span>
        `;
        const confirmBtn = document.getElementById('modalConfirmBtn');
        if (confirmBtn) {
            confirmBtn.innerText = 'Confirmar venta';
            confirmBtn.style.background = ownerProfit >= 0 ? 'var(--success)' : 'var(--danger)';
            confirmBtn.style.color = ownerProfit >= 0 ? '#000' : '#fff';
            confirmBtn.dataset.action = 'venta_cooperativa';
        }
        document.getElementById('modalConfirm').classList.add('active');
        return;
    }
    try {
        const removeProject = (data, username) => {
            const payout = username === project.owner ? ownerPayout : partnerPayout;
            const profit = username === project.owner ? ownerProfit : partnerProfit;
            return {
                ...data,
                capital: Number(data.capital || 0) + payout,
                g: Number(data.g || 0) + Math.max(0, profit),
                p: Number(data.p || 0) + Math.max(0, -profit),
                cooperativeProjects: (Array.isArray(data.cooperativeProjects) ? data.cooperativeProjects : []).filter(item => item.id !== projectId)
            };
        };

        function confirmarVentaCooperativa() {
            const projectId = ventaCooperativaPendiente;
            ventaCooperativaPendiente = null;
            cerrarModal();
            if (projectId) venderProyectoCooperativo(encodeURIComponent(projectId), true);
        }
        await db.updateSocialData(project.owner, data => removeProject(data, project.owner));
        await db.updateSocialData(project.partner, data => removeProject(data, project.partner));
        const ownPayout = usuarioActual === project.owner ? ownerPayout : partnerPayout;
        const ownProfit = usuarioActual === project.owner ? ownerProfit : partnerProfit;
        capital += ownPayout;
        if (ownProfit >= 0) gananciasTotal += ownProfit;
        else perdidasTotal += Math.abs(ownProfit);
        proyectosCooperativos = proyectosCooperativos.filter(item => item.id !== projectId);
        actualizarTodo();
        renderSocial();
        toast(`Inversión vendida. Tu resultado: ${formatD(ownProfit)}`, ownProfit >= 0 ? 'success' : 'warning');
    } catch (error) {
        toast(error.message || 'No se pudo vender la inversión cooperativa', 'error');
    }
}

function confirmarVentaCooperativa() {
    if (!ventaCooperativaPendiente) return cerrarModal();
    const projectId = ventaCooperativaPendiente;
    ventaCooperativaPendiente = null;
    venderProyectoCooperativo(encodeURIComponent(projectId), true);
    cerrarModal();
}

setInterval(() => {
    if (usuarioActual && document.getElementById('amigos')?.classList.contains('hidden') === false) {
        actualizarDatosSociales();
    }
}, 5000);

function registrarMensajeHistorial(mensaje, tipo = "info") {
    historialGlobal.unshift({
        mensaje,
        tipo,
        tiempo: new Date().toLocaleTimeString(),
        fecha: new Date().toLocaleString()
    });
    if (historialGlobal.length > 80) historialGlobal.pop();
    renderHistorial();
    if (usuarioActual) guardar();
}

function renderHistorial() {
    const cont = document.getElementById("historialMensajes");
    if (!cont) return;
    if (historialGlobal.length === 0) {
        cont.innerHTML = '<div style="color:#666;text-align:center;padding:20px;">Aun no hay mensajes registrados.</div>';
        return;
    }
    cont.innerHTML = "";
    historialGlobal.forEach(item => {
        const div = document.createElement("div");
        const tipoClase = item.tipo === "success" ? "positivo" : item.tipo === "warning" || item.tipo === "error" ? "negativo" : "neutral";
        div.className = "historial-item " + tipoClase;
        div.innerHTML = `
            <span class="historial-item-icon">${item.tipo === "success" ? "✅" : item.tipo === "warning" ? "⚠️" : item.tipo === "error" ? "❌" : "ℹ️"}</span>
            <span class="historial-item-text">${traducirTexto(item.mensaje)} <small style="color:#777">(${item.tiempo})</small></span>
            <span class="historial-item-fecha">${item.fecha}</span>
        `;
        cont.appendChild(div);
    });
}

function toast(m, t="info", options={}) {
    const loginScreen = document.getElementById("loginScreen");
    if ((loginScreen && loginScreen.style.display !== "none" && !options.allowOnLoginScreen) || estaEnPreferencias() || estaEnAjustes() || estaEnPerfil()) {
        return;
    }
    m = traducirTexto(m);
    registrarMensajeHistorial(m, t);
    const c = document.getElementById("notis-container");
    const d = document.createElement("div");
    d.className = "toast " + t;
    let icon = t==="success" ? "✅" : t==="error" ? "❌" : t==="warning" ? "⚠️" : "ℹ️";
    d.innerHTML = `<div>${icon} ${m}</div><div class="toast-timer"><div class="toast-timer-bar"></div></div>`;
    c.appendChild(d);
    setTimeout(() => {
        d.style.animation = "slideOut 0.4s forwards";
        setTimeout(() => d.remove(), 400);
    }, 4000);
}

function limpiarNotificaciones() {
    const contenedor = document.getElementById('notis-container');
    if (contenedor) contenedor.innerHTML = '';
}

function filtrarEmpresas() {
    let f = document.getElementById("buscadorEmpresas").value.toLowerCase().trim();
    document.querySelectorAll(".categoria-card").forEach(c => {
        let visible = false;
        c.querySelectorAll(".empresa-row").forEach(row => {
            let name = row.querySelector(".emp-name")?.innerText.toLowerCase() || "";
            let match = name.includes(f);
            row.style.display = match ? "grid" : "none";
            if (match) visible = true;
        });
        c.style.display = visible ? "block" : "none";
    });
}

function filtrarMercado() {
    let f = document.getElementById("buscadorMercado").value.toLowerCase().trim();
    let cont = document.getElementById("mercadoCategorias");
    if (!cont) return;
    cont.querySelectorAll("div[style*='margin-bottom: 20px']").forEach(catDiv => {
        let visible = false;
        catDiv.querySelectorAll("div[id^='mercado-card-']").forEach(card => {
            let empName = card.querySelector("div[style*='font-weight:700']");
            let name = empName ? empName.innerText.toLowerCase() : "";
            let match = name.includes(f);
            card.style.display = match ? "block" : "none";
            if (match) visible = true;
        });
        catDiv.style.display = visible ? "block" : "none";
    });
}

function subirXP(p) {
    const multiplicadorXP = PLANES[planActual]?.multiplicadorXP || 1;
    xp += Math.round(p * multiplicadorXP);
    let max = calcXPMax();
    if (xp >= max) {
        xp -= max;
        nivel++;
        // ===== FIX: Dar 3 puntos de habilidad por nivel =====
        puntosHabilidadTotal += 3;
        toast("🚀 ¡SUBISTE DE NIVEL " + nivel + "! Nuevos sectores desbloqueados. +3 PH", "success");
        dibujarTienda();
        checkLogros();
        checkDesafio("subir_nivel", nivel);
        guardar();
    }
}

// ==========================================
// GRAFICA DE PORTAFOLIO
// ==========================================
let chartPortafolio = null;
let startNetPortfolio = 10000;
let chartPortafolioMode = 'average';
let selectedEmpresaPortafolio = null;
const portafolioAverageLabel = 'Promedio general';

function setPortafolioChartMode(mode) {
    chartPortafolioMode = mode || 'average';
    selectedEmpresaPortafolio = null;
    updatePromedioPortafolioDataset();
    actualizarPortafolioInfoLabel();
    updatePortafolioChartDisplay();
    if (chartPortafolio) chartPortafolio.update('none');
    document.getElementById('btnPortafolioAverage')?.classList.add('active');
    document.querySelectorAll('#listaPortafolio tr.selected-row').forEach(row => row.classList.remove('selected-row'));
}

function seleccionarEmpresaPortafolio(emp) {
    selectedEmpresaPortafolio = emp;
    actualizarPortafolioInfoLabel();
    updatePromedioPortafolioDataset();
    updatePortafolioChartDisplay();
    if (chartPortafolio) chartPortafolio.update('none');
}

function actualizarPortafolioInfoLabel() {
    const label = document.getElementById('portafolioModeLabel');
    const info = document.getElementById('portafolioSelectedInfo');
    if (!label || !info) return;
    if (selectedEmpresaPortafolio) {
        label.innerText = selectedEmpresaPortafolio;
        info.innerText = `Mostrando promedio general y empresa seleccionada: ${selectedEmpresaPortafolio}. Haz clic en otra fila para elegir otra.`;
    } else {
        label.innerText = 'Promedio general';
        info.innerText = 'Mostrando promedio general. Haz clic en una fila para ver una empresa específica junto al promedio.';
    }
}

function normalizePortafolioAverageLabel() {
    if (!chartPortafolio) return;
    chartPortafolio.data.datasets = chartPortafolio.data.datasets.map(ds => {
        if (ds.label === 'Promedio cartera') {
            console.log('[depuracion] renombrando dataset antiguo:', ds.label, '->', portafolioAverageLabel);
            return { ...ds, label: portafolioAverageLabel };
        }
        return ds;
    });
    chartPortafolio.data.datasets = chartPortafolio.data.datasets.filter(ds => ds.label !== 'Promedio cartera');
    if (chartPortafolio.data.datasets.some(ds => ds.label === portafolioAverageLabel)) {
        chartPortafolio.update('none');
    }
}

function updatePortafolioChartDisplay() {
    if (!chartPortafolio) return;
    normalizePortafolioAverageLabel();
    chartPortafolio.data.datasets.forEach(ds => { ds.hidden = true; });

    const getSegmentColor = ctx => {
        if (!ctx?.p0?.parsed || !ctx?.p1?.parsed) return '#4aec57';
        return ctx.p0.parsed.y <= ctx.p1.parsed.y ? '#4aec57' : '#ff4c4c';
    };

    const getPointColor = ctx => {
        if (!ctx?.p0?.parsed || !ctx?.p1?.parsed) return '#4aec57';
        return ctx.p0.parsed.y <= ctx.p1.parsed.y ? '#4aec57' : '#ff4c4c';
    };

    const avg = chartPortafolio.data.datasets.find(d => d.label === portafolioAverageLabel);
    if (avg) {
        // Mostrar promedio solo si no hay empresa seleccionada
        avg.hidden = selectedEmpresaPortafolio ? true : false;
        avg.borderColor = getSegmentColor;
        avg.pointBorderColor = getPointColor;
        avg.pointBackgroundColor = getPointColor;
        avg.backgroundColor = 'rgba(255,255,255,0.20)';
        avg.borderWidth = 5;
        avg.pointRadius = 0;
        avg.pointHoverRadius = 6;
        avg.fill = false;
        avg.order = 1;
        avg.segment = {
            borderColor: getSegmentColor,
            borderWidth: 3
        };
    }

    if (selectedEmpresaPortafolio) {
        const selected = chartPortafolio.data.datasets.find(d => d.label === selectedEmpresaPortafolio);
        if (selected) {
            selected.hidden = false;
            selected.borderColor = getSegmentColor;
            selected.pointBorderColor = '#4aec57';
            selected.pointBackgroundColor = 'rgba(255,255,255,0.16)';
            selected.backgroundColor = 'rgba(255,255,255,0.16)';
            selected.borderWidth = 5;
            selected.pointRadius = 0;
            selected.pointHoverRadius = 6;
            selected.segment = {
                borderColor: getSegmentColor,
                borderWidth: 3
            };
            selected.order = 2;
        } else {
            selectedEmpresaPortafolio = null;
            actualizarPortafolioInfoLabel();
        }
    }
}

function updatePromedioPortafolioDataset() {
    if (!chartPortafolio) return;
    normalizePortafolioAverageLabel();

    const labelsLength = chartPortafolio.data.labels.length;
    const companyDatasets = chartPortafolio.data.datasets.filter(ds => ds.label !== portafolioAverageLabel && portafolio[ds.label]);
    const avgData = Array(labelsLength).fill(null);

    if (companyDatasets.length > 0) {
        const weights = companyDatasets.map(ds => {
            const data = portafolio[ds.label];
            return data ? (data.precioCompra || 0) * (data.cant || 0) : 0;
        });

        for (let i = 0; i < labelsLength; i++) {
            let weightedSum = 0;
            let weightSum = 0;
            companyDatasets.forEach((ds, index) => {
                const value = ds.data[i];
                const weight = weights[index];
                if (typeof value === 'number' && !Number.isNaN(value) && weight > 0) {
                    weightedSum += value * weight;
                    weightSum += weight;
                }
            });
            avgData[i] = weightSum > 0 ? weightedSum / weightSum : null;
        }
    }

    const getSegmentColorAvg = ctx => {
        if (!ctx?.p0?.parsed || !ctx?.p1?.parsed) return '#4aec57';
        return ctx.p0.parsed.y <= ctx.p1.parsed.y ? '#4aec57' : '#ff4c4c';
    };

    const getPointColorAvg = ctx => {
        if (!ctx?.p0?.parsed || !ctx?.p1?.parsed) return '#4aec57';
        return ctx.p0.parsed.y <= ctx.p1.parsed.y ? '#4aec57' : '#ff4c4c';
    };

    const averageStyle = {
        label: portafolioAverageLabel,
        data: avgData,
        borderColor: getSegmentColorAvg,
        backgroundColor: 'rgba(0,212,255,0.14)',
        borderWidth: 3,
        tension: 0.2,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBorderColor: getPointColorAvg,
        pointBackgroundColor: getPointColorAvg,
        hidden: false,
        segment: {
            borderColor: getSegmentColorAvg,
            borderWidth: 3
        }
    };

    let averageDataset = chartPortafolio.data.datasets.find(ds => ds.label === portafolioAverageLabel);
    if (!averageDataset) {
        chartPortafolio.data.datasets.unshift({ ...averageStyle });
    } else {
        Object.assign(averageDataset, averageStyle);
        averageDataset.label = portafolioAverageLabel;
    }

    chartPortafolio.data.datasets.forEach(ds => {
        while (ds.data.length < labelsLength) ds.data.unshift(null);
        while (ds.data.length > labelsLength) ds.data.shift();
    });
}

function initChartPortafolio() {
    if (typeof Chart === 'undefined') return;
    const ctxPortafolio = document.getElementById('graficaPortafolio');
    if (!ctxPortafolio) return;
    if (chartPortafolio) { chartPortafolio.destroy(); chartPortafolio = null; }
    startNetPortfolio = getPatrimonioNeto() || 10000;
    chartPortafolio = new Chart(ctxPortafolio, {
        type: 'line',
        data: {
            labels: ['Inicio'],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderCapStyle: 'round',
                    borderJoinStyle: 'round'
                }
            },
            interaction: {
                mode: 'nearest',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#f0f0f0',
                        boxWidth: 18,
                        padding: 18,
                        filter: item => !item.hidden,
                        generateLabels: chart => {
                            return Chart.defaults.plugins.legend.labels.generateLabels(chart).map(item => {
                                if (item.text === 'Promedio cartera') {
                                    item.text = portafolioAverageLabel;
                                }
                                return item;
                            });
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#111',
                    titleColor: '#fff',
                    bodyColor: '#ddd',
                    borderColor: '#444',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: ctx => {
                            const label = ctx.dataset.label === portafolioAverageLabel || ctx.dataset.label === 'Promedio cartera'
                                ? portafolioAverageLabel
                                : ctx.dataset.label;
                            if (label === portafolioAverageLabel) {
                                return `${label}: ${formatD(ctx.parsed.y || 0)}`;
                            }
                            return `${label}: ${(ctx.parsed.y || 0).toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255,255,255,0.10)', drawBorder: false },
                    ticks: { color: '#eee', callback: value => `${value.toFixed(2)}%`, padding: 10 },
                    border: { color: 'rgba(255,255,255,0.2)' }
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0.08)', drawBorder: false },
                    ticks: { color: '#eee', padding: 10 },
                    border: { color: 'rgba(255,255,255,0.2)' }
                }
            }
        }
    });
    setPortafolioChartMode('average');
}

function actualizarChartPortafolio() {
    if (!chartPortafolio) return;
    chartPortafolio.data.labels.push("");

    chartPortafolio.data.datasets.forEach(ds => ds.data.push(null));

    Object.keys(portafolio).forEach(emp => {
        let dataset = chartPortafolio.data.datasets.find(d => d.label === emp);
        let precioCompra = portafolio[emp].precioCompra || preciosMercado[emp];
        let rendimiento = precioCompra ? ((preciosMercado[emp] - precioCompra) / precioCompra) * 100 : 0;
        rendimiento = Math.round(rendimiento * 100) / 100;
        if (!dataset) {
            let sector = empresaMeta[emp]?.sector;
            let color = CATEGORIAS[sector]?.color || '#4aec57';
            dataset = {
                label: emp,
                data: Array(chartPortafolio.data.labels.length - 1).fill(null),
                borderColor: color,
                _baseBorderColor: color,
                backgroundColor: 'rgba(255,255,255,0.08)',
                tension: 0.2,
                fill: false,
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBorderColor: '#00d4ff',
                pointBackgroundColor: 'rgba(255,255,255,0.05)',
                segment: {
                    borderColor: ctx => {
                        if (!ctx?.p0?.parsed || !ctx?.p1?.parsed) return '#4aec57';
                        return ctx.p0.parsed.y <= ctx.p1.parsed.y ? '#4aec57' : '#ff4c4c';
                    },
                    borderWidth: 3
                }
            };
            dataset.data[dataset.data.length - 1] = rendimiento;
            chartPortafolio.data.datasets.push(dataset);
        } else {
            dataset.data[dataset.data.length - 1] = rendimiento;
        }
    });

    updatePromedioPortafolioDataset();
    normalizePortafolioAverageLabel();
    chartPortafolio.data.datasets = chartPortafolio.data.datasets.filter(ds => ds.label === portafolioAverageLabel || portafolio[ds.label]);
    chartPortafolio.data.datasets = chartPortafolio.data.datasets.filter(ds => ds.label !== 'Promedio cartera');

    if (chartPortafolio.data.labels.length > 30) {
        chartPortafolio.data.labels.shift();
        chartPortafolio.data.datasets.forEach(ds => ds.data.shift());
    }

    updatePortafolioChartDisplay();
    chartPortafolio.update('none');
}


// ==========================================
// SISTEMA DE ASESORES - 15+ CON ESCALADO
// ==========================================
let asesoresEstado = {};
let prediccionesActivas = [];
let salarioInterval = null;
let prediccionesInterval = null;
let prediccionesTimerInterval = null;

function getMaxAsesorSlots() {
    let extra = 0;
    let h12Level = habilidadesDesbloqueadas["h12"] || 0;
    extra = h12Level; // +1 slot por nivel de Emperador
    return 5 + extra;
}

function initAsesores() {
    ASESORES_DEF.forEach(a => { if (!asesoresEstado[a.id]) asesoresEstado[a.id] = { contratado: false, nivel: 1, exp: 0 }; });
    renderAsesores(); renderPredicciones(); renderHistorialPredicciones();
    if (salarioInterval) clearInterval(salarioInterval);
    if (prediccionesInterval) clearInterval(prediccionesInterval);
    if (prediccionesTimerInterval) clearInterval(prediccionesTimerInterval);
    salarioInterval = setInterval(() => { if (usuarioActual) pagarSalarios(); }, 30000);
    prediccionesInterval = setInterval(() => { if (usuarioActual) generarPredicciones(); }, 5000);
    prediccionesTimerInterval = setInterval(() => { if (usuarioActual) actualizarPrediccionesTimer(); }, 1000);
}

function getSalario(asesorId, nivel) {
    let a = ASESORES_DEF.find(x => x.id === asesorId);
    let salarioEscalado = getSalarioEscalonado(a.salarioBase);
    // Aplicar descuento de habilidad Negociador
    let h3Level = habilidadesDesbloqueadas["h3"] || 0;
    let descuento = 1 - (h3Level * 0.05);
    return Math.round(salarioEscalado * Math.pow(1.3, nivel - 1) * descuento);
}

function getPrecision(asesorId, nivel) {
    let a = ASESORES_DEF.find(x => x.id === asesorId);
    let base = Math.min(95, a.precisionBase + (nivel - 1) * 7);
    // Aplicar bonus de Ojo de Aguila
    let h1Level = habilidadesDesbloqueadas["h1"] || 0;
    let bonus = h1Level * 8;
    // Aplicar bonus de Suerte Invertida
    let h14Level = habilidadesDesbloqueadas["h14"] || 0;
    let suerte = h14Level * 3;
    return Math.min(98, base + bonus + suerte);
}

function getCooldownReal(asesorId) {
    let a = ASESORES_DEF.find(x => x.id === asesorId);
    let h2Level = habilidadesDesbloqueadas["h2"] || 0;
    let reduccion = 1 - (h2Level * 0.12);
    return Math.max(5, Math.round(a.cooldown * reduccion));
}

function pagarSalarios() {
    let total = 0;
    ASESORES_DEF.forEach(a => {
        let est = asesoresEstado[a.id];
        if (est && est.contratado) total += getSalario(a.id, est.nivel);
    });
    if (total > 0) {
        if (capital >= total) {
            capital -= total;
            toast(`💸 Salarios pagados: ${formatD(total)}`, "warning");
            actualizarTodo(); guardar();
        } else {
            toast("❌ Fondos insuficientes. ¡Despidiendo asesores!", "error");
            ASESORES_DEF.forEach(a => {
                let est = asesoresEstado[a.id];
                if (est.contratado) { est.contratado = false; est.exp = 0; }
            });
            prediccionesActivas = [];
            renderAsesores(); renderPredicciones(); actualizarTodo(); guardar();
        }
    }
}

function contratarAsesor(id) {
    let a = ASESORES_DEF.find(x => x.id === id), est = asesoresEstado[id];
    if (est.contratado) return;
    // Check nivel requerido
    if (nivel < a.nivelReq) return toast(`Necesitas nivel ${a.nivelReq} para contratar a ${a.nombre}`, "error");
    let costo = getSalarioEscalonado(a.salarioBase) * 3;
    if (capital < costo) return toast("Fondos insuficientes", "error");
    let contratados = Object.values(asesoresEstado).filter(e => e.contratado).length;
    if (contratados >= getMaxAsesorSlots()) return toast(`Maximo ${getMaxAsesorSlots()} asesores (mejora la habilidad Emperador)`, "error");
    capital -= costo; est.contratado = true; est.exp = 0;
    toast(`🎩 ${a.nombre} contratado por ${formatD(costo)}`, "success");
    checkDesafio("contratar", 1);
    renderAsesores(); actualizarTodo(); guardar();
}

function despedirAsesor(id) {
    let est = asesoresEstado[id];
    if (!est.contratado) return;
    est.contratado = false; est.exp = 0;
    prediccionesActivas = prediccionesActivas.filter(p => p.asesorId !== id);
    toast("Asesor despedido. Predicciones eliminadas.", "info");
    renderAsesores(); renderPredicciones(); guardar();
}

function subirNivelAsesor(id) {
    let a = ASESORES_DEF.find(x => x.id === id), est = asesoresEstado[id];
    if (!est.contratado || est.nivel >= a.maxNivel) return;
    let costo = getSalario(id, est.nivel) * 5;
    if (capital < costo) return toast("Fondos insuficientes", "error");
    capital -= costo; est.nivel++;
    toast(`⭐ ${a.nombre} Nivel ${est.nivel}! Precision: ${getPrecision(id, est.nivel)}%`, "success");
    renderAsesores(); actualizarTodo(); guardar();
}

function renderAsesores() {
    const cont = document.getElementById("asesoresLista");
    if (!cont) return;
    cont.innerHTML = "";
    let totalSalarios = 0, totalPrecision = 0, count = 0;
    ASESORES_DEF.forEach(a => {
        let est = asesoresEstado[a.id];
        let bloqueado = nivel < a.nivelReq;
        let salario = getSalario(a.id, est.nivel);
        let precision = getPrecision(a.id, est.nivel);
        let costoContr = bloqueado ? 0 : getSalarioEscalonado(a.salarioBase) * 3;
        let costoSubir = (!est.contratado || est.nivel >= a.maxNivel) ? 0 : getSalario(a.id, est.nivel) * 5;
        if (est.contratado) { totalSalarios += salario; totalPrecision += precision; count++; }
        
        let div = document.createElement("div");
        div.className = "asesor-card" + (est.contratado ? " contratado" : bloqueado ? " bloqueado" : "");
        
        if (bloqueado) {
            div.innerHTML = `
                <div class="asesor-nivel" style="color:#ff4444">🔒 BLOQUEADO — Nivel ${a.nivelReq} requerido</div>
                <div class="asesor-header">
                    <div class="asesor-avatar" style="border-color:#444;opacity:0.5">${a.emoji}</div>
                    <div>
                        <div style="font-weight:700;font-size:1.05em;color:#666">${a.nombre}</div>
                        <div style="font-size:0.8em;color:#555">${a.especialidad} • ${a.desc}</div>
                        <div style="font-size:0.75em;color:#ff4444;margin-top:4px">Se desbloquea al alcanzar nivel ${a.nivelReq}</div>
                    </div>
                </div>
                <div class="asesor-stats" style="opacity:0.4">
                    <div class="asesor-stat"><div class="asesor-stat-label">Salario/30s</div><div class="asesor-stat-value">${formatD(salario)}</div></div>
                    <div class="asesor-stat"><div class="asesor-stat-label">Precision</div><div class="asesor-stat-value" style="color:${a.color}">${precision}%</div></div>
                    <div class="asesor-stat"><div class="asesor-stat-label">Cooldown</div><div class="asesor-stat-value">${getCooldownReal(a.id)}s</div></div>
                    <div class="asesor-stat"><div class="asesor-stat-label">Max Nivel</div><div class="asesor-stat-value">${a.maxNivel}</div></div>
                </div>
            `;
        } else {
            div.innerHTML = `
                <div class="asesor-nivel" style="color:${a.color}">Nivel ${est.nivel}/${a.maxNivel}</div>
                <div class="asesor-header">
                    <div class="asesor-avatar" style="border-color:${a.color}">${a.emoji}</div>
                    <div>
                        <div style="font-weight:700;font-size:1.05em;">${a.nombre}</div>
                        <div style="font-size:0.8em;color:#888;">${a.especialidad} • ${a.desc}</div>
                    </div>
                </div>
                <div class="asesor-stats">
                    <div class="asesor-stat"><div class="asesor-stat-label">Salario/30s</div><div class="asesor-stat-value" style="color:${est.contratado?'var(--danger)':'#888'}">${formatD(salario)}</div></div>
                    <div class="asesor-stat"><div class="asesor-stat-label">Precision</div><div class="asesor-stat-value" style="color:${a.color}">${precision}%</div></div>
                    <div class="asesor-stat"><div class="asesor-stat-label">Cooldown</div><div class="asesor-stat-value">${getCooldownReal(a.id)}s</div></div>
                    <div class="asesor-stat"><div class="asesor-stat-label">Estado</div><div class="asesor-stat-value" style="color:${est.contratado?'var(--success)':'#666'}">${est.contratado?'✅ Activo':'⏸️ Disp.'}</div></div>
                </div>
                <div class="asesor-acciones">
                    ${!est.contratado 
                        ? `<button class="btn-contratar" onclick="contratarAsesor('${a.id}')">Contratar (${formatD(costoContr)})</button>`
                        : `<button class="btn-despedir" onclick="despedirAsesor('${a.id}')">Despedir</button>
                           <button class="btn-subir" onclick="subirNivelAsesor('${a.id}')" ${est.nivel>=a.maxNivel?'disabled':''}>${est.nivel>=a.maxNivel?'✅ Max':'Capacitar ('+formatD(costoSubir)+')'}</button>`
                    }
                </div>
            `;
        }
        cont.appendChild(div);
    });
    let maxSlots = getMaxAsesorSlots();
    document.getElementById("asesoresContratados").innerText = `${count} / ${maxSlots}`;
    document.getElementById("gastoSalarios").innerText = formatD(totalSalarios);
    document.getElementById("precisionPromedio").innerText = count > 0 ? Math.round(totalPrecision / count) + "%" : "0%";
}

// ==========================================
// PREDICCIONES POR EMPRESA (NO CATEGORIA)
// ==========================================
function generarPredicciones() {
    ASESORES_DEF.forEach(a => {
        let est = asesoresEstado[a.id];
        if (!est || !est.contratado) return;
        if (nivel < a.nivelReq) return;
        let ahora = Date.now(), ultima = est.ultimaPrediccion || 0;
        let cooldownReal = getCooldownReal(a.id) * 1000;
        if (ahora - ultima < cooldownReal) return;
        let yaActiva = prediccionesActivas.some(p => p.asesorId === a.id && p.resultado === 'pendiente');
        if (yaActiva) return;
        est.ultimaPrediccion = ahora;
        
        // Seleccionar empresa ALEATORIA del mercado (respetando bloqueos de nivel)
        let tipo = Math.random() > 0.5 ? 'subida' : 'bajada';
        let empresasDisp = TODAS_EMPRESAS.filter(e => {
            let sector = empresaMeta[e]?.sector;
            if (!sector || !CATEGORIAS[sector]) return false;
            return nivel >= CATEGORIAS[sector].lvl;
        });
        if (empresasDisp.length === 0) empresasDisp = TODAS_EMPRESAS;
        let empresaTarget = empresasDisp[Math.floor(Math.random() * empresasDisp.length)];
        let sectorEmp = empresaMeta[empresaTarget]?.sector || "General";

        if (a.especialidad === 'Cripto' && nivel >= CATEGORIAS['Criptomonedas'].lvl) {
            let cryptos = empresasDisp.filter(e => empresaMeta[e]?.sector === 'Criptomonedas');
            if (cryptos.length > 0 && Math.random() > 0.3) {
                empresaTarget = cryptos[Math.floor(Math.random() * cryptos.length)];
                sectorEmp = 'Criptomonedas';
            }
        }
        if (a.especialidad === 'Energia' && nivel >= CATEGORIAS['Energia'].lvl) {
            let energias = empresasDisp.filter(e => empresaMeta[e]?.sector === 'Energia');
            if (energias.length > 0 && Math.random() > 0.3) {
                empresaTarget = energias[Math.floor(Math.random() * energias.length)];
                sectorEmp = 'Energia';
            }
        }
        if (a.especialidad === 'Salud' && nivel >= CATEGORIAS['Salud'].lvl) {
            let saluds = empresasDisp.filter(e => empresaMeta[e]?.sector === 'Salud');
            if (saluds.length > 0 && Math.random() > 0.3) {
                empresaTarget = saluds[Math.floor(Math.random() * saluds.length)];
                sectorEmp = 'Salud';
            }
        }
        if (a.especialidad === 'IA' && nivel >= CATEGORIAS['IA'].lvl) {
            let ias = empresasDisp.filter(e => empresaMeta[e]?.sector === 'IA');
            if (ias.length > 0 && Math.random() > 0.3) {
                empresaTarget = ias[Math.floor(Math.random() * ias.length)];
                sectorEmp = 'IA';
            }
        }
                let predId = 'pred_'+Date.now()+'_'+a.id;
        let duracionPred = 30 + (habilidadesDesbloqueadas["h7"] || 0) * 3; // Vision Futura aumenta duracion
        
        prediccionesActivas.push({
            id: predId,
            asesorId: a.id,
            tipo: tipo,
            target: empresaTarget,
            sector: sectorEmp,
            tiempoRestante: duracionPred,
            duracion: duracionPred,
            resultado: 'pendiente',
            preAvisoEnviado: false
        });
        toast(`🔮 ${a.nombre} predice ${tipo} en ${empresaTarget} (${sectorEmp})`, "info");
        renderPredicciones();
    });
}

function actualizarPrediccionesTimer() {
    prediccionesActivas.forEach(p => {
        if (p.resultado !== 'pendiente') return;
        p.tiempoRestante -= 1;
        if (p.tiempoRestante <= 20 && !p.preAvisoEnviado) {
            let a = ASESORES_DEF.find(x => x.id === p.asesorId);
            toast(`⏳ ${a?.nombre || 'Tu asesor'}: la prediccion de ${p.tipo} en ${p.target} se cumple en 20s.`, "info");
            p.preAvisoEnviado = true;
        }
        if (p.tiempoRestante <= 0) {
            let a = ASESORES_DEF.find(x => x.id === p.asesorId), est = asesoresEstado[p.asesorId];
            let precision = getPrecision(p.asesorId, est.nivel), acierto = Math.random() * 100 < precision;
            let precioFinal = preciosMercado[p.target] || 0;
            if (acierto) {
                p.resultado = 'acierto';
                let boostVal = 1.15;
                preciosMercado[p.target] = (preciosMercado[p.target] || 0) * (p.tipo === 'subida' ? boostVal : (1/boostVal));
                toast(`✅ ${a.nombre} acerto! ${p.target} ${p.tipo==='subida'?'📈 +15%':'📉 -15%'}`, "success");
                est.exp += 10;
                if (est.exp >= est.nivel * 50) { 
                    est.exp = 0; 
                    if (est.nivel < a.maxNivel) { 
                        est.nivel++; 
                        toast(`⭐ ${a.nombre} subio a Nivel ${est.nivel} por experiencia!`, "success"); 
                    } 
                }
                subirXP(5);
                safeModificarReputacion(2 + (habilidadesDesbloqueadas["h10"] || 0) * 3, `Prediccion acertada de ${a.nombre}`);
                forzarProgresoMision('prediccion_ok');
                checkDesafio("prediccion_acierto", 1);
            } else {
                p.resultado = 'fallo';
                toast(`❌ ${a.nombre} fallo la prediccion sobre ${p.target}.`, "error");
                // No se reduce reputacion por predicciones fallidas; el jugador decide sus asesores.
            }
            // Guardar en historial
            prediccionesHistorial.unshift({
                asesorId: p.asesorId,
                asesorNombre: a.nombre,
                empresa: p.target,
                sector: p.sector,
                tipo: p.tipo,
                resultado: p.resultado,
                precioFinal: precioFinal,
                tiempo: new Date().toLocaleTimeString()
            });
            if (prediccionesHistorial.length > 50) prediccionesHistorial.pop();
            renderHistorialPredicciones();
            guardar();
        }
    });
    prediccionesActivas = prediccionesActivas.filter(p => p.resultado === 'pendiente' || p.tiempoRestante > -60);
    renderPredicciones();
}

function renderPredicciones() {
    const cont = document.getElementById("prediccionesActivas");
    if (!cont) return;
    cont.innerHTML = "";
    if (prediccionesActivas.length === 0) { 
        cont.innerHTML = '<div style="color:#666;text-align:center;padding:20px;">No hay predicciones activas.</div>'; 
        return; 
    }
    prediccionesActivas.forEach(p => {
        let a = ASESORES_DEF.find(x => x.id === p.asesorId), est = asesoresEstado[p.asesorId];
        let clase = p.resultado === 'acierto' ? 'prediccion-acierto' : p.resultado === 'fallo' ? 'prediccion-fallo' : '';
        let icon = p.resultado === 'acierto' ? '✅' : p.resultado === 'fallo' ? '❌' : '🔮';
        let status = p.resultado === 'pendiente' ? (p.tiempoRestante <= 20 ? `⏳ Se cumple en ${p.tiempoRestante}s` : `⏱️ ${p.tiempoRestante}s`) : p.resultado === 'acierto' ? '✅ ACIERTO' : '❌ FALLO';
        let div = document.createElement("div");
        div.className = "prediccion-card " + clase;
        div.innerHTML = `
            <div class="prediccion-icon">${icon}</div>
            <div class="prediccion-info">
                <div class="prediccion-title">${a.nombre} (Nv.${est.nivel}) • ${p.target}</div>
                <div class="prediccion-desc">Predice <b>${p.tipo.toUpperCase()}</b> en <b>${p.target}</b> <span style="color:#666">(${p.sector})</span></div>
                <div class="prediccion-timer">${status}</div>
            </div>`;
        cont.appendChild(div);
    });
}

function renderHistorialPredicciones() {
    const cont = document.getElementById("historialPredicciones");
    if (!cont) return;
    cont.innerHTML = "";
    if (prediccionesHistorial.length === 0) {
        cont.innerHTML = '<p style="color:#666;text-align:center;padding:20px;">Aun no hay predicciones registradas.</p>';
        return;
    }
    prediccionesHistorial.forEach(h => {
        let a = ASESORES_DEF.find(x => x.id === h.asesorId);
        let div = document.createElement("div");
        div.className = "hist-pred-item " + h.resultado;
        div.innerHTML = `
            <span style="font-size:1.3em">${h.resultado === 'acierto' ? '✅' : '❌'}</span>
            <div style="flex:1">
                <b>${a ? a.nombre : h.asesorNombre}</b> predijo <b>${h.tipo}</b> en <b>${h.empresa}</b> 
                <span style="color:#666">(${h.sector})</span><br>
                <small style="color:#555">${h.tiempo}</small>
            </div>
            <span style="color:${h.resultado==='acierto'?'var(--success)':'var(--danger)'};font-weight:700;font-size:0.85em;text-transform:uppercase">${h.resultado}</span>
        `;
        cont.appendChild(div);
    });
}


// ==========================================
// SISTEMA DE HABILIDADES - 30 CON 10 NIVELES
// ==========================================
let habilidadesDesbloqueadas = {};

function initHabilidades() {
    HABILIDADES_DEF.forEach(h => { 
        if (habilidadesDesbloqueadas[h.id] === undefined) habilidadesDesbloqueadas[h.id] = 0; 
    });
    renderHabilidades();
}

function getPHDisponibles() {
    let usados = 0;
    Object.keys(habilidadesDesbloqueadas).forEach(id => {
        let h = HABILIDADES_DEF.find(x => x.id === id);
        if (h) {
            // Costo total usado = suma de costos de cada nivel adquirido
            let nivelActual = habilidadesDesbloqueadas[id] || 0;
            for (let i = 1; i <= nivelActual; i++) {
                usados += getCostoNivel(h, i);
            }
        }
    });
    return Math.max(0, puntosHabilidadTotal - usados);
}

// Costo creciente por nivel
function getCostoNivel(habilidad, nivel) {
    // Aplicar descuento de Titanio
    let h15Level = habilidadesDesbloqueadas["h15"] || 0;
    let descuento = 1 - (h15Level * 0.10);
    let costoBase = habilidad.costoBase * Math.pow(1.8, nivel - 1);
    return Math.max(1, Math.round(costoBase * descuento));
}

function desbloquearHabilidad(id) {
    let h = HABILIDADES_DEF.find(x => x.id === id);
    let actual = habilidadesDesbloqueadas[id] || 0;
    if (actual >= h.max) return;
    let siguienteNivel = actual + 1;
    let costo = getCostoNivel(h, siguienteNivel);
    let disponibles = getPHDisponibles();
    if (disponibles < costo) return toast(`Puntos de Habilidad insuficientes (${disponibles}/${costo} PH)`, "error");
    habilidadesDesbloqueadas[id] = siguienteNivel;
    toast(`⚡ ${h.nombre} Nivel ${siguienteNivel}/${h.max} desbloqueado! (-${costo} PH)`, "success");
    checkDesafio("mejorar_habilidad", 1);
    renderHabilidades(); guardar();
}

function renderHabilidades() {
    const cont = document.getElementById("habilidadesArbol");
    if (!cont) return;
    cont.innerHTML = "";
    let disponibles = getPHDisponibles();
    document.getElementById("puntosHabilidad").innerText = disponibles;
    document.getElementById("phTotales").innerText = puntosHabilidadTotal;
    
    let activas = Object.values(habilidadesDesbloqueadas).filter(n => n > 0).length;
    let maxHabilidades = HABILIDADES_DEF.length;
    document.getElementById("habilidadesActivas").innerText = `${activas} / 30`;
    
    HABILIDADES_DEF.forEach(h => {
        let nivel = habilidadesDesbloqueadas[h.id] || 0;
        let maxed = nivel >= h.max;
        let siguienteNivel = nivel + 1;
        let costo = maxed ? 0 : getCostoNivel(h, siguienteNivel);
        let puede = !maxed && disponibles >= costo;
        
        let div = document.createElement("div");
        div.className = "habilidad-card" + (nivel > 0 ? " desbloqueada" : " bloqueada");
        
        // Mostrar costos de todos los niveles
        let costosHTML = "";
        for (let i = 1; i <= h.max; i++) {
            let cn = getCostoNivel(h, i);
            let adquirido = i <= nivel;
            costosHTML += `<span style="display:inline-block;width:20px;height:20px;border-radius:50%;text-align:center;line-height:20px;font-size:0.65em;margin-right:3px;background:${adquirido?'rgba(0,255,136,0.2)':'rgba(255,255,255,0.05)'};color:${adquirido?'var(--success)':'#555'};border:1px solid ${adquirido?'var(--success)':'rgba(255,255,255,0.1)'}">${i}</span>`;
        }
        
        div.innerHTML = `
            <div class="habilidad-nivel">${nivel}/${h.max}</div>
            <div class="habilidad-icon">${h.emoji}</div>
            <div style="font-weight:700;margin-bottom:4px;">${h.nombre}</div>
            <div style="font-size:0.8em;color:#888;margin-bottom:8px;">${h.desc}</div>
            <div style="margin-bottom:10px;">${costosHTML}</div>
            <div class="habilidad-stats">
                <div class="habilidad-stat">
                    <span style="color:#666">Prox. Costo</span>
                    <span style="color:#aa00ff;font-weight:700">${maxed?'—':costo+' PH'}</span>
                </div>
                <div class="habilidad-stat">
                    <span style="color:#666">Nivel Actual</span>
                    <span style="color:${nivel>0?'var(--success)':'#666'}">${nivel}/${h.max}</span>
                </div>
            </div>
            <button class="btn-desbloquear ${maxed?'btn-max':''}" onclick="desbloquearHabilidad('${h.id}')" ${!puede?'disabled':''}>
                ${maxed?'✅ Maximo':'Subir a Nivel '+(nivel+1)+' ('+costo+' PH)'}
            </button>
        `;
        cont.appendChild(div);
    });
}

// ==========================================
// SISTEMA DE REPUTACION CON MISIONES
// ==========================================
let reputacion = 50;
let eventosReputacion = [];
const RANGOS_REP = [
    { min: 0, max: 15, nombre: "🚫 Paria", descuento: 5, color: "#ff4444" },
    { min: 16, max: 30, nombre: "😬 Desconocido", descuento: 2, color: "#ff8800" },
    { min: 31, max: 50, nombre: "🆕 Novato", descuento: 0, color: "#ffd000" },
    { min: 51, max: 65, nombre: "🙂 Respetado", descuento: -2, color: "#88ff00" },
    { min: 66, max: 80, nombre: "😎 Reconocido", descuento: -5, color: "#00ff88" },
    { min: 81, max: 95, nombre: "⭐ Celebridad", descuento: -8, color: "#00d4ff" },
    { min: 96, max: 100, nombre: "👑 Leyenda", descuento: -12, color: "#aa00ff" }
];

function getRangoRep() { return RANGOS_REP.find(r => reputacion >= r.min && reputacion <= r.max) || RANGOS_REP[2]; }

function modificarReputacion(cantidad, razon) {
    // Filtrar cambios para que solo eventos permitidos afecten reputación
    const razonNorm = (razon || '').toString().toLowerCase();
    // Normalizar eliminando diacriticos para coincidencias (ej. 'Misión' -> 'mision')
    const razonClean = razonNorm.normalize ? razonNorm.normalize('NFD').replace(/[ -]/g, (c) => c).replace(/[ -]/g,'') : razonNorm;
    const razonSinDiacriticos = razonNorm.normalize ? razonNorm.normalize('NFD').replace(/[ -]/g, (c) => c).replace(/[ -]/g,'') : razonNorm;
    const permitidos = ['mision', 'venta exitosa', 'prediccion acertada', 'pagar', 'pago', 'prestamo', 'pagar deuda'];
    const permitido = permitidos.some(k => razonNorm.includes(k) || (razonNorm.normalize && razonNorm.normalize('NFD').replace(/[ -]/g,'').includes(k)));
    if (!permitido) return; // Ignorar cambios no permitidos por la nueva regla

    let mensajeTipo = cantidad > 0 ? "success" : cantidad < 0 ? "warning" : "info";
    let mensajeTexto = cantidad > 0 ? `⭐ +${cantidad} Reputacion: ${razon}` : cantidad < 0 ? `💢 ${cantidad} Reputacion: ${razon}` : `ℹ️ ${razon}`;

    reputacion = Math.max(0, Math.min(100, reputacion + cantidad));
    eventosReputacion.unshift({ razon: razon, cantidad: cantidad, tiempo: new Date().toLocaleTimeString(), positivo: cantidad > 0 });
    if (eventosReputacion.length > 15) eventosReputacion.pop();
    toast(mensajeTexto, mensajeTipo);
    renderReputacion(); guardar();
}

// Variante segura que aplica filtro de eventos permitidos y realiza el cambio.
function safeModificarReputacion(cantidad, razon) {
    const razonNorm = (razon || '').toString().toLowerCase();
    const razonSinDiacriticos = razonNorm.normalize ? razonNorm.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : razonNorm;
    const permitidos = ['mision', 'venta exitosa', 'prediccion acertada', 'pagar', 'pago', 'prestamo', 'pagar deuda'];
    const permitido = permitidos.some(k => razonNorm.includes(k) || razonSinDiacriticos.includes(k));
    if (!permitido) return;

    let mensajeTipo = cantidad > 0 ? 'success' : cantidad < 0 ? 'warning' : 'info';
    let mensajeTexto = cantidad > 0 ? `⭐ +${cantidad} Reputacion: ${razon}` : cantidad < 0 ? `💢 ${cantidad} Reputacion: ${razon}` : `ℹ️ ${razon}`;

    reputacion = Math.max(0, Math.min(100, reputacion + cantidad));
    eventosReputacion.unshift({ razon: razon, cantidad: cantidad, tiempo: new Date().toLocaleTimeString(), positivo: cantidad > 0 });
    if (eventosReputacion.length > 15) eventosReputacion.pop();
    toast(mensajeTexto, mensajeTipo);
    renderReputacion(); guardar();
}

function renderReputacion() {
    let rango = getRangoRep();
    const activas = misionesReputacion.filter(m => m.estado === 'activa');
    if (activas.length > 0) checkAlertasMisionesReputacion();
    document.getElementById("reputacionValor").innerText = `${reputacion} / 100`;
    let elRango = document.getElementById("reputacionRango");
    if (elRango) { elRango.innerText = rango.nombre; elRango.style.color = rango.color; }
    let elDesc = document.getElementById("reputacionDescuento");
    if (elDesc) { elDesc.innerText = (rango.descuento < 0 ? "" : "+") + rango.descuento + "%"; elDesc.style.color = rango.descuento < 0 ? 'var(--success)' : rango.descuento > 0 ? 'var(--danger)' : '#888'; }
    let elBar = document.getElementById("reputacionBar");
    if (elBar) elBar.style.width = reputacion + "%";
    let misionesCont = document.getElementById("reputacionMisiones");
    let misionesActivasEl = document.getElementById("misionesActivas");
    if (misionesActivasEl) misionesActivasEl.innerText = activas.length;
    if (misionesCont) {
        misionesCont.innerHTML = "";
        if (activas.length === 0) {
            misionesCont.innerHTML = '<div style="color:#666;text-align:center;padding:15px;">No hay misiones activas. Se generarán nuevas pronto.</div>';
        } else {
            activas.forEach(m => {
                let pct = Math.max(0, (m.tiempoRestante / m.duracion) * 100);
                let div = document.createElement("div");
                div.className = "mision-card activa";
                div.innerHTML = `
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px; gap: 12px; flex-wrap: wrap;">
                        <b style="color:var(--primary);font-size:0.95em">${m.titulo}</b>
                        <span style="font-size:0.8em;color:#888;">⏱️ ${Math.ceil(m.tiempoRestante)}s restantes</span>
                    </div>
                    <div style="font-size:0.85em;color:#aaa;margin-bottom:10px">${m.desc}</div>
                    <div style="display:flex;gap:10px;align-items:center;font-size:0.75em;flex-wrap:wrap;">
                        <span style="color:var(--success)">+${m.exito} rep</span>
                        <span style="color:var(--danger)">-${Math.abs(m.exito || 3)} rep si fallas</span>
                    </div>
                    <div class="mision-timer-bar" style="width:${pct}%"></div>
                `;
                misionesCont.appendChild(div);
            });
        }
    }
    const cont = document.getElementById("reputacionEventos");
    if (!cont) return;
    cont.innerHTML = "";
    if (eventosReputacion.length === 0) { cont.innerHTML = '<div style="color:#666;text-align:center;padding:10px;">Sin eventos recientes.</div>'; return; }
    eventosReputacion.forEach(ev => {
        let cls = ev.cantidad > 0 ? "positivo" : ev.cantidad < 0 ? "negativo" : "neutral";
        let div = document.createElement("div");
        div.className = "reputacion-evento " + cls;
        div.innerHTML = `
            <span class="reputacion-evento-icon">${ev.cantidad > 0 ? '🌟' : ev.cantidad < 0 ? '💢' : '🛡️'}</span>
            <span class="reputacion-evento-text">${ev.razon} <small style="color:#555">(${ev.tiempo})</small></span>
            <span class="reputacion-evento-pts" style="color:${ev.cantidad > 0 ? 'var(--success)' : ev.cantidad < 0 ? 'var(--danger)' : '#aaa'}">${ev.cantidad > 0 ? '+' : ''}${ev.cantidad}</span>
        `;
        cont.appendChild(div);
    });
}

function toggleReputacionInfo() {
    // La caja de información fue eliminada; esta función queda vacía para evitar errores por llamadas antiguas.
}

function checkAlertasMisionesReputacion(force = false) {
    const activas = misionesReputacion.filter(m => m.estado === 'activa');
    if (activas.length === 0) {
        alertaMisionesMostrada = false;
        return;
    }
    const ahora = Date.now();
    const debeAlertar = force || !alertaMisionesMostrada || (ahora - ultimoAvisoMisiones > 120000);
    if (!debeAlertar) return;
    toast(`⚠️ Tienes ${activas.length} misión${activas.length > 1 ? 'es' : ''} de reputación pendiente${activas.length > 1 ? 's' : ''}. Revisa la sección de Reputación.`, "warning");
    ultimoAvisoMisiones = ahora;
    alertaMisionesMostrada = true;
}

function spawnMisionReputacion() {
    if (misionesReputacion.length >= 3) return; // Max 3 misiones activas
    let pool = POOL_MISIONES_REP.filter(m => !misionesReputacion.some(activa => activa.id === m.id));
    if (pool.length === 0) pool = POOL_MISIONES_REP;
    let misionBase = pool[Math.floor(Math.random() * pool.length)];
    let mision = crearInstanciaMision(misionBase);
    misionesReputacion.push(mision);
    toast(`⏱️ Nueva mision de reputacion: ${mision.titulo}`, "info");
    ultimoSpawnMisionReputacion = Date.now();
    renderReputacion();
    checkAlertasMisionesReputacion(true);
}

function actualizarMisionesReputacion() {
    if (!usuarioActual) return;
    misionesReputacion.forEach(m => {
        if (m.estado !== 'activa') return;
        m.tiempoRestante -= 5;
        // Verificar progreso segun tipo
        checkProgresoMision(m);
        if (m.tiempoRestante <= 0) {
                if (m.progreso >= 1) {
                m.estado = 'completada';
                toast(`✅ Misión completada: ${m.titulo}`, "success");
                safeModificarReputacion(m.exito, `Misión completada: ${m.titulo}`);
                checkDesafio("mision_rep", 1);
            } else {
                m.estado = 'fallida';
                // Al fallar, la penalizacion ahora es exactamente la simetrica de la recompensa de exito
                const falloAmount = -Math.abs(m.exito || 3);
                toast(`⚠️ Misión fallida: ${m.titulo}`, "warning");
                safeModificarReputacion(falloAmount, `Misión fallida: ${m.titulo}`);
                eventosReputacion.unshift({ razon: `Misión fallida: ${m.titulo}`, cantidad: falloAmount, tiempo: new Date().toLocaleTimeString(), positivo: falloAmount > 0 });
                if (eventosReputacion.length > 15) eventosReputacion.pop();
            }
        }
    });
    misionesReputacion = misionesReputacion.filter(m => m.estado === 'activa' || m.tiempoRestante > -30);
    if (misionesReputacion.filter(m => m.estado === 'activa').length === 0) {
        alertaMisionesMostrada = false;
    }
    // actualizar contador visual
    try { const el = document.getElementById('siguienteMisionCountdown'); if (el) el.innerText = (function(){ const s=Math.ceil(getMsParaProximaMision()/1000); return Math.floor(s/60).toString().padStart(2,'0')+":"+(s%60).toString().padStart(2,'0'); })(); } catch(e) {}
}

function checkProgresoMision(m) {
    switch(m.tipo) {
        case 'vender_ganancia':
            // Se marca completa cuando se vende con ganancia (se activa desde confirmarVenta)
            break;
        case 'comprar_baja':
            break; // Se marca desde comprarAccion
        case 'pagar_deuda':
            break; // Se marca desde pagarTarjetaBanco
        case 'cero_deuda':
            if (deuda <= 0) m.progreso = 1;
            break;
        case 'mantener_capital':
            let pat = getPatrimonioNeto();
            if (capital > pat * 0.5) m.progreso = Math.min(1, m.progreso + (5 / m.duracion));
            break;
        case 'prediccion_ok':
            break; // Se marca desde actualizarPrediccionesTimer
        case 'sector_seguro':
            break; // Se marca desde comprarAccion
    }
}

function avanzarProgresoMision(tipo, cantidad = 1) {
    misionesReputacion.forEach(m => {
        if (m.estado !== 'activa') return;
        if (m.tipo !== tipo) return;
        m.progreso = Math.min(1, m.progreso + cantidad);
    });
}

function forzarProgresoMision(tipo) {
    avanzarProgresoMision(tipo, 1);
}

setInterval(() => {
    if (!usuarioActual) return;
    actualizarMisionesReputacion();
    checkAlertasMisionesReputacion();
    const ahora = Date.now();
    if (ahora - ultimoSpawnMisionReputacion >= INTERVALO_SPAWN_MISION_REPUTACION) {
        spawnMisionReputacion();
        ultimoSpawnMisionReputacion = ahora;
    }
    // Reputación solo cambia por acciones directas del jugador, no por desgaste oculto.
}, 5000);

// Spawn mision inicial
try { setTimeout(() => { if (usuarioActual) { spawnMisionReputacion(); ultimoSpawnMisionReputacion = Date.now(); } }, 15000); } catch(e){}
// Iniciar contador visual al cargar
try { startCountdownSiguienteMision(); } catch(e) {}

// Ya no hay eventos de reputación aleatorios. La reputación cambia únicamente por acciones directas del jugador.


// ==========================================
// SISTEMA DE DESAFIOS DIARIOS - 12 A LA VEZ
// ==========================================
function initDesafios() {
    // Verificar si necesitamos nuevos desafios (primera vez o paso 24h)
    let ahora = Date.now();
    let necesitaNuevos = false;
    
    if (!desafiosDiarios || desafiosDiarios.length === 0) {
        necesitaNuevos = true;
    } else if (ultimaActualizacionDesafios) {
        let horasPasadas = (ahora - ultimaActualizacionDesafios) / (1000 * 60 * 60);
        if (horasPasadas >= 24) necesitaNuevos = true;
    }
    
    // Tambien regenerar si todos estan completados
    let todosCompletados = desafiosDiarios.length > 0 && desafiosDiarios.every(d => d.completado);
    if (todosCompletados) necesitaNuevos = true;
    
    if (necesitaNuevos) {
        generarNuevosDesafios();
    }
    
    renderDesafios();
    // Timer para actualizar cada minuto
    setInterval(() => {
        if (!usuarioActual) return;
        actualizarTimerDesafios();
        // Verificar cada hora si deben regenerarse
        if (ultimaActualizacionDesafios) {
            let horasPasadas = (Date.now() - ultimaActualizacionDesafios) / (1000 * 60 * 60);
            if (horasPasadas >= 24) generarNuevosDesafios();
        }
    }, 60000);
}

function generarNuevosDesafios() {
    // Seleccionar 10 desafios aleatorios del pool
    let pool = [...POOL_DESAFIOS].sort(() => Math.random() - 0.5);
    let seleccionados = pool.slice(0, 12);
    
    desafiosDiarios = seleccionados.map((d, idx) => ({
        ...d,
        uid: 'des_' + Date.now() + '_' + idx,
        completado: false,
        progresoActual: 0,
        recompensaXP: d.recompensaXP || 100,
        recompensaPH: d.recompensaPH || 1,
        recompensaRep: d.recompensaRep || 3
    }));
    
    desafiosCompletadosHoy = 0;
    ultimaActualizacionDesafios = Date.now();
    toast("🎯 ¡Nuevos desafios diarios disponibles! Completa los 12 para ganar recompensas.", "success");
    guardar();
}

function checkDesafio(tipo, valor) {
    if (!desafiosDiarios || desafiosDiarios.length === 0) return;
    let huboCambio = false;
    
    desafiosDiarios.forEach(d => {
        if (d.completado) return;
        if (d.tipo !== tipo) return;
        
        let completadoAhora = false;
        
        switch(tipo) {
            case 'comprar':
            case 'vender':
            case 'contratar':
            case 'mejorar_habilidad':
            case 'prediccion_acierto':
            case 'mision_rep':
            case 'dividendos':
            case 'libre_deuda':
            case 'prestamo_pagado':
                d.progresoActual = Math.min(d.target, d.progresoActual + 1);
                completadoAhora = d.progresoActual >= d.target;
                break;
            case 'comprar_monto':
                d.progresoActual = Math.max(d.progresoActual, Math.min(valor, d.target));
                completadoAhora = valor >= d.target;
                break;
            case 'ganancia_venta':
                d.progresoActual = Math.max(d.progresoActual, Math.min(valor, d.target));
                completadoAhora = valor >= d.target;
                break;
            case 'diversificar':
                d.progresoActual = Math.max(d.progresoActual, Math.min(valor, d.target));
                completadoAhora = valor >= d.target;
                break;
            case 'capital':
                d.progresoActual = Math.max(d.progresoActual, Math.min(valor, d.target));
                completadoAhora = valor >= d.target;
                break;
            case 'pagar_deuda':
                d.progresoActual = Math.min(d.target, d.progresoActual + valor);
                completadoAhora = d.progresoActual >= d.target;
                break;
            case 'subir_nivel':
                d.progresoActual = Math.max(d.progresoActual, Math.min(valor, d.target));
                completadoAhora = valor >= d.target;
                break;
            case 'sector':
                d.progresoActual = d.progresoActual || 1;
                if (valor === d.target) completadoAhora = true;
                break;
            case 'sectores_dif':
                d.progresoActual = Math.max(d.progresoActual, Math.min(valor, d.target));
                completadoAhora = valor >= d.target;
                break;
            case 'rendimiento':
                d.progresoActual = Math.max(d.progresoActual, Math.min(valor, d.target));
                completadoAhora = valor >= d.target;
                break;
            case 'patrimonio':
                d.progresoActual = Math.max(d.progresoActual, Math.min(valor, d.target));
                completadoAhora = valor >= d.target;
                break;
            case 'operaciones':
                d.progresoActual = Math.min(d.target, d.progresoActual + valor);
                completadoAhora = d.progresoActual >= d.target;
                break;
        }
        
        if (completadoAhora && !d.completado) {
            d.completado = true;
            desafiosCompletadosHoy++;
            huboCambio = true;
            
            // Aplicar recompensas con bonus de Filantropo
            let bonusPH = (habilidadesDesbloqueadas["h13"] || 0) * 0.05;
            let phGanados = Math.round(d.recompensaPH * (1 + bonusPH));
            
            subirXP(d.recompensaXP);
            puntosHabilidadTotal += phGanados;
            // Solo ciertos desafios relacionados con pago de deuda o prestamos impactan reputacion
            if (['pagar_deuda','prestamo_pagado','libre_deuda'].includes(d.tipo)) {
                safeModificarReputacion(d.recompensaRep, `Pagar deuda: ${d.titulo}`);
            }

            toast(`🎯 ¡Desafio completado: ${d.titulo}! +${d.recompensaXP} XP, +${phGanados} PH${['pagar_deuda','prestamo_pagado','libre_deuda'].includes(d.tipo)? (', +' + d.recompensaRep + ' Rep') : ''}`, "success");
        }
    });
    
    if (huboCambio) {
        renderDesafios();
        guardar();
    }
}

function renderDesafios() {
    const cont = document.getElementById("desafiosLista");
    const completadosEl = document.getElementById("desafiosCompletados");
    const totalesEl = document.getElementById("desafiosTotales");
    const progressBar = document.getElementById("desafiosProgressBar");
    const timerEl = document.getElementById("desafioTimer");
    
    if (!cont) return;
    
    let completados = desafiosDiarios.filter(d => d.completado).length;
    if (completadosEl) completadosEl.innerText = completados;
    if (totalesEl) totalesEl.innerText = desafiosDiarios.length;
    if (progressBar) progressBar.style.width = (completados / 12 * 100) + "%";
    
    // Timer
    if (timerEl && ultimaActualizacionDesafios) {
        let proxima = ultimaActualizacionDesafios + (24 * 60 * 60 * 1000);
        let restante = Math.max(0, proxima - Date.now());
        let horas = Math.floor(restante / (1000 * 60 * 60));
        let mins = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
        let segs = Math.floor((restante % (1000 * 60)) / 1000);
        timerEl.innerText = `⏱️ Proxima actualizacion: ${horas.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${segs.toString().padStart(2,'0')}`;
    }
    
    cont.innerHTML = "";
    if (desafiosDiarios.length === 0) {
        cont.innerHTML = '<div style="color:#666;text-align:center;padding:30px;">Cargando desafios...</div>';
        return;
    }
    
    desafiosDiarios.forEach(d => {
        let div = document.createElement("div");
        div.className = "desafio-card" + (d.completado ? " completado" : "");
        div.onclick = () => {
            if (!d.completado) {
                toast(`🎯 ${d.titulo}: ${d.desc}`, "info");
            }
        };
        
        let progresoPct = d.target > 0 ? Math.min(100, (d.progresoActual / d.target) * 100) : 0;
        let progresoTexto = d.target === 1 ? (d.progresoActual > 0 ? "En progreso" : "Pendiente") : `${Math.min(d.progresoActual, d.target)}/${d.target}`;
        
        div.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <b style="font-size:0.95em;${d.completado?'color:var(--success)':'color:var(--primary)'}">${d.titulo}</b>
                ${d.completado ? '✅' : `<span style="font-size:0.75em;color:#888">${progresoTexto}</span>`}
            </div>
            <div style="font-size:0.85em;color:#aaa;margin-bottom:10px">${d.desc}</div>
            <div class="desafio-progress">
                <div class="desafio-progress-fill" style="width:${d.completado?'100':progresoPct}%"></div>
            </div>
            <div class="desafio-recompensa">
                ${d.completado ? 'RECOMPENSA COBRADA' : `🏆 +${d.recompensaXP} XP  |  ⚡ +${d.recompensaPH} PH  |  ⭐ +${d.recompensaRep} Rep`}
            </div>
        `;
        cont.appendChild(div);
    });
}

function actualizarTimerDesafios() {
    renderDesafios(); // Actualiza el timer
}

// ==========================================
// INIT FINAL
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    if (eventosReputacion.length === 0) {
        eventosReputacion.push({ razon: "Bienvenido al mercado financiero", cantidad: 0, tiempo: new Date().toLocaleTimeString(), positivo: true });
    }
    // Inicializar arrays si no existen
    if (!prediccionesHistorial) prediccionesHistorial = [];
    if (!misionesReputacion) misionesReputacion = [];
    if (!desafiosDiarios) desafiosDiarios = [];
    
    initAsesores();
    initHabilidades();
    initChartPortafolio();
    renderReputacion();
    initDesafios();
    cargarActualizaciones();
});

// ==========================================
// SECCION ACERCA DE
// ==========================================
async function cargarActualizaciones() {
    const container = document.getElementById('actualizacionesContenido');
    if (!container) return;

    try {
        if (window.location.protocol === 'file:') {
            container.innerHTML = '<div class="about-content"><div class="about-heading">Actualizaciones recientes</div><p class="about-paragraph">Las actualizaciones completas se cargan al ejecutar el proyecto mediante un servidor local.</p></div>';
            return;
        }
        const response = await fetch('docs/actualizaciones', { cache: 'no-store' });
        if (!response.ok) throw new Error('No se pudo leer el archivo');

        const text = await response.text();
        const lines = (text || '').split(/\r?\n/);

        if (!lines.some(line => line.trim())) {
            container.innerHTML = '<p style="color:#888;">Sin actualizaciones por el momento.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        const content = document.createElement('div');
        content.className = 'about-content';

        let currentList = null;

        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) {
                if (currentList) {
                    content.appendChild(currentList);
                    currentList = null;
                }
                return;
            }

            if (/^#{1,3}\s+/.test(trimmed)) {
                if (currentList) {
                    content.appendChild(currentList);
                    currentList = null;
                }
                const title = document.createElement('div');
                title.className = 'about-heading';
                title.textContent = trimmed.replace(/^#{1,3}\s+/, '');
                content.appendChild(title);
                return;
            }

            if (/^[•-]\s+/.test(trimmed)) {
                if (!currentList) {
                    currentList = document.createElement('ul');
                    currentList.className = 'about-list';
                }
                const item = document.createElement('li');
                item.textContent = trimmed.replace(/^[•-]\s+/, '');
                currentList.appendChild(item);
                return;
            }

            if (currentList) {
                content.appendChild(currentList);
                currentList = null;
            }

            const paragraph = document.createElement('p');
            paragraph.className = 'about-paragraph';
            paragraph.textContent = trimmed;
            content.appendChild(paragraph);
        });

        if (currentList) {
            content.appendChild(currentList);
        }

        container.innerHTML = '';
        container.appendChild(content);
    } catch (error) {
        console.warn('No se pudieron cargar las actualizaciones:', error);
        container.innerHTML = '<p style="color:#888;">No se pudieron cargar las actualizaciones. Se mostrará la vista básica.</p>';
    }
}

function initQR() {
    const img = document.querySelector('#qr .about-qr');
    if (img && !img.dataset.ready) {
        img.src = 'assets/qr/qr.png';
        img.dataset.ready = 'true';
    }
}

