import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ColorPickerModule} from "ngx-color-picker";
import {AppearanceComponent} from "./appearance.component";
import {AppearancePanelComponent} from "./appearance-panel/appearance-panel.component";
import {MenusAppearancePanelComponent} from "./menus-appearance-panel/menus-appearance-panel.component";
import {AddMenuItemPanelComponent} from "./menus/add-menu-item-panel/add-menu-item-panel.component";
import {AppearancePanelMetaComponent} from "./appearance-panel-meta/appearance-panel-meta.component";
import {MenuItemsComponent} from "./menus/menu-items/menu-items.component";
import {CodeEditorModalComponent} from "./code-editor-modal/code-editor-modal.component";
import {AppearanceEditor} from "./appearance-editor/appearance-editor.service";
import {AppearancePendingChanges} from "./appearance-editor/appearance-pending-changes.service";
import {CanDeactivateAppearance} from "./can-deactivate-appearance.guard";
import {MenuEditor} from "./menus/menu-editor.service";
import {AppearanceRoutingModule} from "./appearance-routing.module";
import {AppearanceListInputComponent} from "./inputs/appearance-list-input/appearance-list-input.component";
import {AppearanceColorInputComponent} from "./inputs/appearance-color-input/appearance-color-input.component";
import {AppearanceTextInputComponent} from "./inputs/appearance-text-input/appearance-text-input.component";
import {AppearanceImageInputComponent} from "./inputs/appearance-image-input/appearance-image-input.component";
import {AppearanceCodeInputComponent} from "./inputs/appearance-code-input/appearance-code-input.component";
import {MatExpansionModule, MatSnackBarModule} from "@angular/material";
import {UiModule} from "../../core/ui/ui.module";
import {ReorderMenuItemsDirective} from "./menus/reorder-menu-items.directive";
import {AppearanceEditorResolver} from "./appearance-editor-resolver.service";

@NgModule({
    imports:      [
        ColorPickerModule,
        AppearanceRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,

        //material
        MatExpansionModule,
        MatSnackBarModule,
    ],
    declarations: [
        AppearanceComponent,
        AppearancePanelComponent,
        MenusAppearancePanelComponent,
        AddMenuItemPanelComponent,
        AppearancePanelMetaComponent,
        MenuItemsComponent,
        CodeEditorModalComponent,
        AppearanceListInputComponent,
        AppearanceColorInputComponent,
        AppearanceTextInputComponent,
        AppearanceImageInputComponent,
        AppearanceCodeInputComponent,
        ReorderMenuItemsDirective
    ],
    entryComponents: [
        CodeEditorModalComponent,
    ],
    providers:    [
        AppearanceEditor,
        AppearancePendingChanges,
        CanDeactivateAppearance,
        MenuEditor,
        AppearanceEditorResolver,
    ]
})
export class AppearanceModule { }