// ============================================================================
// TYPES DE BASE ET UTILITAIRES
// ============================================================================

/**
 * Type pour les URLs d'images et médias
 */
export type MediaUrl = string;

/**
 * Type pour les dates (ISO 8601)
 */
export type ISODateString = string;

/**
 * Type pour les identifiants UUID
 */
export type UUID = string;

/**
 * Genres possibles
 */
export type Gender = 'male' | 'female' | 'other' | 'unknown';

/**
 * Statut de vie d'un membre
 */
export type LifeStatus = 'alive' | 'deceased' | 'unknown';

// ============================================================================
// MEMBRES DE LA FAMILLE
// ============================================================================

/**
 * Type de relation familiale
 */
export type RelationType =
  | 'parent'
  | 'child'
  | 'spouse'
  | 'sibling'
  | 'grandparent'
  | 'grandchild'
  | 'uncle_aunt'
  | 'nephew_niece'
  | 'cousin';

/**
 * Relation entre deux membres de la famille
 */
export interface FamilyRelation {
  id: UUID;
  from_member_id: UUID;
  to_member_id: UUID;
  relation_type: RelationType;
  notes?: string;
}

/**
 * Membre de la famille
 */
export interface FamilyMember {
  id: UUID;
  first_name: string;
  last_name: string;
  maiden_name?: string;
  nickname?: string;
  gender: Gender;
  birth_date?: ISODateString;
  birth_place?: string;
  death_date?: ISODateString;
  death_place?: string;
  life_status: LifeStatus;

  // Relations généalogiques
  father_id?: UUID;
  mother_id?: UUID;
  spouse_ids?: UUID[];
  children_ids?: UUID[];

  // Informations biographiques
  biography?: string;
  occupation?: string;
  education?: string;
  achievements?: string[];

  // Médias associés
  profile_photo_url?: MediaUrl;
  photos_urls?: MediaUrl[];

  // Métadonnées
  is_prominent?: boolean; // Pour les portraits
  generation?: number; // Numéro de génération
  created_at: ISODateString;
  updated_at: ISODateString;
}

// ============================================================================
// ÉVÉNEMENTS HISTORIQUES
// ============================================================================

/**
 * Type d'événement historique
 */
export type EventType =
  | 'birth'
  | 'death'
  | 'marriage'
  | 'divorce'
  | 'migration'
  | 'military'
  | 'professional'
  | 'achievement'
  | 'family_gathering'
  | 'historical_context'
  | 'other';

/**
 * Période historique
 */
export type HistoricalPeriod =
  | 'origines' // Date la plus ancienne connue
  | 'xixe' // XIXᵉ siècle (1800-1900)
  | 'xxe' // XXᵉ siècle (1900-1945) - guerres, résistance, Colonel Rémy
  | 'apres_guerre' // Après-guerre → années 2000 (1945-2000)
  | 'actuelle'; // Génération actuelle (2000+)

/**
 * Événement historique familial
 */
export interface HistoricalEvent {
  id: UUID;
  title: string;
  description: string;
  event_type: EventType;
  historical_period: HistoricalPeriod;

  // Dates
  event_date?: ISODateString;
  start_date?: ISODateString;
  end_date?: ISODateString;
  is_approximate_date?: boolean;

  // Lieu
  location?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };

  // Personnes impliquées
  involved_member_ids?: UUID[];

  // Contexte historique
  historical_context?: string;
  sources?: string[];

  // Médias
  photos_urls?: MediaUrl[];
  documents_urls?: MediaUrl[];

  // Métadonnées
  importance_level?: 'low' | 'medium' | 'high';
  is_public?: boolean;
  created_at: ISODateString;
  updated_at: ISODateString;
}

// ============================================================================
// CRÉATIONS ARTISTIQUES
// ============================================================================

/**
 * Type de création artistique
 */
export type CreationType =
  | 'music'
  | 'photography'
  | 'painting'
  | 'drawing'
  | 'video'
  | 'text'
  | 'sculpture'
  | 'other';

/**
 * Type de texte
 */
export type TextType = 'poem' | 'autobiography' | 'philosophy' | 'essay' | 'novel' | 'short_story' | 'other';

/**
 * Type de musique
 */
export type MusicType = 'album' | 'single' | 'demo' | 'archive' | 'collaboration';

/**
 * Création artistique de base
 */
export interface ArtisticCreation {
  id: UUID;
  title: string;
  description?: string;
  creation_type: CreationType;

  // Auteur/Créateur
  author_id: UUID;
  collaborators_ids?: UUID[];

  // Dates
  creation_date?: ISODateString;
  publication_date?: ISODateString;
  year?: number;

  // Médias
  media_url?: MediaUrl;
  preview_url?: MediaUrl;
  thumbnail_url?: MediaUrl;

  // Métadonnées
  tags?: string[];
  is_featured?: boolean;
  is_public?: boolean;
  created_at: ISODateString;
  updated_at: ISODateString;
}

/**
 * Création musicale (avec métadonnées spécifiques)
 */
export interface MusicCreation extends ArtisticCreation {
  creation_type: 'music';
  music_type: MusicType;

  // Métadonnées musicales
  duration?: number; // en secondes
  beatmaker?: string;
  producer?: string;
  lyrics?: string;
  anecdotes?: string;
  audio_url: MediaUrl;

  // Album/Collection
  album_name?: string;
  track_number?: number;
}

/**
 * Photographie
 */
export interface Photography extends ArtisticCreation {
  creation_type: 'photography';

  // Métadonnées photo
  location?: string;
  camera?: string;
  lens?: string;
  settings?: {
    aperture?: string;
    shutter_speed?: string;
    iso?: number;
  };
  series_name?: string;
  image_url: MediaUrl;
  high_res_url?: MediaUrl;
}

/**
 * Peinture ou dessin
 */
export interface PaintingDrawing extends ArtisticCreation {
  creation_type: 'painting' | 'drawing';

  // Métadonnées artistiques
  medium?: string; // huile, aquarelle, crayon, etc.
  dimensions?: {
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  technique?: string;
  image_url: MediaUrl;
  high_res_url?: MediaUrl;
}

/**
 * Vidéo
 */
export interface VideoCreation extends ArtisticCreation {
  creation_type: 'video';

  // Métadonnées vidéo
  duration?: number; // en secondes
  video_type?: 'short_film' | 'documentary' | 'montage' | 'capture' | 'other';
  credits?: string;
  video_url: MediaUrl;
  thumbnail_url?: MediaUrl;
}

/**
 * Texte littéraire
 */
export interface TextCreation extends ArtisticCreation {
  creation_type: 'text';
  text_type: TextType;

  // Contenu
  content?: string;
  excerpt?: string;
  word_count?: number;

  // Métadonnées texte
  language?: string;
  pdf_url?: MediaUrl;
}

// ============================================================================
// ARCHIVES ET DOCUMENTS
// ============================================================================

/**
 * Type de document d'archive
 */
export type ArchiveType =
  | 'photo'
  | 'video_ina'
  | 'letter'
  | 'official_document'
  | 'journal'
  | 'notebook'
  | 'manuscript'
  | 'certificate'
  | 'other';

/**
 * État de restauration
 */
export type RestorationStatus = 'original' | 'restored' | 'in_progress' | 'needed';

/**
 * Archive ou document
 */
export interface Archive {
  id: UUID;
  title: string;
  description?: string;
  archive_type: ArchiveType;

  // Dates
  original_date?: ISODateString;
  approximate_year?: number;

  // Personnes/Lieux
  related_member_ids?: UUID[];
  location?: string;

  // Contenu
  media_url?: MediaUrl;
  original_url?: MediaUrl; // Version originale
  restored_url?: MediaUrl; // Version restaurée
  transcription?: string; // Pour manuscrits et lettres

  // Restauration
  restoration_status: RestorationStatus;
  restoration_notes?: string;

  // Source
  source?: string;
  archive_reference?: string; // Référence archives nationales/départementales

  // INA spécifique
  ina_reference?: string;
  ina_date?: ISODateString;
  ina_duration?: number;
  ina_context?: string;

  // Métadonnées
  tags?: string[];
  is_public?: boolean;
  created_at: ISODateString;
  updated_at: ISODateString;
}

// ============================================================================
// TÉMOIGNAGES ET RÉCITS PERSONNELS
// ============================================================================

/**
 * Type de témoignage
 */
export type TestimonyType =
  | 'written'
  | 'audio'
  | 'video'
  | 'interview';

/**
 * Catégorie de témoignage
 */
export type TestimonyCategory =
  | 'family_memory'
  | 'historical_event'
  | 'colonel_remy'
  | 'anecdote'
  | 'tradition'
  | 'other';

/**
 * Témoignage ou récit personnel
 */
export interface Testimony {
  id: UUID;
  title: string;
  testimony_type: TestimonyType;
  category: TestimonyCategory;

  // Auteur et sujets
  author_id: UUID;
  about_member_ids?: UUID[];

  // Contenu
  content?: string;
  audio_url?: MediaUrl;
  video_url?: MediaUrl;
  transcript?: string;

  // Dates
  testimony_date?: ISODateString;
  about_period?: HistoricalPeriod;
  about_year?: number;

  // Contexte
  context?: string;
  location?: string;

  // Médias associés
  photos_urls?: MediaUrl[];

  // Métadonnées
  is_public?: boolean;
  is_featured?: boolean;
  created_at: ISODateString;
  updated_at: ISODateString;
}

// ============================================================================
// PORTRAITS DES MEMBRES MARQUANTS
// ============================================================================

/**
 * Rôle familial significatif
 */
export type SignificantRole =
  | 'family_founder'
  | 'war_hero'
  | 'artist'
  | 'scholar'
  | 'entrepreneur'
  | 'community_leader'
  | 'other';

/**
 * Portrait détaillé d'un membre marquant
 */
export interface MemberPortrait {
  id: UUID;
  member_id: UUID;

  // Informations de portrait
  portrait_title?: string;
  summary: string;
  detailed_biography: string;

  // Rôle et importance
  significant_roles: SignificantRole[];
  key_achievements?: string[];
  historical_impact?: string;

  // Dates clés
  key_dates?: {
    date: ISODateString;
    event: string;
    importance: 'low' | 'medium' | 'high';
  }[];

  // Relations importantes
  important_relationships?: {
    member_id: UUID;
    relationship_description: string;
  }[];

  // Documents et médias associés
  photos_gallery?: MediaUrl[];
  documents_urls?: MediaUrl[];
  letters_urls?: MediaUrl[];
  voice_recordings_urls?: MediaUrl[];
  video_urls?: MediaUrl[];

  // Colonel Rémy spécifique
  is_colonel_remy?: boolean;
  resistance_activities?: string;
  decorations?: string[];

  // Métadonnées
  display_order?: number;
  is_featured?: boolean;
  created_at: ISODateString;
  updated_at: ISODateString;
}

// ============================================================================
// SOURCES ET MÉTHODOLOGIE
// ============================================================================

/**
 * Type de source
 */
export type SourceType =
  | 'archive_nationale'
  | 'archive_departementale'
  | 'ina'
  | 'military_archive'
  | 'family_document'
  | 'oral_testimony'
  | 'publication'
  | 'website'
  | 'other';

/**
 * Niveau de fiabilité
 */
export type ReliabilityLevel = 'high' | 'medium' | 'low' | 'unverified';

/**
 * Source documentaire
 */
export interface Source {
  id: UUID;
  title: string;
  source_type: SourceType;

  // Informations de la source
  description?: string;
  location?: string;
  reference?: string;
  url?: string;

  // Métadonnées
  author?: string;
  publication_date?: ISODateString;
  access_date?: ISODateString;
  reliability_level: ReliabilityLevel;

  // Permissions
  has_permission?: boolean;
  permission_notes?: string;
  copyright_info?: string;

  // Relation aux contenus
  related_event_ids?: UUID[];
  related_member_ids?: UUID[];
  related_archive_ids?: UUID[];

  // Notes de recherche
  research_notes?: string;
  verification_method?: string;

  created_at: ISODateString;
  updated_at: ISODateString;
}

/**
 * Méthodologie de recherche
 */
export interface ResearchMethodology {
  id: UUID;
  title: string;
  description: string;

  // Étapes de la méthodologie
  steps?: {
    order: number;
    title: string;
    description: string;
  }[];

  // Outils utilisés
  tools_used?: string[];
  archives_consulted?: string[];

  // Bibliographie
  bibliography?: {
    title: string;
    author?: string;
    publication?: string;
    year?: number;
    isbn?: string;
    url?: string;
  }[];

  // Contributeurs
  contributors?: {
    name: string;
    role: string;
    contribution: string;
  }[];

  created_at: ISODateString;
  updated_at: ISODateString;
}

// ============================================================================
// TYPES D'UNION ET UTILITAIRES
// ============================================================================

/**
 * Union de tous les types de créations
 */
export type AnyCreation =
  | MusicCreation
  | Photography
  | PaintingDrawing
  | VideoCreation
  | TextCreation;

/**
 * Type pour les filtres de recherche
 */
export interface SearchFilters {
  query?: string;
  member_id?: UUID;
  period?: HistoricalPeriod;
  creation_type?: CreationType;
  archive_type?: ArchiveType;
  start_date?: ISODateString;
  end_date?: ISODateString;
  tags?: string[];
  is_public?: boolean;
}

/**
 * Résultat de recherche générique
 */
export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

/**
 * Statistiques familiales
 */
export interface FamilyStatistics {
  total_members: number;
  total_events: number;
  total_creations: number;
  total_archives: number;
  total_testimonies: number;
  oldest_record_date?: ISODateString;
  newest_record_date?: ISODateString;
  generations_count: number;
}
