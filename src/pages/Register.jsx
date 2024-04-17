import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import {useSnackbar} from 'notistack';
// import {useNavigate} from 'react-router-dom';

const Register = () => {

    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState(null)
    const { enqueueSnackbar } = useSnackbar()
    // const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (fullname === "" || username === "" || email === "" || password === "" || avatar === null) {
            alert('Please fill all fields')
            return
        }
        
        axios.post('http://localhost:8080/api/v1/users/register', {
            fullname: fullname,
            username: username,
            email: email,
            password: password,
            avatar: avatar
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            // enqueueSnackbar('User Registered Successfully', {variant: 'success'}) // don't know why this is not working 
            alert('User Registered Successfully')
        })
        .catch((err) => {
            alert('User Registration Failed')
            // enqueueSnackbar('User Registration Failed', {variant: 'error'}) // don't know why this is not working
        })
    }

  return (
      <div className='h-dvh'>
        <Navbar/>
      <div className='flex flex-col items-center justify-center gap-3 m-4 min-h-5 border-4 border-green-500'>
        <h1 className='text-2xl'>Register</h1>
        <form className='border-4 border-blue-500 flex flex-col justify-center items-center gap-5  w-1/2 h-3/4 py-5 mb-5'>
            <input required type="text" placeholder='Full Name' name='fullname' className='border-4 border-green-500 px-4 ' onChange={(e) => setFullname(e.target.value)}/>
            <input required type="text" placeholder="Username" name='username' className='border-4 border-green-500 px-4 ' onChange={(e) => setUsername(e.target.value)}/>
            <input required type="text" placeholder="Email" name='email' className='border-4 border-green-500 px-4 ' onChange={(e) => setEmail(e.target.value)}/>
            <input required type="password" placeholder="Password" name='password' className='border-4 border-green-500 px-4 ' onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="avatar">Choose an avatar image for yourself: </label>
            <input required type="file" name="avatar" id="avatar" className='border-4 border-green-500 px-4 ' onChange={(e) => setAvatar(e.target.files[0])}/> 
            <button type="submit" onClick={handleSubmit} className='bg-gray-600 px-4 py-2 rounded-md font-medium'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Register