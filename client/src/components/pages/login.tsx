import React, { useState } from "react";
import style from "../../styles/login.module.css";
import { Link, useNavigate } from "react-router-dom";
import IUser from "../../types/interface.user";
import { TErrors } from "../../types/type.error";
import { config } from "../../config";

const Login: React.FC = () => {
  const initalState: IUser = {
    email: '',
    password: '',
    name: '',
    lastName: ''
  };

  const [data, setData] = useState<IUser>(initalState);
  const [error, setError] = useState<TErrors>({});
  const [response, setResponse] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((preview) => ({ ...preview, [name]: value }));
  };

  const handleErrors = () => {
    const errors: TErrors = {}
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid Email';
    };
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 8) {
      errors.password = 'The password must be 8 letters';
    }
    return errors;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const logInURL: string = config.logInURL;
    const errorValidation = handleErrors();
    setError(errorValidation);
    setResponse('');
    if (Object.keys(errorValidation).length === 0) {
      try {
        const res = await fetch(logInURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const newData = await res.json();
        if (newData.token) {
          console.log(newData.token);
          localStorage.setItem('token', newData.token);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          console.log('token not recived');
        }
        setResponse(newData.message)
        setData(initalState);
      } catch (error) {
        console.error(error);
      }
    } 
  };

  return (
    <div className={style['log-in']}>
      <Link to="/" className={style['app-name']}>Cer0</Link>
      <form onSubmit={handleSubmit}>
        <div className={style['card']}>
          <span> Wellcome back!</span>
          <div className={style['response']} >
            {response}
          </div>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email" />
          <div className={style['errors']}>{error.email}</div>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password" />
          <div className={style['errors']}>{error.password}</div>
          <button type="submit">log In</button>
          New here? Join us!
          <Link to="/signup" className={style['sign-up']}>Sign Up</Link>
        </div>
      </form >
    </div>
  );
}

export default Login;