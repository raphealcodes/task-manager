import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { priorityData, statusData } from '@app/_shared/data/initial-task-data';
import { ConfirmDeleteComponent } from '@app/_shared/dialogs/confirm-delete/confirm-delete.component';
import { CreateTaskComponent } from '@app/_shared/dialogs/create-task/create-task.component';
import { TaskDTO } from '@app/_shared/models/task-interface';
import { CommonService } from '@app/_shared/services/common.service';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss'],
})
export class ViewTasksComponent implements OnInit, AfterViewInit {
  @Input() tasks: TaskDTO[] = [];

  taskDisplayedColumns: any = [
    { name: 'id', title: 'S/n', type: '' },
    { name: 'title', title: 'Title', type: 'subscribers' },
    { name: 'description', title: 'Description', type: 'desc' },
    { name: 'due_date', title: 'Due Date', type: 'date' },
    { name: 'priority', title: 'Priority', type: 'priority' },
    { name: 'status', title: 'Status', type: 'status' },
    { name: 'action', title: '', type: 'action' },
  ];
  taskDataSource = new MatTableDataSource<any>([]);
  taskColumnsToDisp = this.taskDisplayedColumns.map((col: any) => col.name);

  container: any = {};
  priorityData: any = priorityData;
  statusData: any = statusData;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  myForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      priority: [''],
      status: [''],
    });
    this.taskDataSource = new MatTableDataSource<TaskDTO>(this.tasks);
  }

  ngAfterViewInit() {
    this.taskDataSource.paginator = this.paginator;
  }

  filter(filterBy: string, searchTerm: any): any {
    let searchArray: TaskDTO[];
    const filter = {
      priority: this.myForm.get('priority')?.value,
      status: this.myForm.get('status')?.value
    }
    searchArray = this.search(filter);
    this.taskDataSource = new MatTableDataSource<TaskDTO>(searchArray);
    // switch (filterBy) {
    //   case 'priority':
    //      filter.priority = searchTerm?.value;
    //      searchArray = this.search(filter);
    //     // searchArray = this.tasks.filter(
    //     //   (value: any) => value.priority === searchTerm?.value
    //     // );
    //     this.taskDataSource = new MatTableDataSource<TaskDTO>(searchArray);
    //     break;
    //   case 'status':
    //     filter.status = searchTerm?.value;
    //     searchArray = this.search(filter);
    //     // searchArray = this.tasks.filter(
    //     //   (value: any) => value.status === searchTerm?.value
    //     // );
    //     this.taskDataSource = new MatTableDataSource<TaskDTO>(searchArray);
    //     break;
    //   default:
    //     return false;
    // }
  }

search(filter: any): any {
  return this.tasks.filter(obj => obj.priority == filter.priority || obj.status == filter.status);
}

  createTask() {
    const taskDialog = this.dialog.open(CreateTaskComponent, {
      data: {},
      autoFocus: false,
      minWidth: '320px',
      // height: '100vh',
      maxHeight: '80vh',
      disableClose: true,
    });
    taskDialog.afterClosed().subscribe((result) => {
      this.tasks = this.commonService.getToLocalStorage();
      this.taskDataSource = new MatTableDataSource<TaskDTO>(this.tasks);
    });
  }

  editTask(task: TaskDTO) {
    const taskDialog = this.dialog.open(CreateTaskComponent, {
      data: task,
      autoFocus: false,
      minWidth: '320px',
      // height: '100vh',
      maxHeight: '80vh',
      disableClose: true,
    });
    taskDialog.afterClosed().subscribe((result) => {
      this.tasks = this.commonService.getToLocalStorage();
      this.taskDataSource = new MatTableDataSource<TaskDTO>(this.tasks);
    });
  }

  deleteTask(task: TaskDTO) {
    const taskDialog = this.dialog.open(ConfirmDeleteComponent, {
      data: task,
      autoFocus: false,
      disableClose: true,
    });
    taskDialog.afterClosed().subscribe((result) => {
      this.tasks = this.commonService.getToLocalStorage();
      this.taskDataSource = new MatTableDataSource<TaskDTO>(this.tasks);
    });
  }
}
