import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

declare function loadGoogleOauth(): any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private _loading = true;
  private _loadGoogleOauth = null;

  public privacyAccepted = false;
  public commercialAccepted = false;
  public access = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
    this.loadGoogleOauth = loadGoogleOauth;

    setTimeout(
      () => {
        this.loading = false;
        this.loadGoogleOauth();
      }, 2000
    );
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Has de introducir un correo electrónico';
    }

    return this.email.hasError('email') ? 'Has de introducir un correo electrónico válido.' : '';
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  get loadGoogleOauth(): any {
    return this._loadGoogleOauth;
  }

  set loadGoogleOauth(value: any) {
    this._loadGoogleOauth = value;
  }
}
