import { Component, inject } from '@angular/core'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { LocaleService } from './services/locale.service'
import { PdfViewerOverlayComponent } from './components/pdf-viewer-overlay/pdf-viewer-overlay.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, PdfViewerOverlayComponent],
  template: `
    <router-outlet></router-outlet>
    <app-pdf-viewer-overlay />

    <nav class="bottom-nav">
      <a class="nav-item" routerLink="/book" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
        <span class="material-icons-round">fitness_center</span>
        {{ locale.t('nav.bookWorkout') }}
      </a>
      <a class="nav-item" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
        <span class="material-icons-round">home</span>
        {{ locale.t('nav.home') }}
      </a>
    </nav>
  `,
  styles: [],
})
export class AppComponent {
  public locale = inject(LocaleService)
}
