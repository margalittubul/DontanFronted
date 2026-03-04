import { TestBed } from '@angular/core/testing'
import { LocaleService } from './locale.service'

describe('LocaleService', () => {
    let service: LocaleService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(LocaleService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should return Hebrew translation for valid path', () => {
        expect(service.t('nav.home')).toBe('בית')
    })

    it('should return path for invalid key', () => {
        expect(service.t('nonexistent.key')).toBe('nonexistent.key')
    })

    it('should return nested translations', () => {
        expect(service.t('booking.bases.batzet')).toBe('בצת')
    })
})
