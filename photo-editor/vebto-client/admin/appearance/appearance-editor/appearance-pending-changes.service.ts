import {Injectable} from '@angular/core';
import {AppHttpClient} from "../../../core/http/app-http-client.service";
import {Toast} from "../../../core/ui/toast.service";
import {Modal} from "../../../core/ui/modal.service";
import {ConfirmModalComponent} from "../../../core/ui/confirm-modal/confirm-modal.component";

@Injectable()
export class AppearancePendingChanges {

    /**
     * AppearancePendingChanges Constructor.
     */
    constructor(private http: AppHttpClient, private toast: Toast, private modal: Modal) {}

    /**
     * Changes that are yet to be saved to backend.
     */
    private changes = {};

    /**
     * Add a new change to the store.
     */
    public add(name: string, value: any) {
        this.changes[name] = value;
    }

    /**
     * Save pending changes to backend.
     */
    public save() {
        this.http.post('admin/appearance', this.changes).subscribe(() => {
            this.changes = {};
            this.toast.open('Appearance saved');
        });
    }

    /**
     * Check if there are any pending changes.
     */
    public isEmpty() {
        return !Object.keys(this.changes).length;
    }

    /**
     * If there are any unsaved changes, confirm if user wants to leave the page.
     */
    public canDeactivate(): Promise<boolean>|boolean {
        if (this.isEmpty()) return true;

        return new Promise(resolve => {
            let modal = this.modal.show(ConfirmModalComponent, {
                title: 'Close Appearance Editor',
                body: 'Are you sure you want to close appearance editor?',
                bodyBold: 'All unsaved changes will be lost.',
                ok: 'Close',
                cancel: 'Stay',
            }).afterClosed().subscribe(confirmed => {
                resolve(confirmed);
            });
        });
    }
}