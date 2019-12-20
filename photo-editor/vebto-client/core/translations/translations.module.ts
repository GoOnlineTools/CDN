import {ModuleWithProviders, NgModule} from '@angular/core';
import {TranslateDirective} from './translate.directive';
import {Translations} from './translations.service';
import {Localizations} from './localizations.service';

@NgModule({
    declarations: [
        TranslateDirective,
    ],
    exports: [
        TranslateDirective,
    ],
    providers: [
        Translations,
        Localizations
    ]
})
export class TranslationsModule {}
