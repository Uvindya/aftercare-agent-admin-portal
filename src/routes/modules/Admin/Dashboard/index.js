import React, { useEffect, useState } from 'react';

import { Grid, Typography, ListItem, Box } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CounterCard from '../../../../@jumbo/components/Common/CounterCard';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtList from '../../../../@coremat/CmtList';
import CmtProgressBar from '../../../../@coremat/CmtProgressBar';

import GridContainer from '../../../../@jumbo/components/GridContainer';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { NavLink } from 'react-router-dom';

import MessageIcon from '@material-ui/icons/Message';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { getDashboardSummary } from '../../../../redux/actions/Reports';
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

const statusSummary = [
  { label: 'Not Started', value: 89, color: 'orange' },
  { label: 'Inprogress', value: 56, color: 'blue' },
  { label: 'Completed', value: 12, color: 'green' },
];

const ProgressIndicator = ({ item }) => (
  <Box width={1}>
    <CmtProgressBar
      label={<Box mb={-1}>{item.label}</Box>}
      labelPos="top-left"
      value={item.value}
      renderValue={value => {
        return `${value}%`;
      }}
      containedColor={item.color}
      thickness={7}
      onlyContained
    />
  </Box>
);

const DashboardModule = () => {
  const { dashboardSummary } = useSelector(({ reportsReducer }) => reportsReducer);
  const classes = useStyles();

  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [techniciansCount, setTechniciansCount] = useState(0);
  const [totalTasksCount, setTotalTasksCount] = useState(0);
  const [maintainancesCount, setMaintainancesCount] = useState(0);
  const [breakdownsCount, setBreakdownsCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [upCommingMaintainacesCount, setUpCommingMaintainacesCount] = useState(0);
  const [pendingBreakdownCount, setPendingBreakdownCount] = useState(0);
  const [inProgressMaintainanceCount, setInProgressMaintainanceCount] = useState(0);
  const [pendingAcceptenceBreakdownCount, setPendingAcceptenceBreakdownCount] = useState(0);
  const [monthlySummary, setMonthlySummary] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(dashboardSummary).length === 0) {
      dispatch(getDashboardSummary());
      setInterval(() => {
        if (window.location.pathname.includes('dashboard')) dispatch(getDashboardSummary());
      }, 10000);
    }
    setProjectsCount(dashboardSummary.productsCount);
    setClientsCount(dashboardSummary.clientsCount);
    setTechniciansCount(dashboardSummary.technicianCount);
    setTotalTasksCount(dashboardSummary.tasksCount);
    setMaintainancesCount(dashboardSummary.maintainancesCount);
    setBreakdownsCount(dashboardSummary.breakdownsCount);
    setInProgressCount(dashboardSummary.inprogressCount);
    setUpCommingMaintainacesCount(dashboardSummary.upCommingMaintainacesCount);
    setPendingBreakdownCount(dashboardSummary.pendingBreakdownCount);
    setInProgressMaintainanceCount(dashboardSummary.inprogressMaintainanceCount);
    setPendingAcceptenceBreakdownCount(dashboardSummary.pendingAcceptenceBreakdownCount);
    statusSummary[0].value = Number(dashboardSummary.notStartedPercentage).toFixed(2);
    statusSummary[1].value = Number(dashboardSummary.inprogressPercentage).toFixed(2);
    statusSummary[2].value = Number(dashboardSummary.completedPercentage).toFixed(2);
    setMonthlySummary(dashboardSummary.monthlySummary);
  }, [dispatch, dashboardSummary]);

  const formatNumber = number => {
    return number < 10 ? '0' + number : number;
  };

  return (
    <PageContainer>
      <GridContainer>
        <Grid item xs={12}>
          <CmtCard className={classes.cardRoot}>
            <CmtCardHeader
              title="Welcome !!!"
              titleProps={{
                variant: 'h2',
                component: 'div',
              }}
            />
            <CmtCardContent>
              <GridContainer>
                <Grid item xs={12} sm={6} md={3}>
                  <div>
                    <Typography component="div" variant="h5" className={classes.titleSpace}>
                      You Have
                    </Typography>

                    <NavLink className={classes.navLink} to="/maintainances">
                      <MessageIcon className={classes.iconRoot} /> {`${upCommingMaintainacesCount} Upcoming Maintenances`}
                    </NavLink>
                    <NavLink className={classes.navLink} to="/breakdowns">
                      <MailOutlineIcon className={classes.iconRoot} /> {`${pendingBreakdownCount} Pending Breakdowns`}
                    </NavLink>
                    <NavLink className={classes.navLink} to="/maintainances">
                      <CheckCircleIcon className={classes.iconRoot} />{' '}
                      {`${inProgressMaintainanceCount} inprogress Maintenances`}
                    </NavLink>
                    <NavLink className={classes.navLink} to="/breakdowns">
                      <NotificationsIcon className={classes.iconRoot} />{' '}
                      {`${pendingAcceptenceBreakdownCount} Pending acceptence Breakdowns`}
                    </NavLink>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className={classes.order3}>
                  <Typography component="div" variant="h5" className={classes.titleSpace}>
                    Overall Status Summary
                  </Typography>
                  <CmtList
                    data={statusSummary}
                    renderRow={(item, index) => {
                      return (
                        <ListItem key={index} component="div" className={classes.listItemRoot}>
                          <ProgressIndicator item={item} />
                        </ListItem>
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.order2}>
                  <Typography component="div" variant="h5" className={classes.titleSpace}>
                    Monthly Summary
                  </Typography>
                  <ResponsiveContainer width="100%" height={120}>
                    <AreaChart data={monthlySummary} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <Tooltip
                        labelStyle={{ color: 'black' }}
                        itemStyle={{ color: '#0795F4' }}
                        labelFormatter={function(value) {
                          return `${value}`;
                        }}
                        cursor={false}
                      />

                      <XAxis dataKey="name" hide />
                      <Area
                        type="monotone"
                        dataKey="breakdowns"
                        stackId="1"
                        stroke="#0795F4"
                        fillOpacity={1}
                        fill="#0795F4"
                      />
                      <Area
                        type="monotone"
                        dataKey="maintainances"
                        stackId="1"
                        stroke="#9BE7FD"
                        fillOpacity={1}
                        fill="#9BE7FD"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Grid>
              </GridContainer>
            </CmtCardContent>
          </CmtCard>
        </Grid>
        <Grid item xs={12} xl={8} className={classes.orderLg1}>
          <GridContainer>
            <Grid item xs={12} sm={6} md={3}>
              <CounterCard
                icon={'/images/dashboard/projectIcon.svg'}
                number={projectsCount}
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
                number={clientsCount}
                label="Clients"
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
                number={techniciansCount}
                label="Technicians"
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
                number={totalTasksCount}
                label="Total Tasks"
                labelProps={{
                  fontSize: 16,
                }}
                backgroundColor={['#F25247 -18.96%', '#B72D23 108.17%']}
                gradientDirection="180deg"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CounterCard
                icon={'/images/dashboard/projectIcon.svg'}
                number={maintainancesCount}
                label="Maintenances"
                labelProps={{
                  fontSize: 16,
                }}
                backgroundColor={['#abf049 -18.96%', '#66902b 108.17%']}
                gradientDirection="180deg"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CounterCard
                icon={'/images/dashboard/tasksIcon.svg'}
                number={breakdownsCount}
                label="Breakdowns"
                labelProps={{
                  fontSize: 16,
                }}
                backgroundColor={['#f47fc4 -18.96%', '#a83377 108.17%']}
                gradientDirection="180deg"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CounterCard
                icon={'/images/dashboard/teamsIcon.svg'}
                number={inProgressCount}
                label="Inprogress Breakdowns & Maintenances"
                labelProps={{
                  fontSize: 16,
                }}
                backgroundColor={['#f4af7f -18.96%', '#a86333 108.17%']}
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
