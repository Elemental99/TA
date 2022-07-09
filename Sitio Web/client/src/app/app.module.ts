import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CookieModule, CookieService } from 'ngx-cookie'
import {
    CrearReservationsComponent,
} from './pages/reservations/crear-reservations/crear-reservations.component'
import {
    ConsultarReservationsComponent,
} from './pages/reservations/consultar-reservations/consultar-reservations.component'
import {
    JwtInterceptorsInterceptor,
} from './shared/interceptors/jwt-interceptors.interceptor'
import { LoginComponent } from './pages/auth/login/login.component'
import { RegisterComponent } from './pages/auth/register/register.component'
import { HomeComponent } from './pages/home/home.component'
import { NavbarComponent } from './shared/navbar/navbar.component'
import {
    PageNotFoundComponent,
} from './shared/page-not-found/page-not-found.component'
import { IndexBarComponent } from './pages/bares/index-bar/index-bar.component'

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
            ConsultarReservationsComponent,
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule,
            CookieModule.withOptions(),
        ],
        providers: [
            CookieService,
            {
                provide : HTTP_INTERCEPTORS,
                useClass: JwtInterceptorsInterceptor,
                multi   : true,
            },
        ],
        bootstrap: [AppComponent],
        schemas  : [CUSTOM_ELEMENTS_SCHEMA],
    },
)
export class AppModule {}
