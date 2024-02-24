import React from 'react';
import { Link } from 'react-router-dom';


export default function PageNotFound() {
  return (
    <>
        <div>Page Not Found</div>
        <Link to="/dashboard">Go back home</Link>
    </>
  )
}