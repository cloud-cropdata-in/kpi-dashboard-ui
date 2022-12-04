import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpectedValueService {

  baseUrls = environment.baseUrl + '/customer/farmers';

  villageDetails: any = [];

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  //All Value
  getValueDetails(): Observable<any> {
    return this.http.get<any>(this.baseUrls + '/value')
    // ((response) => response)
    //   catchError(this.handleError<any>('http://192.168.0.253:8001/customer/farmers'))
    // );
    .pipe(
      catchError(this.errorHandl)
    )
  }

  //Region Value
  getRegionValueDetails(id): Observable<any> {
    return this.http.get<any>(this.baseUrls + '/value/region/' + id)
    .pipe(
      catchError(this.errorHandl)
    )
  }

  //Commodity Value
  getCommodityValueDetails(id): Observable<any> {
    return this.http.get<any>(this.baseUrls + '/value/commodity/' + id)
    .pipe(
      catchError(this.errorHandl)
    )
  }

  //Land Holding Value
  getLandHoldingValueDetails(id): Observable<any> {
    return this.http.get<any>(this.baseUrls + '/value/land/' + id)
    .pipe(
      catchError(this.errorHandl)
    )
  }

  //Region Village Value
  getRegionVillageValueDetails(regionId, id): Observable<any> {
    return this.http.get<any>(this.baseUrls + '/value/region/' + regionId+ '/'+ id)
    .pipe(
      catchError(this.errorHandl)
    )
  }

  //Commodity Village Value
  getCommodityVillageValueDetails(commodityId, id): Observable<any> {
    return this.http.get<any>(this.baseUrls + '/value/commodity/' + commodityId + '/' + id)
    .pipe(
      catchError(this.errorHandl)
    )
  }

  //Region wise Village Value
  getLandHoldingVillageValueRegionWiseDetails(landHId, id): Observable<any> {
    return this.http.get<any>(this.baseUrls + '/value/land/' + landHId +'/region/'+id)
    .pipe(
      catchError(this.errorHandl)
    )
  }

  //Commodity wisw Village Value
  getLandHoldingVillageValueCommodityWiseDetails(landHId, id): Observable<any> {
    return this.http.get<any>(this.baseUrls + '/value/land/' + landHId + '/commodity/' + id)
    .pipe(
      catchError(this.errorHandl)
    )
  }

}
