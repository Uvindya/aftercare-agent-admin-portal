import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile } from '../../../../redux/actions/Technicians';

const TechnicianMyProfile = () => {
  //1.select the variable form the global state
  const { myProfile } = useSelector(({ technicianReducer }) => technicianReducer);

  //2. prepare local variables to display on jsx which is in return
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [primaryPhoneNo, setPrimaryPhoneNo] = useState('');
  const [erpId, setErpId] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    //3. displatch getmyprofile action when myprofile is null, use .length for arrays
    if (!myProfile) {
      dispatch(getMyProfile());
    } else {
      //4. set values when myprofile is not null
      setfirstName(myProfile.firstName);
      setLastName(myProfile.lastName);
      setEmail(myProfile.email);
      setId(myProfile.id);
      setPrimaryPhoneNo(myProfile.primaryPhoneNo);
      setErpId(myProfile.erpId);
    }
  }, [myProfile, dispatch]);

  return (
    <div>
      My Profile
      <h1>Id: {id}</h1>
      <h1>First Name : {firstName}</h1>
      <h1>Last Name : {lastName}</h1>
      <h1>Email : {email}</h1>
      <h1>Primary Phone Number : {primaryPhoneNo}</h1>
      <h1>ERP ID: {erpId}</h1>
    </div>
  );
};

export default TechnicianMyProfile;
