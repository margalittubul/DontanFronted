import { Injectable, signal } from '@angular/core'
import { of, Observable } from 'rxjs'
import { delay } from 'rxjs/operators'

export interface DashboardSummary {
  anchors: number
  sportsStars: number
  steps: number
  hydrationCups: number
  trainingMinutes: number
  sleepHours: number
  stepsGoal: number
  hydrationGoal: number
  trainingGoal: number
  sleepGoal: number
}

export interface BmiResult {
  bmi: number
  category: string
}

export interface WorkoutClass {
  id: string
  baseName: string
  className: string
  dayOfWeek: number
  startTime: string
  instructor: string
  capacity: number
  registeredCount: number
}

export interface ScheduleResponse {
  bases: { name: string; imageUrl: string }[]
  classes: WorkoutClass[]
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  dashboard = signal<DashboardSummary | null>(null)
  schedule = signal<ScheduleResponse | null>(null)
  isLoading = signal(false)

  // --- MOCK DATA ---
  private mockDashboardData: DashboardSummary = {
    anchors: 1450,
    sportsStars: 3,
    steps: 8432,
    hydrationCups: 6,
    trainingMinutes: 45,
    sleepHours: 6.5,
    stepsGoal: 10000,
    hydrationGoal: 10,
    trainingGoal: 120,
    sleepGoal: 7,
  }

  private mockBases = [
    { name: 'batzet', imageUrl: '' },
    { name: 'machi', imageUrl: '' },
    { name: 'zis', imageUrl: '' },
    { name: 'ashdod', imageUrl: '' },
  ]

  private mockClasses: WorkoutClass[] = [
    {
      id: '1',
      baseName: 'machi',
      className: 'TRX & Core',
      dayOfWeek: 1,
      startTime: '06:00',
      instructor: 'סגן אורן',
      capacity: 20,
      registeredCount: 18,
    },
    {
      id: '2',
      baseName: 'machi',
      className: 'CrossFit',
      dayOfWeek: 1,
      startTime: '17:30',
      instructor: 'רס"ר כהן',
      capacity: 30,
      registeredCount: 30,
    },
    {
      id: '3',
      baseName: 'batzet',
      className: 'Morning Run',
      dayOfWeek: 1,
      startTime: '05:30',
      instructor: 'סמ"ר דוד',
      capacity: 50,
      registeredCount: 12,
    },
    {
      id: '4',
      baseName: 'zis',
      className: 'Combat Fitness',
      dayOfWeek: 2,
      startTime: '16:00',
      instructor: 'סרן לוי',
      capacity: 25,
      registeredCount: 22,
    },
    {
      id: '5',
      baseName: 'ashdod',
      className: 'Swimming',
      dayOfWeek: 3,
      startTime: '07:00',
      instructor: 'רב"ט שירה',
      capacity: 15,
      registeredCount: 5,
    },
  ]

  loadDashboard() {
    this.isLoading.set(true)
    // Simulate network delay
    setTimeout(() => {
      this.dashboard.set({ ...this.mockDashboardData })
      this.isLoading.set(false)
    }, 600)
  }

  addHydrationCup() {
    const current = this.dashboard()
    if (!current) return
    this.mockDashboardData.hydrationCups = Math.min(
      current.hydrationCups + 1,
      current.hydrationGoal,
    )
    this.dashboard.set({ ...this.mockDashboardData })
  }

  logManualWorkout(minutes: number) {
    const current = this.dashboard()
    if (!current) return
    this.mockDashboardData.trainingMinutes += minutes
    this.dashboard.set({ ...this.mockDashboardData })
  }

  calculateBmi(height: number, weight: number, age: number): Observable<BmiResult> {
    const heightInMeters = height / 100
    const bmi = Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10

    let category: string
    if (bmi < 18.5) category = 'underweight'
    else if (bmi < 25) category = 'normal'
    else if (bmi < 30) category = 'overweight'
    else category = 'obese'

    return of({ bmi, category }).pipe(delay(400))
  }

  loadSchedule(baseName?: string) {
    this.isLoading.set(true)
    setTimeout(() => {
      let filtered = this.mockClasses
      if (baseName) {
        filtered = this.mockClasses.filter((c) => c.baseName === baseName)
      }
      this.schedule.set({ bases: this.mockBases, classes: filtered })
      this.isLoading.set(false)
    }, 500)
  }

  bookClass(workoutClassId: string): Observable<boolean> {
    const cls = this.mockClasses.find((c) => c.id === workoutClassId)
    if (cls && cls.registeredCount < cls.capacity) {
      cls.registeredCount++
    }
    return of(true).pipe(delay(300))
  }

  validateUser(): Observable<{ isUser: boolean; isAdmin: boolean; isGlobalAdmin: boolean }> {
    return of({
      isUser: true,
      isAdmin: false,
      isGlobalAdmin: false,
    })
  }
}
