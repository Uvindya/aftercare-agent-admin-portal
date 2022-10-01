import React from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CmtCarousel from '../../../../../@coremat/CmtCarousel';
import { Close } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import CmtCard from '../../../../../@coremat/CmtCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtCardMedia from '../../../../../@coremat/CmtCard/CmtCardMedia';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { timeFromNow } from '../../../../../@jumbo/utils/dateHelper';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: theme.typography.fontWeightBold,
  },
  imageRoot: {
    width: '100%',
    height: 250,
  },
  iconRoot: {
    fontSize: 18,
    marginRight: 6,
  },
  linkBtn: {
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  priceWrapper: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: 16,
      textAlign: 'left',
    },
  },
  priceRoot: {
    fontSize: 16,
    color: theme.palette.primary.main,
    marginBottom: 5,
    fontWeight: theme.typography.fontWeightRegular,
  },
  badge: {
    color: theme.palette.common.white,
    fontSize: 12,
    height: 24,
  },
  carouselRoot: {
    marginRight: 0,
    '& .bottom-left .slick-dots': {
      left: 24,
    },
    '& .slick-dots': {
      bottom: 24,
      '& li button:before': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
      '& li.slick-active button:before': {
        backgroundColor: theme.palette.warning.main,
      },
    },
  },
  greenIcon: {
    color: 'green',
  },
  orangeIcon: {
    color: 'orange',
  },
  purpleIcon: {
    color: 'purple',
    fontSize: 18,
    marginRight: 6,
  },
  purpleText: {
    color: 'purple',
  },
}));

const MaintainanceDetail = ({ selectedMaintainance, showMaintainanceList }) => {
  const classes = useStyles();
  return (
    <CmtCard>
      <Box display="flex" flexDirection="row" alignItems={{ sm: 'center' }} px={6} py={3}>
        <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
          <Tooltip title="close">
            <Box ml={-3} clone>
              <IconButton onClick={showMaintainanceList}>
                <Close />
              </IconButton>
            </Box>
          </Tooltip>
          <Typography component="div" variant="h4" className={classes.titleRoot}>
            {`${selectedMaintainance.product.name} (${selectedMaintainance.product.id}) - ${selectedMaintainance.description}`}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" ml="auto">
          <Box
            className={classes.badgeRoot}
            component="span"
            bgcolor={selectedMaintainance.status === 'COMPLETED' ? '#FF8C00' : '#8DCD03'}>
            {selectedMaintainance.status.replaceAll('_', ' ')}
          </Box>
        </Box>
      </Box>
      <Box p={6}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box fontSize={12} color="text.disabled" display="flex" flexDirection="row" alignItems="center" mb={2}>
              <Box display="flex" flexDirection="row" alignItems="center" mr={4} className={classes.purpleText}>
                <InfoRoundedIcon className={classes.purpleIcon} /> Task Info
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Task ID:
                </Box>
                {selectedMaintainance.id}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Created Date:
                </Box>
                {selectedMaintainance.createdAt}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Modified Date:
                </Box>
                {selectedMaintainance.modifiedAt}
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Reported Date:
                </Box>
                {selectedMaintainance.reportedAt}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Scheduled Date:
                </Box>
                {selectedMaintainance.scheduledDate}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Target Completion Date:
                </Box>
                {selectedMaintainance.targetCompletionDate}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box p={6}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box fontSize={12} color="text.disabled" display="flex" flexDirection="row" alignItems="center" mb={2}>
              <Box display="flex" flexDirection="row" alignItems="center" mr={4} className={classes.purpleText}>
                <InfoRoundedIcon className={classes.purpleIcon} /> Task Notes
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Completion Note:
                </Box>
                <br />
                {selectedMaintainance.completionNote}
              </Box>
            </Box>
            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Additional Note:
                </Box>
                <br />
                {selectedMaintainance.additionalNote}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box p={6}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box fontSize={12} color="text.disabled" display="flex" flexDirection="row" alignItems="center" mb={2}>
              <Box display="flex" flexDirection="row" alignItems="center" mr={4} className={classes.purpleText}>
                <InfoRoundedIcon className={classes.purpleIcon} /> Product Info
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Product ID:
                </Box>
                {selectedMaintainance.product.id}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Created Date:
                </Box>
                {selectedMaintainance.product.createdAt}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Modified Date:
                </Box>
                {selectedMaintainance.product.modifiedAt}
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Name:
                </Box>
                {selectedMaintainance.product.name}
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1} mb={2}>
                  Description:
                </Box>
                <br />
                {selectedMaintainance.product.description}
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  ERP ID:
                </Box>
                {selectedMaintainance.product.erpId}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Warrenty Period:
                </Box>
                {selectedMaintainance.product.warrentyPeriod}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Maintainnance Interval:
                </Box>
                {selectedMaintainance.product.maintainnanceInterval}
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Country Of Origin:
                </Box>
                {selectedMaintainance.product.countryOfOrigin}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Make:
                </Box>
                {selectedMaintainance.product.make}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Model:
                </Box>
                {selectedMaintainance.product.model}
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Manufacture Year:
                </Box>
                {selectedMaintainance.product.manufactureYear}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Serial Number:
                </Box>
                {selectedMaintainance.product.serialNumber}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box p={6}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box fontSize={12} color="text.disabled" display="flex" flexDirection="row" alignItems="center" mb={2}>
              <Box display="flex" flexDirection="row" alignItems="center" mr={4} className={classes.purpleText}>
                <InfoRoundedIcon className={classes.purpleIcon} /> Client Info
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Client ID:
                </Box>
                {selectedMaintainance.product.client.id}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Name:
                </Box>
                {selectedMaintainance.product.client.name}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Email:
                </Box>
                {selectedMaintainance.product.client.email}
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  Phone:
                </Box>
                {selectedMaintainance.product.client.primaryPhoneNo}
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                <Box component="span" color="text.secondary" mr={1}>
                  ERP ID:
                </Box>
                {selectedMaintainance.product.client.erpId}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </CmtCard>
  );
};

export default MaintainanceDetail;
