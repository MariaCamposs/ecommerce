import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error: boolean = false;
  private domain: string;
  private endpoint: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.domain = environment.domain;
    this.endpoint = '/auth/login';
  }

  loginByEmail(body: any): Observable<any> {
    return this.httpClient.post(`${this.domain}${this.endpoint}`, body)
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
