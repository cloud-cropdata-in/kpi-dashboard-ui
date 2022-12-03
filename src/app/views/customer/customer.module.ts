import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './customer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { DragScrollModule } from 'ngx-drag-scroll';
import { MatTableModule } from '@angular/material/table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FarmersComponent } from './farmers/farmers.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LoadingService } from 'src/app/views/services/loading.service';
import { LoadingInterceptor } from 'src/app/views/services/loading.interceptor';
import { LeadsComponent } from './farmers/leads/leads.component';
import { ExpectedProductionComponent } from './farmers/expected-production/expected-production.component';
import { ExpectedValueComponent } from './farmers/expected-value/expected-value.component';
import { VerifiedLeadsComponent } from './farmers/verified-leads/verified-leads.component';
import { FarmersRightComponent } from './farmers-right/farmers-right.component';
import { BasicAuthHtppInterceptorService } from '../services/basic-auth-htpp-interceptor-service';
import { JwtInterceptor } from '../services/jwt.interceptor';
import { RightsOnboardedComponent } from './farmers-right/rights-onboarded/rights-onboarded.component';
import { ActualCropAreaComponent } from './farmers-right/actual-crop-area/actual-crop-area.component';
import { ActualProductionComponent } from './farmers-right/actual-production/actual-production.component';
import { ActualValueComponent } from './farmers-right/actual-value/actual-value.component';
import { CropAreaComponent } from './farmers/crop-area/crop-area.component';


@NgModule({
  declarations: [
    CustomerComponent,
    //farmers lead component
    FarmersComponent,
    LeadsComponent,
    ExpectedProductionComponent,
    ExpectedValueComponent,
    VerifiedLeadsComponent,
      //farmers right component
    FarmersRightComponent,
    RightsOnboardedComponent,
    ActualCropAreaComponent,
    ActualProductionComponent,
    ActualValueComponent,
    CropAreaComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
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
    CarouselModule
  ],

  providers: [
  ],
})
export class CustomerModule { }
