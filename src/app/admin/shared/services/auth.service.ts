import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { FbAuthResponse, User } from '../../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public error$: Subject<string> = new Subject<string>()

      constructor(private http: HttpClient) {}

      get token():string{
        const expDate = new Date(localStorage.getItem('fb-token-exp'));
        if(new Date > expDate){
          this.logOut()
          return null
        }
        return localStorage.getItem('fb-token')
      }


      logIn(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
          .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
          )
      }

      logOut(){
         this.setToken(null)
      }

      private handleError(error: HttpErrorResponse){
        const {message} = error.error.error
        console.log('mess',  message );
        switch(message) {
        case 'EMAIL_NOT_FOUND':
          this.error$.next('Такого email нет')
          break
        case 'INVALID_EMAIL':
          this.error$.next('Неверный пароль')
          break
        case 'INVALID_PASSWORD' :
          this.error$.next('Неверный пароль')
          break
        case '' :
          break
        }
        return throwError(error)
      }


      isAuthenticated(): boolean{
         return !!this.token
      }

  private setToken (response: FbAuthResponse | null) {
        if(response){
          const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
          localStorage.setItem('fb-token', response.idToken)
          localStorage.setItem('fb-token-exp', expDate.toString())
        }
        else {
          localStorage.clear()
        }

  }

}
