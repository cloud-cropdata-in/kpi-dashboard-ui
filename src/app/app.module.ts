import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './container/header/header.component';
import { TopbarComponent } from './container/topbar/topbar.component';
import { BottombarComponent } from './container/bottombar/bottombar.component';
import { MainContainerComponent } from './container/default-layout/main-container.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { ChartsModule } from 'ng2-charts';
import { DragScrollModule } from 'ngx-drag-scroll';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NotificationComponent } from './container/notification/notification.component';
import { HomeComponent } from './views/home/home.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { LoadingService } from './views/services/loading.service';
import { LoadingInterceptor } from './views/services/loading.interceptor';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BasicAuthHtppInterceptorService } from './views/services/basic-auth-htpp-interceptor-service';
import { JwtInterceptor } from './views/services/jwt.interceptor';
import { SampleComponent } from './views/temp/sample/sample.component';
import { MarkerService } from './marker.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopbarComponent,
    BottombarComponent,
    P404Component,
    P500Component,
    MainContainerComponent,
    LoginComponent,
    NotificationComponent,
    HomeComponent,
    LoadingComponent,
    SampleComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    /**/
    ChartsModule,
    DragScrollModule,
    MatTabsModule,
    NgApexchartsModule,
    MatCarouselModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule,
    CarouselModule,
  ],
  providers: [
    LoadingService,
    MarkerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: BasicAuthHtppInterceptorService,
    //   multi: true
    // },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }