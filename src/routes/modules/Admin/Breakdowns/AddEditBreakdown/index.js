import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import Button from '@material-ui/core/Button';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { emailNotValid, requiredMessage, phoneNoNotValid } from '../../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { isValidEmail, isValidPhoneNo } from '../../../../../@jumbo/utils/commonHelper';
import { addNewBreakdown, updateBreakdown } from '../../../../../redux/actions/Breakdowns';
import { getAllProducts } from '../../../../../redux/actions/Products';
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
  dialogContent: {
    width: '450px',
  },
}));

const breakdownTypes = [
  { title: 'Factory Fault', slug: 'FACTORY_FAULT' },
  { title: 'Engine Fault', slug: 'ENGINE_FAULT' },
];

const risks = [
  { title: 'Low', slug: 'LOW' },
  { title: 'Medium', slug: 'MEDIUM' },
  { title: 'High', slug: 'HIGH' },
];

const priorities = [
  { title: 'Low', slug: 'LOW' },
  { title: 'Medium', slug: 'MEDIUM' },
  { title: 'High', slug: 'HIGH' },
];

const AddEditBreakdown = ({ open, onCloseDialog, callbck }) => {
  const classes = useStyles();
  const currentBreakdown = useSelector(({ breakdownsReducer }) => breakdownsReducer.currentBreakdown);
  const allProducts = useSelector(({ productsReducer }) => productsReducer.allProducts);
  const allClients = useSelector(({ clientsReducer }) => clientsReducer.allClients);

  const [clientProducts, setClientProducts] = useState([]);
  const [clientId, setClientId] = useState('');
  const [productId, setProductId] = useState('');
  const [risk, setRisk] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [breakdownType, setBreakdownType] = useState('');

  const [clientIdError, setClientIdError] = useState('');
  const [productIdError, setProductIdError] = useState('');
  const [riskError, setRiskError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priorityError, setPriorityError] = useState('');
  const [breakdownTypeError, setBreakdownTypeError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (allProducts.length == 0) {
      dispatch(getAllProducts());
    }

    if (allClients.length == 0) {
      dispatch(getAllClients());
    }

    if (currentBreakdown) {
      // add later
    }
  }, [currentBreakdown, dispatch]);

  const onSubmitClick = () => {
    if (!clientId) {
      setClientIdError(requiredMessage);
    } else if (!productId) {
      setProductIdError(requiredMessage);
    } else if (!breakdownType) {
      setBreakdownTypeError(requiredMessage);
    } else if (!risk) {
      setRiskError(requiredMessage);
    } else if (!priority) {
      setPriorityError(requiredMessage);
    } else if (!description) {
      setDescriptionError(requiredMessage);
    } else {
      onBreakdownSave();
    }
  };

  const onClientChange = value => {
    setClientId(value);
    var clientProducts = allProducts
      .filter(p => p.clientId === value)
      .map(p => {
        return { id: p.id, key: `${p.name} - ${p.serialNumber}` };
      });
    //console.log(clientProducts)
    setClientProducts(clientProducts);
  };

  const onProductChange = value => {
    setProductId(value);
  };

  const onBreakdownTypeChange = value => {
    setBreakdownType(value);
  };

  const onRiskChange = value => {
    setRisk(value);
  };

  const onDescriptionChange = value => {
    setDescription(value);
  };

  const onPriorityChange = value => {
    setPriority(value);
  };

  const onBreakdownSave = () => {
    const breakdownDetail = {
      productId,
      description,
      breakdownType,
      riskLevel: risk,
      priorityLevel: priority,
    };

    if (currentBreakdown) {
      dispatch(
        updateBreakdown({ ...currentBreakdown, ...breakdownDetail }, () => {
          onCloseDialog();
        }),
      );
    } else {
      dispatch(
        addNewBreakdown(breakdownDetail, data => {
          callbck(data);
          onCloseDialog();
        }),
      );
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentBreakdown ? 'Edit Breakdown Details' : 'Create New Breakdown'}
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
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
        <Box mb={{ xs: 6, md: 5 }}>
          <AppSelectBox
            fullWidth
            data={clientProducts}
            label="Product"
            valueKey="id"
            variant="outlined"
            labelKey="key"
            value={productId}
            onChange={e => {
              onProductChange(e.target.value);
              setProductIdError('');
            }}
            helperText={productIdError}
          />
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppSelectBox
            fullWidth
            data={breakdownTypes}
            label="Breakdown Type"
            valueKey="slug"
            variant="outlined"
            labelKey="title"
            value={breakdownType}
            onChange={e => {
              onBreakdownTypeChange(e.target.value);
              setBreakdownTypeError('');
            }}
            helperText={breakdownTypeError}
          />
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                data={risks}
                label="Risk"
                valueKey="slug"
                variant="outlined"
                labelKey="title"
                value={risk}
                onChange={e => {
                  onRiskChange(e.target.value);
                  setRiskError('');
                }}
                helperText={riskError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                data={priorities}
                label="Priority"
                valueKey="slug"
                variant="outlined"
                labelKey="title"
                value={priority}
                onChange={e => {
                  onPriorityChange(e.target.value);
                  setPriorityError('');
                }}
                helperText={priorityError}
              />
            </Grid>
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
              onDescriptionChange(e.target.value);
              setDescriptionError('');
            }}
            helperText={descriptionError}
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

export default AddEditBreakdown;

AddEditBreakdown.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
  callbck: PropTypes.func,
};
