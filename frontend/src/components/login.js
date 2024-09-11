// import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';

// function Login() {
//     const [values, setValues] = useState({
//         email: "",
//         password: ""
//     });

//     const [errorMessage, setErrorMessage] = useState(""); // To handle errors
//     const history = useHistory(); // To redirect on successful login

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const response = await fetch('http://localhost:4000/vendor/login', { // Replace with your API endpoint
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(values), // Send the form data as JSON
//             });

//             const data = await response.json(); // Parse the JSON response

//             if (response.ok) {
//                 console.log('Login successful', data);
//                 // You can store the JWT token in localStorage or cookie
//                 // localStorage.setItem('token', data.token);

//                 // Redirect to the home page after successful login
//                 history.push('/home');
//             } else {
//                 setErrorMessage(data.message || "Login failed. Please check your credentials.");
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//             setErrorMessage('An error occurred. Please try again later.');
//         }
//     };

//     return (
//         <div className='registrationContainer'>
//             <form onSubmit={handleSubmit} className='registrationformContainer'>
//                 <h2>Login page</h2>
//                 {errorMessage && <p className="error">{errorMessage}</p>} {/* Show error message if any */}
//                 <div className='inputcontainer'>
//                     <label className='labels'>Enter Email</label>
//                     <input className='inputType' type='email' required name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder='enter email' />
//                 </div>
//                 <div className='inputcontainer'>
//                     <label className='labels'>Enter password</label>
//                     <input className='inputType' type='password' required name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} placeholder='enter password' />
//                 </div>
//                 <div className='buttoncontainer'>
//                     <button className='submitButton' type='submit'>Submit</button>
//                     <p className='paragraph'>You don't have an account? <Link to="/registration">Click Here</Link></p>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default Login;


import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState(""); 
    const history = useHistory(); 

    // Redirect to /home if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            history.push('/home');
        }
    }, [history]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://multiplier.onrender.com/vendor/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values), 
            });

            const data = await response.json(); 

            if (response.ok) {
                localStorage.setItem('token', data.token); 
                history.push('/home'); 
            } else {
                setErrorMessage(data.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='registrationContainer'>
            <form onSubmit={handleSubmit} className='registrationformContainer'>
                <h2>Login page</h2>
                
                <div className='inputcontainer'>
                    <label className='labels'>Enter Email</label>
                    <input className='inputType' type='email' required name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder='enter email' />
                </div>
                <div className='inputcontainer'>
                    <label className='labels'>Enter password</label>
                    <input className='inputType' type='password' required name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} placeholder='enter password' />
                </div>
                <div className='buttoncontainer'>
                    <button className='submitButton' type='submit'>Login</button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <p className='paragraph'>You don't have an account? <Link to="/registration">Click Here</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
