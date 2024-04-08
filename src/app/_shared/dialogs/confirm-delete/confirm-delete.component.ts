import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/_shared/services/common.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonServices: CommonService,
    public _dialogRef: MatDialogRef<ConfirmDeleteComponent>
  ) { }

  ngOnInit() {
  }

  deleteTask() {
    let tasksData: any = this.commonServices.getToLocalStorage() || [];
    if (this.data) {
      // remove the object from the list
      tasksData = tasksData.filter((task: any) => task.id != this.data.id)
      this.commonServices.saveToLocalStorage(tasksData);
      this._dialogRef.close();
    }
  }

}
