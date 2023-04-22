import { useNavigate } from "react-router-dom"

export default function BackButton() {
    const navigate = useNavigate()

    return (
        <div className='button' style={{left: '10%'}} onClick={() => navigate('/search')}>
            <h2 style={{color: '#D3DCFF', fontFamily: 'Amoreiza', fontSize: '34px'}}>Back</h2>
        </div>
    )
}