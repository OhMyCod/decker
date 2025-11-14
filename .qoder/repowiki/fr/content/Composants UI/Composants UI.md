# Composants UI

<cite>
**Fichiers référencés dans ce document**  
- [button.tsx](file://components/ui/button.tsx)
- [card.tsx](file://components/ui/card.tsx)
- [input.tsx](file://components/ui/input.tsx)
- [alert.tsx](file://components/ui/alert.tsx)
- [badge.tsx](file://components/ui/badge.tsx)
- [dialog.tsx](file://components/ui/dialog.tsx)
- [select.tsx](file://components/ui/select.tsx)
- [checkbox.tsx](file://components/ui/checkbox.tsx)
- [switch.tsx](file://components/ui/switch.tsx)
- [navigation-menu.tsx](file://components/ui/navigation-menu.tsx)
- [avatar.tsx](file://components/ui/avatar.tsx)
- [breadcrumb.tsx](file://components/ui/breadcrumb.tsx)
- [carousel.tsx](file://components/ui/carousel.tsx)
- [dropdown-menu.tsx](file://components/ui/dropdown-menu.tsx)
- [sheet.tsx](file://components/ui/sheet.tsx)
</cite>

## Table des matières
1. [Introduction](#introduction)
2. [Composants de base](#composants-de-base)
   - [Bouton](#bouton)
   - [Entrée](#entrée)
   - [Badge](#badge)
   - [Case à cocher](#case-à-cocher)
   - [Interrupteur](#interrupteur)
3. [Composants de présentation](#composants-de-présentation)
   - [Carte](#carte)
   - [Alerte](#alerte)
   - [Avatar](#avatar)
   - [Fil d'Ariane](#fil-dariane)
4. [Composants de navigation](#composants-de-navigation)
   - [Menu déroulant](#menu-déroulant)
   - [Menu de navigation](#menu-de-navigation)
   - [Carrousel](#carrousel)
5. [Composants modaux](#composants-modaux)
   - [Dialogue](#dialogue)
   - [Tiroir latéral (Sheet)](#tiroir-latéral-sheet)
6. [Sélecteurs](#sélecteurs)
   - [Sélecteur](#sélecteur)
7. [Accessibilité et normes](#accessibilité-et-normes)
8. [Conception responsive](#conception-responsive)
9. [Personnalisation du thème](#personnalisation-du-thème)
10. [Intégration et composition](#intégration-et-composition)

## Introduction

Ce document fournit une documentation détaillée des composants UI du projet Decker basés sur shadcn/ui. Chaque composant est décrit en termes d'apparence, de comportement, d'interactions utilisateur, de props, d'événements, d'options de personnalisation, et de conformité aux normes d'accessibilité. L'objectif est de fournir un guide complet pour l'utilisation, la personnalisation et l'intégration de ces composants dans des interfaces utilisateur modernes.

**Section sources**
- [button.tsx](file://components/ui/button.tsx#L1-L58)
- [card.tsx](file://components/ui/card.tsx#L1-L77)

## Composants de base

### Bouton

Le composant **Button** est un élément interactif fondamental qui permet aux utilisateurs d'effectuer des actions. Il supporte plusieurs variantes visuelles et tailles, et est entièrement accessible.

**Apparence et comportement**  
Le bouton dispose de styles prédéfinis pour différents contextes d'utilisation : par défaut, destructeur, contour, secondaire, fantôme et lien. Chaque variante change la couleur de fond, de texte et d'interaction. Le bouton applique une transition fluide au survol et désactive les interactions lorsque l'attribut `disabled` est activé.

**Props**  
- `variant`: Contrôle l'apparence du bouton (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`)
- `size`: Définit la taille (`default`, `sm`, `lg`, `icon`)
- `asChild`: Permet de rendre un élément enfant comme racine du bouton via `Slot` de Radix UI
- Hérite de toutes les propriétés HTML d'un élément `button`

**Interactions**  
- Changement de couleur au survol
- Animation de focus avec anneau de contour
- Désactivation visuelle et fonctionnelle lorsque `disabled`

**Accessibilité**  
- Gestion automatique du focus
- Support du clavier (espace/entrée pour activer)
- Rôle ARIA implicite de `button`

**Section sources**
- [button.tsx](file://components/ui/button.tsx#L7-L58)

### Entrée

Le composant **Input** permet la saisie de texte par l'utilisateur avec une mise en forme cohérente et une accessibilité intégrée.

**Apparence et comportement**  
L'entrée est stylisée avec une bordure, une ombre subtile et un remplissage uniforme. Elle inclut un style spécial pour les états focus, disabled et pour les placeholders. Supporte tous les types d'input HTML (`text`, `email`, `password`, etc.).

**Props**  
- Hérite de toutes les propriétés d'un élément `input` HTML
- Applique automatiquement des classes utilitaires pour l'apparence

**Interactions**  
- Mise en évidence au focus avec un anneau coloré
- Curseur non autorisé à l'état disabled
- Opacité réduite à l'état disabled

**Accessibilité**  
- Compatible avec les lecteurs d'écran
- Support du clavier complet
- Étiquettes associées recommandées via `aria-label` ou `label`

**Section sources**
- [input.tsx](file://components/ui/input.tsx#L5-L23)

### Badge

Le **Badge** est un composant d'étiquette utilisé pour afficher des informations secondaires comme des statuts ou des catégories.

**Apparence et comportement**  
Les badges sont de petite taille avec des coins arrondis et une bordure. Ils existent en plusieurs variantes : par défaut, secondaire, destructeur et contour. Chaque variante a une couleur de fond et de texte distincte.

**Props**  
- `variant`: `default`, `secondary`, `destructive`, `outline`
- Supporte les classes CSS personnalisées via `className`

**Interactions**  
- Changement de couleur au survol pour les variantes avec fond
- Aucune interaction pour la variante `outline`

**Accessibilité**  
- Utilise une `div` avec des rôles ARIA appropriés selon le contexte
- Doit être utilisé avec du texte descriptif

**Section sources**
- [badge.tsx](file://components/ui/badge.tsx#L6-L37)

### Case à cocher

Le composant **Checkbox** permet aux utilisateurs de sélectionner une ou plusieurs options dans une liste.

**Apparence et comportement**  
La case à cocher est un carré avec une bordure et un indicateur de coche lorsqu'elle est activée. L'état visuel change selon que la case est cochée, décochée ou désactivée.

**Props**  
- Hérite de toutes les propriétés de `CheckboxPrimitive.Root` de Radix UI
- Supporte `checked`, `onCheckedChange`, etc.

**Interactions**  
- Animation fluide lors de la transition entre états
- Indicateur de coche visible uniquement à l'état activé
- Effet de survol et focus

**Accessibilité**  
- Plein support ARIA
- Navigation au clavier
- Étiquette requise pour l'accessibilité

**Section sources**
- [checkbox.tsx](file://components/ui/checkbox.tsx#L9-L31)

### Interrupteur

L'**Interrupteur** (Switch) est un contrôle binaire qui permet d'activer ou désactiver une option, similaire à un bouton bascule.

**Apparence et comportement**  
Il consiste en une barre avec un thumb qui se déplace horizontalement. Le fond change de couleur selon l'état (activé/désactivé). Le thumb se déplace avec une animation fluide.

**Props**  
- Hérite des propriétés de `SwitchPrimitives.Root`
- Supporte `checked` et `onCheckedChange`

**Interactions**  
- Animation de translation du thumb
- Changement de couleur de fond
- Support du clic et du clavier

**Accessibilité**  
- Rôle ARIA `switch`
- Support du clavier (espace pour basculer)
- Étiquette requise

**Section sources**
- [switch.tsx](file://components/ui/switch.tsx#L8-L30)

## Composants de présentation

### Carte

La **Carte** est un conteneur flexible utilisé pour regrouper du contenu connexe comme du texte, des images ou des actions.

**Structure**  
Composée de plusieurs sous-composants :
- `Card`: Conteneur principal
- `CardHeader`: En-tête avec titre et description
- `CardTitle`: Titre de la carte
- `CardDescription`: Description sous le titre
- `CardContent`: Contenu principal
- `CardFooter`: Pied de page optionnel

**Apparence**  
Coins arrondis, ombre portée, bordure subtile. Utilise un fond personnalisé selon le thème.

**Props**  
- Chaque sous-composant accepte `className` et propriétés HTML standard
- Aucune prop spécifique, entièrement contrôlé par le style

**Accessibilité**  
- Structure sémantique avec `div` appropriés
- Doit être utilisée avec des titres hiérarchisés

**Section sources**
- [card.tsx](file://components/ui/card.tsx#L5-L77)

### Alerte

L'**Alerte** est utilisée pour afficher des messages importants à l'utilisateur, comme des erreurs, des succès ou des informations.

**Variantes**  
- `default`: Pour les messages informatifs
- `destructive`: Pour les erreurs ou avertissements

**Structure**  
- `Alert`: Conteneur principal avec rôle `alert`
- `AlertTitle`: Titre en gras
- `AlertDescription`: Texte décrivant l'alerte

**Apparence**  
Inclut un espace pour une icône (à gauche), avec un style distinct pour chaque variante. Bordure subtile et coins arrondis.

**Accessibilité**  
- Rôle ARIA `alert` pour une lecture immédiate par les lecteurs d'écran
- Supporte les icônes avec `sr-only` pour l'accessibilité

**Section sources**
- [alert.tsx](file://components/ui/alert.tsx#L6-L60)

### Avatar

L'**Avatar** affiche une image ou une initiale représentant un utilisateur.

**Sous-composants**  
- `Avatar`: Conteneur circulaire
- `AvatarImage`: Image de l'utilisateur
- `AvatarFallback`: Texte alternatif (initiales) si l'image ne charge pas

**Apparence**  
Forme circulaire par défaut, avec un fond de secours. L'image conserve un ratio 1:1.

**Props**  
- Supporte les événements et attributs HTML standard
- `AvatarImage` accepte `src`, `alt`, etc.

**Accessibilité**  
- `alt` requis sur `AvatarImage`
- `AvatarFallback` inclut un texte sémantique

**Section sources**
- [avatar.tsx](file://components/ui/avatar.tsx#L8-L51)

### Fil d'Ariane

Le **Fil d'Ariane** (Breadcrumb) montre la hiérarchie de navigation de l'utilisateur dans l'application.

**Structure**  
- `Breadcrumb`: Conteneur avec `aria-label="breadcrumb"`
- `BreadcrumbList`: Liste non ordonnée
- `BreadcrumbItem`: Élément de la liste
- `BreadcrumbLink`: Lien vers une page précédente
- `BreadcrumbPage`: Page actuelle (non cliquable)
- `BreadcrumbSeparator`: Séparateur visuel (flèche)
- `BreadcrumbEllipsis`: Pour les chemins longs

**Accessibilité**  
- Structure ARIA correcte
- Page actuelle marquée avec `aria-current="page"`
- Séparateurs masqués aux lecteurs d'écran (`aria-hidden`)

**Section sources**
- [breadcrumb.tsx](file://components/ui/breadcrumb.tsx#L7-L116)

## Composants de navigation

### Menu déroulant

Le **Menu déroulant** affiche une liste d'options lorsqu'un élément déclencheur est activé.

**Fonctionnalités**  
- Supporte des sous-menus imbriqués
- Groupes d'éléments
- Éléments à cocher et radio
- Raccourcis clavier
- Séparateurs

**Sous-composants**  
- `DropdownMenuTrigger`: Élément qui ouvre le menu
- `DropdownMenuContent`: Contenu du menu
- `DropdownMenuItem`: Élément cliquable
- `DropdownMenuCheckboxItem`: Élément avec case à cocher
- `DropdownMenuRadioItem`: Élément de sélection unique
- `DropdownMenuLabel`: Titre de section
- `DropdownMenuSeparator`: Ligne de séparation
- `DropdownMenuShortcut`: Affiche un raccourci clavier

**Accessibilité**  
- Navigation au clavier complète (flèches, échap, entrée)
- Rôles ARIA appropriés
- Gestion du focus

**Section sources**
- [dropdown-menu.tsx](file://components/ui/dropdown-menu.tsx#L9-L202)

### Menu de navigation

Le **Menu de navigation** est conçu pour les barres de navigation complexes avec des sous-menus déroulants.

**Fonctionnalités**  
- Navigation horizontale avec animations
- Sous-menus positionnés dynamiquement
- Indicateur de position
- Supporte les raccourcis clavier

**Sous-composants**  
- `NavigationMenu`: Conteneur racine
- `NavigationMenuList`: Liste des éléments
- `NavigationMenuItem`: Élément du menu
- `NavigationMenuTrigger`: Déclencheur du sous-menu
- `NavigationMenuContent`: Contenu du sous-menu
- `NavigationMenuLink`: Lien direct
- `NavigationMenuViewport`: Zone d'affichage du contenu

**Accessibilité**  
- Supporte les raccourcis clavier (tab, flèches)
- Rôles ARIA pour la navigation
- Gestion du focus

**Section sources**
- [navigation-menu.tsx](file://components/ui/navigation-menu.tsx#L8-L129)

### Carrousel

Le **Carrousel** permet de naviguer entre plusieurs éléments en glissant ou avec des boutons de navigation.

**Fonctionnalités**  
- Navigation horizontale ou verticale
- Boutons précédent/suivant
- Navigation au clavier (flèches gauche/droite)
- Support tactile
- Indicateurs d'état

**Sous-composants**  
- `Carousel`: Conteneur principal avec contexte
- `CarouselContent`: Conteneur défilant
- `CarouselItem`: Élément individuel
- `CarouselPrevious`: Bouton précédent
- `CarouselNext`: Bouton suivant

**Accessibilité**  
- Rôle ARIA `region` avec `aria-roledescription="carousel"`
- Éléments individuels marqués comme `group`
- Support du clavier

**Section sources**
- [carousel.tsx](file://components/ui/carousel.tsx#L45-L263)

## Composants modaux

### Dialogue

Le **Dialogue** (ou modal) affiche du contenu par-dessus l'interface principale, bloquant temporairement l'interaction avec le reste de l'application.

**Sous-composants**  
- `Dialog`: Conteneur racine
- `DialogTrigger`: Élément qui ouvre le dialogue
- `DialogContent`: Fenêtre modale
- `DialogHeader`: En-tête avec titre
- `DialogTitle`: Titre du dialogue
- `DialogDescription`: Description
- `DialogFooter`: Pied de page pour les boutons
- `DialogClose`: Bouton de fermeture

**Comportement**  
- Overlay foncé qui couvre l'arrière-plan
- Animation d'entrée/sortie (zoom, fondu)
- Focus piégé à l'intérieur du dialogue
- Fermeture avec Échap ou clic sur l'overlay

**Accessibilité**  
- Conforme aux normes WAI-ARIA pour les modaux
- Gestion du focus
- Lecture automatique du titre

**Section sources**
- [dialog.tsx](file://components/ui/dialog.tsx#L9-L123)

### Tiroir latéral (Sheet)

Le **Tiroir latéral** (Sheet) est une variante de modal qui entre depuis un côté de l'écran (haut, bas, gauche, droite).

**Variantes**  
- `side`: Contrôle le côté d'entrée (`top`, `bottom`, `left`, `right`)
- Animation de glissement

**Sous-composants**  
Identiques à `Dialog` mais avec des animations de glissement.

**Usage typique**  
- Menus mobiles
- Panneaux de configuration
- Formulaires secondaires

**Accessibilité**  
Identique au composant Dialog, avec les mêmes bonnes pratiques.

**Section sources**
- [sheet.tsx](file://components/ui/sheet.tsx#L10-L141)

## Sélecteurs

### Sélecteur

Le composant **Select** remplace le `<select>` HTML standard avec une interface plus stylisée et accessible.

**Fonctionnalités**  
- Liste déroulante personnalisable
- Supporte les groupes, séparateurs, labels
- Navigation au clavier
- Défilement automatique

**Sous-composants**  
- `Select`: Conteneur racine
- `SelectTrigger`: Élément cliquable
- `SelectContent`: Liste déroulante
- `SelectItem`: Élément sélectionnable
- `SelectValue`: Valeur affichée
- `SelectLabel`: Titre de groupe
- `SelectSeparator`: Ligne de séparation

**Accessibilité**  
- Meilleure accessibilité que le `<select>` natif
- Support complet du clavier
- Rôles ARIA corrects

**Section sources**
- [select.tsx](file://components/ui/select.tsx#L9-L160)

## Accessibilité et normes

Tous les composants UI de Decker respectent les normes d'accessibilité WCAG et les directives WAI-ARIA. Les points clés incluent :

- **Navigation au clavier** : Tous les composants interactifs sont accessibles via Tab, flèches, Entrée, Espace et Échap.
- **Rôles ARIA** : Utilisation appropriée des rôles comme `button`, `alert`, `dialog`, `switch`, etc.
- **Étiquettes** : Les composants comme `label`, `title`, `description` incluent des attributs sémantiques.
- **Contraste** : Les couleurs respectent les ratios de contraste minimum.
- **Focus visuel** : Un anneau de focus est toujours visible.
- **Support des lecteurs d'écran** : Texte alternatif, `aria-*` attributs, gestion du focus.

**Section sources**
- [button.tsx](file://components/ui/button.tsx#L43-L58)
- [dialog.tsx](file://components/ui/dialog.tsx#L29-L54)
- [checkbox.tsx](file://components/ui/checkbox.tsx#L13-L27)

## Conception responsive

Les composants sont conçus pour s'adapter à différents appareils :

- **Grilles flexibles** : Utilisation de `flex` et `grid` pour la disposition.
- **Points d'arrêt** : Adaptation aux écrans mobiles via classes Tailwind (`sm:`, `md:`).
- **Tactile** : Zones de clic suffisamment grandes.
- **Défilement** : Support du touch et de la molette.
- **Orientation** : Adaptation en mode portrait/paysage.

**Section sources**
- [navigation-menu.tsx](file://components/ui/navigation-menu.tsx#L72-L74)
- [sheet.tsx](file://components/ui/sheet.tsx#L38-L43)
- [input.tsx](file://components/ui/input.tsx#L11-L12)

## Personnalisation du thème

Les composants utilisent **Tailwind CSS** et **class-variance-authority** (CVA) pour une personnalisation facile :

- **Variants** : Définis via `cva` pour chaque composant (ex: `buttonVariants`).
- **Thème global** : Défini dans `tailwind.config.ts` avec des couleurs sémantiques (`primary`, `secondary`, etc.).
- **Classes utilitaires** : `cn()` pour fusionner les classes conditionnellement.
- **Surcharge** : Possibilité d'ajouter `className` pour modifier l'apparence.

**Section sources**
- [button.tsx](file://components/ui/button.tsx#L7-L35)
- [badge.tsx](file://components/ui/badge.tsx#L6-L24)
- [lib/utils.ts](file://lib/utils.ts)

## Intégration et composition

Les composants peuvent être combinés pour créer des interfaces complexes :

- **Composition** : Utilisation de sous-composants pour construire des structures hiérarchiques (ex: Card avec Button).
- **Contexte** : Certains composants utilisent React Context (ex: Carousel).
- **Interopérabilité** : Tous les composants acceptent les props standard et peuvent être stylisés.
- **Réutilisabilité** : Conception modulaire pour une intégration facile.

**Exemple** : Un `Dialog` contenant un `Form` avec `Input`, `Select`, et `Button`.

**Section sources**
- [card.tsx](file://components/ui/card.tsx#L5-L77)
- [carousel.tsx](file://components/ui/carousel.tsx#L33-L34)
- [lib/utils.ts](file://lib/utils.ts)