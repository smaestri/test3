import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    /**
     * Hide spinner in case of error
     * @param error 
     */
    private handleError(error: Response | any) {
        this.spinnerService.hideSpinner();
        return throwError(error);
    }

    constructor(private spinnerService: SpinnerService) { }

    /**
     * Overriden
     * @param request 
     * @param next 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.displaySpinner();

        return next.handle(request).pipe(catchError(this.handleError.bind(this))).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.spinnerService.hideSpinner();
                }
                return event;
            }));
    }

}