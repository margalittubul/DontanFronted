import { Routes } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { BookWorkoutComponent } from './pages/book-workout/book-workout.component'
import { PdfLibraryComponent } from './pages/pdf-library/pdf-library.component'
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular'

export const routes: Routes = [
  //, canActivate: [MsalGuard]
  { path: '', component: DashboardComponent , canActivate: [MsalGuard]},
  { path: 'book', component: BookWorkoutComponent },
  { path: 'pdfs', component: PdfLibraryComponent },
  { path: 'auth', component: MsalRedirectComponent },
  { path: '**', redirectTo: '' },
]
