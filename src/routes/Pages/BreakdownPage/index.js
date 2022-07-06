import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.breakdown.main'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.breakdown.sub'} />, isActive: true },
];

const BreakdownPage = () => {
  return (
    <PageContainer heading={<IntlMessages id="sidebar.breakdown.main" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <div style={{ marginBottom: 10 }}>
            <IntlMessages id="pages.samplePage.description" />
          </div>
          <Divider />
          <div style={{ marginTop: 24 }}>
            <h3>Knowledge Base and Support</h3>
            <SidebarButtons />
          </div>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default BreakdownPage;
