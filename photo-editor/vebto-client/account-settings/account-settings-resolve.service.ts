import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Users} from "../auth/users.service";
import {CurrentUser} from "../auth/current-user";
import {ValueLists} from "../core/services/value-lists.service";
import {User} from "../core/types/models/User";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Injectable()
export class AccountSettingsResolve implements Resolve<{user: User, selects: Object}> {

    constructor(
        private users: Users,
        private router: Router,
        private currentUser: CurrentUser,
        private values: ValueLists
    ) {}

    resolve(route: ActivatedRouteSnapshot): Promise<{user: User, selects: object}> {
        return forkJoin(
            this.users.get(this.currentUser.get('id')).pipe(map(response => response.user)),
            this.values.getValuesForSelects(),
        ).toPromise().then(response => {
            return {user: response[0], selects: response[1]};
        }, () => {
            this.router.navigate(['/']);
            return null;
        });
    }
}