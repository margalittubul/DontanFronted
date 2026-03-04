import { Component, OnInit, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ApiService, WorkoutClass } from '../../services/api.service'
import { LocaleService } from '../../services/locale.service'

@Component({
    selector: 'app-book-workout',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './book-workout.component.html',
    styleUrl: './book-workout.component.css',
})
export class BookWorkoutComponent implements OnInit {
    selectedBase = signal<string>('')

    constructor(
        public api: ApiService,
        public locale: LocaleService,
    ) { }

    filteredClasses = computed(() => {
        const schedule = this.api.schedule()
        if (!schedule) return []
        const base = this.selectedBase()
        if (!base) return schedule.classes
        return schedule.classes.filter((c) => c.baseName === base)
    })

    ngOnInit() {
        this.api.loadSchedule()
    }

    selectBase(name: string) {
        this.selectedBase.set(name === this.selectedBase() ? '' : name)
    }

    getBaseDisplayName(name: string): string {
        return this.locale.t(`booking.bases.${name}`)
    }

    register(classItem: WorkoutClass) {
        this.api.bookClass(classItem.id).subscribe({
            next: () => this.api.loadSchedule(this.selectedBase() || undefined),
        })
    }
}
