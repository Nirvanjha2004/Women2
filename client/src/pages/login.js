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
            console.log('Sending login request to:', `${publicRequest.defaults.baseURL}/auth/login`);
            console.log('Login data:', { email, password });
            
            const res = await publicRequest.post("/auth/login", {
                email,
                password
            });
            console.log('Login response:', res);

            if (res.data) {
                // Store the token and user data
                localStorage.setItem("user", JSON.stringify(res.data));
                window.alert("Successfully Logged In");
                history.push("/"); // Redirect to home page
            }
            
        } catch (err) {
            console.error('Login error:', err);
            console.error('Error response:', err.response);
            
            if (err.response?.status === 401) {
                window.alert("Invalid email or password");
            } else {
                window.alert("Login failed. Please try again.");
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