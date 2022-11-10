import React from 'react';
import Box from '@material-ui/core/Box';
import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import ReportsDataList from './ReportsDataList';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  headerRoot: {
    paddingBottom: '15px',
    paddingTop: '15px',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      '&.Cmt-header-root': {
        flexDirection: 'column',
      },
      '& .Cmt-action-default-menu': {
        position: 'absolute',
        right: 24,
        top: 5,
      },
    },
  },
  cardContentRoot: {
    padding: '0 !important',
    borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    marginTop: -1,
  },
  scrollbarRoot: {
    //height: 590,
    '& .CmtList-EmptyResult': {
      backgroundColor: 'transparent',
      border: '0 none',
    },
    paddingBottom: '30px',
  },
  searchAction: {
    position: 'relative',
    width: 38,
    height: 38,
  },
  searchActionBar: {
    position: 'absolute',
    right: 0,
    top: 2,
    zIndex: 1,
  },
  btnRoot: {
    backgroundColor: theme.palette.lightBtn.bgColor,
    color: theme.palette.lightBtn.textColor,
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 1.25,
    padding: '3px 10px',
    '&:hover, &:focus': {
      backgroundColor: alpha(theme.palette.lightBtn.bgColor, 0.8),
      color: theme.palette.lightBtn.textColor,
    },
  },
  titleRoot: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
  purpleIcon: {
    color: 'purple',
    backgroundColor: 'rgba(63, 81, 181, 0.1)',
    marginRight: '10px',
    marginLeft: '10px',
  },
}));

const BreakdownsList = ({ onReportClick, data }) => {
  const classes = useStyles();
  return (
    <CmtCard>
      <CmtCardHeader
        className={classes.headerRoot}
        title={
          <Box display="flex" alignItems={{ md: 'center' }} flexDirection={{ xs: 'column', md: 'row' }}>
            <Typography component="div" variant="h4" className={classes.titleRoot}>
              Reports
            </Typography>
          </Box>
        }
      />
      <CmtCardContent className={classes.cardContentRoot}>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <ReportsDataList data={data} onReportClick={onReportClick} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default BreakdownsList;
