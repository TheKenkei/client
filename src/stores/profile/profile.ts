import { makeAutoObservable } from 'mobx';

import { IUser } from '@app/models';
import { ProfileParam, ProfileService } from '@app/services';

export class ProfileStore {
  _user: IUser | null = null;
  data: IUser = { id: 1, name: '', username: '', email: '', avatar: '' };
  private readonly profileService = new ProfileService();

  constructor() {
    makeAutoObservable(this);
  }

  get user(): IUser | null {
    return this._user;
  }

  set user(value: IUser) {
    this._user = value;
  }

  async getProfile(options?: ProfileParam): Promise<IUser> {
    return this.profileService.getProfile(options).then((response) => {
      this.user = response.data;
      return response.data;
    });
  }

  async update(options: any): Promise<IUser> {
    return this.profileService.updateProfile(options).then((response) => {
      this.user = response.data;
      return response.data;
    });
  }

  async changeAvatar(avatar: string, options?: ProfileParam): Promise<void> {
    return this.profileService.getProfile(options).then((response) => {
      response.data;
      this.data.avatar = avatar;
    });
  }
}
