import {APP_INITIALIZER, ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {UiModule} from "./ui/ui.module";
import {Settings} from "./config/settings.service";
import {ContextMenu} from "./ui/context-menu/context-menu.service";
import {CurrentUser} from "../auth/current-user";
import {utils} from "./services/utils";
import {LocalStorage} from "./services/local-storage.service";
import {BrowserEvents} from "./services/browser-events.service";
import {ValueLists} from "./services/value-lists.service";
import {PreviewApp} from "./services/preview-app.service";
import {Keybinds} from "./keybinds/keybinds.service";
import {TitleService} from "./services/title.service";
import {Bootstrapper, init_app} from "./bootstrapper.service";
import {Toast} from "./ui/toast.service";
import {ravenErrorHandlerFactory} from "./errors/raven-error-handler";
import {FilesModule} from './files/files.module';
import {HttpErrorHandler} from "./http/errors/http-error-handler.service";
import {BackendHttpErrorHandler} from './http/errors/backend-http-error-handler.service';
import {HttpModule} from './http/http.module';
import {TranslationsModule} from './translations/translations.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        UiModule,
        FilesModule,
        HttpModule,
        TranslationsModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        UiModule,
        FilesModule,
    ],
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                Settings,
                ContextMenu,
                CurrentUser,
                utils,
                LocalStorage,
                BrowserEvents,
                ValueLists,
                PreviewApp,
                Keybinds,
                TitleService,
                Bootstrapper,
                Toast,
                {
                    provide: HttpErrorHandler,
                    useClass: BackendHttpErrorHandler,
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: init_app,
                    deps: [Bootstrapper],
                    multi: true,
                },
                {
                    provide: ErrorHandler,
                    useFactory: ravenErrorHandlerFactory,
                    deps: [Settings, CurrentUser],
                },
            ]
        };
    }
}

