import React, { useState } from 'react';
import { publicRequest } from "../requestMethods";
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            console.log('Attempting login with:', { email, password });
            
            const res = await publicRequest.post("/auth/login", {
                email,
                password
            });
            
            console.log('Login response:', res);

            if (res.data && res.data.token) {
                // Store the token and user data in localStorage
                localStorage.setItem("persist:root", JSON.stringify({
                    user: JSON.stringify({
                        currentUser: res.data.user,
                        token: res.data.token
                    })
                }));
                
                window.alert("Successfully Logged In");
                history.push("/");
            } else {
                throw new Error('Invalid response format');
            }
            
        } catch (err) {
            console.error('Login error:', err);
            
            if (err.response) {
                console.error('Error response:', err.response);
                if (err.response.status === 401) {
                    window.alert("Invalid email or password");
                } else if (err.response.status === 404) {
                    window.alert("Server error: Route not found");
                } else {
                    window.alert(`Login failed: ${err.response.data?.msg || 'Unknown error'}`);
                }
            } else {
                window.alert("Network error. Please try again later.");
            }
        }
    };

    return (
        <div className='login-container'>
            <div className='login-wrapper'>
                <h1 className='login-title'>SIGN IN</h1>
                <form className='login-form'>
                    <input 
                        placeholder='Email' 
                        className='login-input' 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder='Password' 
                        className='login-input' 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        className='login-button' 
                        onClick={handleLogin}
                    >
                        LOGIN
                    </button>
                    <span className='login-link'>Forgot Password?</span>
                    <span className='login-link' onClick={() => history.push('/register')}>
                        Create a New Account
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login; 