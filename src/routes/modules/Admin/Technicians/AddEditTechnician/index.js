import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import Button from '@material-ui/core/Button';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import {
  emailNotValid,
  requiredMessage,
  phoneNoNotValid,
  yearOfExpNotValid,
} from '../../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { isValidEmail, isValidPhoneNo, isValidNumber } from '../../../../../@jumbo/utils/commonHelper';
import { addNewTechnician, updateTechnician } from '../../../../../redux/actions/Technicians';

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

const AddEditTechnician = ({ open, onCloseDialog, callbck }) => {
  const classes = useStyles();
  const currentTechnician = useSelector(({ technicianReducer }) => technicianReducer.currentTechnician);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [primaryPhoneNo, setPrimaryPhoneNo] = useState('');
  const [erpId, setErpId] = useState('');
  const [yearOfExperience, setYearOfExperience] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [primaryPhoneNoError, setPrimaryPhoneNoError] = useState('');
  const [yearOfExperienceError, setYearOfExperienceError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [erpIdError, setErpIdError] = useState('');
  const [genderError, setGenderError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTechnician) {
      setFirstName(currentTechnician.firstName);
      setLastName(currentTechnician.lastName);
      setEmail(currentTechnician.email);
      setPrimaryPhoneNo(currentTechnician.primaryPhoneNo);
      setYearOfExperience(currentTechnician.yearOfExperience);
      setGender(currentTechnician.gender);
      setErpId(currentTechnician.erpId);
      // hide password
    }
  }, [currentTechnician]);

  const onGenderChange = value => {
    setGender(value);
  };

  const onSubmitClick = () => {
    let hasError = false;
    if (!firstName) {
      hasError = true;
      setFirstNameError(requiredMessage);
    }

    if (!lastName) {
      hasError = true;
      setLastNameError(requiredMessage);
    }

    if (!erpId) {
      hasError = true;
      setErpIdError(requiredMessage);
    }

    if (!email) {
      hasError = true;
      setEmailError(requiredMessage);
    } else if (!isValidEmail(email)) {
      hasError = true;
      setEmailError(emailNotValid);
    }

    if (!primaryPhoneNo) {
      hasError = true;
      setPrimaryPhoneNoError(requiredMessage);
    } else if (!isValidPhoneNo(primaryPhoneNo)) {
      hasError = true;
      setPrimaryPhoneNoError(phoneNoNotValid);
    }

    if (!yearOfExperience && isValidNumber(yearOfExperience)) {
      hasError = true;
      setYearOfExperienceError(yearOfExpNotValid);
    }

    if (!password) {
      hasError = true;
      setPasswordError(requiredMessage);
    }

    if (!gender) {
      hasError = true;
      setGenderError(requiredMessage);
    }

    if (!hasError) {
      onTechnicianSave();
    }
  };

  const onTechnicianSave = () => {
    const technicianDetail = {
      firstName,
      lastName,
      email,
      primaryPhoneNo,
      gender,
      password,
      yearOfExperience,
      erpId,
    };

    if (currentTechnician) {
      dispatch(
        updateTechnician({ ...currentTechnician, ...technicianDetail }, () => {
          onCloseDialog();
        }),
      );
    } else {
      dispatch(
        addNewTechnician(technicianDetail, data => {
          callbck(data);
          onCloseDialog();
        }),
      );
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentTechnician ? 'Edit Technician Details' : 'Create New Technician'}
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
                type="number"
                fullWidth
                variant="outlined"
                label="Year of Experience"
                value={yearOfExperience}
                onChange={e => {
                  setYearOfExperience(e.target.value);
                  setYearOfExperienceError('');
                }}
                helperText={yearOfExperienceError}
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
                label="ERP ID"
                value={erpId}
                onChange={e => {
                  setErpId(e.target.value);
                  setErpIdError('');
                }}
                helperText={erpIdError}
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

export default AddEditTechnician;

AddEditTechnician.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
  callbck: PropTypes.func,
};
