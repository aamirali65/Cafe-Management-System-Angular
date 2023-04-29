import { Component } from '@angular/core';
import { DataService } from '../../request.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  paidAmount:any
  monthlyPaidAmount:any
  unpaidAmount:any
  monthlyUnpaidAmount:any
  constructor(private api: DataService,private datePipe: DatePipe) {

  }
  now = new Date();
  date = this.datePipe.transform(this.now, 'yyyy-MM-dd');
  ngOnInit(): void {
    this.api.post('todaySale',{date : this.date})
      .subscribe(
        (response: any) => {
          console.log(response)
          this.paidAmount = response.Today_Sale;
          this.unpaidAmount = response.Today_Unpaid;
          this.monthlyPaidAmount = response.This_Month_Sale;
          this.monthlyUnpaidAmount = response.This_Month_Unpaid;
        },
        error => {
         console.log('error')
        }
      );
  }
  
}
