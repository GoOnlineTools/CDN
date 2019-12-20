import {Component, ElementRef, Inject, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {utils} from "../../../core/services/utils";

declare let ace;

export interface CodeEditorModalData {
    contents?: string,
    language: string
}

@Component({
    selector: 'code-editor-modal',
    templateUrl: './code-editor-modal.component.html',
    styleUrls: ['./code-editor-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CodeEditorModalComponent implements OnInit {
    @ViewChild('editor') editorEl: ElementRef;

    /**
     * Whether ace js library is being loaded currently.
     */
    public loading = false;

    /**
     * Ace editor instance.
     */
    private editor;

    /**
     * CodeEditorModalComponent Constructor.
     */
    constructor(
        protected utils: utils,
        private dialogRef: MatDialogRef<CodeEditorModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CodeEditorModalData,
    ) {}

    ngOnInit() {
        this.initEditor(this.data.contents, this.data.language);
    }

    /**
     * Close modal and editor code editor contents.
     */
    public confirm() {
        this.close(this.editor.getValue());
    }

    /**
     * Close the modal and pass specified data.
     */
    public close(data?) {
        this.dialogRef.close(data);
    }

    /**
     * Initiate code editor with specified contents.
     */
    private initEditor(contents: string, language = 'javascript') {
        this.loading = true;

        this.utils.loadScript('js/ace/ace.js').then(() => {
            this.editor = ace.edit(this.editorEl.nativeElement);
            this.editor.getSession().setMode('ace/mode/'+language);
            this.editor.setTheme('ace/theme/chrome');
            this.editor.$blockScrolling = Infinity;
            if (contents) this.editor.setValue(contents, 1);
            this.loading = false;
        });
    }
}
