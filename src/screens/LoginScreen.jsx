import { useState } from 'react';
import '../css/LoginScreen.css';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="header">
                <h1>EDU EVENT</h1>
                <p>Student Service</p>
            </div>

            <div className="form">
                <h2>Welcome back!</h2>

                <div className="input-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <p className="hint">
                        Use at least 8 characters with 1 number, and one special character.
                    </p>
                </div>

                <button
                    className="login-button"
                    onClick={() =>
                        navigate('/users')}
                >
                    LOG IN
                </button>


                <div className="forgot-password">
                    <a href="#">Forgot password?</a>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
