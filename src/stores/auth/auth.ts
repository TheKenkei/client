import { AxiosResponse } from 'axios';
import { action, makeAutoObservable } from 'mobx';

import { IAuthResponse } from '@app/models';
import { AuthService } from '@app/services';

export class AuthStore {
  loading: boolean = false;
  token: string | null = null;
  isAuthProgress: boolean = false;

  constructor() {
    makeAutoObservable(this);
    // makeObservable(this, {
    //   token: observable,
    //   loading: observable,
    //   isAuthProgress: observable,
    //   login: action,
    //   refresh: action,
    //   setToken: action,
    // });
  }

  setToken(data: IAuthResponse): IAuthResponse {
    this.token = data.token;
    return data;
  }

  getToken(): string | null {
    return this.token;
  }

  async login(login: string, password: string): Promise<IAuthResponse> {
    this.isAuthProgress = true;
    console.log('login', login, password);

    return (
      AuthService.login<AxiosResponse<IAuthResponse>>()
        // return AuthService.login<AxiosResponse<IAuthResponse>>(login, password)
        .then(
          action((response: AxiosResponse<IAuthResponse>) =>
            this.setToken(response.data),
          ),
        )
        .finally(action(() => (this.isAuthProgress = false)))
    );
  }

  async refresh(): Promise<IAuthResponse> {
    this.loading = true;
    return AuthService.refresh<AxiosResponse<IAuthResponse>>()
      .then(
        action((response: AxiosResponse<IAuthResponse>) => {
          this.token = response.data.token;
          return response.data;
        }),
      )
      .finally(action(() => (this.loading = false)));
  }

  isAuth(): boolean {
    return !!this.getToken();
  }
}

export default new AuthStore();
