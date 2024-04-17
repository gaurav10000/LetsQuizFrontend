import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const Leaderboard = () => {

    const quizCode = useParams().quizCode
    const [isResultFetched, setIsResultFetched] = useState(false)
    const [leaderboard, setLeaderboard] = useState([])

    const fetchLeaderboard = (quizCode) => {
        axios.get(`http://localhost:8080/api/v1/result/fetchLeaderboard/${quizCode}`, {
            headers: {
                "Content-Type": "Application/json"
            }, withCredentials: true
        }).then((response) => {
            console.log(response);
            setLeaderboard(response.data.data)
            setIsResultFetched(true)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchLeaderboard(quizCode)
    }, [])


    return (
        <div className='w-full h-dvh'>
            <Dashboard />
            <div className='w-full h-[88%] gap-1 flex flex-col justify-center items-center bg-[#36454F]'>
                <div className='w-[80%] h-[90%] bg-slate-500 flex flex-col gap-5 items-center overflow-auto py-10'>
                <h1 className='text-5xl'> <u >LeaderBoard</u> </h1>
                    {
                        !isResultFetched ? <h1>Loading</h1> : leaderboard.length == 0 ? <h1 className='text-5xl'>Nothing to show yet...</h1> : leaderboard.map((element, index) => {
                            return <div key={index} className='w-[90%] min-h-[10%] bg-green-500 flex gap-4 justify-start items-start py-3 px-4'>
                                <div className='w-[10%] h-full bg-slate-600 flex justify-center py-5'>{index + 1}</div>
                                <div className='w-[70%] h-full bg-slate-600 flex justify-center py-5'>{element.userId.username}</div>
                                <div className='w-[20%] h-full bg-slate-600 flex justify-center py-5'>{element.score}</div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Leaderboard