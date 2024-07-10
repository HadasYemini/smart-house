import React from 'react'

export default function SelectDevice({addDevice}) {
    const elements = ["Air-Conditioner","Lamp", "Stereo system","Water Heater"]
 
    return (
        <>
            <select onChange={(e) => addDevice(e.target.value)} className='text-lg p-2 w-3/5 text-center border-indigo-600 border-solid border-2'>
                <option value="">Please select a device</option>
                {elements.map((element, index) => (
                    <option key={index} value={element}>{element}</option>
                ))}
            </select>
        </>
    )
  }
