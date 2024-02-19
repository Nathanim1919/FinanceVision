import React from "react";

function HeaderLayout() {
  return (
    <div>
        <div className="logo">
            logo
        </div>
        <div className="search">
            <input type="text" placeholder="Search..."/>
        </div>

        <div className="profile">
            <div className="profileImage"></div>
            <div className="profileName">
                <p>John Doe</p>
            </div>
        </div>
    </div>
  );
}


export default HeaderLayout;