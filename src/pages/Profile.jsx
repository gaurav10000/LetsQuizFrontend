import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../components/Dashboard.jsx'


const Profile = () => {

  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const [password, setPassword] = useState('NoChange')
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const handleCancel = (e) => {
    navigate('/quizzesPage')
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    axios.put('http://localhost:8080/api/v1/users/updateUser', {
      fullname: fullname? fullname : user.fullname,
      username: username? username : user.username,
      email: email? email : user.email,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then((res) => {
      console.log(res);
      if (res.status == 200 && res.statusText == "OK") {
        alert("Done!")
      }
    }).catch((err) => {
      console.log(err.response);
      if (err.response.status == 409 && err.response.statusText == 'Conflict') {
        alert("Some User already has this username/email, please try different one!")
      }
    })
  }

  const getUserDetails = (e) => {
    const userDetails = axios.get('http://localhost:8080/api/v1/users/getUserDetails', {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    }).then((res) => {
      // console.log(user);
      setUser(res.data.data);

    }).catch((err) => {
      // console.log(err.response.status);
      console.log(err);
    })
  }

  getUserDetails()
  
  return (
    <div className='h-dvh bg-[#36454F]'>
      <Dashboard />
      <div className='w-full h-[83%] flex justify-center mt-10'>
        <div className='flex flex-col justify-center items-center h-[80%] w-full mt-20'>
          {/* <h1 className='text-5xl text-center'>Profile</h1> */}
          <div className='border-2 border-black min-h-[80%] w-[60%] py-5'>
            <form className='h-full flex flex-col justify-center gap-5'>

              {/* // This is the avatar field */}
              <div className='flex gap-5 justify-center items-center'>
                <img className='h-40 w-40 rounded-3xl absolute top-[11rem] border-[3px] border-black' src={`${user.avatar}`} alt="avatar of user" />
              </div>

              {/* // This is the full name field */}
              <div className='flex gap-5 justify-center items-center'>
                <label className='text-2xl' htmlFor="fullname">Full Name : </label>
                <input className='text-center py-1 px-2 border-2 border-black font-bold bg-[#22282c]' type="text" name="fullname" id="fullname" defaultValue={user.fullname} 
                onChange={(e) => setFullname(e.target.value)}
                />
              </div>

              {/* // This is the username field */}
              <div className='flex gap-5 justify-center items-center'>
                <label className='text-2xl' htmlFor="username">Username : </label>
                <input className='text-center py-1 px-2 border-2 border-black font-bold bg-[#22282c]' type="username" name="username" id="username" defaultValue={user.username} 
                onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* // This is the email field */}
              <div className='flex gap-5 justify-center items-center'>
                <label className='text-2xl' htmlFor="email">Email : </label>
                <input className='text-center py-1 px-2 border-2 border-black font-bold bg-[#22282c]' type="email" name="email" id="email" defaultValue={user.email} 
                onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* // This is the password field */}
              <div className='flex gap-5 justify-center items-center'>
                <label className='text-2xl' htmlFor="password">New Password : </label>
                <input type="password" name="password" id="password" defaultValue={"NoChange"} className='text-center py-1 px-2 border-2 border-black font-bold bg-[#22282c]' 
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className='flex gap-5 justify-center items-center mt-3'>
                <button type="submit" className='bg-black hover:bg-cyan-500 text-xl text-white p-2 border-2 border-white' onClick={handleCancel}>Cancel</button>
                <button type="submit" className='bg-black hover:bg-cyan-500 text-xl text-white p-2 border-2 border-white' onClick={handleUpdate}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile