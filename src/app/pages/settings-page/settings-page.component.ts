import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule} from '@angular/common';
import { Profile } from '../../data/interfaces/profile.interface';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";



@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ProfileHeaderComponent, CommonModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}],
    description: [''],
    stack: ['']
  });

  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  constructor() {
    // Загружаем профиль при инициализации
    this.loadProfile();
    
    // Следим за изменениями профиля
    effect(() => {
      const profile = this.profileService.me();
      if (profile) {
        this.updateForm(profile);
      }
    });
  }

  private loadProfile() {
    this.isLoading.set(true);
    this.profileService.getMe().subscribe({
      error: (err) => {
        console.error('Ошибка загрузки профиля:', err);
        this.isLoading.set(false);
      }
    });
  }

  private updateForm(profile: Profile) {
    console.log('Обновление формы данными:', profile);
    this.form.patchValue({
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      description: profile.description || '', // гарантируем строку
      stack: profile.stack?.join(', ') || '' // массив в строку
    });
    this.isLoading.set(false);
  }

  async onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const formData = this.form.getRawValue();
      const profileData = {
        ...formData,
        stack: formData.stack?.split(',').map(s => s.trim()).filter(s => s) || []
      };

      console.log('Подготовленные данные для сохранения:', profileData);
      //@ts-ignore
      await firstValueFrom(this.profileService.patchProfile(profileData));
      
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      this.errorMessage.set('Не удалось сохранить изменения');
    } finally {
      this.isLoading.set(false);
    }
  }
}