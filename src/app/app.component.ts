import { Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ua/profile-card/profile-card.component';
import { ProfileService } from './data/services/profile.service';
import { CommonModule } from '@angular/common';
import { Profile } from './data/interfaces/profile.inerface';

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
  /*  title = 'tik-talk'; */
  profileService = inject(ProfileService)
  profiles: Profile[] = []
  subscribe: any;
  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(val => {
        this.profiles = val
      })
  }
  trackById(index: number, profile: Profile) {
    return profile.id;
  }
}
