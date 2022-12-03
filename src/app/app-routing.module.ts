import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { MainContainerComponent } from './container/default-layout/main-container.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGaurdService } from './views/services/auth-gaurd.service';
import { SampleComponent } from './views/temp/sample/sample.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'sample',
    component: SampleComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home',
          data: { breadcrumb: 'Home' },
        },
      },
      {
        path: 'customer',
        canActivate: [AuthGaurdService],
        loadChildren: () =>
          import('./views/customer/customer.module').then(
            (m) => m.CustomerModule
          ),
        data: {
          title: 'Customer',
          breadcrumb: {
            label: 'Customer',
            alias: 'Customer',
          },
        },
      },
    ],
  },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
