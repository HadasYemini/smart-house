import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import React, { useState } from 'react';
import HomePage from './views/HomePage'
import AddRoom from './views/AddRoom'
import { roomsContext } from './context/roomsContext'
import RoomPage from './views/RoomPage';

function App() {
  const [rooms, setRooms] = useState({})

  return (
    <>
      <roomsContext.Provider value={{ rooms, setRooms }} >
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/addroom' element={<AddRoom />} />
          <Route path='/room' element={<RoomPage />} />
          <Route path=':inputValue' element={<RoomPage />} />
        </Routes>
      </roomsContext.Provider>
    </>
  )
}

export default App
