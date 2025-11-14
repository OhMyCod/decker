# Guide de Style - Famille DECKER

Ce guide définit l'identité visuelle du site web de la famille DECKER et documente l'utilisation des couleurs, typographies, composants et animations.

## 🎨 Palette de Couleurs

### Palette Familiale Principale

La palette de couleurs de la famille DECKER s'inspire de tons chauds et historiques qui évoquent l'héritage, la créativité et la continuité familiale.

#### 1. Gamboge (Or chaleureux)
**Couleur principale** : `#f0a202`

Évoque la chaleur des moments familiaux et la lumière qui guide les générations.

**Nuances disponibles** :
- `gamboge-50` : `#feedc9` - Très clair
- `gamboge-100` : `#fedb94`
- `gamboge-200` : `#fdc85e`
- `gamboge-300` : `#fdb629`
- `gamboge-400/500` : `#f0a202` - Défaut
- `gamboge-600` : `#be7f02`
- `gamboge-700` : `#8e5f01`
- `gamboge-800` : `#5f4001`
- `gamboge-900` : `#2f2000` - Très foncé

**Usage** :
```tsx
// Dans les composants
className="bg-gamboge text-white"
className="text-gamboge-600 hover:text-gamboge-700"
className="border-gamboge-300"
```

#### 2. Tangerine (Orange créatif)
**Couleur principale** : `#f18805`

Représente la créativité et l'énergie des créations artistiques de la famille.

**Nuances disponibles** :
- `tangerine-50` à `tangerine-900` (même structure)

**Usage** :
```tsx
// Pour les sections créatives
className="bg-tangerine text-white"
className="text-tangerine-600 dark:text-tangerine-400"
```

#### 3. Cinnabar (Rouge héritage)
**Couleur principale** : `#d95d39`

Symbolise les personnalités marquantes et l'héritage familial fort.

**Usage** :
```tsx
// Pour les portraits et les membres marquants
className="bg-cinnabar text-white"
className="border-l-4 border-cinnabar"
```

#### 4. Oxford Blue (Bleu profond)
**Couleur principale** : `#0e1428`

Évoque la profondeur de l'histoire familiale et le sérieux des archives.

**Usage** :
```tsx
// Pour les sections historiques
className="bg-oxford text-white"
className="text-oxford-300"
```

#### 5. Cambridge Blue (Vert-bleu naturel)
**Couleur principale** : `#7b9e89`

Représente la continuité familiale et la nature apaisante des liens.

**Usage** :
```tsx
// Pour les témoignages et la généalogie
className="bg-cambridge text-white"
className="text-cambridge-600"
```

---

### Couleurs Sémantiques

Pour faciliter l'utilisation cohérente, des couleurs sémantiques ont été définies :

| Couleur Sémantique | Couleur de base | Usage |
|-------------------|-----------------|-------|
| `heritage` | Oxford Blue | Histoire familiale, archives |
| `warmth` | Gamboge | Moments chaleureux, accueil |
| `creativity` | Tangerine | Créations artistiques |
| `legacy` | Cinnabar | Personnalités marquantes, Colonel Rémy |
| `nature` | Cambridge | Continuité familiale, généalogie |

**Exemple d'utilisation** :
```tsx
// Au lieu de
className="text-oxford-500"

// Utiliser
className="text-heritage"
```

---

## ✍️ Typographie

### Polices de caractères

Le site utilise les polices Geist pour une typographie moderne et lisible :

- **Sans-serif** : Geist Sans (par défaut)
- **Monospace** : Geist Mono (pour le code)
- **Serif** : Georgia, Cambria (pour les citations longues)

**Utilisation** :
```tsx
className="font-sans"  // Geist Sans (défaut)
className="font-mono"  // Geist Mono
className="font-serif" // Georgia/Cambria
```

### Tailles de texte

Échelle typographique optimisée pour la lisibilité :

| Classe | Taille | Line Height | Usage |
|--------|--------|-------------|-------|
| `text-xs` | 0.75rem | 1rem | Labels, badges |
| `text-sm` | 0.875rem | 1.25rem | Texte secondaire |
| `text-base` | 1rem | 1.5rem | Corps de texte |
| `text-lg` | 1.125rem | 1.75rem | Sous-titres |
| `text-xl` | 1.25rem | 1.75rem | Titres de section |
| `text-2xl` | 1.5rem | 2rem | Titres de page |
| `text-3xl` | 1.875rem | 2.25rem | Titres principaux |
| `text-4xl` | 2.25rem | 2.5rem | Héros |
| `text-5xl` à `text-9xl` | ... | 1 | Titres extra-larges |

**Exemple** :
```tsx
<h1 className="text-4xl font-bold text-heritage">Histoire Familiale</h1>
<p className="text-base text-muted-foreground">Description...</p>
```

---

## 📐 Espacements et Grille

### Espacements personnalisés

En plus des espacements Tailwind standard, des valeurs supplémentaires sont disponibles :

- `spacing-18` : 4.5rem (72px)
- `spacing-88` : 22rem (352px)
- `spacing-100` : 25rem (400px)
- `spacing-112` : 28rem (448px)
- `spacing-128` : 32rem (512px)

**Usage** :
```tsx
className="p-18"     // Padding de 72px
className="mt-100"   // Margin-top de 400px
className="gap-18"   // Gap de 72px
```

### Grille responsive

Le site utilise une grille responsive adaptée à tous les appareils :

```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

---

## 📱 Breakpoints Responsive

Breakpoints personnalisés pour une adaptation optimale :

| Breakpoint | Largeur | Usage |
|------------|---------|-------|
| `xs` | 475px | Petits mobiles |
| `sm` | 640px | Mobiles |
| `md` | 768px | Tablettes |
| `lg` | 1024px | Petits desktops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Grands écrans |
| `3xl` | 1920px | Très grands écrans |

**Utilisation** :
```tsx
// Mobile first
className="text-sm md:text-base lg:text-lg"
className="hidden md:block"
className="grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3"
```

---

## 🎭 Animations et Transitions

### Animations disponibles

| Animation | Durée | Usage |
|-----------|-------|-------|
| `fade-in` | 0.3s | Apparition d'éléments |
| `fade-out` | 0.3s | Disparition d'éléments |
| `slide-in-top` | 0.3s | Entrée depuis le haut |
| `slide-in-bottom` | 0.3s | Entrée depuis le bas |
| `slide-in-left` | 0.3s | Entrée depuis la gauche |
| `slide-in-right` | 0.3s | Entrée depuis la droite |
| `scale-in` | 0.2s | Zoom d'apparition |
| `shimmer` | 2s infini | Effet de brillance |
| `accordion-down` | 0.2s | Expansion accordion |
| `accordion-up` | 0.2s | Contraction accordion |

**Exemple** :
```tsx
<div className="animate-fade-in">
  Contenu qui apparaît en fondu
</div>

<div className="animate-slide-in-bottom">
  Contenu qui glisse depuis le bas
</div>

<div className="animate-shimmer bg-gradient-to-r from-gamboge-50 via-gamboge-200 to-gamboge-50">
  Effet de brillance
</div>
```

### Timing Functions

- `ease-bounce-in` : Animation avec rebond
- `ease-smooth` : Animation fluide (défaut amélioré)

**Usage** :
```tsx
className="transition-all duration-300 ease-bounce-in"
className="transition-transform duration-600 ease-smooth"
```

---

## 🧩 Composants shadcn/ui

### Composants disponibles

Le projet utilise shadcn/ui pour tous les composants UI. Voici la liste des composants installés et leurs usages recommandés :

#### Navigation
- **Sidebar** : Navigation principale du site
- **Breadcrumb** : Fil d'Ariane pour la navigation contextuelle
- **Tabs** : Organisation du contenu par onglets
- **Sheet** : Menu mobile et overlays

#### Feedback
- **Alert** : Messages d'information
- **Toast** : Notifications temporaires
- **Dialog** : Modales et popups
- **Skeleton** : Chargement de contenu

#### Affichage
- **Card** : Conteneur de contenu
- **Badge** : Étiquettes et statuts
- **Avatar** : Photos de profil
- **Carousel** : Galeries d'images
- **Accordion** : Contenu collapsible

#### Formulaires
- **Input** : Champs de texte
- **Select** : Listes déroulantes
- **Checkbox** : Cases à cocher
- **Switch** : Interrupteurs

#### Interactions
- **Button** : Boutons d'action
- **DropdownMenu** : Menus contextuels
- **HoverCard** : Info-bulles riches
- **Tooltip** : Info-bulles simples
- **Popover** : Popovers contextuels

### Exemples d'utilisation

#### Card avec couleur sémantique
```tsx
<Card className="border-l-4 border-heritage">
  <CardHeader>
    <CardTitle className="text-heritage">Histoire familiale</CardTitle>
    <CardDescription>Découvrez nos origines</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenu...</p>
  </CardContent>
</Card>
```

#### Badge avec couleurs familiales
```tsx
<Badge className="bg-warmth text-white">En vedette</Badge>
<Badge className="bg-creativity text-white">Nouveau</Badge>
<Badge className="bg-legacy text-white">Important</Badge>
```

#### Button avec variantes
```tsx
<Button variant="default">Action principale</Button>
<Button variant="secondary">Action secondaire</Button>
<Button variant="outline" className="border-gamboge text-gamboge hover:bg-gamboge hover:text-white">
  Action personnalisée
</Button>
```

---

## 🎯 Patterns d'Utilisation

### Page d'accueil
- Utiliser `warmth` (Gamboge) pour le hero et les CTAs
- Cards avec bordures de couleur pour les sections

### Histoire familiale
- Utiliser `heritage` (Oxford Blue) pour les titres
- Timeline avec `heritage-light` pour les points

### Créations artistiques
- Utiliser `creativity` (Tangerine) pour les headers
- Cards avec `creativity-light` en background

### Portraits
- Utiliser `legacy` (Cinnabar) pour les membres marquants
- Avatar avec bordure `legacy`

### Généalogie
- Utiliser `nature` (Cambridge) pour l'arbre
- Nœuds avec `nature-light` en background

---

## ♿ Accessibilité

### Contraste
Toutes les combinaisons de couleurs respectent les normes WCAG AA :
- Texte sur fond clair : ratio minimum de 4.5:1
- Texte large (>18pt) : ratio minimum de 3:1

### États interactifs
Toujours définir les états hover, focus et active :

```tsx
className="
  text-gamboge-600
  hover:text-gamboge-700
  focus:ring-2 focus:ring-gamboge-500
  active:text-gamboge-800
  transition-colors duration-200
"
```

### Mode sombre
Les couleurs shadcn/ui s'adaptent automatiquement au mode sombre grâce aux variables CSS. Les couleurs familiales doivent utiliser les nuances appropriées :

```tsx
// Mode clair/sombre automatique
className="text-gamboge-600 dark:text-gamboge-400"
className="bg-oxford-100 dark:bg-oxford-800"
```

---

## 📝 Conventions de Nommage

### Classes Tailwind
- Toujours utiliser la syntaxe complète (pas de raccourcis)
- Grouper les classes par catégorie :
  1. Layout (display, position)
  2. Sizing (width, height)
  3. Spacing (padding, margin)
  4. Typography
  5. Colors
  6. Effects (shadow, transition)

**Exemple** :
```tsx
className="
  flex items-center justify-between
  w-full h-16
  px-4 py-2
  text-lg font-semibold
  bg-gamboge text-white
  rounded-lg shadow-md
  transition-all duration-300
  hover:bg-gamboge-600
"
```

### Composants
- Nommer en PascalCase
- Préfixer les composants UI personnalisés avec "Custom"
- Exemple : `CustomCard`, `CustomButton`

---

## 🔄 Maintenance

### Mise à jour des couleurs
Pour modifier la palette, éditer `tailwind.config.ts` :

```typescript
// tailwind.config.ts
colors: {
  gamboge: {
    DEFAULT: '#f0a202',
    // ...
  }
}
```

### Ajout de nouvelles animations
```typescript
// tailwind.config.ts
keyframes: {
  'mon-animation': {
    from: { /* ... */ },
    to: { /* ... */ }
  }
},
animation: {
  'mon-animation': 'mon-animation 0.3s ease-out'
}
```

---

## 📚 Ressources

- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Version** : 1.0
**Dernière mise à jour** : 2025-01-13
**Maintenu par** : Équipe DECKER
