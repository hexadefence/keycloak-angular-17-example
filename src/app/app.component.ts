import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeycloakAngularModule, KeycloakService, KeycloakEventType } from 'keycloak-angular';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatGridListModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    ClipboardModule,
    HttpClientModule,
    RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'keycloak-angular-example';
  keycloakService: KeycloakService;
  clipboard: Clipboard;
  statusPanel: string = '';
  httpClient: HttpClient;

  constructor(keycloakService: KeycloakService, clipboard: Clipboard, httpClient: HttpClient) {
    this.keycloakService = keycloakService;
    this.clipboard = clipboard;
    this.httpClient = httpClient;

    keycloakService.keycloakEvents$.subscribe({
      next(event) {
        if (event.type == KeycloakEventType.OnTokenExpired) {
          keycloakService.updateToken(20);
        }
      }
    });
  }

  public login(): void {

    this.keycloakService.login();

  }

  public logout(): void {

    this.keycloakService.logout();

  }

  public isLoggedIn(): void {
    this.statusPanel = 'Is Logged In: ' + this.keycloakService.isLoggedIn();
  }

  public copyAccessTokenToClipboard(): void {

    this.keycloakService.getToken().then(token => {

      this.clipboard.copy(token);
      this.statusPanel = 'Copied the token to clipboard';
    })
      .catch(e => this.statusPanel = 'Error occurred while copying');
  }

  public parseAccessToken(): void {

    this.keycloakService.getToken().then(token => {
      this.statusPanel = this.toJWTString(token);

      // alternatively below funciton call can be used to get the parsed token
      // this.keycloakService.getKeycloakInstance().tokenParsed

    })
      .catch(e => { this.statusPanel = 'Error occurred while parsing. check console logs'; console.error(e) });
  }

  public isTokenExpired(): void {

    /**
     * Extracted from Keycloak JS documentation
     * Returns true if the token has less than minValidity seconds 
     * left before it expires (minValidity is optional, if not specified 0 is used).
     */
    this.statusPanel = this.keycloakService.isTokenExpired(10).toString();
  }

  /**
   * Extracted from Keycloak JS documentation
   * If the token expires within minValidity seconds 
   * (minValidity is optional, if not specified 5 is used) the token is refreshed. 
   * If -1 is passed as the minValidity, the token will be forcibly refreshed. 
   * If the session status iframe is enabled, the session status is also checked.
  */
  public async updateToken() {
    try {
      let refreshed = await this.keycloakService.updateToken(5);
      this.statusPanel = (refreshed ? 'Token was refreshed' : 'Token is still valid');
    } catch (error) {
      this.statusPanel = 'Failed to refresh the token check console logs'
      console.error('Failed to refresh the token:', error);
    }
  }

  public async sendHttpRequest() {

    this.httpClient.get('https://ab81a40b274c481694de52422e7c28c3.api.mockbin.io/')
      .subscribe(res => {
        console.log(res)
      })

    this.statusPanel = "HTTP Request Sent. Please check browser's network tab";

  }

  public showRoles() {

    let roles = this.keycloakService.getUserRoles();
    this.statusPanel = roles.join(', ');

    // if need to check whether the user has a particular role
    //this.keycloakService.isUserInRole('angular-client-role')
  }

    /** 
     * Please refer to the below documentation for more info
     * https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
    **/


  private toJWTString(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return jsonPayload;
  }
}
