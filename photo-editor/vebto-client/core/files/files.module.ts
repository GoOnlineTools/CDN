import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadFileModalComponent} from './upload-file-modal/upload-file-modal.component';
import {FileDropzoneDirective} from './file-dropzone/file-dropzone.directive';
import {FileValidator} from './file-validator';
import {Uploads} from './uploads.service';
import {SvgIconModule} from '../ui/svg-icon/svg-icon.module';
import {MapToIterableModule} from '../ui/map-to-iterable/map-to-iterable.module';
import {MatButtonModule, MatDialogModule} from '@angular/material';

@NgModule({
    imports: [
        SvgIconModule,
        CommonModule,
        MapToIterableModule,

        //material
        MatDialogModule,
        MatButtonModule,
    ],
    declarations: [
        UploadFileModalComponent,
        FileDropzoneDirective,
    ],
    exports: [
        UploadFileModalComponent,
        FileDropzoneDirective,
    ],
    entryComponents: [
        UploadFileModalComponent
    ],
    providers: [
        FileValidator,
        Uploads
    ]
})
export class FilesModule {
}
