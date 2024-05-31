import React, { useState } from "react";
import Style from "../../styles/singup.module.css"
import { Link } from "react-router-dom";
import IUser from "../../types/interface.user";

const Singup: React.FC = () => {
  const [data, setData] = useState<IUser>({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [response, setResponse] = useState<string>('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((preview) => ({ ...preview, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/v0/singup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const newData = await res.json();
      setResponse(newData.message);
    } catch (error) {
      console.error(error);
      setResponse('error at submit the form');
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
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            placeholder="Last Name" />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email" />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password" />
          <button type="submit">Sing Up</button>
        </div>
      </form>
    </div>
  );
}

export default Singup;