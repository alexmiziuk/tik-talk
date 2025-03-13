import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	http = inject(HttpClient)

	baseApyUrl = 'https://icherniakov.ru/yt-course/'
  me: any;

	constructor() { }

	getTestAccounts() {
		return this.http.get<Profile[]>(`${this.baseApyUrl}account/test_accounts`)
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApyUrl}account/me`)
  }

  getSubscribersShortList() {
    return this.http.get<Profile>(`${this.baseApyUrl}account/subscribers/?page=1&size=50`)
      .pipe(
        map(res => res.items.slice(1, 4))
      )
  }

}

