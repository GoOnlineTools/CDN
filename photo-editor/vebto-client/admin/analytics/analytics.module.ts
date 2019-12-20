import {NgModule} from '@angular/core';
import {AnalyticsRoutingModule} from "./analytics-routing.module";
import {AnalyticsComponent} from "./analytics.component";
import {AnalyticsResolve} from "./analytics-resolve.service";
import {UiModule} from '../../core/ui/ui.module';
import {CommonModule} from '@angular/common';
import {AuthModule} from '../../auth/auth.module';

@NgModule({
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        UiModule,
        AuthModule,
    ],
    declarations: [
        AnalyticsComponent
    ],
    providers: [
        AnalyticsResolve
    ]
})
export class AnalyticsModule {
}
