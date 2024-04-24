import { action, makeObservable, observable } from 'mobx';

import { Link } from '@app/models';

import { links } from './Base.links';

export class LinksStore {
  links = links;
  constructor() {
    makeObservable(this, {
      links: observable,
      getLinks: action,
      setLinks: action,
      deleteLink: action,
    });
  }
  getLinks(): Link[] {
    return this.links;
  }
  setLinks(links: Link[]): void {
    this.links = [...links];
  }
  addLink(link: Link): void {
    this.links.push(link);
  }
  getTitle(href: string): string {
    return this.links.find((item) => item.href === href)?.text ?? document.title;
  }
  deleteLink(link: Link): void {
    this.links.splice(
      this.links.findIndex((item) => item === link),
      1,
    );
  }
}

// links: Link[] = [
//   {
//     href: '/profile',
//     text: 'Профиль',
//   },
//   {
//     href: '/favorite',
//     text: 'Избранное',
//   },
//   {
//     href: '/maps',
//     text: 'Карта',
//   },
//   {
//     href: '/transport',
//     text: 'Управление транспортом',
//   },
//   {
//     href: '/employees',
//     text: 'Управление сотрудниками',
//   },
//   {
//     href: '/analytics',
//     text: 'Аналитика',
//   },
//   {
//     href: '/users',
//     text: 'Пользователи',
//   },
//   {
//     href: '/organizations',
//     text: 'Организации',
//   },
// ];
