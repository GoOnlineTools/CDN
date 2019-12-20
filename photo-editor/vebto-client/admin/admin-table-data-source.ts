import {FormControl} from "@angular/forms";
import {UrlAwarePaginator} from "./pagination/url-aware-paginator.service";
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from "@angular/material";
import {BehaviorSubject} from 'rxjs';
import {combineLatest, map, startWith, distinctUntilChanged, debounceTime} from 'rxjs/operators';

export class AdminTableDataSource<T> implements DataSource<T> {

    /**
     * Data for admin table to render.
     */
    private data = new BehaviorSubject<T[]>(null);

    /**
     * Custom parameters for paginator that can be set by user.
     */
    private params = new BehaviorSubject({});

    /**
     * Control for admin table search filter input field.
     */
    public searchQuery = new FormControl();

    /**
     * Model that stores and controls currently selected table rows.
     */
    public selectedRows = new SelectionModel<T>(true, []);

    /**
     * AdminTableDataSource Constructor.
     */
    constructor(
        private uri: string,
        private dataPaginator: UrlAwarePaginator,
        private matPaginator: MatPaginator,
        private matSort: MatSort,
        private delayInit: boolean = false,
    ) {
        if ( ! delayInit) this.init();
    }

    /**
     * Check if data source does NOT have any results.
     * Will return false if paginator was not initiated yet.
     */
    public isEmpty(): boolean {
        return this.dataPaginator.doesNotHaveResults();
    }

    /**
     * Set specified params on data source.
     */
    public setParams(params: object) {
        this.params.next(params);
    }

    /**
     * Check if all table rows are selected.
     */
    public isAllSelected(): boolean {
        if ( ! this.dataPaginator.data || ! this.dataPaginator.data.length) return false;
        return this.selectedRows.selected.length == this.dataPaginator.data.length;
    }

    /**
     * Selects all rows if they are not all selected. Otherwise clear selected rows.
     */
    public masterToggle() {
        this.isAllSelected() ?
            this.selectedRows.clear() :
            this.dataPaginator.data.forEach(row => this.selectedRows.select(row));
    }

    public init(params: object = {}) {
        this.params.next(params);

        this.searchQuery.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            map(query => {return {query}}),
        ).pipe(
            combineLatest(
                this.params,
                this.matPaginator.page.pipe(startWith(null)),
                this.matSort.sortChange.pipe(startWith(null)),
            ),
        ).subscribe(params => {
            this.dataPaginator.paginate(this.uri, this.transformParams(params)).subscribe(response => {
                this.matPaginator.length = response.total;
                this.data.next(response.data);
            });
        });

        this.params.pipe(
            combineLatest(
                this.matPaginator.page.pipe(startWith(null)),
                this.matSort.sortChange.pipe(startWith(null)),
            ),
        ).subscribe(params => {
            this.dataPaginator.paginate(this.uri, this.transformParams(params)).subscribe(response => {
                this.matPaginator.length = response.total;
                this.data.next(response.data);
            });
        });
    }

    /**
     * Transform combined table paramters (sort, filter, pagination, custom etc) into backend params.
     */
    private transformParams(allParams: object[]) {
        const params = allParams.reduce((previous, current) => Object.assign({}, previous, current)) as any;

        //per page
        params.per_page = params.pageSize || this.matPaginator.pageSize || 10;
        delete params.pageSize;

        //current page
        params.page = params.pageIndex + 1 || this.matPaginator.pageIndex + 1;
        delete params.pageIndex;

        //order by
        params.order_by = params.active || 'updated_at';
        delete params.active;

        //order dir
        params.order_dir = params.direction || 'desc';
        delete params.direction;

        //search query
        params.query = params.query || this.searchQuery.value;
        if ( ! params.query) delete params.query;

        return params;
    }

    public connect() {
        return this.data;
    }

    public disconnect() {
        this.dataPaginator.destroy();
    }
}
