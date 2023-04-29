import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated = true
  constructor(private api: DataService,private router: Router) { }
  logout(): void {
    this.api.post('user/logout', '')
      .subscribe(
        (response: any) => {
          localStorage.removeItem('bearer_token');
          this.isAuthenticated = false;
          this.router.navigate(['/login']);
        },
        error => {
          console.log('error');
        }
      );
  }
  
  // logout() {
  //   const url = `${this.baseUrl}/user/logout`;
  //   return this.http.post(url, {});
  // }
}
