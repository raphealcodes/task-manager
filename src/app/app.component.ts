import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-manager';

  constructor(
    private titleService: Title,
  ) {
    this.titleService.setTitle('Task | Manager');
  }

}
