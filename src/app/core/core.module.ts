import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StorageService } from './storage.service';

@NgModule({
    imports: [ReactiveFormsModule],
    exports: [ReactiveFormsModule],
    providers: [StorageService]
})
export class CoreModule {
}
