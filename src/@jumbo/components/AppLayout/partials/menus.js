import React from 'react';
import { PostAdd } from '@material-ui/icons';
import IntlMessages from '../../../utils/IntlMessages';

export const sidebarNavs = {
  ADMIN: [
    {
      name: <IntlMessages id={'sidebar.dashboard.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.dashboard.sub1'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/dashboard',
        },
        {
          name: <IntlMessages id={'sidebar.dashboard.sub2'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/reports',
        },
      ],
    },
    {
      name: <IntlMessages id={'sidebar.products.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.products.sub'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/products',
        },
      ],
    },
    {
      name: <IntlMessages id={'sidebar.maintainance.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.maintainance.sub'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/maintainances',
        },
      ],
    },
    {
      name: <IntlMessages id={'sidebar.breakdown.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.breakdown.sub'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/breakdowns',
        },
      ],
    },
    {
      name: <IntlMessages id={'sidebar.client.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.client.sub'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/clients',
        },
      ],
    },
    {
      name: <IntlMessages id={'sidebar.technician.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.technician.sub'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/technicians',
        },
      ],
    },
  ],
  TECHNICIAN: [
    {
      name: <IntlMessages id={'sidebar.dashboard.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.dashboard.sub1'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/technician/dashboard',
        },
      ],
    },
    {
      name: <IntlMessages id={'sidebar.maintainance.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.maintainance.sub'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/technician/maintainances',
        },
      ],
    },
    {
      name: <IntlMessages id={'sidebar.breakdown.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.breakdown.sub'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/technician/breakdowns',
        },
      ],
    },
  ],
  CLIENT: [
    {
      name: <IntlMessages id={'sidebar.dashboard.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.dashboard.sub1'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/client/dashboard',
        },
      ],
    },
    {
      name: <IntlMessages id={'sidebar.maintainance.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.maintainance.sub'} />,
          type: 'item',
          icon: <PostAdd />,
          link: '/client/maintainances',
        },
      ],
    },
    {
      name: <IntlMessages id={'sidebar.breakdown.main'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.breakdown.sub'} />,
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
