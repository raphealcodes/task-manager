import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './third-party/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { Loader2Component } from './components/loader_2/loader.component';
import { CreateTaskComponent } from './dialogs/create-task/create-task.component';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';




@NgModule({
  declarations: [
    LoaderComponent,
    Loader2Component,
    CreateTaskComponent,
    ConfirmDeleteComponent
  ],
  providers: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    LoaderComponent,
    Loader2Component,
    CreateTaskComponent,
    ConfirmDeleteComponent
  ]
})
export class SharedModule { }
