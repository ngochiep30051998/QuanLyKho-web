import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
@Injectable()
export class CommonHttpInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers: any;
        if (localStorage.getItem('token')) {
            headers = new HttpHeaders().set('x-access-token', JSON.parse(localStorage.getItem('token')));
        }
        const customReq = request.clone({
            withCredentials: true,
            headers: headers
        });
        return next.handle(customReq);
    }
}