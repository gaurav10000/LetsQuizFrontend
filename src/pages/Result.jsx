import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Result = () => {

    const quizCode = useParams().quizCode
    const [result, setResult] = useState([])
    const [isResultFetched, setIsResultFetched] = useState(false)

    const getQuizResult = (quizCode) => {
        axios.get(`http://localhost:8080/api/v1/solution/getSubmittedSolutionsForAQuiz/${quizCode}`, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }).then((response) => {
            console.log(response.data.data);
            setResult(response.data.data)
            setIsResultFetched(true)
            // console.log(result);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
      getQuizResult(quizCode)
    // console.log(QuizCode);
    }, [])
    

  return (
    <div className='w-full h-dvh'>
        <Dashboard/>
        <div className='w-full h-[88%] gap-1 flex justify-center items-center bg-blue-500'>
            <div className='w-[80%] h-[90%] bg-slate-500 flex flex-col gap-5 items-center overflow-auto py-10 '>
                {
                    !isResultFetched ? <h1>Loading</h1> : result.map((element, index) => {
                        return <div key={index} className='w-[90%] min-h-[70%] bg-green-500 flex gap-4 flex-col justify-start items-center p-10'>
                            <h1>{element.questionId.question}</h1>
                            <div className='w-[80%] min-h-[80%] bg-yellow-500 flex flex-wrap gap-10 justify-center items-center text-center py-5'>
                                {
                                    !isResultFetched ? <h1>Loading</h1> : element.options.map((ele, index) => {
                                        return <div key={index} className={`border-2 w-[40%] h-[40%] py-3 px-2 ${ele.isCorrect ? 'bg-green-700': ele.isSelected ? 'bg-red-700': ''} `}>
                                            {ele.option}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Result