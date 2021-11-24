import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  error: boolean;
  errorMessage: string = '';
  constructor(private auth: AuthService, private router: Router, private formb: FormBuilder) {
    this.error = false;
    this.form = this.formb.group({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])),
    })
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.error = false;
    this.errorMessage = '';
    const body = this.form.value;
    this.auth.loginByEmail(body).pipe(
      catchError((error) => {
        if (error) {
          this.error = true;
          this.errorMessage = 'correo o contraseña incorrecta';
        }
        return throwError(error);
      })
    )
      .subscribe((data: any) => {
        this.error = false;
        window.localStorage.setItem('token', data.token);
        if (data.token) {
          console.log(body)
          this.router.navigate(['home']);
        }
      })
  }

  public fieldTextType: boolean = false;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
