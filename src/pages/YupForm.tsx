import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup'; // Import Yup
import { yupResolver } from '@hookform/resolvers/yup'; // Import Yup resolver
import axios from 'axios';

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile_no: string;
};

const schema = yup.object().shape({
  firstname: yup.string().required('First Name is required'),
  lastname: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  mobile_no: yup
    .string()
    .matches(/^[6-9][0-9]{9}$/, 'Invalid mobile number')
    .required('Mobile number is required'),
});

const YupForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
   console.log("form is submitted" , data)
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" {...register('firstname')} />
          <p>{errors.firstname?.message}</p>
        </div>

        <div>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" {...register('lastname')} />
          <p>{errors.lastname?.message}</p>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register('password')} />
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <label htmlFor="mobile_no">Mobile Number</label>
          <input type="text" id="mobile_no" {...register('mobile_no')} />
          <p>{errors.mobile_no?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default YupForm;
