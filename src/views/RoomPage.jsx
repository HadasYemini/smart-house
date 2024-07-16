import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { roomsContext } from '../context/roomsContext';
import Device from '../components/Device';
import AddDevice from '../components/AddDevice';
import Header from '../components/Header';
import { roomService } from '../services/roomService';

export default function RoomPage() {
  const { inputValue } = useParams();
  const { rooms, setRooms } = useContext(roomsContext)
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const navigate = useNavigate()

  function updateRoom(device) {
    let room = { ...rooms[inputValue] }
    if (device === '') {
      alert(`You need to select a device`)
      setVisible(!visible)
      return
    }
    if (device === 'Water Heater' && room.type != 'Bathroom') {
      alert(`It is not possible to add an ${device.toLowerCase()} to the ${room.type.toLowerCase()}`)
      setVisible(!visible)
      return
    }
    if (device === 'Stereo system' && room.devices && room.devices.find(elem => elem.name === 'Stereo system')) {
      alert(`There is a stereo system in the ${room.type.toLowerCase()}`)
      setVisible(!visible)
      return
    }
    room.devices = room.devices ? [...room.devices, { name: device, on: false }] : [{ name: device, on: false }]
    setRooms({ ...rooms, [inputValue]: room })
    setVisible(!visible)
  }

  function updateOnOffDevice(index) {
    let room = { ...rooms[inputValue] }
    room.devices[index].on = !room.devices[index].on
    setRooms({ ...rooms, [inputValue]: room })
  }

  async function saveRoomsAndNavigate() {
    setSaving(true)
    setSaveError(null)
    try {
      await roomService.saveRooms(rooms)
      navigate("/")
    } catch (error) {
      setSaveError(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className='bg-slate-50 border-solid border-4 border-indigo-600 flex-col flex font-bold p-10'
        style={{ width: 600, height: 470 }}>
        <Header />
        <div className='flex justify-between py-5'>
          <div className='flex flex-col py-10 text-xl font-bold text-right'>
            <h2 className=''>Room name: {rooms[inputValue]?.name}</h2>
            <h2 className='py-5'>Room type: {rooms[inputValue]?.type}</h2>
          </div>
          <div>
            {rooms[inputValue]?.devices?.map((device, index) =>
              <Device key={index} device={device} index={index} updateOnOffDevice={updateOnOffDevice} />)}
          </div>
        </div>
        {!visible && (!rooms[inputValue]?.devices || Object.keys(rooms[inputValue].devices)?.length < 5) ?
          <div className='flex justify-end'>
            <button className='right-0 border-solid border-4 border-indigo-200 bg-indigo-200 my-5'
              onClick={() => setVisible(!visible)}>Add Device</button>
          </div>
          : <></>}
      </div>
      {visible ?
        <AddDevice updateRoom={updateRoom} />
        : <></>}

      <button
        onClick={saveRoomsAndNavigate}
        disabled={saving}
        className='text-lg p-2 text-center border-indigo-200 bg-indigo-200 border-solid border-4 mt-5'
      >
        {saving ? 'Saving...' : 'Save and Return Home'}
      </button>
      {saveError && <p className="text-red-500 mt-2">{saveError}</p>}

    </div>
  )
}
