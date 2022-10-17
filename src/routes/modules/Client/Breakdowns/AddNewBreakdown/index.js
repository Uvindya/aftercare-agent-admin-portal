import React, { useEffect, useState } from 'react';
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
import { addNewBreakdown, updateBreakdown } from '../../../../../redux/actions/Breakdowns';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import Button from '@material-ui/core/Button';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { emailNotValid, requiredMessage, phoneNoNotValid } from '../../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: theme.typography.fontWeightBold,
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

const AddNewBreakdown = ({ showBreakdownList, callbck }) => {
  const classes = useStyles();
  const myProducts = useSelector(({ productsReducer }) => productsReducer.myProducts);

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

  const onSubmitClick = () => {
    if (!productId) {
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

    dispatch(
      addNewBreakdown(breakdownDetail, data => {
        callbck(data);
        showBreakdownList();
        //onCloseDialog();
      }),
    );
  };

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
            Report New Breakdown
          </Typography>
        </Box>
      </Box>

      <Box p={2}>
        <Box display="block" justifyContent="space-between">
          <Box mb={{ xs: 6, md: 5 }}>
            <AppSelectBox
              fullWidth
              data={myProducts}
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
          <Box mb={{ xs: 6, md: 5 }}>
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
          </Box>
          <Box mb={{ xs: 6, md: 5 }}>
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
          <Box mb={{ xs: 6, md: 5 }}>
            <Box ml={2}>
              <Button variant="contained" color="primary" onClick={onSubmitClick}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </CmtCard>
  );
};

export default AddNewBreakdown;
