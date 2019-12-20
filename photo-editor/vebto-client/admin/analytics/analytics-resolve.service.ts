import { Injectable }             from '@angular/core';
import {Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {AppHttpClient} from "../../core/http/app-http-client.service";

@Injectable()
export class AnalyticsResolve implements Resolve<any> {

    constructor(private http: AppHttpClient) {}

    resolve(route: ActivatedRouteSnapshot): Promise<any> {
        return this.http.get('admin/analytics/stats').toPromise().then(response => {
            return response;
        }, () => {
            return false;
        }).catch(() => {
            //
        })
    }
}