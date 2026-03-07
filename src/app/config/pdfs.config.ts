/**
 * Static PDF catalog. All files live in src/assets/pdfs/ (snake_case filenames).
 * Display titles are resolved via LocaleService using pdfs.articles.<titleKey> from hebrew.json.
 * thumbnailUrl: representative image for the article topic (optional).
 */
export interface PdfEntry {
  /** Filename in assets/pdfs/ (snake_case, e.g. heat_load_table.pdf) */
  filename: string
  /** i18n key for title: locale.t('pdfs.articles.' + titleKey) */
  titleKey: string
  /** Optional: URL of a representative image for the article topic */
  thumbnailUrl?: string
}

export const PDF_ASSETS_BASE = '/assets/pdfs'

/** Full list of PDFs for the library page and search */
export const PDF_CATALOG: PdfEntry[] = [
  {
    filename: 'sleeping.pdf',
    titleKey: 'sleeping',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80',
  },
  {
    filename: 'naval_strength_workouts_dec25.pdf',
    titleKey: 'naval_strength_workouts_dec25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
  },
  {
    filename: 'pilates_workouts.pdf',
    titleKey: 'pilates_workouts',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
  },
  {
    filename: 'physical_training_concept_naval_corps.pdf',
    titleKey: 'physical_training_concept_naval_corps',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
  },
  {
    filename: 'running_workouts_booklet.pdf',
    titleKey: 'running_workouts_booklet',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80',
  },
]
