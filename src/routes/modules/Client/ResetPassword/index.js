import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import Button from '@material-ui/core/Button';
import { requiredMessage } from '../../../../@jumbo/constants/ErrorMessages';
import { changePassword } from '../../../../redux/actions/Clients';
import { useDispatch, useSelector } from 'react-redux';
import { AuhMethods } from '../../../../services/auth';
import { CurrentAuthMethod } from '../../../../@jumbo/constants/AppConstants';

// this is change password component
const ResetPassWord = () => {
  const [oldPassWord, setoldPassWord] = useState('');
  const [newPassWord, setNewPassWord] = useState('');
  const [repeatNewPassWord, setRepeatNewPassWord] = useState('');

  const [oldPassWordError, setOldPassWordError] = useState('');
  const [newPassWordrror, setNewPassWordError] = useState('');
  const [repeatNewPassWordError, setRepeatNewPassWordError] = useState('');

  const dispatch = useDispatch();

  const onSubmitPassword = () => {
    let hasError = false;
    if (!oldPassWord) {
      hasError = true;
      setOldPassWordError(requiredMessage);
    }
    if (!newPassWord) {
      hasError = true;
      setNewPassWordError(requiredMessage);
    }

    if (!repeatNewPassWord) {
      hasError = true;
      setRepeatNewPassWordError(requiredMessage);
    }

    if (repeatNewPassWord != newPassWord) {
      hasError = true;
      setRepeatNewPassWordError('New Password and repeat passwords are not matching');
    }

    if (!hasError) {
      onResetPassword();
    }
  };

  const onResetPassword = () => {
    const data = { oldPassWord, newPassWord };
    //initiate a callback only when we need to do sussessfull result after an action,need to add callback parameter for the action
    //in normal casses ->  dispatch(changePassword(data));
    dispatch(
      changePassword(data, () => {
        dispatch(AuhMethods[CurrentAuthMethod].onLogout());
      }),
    );
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
        <GridContainer>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="password"
              fullWidth
              variant="outlined"
              label="Old Password"
              value={oldPassWord}
              onChange={e => {
                setoldPassWord(e.target.value);
                setOldPassWordError('');
              }}
              helperText={oldPassWordError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="password"
              fullWidth
              variant="outlined"
              label="New PassWord"
              value={newPassWord}
              onChange={e => {
                setNewPassWord(e.target.value);
                setNewPassWordError('');
              }}
              helperText={newPassWordrror}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="password"
              fullWidth
              variant="outlined"
              label="Repeat NewPassWord Password"
              value={repeatNewPassWord}
              onChange={e => {
                setRepeatNewPassWord(e.target.value);
                setRepeatNewPassWordError('');
              }}
              helperText={repeatNewPassWordError}
            />
          </Grid>
        </GridContainer>
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button onClick={onSubmitPassword}>Add</Button>
      </Box>
    </div>
  );
};

export default ResetPassWord;
