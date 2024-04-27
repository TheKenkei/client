import { MapsStore } from '@app/stores/maps';

import { AppStore } from './app';
import { OrganizatonsStore } from './organizations';

export type RootStore = {
  appStore: AppStore;
  orgsStore: OrganizatonsStore;
  mapsStore: MapsStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  orgsStore: new OrganizatonsStore(),
  mapsStore: new MapsStore(),
};

export default rootStore;
