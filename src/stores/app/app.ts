import { makeAutoObservable } from 'mobx';

export class AppStore {
  openSidebar;
  openMobile = false;

  loading = false;

  error: string | null = null;

  constructor() {
    this.openSidebar = localStorage.getItem('open') === `true`;
    makeAutoObservable(this);
  }

  toggleOpenSidebar(): void {
    this.openSidebar = !this.openSidebar;
    localStorage.setItem('open', String(this.openSidebar));
  }

  toggleOpenMobile(): void {
    this.openMobile = !this.openMobile;
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
  }
  getLoading(): boolean {
    return this.loading;
  }

  setError(error: string | null): void {
    this.error = error;
  }
  getError(): string | null {
    return this.error;
  }
}

export default new AppStore();
