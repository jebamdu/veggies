import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(public ngxIndexedDBService: NgxIndexedDBService) { }
  public addTodb(data: {name: any,contact: any,address: any,tomato: any,ginger: any,shallot: any}){
    return this.ngxIndexedDBService.add('token', data)
  }
  public updateTodb(data: {id: any,name: any,contact: any,address: any,tomato: any,ginger: any,shallot: any}){
    return this.ngxIndexedDBService.update('token',data)
  }
  public deletedb(id: any){
    return this.ngxIndexedDBService.delete('token',id)
  }
  public getDb(){
    return this.ngxIndexedDBService.getAll('token')
  }
  public addToCountdb(data: {tomato: any,ginger: any,shallot: any}){
    return this.ngxIndexedDBService.add('count', data)
  }
  public updateToCountdb(data: {c_id: any,tomato: any,ginger: any,shallot: any}){
    return this.ngxIndexedDBService.update('count',data)
  }
  public deleteCountdb(c_id: any){
    return this.ngxIndexedDBService.delete('count',c_id)
  }
  public getCountDb(){
    return this.ngxIndexedDBService.getAll('count')
  }
}
