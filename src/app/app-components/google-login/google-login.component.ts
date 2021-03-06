import { Component, OnInit } from '@angular/core';
import {PanelApiTokenService} from '../../services/panel-api-services/panel-api-token.service';

declare function loadGoogleOauth(): any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {

  private _loading = true;
  private _loadGoogleOauth = null;
  private _oteInputModel = null;
  private _oteInputPlaceholder = 'tu@correo.com';
  private _oteStatus = 1;
  private _oteInputType = 'text';

  private _mail: string;

  public privacyAccepted = false;

  constructor(private panelApiTokenService: PanelApiTokenService) { }

  ngOnInit() {
    this.loadGoogleOauth = loadGoogleOauth;

    setTimeout(
      () => {
        this.loading = false;
        this.loadGoogleOauth();
      }, 2000
    );
  }

  onSendOteFormClick() {
    if (this.oteStatus === 1) {
      this.sendMail();
    }

    if(this.oteStatus === 2) {
      this.sendCode();
    }
  }

  sendMail() {
    this.loading = true;
    this.panelApiTokenService.sendEmailOte(this.oteInputModel).subscribe(
      (ok) => {
        this.mail = this.oteInputModel;
        this.oteInputModel = '';
        this.oteInputPlaceholder = '000000';
        this.oteInputType = 'number';
        this.oteStatus = 2;
        this.loading = false;
      },
      (ko) => {
        console.log(ko);
        this.oteInputType = 'text';
        this.oteInputModel = '';
        this.oteStatus = 1;
        this.loading = false;
        alert('Ha ocurrido un error enviándole el email de Ote.');
        // @todo reset and release button
      }
    );
  }

  sendCode() {
    this.loading = true;
    this.panelApiTokenService.sendCodeOte(this.mail, this.oteInputModel).subscribe(
      (ok) => {
        localStorage.setItem('session', ok.token);
        document.location.href = '/cv';
      },
      (ko) => {
        console.log(ko);
        this.oteInputType = 'text';
        this.oteInputModel = '';
        this.oteInputPlaceholder = 'tu@correo.com';
        this.oteStatus = 1;
        this.loading = false;
        alert('¡Ops! Ote ha sufrido un cortocircuito. Inténtalo de nuevo.');
      }
    );
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

  get oteInputModel(): any {
    return this._oteInputModel;
  }

  set oteInputModel(value: any) {
    this._oteInputModel = value;
  }

  get oteInputPlaceholder(): string {
    return this._oteInputPlaceholder;
  }

  set oteInputPlaceholder(value: string) {
    this._oteInputPlaceholder = value;
  }

  get oteStatus(): number {
    return this._oteStatus;
  }

  set oteStatus(value: number) {
    this._oteStatus = value;
  }

  get mail(): string {
    return this._mail;
  }

  set mail(value: string) {
    this._mail = value;
  }

  get oteInputType(): string {
    return this._oteInputType;
  }

  set oteInputType(value: string) {
    this._oteInputType = value;
  }
}
