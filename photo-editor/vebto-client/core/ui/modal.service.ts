import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {ComponentType} from "@angular/cdk/portal";
import {snakeCase} from '../utils/snake-case';

@Injectable({
    providedIn: 'root',
})
export class Modal {

    constructor(private dialog: MatDialog) {}

    public open<T>(component: ComponentType<T>, data?: object): MatDialogRef<T> {
        const name = snakeCase(component.name).replace(/_/g, '-').replace('component', 'container');
        return this.dialog.open(component, {panelClass: ['modal', name], data: data});
    }

    public show<T>(component: ComponentType<T>, data?: object): MatDialogRef<T> {
        return this.open(component, data);
    }
}
