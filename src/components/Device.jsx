import { useEffect, useState } from 'react'

export default function Device({ device,index,updateOnOffDevice }) {
    const [on, setOn] = useState(device.on)

    function onOffDevice() {
        updateOnOffDevice(index)
        setOn(o => !o)
    }

    return (
        <>
            <div style={{ backgroundColor: on ? 'green' : 'red' }}
                className='cursor-pointer border-solid border-teal-100 border-4 p-1 mb-2 rounded-md'
                onClick={onOffDevice} >{device.name}
            </div>
        </>
    )
}
