import '../Styles/LogoAndDescription.css'


const Logo = require('../assets/logo.png')
const descriptionArea = "Automation platform of his digital life"


export default function LogoAndDescription() {
    return (
        <div className='leftContainer'>
            <div className='logoContainer'>
                <img src={Logo} className='logo' />
            </div>
            <div className='descriptionContainer'>
                <p className='description'>
                    {descriptionArea}
                </p>
            </div>
        </div>
    )
}