import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../request.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],

})
export class ItemsComponent {
  activeItem: string;
  iconName: string = '';
  item_for_update:any
  isChecked:any ;
  item_add: any = FormGroup;
  selectedOption: any;
  image: any;
  categories: any
  isSubmited: any = false
  isSubmited_items: any = false
  menuItems: any;
  formData: any = FormGroup;
  baractive:any=0;
  selectedImageIndex: number = -1;
  selectedImageIndex_2: number = -1;
  name: any;
  icon: any;
  image2:any
  itemForm:any = FormGroup;
  images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];
  images2: string[] = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
    '11.png',
    '12.png',
    '13.png',
    '14.png',
    '15.png',
    '16.png',
    '17.png',
    '18.png'
  ];

  constructor(private fg: FormBuilder, private api: DataService, private toastr: ToastrService, private fb: FormBuilder, private modalService: NgbModal) {
    this.activeItem = '';

    this.createForm();
  }
  ngOnInit(): void {
    this.allcatlog();
    this.all_items();
    this.formData.reset();
    this.isSubmited = false

    this.item_add = this.fg.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      manage_stock: [''],

      stock: ['', Validators.required],
      image: ['', Validators.required],
      catlog_id: ['', Validators.required]
    });


    this.itemForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      catlog_id: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      image: ['', Validators.required],
      manage_stock: ['']
    });
  }
  createForm() {
    this.formData = this.fg.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }
  add_item = true
  view_item = false
  add_cates = false
  view_cates = false
  item_name: any = 'Add Items'
  add_items() {
    this.add_item = true
    this.view_item = false
    this.add_cates = false
    this.view_cates = false
    this.item_name = 'Add Items'



  }
  view_items() {
    this.view_item = true
    this.add_item = false
    this.add_cates = false
    this.view_cates = false
    this.item_name = 'View Items'
  }
  add_cate() {
    this.view_item = false
    this.add_item = false
    this.add_cates = true
    this.view_cates = false
    this.item_name = 'Add Category'
    console.log(this.images)
  }
  view_cate() {
    this.view_cates = true
    this.view_item = false
    this.add_item = false
    this.add_cates = false
    this.item_name = 'View Category'
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true,windowClass: 'img-modal' }).result.then((result) => {

    }, (reason) => {

    });
  }
  open2(content2: any) {
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title', centered: true,windowClass: 'img-modal' }).result.then((result) => {

    }, (reason) => {

    });
  }
  onSubmit() {
    this.isSubmited = true

    if (this.formData.invalid) {
      return;
    }
    // send data to the service for further processing
    this.api.post('category/add', this.formData.value)
      .subscribe(
        (response: any) => {
          this.allcatlog();
          this.toastr.success('Data has been Saved!', 'Success', {
            positionClass: 'toast-center-center',
          });
          this.formData.reset();
          this.isSubmited = false
        },
        error => {
          this.toastr.error('An error occurred while saving the data!', 'Error', {
            positionClass: 'toast-center-center', // center the toast horizontally and vertically

          });
        }
      );
  }

  setIcon(imageName: string, index: number) {
    this.icon = imageName;

    this.selectedImageIndex = index;

  }
  setImage(imageName: string, index: number) {
    this.image = imageName;
    this.selectedImageIndex_2 = index;


  }
  setImages(imageName: string, index: number){
    this.image2 = imageName;
    this.selectedImageIndex_2 = index;

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
  destroy(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.post('category/delete', { "id": id })
        .subscribe(
          (response: any) => {
            this.allcatlog();
            Swal.fire({
              icon: 'success',
              title: 'Data Delete successfully'
            });
          },
          error => {
            this.toastr.error('An error occurred while deleting data!', 'Error', {
              positionClass: 'toast-center-center', // center the toast horizontally and vertically
  
            });
          }
        );
      } else {
       return
      }
    });
    
  }


  // set border
  store_items() {

    this.isSubmited_items = true
    console.log(this.item_add);
    if (this.item_add.invalid) {
      return;
    }

    this.api.post('item/add', this.item_add.value)
      .subscribe(
        (response: any) => {

          Swal.fire({
            icon: 'success',
            title: 'Data Added successfully'
          });
          this.all_items();
          this.item_add.reset();
          this.isSubmited_items = false
        },
        error => {
          this.toastr.error('An error occurred while deleting data!', 'Error', {
            positionClass: 'toast-center-center', // center the toast horizontally and vertically

          });
        }
      );

  }

  all_items() {

    this.api.get('item/list')
      .subscribe(
        (response: any) => {
          this.menuItems = response;


        },

      );
  }

  delete_items(id:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.get(`item/delete/${id}`)
        .subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Data Delete successfully'
            });
            this.all_items();
  
          },
          error => {
            this.toastr.error('An error occurred while deleting data!', 'Error', {
              positionClass: 'toast-center-center', // center the toast horizontally and vertically
  
            });
  
  
          },
  
        );
      } else {
        return
      }
    });

  }


  editModal(edit: any,items:any) {

    this.item_for_update = items;
    this.itemForm.patchValue({
      id: this.item_for_update.id,
      name: this.item_for_update.name,
      catlog_id: this.item_for_update.catlog_id,
      price: this.item_for_update.price,
      stock: this.item_for_update.stock,
      image: this.item_for_update.image,
      manage_stock: this.item_for_update.manage_stock
    });

    this.image2 = items.image


    this.modalService.open(edit, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      windowClass: 'edit-modal'
    }).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }
  onUpdate(): void {
    console.log(this.itemForm.value)
    this.api.post('item/add', this.itemForm.value)
    .subscribe(
      (response: any) => {

        Swal.fire({
          icon: 'success',
          title: 'Data Updated successfully'
        });
        this.all_items();
        this.item_add.reset();



      },
      error => {
        this.toastr.error('An error occurred while deleting data!', 'Error', {
          positionClass: 'toast-center-center', // center the toast horizontally and vertically

        });
      }
    );

  }
}
