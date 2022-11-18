import React from 'react';
import Box from '@material-ui/core/Box';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CmtMediaObject from '../../../../../@coremat/CmtMediaObject';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AcceptenceIcon from '@material-ui/icons/CheckCircle';
import ApproveIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles(theme => ({
  mediaObjectRoot: {
    width: '100%',
    display: 'flex',
    '@media screen and (max-width: 699px)': {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    '& .Cmt-media-image': {
      marginRight: 24,
      '@media screen and (max-width: 699px)': {
        alignSelf: 'unset',
        marginRight: 0,
        marginBottom: 16,
        width: '100%',
      },
    },
  },
  carouselRoot: {
    marginRight: 0,
    '& .bottom-left .slick-dots': {
      left: 10,
    },
    '& .slick-dots': {
      bottom: 15,
      '& li button:before': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
      '& li.slick-active button:before': {
        backgroundColor: theme.palette.warning.main,
      },
    },
  },
  titleRoot: {
    letterSpacing: 0.15,
    fontSize: 16,
    marginBottom: 12,
    fontWeight: theme.typography.fontWeightRegular,
  },
  badgeRoot: {
    color: theme.palette.common.white,
    borderRadius: 30,
    fontSize: 12,
    padding: '2px 10px',
    marginBottom: 16,
    display: 'inline-block',
  },
  subTitleRoot: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    marginBottom: 8,
  },
  iconRoot: {
    fontSize: 18,
    marginRight: 6,
  },
  linkBtn: {
    fontSize: 14,
    color: theme.palette.primary.main,
    letterSpacing: 1.25,
    fontWeight: theme.typography.fontWeightBold,
    cursor: 'pointer',
    display: 'inline-block',
  },
  priceRoot: {
    fontSize: 16,
    color: theme.palette.primary.main,
    marginBottom: 5,
    fontWeight: theme.typography.fontWeightRegular,
  },
  footerComponentRoot: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: 16,
      textAlign: 'left',
    },
  },
  containerStyle: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 250,
    },
    [theme.breakpoints.up('md')]: {
      width: 315,
    },
    '@media screen and (max-width: 699px)': {
      width: '100%',
    },
    '& .slick-slide img': {
      borderRadius: 4,
      display: 'block !important',
    },
  },
  greenIcon: {
    color: 'green',
    backgroundColor: 'rgba(63, 81, 181, 0.1)',
    marginRight: '10px',
  },
  orangeIcon: {
    color: 'orange',
    backgroundColor: 'rgba(63, 81, 181, 0.1)',
    marginRight: '10px',
  },
  purpleIcon: {
    color: 'purple',
    backgroundColor: 'rgba(63, 81, 181, 0.1)',
    marginRight: '10px',
  },
  brownIcon: {
    color: 'brown',
    backgroundColor: 'rgba(63, 81, 181, 0.1)',
    marginRight: '10px',
  },
  redIcon: {
    color: '#f50057',
    backgroundColor: 'rgba(63, 81, 181, 0.1)',
    marginRight: '10px',
  },
  titleText: {
    color: 'purple',
  },
}));

const MaintainanceItem = ({ item, onMaintainanceClick }) => {
  const classes = useStyles();
  const getTitle = () => (
    <React.Fragment>
      <Box className={classes.badgeRoot} component="span" bgcolor={item.status === 'COMPLETED' ? '#FF8C00' : '#8DCD03'}>
        {item.status.replaceAll('_', ' ')}
      </Box>
      <Typography component="div" variant="h4" mb={1} className={classes.titleRoot}>
        {`${item.productName} (${item.productId}) - ${item.description}`}
      </Typography>
    </React.Fragment>
  );

  const getContent = () => (
    <Box component="div" display="block" flexDirection="row" mb={4} fontSize={12}>
      <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
        <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
          Task ID:
        </Box>
        {item.id}
      </Box>
      <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
        <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
          Reported Date:
        </Box>
        {item.reportedAt}
      </Box>
      <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
        <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
          Scheduled Date:
        </Box>
        {item.scheduledDate}
      </Box>
    </Box>
  );

  const getFooter = () => (
    <React.Fragment>
      <Typography component="div" variant="h6" className={classes.priceRoot}>
        {item.price}
      </Typography>
      <Box component="span" fontSize={12} color="text.secondary">
        {item.pricePerSqFt}
      </Box>
    </React.Fragment>
  );

  return (
    <CmtMediaObject
      className={classes.mediaObjectRoot}
      avatarPos="center"
      title={getTitle()}
      subTitle={item.address}
      subTitleProps={{ className: classes.subTitleRoot }}
      content={getContent()}
      footerComponent={getFooter()}
      footerComponentProps={{ className: classes.footerComponentRoot }}>
      <Box fontSize={12} color="text.disabled" display="flex" flexDirection="row" alignItems="center" mb={2}>
        <Box display="flex" flexDirection="row" alignItems="center" mr={4}>
          <PermIdentityIcon className={classes.iconRoot} /> {`${item.clientName} (${item.clientId})`}
        </Box>
      </Box>
      <IconButton
        aria-label="More Details"
        className={classes.purpleIcon}
        onClick={() => onMaintainanceClick('MORE_DETAILS', item)}>
        <InfoIcon />
      </IconButton>
      {item.status === 'TECH_ASSIGNED' && (
        <IconButton
          aria-label="Approve"
          className={classes.greenIcon}
          onClick={() => onMaintainanceClick('APPROVE_M', item)}>
          <ApproveIcon />
        </IconButton>
      )}

      {item.status === 'SCHEDULED' && (
        <IconButton aria-label="Skip" className={classes.brownIcon} onClick={() => onMaintainanceClick('SKIP_M', item)}>
          <WarningIcon />
        </IconButton>
      )}

      {item.status === 'NEEDS_CLIENTS_ACCEPTENCE' && (
        <IconButton aria-label="Accept" className={classes.greenIcon} onClick={() => onMaintainanceClick('ACCEPT_M', item)}>
          <AcceptenceIcon />
        </IconButton>
      )}
    </CmtMediaObject>
  );
};

export default MaintainanceItem;
