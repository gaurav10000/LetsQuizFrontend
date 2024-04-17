import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username || !password) {
            alert('Please fill all fields')
            return
        }

        axios.post('http://localhost:8080/api/v1/users/login', {
            username: username,
            password: password
        }, {
            withCredentials: true,
        })
        .then((res) => {
            navigate('/quizzesPage')
        })
        .catch((err) => {
            alert(err)
            console.log(err);
        })
    }

    const checkIfUserIsLoggedIn = () => {
        axios.get('http://localhost:8080/api/v1/users/isUserLoggedIn', {
            withCredentials: true
        }).then((res) => {
            // console.log(res.data.statusCode);
            // setIsUserLoggedIn(res.data.statusCode)
            if (res.data.statusCode === 200) {
                navigate('/quizzesPage')
            }
        }).catch((err) => {
            console.log(err.response);
            if (err.response.status === 401) {
                // setIsUserLoggedIn(false)
                navigate('/user/login')
            }

        })
    }

    checkIfUserIsLoggedIn()

  return (
    <div className='h-dvh'>
        <Navbar/>
        <div className='flex flex-col items-center justify-center gap-3 m-4 min-h-5 border-4 border-green-500'>
            <h1 className='text-2xl'>Login</h1>
            <form className='border-4 border-blue-500 flex flex-col justify-center items-center gap-5  w-1/2 h-3/4 py-5 mb-5'>
                <input required type="text" name='username' placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} className='border-4 border-green-500 px-4 ' />
                <input required type="password" name="password" id="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} className='border-4 border-green-500 px-4 ' />
                <button type="submit" onClick={handleSubmit} className='bg-gray-600 px-4 py-2 rounded-md font-medium'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Login