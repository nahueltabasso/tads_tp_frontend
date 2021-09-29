import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";

import { AppComponent } from './app.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.ws_server, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NotPageFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    RecaptchaV3Module,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LdsSXUbAAAAAANcS50vKoCk3elwXAcLGlrZV03h" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
