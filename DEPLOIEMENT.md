# Guide de Déploiement - Site Famille DECKER

Ce guide vous accompagne dans le déploiement de votre site familial sur Vercel avec Supabase pour la base de données et le stockage.

---

## 📋 Prérequis

- ✅ Projet Next.js 15 configuré (déjà fait)
- ✅ Compte GitHub avec le code source
- 🔲 Compte Vercel (gratuit)
- 🔲 Compte Supabase (gratuit)

---

## 🚀 Étape 1 : Configuration GitHub

### 1.1 Créer un dépôt GitHub

Si ce n'est pas déjà fait :

1. Allez sur [github.com](https://github.com)
2. Cliquez sur "New repository"
3. Nom du dépôt : `decker-family-website`
4. Description : `Site web familial de la famille DECKER`
5. Choisissez "Private" pour un dépôt privé
6. Ne cochez PAS "Add a README" (vous en avez déjà un)
7. Cliquez sur "Create repository"

### 1.2 Pousser le code vers GitHub

Dans votre terminal :

```bash
# Ajouter le dépôt distant
git remote add origin https://github.com/VOTRE-USERNAME/decker-family-website.git

# Renommer la branche en main si nécessaire
git branch -M main

# Pousser le code
git push -u origin main
```

---

## ☁️ Étape 2 : Configuration Supabase

### 2.1 Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Créez un compte ou connectez-vous
4. Cliquez sur "New Project"
5. Remplissez les informations :
   - **Name** : `decker-family`
   - **Database Password** : Générez un mot de passe fort (notez-le !)
   - **Region** : Choisissez Europe (West) pour la France
   - **Pricing Plan** : Free (suffisant pour commencer)
6. Cliquez sur "Create new project"

### 2.2 Récupérer les clés API

Une fois le projet créé :

1. Allez dans "Settings" > "API"
2. Notez les informations suivantes :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon/public key** : `eyJhbGciOiJ...` (clé publique)
   - **service_role key** : `eyJhbGciOiJ...` (clé secrète, à ne JAMAIS exposer)

### 2.3 Configurer le stockage

1. Allez dans "Storage" dans le menu latéral
2. Créez les buckets suivants :
   - **photos** (Public) : Pour les photos familiales
   - **videos** (Public) : Pour les vidéos
   - **audio** (Public) : Pour les fichiers audio
   - **documents** (Private) : Pour les documents sensibles
   - **archives** (Public) : Pour les archives historiques

Pour créer un bucket :
- Cliquez sur "New bucket"
- Nom : `photos`
- Public bucket : Cochez pour `photos`, `videos`, `audio`, `archives`
- Cliquez sur "Create bucket"

### 2.4 Configurer les politiques de sécurité (RLS)

Pour chaque bucket public, ajoutez des politiques :

1. Cliquez sur le bucket > "Policies"
2. Cliquez sur "New Policy"
3. Choisissez "For full customization"
4. Pour un accès public en lecture :
   - **Policy name** : `Public Access`
   - **Allowed operation** : `SELECT`
   - **Target roles** : `public`
   - **USING expression** : `true`
5. Cliquez sur "Review" puis "Save policy"

---

## 🌐 Étape 3 : Déploiement sur Vercel

### 3.1 Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Sign Up"
3. Choisissez "Continue with GitHub"
4. Autorisez Vercel à accéder à vos dépôts GitHub

### 3.2 Importer le projet

1. Sur le dashboard Vercel, cliquez sur "Add New..." > "Project"
2. Recherchez `decker-family-website` dans la liste
3. Cliquez sur "Import"
4. Configurez le projet :
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (par défaut)
   - **Build Command** : `npm run build` (par défaut)
   - **Output Directory** : `.next` (par défaut)

### 3.3 Configurer les variables d'environnement

Dans la section "Environment Variables", ajoutez :

**Variables Supabase** :
```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJ...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJ...
```

**Variable de l'application** :
```
NEXT_PUBLIC_APP_URL = https://votre-projet.vercel.app
```

⚠️ **Important** : Ajoutez ces variables pour tous les environnements :
- Production
- Preview
- Development

### 3.4 Déployer

1. Cliquez sur "Deploy"
2. Attendez que le déploiement se termine (environ 1-2 minutes)
3. Une fois terminé, cliquez sur "Visit" pour voir votre site

---

## 🔧 Étape 4 : Configuration locale

### 4.1 Créer le fichier .env.local

Dans votre projet local, créez un fichier `.env.local` :

```bash
cp .env.local.example .env.local
```

Puis éditez `.env.local` avec vos vraies valeurs :

```env
# Configuration Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_ici
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_role_ici

# Authentification
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=générez_une_clé_secrète_ici
```

### 4.2 Générer un secret pour NextAuth

```bash
openssl rand -base64 32
```

Copiez le résultat dans `NEXTAUTH_SECRET`.

### 4.3 Tester localement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🎨 Étape 5 : Personnaliser le domaine (Optionnel)

### 5.1 Acheter un nom de domaine

Recommandations :
- [Namecheap](https://www.namecheap.com) : Abordable
- [Google Domains](https://domains.google) : Simple
- [OVH](https://www.ovh.com) : Français

Suggestions de noms :
- `famille-decker.fr`
- `decker-family.com`
- `memoiresdecker.fr`

### 5.2 Configurer le domaine sur Vercel

1. Dans votre projet Vercel, allez dans "Settings" > "Domains"
2. Cliquez sur "Add Domain"
3. Entrez votre nom de domaine : `famille-decker.fr`
4. Suivez les instructions pour configurer les DNS

**Configuration DNS** :
- Type : `A`
- Name : `@`
- Value : `76.76.21.21`

Et :
- Type : `CNAME`
- Name : `www`
- Value : `cname.vercel-dns.com`

---

## 📊 Étape 6 : Installer des dépendances supplémentaires

### 6.1 Installer Supabase Client

```bash
npm install @supabase/supabase-js
```

### 6.2 Créer le client Supabase

Créez `lib/supabase.ts` :

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## ✅ Vérification finale

### Checklist de déploiement

- [ ] Dépôt GitHub créé et code poussé
- [ ] Projet Supabase créé
- [ ] Clés API Supabase récupérées
- [ ] Buckets de stockage créés
- [ ] Politiques de sécurité configurées
- [ ] Projet Vercel créé et lié au dépôt GitHub
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Premier déploiement réussi
- [ ] Fichier .env.local créé localement
- [ ] Site accessible via l'URL Vercel
- [ ] (Optionnel) Nom de domaine configuré

### Tests à effectuer

1. ✅ Le site se charge correctement
2. ✅ Les styles Tailwind sont appliqués
3. ✅ Le thème sombre/clair fonctionne
4. ✅ Les composants shadcn/ui s'affichent correctement
5. ✅ (Plus tard) L'upload de fichiers vers Supabase fonctionne
6. ✅ (Plus tard) L'authentification fonctionne

---

## 🔄 Déploiements futurs

### Déploiement automatique

Vercel déploie automatiquement à chaque push sur la branche `main` :

```bash
git add .
git commit -m "Ajout de nouvelles fonctionnalités"
git push origin main
```

Vercel créera automatiquement une preview pour chaque pull request.

### Déploiement manuel via CLI

Installez la CLI Vercel :

```bash
npm i -g vercel
```

Puis :

```bash
vercel --prod
```

---

## 🆘 Dépannage

### Erreur "Module not found"

```bash
npm install
npm run build
```

### Variables d'environnement non détectées

1. Vérifiez que les variables sont dans Vercel (Settings > Environment Variables)
2. Redéployez : Settings > Deployments > ... > Redeploy

### Build échoue sur Vercel

Vérifiez les logs dans Vercel :
1. Allez dans "Deployments"
2. Cliquez sur le déploiement échoué
3. Lisez les logs pour identifier l'erreur

---

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation shadcn/ui](https://ui.shadcn.com)

---

## 🎉 Félicitations !

Votre site est maintenant déployé et accessible en ligne !

**Prochaines étapes** :
1. Implémenter la sidebar (Section 5 du PLAN.md)
2. Configurer le système de thème (Section 6 du PLAN.md)
3. Créer les pages du site (Phase 2 du PLAN.md)
