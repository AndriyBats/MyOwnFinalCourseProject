import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { AnalyzesAndCostComponent } from './page/analyzes-and-cost/analyzes-and-cost.component';
import { DiscountComponent } from './page/discount/discount.component';
import { ObjectCallComponent } from './page/object-call/object-call.component';
import { NewsComponent } from './page/news/news.component';

import { AdminComponent } from './admin/admin.component';
import { AdminAnalyzesAndCostComponent } from './admin/admin-analyzes-and-cost/admin-analyzes-and-cost.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminResearchPackagesComponent } from './admin/admin-research-packages/admin-research-packages.component';
import { DiscountsDetailsComponent } from './page/discounts-details/discounts-details.component';
import { ContractComponent } from './page/contract/contract.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { BasketComponent } from './page/basket/basket.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ProfileGuard } from './shared/guards/profile/profile.guard';
import { NewsDetailsComponent } from './page/news-details/news-details.component';
import { ResearchPackageComponent } from './page/research-package/research-package.component';
import { ResearchPackageDetailsComponent } from './page/research-package-details/research-package-details.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'analyzes-and-cost', component: AnalyzesAndCostComponent},
  {path: 'discounts', component: DiscountComponent},
  {path: 'discounts/:id', component: DiscountsDetailsComponent},
  {path: 'object-call', component: ObjectCallComponent},
  {path: 'news', component: NewsComponent},
  {path: 'news/:id', component: NewsDetailsComponent},
  {path: 'research-package', component: ResearchPackageComponent},
  {path: 'research-package/:id', component: ResearchPackageDetailsComponent},
  {path: 'contract', component: ContractComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'profile', component: ProfileComponent,  canActivate: [ProfileGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    {path: '', pathMatch: 'full', redirectTo: 'admin-analyzes-and-cost'},
    {path: 'admin-analyzes-and-cost', component: AdminAnalyzesAndCostComponent},
    {path: 'admin-discount', component: AdminDiscountComponent },
    {path: 'admin-news', component: AdminNewsComponent },
    {path: 'admin-research-packages', component: AdminResearchPackagesComponent },
    {path: 'admin-orders', component: AdminOrdersComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
