import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import register from "./Register";

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const loginData = {
            name,
            password,
        };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            if (result.success) {
                setMessage('log in successful！');
                if (result.role === 'Consultant') {
                    navigate('/consultant-dashboard');
                } else if (result.role === 'Manager') {
                    navigate('/manager-dashboard');
                } else if (result.role === 'Finance') {
                    navigate('/finance-dashboard');
                } else if (result.role === 'Executive'){
                    navigate('/Executive-dashboard');
                }
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage('fail to login, try again later');
        }
    };

    return (
        <div>
            <h2>login page</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="please enter your name"
                        required
                    />
                </div>
                <div>
                    <label>password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="please enter your password"
                        required
                    />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
                <div>
                    <Link to="/register">register</Link>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
