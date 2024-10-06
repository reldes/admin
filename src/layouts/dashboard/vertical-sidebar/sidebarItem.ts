// icons
import {
  DashboardOutlined,
} from '@ant-design/icons-vue';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Navigation' },
  {
    title: 'Dashboard',
    icon: DashboardOutlined,
    to: '/dashboard'
  },
  {
    title: 'Experiments',
    to: '/experiments'
  },
];

async function getSidebarItems(): Promise<menu[]> {
  return [
    ...sidebarItem,
  ];
}


export default getSidebarItems;
