import { Component } from '@angular/core';
import { DataService } from '../../request.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent {
  orderForm:any = FormGroup
  loader :boolean = false;
  constructor( private api: DataService,private toastr: ToastrService,private fb: FormBuilder,private datePipe: DatePipe){

  }
  ngOnInit(): void {
    this.allcatlog();
    this.items_find(20);
    this.reterive_items();

    this.orderForm = this.fb.group({

      order_type: '',
      total_price: '',
      user_id: '',
      order: this.fb.group({
        item_id: '',
        price: '',
        qty: '',

      })
    });
  }
  activeFilter = 'all';
  active = 1;
  now = new Date();
  formattedDate = this.datePipe.transform(this.now, 'yyyy-MM-dd');
  formattedTime = this.datePipe.transform(this.now, 'HH:mm:ss');
  categories:any;
  items :any;
  return = 0;
  order_id:any = 1;
  inputValue:any;
  cart_item:any;
  empty:any = true;
  total_price:any = 0;
  user:any = localStorage.getItem('me');
  id:any = JSON.parse(this.user);

  increment(id:any) {
    this.api.post('tempOrder/increment', {"order_id":this.order_id,"item_id":id})
  .subscribe(
    (response: any) => {

      this.reterive_items()
    },
    error => {


    })
  }

  decrement(id:any) {
    this.api.post('tempOrder/decrement', {"order_id":this.order_id,"item_id":id})
    .subscribe(
      (response: any) => {

        this.reterive_items()
      },
      error => {


      })

  }

  setActiveFilter(filter: string) {
    this.activeFilter = filter;
  }
  allcatlog() {
    this.api.get('category/list')
      .subscribe(
        (response: any) => {
          this.categories = response;

        },
        error => {

        }
      );
  }
items_find(id:any){
this.loader = true;
  this.api.post('category/find', {"id":id})
  .subscribe(
    (response: any) => {
    this.items = response
      this.loader = false

    },


  );
}

onInputChange(value: number) {
  this.return = (value - this.total_price)
}
add_to_cart(order_id:any,item:any){

  if(item.manage_stock == 1 && item.stock == 0){
    this.toastr.error(`${item.name} is Out Of Stock`, 'Error', {
      positionClass: 'toast-center-center', // center the toast horizontally and vertically

    });
     return ;
  }

  this.api.post('tempOrder/add', {"order_id":order_id,"item_qty":"1","total_price":item.price,"item_id":item.id})
  .subscribe(
    (response: any) => {
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Data has been Added to Cart!'
      // });
      this.reterive_items()
    },
    error => {
      this.toastr.error('An error occurred while deleting data!', 'Error', {
        positionClass: 'toast-center-center', // center the toast horizontally and vertically

      });

    })

}

reterive_items(){


  this.api.post('tempOrder/list', {"order_id":this.order_id})
  .subscribe(
    (response: any) => {

   this.cart_item = response;
   this.empty = !(this.cart_item.length > 0);

   this.total_price = 0;
   this.cart_item.forEach((element:any) => {
    this.total_price += (element.item_qty * element.total_price)
   });
    }

  );


}

remove_items(id:any){

  this.api.get(`tempOrder/delete/${id}`)
  .subscribe(
    (response: any) => {
      this.reterive_items()
    }
  );
}
//
price_check(price:any){

  console.log(price);
}

onPrint(divName:any) {

let order:any = [];
  this.cart_item.forEach((element:any) => {
     order.push({
        item_id: element.item.id,
        price: element.item_qty * element.total_price,
        qty: element.item_qty,

     })
   });


  const updatedOrder = {

    order_type: this.order_id,
    total_price: this.total_price,
    user_id: this.id.id,
    order:order

  };

  this.api.post('order/add', updatedOrder)
  .subscribe(
    (response: any) => {

    }
  );

  const element = document.getElementById(divName);
if (element !== null) {
  const printContents = element.innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  Swal.fire({
    icon: 'success',
    title: 'Thank you for your order... !'
  });
  window.location.reload();

} else {
  console.error(`Element with ID ${divName} not found!`);
}
 }

 onEnter(divName:any){
  this.onPrint(divName);
 }
}
