// UserProfile.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const user = useSelector(state => state.userAuth.user);
  console.log(user)

  return (
    <div>
      {user ? <p>Welcome, {user.fullname}!</p> : <p>Please log in.</p>}
    </div>
  );
}
export default UserProfile;