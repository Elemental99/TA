import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/auth/login/login.component'
import { RegisterComponent } from './pages/auth/register/register.component'
import {
    PageNotFoundComponent
} from './shared/page-not-found/page-not-found.component'
import { AuthGuard } from './pages/auth/guards/auth.guard'

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    {
        path       : 'login',
        component  : LoginComponent,
        pathMatch  : 'full',
        canActivate: [AuthGuard]
    },
    {
        path       : 'register',
        component  : RegisterComponent,
        pathMatch  : 'full',
        canActivate: [AuthGuard]
    },
    { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
]

@NgModule(
    {
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
export class AppRoutingModule {}