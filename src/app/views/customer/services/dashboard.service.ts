import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  router: Router;
  // Farmer Lead API's
  dashboardUrl = environment.baseUrl + '/dashboard';

  dashboardLeadsUrl = environment.baseUrl + '/collected';
  dashboardCropAreaUrl = environment.baseUrl + '/croppingArea';
  dashboardExpectedProductionUrl = environment.baseUrl + '/expectedProduction';
  dashboardExpectedValueUrl = environment.baseUrl + '/expectedValue';
  dashboardVerifiedLeadsUrl = environment.baseUrl + '/verified';

  // Farmer Rights API's
  dashboardActualCropAreaUrl = environment.baseUrl + '/actualCroppingArea';
  dashboardActualProductionUrl = environment.baseUrl + '/actualProduction';
  dashboardActualValueUrl = environment.baseUrl + '/actualValue';
  dashboardRightsOnboardedUrl = environment.baseUrl + '/rightsOnboarded';

  analyticsDetails: any;
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    if (error.status == 401) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
    }

    if (error.status == 404) {
      console.log('404 alert');
      window.location.replace(window.location.href);
    }
    return throwError(errorMessage);
  }

  //GET
  getAnalyticsDetails(): Observable<any> {
    return this.http
      .get<any>(this.dashboardUrl)
      .pipe(catchError(this.errorHandl));
  }

  getLeadsDetails(): Observable<any> {
    return this.http
      .get<any>(this.dashboardLeadsUrl)
      .pipe(catchError(this.errorHandl));
  }

  getCropAreaDetails(): Observable<any> {
    return this.http
      .get<any>(this.dashboardCropAreaUrl)
      .pipe(catchError(this.errorHandl));
  }

  getExpectedProductionDetails(): Observable<any> {
    return this.http
      .get<any>(this.dashboardExpectedProductionUrl)
      .pipe(catchError(this.errorHandl));
  }

  getExpecteValueDetails(): Observable<any> {
    return this.http
      .get<any>(this.dashboardExpectedValueUrl)
      .pipe(catchError(this.errorHandl));
  }

  getVerifiedLeadsDetails(): Observable<any> {
    return this.http
      .get<any>(this.dashboardVerifiedLeadsUrl)
      .pipe(catchError(this.errorHandl));
  }

  //farmer rights
  getActualCropAreaDetails(): Observable<any> {
    return this.http
      .get<any>(this.dashboardActualCropAreaUrl)
      .pipe(catchError(this.errorHandl));
  }

  getActualProductionDetails(): Observable<any> {
    return this.http
      .get<any>(this.dashboardActualProductionUrl)
      .pipe(catchError(this.errorHandl));
  }

  getActualValueDetails(): Observable<any> {
    return this.http
      .get<any>(this.dashboardActualValueUrl)
      .pipe(catchError(this.errorHandl));
  }

  getRightsOnboardedDetails(): Observable<any> {
    return this.http
      .get<any>(this.dashboardRightsOnboardedUrl)
      .pipe(catchError(this.errorHandl));
  }
}
