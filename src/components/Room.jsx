import { useNavigate } from "react-router-dom"

export default function Room({ room }) {
    const navigate = useNavigate()

    function gotoRoom() {
        navigate(`room${room.name}`)
    }

    return (
        <>
            <div style={{ backgroundColor: room.color, border: 'solid 2px purple', fontWeight: 'bold', alignContent:"center",
                 width: 100, height: 100, marginTop:10, marginBottom:10, cursor:"pointer"}} onClick={() => gotoRoom()} >{room.name}
                
            </div>
        </>
    )
}
