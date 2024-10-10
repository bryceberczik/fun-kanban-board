import { useState, FormEvent, ChangeEvent } from "react";

import auth from "../utils/auth";
import { signUp } from "../api/authAPI";
import { UserLogin } from "../interfaces/UserLogin.js";

const Signup = () => {

    const [signUpData, setSignUpData] = useState<UserLogin>({
        username: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
          // Call the sign up API endpoint with signUpData
          const data = await signUp(signUpData);
          // If sign up is successful, call Auth.login to store the token in localStorage
          auth.login(data.token);
        } catch (err) {
          console.error('Failed to login', err);  // Log any errors that occur during sign up
        }
      };

    return(

        <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label >Username</label>
          <input 
            type='text'
            name='username'
            value={signUpData.username || ''}
            onChange={handleChange}
          />
        <label>Password</label>
          <input 
            type='password'
            name='password'
            value={signUpData.password || ''}
            onChange={handleChange}
          />
          <button type='submit'>Submit Form</button>
        </form>
      </div>
    )
}

export default Signup;