import { TestBed } from '@angular/core/testing'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { BookWorkoutComponent } from './book-workout.component'

describe('BookWorkoutComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BookWorkoutComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents()
    })

    it('should create', () => {
        const fixture = TestBed.createComponent(BookWorkoutComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    it('should start with no selected base', () => {
        const fixture = TestBed.createComponent(BookWorkoutComponent)
        expect(fixture.componentInstance.selectedBase()).toBe('')
    })
})
