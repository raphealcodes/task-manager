import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonService } from '@app/_shared/services/common.service';
import { FormErrors, ValidationMessages } from './create-task.validators';
import { TaskDTO } from '@app/_shared/models/task-interface';
import { of } from 'rxjs';
import { priorityData, statusData } from '@app/_shared/data/initial-task-data';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  errors: any = [];
  formErrors: any = FormErrors;
  uiErrors: any = FormErrors;
  validationMessages: any = ValidationMessages;
  submitting: boolean = false;

  priorityData: any = priorityData;
  statusData: any = statusData;
  now = new Date();

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private commonServices: CommonService,
    public _dialogRef: MatDialogRef<CreateTaskComponent>
  ) {}

  ngOnInit() {
    const taskData: TaskDTO = this.data ? this.data : of({});
    this.populateForm(taskData);
  }

  populateForm(task?: TaskDTO) {
    this.taskForm = this.fb.group({
      title: [task?.title, Validators.required],
      description: [task?.description, Validators.required],
      due_date: [task?.due_date, Validators.required],
      priority: [task?.priority, Validators.required],
      status: [task?.status, Validators.required],
    });
  }

  controlChanged(ctrlName: string) {
    this.errors = this.commonServices.controlnvalid(
      this.taskForm.get(ctrlName) as FormControl
    );
    if (Object.keys(this.errors).length === 0) {
      this.errors[ctrlName] = {};
      this.uiErrors[ctrlName] = '';
    }
    this.displayErrors();
  }

  displayErrors() {
    Object.keys(this.formErrors).forEach((control) => {
      this.formErrors[control] = '';
    });
    Object.keys(this.errors).forEach((control: any) => {
      Object.keys(this.errors[control]).forEach((error: any) => {
        this.uiErrors[control] = this.validationMessages[control][error];
      });
    });
  }

  onSubmit() {
    this.submitting = true;
    if (this.taskForm.invalid) {
      this.uiErrors = JSON.parse(JSON.stringify(this.formErrors));
      this.errors = this.commonServices.findInvalidControlsRecursive(
        this.taskForm
      );
      this.displayErrors();
      this.submitting = false;
      return;
    }
    const fd = JSON.parse(JSON.stringify(this.taskForm.value));
    let tasksData: any = this.commonServices.getToLocalStorage() || [];
    if (this.data.id) {
      //Find index of specific object using findIndex method.
      const objIndex = tasksData.findIndex(
        (obj: any) => obj.id == this.data.id
      );
      //Update object's name property.
      fd.id = this.data.id;
      tasksData[objIndex] = fd;
    } else {
      fd.id = tasksData.length + 1;
      tasksData.unshift(fd);
    }
    this.commonServices.saveToLocalStorage(tasksData);
    this._dialogRef.close();
  }
}
