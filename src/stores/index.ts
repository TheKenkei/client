import { AppStore } from './app';
import { LinksStore } from './links';
import { OrganizatonsStore } from './organizations';

export type RootStore = {
  appStore: AppStore;
  orgsStore: OrganizatonsStore;
  linksStore: LinksStore;
};

const rootStore: RootStore = {
  appStore: new AppStore(),
  orgsStore: new OrganizatonsStore(),
  linksStore: new LinksStore(),
};

export default rootStore;
