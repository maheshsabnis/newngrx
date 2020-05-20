import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// importing the StoreModule
import { StoreModule } from '@ngrx/store';
// import mainReducres
import { mainReducers } from './reducers/app.reducers';
// EffectModule for all Async Operations
import { EffectsModule } from '@ngrx/effects';
// ProductsEffects containing all Async operations
import { ProductsEffects } from './effects/app.product.effect';
// StoreDevtoolsModule, provide the simulation of NGRX Store
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { environment } from '../environments/environment.prod';
import { ProductFormComponent } from './components/app.productform.component';
import { ProductListComponent } from './components/app.productlist.component';
import { ProductEditFormComponent } from './components/app.editproduct.component';
import { MainComponent } from './components/app.main.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent, ProductFormComponent, ProductListComponent,
    ProductEditFormComponent, MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // importing the StoreModule for the application
    // provide the store for the application
    // so that all components will be able to read/write data in store
    // the store will be managed by 'mainReducers' object
    StoreModule.forRoot(mainReducers),
    // All Async operations are initialized at app level
    // using EffectsModule
    EffectsModule.forRoot([ProductsEffects]),
    AppRoutingModule, FormsModule, HttpClientModule,
    // StoreDevtoolsModule, simulation
    StoreDevtoolsModule.instrument({
      name: 'My NgRx App',
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
