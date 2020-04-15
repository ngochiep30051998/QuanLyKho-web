import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import { AuthService } from '../services/auth/auth.service';
import 'rxjs/add/operator/mergeMap';
@Injectable()
export class CommonHttpInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        if (accessToken) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': accessToken,
                },
                withCredentials: true,
            });
        }
        return next.handle(request).catch((err: any) => {
            if (err.status === 401) {
                const params = {
                    refreshToken: localStorage.getItem('refreshToken')
                };
                return this.authService.getRefreshToken(params).mergeMap((data: any) => {
                    localStorage.setItem('accessToken', data.accessToken);
                    request = request.clone({
                        setHeaders: {
                            'x-access-token': data.accessToken,
                        },
                        withCredentials: true,
                    });
                    return next.handle(request);
                });
            }
            return Observable.throw(err);
        });
    }
}
