import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './pages/auth/login/login.component'
import { RegisterComponent } from './pages/auth/register/register.component'
import { HomeComponent } from './pages/home/home.component'
import { NavbarComponent } from './shared/navbar/navbar.component'
import {
    PageNotFoundComponent,
} from './shared/page-not-found/page-not-found.component'
import { CookieModule } from 'ngx-cookie';
import { IndexBarComponent } from './pages/bares/index-bar/index-bar.component';
import { CrearReservationsComponent } from './pages/reservations/crear-reservations/crear-reservations.component'

@NgModule(
    {
        declarations: [
            AppComponent,
            LoginComponent,
            RegisterComponent,
            HomeComponent,
            NavbarComponent,
            PageNotFoundComponent,
            IndexBarComponent,
            CrearReservationsComponent,
        ],
        imports     : [
            BrowserModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule,
            CookieModule.withOptions(),
        ],
        providers   : [],
        bootstrap   : [AppComponent],
    },
)
export class AppModule {}
