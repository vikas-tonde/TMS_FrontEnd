import { useEffect, useState } from "react";
import { useAuth } from '../services/auth'
import * as yup from 'yup'
import { Link } from "react-router-dom";
import avatar from '../assets/avatar.svg';
import api from "../services/api";
const Users = () => {
  const [imageUrl, setImageUrl] = useState('');
  const { user, setUser } = useAuth()
  const userInfo = {
    username: user.firstName + " " + user.lastName,
    email: user.email,
    empId: user.employeeId,
    loc: user.location
  };

  useEffect(() => {
    if (user?.profileImage) {
      setImageUrl(`/api/users/profile/${user?.profileImage}`);
    } else {
      setImageUrl(avatar);
    }
  }, [user?.profileImage]);

  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEditClick = () => {
    setEditMode(true);
  }

  const passwordValidate = yup.object().shape({
    password: yup
      .string()
      .min(8, 'Password must be 8 characters long')
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

  let auth = useAuth();
  const handleImageUpload = async (event) => {
    try {
      let formdata = new FormData();
      formdata.append('file', event.target.files[0]);
      const response = await api.put(`/api/users/profile/image`, formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      if (response?.status === 200)
        setUser({ ...user, profileImage: response.data.data.filename });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {/* <Space size={20} direction="vertical"></Space> */}
      <div className="flex-1 bg-gray-500 bg-opacity-40 pb-6 backdrop-blur-md min-h-screen">
        <Link
          to='/profile'
          className="block py-3 px-3 font-bold text-3xl text-gray-700 Times text-center mx-auto"
        >
          Personal Information
        </Link>

        {/* StatisticsTabsMenu without 3D effect */}
        <div className="mt-4 mx-6 shadow-xl rounded-lg bg-white">
          <div className="flex flex-col items-center justify-center p-6 w-full md:flex-row">
            <div className="mx-10">
              <div className="bg-white border rounded-md shadow-md p-4 mb-4 sm:mb-14 md:mb-14 w-full max-w-xs md:max-w-sm">
                <div className="flex flex-col items-center">
                  <img
                    src={imageUrl}
                    alt="User Avatar"
                    className="h-32 w-32 rounded-full mb-2"
                  />
                  <h5 className="text-lg font-semibold mb-1">{userInfo.username}</h5>
                </div>
                <hr className="my-4 border-gray-200" />
                <div className="flex justify-center">
                  <label className="cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent
                    rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
                focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150" htmlFor="profile-image">
                    Select image
                    <input onChange={handleImageUpload} id="profile-image" accept="image/*" className="text-sm cursor-pointer w-36 hidden" type="file"></input>
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 grid items-center" id="file_input_help">(Only SVG, PNG, JPG or GIF)</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 w-full md:w-2/3">
              <div className="w-full">
                <form className="flex flex-col gap-4">
                  <div className="md:flex md:items-center mb-1">
                    <div className="md:w-3/5">
                      <label className="block text-gray-700 font-bold md: mb-1 md:mb-0 pr-4 items-start" htmlFor="name">
                        Name of Trainee
                      </label>
                    </div>
                    <div className="md:w-2/3 w-full">
                      <input
                        className="bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="text"
                        placeholder="Name of Trainee"
                        aria-label="Disabled input example"
                        defaultValue={userInfo.username}
                        disabled
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-1">
                    <div className="md:w-3/5">
                      <label className="block text-gray-700 font-bold md: mb-1 md:mb-0 pr-4 items-start" htmlFor="email">
                        Email address
                      </label>
                    </div>
                    <div className="md:w-2/3 w-full">
                      <input
                        className="bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="email"
                        placeholder="Email Address"
                        aria-label="Disabled input example"
                        defaultValue={userInfo.email}
                        disabled
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-1">
                    <div className="md:w-3/5">
                      <label className="block text-gray-700 font-bold md: mb-1 md:mb-0 pr-4 items-start" htmlFor="id">
                        Employee ID
                      </label>
                    </div>
                    <div className="md:w-2/3 w-full">
                      <input
                        className="bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="text"
                        placeholder="Employee ID"
                        aria-label="Disabled input example"
                        defaultValue={userInfo.empId}
                        disabled
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-1">
                    <div className="md:w-3/5">
                      <label className="block text-gray-700 font-bold md: mb-1 md:mb-0 pr-4 items-start">
                        Change Password
                      </label>
                    </div>
                    <div className="md:w-2/3 w-full">
                      <input
                        className={`bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-800 ${editMode ? 'bg-white' : ''}`}
                        type="password"
                        autoComplete="off"
                        placeholder="Enter New Password"
                        value={password} onChange={handleChangePassword} disabled={!editMode}
                      />
                      {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-1">
                    <div className="md:w-3/5">
                      <label className="block text-gray-700 font-bold md: mb-1 md:mb-0 pr-4 items-start">
                        Confirm Password
                      </label>
                    </div>
                    <div className="md:w-2/3 w-full">
                      <input
                        className={`bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-800 ${editMode ? 'bg-white' : ''}`}
                        type="password"
                        autoComplete="off"
                        placeholder="Re-Enter Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={!editMode}
                      />
                      {confirmPasswordError && <p className="text-red-500 text-xs italic">{confirmPasswordError}</p>}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4 me-2 mb-5 dark:border-[#0A1C3E] dark:text-[#0A1C3E] dark:hover:text-white  dark:focus:ring-[#0A1C3E]"
                      variant="primary"
                      onClick={handleEditClick}
                      disabled={editMode}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white bg-[#0A1C3E] hover:text-[#0A1C3E] border border-white hover:bg-white hover:border-[#0A1C3E] focus:ring-4 focus:outline-none focus:ring-[#0A1C3E]-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4 me-2 mb-5 dark:border-[#0A1C3E] dark:text-[#0A1C3E] dark:hover:text-white  dark:focus:ring-[#0A1C3E]"
                      variant="primary"
                      onClick={handleSubmit}
                      type="submit"
                      disabled={!editMode}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
};

export default Users;
