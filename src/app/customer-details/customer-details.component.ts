import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.less']
})
export class CustomerDetailsComponent implements OnInit {
  id:any = '';
  
  customerDetails: any =[] ;
  constructor(private activatedRoute: ActivatedRoute,private dataservice: DataService) { 
    activatedRoute.queryParams.subscribe((params) =>{
      this.id = params.id;
      this.getData()
    })
  }

  ngOnInit(): void {
  }
  getData(){
    // this.customerDetails = this.dataservice.customerData.filter((data : any) =>  data.id = this.id);
  }

}
