import { Routes } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { BookWorkoutComponent } from './pages/book-workout/book-workout.component'
import { PdfLibraryComponent } from './pages/pdf-library/pdf-library.component'

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'book', component: BookWorkoutComponent },
    { path: 'pdfs', component: PdfLibraryComponent },
    { path: '**', redirectTo: '' },
]
