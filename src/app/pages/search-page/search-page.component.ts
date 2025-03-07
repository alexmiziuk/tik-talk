import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileCardComponent } from '../../common-ua/profile-card/profile-card.component';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
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
