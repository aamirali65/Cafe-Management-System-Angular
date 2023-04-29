import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  activeItem: string;
  isSubmited: any = false
  formData: any = FormGroup;
  role: any;
  user: any;
  loader = false
  user_for_update:any
  userForm:any = FormGroup;
item: any;
isEditing = false;
 view_user = false
 item_name:any = 'Add User'
  ngOnInit(): void {
    this.formData.reset();
    this.isSubmited = false
    this.all_items();
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['',Validators.required]
    });

  }
  constructor(private fg: FormBuilder, private api: DataService, private toastr: ToastrService, private fb: FormBuilder, private modalService: NgbModal) {
    this.activeItem = '';
    this.createForm();
  }
  add_user = true
 
  add_cates = false
  view_cates = false

  add_users(){
    this.add_user = true
    this.view_user = false
    this.item_name = 'Add User'

  }
  view_users(){
    this.view_user = true
    this.add_user = false
    this.item_name = 'View User'
  }
  user_edit(content: any , items:any) {
    this.user_for_update = items;
    this.userForm.patchValue({
      id: this.user_for_update.id,
      name: this.user_for_update.name,
      email: this.user_for_update.email,
      phone: this.user_for_update.phone,
      role: this.user_for_update.role
    });
    this.isEditing = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true,windowClass: 'user-modal' }).result.then((result) => {

    }, (reason) => {

    });
  }
  createForm() {
    this.formData = this.fg.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      role: ['',Validators.required],
    });
  }
  onSubmit() {
    this.isSubmited = true

    if (this.formData.invalid) {
      return;
    }
    this.api.post('user/add', this.formData.value)
    .subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'User Added successfully'
        });
        this.formData.reset();
        this.isSubmited = false
        this.all_items();
      },
      error => {
        this.toastr.error('An error occurred while saving the data!', 'Error', {
          positionClass: 'toast-center-center', // center the toast horizontally and vertically

        });
      }
    );

  }
  all_items() {
    this.loader = true
    this.api.get('user/list')
    .subscribe(
      (response: any) => {
        this.user = response;
        this.loader = false
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
          this.api.get(`user/delete/${id}`)
          .subscribe(
            (response: any) => {
              Swal.fire({
                icon: 'success',
                title: 'User deleted successfully'
              });
              this.all_items();
              this.modalService.dismissAll()
    
            },
            error => {
              this.toastr.error('An error occurred while deleting data!', 'Error', {
                positionClass: 'toast-center-center',
    
              });
    
    
            },
    
          );
        } else {
         return
        }
      });
      
  }



  onUpdate(): void {
    console.log(this.userForm.value)
    this.api.post('user/add', this.userForm.value)
    .subscribe(
      (response: any) => {

        Swal.fire({
          icon: 'success',
          title: 'User Updated successfully'
        });
        this.all_items();
        this.formData.reset();
        this.modalService.dismissAll()



      },
      error => {
        this.toastr.error('An error occurred while deleting data!', 'Error', {
          positionClass: 'toast-center-center', // center the toast horizontally and vertically

        });
      }
    );

  }

}
