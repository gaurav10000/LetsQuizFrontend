import React, { useState } from 'react'
import Dashboard from '../components/Dashboard'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddingQuestions = () => {

  const navigate = useNavigate()


  // const handleChechBoxClick = (e) =>{
  //   console.log(e.target.nextSibling.value);
  // }

  const handleAddQuestion = (e) => {
    const question = document.querySelector('input[type="text"]').value
    const options = document.querySelectorAll('.option')
    const optionsArray = []
    options.forEach(option => {
      const optionObj = {
        option: option.querySelector('input[type="text"]').value,
        isCorrect: option.querySelector('input[type="checkbox"]').checked
      }
      optionsArray.push(optionObj)
    })
    // console.log(question, optionsArray)

    const quizCode = Cookies.get('quizCode')

    axios.post('http://localhost:8080/api/v1/question/addQuestion', {
      quizCode: quizCode,
      question: question,
      options: optionsArray
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then(res => {
      console.log(res.data)
      alert('Question has been added to quiz')
      location.reload()
    }).catch(err => {
      console.log(err)
      alert('Something has happend, please try again.')
    })
    
  }


  const handleCloneInputField = (e) => {
    const optionsContainer = document.querySelector('.Options-Container')
    const newOptionField = document.querySelector('.option').cloneNode(true)
    newOptionField.querySelector('input[type="checkbox"]').name = 'Option ' + (optionsContainer.children.length + 1)
    newOptionField.querySelector('input[type="checkbox"]').id = 'Option ' + (optionsContainer.children.length + 1)
    newOptionField.querySelector('input[type="checkbox"]').checked = false
    newOptionField.querySelector('input[type="text"]').value = ''
    newOptionField.querySelector('input[type="text"]').placeholder = 'Option ' + (optionsContainer.children.length + 1)
    optionsContainer.appendChild(newOptionField)
    
  }

  const handleDone = (e) => {
    alert("Questions has been added to the quiz!")
    navigate('/quizzesPage')
  }

  return (
    <div className='bg-blue-600 w-full h-dvh'>
      <Dashboard />
      <div className='bg-gray-700 w-full h-[88%] flex flex-col justify-center items-center'>
        <h1 className='text-2xl my-2'>Lets start with some details about the quiz</h1>
        <div className='w-[96%] h-[90%] border-2 border-dashed border-black flex flex-col justify-center items-center gap-5 px-10 text-center'>
          <div className='w-full flex flex-col justify-center items-center gap-4 '>
            <input type='text' placeholder='Enter the question' className='w-[80%] h-10' />
            <div className='w-full flex flex-col justify-center items-center gap-4 Options-Container'>
              <div className='flex gap-3 justify-center w-full option'>
                <input type="checkbox" name="Option 1" id="Option 1" />
                <input type='text' placeholder='Option 1' className='w-[80%] h-10' />
              </div>
              <div className='flex gap-3 justify-center w-full option'>
                <input type="checkbox" name="Option 2" id="Option 2" />
                <input type='text' placeholder='Option 2' className='w-[80%] h-10' />
              </div>
            </div>
          </div>

          <div className='w-full flex justify-around'>
            <button className='w-[30%] text-lg hover:bg-cyan-500 border-2 border-white py-2 px-3' onClick={handleCloneInputField}>Add another option</button>
            <button className='w-[30%] text-lg hover:bg-cyan-500 border-2 border-white py-2 px-3' onClick={handleAddQuestion}>Add Question</button>
            <button className='w-[30%] text-lg hover:bg-cyan-500 border-2 border-white py-2 px-3' onClick={handleDone}>Done</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddingQuestions