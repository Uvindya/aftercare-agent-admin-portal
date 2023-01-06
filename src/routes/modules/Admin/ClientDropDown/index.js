import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClients, getDetailedCurrentClient } from '../../../../redux/actions/Clients';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppSelectBox from '../../../../@jumbo/components/Common/formElements/AppSelectBox';

const ClientDropDown = () => {
  const [clientId, setClientId] = useState(0);
  const [clientIdError, setClientIdError] = useState('');

  // identify list and detail variable on state and its actions
  const { allClients, detailedCurrentClient } = useSelector(({ clientsReducer }) => clientsReducer);

  const dispatch = useDispatch();

  // to display
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (allClients.length == 0) {
      dispatch(getAllClients());
    }

    if (detailedCurrentClient) {
      setId(detailedCurrentClient.id);
      setFirstName(detailedCurrentClient.firstName);
      setLastName(detailedCurrentClient.lastName);
    }
  }, [allClients, detailedCurrentClient, dispatch]);

  const onSubmitClick = () => {
    let hasError = false;
    if (!clientId) {
      hasError = true;
      setClientIdError('Please select a client');
    }

    if (!hasError) {
      viewClient();
    }
  };

  const viewClient = () => {
    dispatch(getDetailedCurrentClient(clientId));
  };

  return (
    <div>
      <h1>Client Information Viewer</h1>
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
            setClientId(e.target.value);
            setClientIdError('');
          }}
          helperText={clientIdError}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Box ml={2}>
          <Button variant="contained" color="primary" onClick={onSubmitClick}>
            View Info
          </Button>
        </Box>
      </Box>
      {detailedCurrentClient && (
        <div>
          <h1>ID: {id}</h1>
          <h1>FirstName: {firstName}</h1>
          <h1>LastName: {lastName}</h1>
        </div>
      )}
    </div>
  );
};

export default ClientDropDown;
