import { Injectable } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget/dist/js/okta-sign-in.min.js';

@Injectable()
export class Okta {
  widget;

  constructor() {
    this.widget = new OktaSignIn({
      baseUrl: 'https://dev-764880.oktapreview.com',
      clientId: '0oag8yv4txsXLDfZ40h7',
      redirectUri: 'http://localhost:4200/implicit/callback'
    });
  }

  getWidget() {
    return this.widget;
  }
}
