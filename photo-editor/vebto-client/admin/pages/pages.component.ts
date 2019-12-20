import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CurrentUser} from "../../auth/current-user";
import {UrlAwarePaginator} from "../pagination/url-aware-paginator.service";
import {MatPaginator, MatSort} from "@angular/material";
import {AdminTableDataSource} from "../admin-table-data-source";
import {Page} from "../../core/types/models/Page";
import {Modal} from "../../core/ui/modal.service";
import {ConfirmModalComponent} from "../../core/ui/confirm-modal/confirm-modal.component";
import {Pages} from '../../core/pages/pages.service';

@Component({
    selector: 'pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
    providers: [UrlAwarePaginator],
    encapsulation: ViewEncapsulation.None,
})
export class PagesComponent implements OnInit {
    @ViewChild(MatPaginator) matPaginator: MatPaginator;
    @ViewChild(MatSort) matSort: MatSort;

    public dataSource: AdminTableDataSource<Page>;

    /**
     * PagesComponent Constructor.
     */
    constructor(
        public paginator: UrlAwarePaginator,
        private pages: Pages,
        private modal: Modal,
        public currentUser: CurrentUser,
    ) {}

    ngOnInit() {
        this.dataSource = new AdminTableDataSource<Page>('pages', this.paginator, this.matPaginator, this.matSort);
    }

    /**
     * Ask user to confirm deletion of selected pages
     * and delete selected pages if user confirms.
     */
    public maybeDeleteSelectedPages() {
        this.modal.show(ConfirmModalComponent, {
            title: 'Delete Pages',
            body:  'Are you sure you want to delete selected pages?',
            ok:    'Delete'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.deleteSelectedPages();
        });
    }

    /**
     * Delete currently selected pages.
     */
    public deleteSelectedPages() {
        const ids = this.dataSource.selectedRows.selected.map(page => page.id);

        this.pages.delete(ids).subscribe(() => {
            this.paginator.refresh();
            this.dataSource.selectedRows.clear();
        });
    }
}
