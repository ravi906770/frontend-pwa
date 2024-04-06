// import { getValue } from '@testing-library/user-event/dist/utils';
import React from 'react'
import { useForm , useFieldArray } from 'react-hook-form';

type Props = {}


type formValue = {
    user : {
        firstname : string,
        lastname : string
    },
    cpassword : string,
    password : string,
    age : number,
    date : Date,
    pnumber  : string[],
    pnumbers : {
        number : string
    }[]
}

const UseForm = (props: Props) => {

    // default values

    const form = useForm<formValue>({
        defaultValues :{
            user : {
                firstname : "",
                lastname : ""
            },
            age : 0,
            date : new Date(),
            pnumber : ["" , ""],
            pnumbers : [{number : ""}]

        }
    });

    // register 
    const { register , handleSubmit , formState , control , getValues} = form;
    const {errors}= formState


    // usefield array
   const {fields , append , remove} =  useFieldArray({
        name : "pnumbers",
        control
    })

    // submit 
    const onSubmit =(data : formValue)=>{
        console.log("form is submitted" , data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstname">
                    First Name
                </label>
                <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" {...register("user.firstname",{
                    required :{
                        value:true,
                        message : "Firstname is required"
                    } 
                })}/>
            </div>
            <p className='text-red-700'>{errors.user?.firstname?.message}</p>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstname">
                    password
                </label>
                <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="password" placeholder="Jane" {...register("password",{
                    required :{
                        value:true,
                        message : "password is required"
                    } 
                })}/>
            </div>
            <p className='text-red-700'>{errors.password?.message}</p>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstname">
                    confirm password
                </label>
                <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="password"   placeholder="Jane" {...register("cpassword",{
                    required :{
                        value:true,
                        message : "password is required"
                    } ,
                    validate : (password)=>{
                          return  password === getValues("password") || "Password must be match"
                    }
                })}/>
            </div>
            <p className='text-red-700'>{errors.cpassword?.message}</p>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstname">
                    First Name
                </label>
                <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" {...register("user.lastname",{
                    required :{
                        value:true,
                        message : "lastname is required"
                    } 
                })}/>
            </div>
            <p className='text-red-700'>{errors.user?.lastname?.message}</p>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                    age
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="age" type="number" {...register("age" ,{
                    valueAsNumber : true,
                    required :{
                        value:true,
                        message : "age is required"
                    } ,
                    validate :async(value)=>{
                        if (value < 18) {
                            return "Age must be greater than 18"; 
                        }
                    }
                })}
                />
            </div>
            <p className='text-red-700'>{errors.age?.message}</p>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
                    date
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="date" type="date" {...register("date" ,{
                    valueAsDate : true,
                    required :{
                        value:true,
                        message : "dob is required"
                    }
                })}
                />
            </div>
            <p className='text-red-700'>{errors.date?.message}</p>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pnumber">
                    pnumber
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="pnumber" type="text" {...register(("pnumber.0") ,{
                    required :{
                        value:true,
                        message : "pnumber is required"
                    },
                    pattern : {
                        value :/^[6-9][0-9]{9}$/,
                        message : "Invalid format"
                    }
                })}
                />
            </div>
            <p className='text-red-700'>{errors.pnumber && errors.pnumber[0]?.message}</p>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pnumber">
                    pnumber
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="pnumber" type="text" {...register(("pnumber.1") ,{
                    required :{
                        value:true,
                        message : "pnumber is required"
                    },
                    pattern : {
                        value :/^[6-9][0-9]{9}$/,
                        message : "Invalid format"
                    }
                })}
                />
            </div>
            <p className='text-red-700'>{errors.pnumber && errors.pnumber[1]?.message}</p>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pnumbers">
                    list of numbers
                </label>
                {fields.map((field ,index)=>
                <div> 
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="pnumbers" type="text" {...register((`pnumbers.${index}.number`) ,{
                    required :{
                        value:true,
                        message : "pnumber is required"
                    },
                    pattern : {
                        value :/^[6-9][0-9]{9}$/,
                        message : "Invalid format"
                    }
                })}
                />
                {
                    index > 0 && 
                    <button className='btn' type='button' onClick={()=>remove(index)}>remove</button>
                }
                <button className='btn' type='button' onClick={()=>append({number:""})}>add</button>
               

                </div>
                )}
               
            </div>
            <p className='text-red-700'>{errors.pnumbers && errors.pnumbers[0]?.message}</p>
            <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <button type='submit' className="mt-10 bg-primaryColor text-white w-full h-[50px] font-bold hover:bg-green-400 rounded-full">Sign Up</button>
                  </div>
                </div>
                </form>
        </div>
    )
}

export default UseForm