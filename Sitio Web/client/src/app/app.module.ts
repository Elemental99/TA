import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {
    PageNotFoundComponent
} from './shared/page-not-found/page-not-found.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule(
    {
        declarations: [
            AppComponent,
            LoginComponent,
            RegisterComponent,
            HomeComponent,
            NavbarComponent,
            PageNotFoundComponent
        ],
        imports     : [
            BrowserModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule,
            BrowserAnimationsModule,
            ToastrModule.forRoot(
                {
                    preventDuplicates: true
                }
            )
        ],
        providers   : [CookieService],
        bootstrap   : [AppComponent]
    })
export class AppModule {}
