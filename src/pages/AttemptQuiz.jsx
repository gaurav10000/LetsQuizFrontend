import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Dashboard from '../components/Dashboard'

const AttemptQuiz = (props) => {
    const navigate = useNavigate()
    const [currentQuestion, setCurrentQuestion] = useState()
    const [questionsToSkip, setquestionsToSkip] = useState(0)
    const [questionsFetchedSuccessfully, setQuestionsFetchedSuccessfully] = useState(false)
    const quizCode = useParams().quizCode


    const handleSaveAndNext = () => {
        const data = {
            quizCode: quizCode,
            questionId: currentQuestion._id,
            options: currentQuestion.options,
        }

        document.querySelectorAll('input[type="checkbox"]').forEach((ele) => {
            ele.checked = false
        })

        axios.post('http://localhost:8080/api/v1/solution/submitSolution', data, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }).then((response) => {
            console.log(response);
            getQuizQuestions(questionsToSkip + 1)
            setquestionsToSkip(questionsToSkip + 1)
        }).catch((err) => {
            console.log(err);
        })
    }

    const getSubmittedSolutionforThisQuestion = () => {
        axios.get(`http://localhost:8080/api/v1/solution/getsubmittedSolutionforAQuestion/${quizCode}`, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    const getQuizQuestions = (questionsToSkip) => {
        axios.get(`http://localhost:8080/api/v1/question/getQuestion/${quizCode}/${questionsToSkip}/1`, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }).then((response) => {
            // console.log(response.data[0]);
            // setSelectedAnswers([])
            setCurrentQuestion(response.data[0])

            // currentQuestio.selectedAnswers = ['Nothing selected yet']
            // console.log(currentQuestion);

            setQuestionsFetchedSuccessfully(true)
        }).catch((err) => {
            // console.log(err);
            if (err.response.status == 404) {
                axios.put(`http://localhost:8080/api/v1/result/doneWithQuiz/${quizCode}`, {}, {
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    withCredentials: true
                }).then((response) => {
                    // console.log(response);
                    alert("All questions are done here, thank you for attempting this quiz!")
                    navigate('/quizzesPage')
                }).catch((err) => {
                    console.log(err);
                })
            }
        })
    }

    const handleEndQuiz = (e) => {
        axios.put(`http://localhost:8080/api/v1/result/doneWithQuiz/${quizCode}`, {}, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }).then((response) => {
            console.log(response);
            alert("Thank you for attempting this Quiz")
            navigate('/quizzesPage')
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/result/getResult/${quizCode}`, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }).then((response) => {
            // console.log(response);
        }).catch((err) => {
            // console.log(err.response.status);
            if (err.response.status === 409) {
                // console.log('Quiz not attempted yet');
                alert('Quiz Already Attempted')
                navigate('/quizzesPage')
            }
        })
        getQuizQuestions(questionsToSkip)

    }, [])

    return (
        <div className='w-full h-dvh'>
            <Dashboard />
            <div className='w-full h-[88%] bg-gray-700 flex flex-col justify-start items-center pt-4' >
                <div className='text-3xl text-white font-bold'>Attempt Quiz</div>
                <div className='bg-gray-800 w-[50%] h-[70%] flex flex-col justify-around items-center rounded-lg mt-10 py-10 px-36'>
                    <div className='text-2xl text-white font-bold'>{currentQuestion?.question}</div>
                    <div className='w-full Options-Container flex flex-col gap-3'>
                        {questionsFetchedSuccessfully && currentQuestion?.options.map((ele, index) => (
                            <div key={index} className='option flex gap-4 items-center'>
                                <input type="checkbox" name={`${ele._id}`} id={`${ele._id}`} value={ele.option} onClick={
                                    (e) => {
                                        for (let i = 0; i < currentQuestion.options.length; ++i) {
                                            if (currentQuestion.options[i]._id == e.target.id) {
                                                if (e.target.checked) {
                                                    currentQuestion.options[i].isSelected = true
                                                } else {
                                                    currentQuestion.options[i].isSelected = false
                                                }
                                            }
                                        }
                                    }
                                } />
                                <label htmlFor={ele.option} className='w-full '>{ele.option}</label>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-between w-[80%]'>
                        <button onClick={handleSaveAndNext} className='bg-blue-500 text-white p-2 rounded-lg'>Save and Next</button>
                        <button onClick={handleEndQuiz} className='bg-red-500 text-white p-2 rounded-lg'>End Quiz</button>
                        {/* <button onClick={() => console.log(currentQuestion)}>current question</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttemptQuiz