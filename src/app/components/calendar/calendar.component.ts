import { Component } from "@angular/core";
import { DataService } from '../../request.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbAccordionModule,
  NgbDate,
} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
})
export class CalendarComponent {
  currentDate: NgbDateStruct;
  loader = true
  today: string;
  day: string;
  selected_date:any;
  minDate: NgbDateStruct;
  total_price:any = 0;
  month:any;
  selectedDate:any = NgbDate;
  now = new Date();
  formattedDate = this.datePipe.transform(this.now, 'yyyy-MM-dd');
  formattedTime = this.datePipe.transform(this.now, 'HH:mm:ss');
  username:any
year:any;
user:any
  details :any;
  maxDate: NgbDateStruct;
  constructor(public calendar: NgbCalendar, private api: DataService,private datePipe: DatePipe) {
    // this.selected_date = this.calendar.getToday();
    // console.log(this.selected_date)
    this.currentDate = this.calendar.getToday();
    const users = localStorage.getItem('me')
    const userJson =  JSON.parse(users!)
        this.user = userJson.name
    const date = new Date();

    this.today = date.toLocaleDateString("en-US", { day: "numeric" });
    this.day = date.toLocaleDateString("en-US", { weekday: "long" });
    this.year= date.toLocaleDateString("en-US", { year: "numeric" });
    this.month =  date.toLocaleDateString("en-US", { month: "numeric" });
    // this.onDateSelection();
const format = `${this.year}-${this.month}-${ this.today}`;
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.minDate = new NgbDate(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, firstDayOfMonth.getDate());
    this.maxDate = new NgbDate(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth() + 1, lastDayOfMonth.getDate());

this.current_date(format)
  }
  onDateSelection() {

    this.today =  new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day).toLocaleDateString('en-US', {day: "numeric"});
    this.day =  new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day).toLocaleDateString('en-US', { weekday: 'long'});
    const year = this.selectedDate.year;
    const month = String(this.selectedDate.month).padStart(2, '0');
    const day = String(this.selectedDate.day).padStart(2, '0');
    const format = `${year}-${month}-${day}`;
    console.log(format);

    this.api.post('order/detail', {"date":format})
    .subscribe(
      (response: any) => {
        this.details = response
        let orders = this.details
        let total = orders.reduce((acc:any, cur:any) => acc + Number(cur.amount), 0);
        this.total_price =  total.toLocaleString()
        this.loader = false
      }
      
      );
      this.loader = true

    }

    current_date(format:any){
      const currentDate = new Date();
      this.selectedDate = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate()
      };
      console.log(this.selectedDate);
      this.api.post('order/detail', {"date":format})
    .subscribe(
      (response: any) => {
      this.details = response
      let orders = this.details
      this.loader = false
      let total = orders.reduce((acc:any, cur:any) => acc + Number(cur.amount), 0);
      this.total_price =  total.toLocaleString()

      }

    );
    }

    activePanelId = 'panel-0';


    onPanelToggle(panelId: string) {
      this.activePanelId = panelId;
    }




    printAll(divName:any){
      const element = document.getElementById(divName);
if (element !== null) {
  const printContents = element.innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();

} else {
  console.error(`Element with ID ${divName} not found!`);
}
    }
}
