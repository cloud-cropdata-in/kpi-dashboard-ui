import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';



import { Observable, pipe } from 'rxjs';
import { LoadingService, LoadingOverlayRef } from './loading.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router, private loadingService: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let loadingRef: LoadingOverlayRef;

        // This is a little hacky and related to change detection (ExpressionChangedAfterItHasBeenCheckedError).
        // More informations here:
        // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4



        Promise.resolve(null).then(() => loadingRef = this.loadingService.open());
        if (!this.authenticationService.isUserLoggedIn){
            // this.authenticationService.logout();
            this.router.navigate(['/login']);
        }

        if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
            req = req.clone({
                setHeaders: {
                auth: sessionStorage.getItem('token')
                }
            })
        }

        //add allow origin
        req = req.clone({
            setHeaders: {
                'Allow-Origin' : environment.allowOrigin,
                'Access-Control-Allow-Origin' : environment.allowOrigin,
            }
        });

        return next.handle(req)
            .pipe(
                tap(
                    event => {
                        if (event instanceof HttpResponse && loadingRef) {
                            loadingRef.close();
                        }
                    }
                )
            );

    }
}
