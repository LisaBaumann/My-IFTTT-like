import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import '../../Styles/AppletScreen.css'
import { useState, useEffect, useContext } from "react";

import { AreaContext } from "../../Contexts/AreaContext"

import { sendAppletInfos } from "../../Api";
import PageTitle from "../PageTitle";

const Croix = require('../../assets/Croix2.png')

const Bin = require('../../assets/bin.png')
const BinSelected = require('../../assets/BinSelected.png')

const Pen = require('../../assets/Pen.png')
const PenSelected = require('../../assets/PenSelected.png')

const ArrowApplet = require('../../assets/ArrowApplet.png')

const ArrowLeft = require('../../assets/arrow-left.png')
const ArrowLeftHover = require('../../assets/arrow-left-hover.png')
const ArrowRight = require('../../assets/arrow-right.png')
const ArrowRightHover = require('../../assets/arrow-right-hover.png')

const Gmail = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Gmail.png'
const Outlook = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Outlook.png'
const Github = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Github.png'
const Onedrive = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Onedrive.png'
const Googledrive = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Googledrive.png'
const Twitch = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Twitch.png'
const Spotify = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Spotify.png'
const Slack = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Slack.png'
const GoogleCalendar = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/GoogleCalendar.png'
const Teams = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Teams.png'

const servicesImages = [Croix, Gmail, Outlook, Github, Onedrive, Googledrive, Twitch, Spotify, Slack, GoogleCalendar, Teams]
const servicesNamesURL = ['', 'gmail', 'outlook', 'github', 'onedrive', 'googledrive', 'twitch', 'spotify', 'slack', 'googlecalendar', 'teams']
const servicesImagesNames = ['', 'Gmail', 'Outlook', 'Github', 'Onedrive', 'Google Drive', 'Twitch', 'Spotify', 'Slack', 'Google Calendar', 'Teams']

export default function AppletScreen() {
    const navigate = useNavigate()
    const { reactionService } = useContext(AreaContext)

    const [inActionZone, setInActionZone] = useState(false)
    const [inReactionZone, setInReactionZone] = useState(false)
    const [penImage, setPenImage] = useState(false)
    const [binImage, setBinImage] = useState(false)
    const [arrowLeft, setArrowLeft] = useState(false)
    const [arrowRight, setArrowRight] = useState(false)

    const [selectedReactions, setSelectedReactions] = useState([])
    const [indexOfReaction, setIndexOfReaction] = useState(1)



    const [index, setIndex] = useState(0);
    useEffect(() => {
        let action = {}
        if (localStorage.getItem('action'))
            action = JSON.parse(Object(localStorage.getItem('action')))
        else
            return setIndex(0);
        
        servicesImagesNames.forEach((name, i) => {
            if (action['platform'] === name) {
                setIndex(i);
            }
        });
    }, []);
    const imageAction = servicesImages[index];

    useEffect(() => {
        if (localStorage.getItem('reaction')) {
            setSelectedReactions(JSON.parse(Object(localStorage.getItem('reaction'))))
        }
    }, [localStorage.getItem('reaction')])


    const getPenImage = () => {
        if (penImage === true)
            return PenSelected
        return Pen
    }

    const getBinImage = () => {
        if (binImage === true)
            return BinSelected
        return Bin
    }

    const getPlatformImage = () => {
        let platforms = []
        console.log(selectedReactions)
        if (selectedReactions.length === 0)
            return Croix;
        if (localStorage.getItem('platforms'))
            platforms = JSON.parse(Object(localStorage.getItem('platforms')))
        else return Croix;


        let imagePath = ''
        platforms.map((platform) => {
            const name = selectedReactions[indexOfReaction - 1]['platform']
            if (name === "Google Calendar")
                imagePath = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/GoogleCalendar.png'
            else if (name === platform['name'])
                imagePath = platform['imagePath']
        })
        
        if (imagePath !== '') {
            return imagePath
        }
        return Croix
    }


    const getArrowLeftImage = () => {
        if (arrowLeft === true)
            return ArrowLeftHover
        return ArrowLeft
    }

    const getArrowRightImage = () => {
        if (arrowRight === true)
            return ArrowRightHover
        return ArrowRight
    }


    const removeReaction = () => {
        if (selectedReactions.length === 0)
            return Croix;

        selectedReactions.splice(indexOfReaction - 1, 1)
        if (selectedReactions.length > 0) {
            localStorage.setItem('reaction', JSON.stringify(selectedReactions))
            setIndexOfReaction(indexOfReaction - 1)
            window.location.reload()
        } else {
            localStorage.removeItem('reaction')
            setIndexOfReaction(0)
            window.location.reload()
        }
    }

    const navigateToPlatform = () => {
        const obj = JSON.parse(JSON.stringify(selectedReactions[indexOfReaction - 1]).replace(/\s/g, '').toLowerCase())
        sessionStorage.setItem('modify', String(indexOfReaction - 1))
        navigate('/services/' + obj['platform'])
    }

    return (
        <div style={{width: '100%'}}>
            <Header />
            <div style={{paddingTop: '5%', backgroundColor: '', userSelect: 'none'}}>
                <PageTitle>Choose your AREA(s)</PageTitle>


                <div style={{backgroundColor: '', display: 'flex', flexDirection: 'row', marginTop: '2%'}}> {/* Total action + milieu + reaction ==> flex-direction: row */}

                    <div style={{marginLeft: '15%', width: '25%', backgroundColor: '', display: 'flex', flexDirection: 'column', alignItems: 'center'}}> {/* Action ==> flex-direction: column */}
                        {
                        inActionZone === false ? 
                            <div className='Action' onClick={() => navigate('/search')} onMouseEnter={() => { if (localStorage.getItem('action') !== null) setInActionZone(true)} }>
                                <img src={imageAction} style={{width: '65%', marginTop: '25%', marginBottom: '25%', marginLeft: '18%'}} />
                            </div>
                        :
                        <div className='ActionSelected' style={{backgroundColor: '#3A3F86', opacity: '0.6', position: 'relative'}} onMouseLeave={() => setInActionZone(false)}>
                            <img src={imageAction} style={{width: '65%', marginTop: '25%', marginBottom: '25%', marginLeft: '18%', position: 'absolute', zIndex: -1, opacity: '0.2'}} />
                            <div style={{display: 'flex'}}>
                                <img className="penSelected" src={getPenImage()} style={{width: '25%', height: '10%', marginLeft: '12%', marginTop: '39%', marginBottom: '36.7%'}} onClick={() => navigate('/services/' + String(servicesNamesURL[index]))} onMouseEnter={() => setPenImage(true)} onMouseLeave={() => setPenImage(false)}/>
                                <img className="binSelected" src={getBinImage()} style={{width: '30%', marginLeft: '20%', marginTop: '36.7%', marginBottom: '36.7%'}} onClick={() => {localStorage.removeItem('action'); window.location.reload()}} onMouseEnter={() => setBinImage(true)} onMouseLeave={() => setBinImage(false)} />
                            </div>
                        </div>
                        }
                        <p style={{marginTop: '25%', fontSize: '500%', fontFamily: 'Atomsfer', fontWeight: 'bold', color: '#d3dcff'}}>ACTION</p>
                    </div>




                    <div style={{width: '10%', backgroundColor: '', marginLeft: '5%'}}>
                        <div style={{position: 'relative', height: '25%', borderRight: '4px solid #D3DCFF', marginRight: '50%'}} />
                        <img src={ArrowApplet}  style={{width: '70%', marginTop: '15%', marginLeft: '15%'}} />
                        <div style={{position: 'relative', height: '42%', borderRight: '4px solid #D3DCFF', marginRight: '50%', marginTop: '20%'}} />
                    </div>

                    <div style={{marginLeft: '4%', display: 'flex', alignItems: 'center', width: '25%', backgroundColor: ''}}>
                        <div style={{backgroundColor: '', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative'}}> {/* Action ==> flex-direction: column */}
                            { selectedReactions.length !== 0 ?
                                <h2 style={{color: '#D3DCFF', position: 'absolute', left: '29%', top: '6%', fontFamily: 'Amoreiza'}}>({indexOfReaction}/{selectedReactions.length})</h2>
                            : null }
                            {
                                inReactionZone === false ? 
                                    <div className='Action' onClick={() => navigate('/search')} onMouseEnter={() => { if (selectedReactions.length !== 0) setInReactionZone(true)} }>
                                        <img src={getPlatformImage()} style={{width: '65%', marginTop: '25%', marginBottom: '25%', marginLeft: '18%'}} />
                                    </div>
                                :
                                <div className='ActionSelected' style={{backgroundColor: '#3A3F86', opacity: '0.6', position: 'relative'}} onMouseLeave={() => setInReactionZone(false)}>
                                    <img src={getPlatformImage()} style={{width: '65%', marginTop: '25%', marginBottom: '25%', marginLeft: '18%', position: 'absolute', zIndex: -1, opacity: '0.2'}} />
                                    <div style={{display: 'flex'}}>
                                        <img className="penSelected" src={getPenImage()} style={{width: '25%', height: '10%', marginLeft: '12%', marginTop: '39%', marginBottom: '36.7%'}} onClick={() => navigateToPlatform()} onMouseEnter={() => setPenImage(true)} onMouseLeave={() => setPenImage(false)}/>
                                        <img className="binSelected" src={getBinImage()} style={{width: '30%', marginLeft: '20%', marginTop: '36.7%', marginBottom: '36.7%'}} onClick={() => {removeReaction()}} onMouseEnter={() => setBinImage(true)} onMouseLeave={() => setBinImage(false)} />
                                    </div>
                                </div>
                            }
                            { selectedReactions.length > 1 ?
                                <div>
                                    <div className="arrow-left" onMouseEnter={() => setArrowLeft(true)} onMouseLeave={() => setArrowLeft(false)} onClick={() => { if (indexOfReaction > 1) setIndexOfReaction(indexOfReaction - 1);}}>
                                        <img src={getArrowLeftImage()} />
                                    </div>
                                    <div className="arrow-right" onMouseEnter={() => setArrowRight(true)} onMouseLeave={() => setArrowRight(false)} onClick={() => { if (indexOfReaction < selectedReactions.length) setIndexOfReaction(indexOfReaction + 1);}}>
                                        <img src={getArrowRightImage()} />
                                    </div>
                                </div>
                            : null}
                            { selectedReactions.length !== 0 ?
                                <>
                                    <h2 className="addMoreReactions" onClick={() => navigate('/search')}>Add more reactions +</h2>
                                    { selectedReactions.length > 1 ?
                                        <p style={{marginTop: '25%', fontSize: '500%', fontFamily: 'Atomsfer', fontWeight: 'bold', color: '#d3dcff'}}>REACTIONS</p>
                                    : <p style={{marginTop: '25%', fontSize: '500%', fontFamily: 'Atomsfer', fontWeight: 'bold', color: '#d3dcff'}}>REACTION</p>
                                    }
                                </>
                            : <p style={{marginTop: '25%', fontSize: '500%', fontFamily: 'Atomsfer', fontWeight: 'bold', color: '#d3dcff'}}>REACTION</p>}
                        </div>
                    </div>

                    <div className='button' style={{marginTop: '2%'}} onClick={() => {
                        if (!localStorage.getItem('action')) {
                            console.log("Erreur : pas d'action")
                            return
                        }
                        if (!localStorage.getItem('reaction')) {
                            console.log("Erreur : pas de réaction")
                            return
                        }

                        const action = JSON.parse(Object(localStorage.getItem('action')))
                        action['platform'] = action['platform'].toLowerCase()

                        if (action['parameters']) {
                            Object.keys(action['parameters']).map((parameter) => {
                                if (parameter.startsWith('[') && parameter.endsWith(']')) {
                                    action['parameters'][parameter.substring(1, parameter.length - 1)] = action['parameters'][parameter].split(';')
                                    delete action['parameters'][parameter]
                                }
                            })
                        }


                        const reaction = JSON.parse(Object(localStorage.getItem('reaction')?.replace(/"platform":/g, '"platform":')))
                        const updatedReactions = reaction.map((event) => {
                            const updatedEvent = {
                                ...event,
                                platform: event.platform.toLowerCase()
                            }

                            if (event['parameters']) {
                                Object.keys(event['parameters']).map((parameter) => {
                                    if (parameter.startsWith('[') && parameter.endsWith(']')) {
                                        updatedEvent['parameters'][parameter.substring(1, parameter.length - 1)] = event['parameters'][parameter].split(';')
                                        delete updatedEvent['parameters'][parameter]
                                    }
                                })
                            }

                            return updatedEvent
                        })

                        sendAppletInfos({
                            action: action,
                            reactions: updatedReactions
                        });
                        localStorage.removeItem('action')
                        localStorage.removeItem('reaction')
                        window.location.reload()
                        // navigate('/services')
                        }}>
                        <h2 style={{color: '#D3DCFF', fontFamily: 'Amoreiza', fontSize: '34px'}}>Ok</h2>
                    </div>

                </div>

            </div>
        </div>
    )
}