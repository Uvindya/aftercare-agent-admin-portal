import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashboard.main'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.dashboard.sub2'} />, isActive: true },
];

const ReportsPage = () => {
  return (
    <PageContainer heading={<IntlMessages id="sidebar.dashboard.sub2" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default ReportsPage;
