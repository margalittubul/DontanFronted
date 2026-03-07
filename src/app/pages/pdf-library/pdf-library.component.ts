import { Component, computed, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { LocaleService } from '../../services/locale.service'
import { PdfCardComponent } from '../../components/pdf-card/pdf-card.component'
import { PDF_CATALOG } from '../../config/pdfs.config'

@Component({
  selector: 'app-pdf-library',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PdfCardComponent],
  templateUrl: './pdf-library.component.html',
  styleUrl: './pdf-library.component.css',
})
export class PdfLibraryComponent {
  readonly locale = inject(LocaleService)

  readonly searchQuery = signal('')
  readonly catalog = PDF_CATALOG

  readonly filteredPdfs = computed(() => {
    const searchTerm = this.searchQuery().trim().toLowerCase()
    if (!searchTerm) return this.catalog
    return this.catalog.filter((entry) => {
      const title = this.locale.t(`pdfs.articles.${entry.titleKey}`).toLowerCase()
      return title.includes(searchTerm) || entry.titleKey.toLowerCase().includes(searchTerm)
    })
  })
}
