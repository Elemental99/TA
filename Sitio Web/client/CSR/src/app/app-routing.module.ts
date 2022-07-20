import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { IndexBarComponent } from './pages/bares/index-bar/index-bar.component'
import {
    ConsultarReservationsComponent,
} from './pages/reservations/consultar-reservations/consultar-reservations.component'
import { CookieGuard } from './shared/guards/cookie.guard'
import {
    CrearReservationsComponent,
} from './pages/reservations/crear-reservations/crear-reservations.component'
import { LoginComponent } from './pages/auth/login/login.component'
import { RegisterComponent } from './pages/auth/register/register.component'
import {
    PageNotFoundComponent,
} from './shared/page-not-found/page-not-found.component'
import { AuthGuard } from './shared/guards/auth.guard'
import { PerfilComponent } from './shared/perfil/perfil.component'

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'bar', component: IndexBarComponent, pathMatch: 'full' },
    {
        path       : 'consultar-reservacion',
        component  : ConsultarReservationsComponent,
        pathMatch  : 'full',
        canActivate: [CookieGuard],
    },
    {
        path       : 'modificar-reservacion/:id',
        component  : CrearReservationsComponent,
        pathMatch  : 'full',
        canActivate: [CookieGuard],
    },
    {
        path       : 'crear-reservacion',
        component  : CrearReservationsComponent,
        pathMatch  : 'full',
        canActivate: [CookieGuard],
    },
    {
        path       : 'login',
        component  : LoginComponent,
        pathMatch  : 'full',
        canActivate: [AuthGuard],
    },
    {
        path       : 'register',
        component  : RegisterComponent,
        pathMatch  : 'full',
        canActivate: [AuthGuard],
    },
    {
        path       : 'perfil',
        component  : PerfilComponent,
        pathMatch  : 'full',
        canActivate: [CookieGuard],
    },
    { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
]

@NgModule(
    {
        imports: [RouterModule.forRoot( routes )],
        exports: [RouterModule],
    } )
export class AppRoutingModule {}