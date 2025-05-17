import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DbService } from '../db.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet;charset=UTF-8';
declare var $: any;
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.less']
})
export class CustomerListComponent implements OnInit {
  customerData: any = []
  usedTomato: any = 0;
  usedGinger: any = 0;
  usedShallot: any = 0;
  addform = new FormGroup({
    tomato: new FormControl(0),
    ginger: new FormControl(0),
    shallot: new FormControl(0),
  })
  constructor(private router: Router, public dataservice: DataService, private dbService: DbService) { }

  ngOnInit(): void {
    this.dbService.getDb().subscribe((data: any) => {
      this.customerData = data;
      this.customerData.forEach((element: any) => {
        this.usedTomato = this.usedTomato + Number(element.tomato)
        this.usedGinger = this.usedGinger + Number(element.ginger)
        this.usedShallot = this.usedShallot + Number(element.shallot)

      });
    })
    this.dbService.getCountDb().subscribe((data: any) => {
      this.addform.patchValue({
        tomato: Number(data[0]['tomato']),
        shallot: Number(data[0]['shallot']),
        ginger: Number(data[0]['ginger']),
      })
    })


  }
  gotoDetails(id: any) {
    this.router.navigate(['/details'], { queryParams: { id: id } })

  }
  gotoEdit(id: any) {
    if (id) {
      this.router.navigate(['/add'], { queryParams: { id: id } })

    }
    else {
      this.router.navigate(['/add'])

    }

  }
  cancel() {
    $('#modalcount').modal('hide')
  }
  open() {
    this.dbService.getCountDb().subscribe((data: any) => {
      this.addform.patchValue({
        tomato: Number(data[0]['tomato']),
        shallot: Number(data[0]['shallot']),
        ginger: Number(data[0]['ginger']),
      })
      // $('modalcount').modal('show')
    })
    $('#modalcount').modal('show');
  }
  submit() {
    console.log(this.addform.value);

    let val = this.addform.value;
    val['c_id'] = 1;
    this.dbService.updateToCountdb(val).subscribe((data: any) => {
      $('#modalcount').modal('hide');
    })

  }
  exportToExcel() {
    let date = new Date();
    let fileName = 'report'+date + '.xlsx';
    let newdata = this.customerData.map((data: any) =>{
      return{
        'Customer Name': data.name,
        'Contact No': data.contact,
        'Address': data.address,
        'Tomato (no.of box)': data.tomato,
        'Ginger (Kg)': data.ginger,
        'Shallot (Kg)': data.shallot,
      }
    })
    const worksheet: XLSX.WorkSheet =XLSX.utils.json_to_sheet(newdata);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName
    );
  }

}
