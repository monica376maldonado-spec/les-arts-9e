import { 
  MatchingItem, 
  DefinitionItem, 
  FillBlankItem, 
  VocabCard, 
  GrammaireQuizItem, 
  ConjugationItem, 
  PronounItem, 
  CombineSentenceItem 
} from '../types';

// ==========================================
// PARTIE 1 : COMPRÉHENSION ÉCRITE
// ==========================================

export const matchingWords: MatchingItem[] = [
  { id: 1, word: "1. un dessinateur", correctLetter: "D" },
  { id: 2, word: "2. un tableau", correctLetter: "F" },
  { id: 3, word: "3. une exposition", correctLetter: "B" },
  { id: 4, word: "4. un chef-d’œuvre", correctLetter: "H" },
  { id: 5, word: "5. un détournement artistique", correctLetter: "A" },
  { id: 6, word: "6. projeter", correctLetter: "G" },
  { id: 7, word: "7. un spécialiste", correctLetter: "C" },
  { id: 8, word: "8. accessible", correctLetter: "E" },
  { id: 9, word: "9. Une bande dessinée", correctLetter: "L" },
  { id: 10, word: "10. s’amuser", correctLetter: "M" },
  { id: 11, word: "11. emmener quelqu’un", correctLetter: "I" },
  { id: 12, word: "12. rendre (+ adjectif)", correctLetter: "J" },
  { id: 13, word: "13. faire réfléchir", correctLetter: "K" },
];

export const matchingDefinitions: DefinitionItem[] = [
  { letter: "A", text: "Une création qui reprend une œuvre connue pour lui donner un nouveau sens." },
  { letter: "B", text: "Un événement où l’on présente des œuvres au public." },
  { letter: "C", text: "Une personne qui connaît très bien un domaine." },
  { letter: "D", text: "Une personne qui crée des dessins, des croquis ou des esquisses artistiques." },
  { letter: "E", text: "Facile à comprendre ou à découvrir pour tout le monde." },
  { letter: "F", text: "Une peinture que l’on peut voir dans un musée." },
  { letter: "G", text: "Montrer une image sur un mur avec la lumière d’un appareil." },
  { letter: "H", text: "Une œuvre d’art très célèbre et de grande qualité." },
  { letter: "I", text: "Conduire une personne avec soi dans un lieu." },
  { letter: "J", text: "Faire devenir : « rendre l’art accessible » = faire en sorte que l’art soit accessible." },
  { letter: "K", text: "Pousser quelqu’un à penser sérieusement à quelque chose." },
  { letter: "L", text: "Une histoire racontée avec des dessins dans des cases." },
  { letter: "M", text: "Passer un moment agréable, rire et jouer." },
];

export const part1FillWords = [
  "détournement",
  "dessinateur",
  "personnages",
  "tableaux",
  "humour",
  "exposition",
  "passion",
  "public"
];

export const part1FillSentences: FillBlankItem[] = [
  {
    id: 1,
    sentenceBefore: "Ce grand artiste est un remarquable",
    sentenceAfter: "qui réalise des esquisses avant de peindre.",
    correctAnswer: "dessinateur",
    hint: "La personne qui crée des dessins préparatoires ou des croquis."
  },
  {
    id: 2,
    sentenceBefore: "Sur cette grande fresque historique, les",
    sentenceAfter: "semblent presque vivants.",
    correctAnswer: "personnages",
    hint: "Les figures humaines représentées dans l'œuvre."
  },
  {
    id: 3,
    sentenceBefore: "La galerie a restauré de magnifiques",
    sentenceAfter: "des XVIe et XVIIe siècles.",
    correctAnswer: "tableaux",
    hint: "Des peintures sur toile exposées au musée."
  },
  {
    id: 4,
    sentenceBefore: "Grâce à son",
    sentenceAfter: ", l'artiste montre qu’on peut découvrir la peinture en souriant.",
    correctAnswer: "humour",
    hint: "Le ton amusant et léger qui rend la visite agréable."
  },
  {
    id: 5,
    sentenceBefore: "Le musée a inauguré une grande",
    sentenceAfter: "à Paris consacrée aux maîtres de la peinture.",
    correctAnswer: "exposition",
    hint: "L'événement culturel où les œuvres sont présentées au public."
  },
  {
    id: 6,
    sentenceBefore: "Ses parents lui ont transmis une véritable",
    sentenceAfter: "pour la peinture et les beaux-arts.",
    correctAnswer: "passion",
    hint: "Un très grand amour ou intérêt enthousiaste pour un art."
  },
  {
    id: 7,
    sentenceBefore: "Le guide utilise des anecdotes captivantes pour rendre l’art accessible à un",
    sentenceAfter: "plus large.",
    correctAnswer: "public",
    hint: "L'ensemble des visiteurs, jeunes et curieux."
  },
  {
    id: 8,
    sentenceBefore: "Un",
    sentenceAfter: "artistique reprend une œuvre classique connue pour lui donner un nouveau sens.",
    correctAnswer: "détournement",
    hint: "Une réinterprétation créative ou décalée d'un chef-d'œuvre."
  }
];

// ==========================================
// PARTIE 2 : COMPRÉHENSION ORALE
// ==========================================

export const audioDoc1Script = `Bienvenue sur Radio Culture Actu. Aujourd'hui, vive émotion dans le célèbre quartier des artistes ! Le projet de la mairie de vendre la mythique Cité des Ateliers à un groupe financier pour y construire des bureaux de luxe provoque un immense scandale. Dès ce matin, plusieurs centaines de détracteurs du projet se sont rassemblés dans la cour pour manifester avec leurs toiles, leurs pinceaux et des banderoles colorées. Pour ces peintres, sculpteurs et étudiants en beaux-arts, chasser la création de ce lieu centenaire est une véritable insulte au patrimoine artistique qu'il faut absolument préserver. Les porte-paroles des artistes exigent l'interdiction immédiate de la vente et ont déjà lancé une action en justice devant le tribunal administratif pour suspendre l'expulsion. Pour sensibiliser le public, les créateurs ont décidé d'exposer leurs œuvres directement sur les grilles de la rue. Face à l'hostilité déterminée du monde de l'art, les promoteurs restent prudents, tandis que les riverains et les amateurs de peinture saluent une initiative solidaire exemplaire. Rappelons enfin que cette cité d'artistes fonctionne depuis un siècle comme un formidable laboratoire vivant de création et d'audace.`;

export const audioDoc2Script = `Chers auditeurs, à vos agendas ! Samedi prochain aura lieu la Nuit européenne des musées. Pour l'occasion, l'accès à toutes les collections sera entièrement gratuit à partir de 19 heures. De nombreuses animations et spectacles sont programmés dans chaque galerie. Vous pourrez admirer des guides vêtus en costumes d'époque, des statues et sculptures éclairées de manière féérique, ainsi que des performances musicales. Pour éviter la foule qui se précipite vers les salles les plus célèbres, achetez dès maintenant votre billet de train pour rejoindre la gare centrale. Une auditrice nous écrivait hier : « J'y suis allée l'an dernier avec mes enfants, ça en valait vraiment la peine ! » N'oubliez pas d'immortaliser ces moments. De grosses bises culturelles et à très bientôt !`;

export const doc1Vocab: VocabCard[] = [
  { french: "un scandale", definition: "Un événement choquant qui révolte l'opinion publique.", spanish: "un escándalo", category: "debat-contemporain" },
  { french: "exposer", definition: "Montrer des toiles, des sculptures ou des œuvres au public.", spanish: "exponer", category: "art-bd" },
  { french: "un détracteur", definition: "Une personne qui critique et s'oppose à un projet.", spanish: "un detractor", category: "debat-contemporain" },
  { french: "manifester", definition: "Protester dans la rue avec d’autres personnes pour défendre une cause.", spanish: "manifestarse", category: "debat-contemporain" },
  { french: "exiger", definition: "Demander quelque chose avec force et détermination.", spanish: "exigir", category: "debat-contemporain" },
  { french: "une interdiction", definition: "Le fait de ne pas permettre ou d'interdire légalement une action.", spanish: "una prohibición", category: "debat-contemporain" },
  { french: "une insulte", definition: "Une parole ou un acte qui manque gravement de respect.", spanish: "un insulto", category: "debat-contemporain" },
  { french: "une action en justice", definition: "Une démarche devant un tribunal pour faire valoir ses droits.", spanish: "una demanda judicial", category: "debat-contemporain" },
  { french: "l’hostilité", definition: "L’opposition farouche, le refus affirmé d'un projet.", spanish: "la hostilidad", category: "debat-contemporain" },
  { french: "saluer une initiative", definition: "Féliciter une action, applaudir une bonne idée.", spanish: "valorar positivamente una iniciativa", category: "debat-contemporain" },
  { french: "le patrimoine", definition: "Les lieux, bâtiments et œuvres artistiques du passé à transmettre.", spanish: "el patrimonio", category: "visite-musee" },
  { french: "préserver", definition: "Protéger contre la destruction, garder intact et en bon état.", spanish: "preservar", category: "visite-musee" },
  { french: "un laboratoire", definition: "Un lieu d'expérimentation, de recherche et de création nouvelle.", spanish: "un laboratorio", category: "art-bd" }
];

export const doc2Vocab: VocabCard[] = [
  { french: "un billet", definition: "Le papier ou ticket pour voyager en train ou entrer dans un lieu.", spanish: "un boleto / un tiquete", category: "visite-musee" },
  { french: "la nuit des musées", definition: "Une nuit par an où les musées ouvrent tard et gratuitement.", spanish: "la noche de los museos", category: "visite-musee" },
  { french: "gratuit", definition: "Qui ne coûte rien, sans frais d'entrée.", spanish: "gratis", category: "visite-musee" },
  { french: "une animation", definition: "Une activité ludique pour distraire et intéresser le public.", spanish: "une actividad", category: "visite-musee" },
  { french: "un spectacle", definition: "Une représentation avec des acteurs, des danseurs ou des musiciens.", spanish: "un espectáculo", category: "visite-musee" },
  { french: "un costume d’époque", definition: "Un vêtement historique qui rappelle le passé.", spanish: "un traje de época", category: "visite-musee" },
  { french: "Ça en valait la peine.", definition: "C’était bien, ça méritait l’effort et le temps investi.", spanish: "Valió la pena.", category: "debat-contemporain" },
  { french: "une collection", definition: "Un ensemble cohérent d’œuvres réunies dans un musée.", spanish: "una colección", category: "visite-musee" },
  { french: "se précipiter vers", definition: "Courir ou aller très vite vers un endroit.", spanish: "correr hacia", category: "visite-musee" },
  { french: "un sculpteur / une statue", definition: "L'artiste qui crée des figures en pierre ou bronze / L'œuvre sculptée.", spanish: "un escultor / una estatua", category: "art-bd" },
  { french: "éclairé(e)", definition: "Mis en valeur avec de la lumière.", spanish: "iluminado(a)", category: "visite-musee" },
  { french: "la gare, le quai", definition: "Le lieu où l’on prend le train / la partie où l’on attend.", spanish: "la estación, el andén", category: "visite-musee" },
  { french: "de grosses bises", definition: "Une formule affectueuse et amicale pour dire au revoir.", spanish: "un abrazo fuerte / muchos besos", category: "visite-musee" }
];

export interface ListeningQuizItem {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const doc2ListeningQuiz: ListeningQuizItem[] = [
  {
    id: 1,
    question: "À quelle heure commence l'accès aux musées pour cet événement ?",
    options: ["À 14 heures", "À 19 heures", "À minuit", "Dès le matin"],
    correctAnswer: "À 19 heures",
    explanation: "Dans l'enregistrement, l'annonce précise que l'accès commence à 19 heures."
  },
  {
    id: 2,
    question: "Quel est le prix d'entrée pour la Nuit européenne des musées ?",
    options: ["5 euros par élève", "Demi-tarif", "Entièrement gratuit", "Sur réservation payante"],
    correctAnswer: "Entièrement gratuit",
    explanation: "Le mot clé est « gratuit » : l'accès à toutes les collections ne coûte rien."
  },
  {
    id: 3,
    question: "Que portent certains guides pour animer les galeries ?",
    options: ["Des blouses blanches", "Des costumes d'époque", "Des uniformes de sécurité", "Des masques d'animaux"],
    correctAnswer: "Des costumes d'époque",
    explanation: "Les guides sont vêtus de vêtements historiques (« costumes d'époque ») pour replonger le public dans l'histoire."
  },
  {
    id: 4,
    question: "Que conseille la radio pour éviter la foule aux abords du musée ?",
    options: ["Venir à pied", "Acheter son billet de train pour la gare centrale", "Rester à la maison", "Prendre un taxi"],
    correctAnswer: "Acheter son billet de train pour la gare centrale",
    explanation: "Le reportage conseille d'acheter dès maintenant son billet de train pour rejoindre la gare centrale."
  },
  {
    id: 5,
    question: "Que signifie l'avis de l'auditrice : « Ça en valait vraiment la peine » ?",
    options: ["C'était trop fatigant", "C'était payant et cher", "C'était bien, cela méritait l'effort", "C'était une mauvaise expérience"],
    correctAnswer: "C'était bien, cela méritait l'effort",
    explanation: "L'expression « Ça en valait la peine » indique que l'expérience était enrichissante et méritait le déplacement."
  },
  {
    id: 6,
    question: "Quelle formule amicale est utilisée à la fin de l'émission pour dire au revoir ?",
    options: ["Veuillez agréer mes salutations", "De grosses bises", "Adieu", "Bon vent"],
    correctAnswer: "De grosses bises",
    explanation: "Le présentateur termine par « De grosses bises culturelles », une formule chaleureuse et familière."
  }
];

export const part2FillWords = [
  "scandale",
  "détracteurs",
  "manifester",
  "interdiction",
  "patrimoine",
  "laboratoire",
  "saluent",
  "insulte"
];

export const part2FillSentences: FillBlankItem[] = [
  {
    id: 1,
    sentenceBefore: "Les",
    sentenceAfter: "du projet immobilier se sont mobilisés pour défendre les artistes.",
    correctAnswer: "détracteurs",
    hint: "Les personnes opposées à la vente et fermeture des ateliers."
  },
  {
    id: 2,
    sentenceBefore: "Des centaines de peintres et d'étudiants ont décidé de",
    sentenceAfter: "dans la rue avec leurs toiles et leurs pinceaux.",
    correctAnswer: "manifester",
    hint: "Protester publiquement pour défendre leurs lieux de création."
  },
  {
    id: 3,
    sentenceBefore: "Le collectif des artistes réclame une",
    sentenceAfter: "stricte de démolir ces ateliers centenaires.",
    correctAnswer: "interdiction",
    hint: "La décision officielle qui interdit les travaux de démolition."
  },
  {
    id: 4,
    sentenceBefore: "Pour les créateurs, fermer ces lieux d'art historiques est une véritable",
    sentenceAfter: "à la mémoire des grands maîtres de la peinture.",
    correctAnswer: "insulte",
    hint: "Un acte grave perçu comme un profond manque de respect."
  },
  {
    id: 5,
    sentenceBefore: "L'avis d'expulsion des ateliers d'art a provoqué un immense",
    sentenceAfter: "dans le milieu culturel.",
    correctAnswer: "scandale",
    hint: "L'affaire choquante qui suscite l'indignation générale."
  },
  {
    id: 6,
    sentenceBefore: "Les riverains et les amateurs de peinture",
    sentenceAfter: "cette initiative solidaire pour protéger la création.",
    correctAnswer: "saluent",
    hint: "Ils félicitent et encouragent avec enthousiasme cette mobilisation."
  },
  {
    id: 7,
    sentenceBefore: "Cet espace artistique populaire a toujours fonctionné comme un",
    sentenceAfter: "vivant d'expérimentation et d'idées neuves.",
    correctAnswer: "laboratoire",
    hint: "Un lieu de recherche, d'apprentissage et de création artistique."
  },
  {
    id: 8,
    sentenceBefore: "Tous rappellent que ces ateliers historiques font partie intégrante de notre",
    sentenceAfter: "culturel.",
    correctAnswer: "patrimoine",
    hint: "L'héritage artistique et les trésors communs à transmettre aux générations futures."
  }
];

// ==========================================
// PARTIE 3 : PRODUCTION ÉCRITE
// ==========================================

export interface ForumSectionGuide {
  id: string;
  name: string;
  role: string;
  expressions: string[];
  placeholder: string;
}

export const forumStructureGuide: ForumSectionGuide[] = [
  {
    id: "titre",
    name: "Titre",
    role: "Annoncer le sujet avec une question ou une phrase courte percutante.",
    expressions: ["Et si… ?", "Faut-il… ?", "Pour ou contre… ?", "L'art doit-il rester intouchable ?"],
    placeholder: "Ex: Faut-il transformer les œuvres d'art pour les rendre plus amusantes ?"
  },
  {
    id: "salutation",
    name: "Formule d’appel informelle",
    role: "Saluer les lecteurs et les camarades de façon amicale.",
    expressions: ["Salut à tous !", "Coucou les amis !", "Bonjour tout le monde !"],
    placeholder: "Ex: Salut à tous les passionnés d'art et de BD !"
  },
  {
    id: "lancerDebat",
    name: "Lancer un débat",
    role: "Présenter le sujet et poser clairement la question de controverse.",
    expressions: [
      "Aujourd’hui, je voudrais parler de…",
      "Que pensez-vous de… ?",
      "Est-ce une bonne idée de… ?",
      "Depuis quelques jours, je me demande si…"
    ],
    placeholder: "Ex: Aujourd'hui, je voudrais vous parler des détournements de tableaux de maîtres par des dessinateurs de BD. Est-ce vraiment une bonne idée ?"
  },
  {
    id: "arg1",
    name: "Argument 1 + exemple",
    role: "Donner une première raison convaincante, puis illustrer par un exemple précis.",
    expressions: [
      "D’abord,",
      "Premièrement,",
      "Par exemple,",
      "Comme le montre l'exposition de Geluck...",
      "En effet,"
    ],
    placeholder: "Ex: D'abord, ces détournements permettent de rendre l'art classique accessible aux jeunes. Par exemple, quand Philippe Geluck associe Le Chat à des toiles de maîtres, cela donne envie d'aller au musée sans intimidation."
  },
  {
    id: "arg2",
    name: "Argument 2 + exemple",
    role: "Donner une deuxième raison, enrichie d'une nuance ou d'un autre exemple.",
    expressions: [
      "Ensuite,",
      "De plus,",
      "En effet,",
      "Par ailleurs,",
      "D'un autre côté,"
    ],
    placeholder: "Ex: De plus, l'humour ne détruit pas le patrimoine, il lui donne une seconde vie. En voyant les parodies de Zep, on apprend à observer les détails des tableaux des XVIe et XVIIe siècles."
  },
  {
    id: "exemplePerso",
    name: "Exemple personnel",
    role: "Raconter une expérience vécue en utilisant le passé composé et l’imparfait.",
    expressions: [
      "Personnellement,",
      "Moi, l’année dernière,",
      "Un jour, j’ai visité...",
      "Il y avait beaucoup de monde quand j'ai découvert..."
    ],
    placeholder: "Ex: Personnellement, l'an dernier, j'ai visité le musée avec ma classe. Avant cette visite, je n'aimais pas beaucoup les vieux tableaux, mais grâce à ces versions revisitées, j'ai passé un super moment !"
  },
  {
    id: "reagir",
    name: "Encouragement à réagir",
    role: "Inviter chaleureusement les lecteurs à exprimer leur avis sur le forum.",
    expressions: [
      "Qu’est-ce que vous en pensez ?",
      "Et vous, quel est votre avis ?",
      "Pensez-vous que c'est un scandale ou du génie ?"
    ],
    placeholder: "Ex: Et vous, qu'en pensez-vous ? Êtes-vous plutôt pour ou contre ces transformations d'œuvres ?"
  },
  {
    id: "remerciements",
    name: "Remerciements & Signature",
    role: "Terminer poliment et signer avec son prénom.",
    expressions: ["Merci pour votre attention.", "J'attends vos réponses !", "À bientôt !"],
    placeholder: "Ex: Merci pour votre lecture et vos commentaires !\nCamille"
  }
];

export const examSampleCamille = {
  title: "Un musée qui m’a vraiment marqué(e) !",
  salutation: "Salut à tous !",
  body: `Est-ce que visiter un musée peut changer votre journée ? Pour moi, oui, et je voudrais vous en parler !

Un musée est un lieu où l’on découvre de très belles œuvres. Par exemple, au Musée d’Orsay, à Paris, j’ai vu « La Nuit étoilée sur le Rhône » de Van Gogh, un tableau que je voulais voir depuis longtemps. Les couleurs étaient vraiment magnifiques et je suis resté(e) dix minutes devant !

On apprend aussi énormément de choses. Par exemple, j’ai appris que Van Gogh avait peint cette œuvre dehors, pendant la nuit, ce qui m’a beaucoup surpris(e).

Le mois dernier, j’ai visité ce musée avec ma sœur. Il y avait beaucoup de monde, mais nous étions très contents. J’étais profondément ému(e), et c’est pour ça que je recommande cette visite. Allez-y, c’est vraiment génial !

Qu’est-ce que vous en pensez ?

Merci pour votre attention.
Camille`,
  wordCount: 154,
  breakdown: [
    { label: "Titre", text: "Un musée qui m’a vraiment marqué(e) !" },
    { label: "Formule d'appel", text: "Salut à tous !" },
    { label: "Lancer le sujet", text: "Est-ce que visiter un musée peut changer votre journée ? Pour moi, oui, et je voudrais vous en parler !" },
    { label: "Argument 1 + exemple", text: "Un musée est un lieu où l’on découvre de très belles œuvres. Par exemple, au Musée d’Orsay, à Paris, j’ai vu « La Nuit étoilée sur le Rhône »..." },
    { label: "Argument 2 + exemple", text: "On apprend aussi énormément de choses. Par exemple, j’ai appris que Van Gogh avait peint cette œuvre dehors, pendant la nuit..." },
    { label: "Expérience personnelle (PC & IMP)", text: "Le mois dernier, j’ai visité ce musée avec ma sœur. Il y avait beaucoup de monde, mais nous étions très contents..." },
    { label: "Appel à réagir", text: "Qu’est-ce que vous en pensez ?" },
    { label: "Remerciements & Signature", text: "Merci pour votre attention. \nCamille" }
  ]
};

// ==========================================
// PARTIE 4 : GRAMMAIRE
// ==========================================

export const grammaireQuiz41: GrammaireQuizItem[] = [
  {
    id: 1,
    phrase: "Le peintre a créé une toile monumentale.",
    correct: "PC",
    explanation: "Passé composé : action ponctuelle, accomplie et délimitée dans le temps."
  },
  {
    id: 2,
    phrase: "Autrefois, le jeune artiste admirait les sculptures antiques.",
    correct: "IMP",
    explanation: "Imparfait : habitude passée et sentiment durable dans le passé (« Autrefois »)."
  },
  {
    id: 3,
    phrase: "La conservatrice organisait souvent des visites dans la galerie.",
    correct: "IMP",
    explanation: "Imparfait : habitude répétée dans le passé, soulignée par le mot-clé « souvent »."
  },
  {
    id: 4,
    phrase: "Hier, nous avons visité l’exposition.",
    correct: "PC",
    explanation: "Passé composé : action précise et ponctuelle située précisément dans le temps par « Hier »."
  },
  {
    id: 5,
    phrase: "La galerie était lumineuse et les tableaux étaient bien éclairés.",
    correct: "IMP",
    explanation: "Imparfait : description du cadre, de l'atmosphère et du décor d'arrière-plan."
  },
  {
    id: 6,
    phrase: "Soudain, le commissaire de l'exposition a dévoilé le chef-d’œuvre.",
    correct: "PC",
    explanation: "Passé composé : événement soudain et inattendu qui fait rupture (« Soudain »)."
  }
];

export const conjugationItems42: ConjugationItem[] = [
  {
    id: 1,
    verb: "visiter",
    correct: "ai visité",
    explanation: "Hier + action ponctuelle = Passé composé avec l'auxiliaire avoir."
  },
  {
    id: 2,
    verb: "faire",
    correct: "faisait",
    explanation: "Description météo d'arrière-plan = Imparfait (racine fais- + terminaison -ait)."
  },
  {
    id: 3,
    verb: "y avoir",
    correct: "y avait",
    explanation: "Description du contexte et de l'atmosphère générale = Imparfait (« il y avait »)."
  },
  {
    id: 4,
    verb: "regarder",
    correct: "regardions",
    explanation: "Action continue et en cours de déroulement interrompue par l'arrivée du guide = Imparfait."
  },
  {
    id: 5,
    verb: "arriver",
    correct: "est arrivé",
    explanation: "Action ponctuelle et soudaine qui survient pendant la contemplation = Passé composé avec auxiliaire être."
  },
  {
    id: 6,
    verb: "expliquer",
    correct: "a expliqué",
    altCorrect: ["expliquait"],
    explanation: "Action principale accomplie par le guide lors de son intervention = Passé composé (« a expliqué »)."
  },
  {
    id: 7,
    verb: "acheter",
    correct: "avons acheté",
    explanation: "Action ponctuelle et successive (« Après la visite ») = Passé composé."
  }
];

export const relativePronounsQuiz44: PronounItem[] = [
  {
    id: 1,
    sentenceBefore: "Ce peintre impressionniste est un artiste",
    sentenceAfter: "a marqué l’histoire de l'art.",
    correct: "qui",
    explanation: "« qui » remplace le sujet du verbe « a marqué » (l'artiste a marqué l'art)."
  },
  {
    id: 2,
    sentenceBefore: "La Joconde est le chef-d’œuvre",
    sentenceAfter: "les visiteurs admirent avec émotion.",
    correct: "que",
    explanation: "« que » remplace le Complément d'Objet Direct (COD) : les visiteurs admirent quoi ? Le chef-d'œuvre."
  },
  {
    id: 3,
    sentenceBefore: "Le musée d'Orsay est le lieu culturel",
    sentenceAfter: "nous avons contemplé les peintures de Monet.",
    correct: "où",
    explanation: "« où » indique le lieu dans lequel l'exposition s'est tenue."
  },
  {
    id: 4,
    sentenceBefore: "Voici la galerie d'art",
    sentenceAfter: "je t’ai parlé.",
    correct: "dont",
    explanation: "« dont » remplace un complément introduit par « de » : on dit « parler DE cette galerie »."
  },
  {
    id: 5,
    sentenceBefore: "J’ai un ami",
    sentenceAfter: "adore la sculpture moderne.",
    correct: "qui",
    explanation: "« qui » est le sujet du verbe « adore » (mon ami adore la sculpture)."
  },
  {
    id: 6,
    sentenceBefore: "L'exposition",
    sentenceAfter: "nous avons visitée hier était gratuite.",
    correct: "que",
    explanation: "« que » remplace le COD du verbe « avons visitée » (nous avons visité l'exposition)."
  },
  {
    id: 7,
    sentenceBefore: "C’est la ville",
    sentenceAfter: "le célèbre peintre a installé son atelier.",
    correct: "où",
    explanation: "« où » exprime le complément circonstanciel de lieu (dans cette ville)."
  },
  {
    id: 8,
    sentenceBefore: "Ce sculpteur classique est un artiste",
    sentenceAfter: "beaucoup de critiques se souviennent.",
    correct: "dont",
    explanation: "« dont » remplace le complément du verbe « se souvenir DE » (se souvenir de l'artiste)."
  }
];

export const combineSentences45: CombineSentenceItem[] = [
  {
    id: 1,
    sentence1: "J’ai vu un tableau.",
    sentence2: "Ce tableau est très célèbre.",
    targetPronoun: "qui",
    expectedSolution: "J'ai vu un tableau qui est très célèbre.",
    alternativeSolutions: [
      "J’ai vu un tableau qui est très célèbre.",
      "J'ai vu un tableau qui est très célèbre",
      "J’ai vu un tableau qui est très célèbre"
    ],
    hint: "Le mot répété « Ce tableau » est le sujet du second verbe. Utilise le pronom sujet « qui »."
  },
  {
    id: 2,
    sentence1: "Le peintre a créé une toile magnifique.",
    sentence2: "Tout le monde admire cette toile.",
    targetPronoun: "que",
    expectedSolution: "Le peintre a créé une toile magnifique que tout le monde admire.",
    alternativeSolutions: [
      "Le peintre a créé une toile magnifique que tout le monde admire.",
      "Le peintre a créé une toile magnifique que tout le monde admire",
      "Le peintre a créé une toile magnifique qu'on admire tous."
    ],
    hint: "« Cette toile » est COD du verbe « admire ». Utilise le pronom relatif « que »."
  },
  {
    id: 3,
    sentence1: "Nous visitons une galerie d'art.",
    sentence2: "Dans cette galerie d'art, il y a une exposition de sculptures.",
    targetPronoun: "où",
    expectedSolution: "Nous visitons une galerie d'art où il y a une exposition de sculptures.",
    alternativeSolutions: [
      "Nous visitons une galerie d'art où il y a une exposition de sculptures.",
      "Nous visitons une galerie d'art où il y a une exposition de sculptures",
      "Nous visitons une galerie d'art dans laquelle il y a une exposition de sculptures."
    ],
    hint: "« Dans cette galerie d'art » indique le lieu. Remplace-le par le pronom relatif « où »."
  },
  {
    id: 4,
    sentence1: "Voici un grand sculpteur.",
    sentence2: "Je parle souvent de ce grand sculpteur.",
    targetPronoun: "dont",
    expectedSolution: "Voici un grand sculpteur dont je parle souvent.",
    alternativeSolutions: [
      "Voici un grand sculpteur dont je parle souvent.",
      "Voici un grand sculpteur dont je parle souvent",
      "Voici un artiste dont je parle souvent.",
      "Voici un artiste dont je parle souvent"
    ],
    hint: "On dit « parler DE ce grand sculpteur ». Le pronom à employer pour remplacer un complément en « de » est « dont »."
  }
];

// ==========================================
// RESSOURCES COMPLÉMENTAIRES
// ==========================================

export const grammarMemoCards = [
  {
    title: "Passé Composé vs Imparfait : Le guide infaillible",
    concept: "Deux temps du passé aux rôles bien distincts",
    points: [
      {
        tag: "Passé Composé (PC)",
        desc: "Actions ponctuelles, achevées, limitées dans le temps ou successives.",
        triggers: "Hier, soudain, tout à coup, ensuite, un jour, à 14h, le mois dernier.",
        example: "Soudain, la cloche a sonné. Nous avons visité le musée."
      },
      {
        tag: "Imparfait (IMP)",
        desc: "Descriptions, décors, météo, sentiments, habitudes répétées ou actions en cours.",
        triggers: "Chaque jour, souvent, tous les soirs, il faisait beau, quand j'étais petit.",
        example: "Il faisait froid et les rues étaient désertes. Il aimait peindre."
      }
    ],
    tip: "Astuce mnémotechnique : Imagine un film de cinéma ! L'imparfait, c'est le décor et la musique d'ambiance. Le passé composé, c'est l'acteur qui surgit et fait une action."
  },
  {
    title: "Pronoms Relatifs : Qui, Que, Où, Dont",
    concept: "Comment remplacer un groupe nominal pour éviter les répétitions",
    points: [
      {
        tag: "QUI",
        desc: "Remplace le SUJET du verbe suivant. (qui + verbe)",
        triggers: "Pose la question : « Qui fait l'action ? »",
        example: "Le peintre QUI a réalisé cette fresque est réputé."
      },
      {
        tag: "QUE / QU'",
        desc: "Remplace le COD (Complément d'Objet Direct). (que + sujet + verbe)",
        triggers: "Pose la question : « Le sujet fait QUOI ? »",
        example: "Le tableau QUE j'admire est au Louvre."
      },
      {
        tag: "OÙ",
        desc: "Remplace un complément de LIEU ou de TEMPS.",
        triggers: "Où ? Quand ?",
        example: "Le musée OÙ nous sommes allés. Le jour OÙ l'artiste est né."
      },
      {
        tag: "DONT",
        desc: "Remplace un complément introduit par la préposition « DE ».",
        triggers: "Verbes avec DE : parler de, se souvenir de, avoir besoin de, avoir peur de.",
        example: "L'œuvre DONT je parle (parler de). L'artiste DONT je me souviens."
      }
    ],
    tip: "Règle d'or : Regarde toujours la nature de ce qui suit le trou. Si c'est un verbe conjugué direct, c'est généralement QUI. Si c'est un pronom ou sujet suivi du verbe, teste QUE ou DONT !"
  }
];


