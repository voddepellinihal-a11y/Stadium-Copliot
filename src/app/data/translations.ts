import { Lang } from '../components/shared/AppContext';

type TranslationKeys = {
  // Header
  stadiumCopilot: string;
  fifaWorldCup: string;
  selectCity: string;
  selectLanguage: string;
  enableHighContrast: string;
  disableHighContrast: string;
  currentMode: string;

  // Bottom Nav
  fan: string;
  volunteer: string;
  ops: string;
  analytics: string;
  sustainability: string;
  accessibility: string;

  // Chat
  welcomeMessage: string;
  typeYourQuestion: string;
  askAboutStadium: string;
  sendMessage: string;
  sendHint: string;
  charactersLeft: string;
  typing: string;
  chatMessages: string;
  quickActions: string;
  youSaid: string;
  assistantSaid: string;
  tooManyMessages: string;
  errorOccurred: string;
  sorryError: string;

  // Quick Actions
  qaRestroom: string;
  qaGateA: string;
  qaMatchTime: string;
  qaFood: string;
  qaWheelchair: string;
  qaParking: string;

  // Volunteer
  volunteerHub: string;
  quickResponseHub: string;
  availableScripts: string;
  scriptContent: string;
  volunteerDesc: string;
  officialResponse: string;
  askVolunteer: string;
  gatesRestrooms: string;
  safetyProcedures: string;
  lostPerson: string;
  wheelchairAccess: string;

  // Ops
  opsDashboard: string;
  avgDensity: string;
  hotspots: string;
  totalFans: string;
  updated: string;
  live: string;
  liveHeatmap: string;
  reportIncident: string;
  activeAlerts: string;
  gateCCongestion: string;
  parkingAAt85: string;
  opsDesc: string;
  capacity: string;
  alerts: string;
  activeIncidents: string;
  todaysSchedule: string;

  // Analytics
  analyticsDashboard: string;
  overview: string;
  topQueries: string;
  topQuestions: string;
  performance: string;
  languages: string;
  totalQueries: string;
  resolutionRate: string;
  avgResponse: string;
  emergencies: string;
  mostCommonQuestions: string;
  languageDistribution: string;
  systemPerformance: string;
  p95Response: string;
  aiAccuracy: string;
  uptime: string;
  realtimeInsights: string;
  insightsText: string;
  analyticsDesc: string;
  responseTime: string;
  satisfactionRate: string;
  languagesServed: string;
  activeUsers: string;
  whereIsNearestGate: string;
  wheelchairAccessibility: string;
  bagPolicyAllowed: string;
  publicTransportRoutes: string;
  nearestRestroom: string;
  menuAndDietary: string;
  asked: string;
  satisfaction: string;
  responses: string;
  navigation: string;
  crowdManagement: string;
  transportation: string;
  aiResponseTime: string;
  ragAccuracy: string;
  fallbackRate: string;
  securityCompliance: string;

  // Sustainability
  sustainabilityTracker: string;
  score: string;
  greenChampion: string;
  ecoFriendly: string;
  gettingStarted: string;
  beginner: string;
  trackGreenActions: string;
  usedTransit: string;
  walkedOrBiked: string;
  usedRefillable: string;
  usedRecycling: string;
  usedDigitalTicket: string;
  sustainabilityDesc: string;
  actionsCompleted: string;
  ecoActions: string;
  stadiumFeatures: string;
  waterRecycling: string;
  solarPower: string;
  composting: string;

  // Accessibility
  accessibilityCompanion: string;
  inclusiveForAll: string;
  stepFreeRoutes: string;
  highContrast: string;
  textSize: string;
  voiceOutput: string;
  toggleHighContrast: string;
  adjustTextSize: string;
  enableTTS: string;
  active: string;
  enable: string;
  needHumanAssistance: string;
  emergencyAssistance: string;
  helpOnWay: string;
  volunteerNotified: string;
  accessibilityDesc: string;
  displaySettings: string;
  fontSize: string;
  hearingAid: string;
  sensoryKits: string;
  accessibleSeating: string;
  emergencyEscalation: string;
  alertSent: string;
  medical: string;
  security: string;

  // Error
  somethingWrong: string;
  refreshPage: string;
  errorDetails: string;

  // Skip
  skipToContent: string;

  // Cities
  metlifeStadium: string;
  sofiStadium: string;
  aztecaStadium: string;
  bcPlaceStadium: string;
  arrowheadStadium: string;
  attStadium: string;
  hardRockStadium: string;
  lincolnStadium: string;
  nrgStadium: string;
  lumenStadium: string;
  mercedesBenzStadium: string;
  gilletteStadium: string;
  cottonBowlStadium: string;
};

export const translations: Record<Lang, TranslationKeys> = {
  en: {
    // Header
    stadiumCopilot: 'Stadium Copilot',
    fifaWorldCup: 'FIFA World Cup 2026',
    selectCity: 'Select city',
    selectLanguage: 'Select language',
    enableHighContrast: 'Enable high contrast',
    disableHighContrast: 'Disable high contrast',
    currentMode: 'Current mode',

    // Bottom Nav
    fan: 'Fan',
    volunteer: 'Volunteer',
    ops: 'Ops',
    analytics: 'Analytics',
    sustainability: 'Green',
    accessibility: 'Access',

    // Chat
    welcomeMessage: "👋 Welcome to Stadium Copilot! I'm your AI assistant for the FIFA World Cup 2026. How can I help you today?",
    typeYourQuestion: 'Type your question...',
    askAboutStadium: 'Ask me anything about the stadium...',
    sendMessage: 'Send message',
    sendHint: 'Type and press Enter',
    charactersLeft: 'characters left',
    typing: 'Typing...',
    chatMessages: 'Chat messages',
    quickActions: 'Quick actions',
    youSaid: 'You said',
    assistantSaid: 'Assistant said',
    tooManyMessages: 'Too many messages. Please wait a moment before sending again.',
    errorOccurred: 'An error occurred',
    sorryError: "Sorry, I'm having trouble processing your request. Please try again.",

    // Quick Actions
    qaRestroom: 'Where is the nearest restroom?',
    qaGateA: 'How do I get to Gate A?',
    qaMatchTime: 'What time does the match start?',
    qaFood: 'Where can I find food?',
    qaWheelchair: 'Is there wheelchair access?',
    qaParking: 'Where is the parking?',

    // Volunteer
    volunteerHub: 'Volunteer Hub',
    quickResponseHub: 'Quick-Response Hub',
    availableScripts: 'Available scripts',
    scriptContent: 'Script content',
    volunteerDesc: 'Volunteer quick response hub with scripted answers',
    officialResponse: 'Use official responses only. Always verify information before sharing with fans.',
    askVolunteer: 'Ask a volunteer question...',
    gatesRestrooms: 'Gates & Restrooms',
    safetyProcedures: 'Safety Procedures',
    lostPerson: 'Lost Person',
    wheelchairAccess: 'Wheelchair Access',

    // Ops
    opsDashboard: 'Operations Dashboard',
    avgDensity: 'Avg Density',
    hotspots: 'Hotspots',
    totalFans: 'Total Fans',
    updated: 'Updated',
    live: 'Live',
    liveHeatmap: 'Live Stadium Heatmap',
    reportIncident: 'Report Incident',
    activeAlerts: 'Active Alerts',
    gateCCongestion: 'Gate C congestion',
    parkingAAt85: 'Parking A at 85%',
    opsDesc: 'Real-time crowd monitoring and incident management',
    capacity: 'Capacity',
    alerts: 'Alerts',
    activeIncidents: 'Active Incidents',
    todaysSchedule: "Today's Schedule",

    // Analytics
    analyticsDashboard: 'Analytics Dashboard',
    overview: 'Overview',
    topQueries: 'Top Queries',
    topQuestions: 'Top Questions',
    performance: 'Performance',
    languages: 'Languages',
    totalQueries: 'Total Queries',
    resolutionRate: 'Resolution Rate',
    avgResponse: 'Avg Response',
    emergencies: 'Emergencies',
    mostCommonQuestions: 'Most Common Questions',
    languageDistribution: 'Language Distribution',
    systemPerformance: 'System Performance',
    p95Response: 'P95 Response',
    aiAccuracy: 'AI Accuracy',
    uptime: 'Uptime',
    realtimeInsights: 'Real-Time Insights',
    insightsText: 'Stadium Copilot has handled over 6,800 fan queries with 87% resolution rate. Average response time: 1.2 seconds.',
    analyticsDesc: 'Performance metrics and operational insights',
    responseTime: 'Response Time',
    satisfactionRate: 'Satisfaction Rate',
    languagesServed: 'Languages Served',
    activeUsers: 'Active Users',
    whereIsNearestGate: 'Where is the nearest gate?',
    wheelchairAccessibility: 'Wheelchair accessibility options',
    bagPolicyAllowed: 'What bags are allowed?',
    publicTransportRoutes: 'Public transport routes',
    nearestRestroom: 'Nearest restroom location',
    menuAndDietary: 'Menu and dietary options',
    asked: 'asked',
    satisfaction: 'satisfaction',
    responses: 'responses',
    navigation: 'Navigation',
    crowdManagement: 'Crowd Management',
    transportation: 'Transportation',
    aiResponseTime: 'AI Response Time',
    ragAccuracy: 'RAG Accuracy',
    fallbackRate: 'Fallback Rate',
    securityCompliance: 'Security Compliance',

    // Sustainability
    sustainabilityTracker: 'Sustainability Tracker',
    score: 'Score',
    greenChampion: 'Green Champion',
    ecoFriendly: 'Eco-Friendly',
    gettingStarted: 'Getting Started',
    beginner: 'Beginner',
    trackGreenActions: 'Track Your Green Actions',
    usedTransit: 'Used public transit',
    walkedOrBiked: 'Walked or biked',
    usedRefillable: 'Used refillable bottle',
    usedRecycling: 'Used recycling bins',
    usedDigitalTicket: 'Used digital ticket',
    sustainabilityDesc: 'Track your eco-friendly actions at the stadium',
    actionsCompleted: 'actions completed',
    ecoActions: 'Eco Actions',
    stadiumFeatures: 'Stadium Features',
    waterRecycling: 'Water Recycling',
    solarPower: 'Solar Power',
    composting: 'Composting Programs',

    // Accessibility
    accessibilityCompanion: 'Accessibility Companion',
    inclusiveForAll: 'Inclusive for everyone!',
    stepFreeRoutes: 'Step-Free Routes',
    highContrast: 'High Contrast',
    textSize: 'Text Size',
    voiceOutput: 'Voice Output',
    toggleHighContrast: 'Toggle high contrast colors',
    adjustTextSize: 'Adjust text size',
    enableTTS: 'Enable text-to-speech',
    active: 'Active',
    enable: 'Enable',
    needHumanAssistance: 'Need Human Assistance?',
    emergencyAssistance: 'Emergency Assistance',
    helpOnWay: 'Help is on the way!',
    volunteerNotified: 'A volunteer has been notified of your location.',
    accessibilityDesc: 'Accessibility companion for all visitors',
    displaySettings: 'Display Settings',
    fontSize: 'Font Size',
    hearingAid: 'Hearing Aid',
    sensoryKits: 'Sensory Kits',
    accessibleSeating: 'Accessible Seating',
    emergencyEscalation: 'Emergency Escalation',
    alertSent: 'Alert Sent!',
    medical: 'Medical',
    security: 'Security',

    // Error
    somethingWrong: 'Something went wrong',
    refreshPage: 'Refresh Page',
    errorDetails: 'Error details',

    // Skip
    skipToContent: 'Skip to main content',

    // Cities
    metlifeStadium: 'MetLife Stadium',
    sofiStadium: 'SoFi Stadium',
    aztecaStadium: 'Estadio Azteca',
    bcPlaceStadium: 'BC Place',
    arrowheadStadium: 'Arrowhead Stadium',
    attStadium: 'AT&T Stadium',
    hardRockStadium: 'Hard Rock Stadium',
    lincolnStadium: 'Lincoln Financial',
    nrgStadium: 'NRG Stadium',
    lumenStadium: 'Lumen Field',
    mercedesBenzStadium: 'Mercedes-Benz',
    gilletteStadium: 'Gillette Stadium',
    cottonBowlStadium: 'Cotton Bowl',
  },

  es: {
    // Header
    stadiumCopilot: 'Copiloto del Estadio',
    fifaWorldCup: 'Copa Mundial FIFA 2026',
    selectCity: 'Seleccionar ciudad',
    selectLanguage: 'Seleccionar idioma',
    enableHighContrast: 'Activar alto contraste',
    disableHighContrast: 'Desactivar alto contraste',
    currentMode: 'Modo actual',

    // Bottom Nav
    fan: 'Fan',
    volunteer: 'Voluntario',
    ops: 'Operaciones',
    analytics: 'Analítica',
    sustainability: 'Verde',
    accessibility: 'Acceso',

    // Chat
    welcomeMessage: "👋 ¡Bienvenido al Copiloto del Estadio! Soy tu asistente de IA para la Copa Mundial FIFA 2026. ¿Cómo puedo ayudarte hoy?",
    typeYourQuestion: 'Escribe tu pregunta...',
    askAboutStadium: 'Pregúntame sobre el estadio...',
    sendMessage: 'Enviar mensaje',
    sendHint: 'Escribe y presiona Enter',
    charactersLeft: 'caracteres restantes',
    typing: 'Escribiendo...',
    chatMessages: 'Mensajes del chat',
    quickActions: 'Acciones rápidas',
    youSaid: 'Tú dijiste',
    assistantSaid: 'El asistente dijo',
    tooManyMessages: 'Demasiados mensajes. Por favor, espera un momento antes de enviar de nuevo.',
    errorOccurred: 'Ocurrió un error',
    sorryError: 'Lo siento, tuve un problema. Por favor, intenta de nuevo.',

    // Quick Actions
    qaRestroom: '¿Dónde está el baño más cercano?',
    qaGateA: '¿Cómo llego a la Puerta A?',
    qaMatchTime: '¿A qué hora empieza el partido?',
    qaFood: '¿Dónde puedo encontrar comida?',
    qaWheelchair: '¿Hay acceso para silla de ruedas?',
    qaParking: '¿Dónde está el estacionamiento?',

    // Volunteer
    volunteerHub: 'Centro de Voluntarios',
    quickResponseHub: 'Centro de Respuesta Rápida',
    availableScripts: 'Guiones disponibles',
    scriptContent: 'Contenido del guion',
    volunteerDesc: 'Centro de respuesta rápida para voluntarios con guiones',
    officialResponse: 'Use solo respuestas oficiales. Siempre verifique la información antes de compartir con los fanáticos.',
    askVolunteer: 'Haga una pregunta al voluntario...',
    gatesRestrooms: 'Puertos y Baños',
    safetyProcedures: 'Procedimientos de Seguridad',
    lostPerson: 'Persona Perdida',
    wheelchairAccess: 'Acceso para Silla de Ruedas',

    // Ops
    opsDashboard: 'Panel de Operaciones',
    avgDensity: 'Densidad Prom.',
    hotspots: 'Puntos Críticos',
    totalFans: 'Total Fans',
    updated: 'Actualizado',
    live: 'En Vivo',
    liveHeatmap: 'Mapa de Calor del Estadio',
    reportIncident: 'Reportar Incidente',
    activeAlerts: 'Alertas Activas',
    gateCCongestion: 'Congestión Puerta C',
    parkingAAt85: 'Estacionamiento A al 85%',
    opsDesc: 'Monitoreo de multitudes en tiempo real y gestión de incidentes',
    capacity: 'Capacidad',
    alerts: 'Alertas',
    activeIncidents: 'Incidentes Activos',
    todaysSchedule: 'Horario de Hoy',

    // Analytics
    analyticsDashboard: 'Panel de Analítica',
    overview: 'Resumen',
    topQueries: 'Consultas',
    topQuestions: 'Preguntas Principales',
    performance: 'Rendimiento',
    languages: 'Idiomas',
    totalQueries: 'Total Consultas',
    resolutionRate: 'Tasa Resolución',
    avgResponse: 'Resp. Promedio',
    emergencies: 'Emergencias',
    mostCommonQuestions: 'Preguntas Comunes',
    languageDistribution: 'Distribución de Idiomas',
    systemPerformance: 'Rendimiento del Sistema',
    p95Response: 'Resp. P95',
    aiAccuracy: 'Precisión IA',
    uptime: 'Tiempo Activo',
    realtimeInsights: 'Información en Tiempo Real',
    insightsText: 'Stadium Copilot ha manejado más de 6,800 consultas con 87% de resolución. Tiempo de respuesta promedio: 1.2 segundos.',
    analyticsDesc: 'Métricas de rendimiento e información operativa',
    responseTime: 'Tiempo de Respuesta',
    satisfactionRate: 'Tasa de Satisfacción',
    languagesServed: 'Idiomas Atendidos',
    activeUsers: 'Usuarios Activos',
    whereIsNearestGate: '¿Dónde está la puerta más cercana?',
    wheelchairAccessibility: 'Opciones de accesibilidad para silla de ruedas',
    bagPolicyAllowed: '¿Qué bolsas están permitidas?',
    publicTransportRoutes: 'Rutas de transporte público',
    nearestRestroom: 'Ubicación del baño más cercano',
    menuAndDietary: 'Menú y opciones dietéticas',
    asked: 'preguntado',
    satisfaction: 'satisfacción',
    responses: 'respuestas',
    navigation: 'Navegación',
    crowdManagement: 'Gestión de Multitudes',
    transportation: 'Transporte',
    aiResponseTime: 'Tiempo de Respuesta IA',
    ragAccuracy: 'Precisión RAG',
    fallbackRate: 'Tasa de Respaldo',
    securityCompliance: 'Cumplimiento de Seguridad',

    // Sustainability
    sustainabilityTracker: 'Rastreador de Sostenibilidad',
    score: 'Puntuación',
    greenChampion: 'Campeón Verde',
    ecoFriendly: 'Eco-Amigable',
    gettingStarted: 'Comenzando',
    beginner: 'Principiante',
    trackGreenActions: 'Registra tus Acciones Verdes',
    usedTransit: 'Usé transporte público',
    walkedOrBiked: 'Caminé o bicicleta',
    usedRefillable: 'Usé botella recargable',
    usedRecycling: 'Usé contenedores de reciclaje',
    usedDigitalTicket: 'Usé boleto digital',
    sustainabilityDesc: 'Registra tus acciones ecológicas en el estadio',
    actionsCompleted: 'acciones completadas',
    ecoActions: 'Acciones Ecológicas',
    stadiumFeatures: 'Características del Estadio',
    waterRecycling: 'Reciclaje de Agua',
    solarPower: 'Energía Solar',
    composting: 'Programas de Compostaje',

    // Accessibility
    accessibilityCompanion: 'Compañero de Accesibilidad',
    inclusiveForAll: '¡Inclusivo para todos!',
    stepFreeRoutes: 'Rutas Sin Escaleras',
    highContrast: 'Alto Contraste',
    textSize: 'Tamaño de Texto',
    voiceOutput: 'Salida de Voz',
    toggleHighContrast: 'Cambiar colores de alto contraste',
    adjustTextSize: 'Ajustar tamaño del texto',
    enableTTS: 'Activar texto a voz',
    active: 'Activo',
    enable: 'Activar',
    needHumanAssistance: '¿Necesita Ayuda Humana?',
    emergencyAssistance: 'Asistencia de Emergencia',
    helpOnWay: '¡Ayuda en camino!',
    volunteerNotified: 'Un voluntario ha sido notificado de tu ubicación.',
    accessibilityDesc: 'Compañero de accesibilidad para todos los visitantes',
    displaySettings: 'Configuración de Pantalla',
    fontSize: 'Tamaño de Fuente',
    hearingAid: 'Auxiliar Auditivo',
    sensoryKits: 'Kit Sensorial',
    accessibleSeating: 'Asientos Accesibles',
    emergencyEscalation: 'Escalamiento de Emergencia',
    alertSent: '¡Alerta Enviada!',
    medical: 'Médico',
    security: 'Seguridad',

    // Error
    somethingWrong: 'Algo salió mal',
    refreshPage: 'Actualizar Página',
    errorDetails: 'Detalles del error',

    // Skip
    skipToContent: 'Saltar al contenido principal',

    // Cities
    metlifeStadium: 'Estadio MetLife',
    sofiStadium: 'Estadio SoFi',
    aztecaStadium: 'Estadio Azteca',
    bcPlaceStadium: 'Estadio BC Place',
    arrowheadStadium: 'Estadio Arrowhead',
    attStadium: 'Estadio AT&T',
    hardRockStadium: 'Estadio Hard Rock',
    lincolnStadium: 'Lincoln Financial',
    nrgStadium: 'Estadio NRG',
    lumenStadium: 'Lumen Field',
    mercedesBenzStadium: 'Mercedes-Benz',
    gilletteStadium: 'Estadio Gillette',
    cottonBowlStadium: 'Cotton Bowl',
  },

  fr: {
    // Header
    stadiumCopilot: 'Copilote du Stade',
    fifaWorldCup: 'Coupe du Monde FIFA 2026',
    selectCity: 'Sélectionner la ville',
    selectLanguage: 'Sélectionner la langue',
    enableHighContrast: 'Activer le contraste élevé',
    disableHighContrast: 'Désactiver le contraste élevé',
    currentMode: 'Mode actuel',

    // Bottom Nav
    fan: 'Fan',
    volunteer: 'Bénévole',
    ops: 'Ops',
    analytics: 'Analytique',
    sustainability: 'Vert',
    accessibility: 'Accès',

    // Chat
    welcomeMessage: "👋 Bienvenue sur Copilote du Stade ! Je suis votre assistant IA pour la Coupe du Monde FIFA 2026. Comment puis-je vous aider aujourd'hui ?",
    typeYourQuestion: 'Tapez votre question...',
    askAboutStadium: 'Demandez-moi sur le stade...',
    sendMessage: 'Envoyer le message',
    sendHint: 'Tapez et appuyez sur Entrée',
    charactersLeft: 'caractères restants',
    typing: 'En train d\'écrire...',
    chatMessages: 'Messages du chat',
    quickActions: 'Actions rapides',
    youSaid: 'Vous avez dit',
    assistantSaid: 'L\'assistant a dit',
    tooManyMessages: 'Trop de messages. Veuillez patienter avant d\'envoyer à nouveau.',
    errorOccurred: 'Une erreur s\'est produite',
    sorryError: "Désolé, j'ai eu un problème. Veuillez réessayer.",

    // Quick Actions
    qaRestroom: 'Où sont les toilettes les plus proches ?',
    qaGateA: 'Comment aller à la Porte A ?',
    qaMatchTime: 'À quelle heure commence le match ?',
    qaFood: 'Où puis-je trouver à manger ?',
    qaWheelchair: 'Y a-t-il un accès fauteuil roulant ?',
    qaParking: 'Où est le parking ?',

    // Volunteer
    volunteerHub: 'Centre de Bénévoles',
    quickResponseHub: 'Centre de Réponse Rapide',
    availableScripts: 'Scripts disponibles',
    scriptContent: 'Contenu du script',
    volunteerDesc: 'Centre de réponse rapide pour bénévoles avec scripts',
    officialResponse: 'Utilisez uniquement les réponses officielles. Vérifiez toujours les informations avant de les partager avec les fans.',
    askVolunteer: 'Posez une question à un bénévole...',
    gatesRestrooms: 'Portes et Toilettes',
    safetyProcedures: 'Procédures de Sécurité',
    lostPerson: 'Personne Perdue',
    wheelchairAccess: 'Accès Fauteuil Roulant',

    // Ops
    opsDashboard: 'Tableau de Bord Opérations',
    avgDensity: 'Densité Moy.',
    hotspots: 'Points Chauds',
    totalFans: 'Total Fans',
    updated: 'Mis à Jour',
    live: 'En Direct',
    liveHeatmap: 'Carte de Chaleur du Stade',
    reportIncident: 'Signaler un Incident',
    activeAlerts: 'Alertes Actives',
    gateCCongestion: 'Congestion Porte C',
    parkingAAt85: 'Parking A à 85%',
    opsDesc: 'Surveillance des foules en temps réel et gestion des incidents',
    capacity: 'Capacité',
    alerts: 'Alertes',
    activeIncidents: 'Incidents Actifs',
    todaysSchedule: "Emploi du Jour",

    // Analytics
    analyticsDashboard: 'Tableau Analytique',
    overview: 'Aperçu',
    topQueries: 'Requêtes',
    topQuestions: 'Questions Principales',
    performance: 'Performance',
    languages: 'Langues',
    totalQueries: 'Total Requêtes',
    resolutionRate: 'Taux Résolution',
    avgResponse: 'Réponse Moy.',
    emergencies: 'Urgences',
    mostCommonQuestions: 'Questions Fréquentes',
    languageDistribution: 'Répartition Linguistique',
    systemPerformance: 'Performance Système',
    p95Response: 'Réponse P95',
    aiAccuracy: 'Précision IA',
    uptime: 'Temps Actif',
    realtimeInsights: 'Informations en Temps Réel',
    insightsText: "Stadium Copilot a traité plus de 6 800 requêtes avec un taux de résolution de 87 %. Temps de réponse moyen : 1,2 seconde.",
    analyticsDesc: 'Métriques de performance et informations opérationnelles',
    responseTime: 'Temps de Réponse',
    satisfactionRate: 'Taux de Satisfaction',
    languagesServed: 'Langues Servies',
    activeUsers: 'Utilisateurs Actifs',
    whereIsNearestGate: 'Où est la porte la plus proche ?',
    wheelchairAccessibility: "Options d'accessibilité pour fauteuil roulant",
    bagPolicyAllowed: 'Quels sacs sont autorisés ?',
    publicTransportRoutes: 'Itinéraires de transport en commun',
    nearestRestroom: 'Emplacement des toilettes les plus proches',
    menuAndDietary: 'Menu et options diététiques',
    asked: 'demandé',
    satisfaction: 'satisfaction',
    responses: 'réponses',
    navigation: 'Navigation',
    crowdManagement: 'Gestion des Foules',
    transportation: 'Transport',
    aiResponseTime: 'Temps de Réponse IA',
    ragAccuracy: 'Précision RAG',
    fallbackRate: 'Taux de Repli',
    securityCompliance: 'Conformité Sécuritaire',

    // Sustainability
    sustainabilityTracker: 'Suivi Durabilité',
    score: 'Score',
    greenChampion: 'Champion Vert',
    ecoFriendly: 'Éco-Compatible',
    gettingStarted: 'Pour Commencer',
    beginner: 'Débutant',
    trackGreenActions: 'Suivez Vos Actions Vertes',
    usedTransit: 'Transport en commun',
    walkedOrBiked: 'Marché ou à vélo',
    usedRefillable: 'Gourde réutilisable',
    usedRecycling: 'Bacs de recyclage',
    usedDigitalTicket: 'Billet numérique',
    sustainabilityDesc: 'Suivez vos actions écologiques au stade',
    actionsCompleted: 'actions terminées',
    ecoActions: 'Actions Écologiques',
    stadiumFeatures: 'Équipements du Stade',
    waterRecycling: 'Recyclage de l\'Eau',
    solarPower: 'Énergie Solaire',
    composting: 'Programmes de Compostage',

    // Accessibility
    accessibilityCompanion: "Compagnon d'Accessibilité",
    inclusiveForAll: 'Inclusif pour tous !',
    stepFreeRoutes: 'Itinéraires Sans Marches',
    highContrast: 'Haut Contraste',
    textSize: 'Taille du Texte',
    voiceOutput: 'Sortie Vocale',
    toggleHighContrast: 'Basculer les couleurs à contraste élevé',
    adjustTextSize: 'Ajuster la taille du texte',
    enableTTS: 'Activer la synthèse vocale',
    active: 'Actif',
    enable: 'Activer',
    needHumanAssistance: 'Besoin d\'Aide Humaine ?',
    emergencyAssistance: 'Assistance d\'Urgence',
    helpOnWay: 'L\'aide arrive !',
    volunteerNotified: 'Un bénévole a été averti de votre position.',
    accessibilityDesc: 'Compagnon d\'accessibilité pour tous les visiteurs',
    displaySettings: 'Paramètres d\'Affichage',
    fontSize: 'Taille de Police',
    hearingAid: 'Aide Auditive',
    sensoryKits: 'Kit Sensoriel',
    accessibleSeating: 'Places Accessibles',
    emergencyEscalation: 'Escalade d\'Urgence',
    alertSent: 'Alerte Envoyée !',
    medical: 'Médical',
    security: 'Sécurité',

    // Error
    somethingWrong: 'Une erreur s\'est produite',
    refreshPage: 'Actualiser la Page',
    errorDetails: 'Détails de l\'erreur',

    // Skip
    skipToContent: 'Aller au contenu principal',

    // Cities
    metlifeStadium: 'Stade MetLife',
    sofiStadium: 'Stade SoFi',
    aztecaStadium: 'Estadio Azteca',
    bcPlaceStadium: 'Stade BC Place',
    arrowheadStadium: 'Stade Arrowhead',
    attStadium: 'Stade AT&T',
    hardRockStadium: 'Stade Hard Rock',
    lincolnStadium: 'Lincoln Financial',
    nrgStadium: 'Stade NRG',
    lumenStadium: 'Lumen Field',
    mercedesBenzStadium: 'Mercedes-Benz',
    gilletteStadium: 'Stade Gillette',
    cottonBowlStadium: 'Cotton Bowl',
  },
};

export function t(lang: Lang, key: keyof TranslationKeys): string {
  return translations[lang][key] || translations.en[key] || key;
}

export type CityKnowledge = Record<string, {
  name: string;
  country: string;
  location: string;
  languages: string[];
  capacity: number;
  gates: Record<string, Record<string, string>>;
  restrooms: Record<string, string>[];
  food: Record<string, string>[];
  services: Record<string, Record<string, string>>;
  transport: Record<string, Record<string, string>>;
  accessibility: {
    wheelchair_routes: Record<string, string>;
    assistance: Record<string, string>;
    sensory_rooms?: Record<string, string>;
    total_seats?: number;
    step_free_routes?: string[];
  };
  schedule: Record<string, string> | string;
  bag_policy: Record<string, string>;
  sustainability?: {
    features: string[];
    green_score?: number;
  };
}>;
