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
  badgeRoot: {
    color: theme.palette.common.white,
    borderRadius: 30,
    fontSize: 12,
    padding: '2px 10px',
    marginBottom: 16,
    display: 'inline-block',
  },
  titleText: {
    color: 'purple',
  },
}));

const BreakdownDetail = ({ selectedBreakdown, showBreakdownList }) => {
  const classes = useStyles();
  return (
    <CmtCard>
      <Box display="block" flexDirection="row" alignItems={{ sm: 'center' }} px={6} py={3}>
        <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
          <Tooltip title="close">
            <Box ml={-3} clone>
              <IconButton onClick={showBreakdownList}>
                <Close />
              </IconButton>
            </Box>
          </Tooltip>
          <Typography component="div" variant="h4" className={classes.titleRoot}>
            {`${selectedBreakdown.product.name} (${selectedBreakdown.product.id}) - ${selectedBreakdown.description}`}
          </Typography>
        </Box>
        <Box display="block" alignItems="center" ml="auto">
          <Box
            className={classes.badgeRoot}
            component="span"
            ml={12}
            bgcolor={selectedBreakdown.status === 'COMPLETED' ? '#FF8C00' : '#8DCD03'}>
            {selectedBreakdown.status.replaceAll('_', ' ')}
          </Box>
        </Box>
      </Box>
      <Box p={2}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box fontSize={12} color="text.disabled" display="flex" flexDirection="row" alignItems="center" mb={2}>
              <Box display="flex" flexDirection="row" alignItems="center" mr={4} className={classes.purpleText}>
                <InfoRoundedIcon className={classes.purpleIcon} /> Task Info
              </Box>
            </Box>

            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Task ID:
                </Box>
                {selectedBreakdown.id}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Type:
                </Box>
                {selectedBreakdown.breakdownType}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Risk:
                </Box>
                {selectedBreakdown.riskLevel}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Priority:
                </Box>
                {selectedBreakdown.priority}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Created Date:
                </Box>
                {selectedBreakdown.createdAt}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Modified Date:
                </Box>
                {selectedBreakdown.modifiedAt}
              </Box>
            </Box>

            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Reported Date:
                </Box>
                {selectedBreakdown.reportedAt}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Scheduled Date:
                </Box>
                {selectedBreakdown.scheduledDate}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Target Completion Date:
                </Box>
                {selectedBreakdown.targetCompletionDate}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box p={2}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box fontSize={12} color="text.disabled" display="flex" flexDirection="row" alignItems="center" mb={2}>
              <Box display="flex" flexDirection="row" alignItems="center" mr={4} className={classes.purpleText}>
                <InfoRoundedIcon className={classes.purpleIcon} /> Task Notes
              </Box>
            </Box>
            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Root Cause:
                </Box>
                <br />
                {selectedBreakdown.rootCause}
              </Box>
            </Box>
            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Solution:
                </Box>
                <br />
                {selectedBreakdown.solution}
              </Box>
            </Box>

            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Completion Note:
                </Box>
                <br />
                {selectedBreakdown.completionNote}
              </Box>
            </Box>
            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Additional Note:
                </Box>
                <br />
                {selectedBreakdown.additionalNote}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box p={2}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box fontSize={12} color="text.disabled" display="flex" flexDirection="row" alignItems="center" mb={2}>
              <Box display="flex" flexDirection="row" alignItems="center" mr={4} className={classes.purpleText}>
                <InfoRoundedIcon className={classes.purpleIcon} /> Product Info
              </Box>
            </Box>

            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Product ID:
                </Box>
                {selectedBreakdown.product.id}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Created Date:
                </Box>
                {selectedBreakdown.product.createdAt}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Modified Date:
                </Box>
                {selectedBreakdown.product.modifiedAt}
              </Box>
            </Box>

            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Name:
                </Box>
                {selectedBreakdown.product.name}
              </Box>
            </Box>

            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} mb={2} className={classes.titleText}>
                  Description:
                </Box>
                <br />
                {selectedBreakdown.product.description}
                <br />
              </Box>
            </Box>

            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  ERP ID:
                </Box>
                {selectedBreakdown.product.erpId}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Warrenty Period:
                </Box>
                {selectedBreakdown.product.warrentyPeriod}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Maintainnance Interval:
                </Box>
                {selectedBreakdown.product.maintainnanceInterval}
              </Box>
            </Box>

            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Country Of Origin:
                </Box>
                {selectedBreakdown.product.countryOfOrigin}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Make:
                </Box>
                {selectedBreakdown.product.make}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Model:
                </Box>
                {selectedBreakdown.product.model}
              </Box>
            </Box>

            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Manufacture Year:
                </Box>
                {selectedBreakdown.product.manufactureYear}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Serial Number:
                </Box>
                {selectedBreakdown.product.serialNumber}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box p={2}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box fontSize={12} color="text.disabled" display="flex" flexDirection="row" alignItems="center" mb={2}>
              <Box display="flex" flexDirection="row" alignItems="center" mr={4} className={classes.purpleText}>
                <InfoRoundedIcon className={classes.purpleIcon} /> Client Info
              </Box>
            </Box>

            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Client ID:
                </Box>
                {selectedBreakdown.product.client.id}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Name:
                </Box>
                {selectedBreakdown.product.client.name}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Email:
                </Box>
                {selectedBreakdown.product.client.email}
              </Box>
            </Box>

            <Box component="div" display="block" flexDirection="row" mb={2} fontSize={12} ml={6}>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  Phone:
                </Box>
                {selectedBreakdown.product.client.primaryPhoneNo}
              </Box>
              <Box component="div" mr={{ xs: 3, md: 4 }} mb={1}>
                <Box component="span" color="text.secondary" mr={1} className={classes.titleText}>
                  ERP ID:
                </Box>
                {selectedBreakdown.product.client.erpId}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </CmtCard>
  );
};

export default BreakdownDetail;
