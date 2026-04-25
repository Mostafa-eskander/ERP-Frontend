import { LogIn,Eye,EyeOff,Mail } from 'lucide-react';

import classes from './Login.module.css';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import useAuthStore from '../../store/appContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [mode,setMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark'
    });

    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [showPassword,setShowPassword] = useState('password');

    const navigate = useNavigate();
    const {login, isLoading, error, isAuthenticated} = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if(mode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme','dark');
        }else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme','light');
        }
    },[mode]);

    function toggleInputStuta () {
        setShowPassword(prev =>
            prev === 'password' ? 'text' : 'password'
        );
    }   

    async function handleLogin (e) {
        e.preventDefault();
        const succes = await login(userEmail,userPassword);
        if(succes) {
            navigate('/');
        }
    };

    return (
        <div className={classes.loginContainer}>
            <div className={classes.formContainer}>
                <div className={classes.formHeader}>
                    <div className={classes.icon}>
                        <LogIn size={32} />
                    </div>
                    <h1>مرحباً بعودتك</h1>
                    <p>قم بتسجيل الدخول للوصول إلى لوحة التحكم ونقاط البيع</p>
                </div>

                {error && <div className={classes.errorMessage}>{error}</div>}

                <form className={classes.form} onSubmit={handleLogin}>
                    <div className={classes.inpContainer}>
                        <label htmlFor='userName'>البريد الإلكتروني</label>
                        <div className={classes.inputWrapper}>
                            <input className='inp-primary' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type='email' placeholder='أدخل البريد الكتروني' id='userName' name='userName' />
                            <button type='button' aria-label="email icon"><Mail /></button>
                        </div>
                    </div>
                    <div className={classes.inpContainer}>
                        <label htmlFor='userPassword'>كلمة المرور</label>
                        <div className={classes.inputWrapper}>
                            <input className='inp-primary' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} type={showPassword} placeholder='أدخل كلمة المرور' id='userPassword' name='userPassword' />
                            <button type='button' onClick={toggleInputStuta}>{showPassword === 'password' ? <Eye /> : <EyeOff />}</button>
                        </div>
                    </div>
                    <button 
                        type='submit' 
                        className={`btn-primary ${classes.formBtn}`}
                        disabled= {isLoading}
                    >
                        {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                    </button>
                </form>
            </div>
        </div>
    );
}