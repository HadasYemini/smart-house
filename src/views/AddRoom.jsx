import React, { useContext, useState } from 'react'
import SelectRoom from '../components/SelectRoom'
import { roomsContext } from '../context/roomsContext'
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';

export default function AddRoom() {
  const [room, setRoom] = useState({})
  const { rooms, setRooms } = useContext(roomsContext)
  const navigate = useNavigate()

  function addProp(key, value) {
    setRoom({ ...room, [key]: value })
  }

  function createRoom() {
    if (!room.type) {
      alert(`You need to select a room`)
      navigate("/")
      return
    }
    if (!room.name) {
      alert(`Please choose a name`)
      navigate("/")
      return
    }
    setRooms({ ...rooms, ['room' + room.name]: room })
    navigate("/")
  }

  return (
    <div className='bg-slate-50 border-solid border-4 border-indigo-500 flex-col flex justify-between p-10 items-center font-bold'
      style={{ width: 600, height: 500 }}>
      <Header />
      <SelectRoom addProp={addProp} />
      <input type="text" maxLength={9} placeholder='Please choose a name' onChange={(e) => addProp('name', e.target.value)}
        className='text-lg p-2 w-3/5 border-indigo-300 border-solid border-2' />
      <input type="text" placeholder='Please choose a color' onChange={(e) => addProp('color', e.target.value)}
        className='text-lg p-2 w-3/5 border-indigo-300 border-solid border-2' />
      <button onClick={createRoom} className='text-lg p-2 text-center border-indigo-200 bg-indigo-200 border-solid border-4 my-10'>Create room</button>
    </div>

  )
}
