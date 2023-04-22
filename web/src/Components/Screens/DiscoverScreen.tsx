import { useNavigate } from "react-router-dom";
import Header from "../Header";
import PageTitle from "../PageTitle";
import AppletScreen from "./AppletScreen";
import '../../Styles/DiscoverScreen.css'
const ArrowApplet = require('../../assets/ArrowApplet.png')

export default function DiscoverScreen() {
    const navigate = useNavigate()

    return (
        <div style={{flex: 1}}>
            <Header />
            <div className="content">
                <PageTitle>Discover</PageTitle>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '2%', backgroundColor: ''}}>
                    <div style={{width: '35%'}}>
                        <h1 style={{color: '#D3DCFF', fontSize: '150%', fontFamily: 'Amoreiza', textAlign: 'center'}}>
                            Connect to the platforms of your choice, choose your Action and the REActions associated with them.
                        </h1>
                        <h1 style={{color: '#D3DCFF', fontSize: '150%', fontFamily: 'Amoreiza', textAlign: 'center', marginTop: '15%'}}>
                            1. From the main menu choose your Action and REAction
                        </h1>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', marginTop: '4%', width: '50%', marginLeft: '25%'}}>
                    <div style={{marginLeft: '15%', width: '25%', backgroundColor: '', display: 'flex', flexDirection: 'column', alignItems: 'center'}}> {/* Action ==> flex-direction: column */}
                        <div className='Action' onClick={() => navigate('/search')}>
                            <img src={require('../../assets/Croix2.png')} style={{width: '65%', marginTop: '25%', marginBottom: '25%', marginLeft: '18%'}} />
                        </div>
                        <p style={{marginTop: '25%', fontSize: '300%', fontFamily: 'Atomsfer', fontWeight: 'bold', color: '#d3dcff'}}>ACTION</p>
                    </div>

                    <div style={{width: '10%', backgroundColor: '', marginLeft: '5%'}}>
                        <div style={{position: 'relative', height: '20%', borderRight: '4px solid #3A3F86', marginRight: '50%'}} />
                        <img src={ArrowApplet}  style={{width: '70%', marginTop: '15%', marginLeft: '15%'}} />
                        <div style={{position: 'relative', height: '30%', borderRight: '4px solid #3A3F86', marginRight: '50%', marginTop: '20%'}} />
                    </div>

                    <div style={{marginLeft: '5%', width: '25%', backgroundColor: '', display: 'flex', flexDirection: 'column', alignItems: 'center'}}> {/* Action ==> flex-direction: column */}
                        <div className='Action' onClick={() => navigate('/search')}>
                            <img src={require('../../assets/Croix2.png')} style={{width: '65%', marginTop: '25%', marginBottom: '25%', marginLeft: '18%'}} />
                        </div>
                        <p style={{marginTop: '25%', fontSize: '300%', fontFamily: 'Atomsfer', fontWeight: 'bold', color: '#d3dcff'}}>REACTION</p>
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'center', marginTop: '5%', backgroundColor: ''}}>
                    <div style={{width: '35%'}}>
                        <h1 style={{color: '#D3DCFF', fontSize: '150%', fontFamily: 'Amoreiza', textAlign: 'center'}}>
                            Connect to the platforms of your choice, choose your Action and the REActions associated with them.
                        </h1>
                        <img className="choosePlatform" style={{width: '100%', marginTop: '4%'}} src={require('../../assets/servicesMenu.png')} alt="servicesMenu" onClick={() => navigate('/search')} />
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'center', marginTop: '5%', backgroundColor: '', marginBottom: '10%'}}>
                    <div style={{width: '70%', display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '45%'}}>
                            <h1 style={{color: '#D3DCFF', fontSize: '150%', fontFamily: 'Amoreiza', textAlign: 'center', marginTop: '15%'}}>
                                3. Choose your Action
                            </h1>
                            <img className="choosePlatform" style={{width: '100%', marginTop: '4%'}} src={require('../../assets/discoverAction.png')} alt="servicesMenu" onClick={() => navigate('/services/spotify')} />
                        </div>
                        <div style={{width: '45%'}}>
                            <h1 style={{color: '#D3DCFF', fontSize: '150%', fontFamily: 'Amoreiza', textAlign: 'center', marginTop: '15%'}}>
                                4. Choose your REAction
                            </h1>
                            <img className="choosePlatform" style={{width: '100%', marginTop: '4%'}} src={require('../../assets/discoverReaction.png')} alt="servicesMenu" onClick={() => navigate('/services/outlook')} />
                        </div>
                    </div>
                </div>

                {/* <div style={{display: 'flex', justifyContent: 'center', marginTop: '6%', backgroundColor: ''}}>
                    <div style={{width: '35%'}}>
                        <h1 style={{color: '#D3DCFF', fontSize: '150%', fontFamily: 'Amoreiza', textAlign: 'center'}}>
                            4. Examples of AREAs
                        </h1>
                    </div>
                </div> */}

            </div>
        </div>
    )
}