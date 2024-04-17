import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Dashboard from '../components/Dashboard';

const QuizzesPage = () => {

    const [activeQuizzes, setActiveQuizzes] = useState({})
    // const navigate = useNavigate()

    const getActiveQuizzes = () => {
        axios.get('http://localhost:8080/api/v1/quiz/activeQuizzes', {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }).then((response) => {
            setActiveQuizzes(response.data.data)
        })
    }

    getActiveQuizzes()

    return (
        <div className='bg-[#36454F] w-full h-dvh'>

            <Dashboard />

            <div className='mt-2'>
                <h1 className='text-5xl text-center'>Quizzes</h1>
                <div className=' flex justify-center'>
                    <div className='w-11/12 flex flex-col flex-wrap gap-5 mt-5'>
                        <h2 className='text-2xl'>Active Quizzes</h2>
                        <div className='w-11/12 px-5 py-7 flex gap-5 mt-2 bg-black overflow-x-scroll' >
                            {activeQuizzes.length > 0 ? activeQuizzes.map((quiz, index) => {
                                return (
                                    <div key={index} id={index} className='min-w-[20rem] bg-blue-300 p-5 rounded-md flex flex-col gap-2'>
                                        <h2>{index}</h2>
                                        <h2 className='text-2xl'>{quiz.quizTitle}</h2>
                                        <p className='text-lg'>{quiz.quizDescription}</p>
                                        <Link to={`/attemptQuiz/${quiz.quizCode}`} className='w-1/2 bg-blue-500 text-white p-2 rounded-md'>Attempt Quiz</Link>
                                    </div>
                                );
                            }) : <h2 className='text-2xl'>No Active Quizzes</h2>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizzesPage