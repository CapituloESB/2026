/* =====================================================================
   PROGRAMA DEL XV CONGRESO ESB — archivo de datos
   Para cambiar horarios, ponentes, salas o logos, edita SOLO este archivo.
   Guía rápida en README.md
   ===================================================================== */

/* Días del congreso (la pestaña "Ahora" usa la hora real estos días) */
const CONGRESS_DATES = { jueves:"2026-10-29", viernes:"2026-10-30" };

/* ---------- LOGOS ----------
   Guarda cada logo en la carpeta logos/ con el nombre de "archivo".
   Vale .svg o .png. Si el archivo no existe, se ve una caja con el nombre. */
const LOGOS = {
  cabecera: "logos/congreso.svg",
  organizan: [
    { nombre:"BIOMEC · UPC", archivo:"logos/biomec.svg" },
    { nombre:"Departament d'Enginyeria Mecànica", archivo:"logos/dem-upc.svg" },
    { nombre:"ETSEIB 175 anys", archivo:"logos/etseib-175.svg" },
    { nombre:"UPC · BarcelonaTech", archivo:"logos/upc.svg" },
    { nombre:"European Society of Biomechanics", archivo:"logos/esb.svg" }
  ],
  colaboran: [
    { nombre:"LabORA", archivo:"logos/labora.svg" },
    { nombre:"IRIS · UPC", archivo:"logos/iris.svg" },
    { nombre:"Able Human Motion", archivo:"logos/able.svg" }
  ]
};

/* ---------- ABSTRACTS ----------
   Sube cada PDF a la carpeta abstracts/ con el ID de la ponencia como nombre,
   por ejemplo abstracts/141014.pdf. El botón "Abstract (PDF)" aparece solo. */
const ABSTRACTS_CARPETA = "abstracts/";

/* ---------- PLANOS ----------
   Cada plano es una imagen de la carpeta planos/.
   Si cambias la imagen, ajusta las posiciones de las salas (en % de la imagen):
   x = distancia desde la izquierda, y = desde arriba, w = ancho, h = alto.  */
const PLANOS = {
  baja:  { nombre:"Planta baja", imagen:"planos/planta-baja.png", escalera:[61.0,23.0,3.2,11.1] },
  menos1:{ nombre:"Planta −1",   imagen:"planos/planta-1.png",    escalera:[3.3,5.2,4.1,15.6] }
};

/* ---------- SALAS ---------- */
const ROOMS = {
  registro:{ plano:"baja",   name:"Registro",          pos:[43.6,71.8,7.2,8.0],   hint:"Planta baja. Al entrar, a la derecha, junto a la Sala d'Actes." },
  capella: { plano:"baja",   name:"Aula Capella",      pos:[78.4,69.3,15.4,12.5], hint:"Planta baja. Al fondo, pasada la Sala d'Actes." },
  actes:   { plano:"baja",   name:"Sala d'Actes",      pos:[47.6,69.3,30.6,12.5], hint:"Planta baja, junto al Registro." },
  hall:    { plano:"baja",   name:"Hall · Entrada",    pos:[28.4,80.5,12.8,7.0],  hint:"Planta baja, entrada principal del edificio." },
  enginy:  { plano:"baja",   name:"Plaça de l'Enginy", pos:[32.6,39.2,30.8,25.3], hint:"Planta baja, en el centro del edificio. Aquí se sirve el almuerzo de clausura del viernes." },
  cafe:    { plano:"baja",   name:"Pausa café · Coffee break", pos:[62.8,82.1,30.6,5.2], hint:"Planta baja, en el pasillo delante del Aula Capella y la Sala d'Actes." },
  engilab: { plano:"baja",   name:"EngiLab",           pos:[8.0,20.9,17.6,14.3], hint:"Planta baja, ala izquierda." },
  ls2:     { plano:"menos1", name:"Aula LS2",          pos:[42.2,41.7,10.9,18.1], hint:"Planta −1. Baja por la escalera junto a la Plaça de l'Enginy." },
  ls15:    { plano:"menos1", name:"Aula LS15",         pos:[81.7,39.2,16.6,11.1], hint:"Planta −1. Baja por la escalera junto a la Plaça de l'Enginy; al fondo a la derecha." },
  ls16:    { plano:"menos1", name:"Aula LS16",         pos:[81.7,50.3,16.6,10.4], hint:"Planta −1. Baja por la escalera junto a la Plaça de l'Enginy; al fondo a la derecha." }
};
/* Salas que salen como botones encima del plano */
const ROOMS_LEGEND = ["registro","actes","capella","ls2","ls15","ls16","cafe","enginy","hall"];

/* Color de cada sala en las sesiones paralelas */
const ROOM_COLOR = { capella:"#0A6B6E", ls2:"#13A39C", ls15:"#3473B8", ls16:"#B8507A" };

/* ---------- LUGARES FUERA DEL EDIFICIO (abren Google Maps) ---------- */
const EXT = {
  polo:  { name:"Real Club de Polo de Barcelona", addr:"Av. del Doctor Marañón, 19-31, Barcelona" },
  etseib:{ name:"ETSEIB · Escuela Técnica Superior de Ingeniería Industrial de Barcelona", addr:"Av. Diagonal, 647, Barcelona" },
  pedralbes:{ name:"Puerta principal de los Jardines del Palau Reial de Pedralbes", addr:"A la altura del metro Palau Reial (L3) · Punto de encuentro de la visita turística", url:"https://maps.app.goo.gl/dVQsbEdvh6GiA4uY7" }
};

/* ---------- PROGRAMA ----------
   I("id", "inicio", "fin", tipo, "Título", { opciones })
     tipo: "general" | "plenary" | "break" | "parallel" | "session"
     opciones: room:"capella" (sala del plano), ext:"polo" (Google Maps),
               meta:"texto pequeño", block:"título de bloque", open:true (sin hora de fin)
   T("CÓDIGO", "Nombre de la sesión", "sala", "Moderador", `ponencias`)
     Cada ponencia en una línea:  ID | Título | Autores ; separados ; por ; punto y coma
   ----------------------------------------------------------------- */
const parse = s => s.trim().split("\n").map(l => l.split("|").map(x => x.trim()));
const T = (code,name,room,chair,talks) => ({code,name,room,chair,talks:parse(talks)});
const I = (id,start,end,kind,title,o={}) => Object.assign({id,start,end,kind,title},o);

const PROGRAM = {
 jueves:{ label:"Jueves 29", date:"29 de octubre de 2026", items:[
  I("j0","09:30","10:00","general","Recepción de los participantes",{block:"Experiencias prácticas · Mañana · Demostraciones y visitas a laboratorios",room:"hall",meta:"Punto de encuentro: Hall de entrada de la ETSEIB"}),
  I("j1","10:00","11:15","general","LABORA y Able Human Motion",{room:"hall",meta:"Presentación del laboratorio LABORA y demostración práctica del exoesqueleto de Able Human Motion. Punto de encuentro: Hall de entrada de la ETSEIB; desde allí os guiaremos."}),
  I("j2","11:30","12:00","general","IRIS y Xartec Salut",{room:"hall",meta:"Presentación del IRIS-UPC y de la red Xartec Salut. Punto de encuentro: Hall de entrada de la ETSEIB; desde allí os guiaremos."}),
  I("j3","12:00","13:00","general","Visita a los laboratorios BIOMEC, BIOART e IOC",{room:"hall",meta:"Visitas rotativas en tres grupos. Punto de encuentro: Hall de entrada de la ETSEIB; desde allí os guiaremos."}),
  I("j4","14:00","15:00","general","Registro de participantes",{block:"Inauguración del congreso · Tarde · Apertura, conferencia plenaria y sesiones paralelas",room:"registro"}),
  I("j5","14:30","15:00","session","Ceremonia de apertura",{tracks:[T("APER","Intervienen","actes","",`
|Núria Montserrat Pulido|Honorable Consejera de Investigación y Universidades de la Generalitat de Catalunya
|Jordi Romeu Garbi|Vicerrector de Política de Personal Docente e Investigador (UPC)
|Amaia Lusa Garcia|Directora de la Escuela Técnica Superior de Ingeniería Industrial de Barcelona (ETSEIB-UPC)
|Laia Ferrer Martí|Directora del Departamento de Ingeniería Mecánica de la UPC
|Josep M. Font Llagunes|Director del Instituto de Investigación e Innovación en Salud (IRIS-UPC)
|Rosa Pàmies Vilà|Presidenta del Comité Organizador del XV Congreso Nacional del Capítulo Español de la Sociedad Europea de Biomecánica`)]}),
  I("j6","15:00","15:55","session","Conferencia plenaria · Laura Marchal-Crespo",{tracks:[T("PLEN","Diseñando experiencias sensorialmente enriquecidas, relevantes y usables para el aprendizaje motor y la neurorrehabilitación","actes","Associate Professor, Delft University of Technology",
   `|Diseñando experiencias sensorialmente enriquecidas, relevantes y usables para el aprendizaje motor y la neurorrehabilitación|Laura Marchal-Crespo|Profesora en el Departamento de Robótica Cognitiva de la TU Delft y vinculada al ARTORG Center de la Universidad de Berna. Su investigación se centra en interfaces humano-máquina y aprendizaje motor, con robótica y realidad virtual para la rehabilitación de personas con lesiones neurológicas.`)]}),
  I("j7","16:00","17:15","parallel","Sesiones científicas paralelas I",{tracks:[
   T("TEJ1","Remodelado, caracterización y mecanobiología de tejidos","capella","Moderador: Alejandro Yánez Santana",`
139694|Diseño de una herramienta computacional basada en un modelo probabilístico de remodelación ósea|Rocío Ruiz-Lozano; José Luis Calvo-Gallego; Vincent Sansalone; Peter Pivonka; Javier Martínez-Reina
139983|Image-Based Tissue Characterization of an Ex Ovo Pressure Model for Chronic Wounds|Dalila Eva García-García; Mª Ángeles Pérez; Elena García-Gareta
139604|Predicting microvascular barrier integrity using a 3D parametric model of the endothelial monolayer and the extracellular matrix|O. Paseta; J.M. García-Aznar; M.J. Gómez-Benito
140009|A Systems Chronomechanobiology Model of the Intervertebral Disc|Zerihun G. Workineh; Jérôme Noailly
141001|Terapias basadas en mecánica contra el cáncer óseo: caracterización mediante microtomografía computacional|Carmen Avalos-Municio; Juan Mora-Macías; Pablo Blázquez-Carmona; Juan Morgaz; Rocío Navarrete-Calvo; Esther Reina-Romo`),
   T("FLU1","Modelado cardiovascular específico del paciente y aplicaciones endovasculares","ls2","Moderador: Mauro Malvè",`
139953|Patient-Specific Finite Element Analysis of Stent Deployment for Sinus Venosus Atrial Septal Defects|Nerea Romate Alonso; Begoña Garate Andikoetxea; Muhammad Chatoo; Claudio Capelli
141142|Validation of a Multiscale In Silico Framework for Coronary Atherosclerosis Progression in a Porcine Model|Ricardo Caballero; Miguel Ángel Martínez; Ali C. Akyildiz; Estefanía Peña
139978|PCA-Based Shape Analysis of Abdominal Aortic Aneurysm Progression|Gaia Caruso; Valentina Quartieri; Antti Siika; Joy Roy; Christian Gasser; Miguel Ángel Martínez; Estefanía Peña
139986|A Finite Element Julia computational framework involving beams, solid and shell elements for endovascular modelling Applications|Miquel Aguirre; Albert Argilaga; Beatrice Bisighini; Nitesh Nama; Josep M. Carbonell
139990|Advancing Abdominal Aortic Aneurysm Risk Assessment Through Aneurysm Morphological Characterization|Maria Lavinia Alfarano; Eduardo Soudah; Miquel Aguirre`),
   T("CLIN1","Evaluación clínica, diagnóstico y seguimiento biomecánico","ls15","Moderador: Mikel Díez Sánchez",`
140010|Mechano-metabolism finite-element predictions in lumbar disc degeneration and low back pain stratification|Estefano Muñoz-Moya; Terence McSweeney; Jaro Karppinen; Carlos Ruiz Wills; Mark van Gils; Gemma Piella; Jérôme Noailly
140948|Rheological Biomarkers from Broadband Torsional Wave Elastography for Tumour Diagnosis|G. Rus; A. Callejas; A. Gómez; M. Hurtado; H. Shamimi; I. H. Faris; J. M. Cortés; D. Martínez; Y. Almashakbeh; R. Ruiz-Villaverde; A. Martín; J. L. Martín; S. Arias; V. Arbol; M. I. Núñez; O. Roda; F. Vílchez; E. Jiménez; L. Díaz; A. Ruiz; I. Dillion
141103|Improved Hip Fracture Prediction Using 3D-DXA–Based Finite Element Models in the JPOS Cohort|E. Alizadeh; J. Tamaki; T. Tachiki; Y. Sato; M. Hamada; K. Tsuda; A. Kudo; K. Kamiya; N. Imai; A. Nitta; K. Ohara; N. Takashima; J. Kitagawa; K. Kouda; A. Morita; K. Uenishi; E. Kajita; S. Kagamimori; L. Humbert; J. Noailly; M. Iki
141139|Longitudinal IMU-based Biomechanical Analysis of the Effects of Robotic Gait Rehabilitation Therapy after Stroke|Irene Bono-Gutiérrez; Camila A. Castellanos Guarnizo; Agnese Cherubini; Natacha León; Jesús Tornero; Juan C. Moreno; Clara B. Sanz-Morère
141169|Parámetros de equilibrio durante la rehabilitación tras un ictus en ensayo longitudinal: estudio de caso|Paula Klose; Francisco Javier Campa; Ruben Valenzuela; Mikel Díez; Javier Corral`),
   T("EMER1","Tecnologías emergentes, inteligencia artificial y personalización en biomecánica","ls16","Moderador: Josep Maria Font Llagunes",`
139928|Caracterización biomecánica multimodal de la carrera como entrada para el diseño personalizado de entresuelas de metamateriales|Marco Martín Ludeiro; Sergio Fuentes del Toro; Josué Aranda Ruiz; Sergio Lurueña González
139945|Resolución de problemas directos e inversos en hiperelasticidad mediante PINNs basadas en energía|Patricia Rodrigo-Barrio; María Ferrón-Vivó; José Manuel Navarro-Jiménez; Santiago Gregori; Enrique Nadal; María José Rupérez
139972|Machine Learning and Regulatory Network Modeling Reveal Immune Drivers of Axillary Lymph Node Metastasis in Breast Cancer|Alba Fischer-Carles; Tábata Sánchez-Alcántara; Yalemzerf M. Alemu; Noèlia Gallardo-Borràs; Esther Sauras-Colón; Alessio Fiorin; Marylène Lejeune; Ramon Bosch Príncep; Laia Adalid-Llansa; Daniel Mata Cano; Carlos López; Gemma Piella; Jérôme Noailly
139984|Preliminary validation of portable 3D-force instrumented insoles for cycling power output estimation: a proof-of-concept case study|Yoel Alonso-Cadierno; Juan S. Salgado Manrique; Clara Sanz-Morère; Juan C. Moreno
141125|Implementation and Evaluation of AI-Assisted, Digitally Designed and 3D-Printed Transtibial Prosthetic Sockets in The Gambia|Daniela van-Wieringen-Massanet; Momodou Jallow; Iris Sterkenburg; Merel Van-der-Stelt; Matt Thomson; Christopher Vandy; Lucy Gates
141150|Base de datos CLAMP para el análisis de la postura de la mano durante el proceso de agarre|M. C. Mora; N. H. S. Al-Owaidi; B. Pellicer-Coves; J. V. García-Ortiz; J. Cerdá-Boluda`)
  ]}),
  I("j8","17:15","17:45","break","Pausa café",{room:"cafe"}),
  I("j9","17:45","19:15","parallel","Sesiones científicas paralelas II",{tracks:[
   T("COMP1","Caracterización experimental y propiedades biomecánicas de tejidos","capella","Moderadora: María José Rupérez Moreno",`
139096|Caracterización estadística de las propiedades mecánicas del tejido pericárdico mediante ensayos de tracción uniaxial|Irea López-García; Sofía Suárez; José Ángel López-Campos; Abraham Segade
140002|State-Dependent Macrophage Transitions in Osteoarthritis (OA) Synovitis: A Regulatory Network Model (RNM)|Yalemzerf M. Alemu; Zerihun Workineh; Laura Tio; Jordi Monfort; Jérôme Noailly
140974|Caracterización mecánica de tejidos fibrados mediante machine learning|Elías Núñez-Ortega; Pablo Blázquez-Carmona; Marta Montón-Padilla; José A. Sanz-Herrera; Esther Reina-Romo
141035|Estudio numérico de la post-fluencia en hueso trabecular considerando propiedades ortótropas y heterogéneas a nivel de tejido|Andrea Fresquet-Monter; Ricardo Belda; Ana Vercher-Martínez; Raquel Megías; Eugenio Giner
140983|Desarrollo de un modelo computacional fluido-estructura para simular ventilación mecánica pediátrica|María Ferrón-Vivó; Alicia Baza-del-Amo; Antonio Martínez-Millana; Ana M. Pedrosa; Fernando Paziencia; Vicent Modesto-i-Alapont; María José Rupérez`),
   T("MOV1","Tecnologías y metodologías para el análisis del movimiento","ls2","Moderador: Joaquín Ojeda Granja",`
139964|Development of an accessible gait analysis method based on Xsens sensors for incomplete spinal cord injury patients|Diana Quintana; Henri de Jonghe; Míriam Febrer-Nafría
139857|OpenCap vs Tracker: Comparación de sistemas de captura de movimiento portátiles con y sin marcadores|Ignacio Navarro-Ortiz; Chusé Mata-Pesquer; María José Rupérez
141014|Towards a portable multimodal laboratory for gait and physiological assessment in neurological gait disorders|Aroa Ballesteros-Sopena; Josep M. Font-Llagunes; Rosa Pàmies-Vilà
139968|Preliminary Evaluation of IMU-Based Gait Event Detection Algorithms for Rehabilitation-Oriented Gait Assessment|Angela Apicella; Josep M. Font-Llagunes; Rosa Pàmies-Vilà
140017|Estudio preliminar de la usabilidad de OpenCap® en el análisis de la marcha humana con dispositivos de asistencia|Valeriano Sánchez-Jimenez; Alejandro Peña-Trabalon; Salvador Moreno-Vegas; M. Belen Estebanez Campos; Fernando Nadal-Martinez; Ana Perez-Blanca; Maria Prado-Novoa`),
   T("CLIN2","Rehabilitación robótica, exoesqueletos y asistencia al movimiento","ls15","Moderador: Antonio Rodríguez Fernández",`
139856|Robotic Technologies for the Objective Assessment of Spasticity: A Systematic Review|Laia Yébenes-Serra; Josep M. Font-Llagunes; Massimo Cenciarini
139904|SPAST-SENSE: A Human-Centered Wearable Robotic Exoskeleton for Objective Assessment of Post-Stroke Spasticity|Massimo Cenciarini; Laia Yébenes-Serra; Josep M. Font-Llagunes
139826|Real-world use of a personal wearable exoskeleton in individuals with spinal cord injury|Maria Artigas Trayter; Clara Roig Rabadá; Erika Porra-Martínez; C. Beatriz Samitier Pastor; Antonio Rodríguez-Fernández
141109|Investigar la usabilidad y carga cognitiva de terapias virtuales rehabilitadoras y exoesqueletos de mano|Carlos Gonell-Cruz; Vicente Bayarri-Porcar; Alba Roda-Sales; Ana de los Reyes Guzmán; Margarita Vergara
139894|Beyond clinical scales: Guiding treatment planning and assistive device selection after spinal cord injury using the SCI-GDI-like score|Oscar Cheng Barrantes; Henri de Jonghe d'Ardoye; Diana Quintana Bistriceanu; Roger Rifà; Carles Rocamora; Narda Murillo; Míriam Febrer-Nafría
141086|Evaluación biomecánica de un sistema bilateral de compensación gravitatoria de los miembros superiores con OpenCap|Mar Solà; Rosa Pàmies-Vilà; Albert Fabregat-Sanjuan`),
   T("MAT1","Diseño, fabricación y caracterización mecánica de biomateriales e implantes","ls16","Moderador: Miguel Marco Esteban",`
139957|Improving Fatigue Performance of Porous Orthopaedic Implants Through Manufacturing Optimisation|D. Giannetto; S. Ghouse; A. López-Barberena; S. Martin; A. Veiga; N. Rodriguez-Florez; S. Ruiz de Galarreta
140154|Rational design and modeling of auxetic fiber skin scaffolds for chronic wounds treatment via melt electrowriting|Oscar Lecina-Tejero; Jirawarat Iamsamang; Miguel Castilho; Carlos Borau; Elena García-Gareta; María Ángeles Pérez
140833|Estudio experimental y computacional de scaffolds TPMS de Ti-6Al-4V obtenidos mediante LPBF: simulación del crecimiento tisular|Alejandro Yánez; Javier Tejera; Alberto Cuadrado; Paula Fiorucci; Sebastiaan Deviaene
141092|Inference of cytoskeleton geometry of cell from Traction Force Microscopy|Shafaq Zahra; Jose Muñoz; Andrea Malandrino
141108|Traction Force Microscopy for viscoelastic substrates|José J. Muñoz; Adrià Villacrosa; Vito Conte
141161|Efecto de la biodegradación en la integridad mecánica de componentes implantables personalizados basados en PLA/Mg|Mario Álvarez-Blanco; Ricardo Belda; Diego Infante-García; Miguel Marco`)
  ]}),
  I("j10","19:15","20:15","plenary","Asamblea del Capítulo Nacional de la Sociedad Europea de Biomecánica",{room:"capella"}),
  I("j11","20:30","23:00","general","Encuentro de networking",{ext:"polo"})
 ]},
 viernes:{ label:"Viernes 30", date:"30 de octubre de 2026", items:[
  I("v0","08:30","09:00","general","Registro de participantes",{block:"Sesiones científicas y clausura · Mañana · Sesiones paralelas, mesa redonda, premios y clausura",room:"registro"}),
  I("v1","09:00","10:30","parallel","Sesiones científicas paralelas III",{tracks:[
   T("COMP2","Modelización musculoesquelética, simulación predictiva y gemelos digitales","capella","Moderador: Simone Tassani",`
139919|Personalizing motor control in predictive gait simulations of children with cerebral palsy using muscle synergies|Marc Verdaguer; Míriam Febrer-Nafría
139965|Pronounced deviation from healthy gait ankle kinematics leads to an increase in knee joint loads|Andrea Quesada Ros; Seyyed Hamed Hosseini Nasab; Míriam Febrer Nafría
140003|Physics-based vs surrogate contact pressure models for musculoskeletal simulation|Makram Jraifi; Mohanad Harba; Emilia Agostini; Leia Daragnes; Jordi Torner; Gil Serrancolí
140821|Ingeniería Ortopédica: Gemelos digitales para revolucionar el tratamiento pediátrico de la enfermedad de Perthes|María Arrese-Zubizarreta; Sergio Ruiz de Galarreta Moriones; Julio de Pablos; Isabel Martínez-Burgos; Laura Montes Medina; Naiara Rodriguez-Florez
140972|Static versus dynamic estimation of maximal lateral pinch force: implications for design-oriented musculoskeletal modelling|Joaquín L. Sancho-Bru; José L. Iserte-Vilar; Néstor J. Jarque-Bou; Raquel Lázaro
141636|Kneeview: An Open-Source Repository of Patient-Specific Knee Geometries and Structured Meshes|Renate Janssen; Sai Natarajan; Francis Chemorion; Igor Radalov; Jordi Monfort Faure; Miguel Ángel González Ballester; Jérôme Noailly`),
   T("MOV2","Análisis del movimiento, equilibrio y control motor","ls2","Moderador: Massimo Cenciarini",`
139393|Thoracoabdominal Movement Patterns in Older Adults|Jaidilene de Jesus Soares Prazeres; Antonio Rodríguez-Fernández; Karine Jacon Sarro
139697|Analyzing Movement Through Intra-Personal Synchronization|Niklas Kallin; Claudia Hereter; Jacopo Epifanio; Ana Filipa Durão; Simone Tassani
141057|Evaluación neuromuscular de un exotraje de asistencia a la dorsiflexión: simulación musculoesquelética frente a EMG experimental|Rubén Jiménez; Alejandro García-Segura; Ezequiel Martín-Sosa; Juana Mayo; Francisco Romero-Sánchez; Joaquín Ojeda
139889|Adaptaciones cinemáticas del tren superior durante la marcha sobre terrenos ecológicos|Adriana Torres-Pardo; Irem Akgün; Carlota Trigo; Francisco Molina-Rueda; Tuba Maden; Diego Torricelli
139914|Influence of Visual, Proprioceptive, and Footwear Alterations on Center-of-Mass Stabilization During Perturbed Standing Balance|Pilar I. Maldonado-Muñoz; Sejin Yi-Yoo; Míriam Febrer-Nafría; Cristina Bayón
139956|Medida del equilibrio en pacientes con ictus mediante la plataforma OREKA|Ruben Valenzuela; Javier Corral; Mikel Díez; Francisco J. Campa; Saioa Herrero; Erik Macho; Charles Pinto`),
   T("FLU2","Modelado multiescala, hemodinámica y mecanobiología cardiovascular","ls15","Moderadora: Lluïsa Jordi Nebot",`
139989|Patient-Specific Computational Modeling of Aortic Dual Circulation in Harlequin Syndrome During Peripheral VA-ECMO|Michele Nigro; Eduardo Soudah
139991|Uncovering mechanobiological drivers of foam cell formation via integrated agent-based and explainable machine learning|Mané Sarkissian; Vasileios Vavourakis; Jérôme Noailly
139997|Adhesion & dwell-time gate NLRP3 priming & assembly in monocytes: a coupled multiscale CFD-ABM study|V. V. S. Varaprasad Jakka; Mané Sarkissian; Yalemzerf M. Alemu; Jérôme Noailly
140732|Análisis computacional de la administración de fármacos por vía inhalatoria en pacientes con estenosis traqueal y stents|Mauro Malvè; Carmen Sánchez-Matás; José Luis López-Villalobos; Rocío Fernández-Parra
141149|A Multiscale 0D–1D Model of Valveless Pumping for Biomedical Applications|Erfan Vaezi; Joaquin A. Hernández; Eduardo Soudah`),
   T("TEJ2","Mecanobiología celular, monocapas y microambiente","ls16","Moderadora: María Ángeles Pérez Ansón",`
139451|Reorganización de las tensiones celulares en monocapas durante la proliferación|Raul Aparicio-Yuste; Lara Hundsdorfer; Effie Bastounis; María José Gómez-Benito
139839|A bone remodelling model including calcium-phosphorus homeostasis|Javier Martínez Reina; José Luis Calvo Gallego; Rocío Ruiz Lozano; Peter Pivonka; Ralph Müller
139750|Computational Assessment of Oxygen Availability and Hydrodynamic Shear Stress for Optimized Cell Adhesion in SU-8 Microchambers|M. Poursaberi; G. Hauke; S. J. Mousavi; M. H. Doweidar
139912|Extracellular matrix control over physiological and pathological wound: insights from a new wound-on-a-chip model|Lucía García-Villagrasa; María Ángeles Pérez; José Manuel García-Aznar; Elena García-Gareta
139918|Modelling Cell Proliferation in Epithelial Monolayers during Listeria monocytogenes infection|Lucia Orunesu; Raul Aparicio-Yuste; Maria Jose Gomez-Benito
141101|Unraveling the Mechanical Regulation of Lymphatic Button and Zipper Junctions: In Silico and In Vitro Insights|A. Martín-Contreras; A. Díaz-San Martín; Ó. Paseta; S. A. Castro-Cordero; A. González-Loyola; J. M. García-Aznar; M. J. Gómez-Benito`)
  ]}),
  I("v2","10:30","11:30","session","Mesas redondas",{tracks:[T("MESA","Dos mesas redondas","capella","",`
|Competición universitaria de manos protésicas: del aula al reto tecnológico|Con la participación de: Immaculada Llop Harillo, Abel Hida Louafi, Miguel Martínez Collado y Mehdi Briki Boulissia. Modera: María José Rupérez Moreno|Estudiantes de grado y máster diseñan prototipos de manos protésicas en proyectos académicos. Diálogo sobre retos de diseño, soluciones propuestas y el valor de estas experiencias en la formación de ingenieros.
|Women in Biomechanics: visibilidad y liderazgo femenino en biomecánica|Con la participación de: Míriam Febrer Nafría, María José Gómez Benito y María Ángeles Pérez Ansón. Modera: Ana de Sousa|Presentación de la asociación Women in Biomechanics y debate abierto sobre participación y liderazgo femenino en la biomecánica.`)]}),
  I("v3","11:30","12:00","break","Pausa café",{room:"cafe"}),
  I("v4","12:00","13:30","parallel","Sesiones científicas paralelas IV",{tracks:[
   T("COMP3","Modelización computacional y métodos numéricos en biomecánica","capella","Moderador: Javier Martínez Reina",`
139962|Desarrollo de un modelo numérico simplificado de cabeza para la predicción del daño encefálico|Gloria Delgado; Ramiro Mantecón
140001|Element-Wise Femoral Stress Prediction: A Hybrid Graph Neural Network Surrogate for Finite Element Analysis|Sikha O K; Abdollah Moslemi; Elham Alizadeh; Ludovic Humbert; Miguel A. González Ballester; Jérôme Noailly
140006|Simulating the Daytime Sensitivity of Intervertebral Discs|Laura Baumgartner; Jérôme Noailly
140958|Evaluación del efecto del bruxismo en la vida a fatiga de un implante dental mediante elementos finitos|José Enrique Tarruella Marco; Ricardo Belda; Raquel Megías; Andrea Fresquet-Monter; Ana Vercher-Martínez; Eugenio Giner
141093|Inverse estimation of growth and material properties in growing elastic bodies|Muhammad Asif Mushtaq; Jose Muñoz`),
   T("MOV3","Biomecánica deportiva y del movimiento asistido","ls2","Moderadora: Míriam Febrer Nafría",`
139753|Musculoskeletal control for functional electrical stimulation-assisted rowing|Achille Roulot; Ana C. C. de Sousa
139756|Is ergometer rear elevation a useful perturbation for validating predictive rowing simulations? A pilot EMG study|Roos Duijn; Ana de Sousa; Achille Roulot; Guifre Albets; Massimo Cenciarini
139895|Evaluating predictive musculoskeletal simulations of walker-assisted gait in individuals with incomplete spinal cord injury|Rodrigo A. Vega Benites; Diana Quintana Bistriceanu; Míriam Febrer-Nafría
140901|Hipótesis de energías mínimas en el cálculo cinemático del ciclo de la pedalada en ciclismo|Mikel Iribecampos; Pello Alberdi; Estela Lapeira; Ibai Ulacia
140984|Proyectos ORIGEN y GÉNESIS: Impacto del género en la respuesta biomecánica de pasajer@s durante frenadas de emergencia|Silvia Santos-Cuadros; Sergio Fuentes del Toro; María Garrosa Solana; Alberto Quintana; Carolina Álvarez-Caldas; Alejandro Quesada González; María Elisa Aragón-Basanta; William Ricardo Venegas Toro; Álvaro Page del Pozo; Eva Herrero Curiel; Patricia González Aldea
139765|Ankle constraint alters cadence tracking and muscle coordination in a cadence-dependent manner: a factorial optimal-control study|Lluc Ramis; Ana C. C. de Sousa`),
   T("CLIN3","Prótesis, dispositivos de asistencia y rehabilitación funcional","ls15","Moderador: Gil Serrancolí Masferrer",`
139938|Prótesis de mano mecánica de bajo coste que completa con éxito todas las tareas de la II Competición universitaria de Manos Protésicas|Abel Hida Louafi; Miguel Martínez Collado; Mehdi Briki Boulissia; David Mayol Pastor; Anthony Haro Penalva; Immaculada Llop Harillo
139988|Diseño, identificación dinámica y filtro de Kalman para una prótesis de mano subactuada de bajo coste con arnés electrónico|Miguel Martínez Collado; Immaculada Llop Harillo; Raúl Ortiz Cárdenas; José Vicente García Ortiz
141002|Evaluación cinemática de exoesqueletos de mano mediante seguimiento electromagnético del movimiento|Raquel Lázaro; Elvira Castro; Néstor José Jarque-Bou; Margarita Vergara; Verónica Gracia
141003|GrowHand: Diseño de juego interactivo modular basado en agarres funcionales para rehabilitación de la mano|María Almela Nácher; Jon Andoni Fernández Moyano; Verónica Gracia-Ibáñez
141007|Procedimiento de evaluación de la vida a fatiga de una prótesis torácica dinámica de Ti-6Al-4V mediante captura de movimiento como condición de contorno|Sofía Suárez; José Ángel López-Campos; Irea López-García; Abraham Segade
141037|Diseño y validación biomecánica de una prótesis transtibial personalizable y de bajo coste optimizada para fabricación aditiva|Marcos Carramiñana Gracia; Carlos Contreras Laguía; Ramiro Mantecón`)
  ]}),
  I("v5","13:30","14:45","session","Sesión de premiados",{tracks:[T("PREM","Trabajos seleccionados para los premios","capella","Moderadores: María José Gómez Benito, Carlos Ruiz Wills",`
139832|Crecimiento de órganos: algoritmo basado en elementos finitos con aplicación al modelado óseo|Jose Luis Calvo Gallego; Pablo Manchado Morales; Peter Pivonka; Javier Martínez Reina
139955|Stance-phase kinematic phenotyping is associated with patient-reported function in moderate knee osteoarthritis|Mayra Loayza; Gil Serrancolí; Gemma Piella; Jérôme Noailly
140016|Desarrollo y validación de un protocolo in vitro para la caracterización biomecánica de unidades vertebrales en especímenes polisegmentarios|Salvador Moreno; Gema Rico; Alejandro Peña; Francisco García; Ana Pérez de la Blanca; Belen Estebanez; María Prado
139969|MRI-based inverse finite element characterization of ascending aortic aneurysms using Bayesian optimization|David Alcaraz; Gaia Caruso; Andrea Guala; Lydia Dux-Santoy; Gisela Teixidó-Turá; José F. Rodríguez-Palomares; Miguel A. Martínez; Estefanía Peña
139996|Validation of the kinematic and dynamic accuracy of a depth-camera-based telerehabilitation System|Sergi Riera; Mireia Beringues; Carles Margelí; Mohanad Harba; Jordi Torner; Gil Serrancolí`)]}),
  I("v6","14:50","15:00","plenary","Ceremonia de clausura",{room:"capella"}),
  I("v7","15:00","16:30","break","Almuerzo de clausura",{open:true,room:"enginy",meta:"En la Plaça de l'Enginy, en la planta baja de la ETSEIB."}),
  I("v8","17:00","19:00","general","Visita turística",{open:true,ext:"pedralbes",meta:"Punto de encuentro: delante de la puerta principal de los Jardines del Palau Reial de Pedralbes, a la altura del metro Palau Reial (L3)."})
 ]}
};
