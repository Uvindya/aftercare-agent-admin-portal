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
import { addNewMaintainance, updateMaintainance } from '../../../../../redux/actions/Maintainances';

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

const genders = [
  { title: 'Male', slug: 'MALE' },
  { title: 'Female', slug: 'FEMALE' },
];

const AddEditMaintainance = ({ open, onCloseDialog, callbck }) => {
  const classes = useStyles();
  const currentMaintainance = useSelector(({ maintainancesReducer }) => maintainancesReducer.currentMaintainance);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [primaryPhoneNo, setPrimaryPhoneNo] = useState('');
  const [secondaryPhoneNo, setSecondaryPhoneNo] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [primaryPhoneNoError, setPrimaryPhoneNoError] = useState('');
  const [secondaryPhoneNoError, setSecondaryPhoneNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressLine1Error, setAddressLine1Error] = useState('');
  const [addressLine2Error, setAddressLine2Error] = useState('');
  const [districtError, setDistrictError] = useState('');
  const [cityError, setCityError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentMaintainance) {
      setFirstName(currentMaintainance.firstName);
      setLastName(currentMaintainance.lastName);
      setEmail(currentMaintainance.email);
      setPrimaryPhoneNo(currentMaintainance.primaryPhoneNo);
      setSecondaryPhoneNo(currentMaintainance.secondaryPhoneNo);
      setGender(currentMaintainance.gender);
      setAddressLine1(currentMaintainance.addressLine1);
      setAddressLine2(currentMaintainance.addressLine2);
      setDistrict(currentMaintainance.district);
      setCity(currentMaintainance.city);
      // hide password
    }
  }, [currentMaintainance]);

  const onGenderChange = value => {
    setGender(value);
  };

  const onSubmitClick = () => {
    if (!firstName) {
      setFirstNameError(requiredMessage);
    } else if (!lastName) {
      setLastNameError(requiredMessage);
    } else if (!email) {
      setEmailError(requiredMessage);
    } else if (!isValidEmail(email)) {
      setEmailError(emailNotValid);
    } else if (!primaryPhoneNo) {
      setPrimaryPhoneNoError(requiredMessage);
    } else if (!isValidPhoneNo(primaryPhoneNo)) {
      setPrimaryPhoneNoError(phoneNoNotValid);
    } else if (secondaryPhoneNo != '' && !isValidPhoneNo(secondaryPhoneNo)) {
      setSecondaryPhoneNoError(phoneNoNotValid);
    } else if (!password) {
      setPasswordError(requiredMessage);
    } else if (!gender) {
      setGenderError(requiredMessage);
    } else if (!addressLine1) {
      setAddressLine1Error(requiredMessage);
    } else if (!city) {
      setCityError(requiredMessage);
    } else if (!district) {
      setDistrictError(requiredMessage);
    } else {
      onMaintainanceSave();
    }
  };

  const onMaintainanceSave = () => {
    const maintainanceDetail = {
      firstName,
      lastName,
      email,
      primaryPhoneNo,
      secondaryPhoneNo,
      gender,
      password,
      addressLine1,
      addressLine2,
      city,
      district,
    };

    if (currentMaintainance) {
      dispatch(
        updateMaintainance({ ...currentMaintainance, ...maintainanceDetail }, () => {
          onCloseDialog();
        }),
      );
    } else {
      dispatch(
        addNewMaintainance(maintainanceDetail, data => {
          callbck(data);
          onCloseDialog();
        }),
      );
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentMaintainance ? 'Edit Maintainance Details' : 'Create New Maintainance'}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
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
                onChange={e => {
                  setLastName(e.target.value);
                  setLastNameError('');
                }}
                helperText={lastNameError}
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
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Primary Phone No"
                value={primaryPhoneNo}
                onChange={e => {
                  setPrimaryPhoneNo(e.target.value);
                  setPrimaryPhoneNoError('');
                }}
                helperText={primaryPhoneNoError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Secondary Phone No"
                value={secondaryPhoneNo}
                onChange={e => {
                  setSecondaryPhoneNo(e.target.value);
                  setSecondaryPhoneNoError('');
                }}
                helperText={secondaryPhoneNoError}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                type="password"
                fullWidth
                variant="outlined"
                label="Password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                data={genders}
                label="Gender"
                valueKey="slug"
                variant="outlined"
                labelKey="title"
                value={gender}
                onChange={e => {
                  onGenderChange(e.target.value);
                  setGenderError('');
                }}
                helperText={genderError}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label="Address Line 1"
            value={addressLine1}
            onChange={e => {
              setAddressLine1(e.target.value);
              setAddressLine1Error('');
            }}
            helperText={addressLine1Error}
          />
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label="Address Line 2"
            value={addressLine2}
            onChange={e => {
              setAddressLine2(e.target.value);
            }}
          />
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="City"
                value={city}
                onChange={e => {
                  setCity(e.target.value);
                  setCityError('');
                }}
                helperText={cityError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="District"
                value={district}
                onChange={e => {
                  setDistrict(e.target.value);
                  setDistrictError('');
                }}
                helperText={districtError}
              />
            </Grid>
          </GridContainer>
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

export default AddEditMaintainance;

AddEditMaintainance.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
  callbck: PropTypes.func,
};
