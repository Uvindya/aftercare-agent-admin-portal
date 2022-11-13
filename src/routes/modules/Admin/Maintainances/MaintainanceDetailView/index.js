import React from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import useStyles from './index.style';

const MaintainanceDetailView = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { detailedCurrentMaintainance } = useSelector(({ maintainancesReducer }) => maintainancesReducer);

  const {
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
      </Box>
    </Dialog>
  );
};

export default MaintainanceDetailView;

MaintainanceDetailView.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
