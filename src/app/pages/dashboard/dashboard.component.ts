import { Component, OnInit, signal, computed, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { ApiService, BmiResult } from '../../services/api.service'
import { LocaleService } from '../../services/locale.service'
import { PdfCardComponent } from '../../components/pdf-card/pdf-card.component'
import { PDF_CATALOG } from '../../config/pdfs.config'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PdfCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  bmiHeight = signal(175)
  bmiWeight = signal(70)
  bmiAge = signal(25)
  bmiResult = signal<BmiResult | null>(null)

  public api = inject(ApiService)
  public locale = inject(LocaleService)

  stepsPercent = computed(() => {
    const d = this.api.dashboard()
    if (!d) return 0
    return Math.min((d.steps / d.stepsGoal) * 100, 100)
  })

  hydrationPercent = computed(() => {
    const d = this.api.dashboard()
    if (!d) return 0
    return Math.min((d.hydrationCups / d.hydrationGoal) * 100, 100)
  })

  trainingPercent = computed(() => {
    const d = this.api.dashboard()
    if (!d) return 0
    return Math.min((d.trainingMinutes / d.trainingGoal) * 100, 100)
  })

  stepsStrokeDashoffset = computed(() => {
    const circumference = 2 * Math.PI * 42
    return circumference - (this.stepsPercent() / 100) * circumference
  })

  stepsCircumference = 2 * Math.PI * 42

  ngOnInit() {
    this.api.loadDashboard()
  }

  addCup() {
    this.api.addHydrationCup()
  }

  logWorkout() {
    this.api.logManualWorkout(30)
  }

  calculateBmi() {
    this.api.calculateBmi(this.bmiHeight(), this.bmiWeight(), this.bmiAge()).subscribe({
      next: (result) => this.bmiResult.set(result),
    })
  }

  getBmiCategoryLabel(category: string): string {
    return this.locale.t(`bmi.${category}`)
  }

  shareToWhatsApp(prizeName: string) {
    const text = `${this.locale.t('rewards.iWonPrize')}${prizeName}! 🏆⚓️`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  readonly pdfCarouselItems = PDF_CATALOG

  /** Max chars for carousel card titles so all cards have same height */
  readonly pdfCarouselTitleMaxLength = 18
}
