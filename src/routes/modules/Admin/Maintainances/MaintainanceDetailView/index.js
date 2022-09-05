import React from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import CmtAvatar from '../../../../../@coremat/CmtAvatar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { useSelector } from 'react-redux';
import CmtList from '../../../../../@coremat/CmtList';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationCity from '@material-ui/icons/LocationCity';
import useStyles from './index.style';
import { Block, CheckCircleOutline } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

const MaintainanceDetailView = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { detailedCurrentMaintainance } = useSelector(({ maintainancesReducer }) => maintainancesReducer);

  const {
    id,
    description,
    product,
    additionalNote,
    completionNote,
    targetCompletionDate,
    maintainanceType,
    reportedAt,
    scheduledDate,
    status,
  } = detailedCurrentMaintainance;

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <Box className={classes.maintainanceInfoRoot}>
        <Box mr={3} display="flex" alignItems="center">
          <Box mt={-2}>
            <Box display="flex" alignItems="center">
              <Typography className={classes.titleRoot}>{description}</Typography>
            </Box>

            <Box mt={1}>
              <Typography className={classes.subTitleRoot}>{`Reported At : ${reportedAt}`}</Typography>
              {scheduledDate && (
                <Typography className={classes.subTitleRoot}>{`Scheduled At : ${scheduledDate}`}</Typography>
              )}
              {targetCompletionDate && (
                <Typography
                  className={classes.subTitleRoot}>{`Target Completion Date : ${targetCompletionDate}`}</Typography>
              )}
              <Typography className={classes.subTitleRoot}>{`Type : ${maintainanceType}`}</Typography>
              <Typography className={classes.subTitleRoot}>{`Status : ${status}`}</Typography>
            </Box>
          </Box>
        </Box>
        <Box ml="auto" mt={-2} display="flex" alignItems="center">
          <Box ml={1}>
            <IconButton onClick={onCloseDialog}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box px={6} py={5}>
        <Box mb={5} component="p" color="common.dark">
          Notes
        </Box>
        <Box mt={1}>
          <Typography className={classes.subTitleRoot}>{`Completion Note : ${completionNote}`}</Typography>
          <Typography className={classes.subTitleRoot}>{`Additional Note : ${additionalNote}`}</Typography>
        </Box>
      </Box>
      <Box px={6} py={5}>
        <Box mb={5} component="p" color="common.dark">
          Product Detail
        </Box>
        <Box mt={1}>
          <Typography className={classes.subTitleRoot}>{`Name : ${product.name}`}</Typography>
          <Typography className={classes.subTitleRoot}>{`ERP ID : ${product.erpId}`}</Typography>
          <Typography className={classes.subTitleRoot}>{`Warrenty Period : ${product.warrentyPeriod}`}</Typography>
          <Typography
            className={classes.subTitleRoot}>{`Maintainnance Interval : ${product.maintainnanceInterval}`}</Typography>
        </Box>
      </Box>
      <Box px={6} py={5}>
        <Box mb={5} component="p" color="common.dark">
          Client Detail
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <EmailIcon />
          <Box ml={5} color="primary.main" component="p">
            {product.client.name}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <EmailIcon />
          <Box ml={5} color="primary.main" component="p">
            {product.client.email}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 5 }}>
          <PhoneIcon />
          <Box ml={5}>
            <Box color="text.secondary">{product.client.primaryPhoneNo}</Box>
          </Box>
        </Box>
        {/*<Box display="flex" alignItems="center" mb={{ xs: 4, sm: 5 }}>
          <LocationCity />
          <Box ml={5}>
            <Box color="text.secondary">{`${addressLine1},`}</Box>
            <Box color="text.secondary">{`${addressLine2},`}</Box>
            <Box color="text.secondary">{`${city}, ${district}`}</Box>
          </Box>
  </Box>*/}
      </Box>
    </Dialog>
  );
};

export default MaintainanceDetailView;

MaintainanceDetailView.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
