import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ua/profile-card/profile-card.component';
import { CommonModule } from '@angular/common';




@Component({
	selector: 'app-root',
	imports: [RouterOutlet, ProfileCardComponent, CommonModule],

	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

}
