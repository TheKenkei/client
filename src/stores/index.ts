import { AuthStore } from '@app/stores/auth';

import { AppStore } from './app';
import { OrganizatonsStore } from './organizations';
import { TransportStore } from './transport';

export type RootStore = {
  appStore: AppStore;
  orgsStore: OrganizatonsStore;
  transportStore: TransportStore;

  authStore: AuthStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  orgsStore: new OrganizatonsStore(),
  transportStore: new TransportStore(),

  authStore: new AuthStore(),
};

export default rootStore;
