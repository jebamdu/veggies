import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { DbService } from '../db.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.less']
})
export class CustomerComponent implements OnInit {
  addform = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl(''),
    tomato: new FormControl(0),
    shallot: new FormControl(0),
    ginger: new FormControl(0),
  })
  id: any = '';
  edit: boolean = false;
  customerDetails: any = []
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dataservice: DataService, private dbService: DbService) {
    activatedRoute.queryParams.subscribe((params) => {
      this.id = params.id;
      if (this.id) {
        this.getData();
        this.edit = true;
      }


    })
  }

  ngOnInit(): void {
  }
  cancel() {
    this.router.navigate(['/'])
  }
  submit() {
    console.log(this.addform.value);

    if (this.edit) {
      let val = this.addform.value;
      val['id'] = Number(this.id);
      this.dbService.updateTodb(val).subscribe((data: any) => {
        console.log('updateTodb', data);
        this.router.navigate(['/'])
      })
    }
    else {
      // let val = this.addform.value;
      // val['id'] = this.dataservice.customerData.length + 1;
      // this.dataservice.customerData.push(this.addform.value);
      this.dbService.addTodb(this.addform.value).subscribe((id: any) => {
        console.log('added', id);
        this.router.navigate(['/'])
      })

    }

  }
  getData() {
    this.dbService.getDb().subscribe((data: any) => {
      console.log('get', data);
      let customerData = data;
      this.customerDetails = customerData.filter((data: any) => Number(data.id) === Number(this.id));
      console.log(this.id,this.customerDetails)
      
      this.addform.patchValue({
        name: this.customerDetails[0]['name'],
        address: this.customerDetails[0]['address'],
        contact: this.customerDetails[0]['contact'],
        tomato: this.customerDetails[0]['tomato'],
        shallot: this.customerDetails[0]['shallot'],
        ginger: this.customerDetails[0]['ginger'],
      })
    })

  }


}
