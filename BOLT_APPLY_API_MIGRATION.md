# Prompt BOLT - Application de la migration API Functions

## Contexte

Le projet DECKER possède maintenant 6 migrations SQL Supabase. Les 5 premières ont été appliquées avec succès, mais la **6ème migration (fonctions API RPC)** doit encore être appliquée dans la base de données Supabase.

## Objectif

Appliquer la migration `20251114063120_create_api_functions.sql` qui contient **12+ fonctions RPC PostgreSQL** pour les opérations courantes (arbre généalogique, recherche, événements, créations, archives, témoignages, statistiques).

## Instructions pour BOLT

### Étape 1 : Vérifier l'accès au Dashboard Supabase

1. Se connecter au Dashboard Supabase : https://supabase.com/dashboard/project/eomytqkcxkwdiakyawaw
2. Vérifier que vous êtes bien connecté au projet **DECKER**
3. Aller dans l'onglet **SQL Editor** (menu latéral gauche)

### Étape 2 : Appliquer la migration

1. Dans le SQL Editor, créer une **nouvelle requête**
2. Copier le contenu complet du fichier `supabase/migrations/20251114063120_create_api_functions.sql`
3. Coller le contenu dans l'éditeur SQL
4. Cliquer sur **Run** pour exécuter la migration
5. Vérifier qu'il n'y a **aucune erreur** dans le résultat

### Étape 3 : Vérifier que les fonctions ont été créées

Exécuter les requêtes de vérification suivantes dans le SQL Editor :

```sql
-- Vérifier que l'extension pg_trgm est activée
SELECT * FROM pg_extension WHERE extname = 'pg_trgm';

-- Lister toutes les fonctions créées
SELECT
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN (
    'get_family_tree',
    'get_member_events',
    'get_member_creations',
    'search_family_members',
    'get_prominent_members',
    'get_member_archives',
    'get_member_testimonies',
    'get_family_statistics',
    'get_events_by_period',
    'search_all_content'
  )
ORDER BY routine_name;
```

Vous devriez voir **10 fonctions** dans le résultat.

### Étape 4 : Tester une fonction RPC

Tester la fonction `get_family_statistics` pour vérifier qu'elle fonctionne :

```sql
-- Tester les statistiques de la famille
SELECT * FROM get_family_statistics();
```

Le résultat devrait afficher une ligne avec les colonnes :
- `total_members`
- `living_members`
- `deceased_members`
- `total_events`
- `total_creations`
- `total_archives`
- `total_testimonies`
- `oldest_generation`
- `newest_generation`

Les valeurs seront à 0 ou NULL car aucune donnée de test n'a encore été insérée.

### Étape 5 : Marquer la migration comme appliquée

Si vous utilisez le Supabase CLI localement, enregistrer la migration dans l'historique :

```bash
# Se placer dans le répertoire du projet
cd C:\Users\Gildas\Documents\Projets\Développement\En cours\Website\decker

# Enregistrer la migration (si le CLI est configuré)
supabase migration repair 20251114063120
```

Sinon, considérer la migration comme appliquée si toutes les fonctions sont créées sans erreur.

## Liste complète des 12 fonctions RPC créées

Après application de la migration, les fonctions suivantes seront disponibles :

### Fonctions de recherche et navigation (4)

1. **`get_family_tree(member_uuid UUID, depth_limit INTEGER)`**
   - Récupère l'arbre généalogique d'un membre (parents, enfants)
   - Recherche récursive avec profondeur configurable

2. **`search_family_members(search_query TEXT, filter_life_status TEXT, filter_is_prominent BOOLEAN, filter_generation INTEGER)`**
   - Recherche avancée de membres avec filtres
   - Score de pertinence basé sur la similarité textuelle

3. **`get_prominent_members()`**
   - Récupère tous les membres marquants de la famille
   - Ordonnés par génération et date de naissance

4. **`search_all_content(search_query TEXT)`**
   - Recherche full-text dans tous les contenus
   - Couvre : membres, événements, créations, témoignages
   - Limité aux 50 meilleurs résultats

### Fonctions spécifiques par membre (4)

5. **`get_member_events(member_uuid UUID)`**
   - Récupère tous les événements historiques d'un membre
   - Inclut le rôle du membre dans chaque événement

6. **`get_member_creations(member_uuid UUID)`**
   - Récupère toutes les créations artistiques d'un membre
   - Inclut les créations comme auteur ou collaborateur

7. **`get_member_archives(member_uuid UUID)`**
   - Récupère toutes les archives liées à un membre
   - Inclut photos, vidéos INA, documents

8. **`get_member_testimonies(member_uuid UUID)`**
   - Récupère les témoignages d'un membre ou sur un membre
   - Distingue auteur vs sujet du témoignage

### Fonctions de consultation générale (2)

9. **`get_events_by_period(period_name TEXT)`**
   - Récupère les événements historiques par période
   - Périodes : 'origines', 'xixe', 'xxe', 'apres_guerre', 'actuelle'
   - Inclut le nombre de membres impliqués

10. **`get_family_statistics()`**
    - Statistiques globales de la famille
    - Compteurs : membres totaux, vivants, décédés, événements, créations, archives, témoignages
    - Générations : plus ancienne et plus récente

### Extensions activées

- **`pg_trgm`** : Extension PostgreSQL pour la recherche floue et la similarité textuelle

## Validation finale

Après avoir appliqué la migration, vérifier :

- ✅ Aucune erreur lors de l'exécution SQL
- ✅ 10 fonctions listées dans `information_schema.routines`
- ✅ Extension `pg_trgm` activée
- ✅ `get_family_statistics()` retourne un résultat (même vide)

## Utilisation dans le code Next.js

Une fois la migration appliquée, les fonctions RPC pourront être appelées depuis Next.js :

```typescript
import { createClient } from '@/lib/supabase/client'

// Exemple : Récupérer les statistiques
const supabase = createClient()
const { data, error } = await supabase.rpc('get_family_statistics')

// Exemple : Rechercher des membres
const { data, error } = await supabase.rpc('search_family_members', {
  search_query: 'Decker',
  filter_is_prominent: true
})

// Exemple : Arbre généalogique
const { data, error } = await supabase.rpc('get_family_tree', {
  member_uuid: 'uuid-du-membre',
  depth_limit: 3
})
```

## Résumé des actions attendues

**BOLT doit** :
1. ✅ Se connecter au Dashboard Supabase
2. ✅ Ouvrir le SQL Editor
3. ✅ Copier le contenu de `20251114063120_create_api_functions.sql`
4. ✅ Exécuter la migration
5. ✅ Vérifier qu'il n'y a pas d'erreurs
6. ✅ Lister les fonctions créées (10 fonctions attendues)
7. ✅ Tester `get_family_statistics()`
8. ✅ Confirmer que tout fonctionne

## Fichier de migration

Le fichier à appliquer se trouve à :
```
supabase/migrations/20251114063120_create_api_functions.sql
```

**Taille** : 14K
**Contenu** : 448 lignes de SQL
**Fonctions** : 12+ fonctions RPC PostgreSQL

## Checklist de validation finale

Après l'exécution, BOLT doit confirmer :

- [ ] Migration exécutée sans erreur
- [ ] Extension `pg_trgm` activée
- [ ] 10 fonctions RPC créées
- [ ] `get_family_statistics()` fonctionne
- [ ] Aucun message d'erreur dans les logs

## En cas d'erreur

Si une erreur survient lors de l'application de la migration :

1. **Vérifier les tables** : S'assurer que les 24 tables existent
2. **Vérifier les permissions** : L'utilisateur doit avoir les droits `CREATE FUNCTION`
3. **Vérifier l'extension** : `pg_trgm` doit pouvoir être installée
4. **Logs** : Copier le message d'erreur complet pour analyse

Les erreurs courantes :
- `relation "family_members" does not exist` → Les tables de base ne sont pas créées
- `permission denied for extension pg_trgm` → Problème de permissions
- `function already exists` → Migration déjà appliquée (OK)

## Notes importantes

- Les fonctions utilisent `LANGUAGE sql STABLE` pour l'optimisation
- La recherche floue requiert l'extension `pg_trgm`
- Toutes les fonctions sont publiques et respectent les politiques RLS existantes
- Les fonctions retournent des `TABLE` pour faciliter l'usage dans les requêtes

---

**Prochaine étape après application** : Insérer des données de test dans les tables pour tester les fonctions RPC avec des données réelles.
