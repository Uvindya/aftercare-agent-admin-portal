import React, { useEffect, useState } from 'react';

import { Grid } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CounterCard from '../../../../@jumbo/components/Common/CounterCard';

import GridContainer from '../../../../@jumbo/components/GridContainer';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { getClientDashboardSummary } from '../../../../redux/actions/Reports';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  orderLg2: {
    [theme.breakpoints.up('lg')]: {
      order: 2,
    },
  },
  orderLg1: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
    },
  },
  cardRoot: {
    '& .Cmt-card-content': {
      marginTop: -15,
    },
  },
  titleSpace: {
    marginBottom: 20,
    fontWeight: theme.typography.fontWeightBold,
  },
  order2: {
    [theme.breakpoints.up('md')]: {
      order: 2,
    },
  },
  order3: {
    [theme.breakpoints.up('md')]: {
      order: 3,
    },
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    color: theme.palette.text.secondary,
  },
  iconRoot: {
    fontSize: 18,
    marginRight: 10,
  },
  titleSpace: {
    marginBottom: 20,
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.up('sm')]: {
      marginTop: 15,
    },
  },
  titleRoot: {
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  listItemRoot: {
    padding: 0,
    '& .root': {
      marginBottom: 2,
    },
    '& .Cmt-label-container': {
      fontSize: 12,
      color: theme.palette.text.secondary,
    },
  },
}));

const DashboardModule = () => {
  const { dashboardSummary } = useSelector(({ reportsReducer }) => reportsReducer);
  const classes = useStyles();

  const [productsCount, setProductsCount] = useState(0);
  const [activeBreakdownCount, setActiveBreakdownCount] = useState(0);
  const [waitingAccepetnceCount, setWaitingAcceptenceCount] = useState(0);
  const [upCommingMaintainacesCount, setUpCommingMaintainacesCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(dashboardSummary).length === 0) {
      dispatch(getClientDashboardSummary());
      setInterval(() => {
        if (window.location.pathname.includes('dashboard')) dispatch(getClientDashboardSummary());
      }, 10000);
    }
    setProductsCount(dashboardSummary.productsCount);
    setActiveBreakdownCount(dashboardSummary.activeBreakdownsCount);
    setWaitingAcceptenceCount(dashboardSummary.waitingAcceptenceCount);
    setUpCommingMaintainacesCount(dashboardSummary.upCommingMaintainacesCount);
  }, [dispatch, dashboardSummary]);

  const formatNumber = number => {
    return number < 10 ? '0' + number : number;
  };

  return (
    <PageContainer>
      <GridContainer>
        <Grid item xs={12} xl={8} className={classes.orderLg1}>
          <GridContainer>
            <Grid item xs={12} sm={6} md={3}>
              <CounterCard
                icon={'/images/dashboard/projectIcon.svg'}
                number={productsCount}
                label="Products"
                labelProps={{
                  fontSize: 16,
                }}
                backgroundColor={['#8E49F0 -18.96%', '#4904AB 108.17%']}
                gradientDirection="180deg"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CounterCard
                icon={'/images/dashboard/tasksIcon.svg'}
                number={activeBreakdownCount}
                label="Active Breakdowns"
                labelProps={{
                  fontSize: 16,
                }}
                backgroundColor={['#5AB9FE -18.96%', '#1372B7 108.17%']}
                gradientDirection="180deg"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CounterCard
                icon={'/images/dashboard/teamsIcon.svg'}
                number={waitingAccepetnceCount}
                label="Waiting for Acceptence"
                labelProps={{
                  fontSize: 16,
                }}
                backgroundColor={['#de31ee -18.96%', '#ed90f6 108.17%']}
                gradientDirection="180deg"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CounterCard
                icon={'/images/dashboard/filesIcon.svg'}
                number={upCommingMaintainacesCount}
                label="Up Comming Maintainances"
                labelProps={{
                  fontSize: 16,
                }}
                backgroundColor={['#F25247 -18.96%', '#B72D23 108.17%']}
                gradientDirection="180deg"
              />
            </Grid>
          </GridContainer>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default DashboardModule;
