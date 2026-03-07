import { Component, computed, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DomSanitizer } from '@angular/platform-browser'
import { LocaleService } from '../../services/locale.service'
import { PdfViewerService } from '../../services/pdf-viewer.service'

@Component({
  selector: 'app-pdf-viewer-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer-overlay.component.html',
  styleUrl: './pdf-viewer-overlay.component.css',
})
export class PdfViewerOverlayComponent {
  readonly locale = inject(LocaleService)
  readonly pdfViewer = inject(PdfViewerService)
  private readonly sanitizer = inject(DomSanitizer)

  readonly safeUrl = computed(() => {
    const url = this.pdfViewer.openUrl()
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null
  })
}
