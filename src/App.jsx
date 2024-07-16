import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react';
import HomePage from './views/HomePage'
import AddRoom from './views/AddRoom'
import { roomsContext } from './context/roomsContext'
import RoomPage from './views/RoomPage';
import { roomService } from './services/roomService';

function App() {
  const [rooms, setRooms] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const fetchedRooms = await roomService.getRooms();
        setRooms(fetchedRooms);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching rooms');
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

   // Wrap setRooms in useCallback to prevent unnecessary re-renders
   const updateRooms = useCallback((newRooms) => {
    setRooms(newRooms);
    roomService.debouncedSaveRooms(newRooms);
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (Object.keys(rooms).length === 0) return <div>No rooms available</div>;

  return (
    <>
      <roomsContext.Provider value={{ rooms, setRooms:updateRooms }} >
        <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path='/addroom' element={<AddRoom />} />
          <Route path='/room' element={<RoomPage />} />
          <Route path=':inputValue' element={<RoomPage />} />
        </Routes>
      </roomsContext.Provider>
    </>
  )
}

export default App
