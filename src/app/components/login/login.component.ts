import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../request.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' };
  errorMessage = '';
  forget_pass = false
  changePasswordForm: any = FormGroup;
  
  
  constructor(private authService: AuthService ,private router: Router,private formBuilder: FormBuilder,private api: DataService) {}
  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  onSubmit(form: NgForm) {
    this.authService.login(this.user.email, this.user.password)
      .subscribe(
        (response:any) => {
          Swal.fire({
            icon: 'success',
            title: 'User Login successfully'
          });
          localStorage.setItem('me', JSON.stringify(response.user));

          // Save token to local storage
          localStorage.setItem('bearer_token', response.authorisation.token);
          this.router.navigate(['/']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid email or password',
            confirmButtonColor: '#dc3545'
          });
        }
      );
  }
  change() {
    this.api.post('forgot_password', this.changePasswordForm.value)
    .subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'User Login successfully'
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email',
          confirmButtonColor: '#dc3545'
        });
      }
    );
  }
  forgot_pass(){
    this.forget_pass = true
  }
  back(){
    this.forget_pass = false
  }

}
