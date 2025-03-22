import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, NgIf],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me)
  profile$ = this.route.params
    .pipe(
      switchMap(({ id }) => {
        if (id === 'me') return this.me$;
        return this.profileService.getAccount(id);
      })
    );
}


