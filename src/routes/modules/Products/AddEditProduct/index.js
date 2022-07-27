import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import Button from '@material-ui/core/Button';
import AppSelectBox from '../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { warrentyNotValid, requiredMessage, phoneNoNotValid, intervalNotValid } from '../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { isValidNumber, isValidPhoneNo } from '../../../../@jumbo/utils/commonHelper';
import { addNewProduct, updateProduct } from '../../../../redux/actions/Products';
import { getAllClients } from '../../../../redux/actions/Clients';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 16,
      color: theme.palette.common.dark,
    },
  },
}));

const AddEditProduct = ({ open, onCloseDialog, callbck }) => {
  const classes = useStyles();
  const currentProduct = useSelector(({ productsReducer }) => productsReducer.currentProduct);
  const allClients = useSelector(({ clientsReducer }) => clientsReducer.allClients);

  const [name, setName] = useState('');
  const [erpId, setErpId] = useState('');
  const [warrentyPeriod, setWarrentyPeriod] = useState('');
  const [maintainnanceInterval, setMaintainnanceInterval] = useState('');
  const [clientId, setClientId] = useState('');

  const [nameError, setNameError] = useState('');
  const [erpIdError, setErpIdError] = useState('');
  const [warrentyPeriodError, setWarrentyPeriodError] = useState('');
  const [maintainnanceIntervalError, setMaintainnanceIntervalError] = useState('');
  const [clientIdError, setClientIdError] = useState('');


  const dispatch = useDispatch();

  useEffect(() => {
    if(allClients.length == 0){
    dispatch(
      getAllClients(),
    );
    }
    if (currentProduct) {
      setName(currentProduct.name);
      setErpId(currentProduct.erpId);
      setWarrentyPeriod(currentProduct.warrentyPeriod);
      setMaintainnanceInterval(currentProduct.maintainnanceInterval);
      setClientId(currentProduct.clientId);
      // hide password
    }
  }, [currentProduct, dispatch]);

  const onClientChange = (value) => {
    setClientId(value);
  };

  const onSubmitClick = () => {
    if (!name) {
      setNameError(requiredMessage);
    } else if (!erpId) {
      setErpIdError(requiredMessage);
    } else if (!warrentyPeriod && isValidNumber(warrentyPeriod)) {
      setWarrentyPeriodError(warrentyNotValid);
    } else if (!maintainnanceInterval && isValidNumber(maintainnanceInterval)) {
      setMaintainnanceIntervalError(intervalNotValid);
    } else if (!clientId) {
      setClientIdError(requiredMessage);
    } else {
      onProductSave();
    }
  };

  const onProductSave = () => {
    const productDetail = {
      name,
      erpId,
      warrentyPeriod,
      maintainnanceInterval,
      clientId,
    };

    if (currentProduct) {
      dispatch(
        updateProduct({ ...currentProduct, ...productDetail }, () => {
          onCloseDialog();
        }),
      );
    } else {
      dispatch(
        addNewProduct(productDetail, (data) => {
          callbck(data);
          onCloseDialog();
        }),
      );
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>{currentProduct ? 'Edit Product Details' : 'Create New Product'}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Name"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  setNameError('');
                }}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="ERP ID"
                value={erpId}
                onChange={e => {
                  setErpId(e.target.value);
                  setErpIdError('')
                }
                }
                helperText={erpIdError}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={12}>
              <AppTextInput
                fullWidth
                type="number"
                variant="outlined"
                label="Warrenty Period (Months)"
                value={warrentyPeriod}
                onChange={e => {
                  setWarrentyPeriod(e.target.value);
                  setWarrentyPeriodError('');
                }}
                helperText={warrentyPeriodError}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <AppTextInput
                type="number"
                fullWidth
                variant="outlined"
                label="Maintainnance Interval (Months)"
                value={maintainnanceInterval}
                onChange={e => {
                  setMaintainnanceInterval(e.target.value);
                  setMaintainnanceIntervalError('');
                }}
                helperText={maintainnanceIntervalError}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppSelectBox
            fullWidth
            data={allClients}
            label="Client"
            valueKey="id"
            variant="outlined"
            labelKey="name"
            value={clientId}
            onChange={e => {
              onClientChange(e.target.value);
              setClientIdError('');
            }}
            helperText={clientIdError}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProduct;

AddEditProduct.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
  callbck: PropTypes.func
};
