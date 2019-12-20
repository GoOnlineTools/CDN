import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoadingIndicatorComponent} from "./loading-indicator/loading-indicator.component";
import {NoResultsMessageComponent} from "./no-results-message/no-results-message.component";
import {CommonModule} from "@angular/common";
import {CustomMenuComponent} from "./custom-menu/custom-menu.component";
import {InfiniteScrollDirective} from "./infinite-scroll/infinite-scroll.directive";
import {EmptyRouteComponent} from './empty-route/empty-route.component';
import {EnterKeybindDirective} from "./enter-keybind.directive";
import {MatButtonModule, MatSnackBarModule, MatMenuModule, MatCheckboxModule, MatChipsModule} from '@angular/material';
import {Toast} from "./toast.service";
import {Modal} from "./modal.service";
import {ConfirmModalModule} from "./confirm-modal/confirm-modal.module";
import {LoggedInUserWidgetComponent} from "./logged-in-user-widget/logged-in-user-widget.component";
import {MaterialNavbar} from "./material-navbar/material-navbar.component";
import {AdHostComponent} from "./ad-host/ad-host.component";
import {FormattedDatePipe} from "./formatted-date.pipe";
import {SvgIconModule} from './svg-icon/svg-icon.module';
import {MapToIterableModule} from './map-to-iterable/map-to-iterable.module';
import {ColorPickerModule} from './color-picker/color-picker.module';
import {CustomScrollbarModule} from './custom-scrollbar/custom-scrollbar.module';
import {OverlayPanel} from './overlay-panel/overlay-panel.service';
import {BreakpointsService} from './breakpoints.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,

        //internal
        SvgIconModule,
        MapToIterableModule,
        ColorPickerModule,
        CustomScrollbarModule,
        ConfirmModalModule,

        //material
        MatButtonModule,
        MatSnackBarModule,
        MatMenuModule,
        MatCheckboxModule,
    ],
    declarations: [
        LoadingIndicatorComponent,
        NoResultsMessageComponent,
        CustomMenuComponent,
        InfiniteScrollDirective,
        EmptyRouteComponent,
        EnterKeybindDirective,
        LoggedInUserWidgetComponent,
        MaterialNavbar,
        AdHostComponent,
        FormattedDatePipe,
    ],
    exports: [
        LoadingIndicatorComponent,
        NoResultsMessageComponent,
        CustomMenuComponent,
        InfiniteScrollDirective,
        EmptyRouteComponent,
        EnterKeybindDirective,
        LoggedInUserWidgetComponent,
        MaterialNavbar,
        AdHostComponent,
        FormattedDatePipe,

        //internal
        SvgIconModule,
        MapToIterableModule,
        ColorPickerModule,
        ConfirmModalModule,

        //material
        MatButtonModule,
        MatSnackBarModule,
        MatMenuModule,
        MatCheckboxModule,
    ],
    providers: [
        Toast,
        Modal,
        OverlayPanel,
        BreakpointsService,
    ],
})
export class UiModule {
}

