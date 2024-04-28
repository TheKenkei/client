import api from '@app/services/api/api';

export class AuthService {
  static login<T>(/* email: string, password: string */): Promise<T> {
    return api.post<any, T>('https://dummyjson.com/auth/login', {
      username: 'kminchelle',
      password: '0lelplR',
    });
    // return api.post<any, T>('/auth/login', { email, password });
  }

  static refresh<T>(): Promise<T> {
    return api.request({
      url: '/auth/refresh',
      method: 'POST',
      withCredentials: true,
    });
  }

  static logout() {
    return api.post('/auth/logout');
  }
}
