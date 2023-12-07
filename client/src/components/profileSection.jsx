import React from 'react'

function ProfileSection({user}) {
  return (
     <div className='profileSection'>
            <div>
              <div className='content'>
                <h4>Hello {user.fullname}, Welcome!</h4>
                <span>Save, Plan, Invest</span>
              </div>
            </div>
    
            <div>
              <h2>{user.savings} Birr</h2>
            </div>
          </div>
  )
}

export default ProfileSection;