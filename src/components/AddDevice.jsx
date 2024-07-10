
import SelectElement from "./SelectDevice"
import { useState } from "react"

export default function AddDevice({ updateRoom }) {
    const [device, setDevice] = useState('')

    return (
        <>
            <div className='mt-5 bg-slate-50 border-solid border-4 border-indigo-600 flex-col flex font-bold p-10 justify-center items-center'>
                <SelectElement addDevice={(device)=>setDevice(device)} />
                <div className='flex size-3/5'>
                    <button className='right-0 border-solid border-4 border-indigo-200 bg-indigo-200 mt-10' 
                    onClick={() => updateRoom(device)}>Add</button>
                </div>
            </div>

        </>
    )
}
