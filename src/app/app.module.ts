import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
const dbconfig: DBConfig = {
  name: 'myDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'token',
      storeConfig: { keyPath: 'id', autoIncrement: true},
      storeSchema: [
        {
          name: 'name',
          keypath: 'name',
          options: { unique: false}
        },
        {
          name: 'contact',
          keypath: 'contact',
          options: { unique: false}
        },
        {
          name: 'address',
          keypath: 'address',
          options: { unique: false}
        },
        {
          name: 'tomato',
          keypath: 'tomato',
          options: { unique: false}
        },
        {
          name: 'ginger',
          keypath: 'ginger',
          options: { unique: false}
        },
        {
          name: 'shallot',
          keypath: 'shallot',
          options: { unique: false}
        }
      ]
    },
    {
      store: 'count',
      storeConfig: { keyPath: 'c_id', autoIncrement: true},
      storeSchema: [
        {
          name: 'tomato',
          keypath: 'tomato',
          options: { unique: false}
        },
        {
          name: 'ginger',
          keypath: 'ginger',
          options: { unique: false}
        },
        {
          name: 'shallot',
          keypath: 'shallot',
          options: { unique: false}
        },
        
      ]
    }
  ]
}
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbconfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
