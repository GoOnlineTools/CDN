import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpErrorHandler} from "./errors/http-error-handler.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class AppHttpClient {

    static prefix = 'secure';

    /**
     * AppHttpClient Constructor.
     */
    constructor(protected httpClient: HttpClient, protected errorHandler: HttpErrorHandler) {}

    public get<T>(uri: string, params = {}): Observable<T>|any {
        const httpParams = this.generateHttpParams(params);
        return this.httpClient.get<T>(this.prefixUri(uri), {params: httpParams}).pipe(catchError(err => this.errorHandler.handle(err, uri)));
    }

    public post<T>(uri: string, params: object = null): Observable<T>|any {
        return this.httpClient.post<T>(this.prefixUri(uri), params).pipe(catchError(err => this.errorHandler.handle(err, uri)));
    }

    public put<T>(uri: string, params: object = {}): Observable<T>|any {
        params = this.spoofHttpMethod(params, 'PUT');
        return this.httpClient.post<T>(this.prefixUri(uri), params).pipe(catchError(err => this.errorHandler.handle(err, uri)));
    }

    public delete<T>(uri: string, params: object = {}): Observable<T>|any {
        params = this.spoofHttpMethod(params, 'DELETE');
        return this.httpClient.post<T>(this.prefixUri(uri), params).pipe(catchError(err => this.errorHandler.handle(err, uri)));
    }

    /**
     * Prefix specified uri with backend API prefix.
     */
    private prefixUri(uri: string) {
        if (uri.indexOf('://') > -1) return uri;
        return AppHttpClient.prefix+'/'+uri
    }

    /**
     * Generate http params for GET request.
     */
    private generateHttpParams(params: object) {
        let httpParams = new HttpParams();

        for(let key in params) {
            httpParams = httpParams.append(key, params[key]);
        }

        return httpParams;
    }

    /**
     * Spoof http method by adding "_method" to request params.
     */
    private spoofHttpMethod(params: object|FormData, method: 'PUT'|'DELETE'): object|FormData {
        if (params instanceof FormData) {
            (params as FormData).append('_method', method);
        } else {
            params['_method'] = method;
        }

        return params;
    }
}
