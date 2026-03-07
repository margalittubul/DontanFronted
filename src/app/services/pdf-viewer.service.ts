import { Injectable, signal } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class PdfViewerService {
  readonly openUrl = signal<string | null>(null)

  open(url: string): void {
    this.openUrl.set(url)
  }

  close(): void {
    this.openUrl.set(null)
  }
}
