import '../Styles/CreateApplet.css'
import { useNavigate } from 'react-router-dom';

const Croix = require('../assets/Croix.png')

export default function CreateApplet() {
    const navigate = useNavigate();

    return (
        <div className="createAppletContainer" onClick={() => navigate('/services')}>
            <img src={Croix} style={{width: '50%'}} />
        </div>
    )
}