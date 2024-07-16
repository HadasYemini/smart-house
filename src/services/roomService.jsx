import { fetchService } from './fetchService';

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

export const roomService = {
    getRooms: async () => {
        try {
            const data = await fetchService('/getRooms', 'GET');
            return data.rooms;
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw new Error('Failed to fetch rooms. Please try again later.');
        }
    },

    saveRooms: async (rooms) => {
        try {
            const data = await fetchService('/saveRooms', 'POST', { rooms });
            console.log('Rooms saved');
            return data.message;
        } catch (error) {
            console.error('Error saving rooms:', error);
            throw new Error('Failed to save rooms. Please try again later.');
        }
    },

    //? debounced save function that triggers after a short delay whenever the rooms data changes. 
    debouncedSaveRooms: debounce(async (rooms) => {
        console.log('debouncedSaveRooms')
        try {
            await roomService.saveRooms(rooms);
            console.log('Rooms saved automatically');
        } catch (error) {
            console.error('Error in auto-save:', error);
        }
    }, 2000) // 2000ms delay

};