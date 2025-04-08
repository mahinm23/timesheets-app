import React, { useState } from 'react';
import {Link} from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Consultant'); // 默认角色为 Consultant
    const [message, setMessage] = useState(''); // 用于显示注册信息

    const handleRegister = async (event) => {
        event.preventDefault();

        const employeeData = {
            name,
            email,
            password,
            role,
        };

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });

            const result = await response.json();

            if (result.success) {
                setMessage('registered successfully');
            } else {
                setMessage(result.message); // 显示错误消息，如邮箱已注册
            }
        } catch (error) {
            // console.error('注册时出现错误:', error);
            setMessage('fail to register');
        }
    };

    return (
        <div>
            <h2>register page</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="enter your name"
                        required
                    />
                </div>
                <div>
                    <label>email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="enter your email"
                        required
                    />
                </div>
                <div>
                    <label>password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="enter your password"
                        required
                    />
                </div>
                <div>
                    <label>role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="Consultant">Consultant</option>
                        <option value="Manager">Manager</option>
                        <option value="Finance">Finance</option>
                        <option value="Executive">Executive</option>
                    </select>
                </div>
                <div>
                    <button type="submit">register</button>
                </div>
                <div>
                    <Link to="/login">back to login</Link>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
