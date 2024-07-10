import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { roomsContext } from '../context/roomsContext'
import Room from '../components/Room';
import homeIcon from './../assets/home.svg'
import Header from '../components/Header';

export default function HomePage() {
  const navigate = useNavigate()
  const { rooms, setRooms } = useContext(roomsContext)

  function addRoom() {
    navigate("/addroom")
  }

  return (
    <>
      <div className='p-5 bg-slate-50 border-solid border-4 border-indigo-500 flex-col flex justify-between items-center font-bold'
        style={{ width: 600, height: 600, overflowY: 'auto' }}>
          <Header />
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', flexWrap: 'wrap' }}>
          {rooms ? Object.keys(rooms).map((key) => <Room key={key} room={rooms[key]} />) : <></>}
        </div>
        <button className="border-solid border-4 border-indigo-200 bg-indigo-200 p-15 w-fit my-3" onClick={addRoom}>Add Room</button>
      </div>
    </>
  )
}
