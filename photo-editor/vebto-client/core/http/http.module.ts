import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpErrorHandler} from './errors/http-error-handler.service';
import {AppHttpClient} from './app-http-client.service';
import {HttpCacheClient} from './http-cache-client';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        AppHttpClient,
        HttpCacheClient,
    ]
})
export class HttpModule {}
