import {Injectable, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AppHttpClient} from "../core/http/app-http-client.service";
import {CurrentUser} from "./current-user";
import {Toast} from "../core/ui/toast.service";
import {User} from "../core/types/models/User";
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

    /**
     * Route users should be redirected to after successful login.
     */
    protected redirectUri = '/dashboard';

    /**
     * Route admins should be redirected to after successful login.
     */
    protected adminRedirectUri = '/dashboard';

    /**
     * AuthService Constructor.
     */
    constructor (
        protected httpClient: AppHttpClient,
        protected currentUser: CurrentUser,
        protected router: Router,
        protected route: ActivatedRoute,
        protected toast: Toast,
        protected zone: NgZone,
    ) {}

    /**
     * Log user in with specified credentials.
     */
    public login(credentials: Object): Observable<{data: string}> {
        return this.httpClient.post('auth/login', credentials);
    }

    /**
     * Register a new user.
     */
    public register(credentials: Object): Observable<{data?: User, type?: string}> {
        return this.httpClient.post('auth/register', credentials);
    }

    /**
     * Log current user out.
     */
    public logOut() {
        this.httpClient.post('auth/logout').subscribe(() => {
            this.currentUser.clear();
            this.router.navigate(['/login']);
        });
    }

    /**
     * Send password reset link to user via email.
     */
    public sendPasswordResetLink(credentials: Object): Observable<{data: string}> {
        return this.httpClient.post('auth/password/email', credentials);
    }

    /**
     * Reset user password.
     */
    public resetPassword(credentials: Object): Observable<{data: User}> {
        return this.httpClient.post('auth/password/reset', credentials);
    }

    /**
     * Get URI user should be redirect to after login.
     */
    public getRedirectUri(): string {
        if (this.currentUser.redirectUri) {
            let uri = this.currentUser.redirectUri;
            this.currentUser.redirectUri = null;
            return uri;
        } else if (this.currentUser.isAdmin()) {
            return this.adminRedirectUri;
        } else {
            return this.redirectUri;
        }
    }
}
