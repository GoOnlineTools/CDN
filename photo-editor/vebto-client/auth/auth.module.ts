import {NgModule} from '@angular/core';
import {AuthRoutingModule} from "./auth.routing";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {AuthService} from "./auth.service";
import {SocialAuthService} from "./social-auth.service";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {RequestExtraCredentialsModalComponent} from "./request-extra-credentials-modal/request-extra-credentials-modal.component";
import {GuestGuard} from "../guards/guest-guard.service";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DisableRouteGuard} from "../guards/disable-route-guard.service";
import {AuthGuard} from "../guards/auth-guard.service";
import {RouterModule} from "@angular/router";
import {Users} from "./users.service";
import {UiModule} from "../core/ui/ui.module";

@NgModule({
    imports: [
        AuthRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        RouterModule,
    ],
    exports: [
        RouterModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        RequestExtraCredentialsModalComponent,
    ],
    entryComponents: [
        RequestExtraCredentialsModalComponent,
    ],
    providers: [
        AuthService,
        SocialAuthService,
        GuestGuard,
        DisableRouteGuard,
        AuthGuard,
        Users,
    ]
})
export class AuthModule {
}