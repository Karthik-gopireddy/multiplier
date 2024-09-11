import React from 'react'
import { useHistory } from 'react-router-dom';

function Navbar() {

    const history = useHistory();

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        history.push('/');
    };
  return (
    <div className='navbarcontainer'>
        <div>
            <h1>logo</h1>
        </div>
        <ul className='unorderlistcomntainer'>
            
            <li onClick={handleLogout}>Logout</li>
        </ul>
      
    </div>
  )
}

export default Navbar
