import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import Button from '@material-ui/core/Button';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import {
  warrentyNotValid,
  requiredMessage,
  manufactureYearNotValid,
  intervalNotValid,
} from '../../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { isValidNumber, isValidYear } from '../../../../../@jumbo/utils/commonHelper';
import { addNewProduct, updateProduct } from '../../../../../redux/actions/Products';
import { getAllClients } from '../../../../../redux/actions/Clients';

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
  const detailedCurrentProduct = useSelector(({ productsReducer }) => productsReducer.detailedCurrentProduct);
  const allClients = useSelector(({ clientsReducer }) => clientsReducer.allClients);

  const [name, setName] = useState('');
  const [erpId, setErpId] = useState('');
  const [warrentyPeriod, setWarrentyPeriod] = useState('');
  const [maintainnanceInterval, setMaintainnanceInterval] = useState('');
  const [clientId, setClientId] = useState('');

  const [description, setDescription] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchasedAt, setPurchasedAt] = useState(new Date().toISOString().split('T')[0]);

  const [nameError, setNameError] = useState('');
  const [erpIdError, setErpIdError] = useState('');
  const [warrentyPeriodError, setWarrentyPeriodError] = useState('');
  const [maintainnanceIntervalError, setMaintainnanceIntervalError] = useState('');
  const [clientIdError, setClientIdError] = useState('');

  const [descriptionError, setDescriptionError] = useState('');
  const [countryOfOriginError, setCountryOfOriginError] = useState('');
  const [makeError, setMakeError] = useState('');
  const [modelError, setModelError] = useState('');
  const [manufactureYearError, setManufactureYearError] = useState('');
  const [serialNumberError, setSerialNumberError] = useState('');
  const [purchasedAtError, setPurchasedAtError] = useState('');

  const isOnEdit = currentProduct && detailedCurrentProduct;

  const dispatch = useDispatch();

  useEffect(() => {
    if (allClients.length == 0) {
      dispatch(getAllClients());
    }
    if (isOnEdit) {
      setName(detailedCurrentProduct.name);
      setDescription(detailedCurrentProduct.description);
      setMake(detailedCurrentProduct.make);
      setModel(detailedCurrentProduct.model);
      setManufactureYear(detailedCurrentProduct.manufactureYear);
      setCountryOfOrigin(detailedCurrentProduct.countryOfOrigin);
    }
  }, [currentProduct, detailedCurrentProduct, dispatch]);

  const onClientChange = value => {
    setClientId(value);
  };

  const onSubmitClick = () => {
    let hasError = false;
    if (!name) {
      hasError = true;
      setNameError(requiredMessage);
    }

    if (!isOnEdit && !erpId) {
      hasError = true;
      setErpIdError(requiredMessage);
    }

    if (!make) {
      hasError = true;
      setMakeError(requiredMessage);
    }

    if (!model) {
      hasError = true;
      setModelError(requiredMessage);
    }

    if (!countryOfOrigin) {
      hasError = true;
      setCountryOfOriginError(requiredMessage);
    }

    if (!isOnEdit && !serialNumber) {
      hasError = true;
      setSerialNumberError(requiredMessage);
    }

    if (!isOnEdit && !purchasedAt) {
      hasError = true;
      setPurchasedAt(requiredMessage);
    }

    if (!manufactureYear && !isValidYear(manufactureYear)) {
      hasError = true;
      setManufactureYearError(manufactureYearNotValid);
    }

    if (!isOnEdit && !warrentyPeriod && !isValidNumber(warrentyPeriod)) {
      hasError = true;
      setWarrentyPeriodError(warrentyNotValid);
    }

    if (!isOnEdit && !maintainnanceInterval && !isValidNumber(maintainnanceInterval)) {
      hasError = true;
      setMaintainnanceIntervalError(intervalNotValid);
    }

    if (!isOnEdit && !clientId) {
      hasError = true;
      setClientIdError(requiredMessage);
    }

    if (!hasError) {
      onProductSave();
    }
  };

  const onProductSave = () => {
    const productDetail = isOnEdit
      ? {
          name,
          description,
          manufactureYear,
          make,
          model,
          countryOfOrigin,
        }
      : {
          name,
          erpId,
          warrentyPeriod,
          maintainnanceInterval,
          clientId,
          description,
          manufactureYear,
          make,
          model,
          countryOfOrigin,
          serialNumber,
          purchasedAt,
        };

    if (isOnEdit) {
      dispatch(
        updateProduct(detailedCurrentProduct.id, productDetail, data => {
          callbck(data);
          onCloseDialog();
        }),
      );
    } else {
      dispatch(
        addNewProduct(productDetail, data => {
          callbck(data);
          onCloseDialog();
        }),
      );
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentProduct ? 'Edit Product Details' : 'Create New Product'}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={12}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Title"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  setNameError('');
                }}
                helperText={nameError}
              />
            </Grid>
            {!isOnEdit && (
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="ERP ID"
                  value={erpId}
                  onChange={e => {
                    setErpId(e.target.value);
                    setErpIdError('');
                  }}
                  helperText={erpIdError}
                />
              </Grid>
            )}
            {!isOnEdit && (
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Serial Number"
                  value={serialNumber}
                  onChange={e => {
                    setSerialNumber(e.target.value);
                    setSerialNumberError('');
                  }}
                  helperText={serialNumberError}
                />
              </Grid>
            )}
            {!isOnEdit && (
              <Grid item xs={12} sm={12}>
                <AppTextInput
                  type="date"
                  variant="outlined"
                  label="Purchased At"
                  value={purchasedAt}
                  onChange={e => {
                    setPurchasedAt(e.target.value);
                    setPurchasedAtError('');
                  }}
                  helperText={purchasedAtError}
                />
              </Grid>
            )}
          </GridContainer>
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            multiline
            maxRows={4}
            rows={4}
            variant="outlined"
            label="Description"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
              setDescriptionError('');
            }}
            helperText={descriptionError}
          />
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            {!isOnEdit && (
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
            )}
            {!isOnEdit && (
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
            )}
          </GridContainer>
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Country of Origin"
                value={countryOfOrigin}
                onChange={e => {
                  setCountryOfOrigin(e.target.value);
                  setCountryOfOriginError('');
                }}
                helperText={countryOfOriginError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                type="number"
                fullWidth
                variant="outlined"
                label="Manufacture Year"
                value={manufactureYear}
                onChange={e => {
                  setManufactureYear(e.target.value);
                  setManufactureYearError('');
                }}
                helperText={manufactureYearError}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Make"
                value={make}
                onChange={e => {
                  setMake(e.target.value);
                  setMakeError('');
                }}
                helperText={makeError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Model"
                value={model}
                onChange={e => {
                  setModel(e.target.value);
                  setModelError('');
                }}
                helperText={modelError}
              />
            </Grid>
          </GridContainer>
        </Box>
        {!isOnEdit && (
          <Box mb={{ xs: 6, md: 5 }}>
            <AppSelectBox
              fullWidth
              data={allClients}
              label="Client"
              valueKey="id"
              variant="outlined"
              labelKey="key"
              value={clientId}
              onChange={e => {
                onClientChange(e.target.value);
                setClientIdError('');
              }}
              helperText={clientIdError}
            />
          </Box>
        )}
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              {isOnEdit ? `Update` : `Save`}
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
  callbck: PropTypes.func,
};
