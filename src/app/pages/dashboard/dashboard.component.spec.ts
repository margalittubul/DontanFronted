import { TestBed } from '@angular/core/testing'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { DashboardComponent } from './dashboard.component'

describe('DashboardComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents()
    })

    it('should create', () => {
        const fixture = TestBed.createComponent(DashboardComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    it('should compute 0% steps when dashboard is null', () => {
        const fixture = TestBed.createComponent(DashboardComponent)
        expect(fixture.componentInstance.stepsPercent()).toBe(0)
    })
})
