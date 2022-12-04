import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmersCaseComponent } from './farmer-case/farmer-case.component';
import { FarmersRightComponent } from './farmers-right/farmers-right.component';
import { FarmersComponent } from './farmers/farmers.component';
import { LeadVerifiedLeadsComponent } from './leads-verified/leads-verified.component';
import { RightSignComponent } from './right-sign/right-sign.component';

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
          title: 'Farmers Lead',
          breadcrumb: {
            label: 'Farmers Lead',
            alias: 'Farmers Lead',
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


      {
        path: "leads-verified",
        component: LeadVerifiedLeadsComponent,
        data: {
          title: 'Leads Verified',
          breadcrumb: {
            label: 'Leads Verified',
            alias: 'Leads Verified',
          }
        },
      },
      {
        path: "case-registered",
        component: FarmersCaseComponent,
        data: {
          title: 'Cases',
          breadcrumb: {
            label: 'Cases',
            alias: 'Cases',
          }
        },
      },
      {
        path: "right-sign",
        component: RightSignComponent,
        data: {
          title: 'Rights',
          breadcrumb: {
            label: 'Rights',
            alias: 'Rights',
          }
        },
      },
      {
        path: "case-registered",
        component: FarmersCaseComponent,
        data: {
          title: 'Case Registered',
          breadcrumb: {
            label: 'Case Registered',
            alias: 'Case Registered',
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
