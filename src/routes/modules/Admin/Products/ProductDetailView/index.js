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
import PeopleIcon from '@material-ui/icons/People';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';
import LocationCity from '@material-ui/icons/LocationCity';
import useStyles from './index.style';
import { Block, CheckCircleOutline } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

const ProductDetailView = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { detailedCurrentProduct } = useSelector(({ productsReducer }) => productsReducer);

  const {
    id,
    name,
    description,
    make,
    model,
    manufactureYear,
    countryOfOrigin,
    serialNumber,
    client,
    createdAt,
    modifiedAt,
    erpId,
    warrentyPeriod,
    maintainnanceInterval,
  } = detailedCurrentProduct;

  //const { cId, pName, email, primaryPhoneNo } = client;
  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <Box className={classes.productInfoRoot}>
        <Box mr={3} display="flex" alignItems="center">
          <Box mt={-2}>
            <Box display="flex" alignItems="center">
              <Typography className={classes.titleRoot}>{`${name} - ${erpId}`}</Typography>
            </Box>

            <Box mt={1}>
              <Typography className={classes.subTitleRoot}>{`Created At : ${createdAt}`}</Typography>
              {modifiedAt && <Typography className={classes.subTitleRoot}>{`Modified At : ${modifiedAt}`}</Typography>}
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
          Product Detail - {serialNumber}
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <AssessmentIcon />
          <Box ml={5} color="primary.main" component="p">
            {description}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <AssessmentIcon />
          <Box ml={5} color="primary.main" component="p">
            {`${make} - ${model}`}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <AssessmentIcon />
          <Box ml={5} color="primary.main" component="p">
            {`${countryOfOrigin} - ${manufactureYear}`}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <AssessmentIcon />
          <Box ml={5} color="primary.main" component="p">
            {warrentyPeriod} months of warrenty
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <SettingsIcon />
          <Box ml={5} color="primary.main" component="p">
            {maintainnanceInterval} months maintainnance interval
          </Box>
        </Box>
      </Box>
      <Box px={6} py={5}>
        <Box mb={5} component="p" color="common.dark">
          Contact Detail - {client.name}
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <EmailIcon />
          <Box ml={5} color="primary.main" component="p">
            {client.email}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 5 }}>
          <PhoneIcon />
          <Box ml={5}>
            <Box color="text.secondary">{client.primaryPhoneNo}</Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ProductDetailView;

ProductDetailView.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
