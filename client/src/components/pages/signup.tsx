import React, { useEffect, useState } from "react";
import style from "../../styles/singup.module.css"
import { Link, useNavigate } from "react-router-dom";
import IUsers from "../../types/interface.user";
import { config } from "../../config";
import { TErrors } from "../../types/type.error";

const Signup: React.FC = () => {
  const initalState: IUsers = {
    name: '',
    email: '',
    password: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: ''
    },
    phone: ''
  };

  const [ data, setData ] = useState<IUsers>(initalState);
  const [ step, setStep ] = useState(1);
  const [ error, setError ] = useState<TErrors>({});
  const [ response, setResponse ] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevData) => {
      if (name in prevData.address) {
        return {
          ...prevData,
          address: {
            ...prevData.address,
            [ name ]: value,
          },
        };
      } else {
        return {
          ...prevData,
          [ name ]: value,
        };
      }
    });
  };

  const handleClick = () => {
    const errors = handleErrors();
    console.log("Errores detectados:", errors); // Verifica los errores antes de actualizar el estado

    setError(errors);
    if (Object.keys(errors).length === 0) {
      console.log("No errors, calling nextStep");
      nextStep();
    } else {
      console.log("Errors found, not calling nextStep");
    }
  };

  const handleFocus = () => {
    setError({});
  }
  
  const previousStep = () => setStep((prevStep) => prevStep - 1);
  const nextStep = () => setStep((prevStep) => prevStep + 1);

  const handleErrors = () => {
    const errors: TErrors = {};
    if (step === 1) {
      if (!data.name) {
        errors.name = 'Name is required';
      };
      if (!data.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Invalid Email';
      };
    }

    if (step === 2) {
      if (!data.password) {
        errors.password = 'Password is required';
      } else if (data.password.length < 8) {
        errors.password = 'The password must be 8 letters';
      };
    }

    if (step === 4) {
      if (!data.phone) {
        errors.phone = 'Phone name is required';
      };
    }
    return errors;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const signUpURL: string = config.signUpURL;
    const errorValidation = handleErrors();
    setError(errorValidation);
    setResponse('');
    alert(JSON.stringify(data));
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

        setResponse(newData.message)
        setData(initalState);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={style[ 'sing-up' ]}>
      <Link to="/" className={style[ 'app-name' ]}>Cer0</Link>
      <form onSubmit={handleSubmit}>
        <div className={style[ 'card' ]}>
          <div className={style[ 'response' ]} >
            {response}
          </div>

          {step === 1 && (
            <div>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Name" />
              <div className={style[ 'errors' ]}>{error.name}</div>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email" />
              <div className={style[ 'errors' ]}>{error.email}</div>
              <button type="button" onClick={handleClick}>Next</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password" />
              <div className={style[ 'errors' ]}>{error.password}</div>
              <div className={style[ 'next-previous' ]}>
                <button type="button" onClick={previousStep}>Previous</button>
                <button type="button" onClick={handleClick} >Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <input
                type="text"
                name="street"
                value={data.address.street}
                onChange={handleChange}
                placeholder="Street" />
              <div className={style[ 'errors' ]}>{error.phone}</div>
              <input
                type="text"
                name="city"
                value={data.address.city}
                onChange={handleChange}
                placeholder="City" />
              <div className={style[ 'errors' ]}>{error.phone}</div>
              <input
                type="text"
                name="state"
                value={data.address.state}
                onChange={handleChange}
                placeholder="State" />
              <div className={style[ 'errors' ]}>{error.phone}</div>
              <input
                type="text"
                name="postalCode"
                value={data.address.postalCode}
                onChange={handleChange}
                placeholder="Postal Code" />
              <div className={style[ 'errors' ]}>{error.phone}</div>
              <div className={style[ 'next-previous' ]}>
                <button type="button" onClick={previousStep}>Previous</button>
                <button type="button" onClick={handleClick}>Next</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <input
                type="text"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="Phone number" />
              <div className={style[ 'errors' ]}>{error.phone}</div>
              <div className={style[ 'next-previous' ]}>
                <button type="button" onClick={previousStep}>Previous</button>
                <button type="submit">Sign Up</button>
              </div>
              <Link to="/login" className={style[ 'log-in' ]}>Log In</Link>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Signup;