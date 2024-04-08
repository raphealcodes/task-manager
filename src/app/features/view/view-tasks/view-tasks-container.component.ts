import { Component, OnInit } from '@angular/core';
import { initialData } from '@app/_shared/data/initial-task-data';
import { TaskDTO } from '@app/_shared/models/task-interface';
import { CommonService } from '@app/_shared/services/common.service';

@Component({
  selector: 'app-view-tasks-container',
  templateUrl: './view-tasks-container.component.html'
})
export class ViewTasksContainerComponent implements OnInit {

  tasksData!: TaskDTO[];
  constructor(
    private commonService: CommonService
  ) {

   }

  ngOnInit() {
    this.tasksData = this.commonService.getToLocalStorage();
  }

}
