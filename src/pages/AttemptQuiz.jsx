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
            <div className='w-full h-[88%] flex gap-1'>

                <div className='w-full h-[100%] bg-red-600 flex flex-col items-center justify-start pt-10'>
                    <div>
                        <h1 className='text-2xl'>{currentQuestion?.question}</h1>
                    </div>
                    <div className='w-[80%] min-h-56 flex flex-wrap justify-center bg-yellow-200 mt-4'>
                        {
                            !questionsFetchedSuccessfully ? <h1>Loading...</h1> : currentQuestion?.options.map((ele, index) => {
                                // console.log(ele);
                                return <div key={index} className='w-1/3 h-1/3 bg-green-600 my-1 mx-3 px-3 flex justify-start items-center gap-5'>
                                    <input type="checkbox" name={`${ele._id}`} id={`${ele._id}`} value={ele.option} onClick={
                                        (e) => {


                                            for(let i=0; i<currentQuestion.options.length; ++i) {
                                                if (currentQuestion.options[i]._id == e.target.id) {
                                                    if (e.target.checked) {
                                                        // selectedAnswers.push(ele._id)
                                                        currentQuestion.options[i].isSelected = true
                                                    } else {
                                                        // selectedAnswers.pop(ele._id)
                                                        currentQuestion.options[i].isSelected = false
                                                    }
                                                }
                                            }
                                            // console.log(selectedAnswers);
                                        }
                                    } />
                                    <h2>{ele.option}</h2>
                                </div>
                            })
                        }
                    </div>

                    <div className='w-[80%] min-h-24 bg-cyan-600 mt-5 flex justify-center items-center gap-7' >
                        <button className='w-1/6 h-4/6 text-lg hover:bg-cyan-500 border-2 border-white py-2 px-3' onClick={handleSaveAndNext} >Save and next</button>
                        <button className='w-1/6 h-4/6 text-lg hover:bg-cyan-500 border-2 border-white py-2 px-3 ' onClick={handleEndQuiz}>End Quiz</button>
                        <button onClick={() => console.log(currentQuestion)}>get answer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttemptQuiz