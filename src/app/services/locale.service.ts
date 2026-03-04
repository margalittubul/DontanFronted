import { Injectable, signal } from '@angular/core'
import hebrewData from '../../assets/i18n/hebrew.json'

@Injectable({ providedIn: 'root' })
export class LocaleService {
    private readonly strings = signal<Record<string, unknown>>(hebrewData)

    t(path: string): string {
        const keys = path.split('.')
        let current: unknown = this.strings()
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = (current as Record<string, unknown>)[key]
            } else {
                return path
            }
        }
        return typeof current === 'string' ? current : path
    }
}
