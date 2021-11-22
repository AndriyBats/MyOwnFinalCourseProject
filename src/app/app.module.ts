import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormControllerModule } from "angular-reactive-dynamic-forms";

import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAuth, getAuth} from '@angular/fire/auth';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

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
import { NewsDetailsComponent } from './page/news-details/news-details.component';
import { ResearchPackageComponent } from './page/research-package/research-package.component';
import { ResearchPackageDetailsComponent } from './page/research-package-details/research-package-details.component';
import { SearchPipe } from './shared/pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AnalyzesAndCostComponent,
    DiscountComponent,
    ObjectCallComponent,
    NewsComponent,
    AdminComponent,
    AdminAnalyzesAndCostComponent,
    AdminDiscountComponent,
    AdminNewsComponent,
    AdminResearchPackagesComponent,
    DiscountsDetailsComponent,
    ContractComponent,
    AdminOrdersComponent,
    BasketComponent,
    ProfileComponent,
    NewsDetailsComponent,
    ResearchPackageComponent,
    ResearchPackageDetailsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DynamicFormControllerModule,
    SlickCarouselModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
