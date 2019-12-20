import {Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {CrupdateUserModalComponent} from "./crupdate-user-modal/crupdate-user-modal.component";
import {CurrentUser} from "../../auth/current-user";
import {UrlAwarePaginator} from "../pagination/url-aware-paginator.service";
import {MatPaginator, MatSort} from "@angular/material";
import {Users} from "../../auth/users.service";
import {Modal} from "../../core/ui/modal.service";
import {AdminTableDataSource} from "../admin-table-data-source";
import {User} from "../../core/types/models/User";
import {Group} from "../../core/types/models/Group";
import {ConfirmModalComponent} from "../../core/ui/confirm-modal/confirm-modal.component";
import {Settings} from "../../core/config/settings.service";

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    providers: [UrlAwarePaginator],
    encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) matPaginator: MatPaginator;
    @ViewChild(MatSort) matSort: MatSort;

    public dataSource: AdminTableDataSource<User>;

    /**
     * UsersComponent Constructor.
     */
    constructor(
        public paginator: UrlAwarePaginator,
        private userService: Users,
        private modal: Modal,
        public currentUser: CurrentUser,
        public settings: Settings,
    ) {}

    ngOnInit() {
        this.dataSource = new AdminTableDataSource<User>('users', this.paginator, this.matPaginator, this.matSort);
    }

    ngOnDestroy() {
        this.paginator.destroy();
    }

    /**
     * Delete currently selected users.
     */
    public deleteSelectedUsers() {
        const ids = this.dataSource.selectedRows.selected.map(user => user.id);

        this.userService.deleteMultiple(ids).subscribe(() => {
            this.paginator.refresh();
            this.dataSource.selectedRows.clear();
        });
    }

    /**
     * Compile a string of groups user belongs to names.
     */
    public makeGroupsList(groups: Group[]): string {
        return groups.map(group => group.name).join(', ');
    }

    /**
     * Compile a list of users permissions.
     */
    public makePermissionsList(permissions: any[]): string {
        let list = [];

        for(let permission in permissions) {
            if (permissions[permission]) {
                list.push(permission);
            }
        }

        return list.join(', ');
    }

    /**
     * Ask user to confirm deletion of selected tags
     * and delete selected tags if user confirms.
     */
    public maybeDeleteSelectedUsers() {
        this.modal.show(ConfirmModalComponent, {
            title: 'Delete Users',
            body:  'Are you sure you want to delete selected users?',
            ok:    'Delete'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.deleteSelectedUsers();
        });
    }

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateUserModal(user?: User) {
        this.modal.show(CrupdateUserModalComponent, {user}).afterClosed().subscribe(data => {
            if ( ! data) return;
            this.paginator.refresh();
        });
    }

    /**
     * Get rows for users table.
     */
    public getTableRows(): string[] {
        let rows = ['select', 'avatar', 'email', 'subscribed', 'groups',
            'permissions', 'first_name', 'last_name', 'edit'];

        if (this.settings.get('billing.enable')) {
            rows[3] = 'subscribed';
        }

        return rows;
    }
}
