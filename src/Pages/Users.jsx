// import { Space} from "antd";
import {useState } from "react";
import { useAuth } from '../services/auth'
import * as yup from 'yup'

const Users = () => {

  const {user } = useAuth()

  const userInfo = {
    username : user.firstName + " "+ user.lastName,
    email : user.email,
    empId : user.employeeId,
    loc : user.location
  }

  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEditClick = () => {

    setEditMode(true);
  } 

  const passwordValidate = yup.object().shape({
    password : yup
    .string()
    .min(8,'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  })

  const handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);

    passwordValidate.validate({ password: value })
    .then(() => setPasswordError(''))
    .catch(error => setPasswordError(error.errors[0]));

};


  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    setConfirmPasswordError('');
    if (!password) {
      setPasswordError('Please enter a password');
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    // console.log('Password submitted:', password);
    // Reset password and disable edit mode after submission
    setPassword('');
    setConfirmPassword('');
    setEditMode(false);
  };

  const user1 = {
    avatar: 'https://cdn.hero.page/pfp/b0b19559-3cbb-4781-8267-814aa9e0f12b-modern-anime-guy-anime-guys-pfp-unique-1.png',
    city: userInfo.loc,
    country: 'India',
    name: userInfo.username,
    timezone: 'GTM-7'
  };

  return (  
    <>
    {/* <Space size={20} direction="vertical"></Space> */}
    <h1 className="pt-5 pl-5 pr-10 font-extrabold text-3xl font-serif">Personal Information</h1>

    <div className="flex place-items-center justify-center p-3 w-100">
        <div className="flex items-center mx-10">
          <div className="bg-white border rounded-md shadow-md p-4 mb-12">
            <div className="flex flex-col items-center">
              <img
                src={user1.avatar}
                alt="User Avatar"
                className="h-32 w-32 rounded-full mb-2"
              />
              <h5 className="text-lg font-semibold mb-1">{userInfo.username}</h5>
              <p className="text-sm text-gray-500 mb-1">{user1.city} {user1.country}</p>
              <p className="text-sm text-gray-500">{user1.timezone}</p>
            </div>
            <hr className="my-4 border-gray-200" />
            <div className="flex justify-center">
              <label className="cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent
                    rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
                focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150" htmlFor="restaurantImage">
              
                Select image
                <input id="restaurantImage" className="text-sm cursor-pointer w-36 hidden" type="file"></input>
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 grid items-center" id="file_input_help">(Only SVG, PNG, JPG or GIF)</p>
          </div>
        </div>

        <div className= " flex mb-4 m-6">
          <form className="flex flex-col gap-6 w-100">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-3/5">
                <label className="block text-gray-700 font-bold md: mb-1 md:mb-0 pr-4 items-start" htmlFor="name">
                  Name of Trainee 
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  className="bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-80 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  type="name" 
                  placeholder="Name of Trainee" 
                  aria-label="Disabled input example" 
                  defaultValue={userInfo.username}
                  disabled readOnly 
                  />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-3/5">
                <label className="block text-gray-700 font-bold md: mb-1 md:mb-0 pr-4 items-start" htmlFor="email">
                Email address 
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  className="bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-80 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  type="email" 
                  placeholder="Email Address" 
                  aria-label="Disabled input example" 
                  defaultValue={userInfo.email}
                  disabled readOnly 
                  />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-3/5">
                <label className="block text-gray-700 font-bold md: mb-1 md:mb-0 pr-4 items-start" htmlFor="id">
                Employee ID 
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  className="bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-80 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  type="name" 
                  placeholder="Employee ID" 
                  aria-label="Disabled input example" 
                  defaultValue={userInfo.empId}
                  disabled readOnly 
                  />
              </div>
            </div>
                      
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-3/5">
                <label className="block text-gray-700 font-bold md: mb-1 md:mb-0 pr-4 items-start" >
                  Change Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  className = {`bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-80 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${editMode ? 'bg-white' : ''}`}
                  // id="inline-password" 
                  type="password" 
                  autoComplete="off"
                  placeholder="Enter New Password" 
                  value={password} onChange={(e) => {handleChangePassword(e)}}  disabled={!editMode} 
                  />
                  <span className="hover:bg-[#000]"><i className="fas fa-eye"></i></span>
                  {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-3/5">
                <label className="block text-gray-700 font-bold md: mb-1 md:mb-0 pr-4 items-start">
                {/* <label className="block text-gray-700 font-bold md: mb-1 md:mb-0 pr-4 items-start" htmlFor="inline-password"> */}
                  Confirm Passoword
                </label>
              </div>
              <div className="md:w-2/3">
                <input 
                  className = {`bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-80 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${editMode ? 'bg-white' : ''}`}
                  // id="inline-password" 
                  type="password" 
                  autoComplete="off"
                  placeholder="Re-Enter Password" 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!editMode} 
                  />
                  {confirmPasswordError && <p className="text-red-500 text-xs italic">{confirmPasswordError}</p>}
              </div>
            </div>
    
            <div className="grid justify-center items-center gap-2 md:flex md:flex-row">
            <button className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4 me-2 mb-10 dark:border-[#0A1C3E] dark:text-[#0A1C3E] dark:hover:text-white  dark:focus:ring-[#0A1C3E]" variant="primary" onClick={handleEditClick} disabled={editMode}>Edit</button>
              <button className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4 me-2 mb-10 dark:border-[#0A1C3E] dark:text-[#0A1C3E] dark:hover:text-white  dark:focus:ring-[#0A1C3E]" variant="primary" onClick={handleSubmit} type="submit" disabled={!editMode} >Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};

export default Users;
