import BadgeIcon from '@mui/icons-material/Badge';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import NearMeIcon from '@mui/icons-material/NearMe';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

import { Link } from '@app/models';

export const links: Link[] = [
  {
    href: '/profile',
    text: 'Профиль',
    icon: <PersonIcon />,
  },
  {
    href: '/favorite',
    text: 'Избранное',
    icon: <StarIcon />,
  },
  {
    href: '/maps',
    text: 'Карта',
    icon: <NearMeIcon />,
  },
  {
    href: '/transport',
    text: 'Управление транспортом',
    icon: <DirectionsCarIcon />,
  },
  {
    href: '/employees',
    text: 'Управление сотрудниками',
    icon: <BadgeIcon />,
  },
  {
    href: '/analytics',
    text: 'Аналитика',
    icon: <InsertChartIcon />,
  },
  {
    href: '/users',
    text: 'Пользователи',
    icon: <PeopleAltIcon />,
  },
  {
    href: '/organizations',
    text: 'Организации',
    icon: <CorporateFareIcon />,
  },
];
