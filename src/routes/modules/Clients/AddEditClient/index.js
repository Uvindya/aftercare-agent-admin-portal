import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import CmtList from '../../../../@coremat/CmtList';
import IconButton from '@material-ui/core/IconButton';
import AppSelectBox from '../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { emailNotValid, requiredMessage } from '../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { isValidEmail } from '../../../../@jumbo/utils/commonHelper';
import { addNewClient, updateClient } from '../../../../redux/actions/Clients';

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

function PhoneNumberInput({ onChange, value, ...other }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (!phoneNumber && value) {
      setTimeout(() => {
        setPhoneNumber(value);
      }, 300);
    }
  }, [phoneNumber, value]);

  const onNumberChange = number => {
    setPhoneNumber(number.formattedValue);
    onChange(number.formattedValue);
  };

  return <NumberFormat {...other} onValueChange={onNumberChange} value={phoneNumber} format="(###) ###-####" />;
}

const labels = [
  { title: 'Home', slug: 'home' },
  { title: 'Office', slug: 'office' },
  { title: 'Other', slug: 'other' },
];

const splitName = client => {
  if (client) {
    const [fName, mName, lName] = client.name.split(' ');
    return [fName, lName ? mName + ' ' + lName : mName];
  }

  return ['', ''];
};

const AddEditClient = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const currentClient = useSelector(({ clientsReducer }) => clientsReducer.currentClient);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profile_pic, setProfile_pic] = useState('');
  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [phones, setPhones] = useState([{ phone: '', label: 'home' }]);

  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentClient) {
      const [fName, lName] = splitName(currentClient);
      setFirstName(fName);
      setLastName(lName);
      setProfile_pic(currentClient.profile_pic);
      setEmail(currentClient.email);
      setCompany(currentClient.company);
      setDesignation(currentClient.designation);
      setPhones(currentClient.phones);
    }
  }, [currentClient]);

  const onPhoneNoAdd = (number, index) => {
    const updatedList = [...phones];
    updatedList[index].phone = number;
    setPhones(updatedList);
    setPhoneError('');
  };

  const onPhoneRowRemove = index => {
    const updatedList = [...phones];
    updatedList.splice(index, 1);
    setPhones(updatedList);
  };

  const onPhoneRowAdd = () => {
    setPhones(phones.concat({ phone: '', label: 'home' }));
  };

  const onLabelChange = (value, index) => {
    const updatedList = [...phones];
    updatedList[index].label = value;
    setPhones(updatedList);
  };

  const onSubmitClick = () => {
    const phoneNumbers = phones.filter(item => item.phone.trim());
    if (!firstName) {
      setFirstNameError(requiredMessage);
    } else if (!email) {
      setEmailError(requiredMessage);
    } else if (!isValidEmail(email)) {
      setEmailError(emailNotValid);
    } else if (phoneNumbers.length === 0) {
      setPhoneError(requiredMessage);
    } else {
      onClientSave(phoneNumbers);
    }
  };

  const onClientSave = phoneNumbers => {
    const clientDetail = {
      profile_pic,
      name: `${firstName} ${lastName}`,
      email,
      phones: phoneNumbers,
      company,
      designation,
    };

    if (currentClient) {
      dispatch(
        updateClient({ ...currentClient, ...clientDetail }, () => {
          onCloseDialog();
        }),
      );
    } else {
      dispatch(
        addNewClient(clientDetail, () => {
          onCloseDialog();
        }),
      );
    }
  };

  const isPhonesMultiple = phones.length > 1;

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>{currentClient ? 'Edit Client Details' : 'Create New Client'}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={profile_pic} />
          </Box>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="First name"
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                  setFirstNameError('');
                }}
                helperText={firstNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label="Email Address"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            helperText={emailError}
          />
        </Box>
        <CmtList
          data={phones}
          renderRow={(item, index) => (
            <GridContainer style={{ marginBottom: 2 }} key={index}>
              <Grid item xs={12} sm={isPhonesMultiple ? 6 : 8}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Phone"
                  onChange={number => onPhoneNoAdd(number, index)}
                  helperText={phoneError}
                  InputProps={{
                    inputComponent: PhoneNumberInput,
                    inputProps: { value: item.phone },
                  }}
                />
              </Grid>
              <Grid item xs={isPhonesMultiple ? 10 : 12} sm={4}>
                <AppSelectBox
                  fullWidth
                  data={labels}
                  label="Label"
                  valueKey="slug"
                  variant="outlined"
                  labelKey="title"
                  value={item.label}
                  onChange={e => onLabelChange(e.target.value, index)}
                />
              </Grid>
              {index > 0 && (
                <Grid container item xs={2} sm={2} justifyContent="center" alignItems="center">
                  <IconButton color="inherit" onClick={() => onPhoneRowRemove(index)} size="small">
                    <CancelIcon />
                  </IconButton>
                </Grid>
              )}
            </GridContainer>
          )}
        />
        <Box mb={{ xs: 6, md: 5 }} display="inline-flex" alignItems="center" className="pointer">
          <Button color="primary" onClick={onPhoneRowAdd} startIcon={<AddCircleOutlineIcon />}>
            Add More
          </Button>
        </Box>
        <GridContainer style={{ marginBottom: 12 }}>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Company name"
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Job title"
              value={designation}
              onChange={e => setDesignation(e.target.value)}
            />
          </Grid>
        </GridContainer>
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

export default AddEditClient;

AddEditClient.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
