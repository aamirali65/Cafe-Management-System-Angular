import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://postest.marksman.pk/public/api';
  isAuthenticated(): boolean {
    const token = localStorage.getItem('bearer_token');
    return token !== null && token !== undefined;
  }
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, { email, password });
  }

  isLoggedIn() {
    const url = `${this.baseUrl}/user`;
    return this.http.get(url);
  }
}
