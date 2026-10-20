# Atelier de Français 9e : Art & Bande Dessinée — Plateforme Pédagogique Interactive

Une plateforme d'apprentissage immersive, interactive et élégante conçue pour les collégiens de 9e année afin de préparer leur examen de français à partir du dossier thématique « Art et Bande Dessinée » (Zep, Titeuf, Philippe Geluck et Le Chat, Jeff Koons à Versailles, Nuit des musées, musée d'Orsay).

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Les réponses aux questions de cadrage ont validé les orientations pédagogiques suivantes :

- **Feedback et correction** : Correction interactive immédiate avec explications détaillées, badges de réussite et score en direct avec sauvegarde locale de la progression de l'élève.
- **Compréhension orale (Partie 2)** : Lecteur audio intégré exploitant la synthèse vocale Web Speech en français naturel avec réglage de vitesse (0.8x, 1x, 1.2x), bouton réécoute, et transcription masquable / révélable à la demande.
- **Espace Ressources complémentaires** : Fiches mémos de grammaire synthétiques, lexique bilingue franco-espagnol avec recherche et prononciation, et galerie interactive des œuvres d'art réelles citées dans l'examen (Zep et Titeuf au musée, Geluck et Le Chat, Jeff Koons à Versailles, Van Gogh à Orsay).

---

## 1. Overview & Core Concept

- **Public cible** : Élèves de 9e année collège (cycle 4 / niveau A2-B1 en FLE ou préparation d'examen de collège) et leur professeure de français.
- **Objectif** : Transformer le document de préparation d'examen papier de 9 pages en une application web interactive, motivante et sans friction, structurée exactement selon les 4 parties officielles de l'examen plus un hub de ressources complémentaires :
  1. **Partie 1 — Compréhension écrite : Vocabulaire du texte** (Activité 1.1 : Association interactive mot-définition drag-and-drop / clic-clic; Activité 1.2 : Exercice à trous contextuel avec étiquettes amovibles).
  2. **Partie 2 — Compréhension orale : Vocabulaire des enregistrements** (Lecteur d'écoute pour Document 1 "Jeff Koons à Versailles" et Document 2 "La Nuit des Musées"; Activité 2.1 : Exercice à trous interactif; lexique d'appui).
  3. **Partie 3 — Production écrite : Le message sur un forum** (Activité 3.1 : Structure décortiquée avec exemples; Activité 3.2 : Rédacteur guidé étape par étape du message de forum pour le débat d'école avec compteur de mots et validation des critères; Activité 3.3 : Modèle annoté d'examen avec focus analyse stylistique et grille critériée).
  4. **Partie 4 — Grammaire** (Activité 4.1 : Passé composé vs Imparfait en quiz interactif; Activité 4.2 : Conjugaison en contexte; Activité 4.3/4.4 : Pronoms relatifs *qui, que, où, dont*; Activité 4.5 : Fusion de deux propositions avec pronom relatif et validation de syntaxe).
  5. **Ressources Complémentaires & Fiches Mémos** : Lexique bilingue français-espagnol complet et filtrable avec prononciation audio, fiches synthétiques de grammaire (règles PC/IMP, astuces pronoms relatifs), et Galerie d'Art & BD commentée (toiles, détournements, musées).

---

## 2. User Experience & Visual Design

### Direction artistique & Ambiance
- **Thème visuel** : Esprit "Atelier d'Art & Galerie Moderne" combiné à la fraîcheur de la bande dessinée franco-belge, sobre et chic (adieu aux designs enfantins ou aux formulaires austères).
- **Palette chromatique (règle 60-30-10)** :
  - *60% Toile de fond* : Fond papier soyeux et clair (`bg-stone-50` / `dark:bg-stone-950`).
  - *30% Surfaces & Typographie* : Cartes en blanc pur (`bg-white` / `dark:bg-stone-900`) avec bordures fines élégantes (`border-stone-200` / `dark:border-stone-800`), textes en encre sombre (`text-stone-900` / `text-stone-100`).
  - *10% Accents stimulants* : Bleu outremer cobalt (`#1d4ed8` / `indigo-600`) pour les actions principales, touches ambrées pour les conseils méthodologiques et émeraude pour les réussites.
- **Typographie** : Titres expressifs en `Plus Jakarta Sans` ou serif éditorial raffiné (`Fraunces` / `Lora` pour la touche artistique), texte de labeur ultra lisible avec espacement soigné.
- **Top Bar Contract** :
  - *Zone 1* : Titre de marque clair : `Atelier Français · 9e Collège`
  - *Zone 2* : Navigation principale par onglets unifiés (Compréhension écrite · Compréhension orale · Production écrite · Grammaire · Ressources & Lexique)
  - *Zone 3* : Indicateur de progression globale de l'élève (ex: `Score : 24/30 pts` avec réinitialisation possible).

---

## 3. Key Product Decisions & Trade-Offs

- **Interaction fluide sans rechargement** : Toutes les activités disposent d'un feedback immédiat (correct / incorrect avec explication didactique), mais permettent de réessayer ou de voir la solution après une tentative infructueuse.
- **Lecteur Audio autonome** : Intégration de la synthèse vocale Web Speech API (`window.speechSynthesis`) configurée avec voix française (`lang: 'fr-FR'`), vitesse modulable (très utile pour des collégiens et élèves allophones/FLE), transcriptions accordéon masquées pour tester la compréhension réelle à l'audition.
- **Rédacteur de production écrite guidé** : Les collégiens ont souvent le syndrome de la page blanche. L'activité 3.2 est découpée en blocs guidés (Titre, Formule d'appel, Lancement du débat, Argument 1 + exemple, Argument 2 + exemple, Exemple personnel, Appel à réagir, Salutations, Signature) avec aide d'expressions utiles en clic pour insérer directement dans son texte, et bouton de prévisualisation du message format forum.
- **Persistance locale** : Le score et les réponses sauvegardés dans `localStorage` pour que l'élève ne perde pas son travail en cas de rafraîchissement.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              TopNavBar                                 │
│  [Logo / Atelier 9e] ── [5 Onglets Pédagogiques] ── [Progression/Score]│
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌─────────────────────────────┐             ┌─────────────────────────────┐
│       Activity Tabs         │             │    Ressources Hub           │
│                             │             │                             │
│ • Tab 1: Compréhension      │             │ • Lexique Bilingue FR/ES    │
│   Écrite (Vocab 1.1, 1.2)   │             │   (Recherche & Audio TTS)   │
│ • Tab 2: Compréhension      │             │ • Fiches Mémos Grammaire    │
│   Orale (Player audio TTS,  │             │   (PC vs IMP, Qui/Que/Où...)│
│   Docs 1 & 2, Quiz 2.1)     │             │ • Galerie Œuvres d'Art & BD │
│ • Tab 3: Production Écrite  │             │   (Koons, Geluck, Zep,      │
│   (Structure 3.1, Studio    │             │    Van Gogh, Monet)         │
│   d'écriture 3.2, Modèle)   │             │                             │
│ • Tab 4: Grammaire          │             │                             │
│   (PC/IMP 4.1-4.2, Relatifs │             │                             │
│   4.3-4.5 avec validation)  │             │                             │
└──────────────┬──────────────┘             └──────────────┬──────────────┘
               │                                           │
               └─────────────────────┬─────────────────────┘
                                     ▼
                ┌────────────────────────────────────────┐
                │        Client State & Storage          │
                │ • useLocalStorage (Scores & Answers)   │
                │ • SpeechSynthesisController (FR TTS)   │
                │ • Educational Rubric & Correction Engine│
                └────────────────────────────────────────┘
```
