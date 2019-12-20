import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AppearanceEditor} from "../../appearance-editor/appearance-editor.service";
import {CodeEditorModalComponent} from "../../code-editor-modal/code-editor-modal.component";
import {Modal} from "../../../../core/ui/modal.service";
import {AppearanceEditableField} from '../../../../core/config/vebto-config';

@Component({
    selector: 'appearance-code-input',
    templateUrl: './appearance-code-input.component.html',
    styleUrls: ['./appearance-code-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppearanceCodeInputComponent implements OnInit {

    /**
     * Editable field this input is attached to.
     */
    @Input() field: AppearanceEditableField;

    /**
     * AppearanceCodeInputComponent Constructor.
     */
    constructor(
        private editor: AppearanceEditor,
        private modal: Modal,
    ) {}

    ngOnInit() {
        this.addCodeToPreview(
            this.field.config.language,
            this.field.value,
        );
    }

    /**
     * Open code editor modal and commit resulting changes.
     */
    public openModal(field: AppearanceEditableField) {
        let params = {contents: field.value, language: field.config.language};

        this.modal.open(CodeEditorModalComponent, params).afterClosed().subscribe(value => {
            if ( ! value || ! value.length) return;
            this.addCodeToPreview(field.config.language, value);
            this.commitChanges(field, value);
        });
    }

    /**
     * Add custom css/js to preview iframe
     */
    private addCodeToPreview(type: 'css'|'js', contents: string) {
        this.getOrCreateEl(type).innerHTML = contents;
    }

    /**
     * Create styles element for custom css
     * or return existing one if already created.
     */
    private getOrCreateEl(type: 'css'|'js' = 'css'): HTMLElement {
        let el = this.editor.getDocument().querySelector('#editor-custom-'+type);

        if ( ! el) {
            el = this.editor.getDocument().createElement(type === 'css' ? 'style' : 'script');
            el.id = 'editor-custom-'+type;
            this.editor.getDocument().head.appendChild(el);
        }

        return el as HTMLElement;
    }

    /**
     * Commit code field changes.
     */
    private commitChanges(field: AppearanceEditableField, newValue: string) {
        field.value = newValue;
        this.editor.changes.add(field.key, newValue);
    }
}