import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';

function Member() {
  const [openSignupform, setOpenSignupForm] = useState();
  return (
    <div>
       { openSignupform?<Register setOpenSignupForm={setOpenSignupForm}/>
                        :<Login setOpenSignupForm={setOpenSignupForm}/>  
        }
    </div>
  )
}

export default Member