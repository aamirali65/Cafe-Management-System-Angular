import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  formData:any = FormGroup;
  name: any;
  icon: any;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.formData = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formData.invalid) {
      // set input fields to red if they're invalid
      Object.keys(this.formData.controls).forEach(key => {
        const control = this.formData.get(key);
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
    // send data to the service for further processing
    console.log(this.name, this.icon);
  }

  get nameControl() {
    return this.formData.get('name');
  }

  get iconControl() {
    return this.formData.get('icon');
  }
}
