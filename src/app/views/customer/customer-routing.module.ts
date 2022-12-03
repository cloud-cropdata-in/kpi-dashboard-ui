import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmersRightComponent } from './farmers-right/farmers-right.component';
import { FarmersComponent } from './farmers/farmers.component';

const routes: Routes = [  
  {
    path: "",
    data: { 
      title: 'Customer',
      breadcrumb: 
      { 
        alias: 'Customer' 
      } 
    },
    children: [     
      {
        path: '',
        redirectTo: 'farmers',
        pathMatch: "full",
      },
      {
        path: "farmers",
        component: FarmersComponent,
        data: {
          title: 'Farmers Leads',
          breadcrumb: {
            label: 'Farmers Leads',
            alias: 'Farmers Leads',
          }
        },
      },
      {
        path: "farmers-right",
        component: FarmersRightComponent,
        data: {
          title: 'Farmer Rights',
          breadcrumb: {
            label: 'Farmer Rights',
            alias: 'Farmer Rights',
          }
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
