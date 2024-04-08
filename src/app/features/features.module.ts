import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '@app/_shared/shared.module';
import { ViewTasksContainerComponent } from './view/view-tasks/view-tasks-container.component';
import { ViewTasksComponent } from './view/view-tasks/view-tasks.component';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule
  ],
  declarations: [
    FeaturesComponent,

    // view tasks component
        ViewTasksContainerComponent,
        ViewTasksComponent
    // view tasks component
  ]
})
export class FeaturesModule { }
