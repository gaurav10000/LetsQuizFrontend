import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'


const CreateQuiz = () => {

  
  
  const generateQuizCode = () => {
    const quizCode = Math.random().toString(36).substring(2, 8)
    return quizCode
  }
  
  const navigate = useNavigate()
  const [quizCode, setQuizCode] = useState(generateQuizCode())
  const [quizTitle, setQuizTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [availableAfter, setavailableAfter] = useState('')
  const [availableTill, setavailableTill] = useState('')
  const [totalTimeLimit, setTotalTimeLimit] = useState('')


  const handleSubmit = () => {
    axios.post('http://localhost:8080/api/v1/quiz/createQuiz', {
      quizCode: quizCode,
      quizTitle: quizTitle,
      subject: subject,
      availableAfter: availableAfter,
      availableTill: availableTill,
      totalTimeLimit: totalTimeLimit
    }, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    }).then((res) => {
      Cookies.set('quizCode', `${quizCode}`)
      // alert(res.status + " " + res.statusText)
      alert('Quiz Details Added Successfully, Now Add Questions to the Quiz')
      navigate('/addingQuestions')
    }).catch((err) => {
      console.log(err)
      alert(err.response.status + " " + err.response.statusText)
      navigate('/quizzesPage')
    })
  }

  const handleCancel = (e) => {
    navigate('/quizzesPage')
  }

  return (
    <div className='bg-[#36454F] w-full h-dvh'>
      <Dashboard />
      <div className='bg-gray-700 w-full h-[88%] flex flex-col justify-center items-center'>
        <div className='bg-gray-800 w-[40%] h-[70%] flex flex-col justify-center items-center rounded-lg'>
          <div className='text-3xl text-white font-bold'>Create Quiz</div>
          <div className='text-1xl text-white font-bold mt-4'>Quiz Code: {quizCode}</div>

          <div className='flex flex-col justify-center items-center mt-4'>
            <input type='text' placeholder='Quiz Title' className='w-[80%] h-10 rounded-lg bg-gray-800 text-white pl-2' onChange={(e) => setQuizTitle(e.target.value)} />
            <input type='text' placeholder='Subject' className='w-[80%] h-10 rounded-lg bg-gray-800 text-white pl-2 mt-4' onChange={(e) => setSubject(e.target.value)} />
            <input type='datetime-local' placeholder='Available After' className='w-[80%] h-10 rounded-lg bg-gray-800 text-white pl-2 mt-4' onChange={(e) => setavailableAfter(e.target.value)} />
            <input type='datetime-local' placeholder='Available Till' className='w-[80%] h-10 rounded-lg bg-gray-800 text-white pl-2 mt-4' onChange={(e) => setavailableTill(e.target.value)} />
            {/* <input type='number' placeholder='Total Time Limit (in minutes)' className='w-[80%] h-10 rounded-lg bg-gray-800 text-white pl-2 mt-4' onChange={(e) => setTotalTimeLimit(e.target.value)} /> */}
          </div>
          <div className='flex justify-center items-center mt-4'>
            <button className='w-20 h-10 bg-blue-500 text-white rounded-lg' onClick={handleSubmit}>Create</button>
            <button className='w-20 h-10 bg-red-500 text-white rounded-lg ml-4' onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreateQuiz