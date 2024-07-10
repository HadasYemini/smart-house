import React from 'react'

export default function SelectRoom({ addProp }) {
    const roomTypes = ["Bedroom", "Bathroom", "toilet", "kitchen"]

    return (
        <>
            <select onChange={(e) => addProp('type', e.target.value)}
                className='text-lg p-2 w-3/5 text-center border-indigo-300 border-solid border-2'>
                <option value="">Please select a room</option>
                {roomTypes.map((room, index) => (
                    <option key={index} value={room}>{room}</option>
                ))}
            </select>
        </>
    )

}
