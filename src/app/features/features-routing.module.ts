import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { ViewTasksContainerComponent } from './view/view-tasks/view-tasks-container.component';

const routes: Routes = [
  {
    path: 'app',
    component: FeaturesComponent,
    children: [
        {path: '', redirectTo: '/app/view-tasks', pathMatch: 'full'},
        {
          path: 'view-tasks',
          component: ViewTasksContainerComponent,
        }

        ],
      },
      {path: '', redirectTo: '/app/view-tasks', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
