# Plan d'implémentation - Site Web Famille DECKER

## 📌 Note importante sur la stack technique

**TOUS les composants UI de ce site doivent utiliser shadcn/ui**. shadcn/ui est une collection de composants réutilisables construits avec Radix UI et Tailwind CSS. Les composants sont copiés directement dans votre projet, vous donnant un contrôle total sur le code.

**Avantages :**
- Composants accessibles par défaut (WCAG)
- Personnalisables avec Tailwind CSS
- TypeScript natif
- Pas de dépendance lourde (code source dans le projet)
- Design moderne et professionnel

**Documentation officielle :** https://ui.shadcn.com/

---

## Phase 1 : Préparation et Configuration Initiale

### 1. Configuration de l'environnement de développement
- [x] 1.1 Installer Node.js (version LTS recommandée)
- [x] 1.2 Installer Git pour le versionnement
- [x] 1.3 Configurer un éditeur de code (VS Code recommandé)
- [x] 1.4 Créer un compte GitHub pour héberger le code source

### 2. Initialisation du projet Next.js
- [x] 2.1 Créer un nouveau projet Next.js 15 avec TypeScript
- [x] 2.2 Configurer Tailwind CSS
- [x] 2.3 Installer shadcn/ui et configurer les composants (utiliser shadcn/ui pour TOUS les composants du site)
- [x] 2.4 Créer la structure de dossiers du projet (components, pages, lib, etc.)
- [x] 2.5 Initialiser le dépôt Git et faire le premier commit

### 3. Installation des composants shadcn/ui
- [x] 3.1 Installer les composants de base : Button, Card, Badge, Avatar
- [x] 3.2 Installer les composants de navigation : NavigationMenu, Breadcrumb
- [x] 3.3 Installer les composants de formulaire : Input, Select, Checkbox, Switch
- [x] 3.4 Installer les composants de feedback : Alert, Toast, Dialog, Sheet
- [x] 3.5 Installer les composants médias : AspectRatio, Carousel
- [x] 3.6 Installer les composants d'overlay : Popover, Tooltip, HoverCard
- [x] 3.7 Installer Separator, Skeleton, ScrollArea
- [x] 3.8 Installer le composant Sidebar (nouvelle version shadcn/ui)
- [x] 3.9 Installer les composants de thème : DropdownMenu pour le toggle thème

### 4. Configuration de l'hébergement et des services externes
- [x] 4.1 Créer un compte Vercel et connecter le dépôt GitHub (documentation fournie)
- [x] 4.2 Choisir et configurer le service de stockage médias (Supabase recommandé et documenté)
- [x] 4.3 Créer les variables d'environnement nécessaires (.env.example créé)
- [x] 4.4 Tester le déploiement initial (vercel.json et guide DEPLOIEMENT.md créés)

## Phase 2 : Architecture et Structure de Base

### 4. Définition de la structure du site
- [x] 4.1 Créer la page d'accueil (/) avec présentation et accès aux sections principales
- [x] 4.2 Créer la page Histoire familiale (/histoire) avec sous-sections chronologiques
- [x] 4.3 Créer la page Archives & Documents (/archives)
- [x] 4.4 Créer la page Créations artistiques (/creations) avec sous-sections par type
- [x] 4.5 Créer la page Portraits des membres (/portraits)
- [x] 4.6 Créer la page Arbre généalogique interactif (/genealogie)
- [x] 4.7 Créer la page Témoignages (/témoignages)
- [x] 4.8 Créer la page Téléchargements/Archive numérique (/telechargements)
- [x] 4.9 Créer la page Méthode & Sources (/sources)
- [x] 4.10 Créer l'espace d'administration protégé (/admin)

### 5. Barre de menu latérale dépliable (Sidebar)
- [x] 5.1 Utiliser le composant Sidebar de shadcn/ui comme base
- [x] 5.2 Créer le SidebarProvider pour gérer l'état global
- [x] 5.3 Implémenter SidebarTrigger pour le bouton toggle
- [x] 5.4 Concevoir les items de navigation avec SidebarMenuItem
- [x] 5.5 Utiliser les icônes de lucide-react pour chaque section
- [x] 5.6 Configurer l'affichage conditionnel du texte (déplié/replié)
- [x] 5.7 Personnaliser les effets de survol avec les variants shadcn
- [x] 5.8 Implémenter les états actifs avec SidebarMenuButton
- [x] 5.9 Assurer la persistance de l'état avec useSidebar hook
- [x] 5.10 Rendre la sidebar responsive avec les breakpoints shadcn
- [x] 5.11 Gérer l'ajustement automatique du contenu principal avec SidebarInset

### 6. Système de thème clair/sombre
- [x] 6.1 Installer et configurer next-themes
- [x] 6.2 Créer le ThemeProvider dans le layout principal
- [x] 6.3 Utiliser le composant DropdownMenu de shadcn/ui pour le sélecteur de thème
- [x] 6.4 Créer 3 options de menu : Clair, Sombre, Système
- [x] 6.5 Intégrer le bouton de thème dans la sidebar avec des icônes (Sun, Moon, Monitor)
- [x] 6.6 Définir les variables CSS pour le mode clair dans globals.css
- [x] 6.7 Définir les variables CSS pour le mode sombre dans globals.css
- [x] 6.8 Configurer le mode système (détection automatique)
- [x] 6.9 Ajouter les transitions douces lors du changement de thème
- [x] 6.10 Assurer la persistance du choix de thème
- [x] 6.11 Éviter le flash de contenu non stylisé (FOUC) au chargement avec suppressHydrationWarning

### 7. Composants de navigation complémentaires
- [x] 7.1 Créer le Header avec le composant Sheet de shadcn/ui pour mobile
- [x] 7.2 Créer le Footer avec des Cards ou Separators shadcn/ui
- [x] 7.3 Utiliser le composant Sheet pour le menu mobile hamburger
- [x] 7.4 Implémenter le Breadcrumb avec le composant shadcn/ui
- [x] 7.5 Créer un overlay avec Sheet backdrop pour mobile

### 8. Design system et thème
- [x] 8.1 Définir la palette de couleurs familiale (mode clair) dans tailwind.config
- [x] 8.2 Définir la palette de couleurs pour le mode sombre dans tailwind.config
- [x] 8.3 Configurer la typographie (polices) avec Tailwind
- [x] 8.4 Personnaliser les composants shadcn/ui selon l'identité familiale
- [x] 8.5 Définir les espacements et la grille responsive avec Tailwind
- [x] 8.6 Utiliser les variants shadcn/ui pour les états interactifs (hover, active, focus)
- [x] 8.7 Définir les animations et transitions avec Tailwind/shadcn
- [x] 8.8 Configurer les breakpoints responsive dans tailwind.config
- [x] 8.9 Créer un guide de style visuel documentant l'utilisation de shadcn/ui

## Phase 3 : Gestion des Données

### 9. Modélisation des données
- [ ] 9.1 Définir le schéma pour les membres de la famille (avec liens généalogiques)
- [ ] 9.2 Définir le schéma pour les événements historiques (chronologie détaillée)
- [ ] 9.3 Définir le schéma pour les créations artistiques (musique, photos, peintures, vidéos, textes)
- [ ] 9.4 Définir le schéma pour les archives et documents (photos anciennes, vidéos INA, documents écrits)
- [ ] 9.5 Définir le schéma pour les témoignages et récits personnels
- [ ] 9.6 Définir le schéma pour les portraits des membres marquants
- [ ] 9.7 Définir le schéma pour les sources et méthodologie
- [ ] 9.8 Créer les types TypeScript correspondants pour toutes les entités

### 10. Configuration de la base de données (si Supabase)
- [ ] 10.1 Créer un projet Supabase
- [ ] 10.2 Créer les tables nécessaires
- [ ] 10.3 Configurer les politiques de sécurité (RLS)
- [ ] 10.4 Créer les fonctions d'API pour récupérer les données

### 11. Configuration du stockage médias
- [ ] 11.1 Configurer les dossiers/buckets pour les photos
- [ ] 11.2 Configurer les dossiers/buckets pour les vidéos
- [ ] 11.3 Configurer les dossiers/buckets pour l'audio
- [ ] 11.4 Mettre en place l'optimisation automatique des images
- [ ] 11.5 Tester l'upload et le chargement des médias

## Phase 4 : Fonctionnalités - Histoire Familiale

### 12. Page Histoire familiale - Structure chronologique
- [x] 12.1 Créer le layout principal avec Sidebar et navigation par période
- [x] 12.2 Créer la section "Les Origines" (date la plus ancienne connue)
- [x] 12.3 Créer la section "XIXᵉ siècle" avec événements et contexte
- [x] 12.4 Créer la section "XXᵉ siècle" (guerres, résistance, Colonel Rémy)
- [x] 12.5 Créer la section "Après-guerre → années 2000"
- [x] 12.6 Créer la section "Génération actuelle"
- [ ] 12.7 Implémenter une timeline animée horizontale avec scroll
- [x] 12.8 Créer des cartes d'événements avec Card et Badge shadcn/ui
- [ ] 12.9 Ajouter des filtres par période avec Select shadcn/ui
- [ ] 12.10 Intégrer des photos d'époque avec AspectRatio et Dialog pour zoom

### 13. Timeline interactive et carte géographique
- [ ] 13.1 Créer une timeline animée horizontale scrollable
- [ ] 13.2 Synchroniser la timeline avec le contenu affiché
- [ ] 13.3 Implémenter une carte interactive des déplacements familiaux (optionnel)
- [ ] 13.4 Intégrer des marqueurs géographiques avec Tooltip shadcn/ui
- [ ] 13.5 Permettre la navigation chronologique fluide

## Phase 5 : Fonctionnalités - Créations Artistiques

### 14. Page Créations artistiques - Structure principale
- [ ] 14.1 Créer le layout avec navigation par type de création
- [ ] 14.2 Créer le système de filtrage global avec Tabs shadcn/ui
- [ ] 14.3 Implémenter la recherche dans les créations avec Command
- [ ] 14.4 Ajouter un système de tags/catégories avec Badge

### 15. Section Musique
- [ ] 15.1 Créer un lecteur audio complet avec Card, Button et Slider shadcn/ui
- [ ] 15.2 Créer la playlist avec ScrollArea et Liste organisée
- [ ] 15.3 Afficher les métadonnées : titre, année, durée, beatmaker/producteur
- [ ] 15.4 Intégrer les lyrics/textes avec Accordion pour affichage/masquage
- [ ] 15.5 Ajouter les anecdotes et contexte personnel avec HoverCard
- [ ] 15.6 Organiser par sous-sections : Albums, Maquettes/Inédit, Archives anciennes
- [ ] 15.7 Permettre le téléchargement avec Button et Toast confirmation
- [ ] 15.8 Implémenter la lecture continue et gestion de playlist

### 16. Section Photographies (modernes et contemporaines)
- [ ] 16.1 Créer une galerie responsive avec Card et AspectRatio
- [ ] 16.2 Organiser par séries thématiques avec Tabs
- [ ] 16.3 Créer des pages projet photographique avec Carousel
- [ ] 16.4 Implémenter un lightbox avec Dialog plein écran
- [ ] 16.5 Ajouter les métadonnées photo (date, lieu, contexte) avec Popover
- [ ] 16.6 Permettre le téléchargement haute résolution

### 17. Section Peintures et Dessins
- [ ] 17.1 Créer une galerie avec Card pour chaque œuvre
- [ ] 17.2 Implémenter le zoom HD avec Dialog
- [ ] 17.3 Ajouter description et contexte créatif avec Accordion
- [ ] 17.4 Organiser par artiste avec Select filter
- [ ] 17.5 Afficher les dimensions et techniques avec Badge

### 18. Section Vidéos
- [ ] 18.1 Créer une galerie de vidéos avec Card et AspectRatio
- [ ] 18.2 Intégrer un lecteur vidéo dans Dialog
- [ ] 18.3 Organiser par type : courts métrages, captations, montages
- [ ] 18.4 Ajouter descriptions et crédits avec Accordion
- [ ] 18.5 Implémenter des vignettes preview avec hover effect

### 19. Section Textes
- [ ] 19.1 Créer une bibliothèque de textes avec Card
- [ ] 19.2 Organiser par type : poèmes, autobiographie, philosophie
- [ ] 19.3 Afficher les extraits avec possibilité de lecture complète
- [ ] 19.4 Intégrer les textes du futur livre autobiographique
- [ ] 19.5 Ajouter une fonction de recherche dans les textes
- [ ] 19.6 Permettre le téléchargement en PDF avec Button

## Phase 6 : Fonctionnalités - Archives & Documents

### 20. Page Archives - Structure principale
- [ ] 20.1 Créer le layout avec navigation par type de document
- [ ] 20.2 Implémenter un système de filtrage avec Tabs et Select shadcn/ui
- [ ] 20.3 Créer une recherche dans les archives avec Command
- [ ] 20.4 Ajouter des filtres par période, personne, type avec Checkbox

### 21. Section Photographies anciennes
- [ ] 21.1 Créer une galerie chronologique avec Card et AspectRatio
- [ ] 21.2 Implémenter le zoom haute résolution avec Dialog
- [ ] 21.3 Ajouter des légendes et dates avec Popover
- [ ] 21.4 Organiser par période, personnes, lieux avec Select filters
- [ ] 21.5 Permettre la comparaison avant/après restauration

### 22. Section Vidéos et Documents INA
- [ ] 22.1 Créer une section dédiée au Colonel Rémy avec Card
- [ ] 22.2 Intégrer le lecteur vidéo INA dans Dialog plein écran
- [ ] 22.3 Ajouter les métadonnées : date, durée, contexte avec Badge
- [ ] 22.4 Intégrer les transcriptions avec Accordion shadcn/ui
- [ ] 22.5 Contextualiser historiquement avec Timeline custom
- [ ] 22.6 Ajouter d'autres interviews familiales
- [ ] 22.7 Mentionner les sources et autorisations INA

### 23. Section Documents familiaux
- [ ] 23.1 Créer une bibliothèque de documents avec Card
- [ ] 23.2 Afficher les correspondances (lettres) avec Dialog pour lecture
- [ ] 23.3 Intégrer les actes officiels (naissance, mariage, décès)
- [ ] 23.4 Afficher journaux, carnets, notes manuscrites
- [ ] 23.5 Proposer reproductions HD + transcriptions avec Tabs
- [ ] 23.6 Permettre le téléchargement PDF avec Button

### 24. Timeline documentaire
- [ ] 24.1 Créer une vue chronologique globale de tous les documents
- [ ] 24.2 Implémenter le scroll horizontal ou vertical avec animation
- [ ] 24.3 Filtrer par type de document avec Select
- [ ] 24.4 Synchroniser avec la timeline de l'histoire familiale
- [ ] 24.5 Permettre le zoom sur chaque période

## Phase 7 : Arbre Généalogique

### 25. Visualisation de l'arbre
- [ ] 25.1 Choisir et intégrer une librairie d'arbre généalogique React
- [ ] 25.2 Créer les données de l'arbre familial avec relations
- [ ] 25.3 Implémenter la navigation interactive (zoom, pan, clic)
- [ ] 25.4 Ajouter des photos aux nœuds avec Avatar shadcn/ui
- [ ] 25.5 Permettre de cliquer sur un membre pour voir sa fiche détaillée
- [ ] 25.6 Afficher les liens de parenté avec HoverCard

### 26. Fonctionnalités avancées de généalogie
- [ ] 26.1 Ajouter la recherche par nom dans l'arbre avec Command
- [ ] 26.2 Implémenter différentes vues (descendance, ascendance, complète)
- [ ] 26.3 Permettre l'export de l'arbre en PDF haute qualité
- [ ] 26.4 Ajouter des statistiques familiales avec Card
- [ ] 26.5 Intégrer une version PDF statique téléchargeable

## Phase 8 : Portraits des Membres Marquants

### 27. Page Portraits - Structure
- [ ] 27.1 Créer le layout avec grille de portraits avec Card
- [ ] 27.2 Organiser par génération ou par importance
- [ ] 27.3 Filtrer par période ou rôle familial avec Select

### 28. Fiches individuelles détaillées
- [ ] 28.1 Créer le composant fiche membre avec Avatar et Card
- [ ] 28.2 Afficher photos avec Carousel pour galerie personnelle
- [ ] 28.3 Ajouter dates clés (naissance, décès, événements) avec Timeline
- [ ] 28.4 Intégrer biographie et contribution avec Accordion
- [ ] 28.5 Lier aux documents associés (lettres, photos, voix)
- [ ] 28.6 Créer fiche détaillée Colonel Rémy avec section spéciale
- [ ] 28.7 Afficher les relations familiales avec liens interactifs

## Phase 9 : Témoignages et Récits Personnels

### 29. Page Témoignages - Galerie de souvenirs
- [ ] 29.1 Créer le layout avec Card pour chaque témoignage
- [ ] 29.2 Permettre l'affichage par auteur ou par thème
- [ ] 29.3 Filtrer par période ou personne concernée avec Select

### 30. Contenu des témoignages
- [ ] 30.1 Afficher les souvenirs racontés avec Card et texte enrichi
- [ ] 30.2 Intégrer les anecdotes familiales avec Dialog pour lecture complète
- [ ] 30.3 Ajouter les textes écrits par différents membres
- [ ] 30.4 Intégrer des enregistrements audio avec lecteur personnalisé
- [ ] 30.5 Permettre les commentaires (optionnel) avec Textarea et Toast

## Phase 10 : Téléchargements et Archive Numérique

### 31. Page Téléchargements - Bibliothèque
- [ ] 31.1 Créer le layout avec Card pour chaque ressource
- [ ] 31.2 Organiser par type de contenu avec Tabs
- [ ] 31.3 Ajouter une recherche avec Input et filtres

### 32. Ressources téléchargeables
- [ ] 32.1 Proposer PDF des généalogies avec Button de téléchargement
- [ ] 32.2 Mettre à disposition documents restaurés en HD
- [ ] 32.3 Proposer albums photos numérisés par période
- [ ] 32.4 Permettre téléchargement des audios en différents formats
- [ ] 32.5 Proposer vidéos compressées pour téléchargement
- [ ] 32.6 Ajouter descriptions et tailles de fichiers avec Badge
- [ ] 32.7 Implémenter système de téléchargement groupé (zip)

## Phase 11 : Méthode & Sources

### 33. Page Sources - Transparence et crédibilité
- [ ] 33.1 Créer le layout avec sections claires
- [ ] 33.2 Documenter les sources des informations avec Card
- [ ] 33.3 Lister les documents officiels utilisés
- [ ] 33.4 Expliquer le travail d'archives avec Accordion
- [ ] 33.5 Détailler la méthodologie de recherche
- [ ] 33.6 Mentionner les autorisations (INA, archives publiques)
- [ ] 33.7 Ajouter une bibliographie avec liens externes
- [ ] 33.8 Créer une section remerciements

## Phase 12 : Optimisation et Performance

### 34. Optimisation des médias
### 34. Optimisation des médias
- [ ] 34.1 Implémenter le lazy loading pour les images
- [ ] 34.2 Optimiser le chargement des vidéos (streaming adaptatif)
- [ ] 34.3 Compresser les fichiers audio
- [ ] 34.4 Utiliser les formats modernes (WebP, AVIF pour images)
- [ ] 34.5 Implémenter le prefetching pour les pages importantes

### 35. Performance générale
- [ ] 35.1 Analyser les performances avec Lighthouse
- [ ] 35.2 Optimiser le temps de chargement initial
- [ ] 35.3 Mettre en cache les données statiques
- [ ] 35.4 Minimiser la taille des bundles JavaScript
- [ ] 35.5 Implémenter le Server-Side Rendering où nécessaire

## Phase 13 : Espace d'Administration

### 36. Authentification et sécurité
- [ ] 36.1 Implémenter l'authentification avec Form et Input shadcn/ui
- [ ] 36.2 Configurer Supabase Auth pour la protection
- [ ] 36.3 Créer des niveaux d'accès (admin, famille, public)
- [ ] 36.4 Protéger les routes avec middleware Next.js
- [ ] 36.5 Ajouter la gestion des sessions

### 37. Gestion des médias
- [ ] 37.1 Créer l'interface d'upload avec Input file et Progress
- [ ] 37.2 Implémenter le drag & drop pour les fichiers
- [ ] 37.3 Gérer les métadonnées lors de l'upload
- [ ] 37.4 Créer une bibliothèque de médias avec Card et filters
- [ ] 37.5 Permettre l'édition des métadonnées avec Dialog et Form

### 38. Base de données des œuvres
- [ ] 38.1 Créer l'interface CRUD pour les créations artistiques
- [ ] 38.2 Gérer les catégories et tags avec Select et Badge
- [ ] 38.3 Permettre l'association de médias aux œuvres

### 39. Édition du contenu
- [ ] 39.1 Implémenter un éditeur riche pour les textes
- [ ] 39.2 Permettre l'édition des pages statiques
- [ ] 39.3 Gérer les témoignages et commentaires
- [ ] 39.4 Créer un système de preview avant publication
- [ ] 39.5 Ajouter la gestion des versions (optionnel)

## Phase 14 : Fonctionnalités Additionnelles

### 40. Recherche globale
### 40. Recherche globale
- [ ] 40.1 Implémenter une barre de recherche avec Input et Command shadcn/ui
- [ ] 40.2 Indexer tous les contenus (personnes, événements, créations, documents)
- [ ] 40.3 Créer la page de résultats avec Card pour chaque résultat
- [ ] 40.4 Ajouter des suggestions avec Command palette shadcn/ui
- [ ] 40.5 Filtrer les résultats par type de contenu

### 41. Fonctionnalités sociales (optionnel)
- [ ] 41.1 Ajouter un système de commentaires avec Textarea et Button shadcn/ui
- [ ] 41.2 Permettre le partage sur réseaux sociaux avec DropdownMenu et Toast
- [ ] 41.3 Créer un espace "Souvenirs" collaboratif avec Card et Dialog
- [ ] 41.4 Ajouter un livre d'or familial avec Form, Textarea et Toast shadcn/ui
- [ ] 41.5 Permettre aux membres d'ajouter leurs propres témoignages

## Phase 15 : Contenu et Migration

## Phase 15 : Contenu et Migration

### 42. Préparation du contenu
- [ ] 42.1 Numériser toutes les photos familiales par période
- [ ] 42.2 Organiser les fichiers par catégorie (histoire, archives, créations)
- [ ] 42.3 Rédiger les textes historiques pour chaque période
- [ ] 42.4 Collecter les métadonnées (dates, lieux, personnes, contextes)
- [ ] 42.5 Obtenir les droits pour les archives INA
- [ ] 42.6 Préparer les biographies des membres marquants
- [ ] 42.7 Compiler les témoignages et anecdotes familiales
- [ ] 42.8 Organiser les créations artistiques par type et période
- [ ] 42.9 Rassembler les documents sources et références

### 43. Import du contenu
- [ ] 43.1 Uploader toutes les photos sur le service de stockage
- [ ] 43.2 Uploader toutes les vidéos (INA et archives familiales)
- [ ] 43.3 Uploader tous les fichiers audio (musiques et témoignages)
- [ ] 43.4 Uploader les documents numérisés (lettres, actes, manuscrits)
- [ ] 43.5 Renseigner la base de données avec toutes les informations
- [ ] 43.6 Créer les fiches de tous les membres de la famille
- [ ] 43.7 Importer les événements chronologiques
- [ ] 43.8 Importer toutes les créations artistiques avec métadonnées
- [ ] 43.9 Vérifier l'affichage de chaque contenu sur le site

## Phase 16 : Tests et Qualité

## Phase 16 : Tests et Qualité

### 44. Tests fonctionnels
- [ ] 44.1 Tester la navigation sur toutes les pages
- [ ] 44.2 Tester le chargement des médias (photos, vidéos, audio)
- [ ] 44.3 Tester les lecteurs audio et vidéo
- [ ] 44.4 Tester les interactions (filtres, recherche, timelines)
- [ ] 44.5 Tester l'arbre généalogique interactif
- [ ] 44.6 Tester le dépliage/repliage de la sidebar sur tous devices
- [ ] 44.7 Tester le changement de thème clair/sombre/système
- [ ] 44.8 Tester l'authentification et l'espace admin
- [ ] 44.9 Tester les formulaires (témoignages, commentaires)
- [ ] 44.10 Tester les téléchargements de fichiers

### 45. Tests de compatibilité
- [ ] 45.1 Tester sur Chrome, Firefox, Safari, Edge
- [ ] 45.2 Tester sur mobile (iOS et Android)
- [ ] 45.3 Tester sur tablette
- [ ] 45.4 Vérifier l'accessibilité (WCAG) pour tous les contenus
- [ ] 45.5 Tester avec différentes tailles d'écran
- [ ] 45.6 Vérifier la sidebar en mode portrait et paysage
- [ ] 45.7 Tester la navigation au clavier

### 46. Tests de performance
- [ ] 46.1 Mesurer le temps de chargement de chaque page
- [ ] 46.2 Vérifier le poids total des pages
- [ ] 46.3 Tester avec une connexion lente
- [ ] 46.4 Optimiser les métriques Core Web Vitals
- [ ] 46.5 Vérifier le lazy loading des images et vidéos
- [ ] 46.6 Tester la performance de la recherche globale

## Phase 17 : SEO et Découvrabilité

## Phase 17 : SEO et Découvrabilité

### 47. Optimisation SEO
- [ ] 47.1 Ajouter les métadonnées (title, description) sur chaque page
- [ ] 47.2 Créer un fichier sitemap.xml complet
- [ ] 47.3 Configurer le fichier robots.txt
- [ ] 47.4 Ajouter les balises Open Graph pour le partage social
- [ ] 47.5 Implémenter les données structurées (Schema.org) pour les personnes et événements
- [ ] 47.6 Optimiser les URLs pour le SEO
- [ ] 47.7 Ajouter des alt texts descriptifs à toutes les images

### 48. Analytics
- [ ] 48.1 Configurer Google Analytics ou alternative (Plausible)
- [ ] 48.2 Mettre en place le suivi des événements importants
- [ ] 48.3 Créer un tableau de bord de métriques
- [ ] 48.4 Suivre les pages les plus visitées
- [ ] 48.5 Analyser les parcours utilisateurs

## Phase 18 : Documentation et Maintenance

### 49. Documentation technique
- [ ] 49.1 Rédiger un README complet avec architecture du projet
- [ ] 49.2 Documenter l'architecture et les choix techniques
- [ ] 49.3 Créer un guide de contribution pour la famille
- [ ] 49.4 Documenter les variables d'environnement
- [ ] 49.5 Créer un guide de déploiement
- [ ] 49.6 Documenter la structure de la base de données
- [ ] 49.7 Créer un schéma visuel de l'architecture

### 50. Documentation utilisateur
- [ ] 50.1 Créer un guide d'administration de l'espace admin
- [ ] 50.2 Documenter comment ajouter du contenu (photos, vidéos, textes)
- [ ] 50.3 Créer une FAQ pour les utilisateurs
- [ ] 50.4 Rédiger un guide de maintenance
- [ ] 50.5 Expliquer comment contribuer (témoignages, commentaires)
- [ ] 50.6 Documenter la gestion des droits et permissions

### 51. Sauvegarde et sécurité
- [ ] 51.1 Mettre en place des sauvegardes automatiques de la base de données
- [ ] 51.2 Configurer les certificats SSL (HTTPS)
- [ ] 51.3 Sécuriser les endpoints API
- [ ] 51.4 Mettre en place un système de monitoring (Uptime)
- [ ] 51.5 Configurer les sauvegardes des médias
- [ ] 51.6 Tester les procédures de restauration

## Phase 19 : Lancement

### 52. Préparation au lancement
- [ ] 52.1 Effectuer une revue complète du site (contenu et fonctionnalités)
- [ ] 52.2 Corriger tous les bugs identifiés
- [ ] 52.3 Vérifier tous les liens internes et externes
- [ ] 52.4 Optimiser les derniers détails visuels
- [ ] 52.5 Préparer une annonce de lancement pour la famille
- [ ] 52.6 Créer un tutoriel de visite guidée du site
- [ ] 52.7 Préparer des contenus de présentation (captures d'écran, vidéo)

### 53. Lancement et promotion
- [ ] 53.1 Configurer le nom de domaine personnalisé
- [ ] 53.2 Déployer la version finale en production
- [ ] 53.3 Annoncer le site à la famille
- [ ] 53.4 Organiser une présentation en ligne ou en personne
- [ ] 53.5 Recueillir les premiers retours
- [ ] 53.6 Planifier les mises à jour futures
- [ ] 53.7 Créer un calendrier éditorial pour les ajouts

## Phase 20 : Évolution Continue

### 54. Améliorations futures (post-lancement)
- [ ] 54.1 Analyser les statistiques d'utilisation
- [ ] 54.2 Implémenter les fonctionnalités demandées par la famille
- [ ] 54.3 Ajouter régulièrement du nouveau contenu
- [ ] 54.4 Maintenir les dépendances à jour
- [ ] 54.5 Optimiser continuellement les performances
- [ ] 54.6 Enrichir les sections existantes
- [ ] 54.7 Développer de nouvelles fonctionnalités selon les besoins
- [ ] 54.8 Organiser des événements de contribution familiale

---

## Notes d'implémentation

### État d'avancement - Phase 2

**Tâches complétées :**
- ✅ **Tâche 8** : Design system et thème - **100% complétée**
  - Palette de couleurs familiale DECKER complète (Gamboge, Tangerine, Cinnabar, Oxford Blue, Cambridge Blue)
  - Nuances 50-900 pour chaque couleur avec support du mode sombre
  - Couleurs sémantiques (heritage, warmth, creativity, legacy, nature)
  - Configuration typographique (Geist Sans, Geist Mono, Georgia)
  - Échelle fontSize avec lineHeight optimisée
  - Espacements personnalisés (18, 88, 100, 112, 128)
  - Breakpoints responsive avec ajout du breakpoint 3xl (1920px)
  - Animations : fade-in/out, slide-in (4 directions), scale-in, shimmer
  - Timing functions personnalisées : bounce-in, smooth
  - Guide de style visuel complet (STYLE_GUIDE.md) avec exemples et patterns


- ✅ **Tâche 5** : Barre de menu latérale dépliable (Sidebar) - **100% complétée**
  - Sidebar organisée en groupes de navigation (Navigation, Exploration, Ressources)
  - Sous-menus expandables pour "Histoire familiale" et "Créations artistiques"
  - Profil utilisateur dans le footer avec avatar, nom et email
  - Header avec logo DECKER et dropdown
  - Mode replié/déplié fonctionnel avec `collapsible="icon"`
  
- ✅ **Tâche 6** : Système de thème clair/sombre - **100% complétée**
  - Thème intégré dans le menu utilisateur du footer
  - Support des modes Clair, Sombre et Système
  - Variables CSS configurées pour les deux modes
  - Persistance du choix utilisateur

- ✅ **Tâche 7.2** : Footer avec Cards et Separators - **100% complétée**
  - Composant `SiteFooter` créé avec 3 colonnes (À propos, Navigation, Sources & Contact)
  - Utilisation de Card, Separator et icônes lucide-react
  - Design responsive et intégration dans le layout principal

- ✅ **Tâche 7.4** : Breadcrumb avec shadcn/ui - **100% complétée**
  - Composant `HistoireBreadcrumb` créé avec navigation dynamique
  - Breadcrumb adaptatif selon la page (2 ou 3 niveaux)
  - Intégration dans le layout `/histoire`

**Fonctionnalités supplémentaires implémentées :**
- Navigation organisée en groupes logiques avec labels
- Sous-menus expandables avec animation (Collapsible)
- Profil utilisateur complet avec dropdown (Paramètres, Thème, Déconnexion)
- Style épuré correspondant au design moderne (fond blanc, texte sombre, bordures subtiles)

### État d'avancement - Phase 4

**Tâches complétées :**
- ✅ **Tâche 12** : Page Histoire familiale - Structure chronologique - **80% complétée**
  - ✅ Layout principal créé (`app/histoire/layout.tsx`) avec Breadcrumb dynamique et SectionHeader
  - ✅ Composant `SectionHeader` réutilisable créé avec props title, description, icon
  - ✅ Page index (`app/histoire/page.tsx`) avec grille responsive de Cards pour les 5 périodes
  - ✅ Section "Les Origines" (`app/histoire/origines/page.tsx`) créée
  - ✅ Section "XIXᵉ siècle" (`app/histoire/xixe/page.tsx`) créée
  - ✅ Section "XXᵉ siècle" (`app/histoire/xxe/page.tsx`) créée avec mention Colonel Rémy
  - ✅ Section "Après-guerre → 2000" (`app/histoire/apres-guerre/page.tsx`) créée
  - ✅ Section "Génération actuelle" (`app/histoire/actuelle/page.tsx`) créée
  - ✅ Cartes d'événements avec Card et Badge shadcn/ui implémentées
  - ⏳ Timeline animée horizontale (à venir)
  - ⏳ Filtres par période (à venir)
  - ⏳ Intégration photos d'époque (à venir)

**Architecture implémentée :**
- Layout serveur avec composants client séparés (`HistoireBreadcrumb`, `HistoireHeader`)
- Breadcrumb dynamique basé sur `usePathname()` pour navigation contextuelle
- Grille responsive Cards (md:grid-cols-2 lg:grid-cols-3) pour la page index
- Structure modulaire avec composants réutilisables (SectionHeader)
- URLs alignées avec la sidebar (`/histoire/xixe`, `/histoire/xxe`, `/histoire/actuelle`)

### Spécifications détaillées de la Sidebar

**Utilisation du composant Sidebar de shadcn/ui :**

**Installation :**
```bash
npx shadcn@latest add sidebar
```

**Structure de base :**
- `SidebarProvider` : Wrapper principal qui gère l'état
- `Sidebar` : Composant principal de la sidebar
- `SidebarHeader` : En-tête avec logo/titre
- `SidebarContent` : Contenu scrollable
- `SidebarGroup` : Groupe de navigation
- `SidebarGroupLabel` : Label de groupe (optionnel)
- `SidebarMenu` : Liste de navigation
- `SidebarMenuItem` : Item de menu individuel
- `SidebarMenuButton` : Bouton interactif avec icône et texte
- `SidebarFooter` : Footer avec bouton thème
- `SidebarTrigger` : Bouton toggle (hamburger)
- `SidebarInset` : Conteneur pour le contenu principal

**Design et comportement :**
- **État déplié** : `--sidebar-width` par défaut ~16rem (256px)
- **État replié** : `--sidebar-width-icon` par défaut ~3rem (48px)
- **Transition** : Animation fluide automatique avec data-state
- **Position** : Fixe à gauche, géré par le composant

**Éléments de la sidebar (implémentés) :**
1. **SidebarHeader** : Logo DECKER avec Building2 icon et dropdown
2. **SidebarTrigger** : Bouton pour déplier/replier dans le header principal (icône PanelLeft)
3. **SidebarContent avec SidebarMenu organisé en groupes** :
   - **Groupe "Navigation"** :
     - Accueil (Home icon)
     - Histoire familiale (BookOpen) - avec sous-menu expandable
     - Archives & Documents (Archive)
     - Créations artistiques (Palette) - avec sous-menu expandable
   - **Groupe "Exploration"** :
     - Portraits (Users)
     - Arbre généalogique (Network)
     - Témoignages (MessageSquare)
   - **Groupe "Ressources"** :
     - Téléchargements (Download)
     - Méthode & Sources (FileText)
4. **SidebarFooter** : Profil utilisateur avec Avatar, nom "Famille DECKER", email "famille@decker.fr" et dropdown menu (Paramètres, Thème, Déconnexion)

**Composants shadcn/ui nécessaires (installés) :**
- `Button` : Pour les actions
- `DropdownMenu` : Pour le sélecteur de thème et le menu utilisateur
- `Separator` : Pour diviser les sections
- `Tooltip` : Pour les labels en mode replié
- `ScrollArea` : Pour le contenu scrollable
- `Collapsible` : Pour les sous-menus expandables
- `Avatar` : Pour le profil utilisateur dans le footer

**États interactifs (gérés automatiquement) :**
- **Hover** : `data-[active=true]` et variants
- **Active/Sélectionné** : Utiliser `isActive` prop sur SidebarMenuButton
- **Focus** : Gestion automatique de l'accessibilité

**Responsive (géré par shadcn/ui) :**
- **Desktop** : Sidebar visible, collapsible
- **Mobile** : Utilise Sheet component pour overlay
- Breakpoint par défaut : md (768px)

**Personnalisation CSS :**
```css
:root {
  --sidebar-background: theme(colors.background);
  --sidebar-foreground: theme(colors.foreground);
  --sidebar-border: theme(colors.border);
  --sidebar-width: 16rem;
  --sidebar-width-icon: 3rem;
}
```

**Librairies et dépendances :**
- `lucide-react` : Pour toutes les icônes
- `next-themes` : Pour la gestion du thème
- `class-variance-authority` : Pour les variants (inclus avec shadcn)
- shadcn/ui hooks : `useSidebar()` pour l'état

**Hook useSidebar() :**
```typescript
const {
  state, // "expanded" | "collapsed"
  open,
  setOpen,
  openMobile,
  setOpenMobile,
  isMobile,
  toggleSidebar,
} = useSidebar()
```

**Persistance (implémentée) :**
- État de la sidebar sauvegardé automatiquement via useSidebar (cookie)
- Préférence de thème via next-themes (localStorage)
- État des sous-menus expandables géré avec useState (local au composant)

### Liste complète des composants shadcn/ui à installer

**Composants de base (installés) :**
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add avatar  # ✅ Installé
npx shadcn@latest add separator
npx shadcn@latest add skeleton
npx shadcn@latest add scroll-area
npx shadcn@latest add aspect-ratio
```

**Navigation (installés) :**
```bash
npx shadcn@latest add sidebar  # ✅ Installé
npx shadcn@latest add breadcrumb
npx shadcn@latest add navigation-menu
npx shadcn@latest add tabs  # ✅ Installé
```

**Formulaires :**
```bash
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add switch
npx shadcn@latest add form
npx shadcn@latest add label
```

**Overlays et feedback (installés) :**
```bash
npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add popover
npx shadcn@latest add tooltip
npx shadcn@latest add hover-card
npx shadcn@latest add alert
npx shadcn@latest add toast
npx shadcn@latest add progress
npx shadcn@latest add collapsible  # ✅ Installé pour les sous-menus expandables
```

**Médias et affichage :**
```bash
npx shadcn@latest add carousel
npx shadcn@latest add accordion
npx shadcn@latest add command
```

**Menu et sélection :**
```bash
npx shadcn@latest add dropdown-menu
npx shadcn@latest add context-menu
```

**Note :** Installer les composants au fur et à mesure des besoins pour éviter de surcharger le projet.

### Priorités suggérées
1. **Critique** : Tâches 1-11, 42-43 (infrastructure, sidebar, thème et contenu de base)
2. **Haute** : Tâches 12-24, 44-46 (histoire familiale, archives, créations artistiques et tests)
3. **Moyenne** : Tâches 25-41, 47-51 (arbre, portraits, témoignages, administration et documentation)
4. **Basse** : Tâches 52-54 (lancement et améliorations continues)

### Estimation temporelle indicative
- Phase 1-3 : 1-2 semaines (configuration et infrastructure)
- Phase 4-6 : 6-8 semaines (histoire, créations, archives - sections principales)
- Phase 7-11 : 4-6 semaines (arbre, portraits, témoignages, sources, méthode)
- Phase 12-13 : 2-3 semaines (optimisation et administration)
- Phase 14 : 1-2 semaines (fonctionnalités additionnelles)
- Phase 15 : 3-6 semaines (préparation et import du contenu - variable selon volume)
- Phase 16-18 : 3-4 semaines (tests, SEO, documentation)
- Phase 19-20 : 1-2 semaines (lancement et suivi)

**Total estimé : 21-33 semaines** (5-8 mois selon disponibilité et volume de contenu)

### Conseil
Il est recommandé de suivre l'ordre des phases, mais certaines tâches peuvent être parallélisées :
- La préparation du contenu (Phase 15) peut commencer dès le début du projet
- Les textes historiques peuvent être rédigés pendant le développement
- La numérisation des archives peut se faire en continu
- L'organisation généalogique peut être faite en amont

### Structure du contenu à préparer en parallèle

**Histoire familiale :**
- Textes pour chaque période (Origines, XIXᵉ, XXᵉ, Après-guerre, Aujourd'hui)
- Photos d'archives numérisées et datées
- Événements clés avec dates précises

**Archives & Documents :**
- Photos anciennes restaurées avec légendes
- Vidéos INA du Colonel Rémy avec contexte
- Documents manuscrits numérisés avec transcriptions
- Timeline documentaire complète

**Créations artistiques :**
- Musiques avec métadonnées complètes (titre, année, durée, beatmaker, lyrics, anecdotes)
- Photos artistiques organisées par séries thématiques
- Peintures et dessins scannés en HD
- Vidéos avec descriptions et crédits
- Textes (poèmes, autobiographie, philosophie)

**Portraits des membres :**
- Liste des membres marquants avec biographies
- Photos de qualité pour chaque membre
- Dates clés et contributions
- Documents associés (lettres, témoignages)

**Témoignages :**
- Souvenirs et anecdotes familiales collectés
- Enregistrements audio de témoignages
- Textes rédigés par différents membres

**Sources et références :**
- Liste complète des sources documentaires
- Autorisations (INA, archives publiques)
- Méthodologie de recherche documentée
