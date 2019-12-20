import {AfterContentInit, Directive, ElementRef, Input} from '@angular/core';
import {MenuEditor} from "./menu-editor.service";
import * as Sortable from "sortablejs";

@Directive({
    selector: '[reorderMenuItems]'
})
export class ReorderMenuItemsDirective implements AfterContentInit {
    @Input('reorderLayoutItems') type: 'container'|'row'|'column';

    /**
     * ReorderLayoutItemsDirective Constructor.
     */
    constructor(
        private el: ElementRef,
        private menus: MenuEditor,
    ) {}

    ngAfterContentInit() {
        new Sortable(this.el.nativeElement, {
            draggable: '.menu-item-container',
            animation: 250,
            onUpdate: () => {
                const items = this.el.nativeElement.querySelectorAll('.menu-item-container'), ids = [];

                for (let i = 0; i < items.length; i++) {
                    ids.push(items[i].dataset.id);
                }

                this.menus.reorderActiveMenuItems(ids);
            }
        });
    }
}
