import React from 'react';

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
  { label: 'In Progress', value: 56, color: 'blue' },
  { label: 'Completed', value: 12, color: 'green' },
];

const monthlySummary = [
  { name: '', maintainances: 0, breakdowns: 0 },
  { name: 'Jan', maintainances: 4000, breakdowns: 3000 },
  { name: 'Feb', maintainances: 2000, breakdowns: 1000 },
  { name: 'Mar', maintainances: 4400, breakdowns: 4000 },
  { name: 'Apr', maintainances: 9000, breakdowns: 3800 },
  { name: 'May', maintainances: 3500, breakdowns: 2000 },
  { name: 'Jun', maintainances: 1750, breakdowns: 1000 },
  { name: 'Jul', maintainances: 100, breakdowns: 100 },
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
  const classes = useStyles();
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
                      <MessageIcon className={classes.iconRoot} /> 5 Up coming Maintainances
                    </NavLink>
                    <NavLink className={classes.navLink} to="/breakdowns">
                      <MailOutlineIcon className={classes.iconRoot} /> 2 Pending Breakdowns
                    </NavLink>
                    <NavLink className={classes.navLink} to="/maintainances">
                      <CheckCircleIcon className={classes.iconRoot} /> 7 in progress Maintainances
                    </NavLink>
                    <NavLink className={classes.navLink} to="/breakdowns">
                      <NotificationsIcon className={classes.iconRoot} /> 3 Pending acceptence Breakdowns
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
                          return `Month: ${value}`;
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
                number="09"
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
                number="457"
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
                number="13"
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
                number="42"
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
                number="09"
                label="Maintainances"
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
                number="457"
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
                number="13"
                label="In progress Breakdowns & Maintainances"
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
