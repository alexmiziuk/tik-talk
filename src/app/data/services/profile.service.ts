import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { map, tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	http = inject(HttpClient)

	baseApyUrl = 'https://icherniakov.ru/yt-course/'
  /* me: any; */

  constructor() { }

  me = signal<Profile | null>(null)

	getTestAccounts() {
		return this.http.get<Profile[]>(`${this.baseApyUrl}account/test_accounts`)
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApyUrl}account/me`)
      .pipe(
       tap(res => this.me.set(res))
      )
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApyUrl}account/${id}`)
  }
  getSubscribersShortList(subsAmount = 3) {
    return this.http.get<Profile>(`${this.baseApyUrl}account/subscribers/?page=1&size=50`)
      .pipe(
        map(res => res.items.slice(1, subsAmount + 1))
      )
  }

  patchProfile(profile: Partial<Profile>) {
    console.log('Отправляемые данные:', profile); // Логируем отправку
    return this.http.patch<Profile>(`${this.baseApyUrl}account/me`, profile)
      .pipe(
        tap(updatedProfile => {
          console.log('Получен обновлённый профиль:', updatedProfile);
          this.me.set(updatedProfile);
        })
      );
  }

}

