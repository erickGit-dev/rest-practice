import React, { useState } from "react";
import Style from "../../styles/singup.module.css"
import { Link } from "react-router-dom";
import IUser from "../../types/interface.user";
import { config } from "../../config";
import { TErrors } from "../../types/type.error";
import { spawn } from "child_process";

const Signup: React.FC = () => {
  const initalState: IUser = {
    name: '',
    lastName: '',
    email: '',
    password: ''
  };

  const [data, setData] = useState<IUser>(initalState);
  const [error, setError] = useState<TErrors>({});
  const [response, setResponse] = useState<string>('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((preview) => ({ ...preview, [name]: value }));
  };

  const handleErrors = () => {
    const errors: TErrors = {}
    if (!data.name) {
      errors.name = 'Name is required';
    };
    if (!data.lastName) {
      errors.lastName = 'Last Name is required';
    };
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
    const signUpURL: string = config.signUpURL;
    const errorValidation = handleErrors();
    setError(errorValidation);
    if (Object.keys(errorValidation).length === 0) {
      try {
        const req = await fetch(signUpURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const newData = await req.json();
        setResponse(newData.message);
        setData(initalState);
      } catch (error) {
        setResponse('Please all the fields')
        console.error(error);
      }
    }
  };

  return (
    <div className={Style['sing-up']}>
      <Link to="/" className={Style['app-name']}>Cer0</Link>
      <form onSubmit={handleSubmit}>
        <div className={Style['card']}>
          <div className={Style['response']} >
            {response}
          </div>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Name" />
            <div className={Style['errors']}>{error.name}</div>
            <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            placeholder="Last Name" />
            <div className={Style['errors']}>{error.lastName}</div>
            <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email" />
            <div className={Style['errors']}>{error.email}</div>
            <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password" />
            <div className={Style['errors']}>{error.password}</div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;