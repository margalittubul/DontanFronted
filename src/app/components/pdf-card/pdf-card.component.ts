import { Component, computed, inject, input, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PdfViewerService } from '../../services/pdf-viewer.service'

@Component({
  selector: 'app-pdf-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-card.component.html',
  styleUrl: './pdf-card.component.css',
})
export class PdfCardComponent {
  private readonly pdfViewer = inject(PdfViewerService)

  /** Display title (e.g. from locale) */
  title = input.required<string>()
  /** PDF filename in assets/pdfs/ (e.g. sleeping.pdf) */
  filename = input.required<string>()
  /** Optional: full URL. If set, used instead of /assets/pdfs/{filename} */
  href = input<string | null>(null)
  /** Optional: URL of a representative image for the article (thumbnail) */
  thumbnailUrl = input<string | null>(null)
  /** Max chars for title (truncate with "..."). Omit for no truncation. */
  maxTitleLength = input<number | null>(null)
  /** When true, open PDF in iframe overlay instead of new tab */
  useOverlay = input<boolean>(false)

  /** True when thumbnail image failed to load — show icon instead */
  thumbnailError = signal(false)

  readonly displayTitle = computed(() => {
    const fullTitle = this.title()
    const maxLength = this.maxTitleLength()
    if (maxLength == null || fullTitle.length <= maxLength) return fullTitle
    return fullTitle.slice(0, maxLength) + '...'
  })

  get pdfUrl(): string {
    const customHref = this.href()
    if (customHref) return customHref
    return `/assets/pdfs/${this.filename()}`
  }

  openPdf(event: Event): void {
    if (!this.useOverlay()) return
    event.preventDefault()
    this.pdfViewer.open(this.pdfUrl)
  }
}
