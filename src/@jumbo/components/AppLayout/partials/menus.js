import React from 'react';
import { PostAdd } from '@material-ui/icons';
import IntlMessages from '../../../utils/IntlMessages';

export const sidebarNavs = {
  ADMIN: [
    {
      name: 'Home',
      type: 'section',
      children: [
        {
          name: 'Dashboard',
          type: 'item',
          icon: <PostAdd />,
          link: '/dashboard',
        },
        {
          name: 'Reports',
          type: 'item',
          icon: <PostAdd />,
          link: '/reports',
        },
      ],
    },
    {
      name: 'Products',
      type: 'section',
      children: [
        {
          name: 'Manage Products',
          type: 'item',
          icon: <PostAdd />,
          link: '/products',
        },
      ],
    },
    {
      name: 'Maintenances',
      type: 'section',
      children: [
        {
          name: 'Manage Maintenances',
          type: 'item',
          icon: <PostAdd />,
          link: '/maintainances',
        },
      ],
    },
    {
      name: 'Breakdowns',
      type: 'section',
      children: [
        {
          name: 'Manage Breakdowns',
          type: 'item',
          icon: <PostAdd />,
          link: '/breakdowns',
        },
      ],
    },
    {
      name: 'Clients',
      type: 'section',
      children: [
        {
          name: 'Manage Clients',
          type: 'item',
          icon: <PostAdd />,
          link: '/clients',
        },
      ],
    },
    {
      name: 'Technicians',
      type: 'section',
      children: [
        {
          name: 'Manage Technicians',
          type: 'item',
          icon: <PostAdd />,
          link: '/technicians',
        },
      ],
    },
  ],
  TECHNICIAN: [
    {
      name: 'Home',
      type: 'section',
      children: [
        {
          name: 'Dashboard',
          type: 'item',
          icon: <PostAdd />,
          link: '/technician/dashboard',
        },
      ],
    },
    {
      name: 'Maintenaces',
      type: 'section',
      children: [
        {
          name: 'Manage Maintenaces',
          type: 'item',
          icon: <PostAdd />,
          link: '/technician/maintainances',
        },
      ],
    },
    {
      name: 'Breakdowns',
      type: 'section',
      children: [
        {
          name: 'Manage Breakdowns',
          type: 'item',
          icon: <PostAdd />,
          link: '/technician/breakdowns',
        },
      ],
    },
    /* {
      name: 'MyProfile',
      type: 'section',
      children: [
        {
          name: 'My Profile',
          type: 'item',
          icon: <PostAdd />,
          link: '/technician/profile',
        },
      ],
    },*/
  ],
  CLIENT: [
    {
      name: 'Home',
      type: 'section',
      children: [
        {
          name: 'Dashboard',
          type: 'item',
          icon: <PostAdd />,
          link: '/client/dashboard',
        },
      ],
    },
    {
      name: 'Maintenaces',
      type: 'section',
      children: [
        {
          name: 'Manage Maintenaces',
          type: 'item',
          icon: <PostAdd />,
          link: '/client/maintainances',
        },
      ],
    },
    {
      name: 'Breakdowns',
      type: 'section',
      children: [
        {
          name: 'Manage Breakdowns',
          type: 'item',
          icon: <PostAdd />,
          link: '/client/breakdowns',
        },
      ],
    },
  ],
};

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
];
