import {useState, useEffect} from 'react'
import Header from "../Header"
import { useNavigate, useParams } from "react-router-dom";
import '../../Styles/ServiceScreen.css'
import LoginButton from '../LoginButton';
import BackButton from '../BackButton';

import { fileUpload, getPlatformInfos } from '../../Api';
import TextWithView from '../TextWithView';


const Empty = 'https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Empty.png'
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


const servicesImages = [Empty, Gmail, Outlook, Github, Onedrive, Googledrive, Twitch, Spotify, Slack, GoogleCalendar, Teams]
const servicesNamesURL = ['', 'gmail', 'outlook', 'github', 'onedrive', 'googledrive', 'twitch', 'spotify', 'slack', 'googlecalendar', 'teams']
const servicesImagesNames = ['', 'Gmail', 'Outlook', 'Github', 'Onedrive', 'Google Drive', 'Twitch', 'Spotify', 'Slack', 'Google Calendar', 'Teams']

interface Item {
    title: String
    description: String
    inputs: Array<String>
}


export default function ServiceScreen() {
    const navigate = useNavigate()
    const params = useParams()

    const [platformActions, setPlatformActions] = useState<Array<Item>>([])
    const [platformReactions, setPlatformReactions] = useState<Array<Item>>([])
    const [index2, setIndex2] = useState(0);
    const [selectedFile, setSelectedFile] = useState();

    useEffect(() => {
        servicesNamesURL.forEach((name, i) => {
            if (params.serviceName === name) {
                setIndex2(i);
            }
        });
    }, []);

    const image = servicesImages[index2];



    useEffect(() => {
        getPlatformInfos(params.serviceName)
            .then((data) => {
                // console.log(data.data)
                setPlatformActions(data.data.actions)
                setPlatformReactions(data.data.reactions)
            })
            .catch((err) => console.log(err));
    }, []);



    const [inputValues, setInputValues] = useState({
        // 'New commit': {'repo': 'Keynote', 'owner': 'VandeveldePaul'},
        // 'Send message': {'group name': 'KeynoteArea', 'message content': 'New commit by:'},
        // 'Send email': {'[receivers]': 'paulvandevelde30@gmail.com;paul.vandevelde@epitech.eu;lijidi13om@gmail.com', 'object': 'New commit', 'message': 'A new commit on github:'},
        // 'Send an email': {'message': 'New member invited on slack', 'object': 'Slack', 'email': 'area.keynote2023@gmail.com'},
        // 'One or more emailed me': {'[senders]': 'mathys.le-juez@epitech.eu;raphael.gregoire@epitech.eu'},
        // 'Add event': {'title': 'Keynote', 'attendees': 'area.keynote2023@gmail.com'},
        // 'Mark as important email': {'[receivers]': 'paul.vandevelde@epitech.eu'}
    });

    const handleInputChange = (actionTitle, inputTitle, value) => {
        if (value[0] === ' ' && value[1] === '@') {
            let save
            if (inputValues[actionTitle] && inputValues[actionTitle][inputTitle]) {
                save = inputValues[actionTitle][inputTitle]
                setInputValues({
                    ...inputValues,
                    [actionTitle]: {
                        ...inputValues[actionTitle],
                        [inputTitle]: save + value
                    }
                })
            } else {
                setInputValues({
                    ...inputValues,
                    [actionTitle]: {
                        ...inputValues[actionTitle],
                        [inputTitle]: value
                    }
                })
            }
        } else {
            setInputValues({
                ...inputValues,
                [actionTitle]: {
                    ...inputValues[actionTitle],
                    [inputTitle]: value
                }
            })
        }
    };


    const changeHandler = (event, actionTitle, inputTitle) => {
		setSelectedFile(event.target.files);
        console.log(event.target.files)
        if (!event.target.files)
            return
        setInputValues({
            ...inputValues,
            [actionTitle]: {
                ...inputValues[actionTitle],
                [inputTitle]: event.target.files[0]['name']
            }
        })
	};

    const dateHandler = (event, actionTitle, inputTitle) => {
        const inputDateTime = event.target.value;
        const inputDate = new Date(inputDateTime);
        inputDate.setSeconds(0);
        inputDate.setMilliseconds(0);
        const isoDateTime = inputDate.toISOString();
        // console.log(isoDateTime);

        setInputValues({
            ...inputValues,
            [actionTitle]: {
                ...inputValues[actionTitle],
                [inputTitle]: isoDateTime
            }
        })
    }


    const uploadFile = async (actionTitle, inputTitle) => {
        if (selectedFile === undefined)
            return

        const formData = new FormData();
        formData.append('file', selectedFile[0]);

        // console.log(selectedFile[0]['name'])
        // console.log(actionTitle, inputTitle, selectedFile[0]['name'])
        

        fileUpload(formData)
            .then(async (data) => {
                console.log(data.data)
            })
            .catch(err => console.log(err))
    }

    const isAlreadyConnected = () => {

        const platforms = JSON.parse(Object(localStorage.getItem('platforms')))
        let isConnected
        platforms.map((platform) => {
            platform.name = platform.name.replace(' ', '')
            if (params.serviceName === platform.name.toLowerCase())
                isConnected = platform.isConnected
        })
        console.log(isConnected)
        return isConnected
    }
    

    const [lastInputChoosen, setLastInputChoosen] = useState({})

    return (
        <div style={{width: '100%', userSelect: 'none'}}>
            <Header />
            { !isAlreadyConnected() ?
                <LoginButton serviceName={params.serviceName} />
            : 
                <div className='button' onClick={() => navigate('/search')}>
                    <h2 style={{color: '#D3DCFF', fontFamily: 'Amoreiza', fontSize: '34px'}}>Back</h2>
                </div>
            }
            {/* <BackButton /> */}
            <div style={{paddingTop: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderBottom: '2px solid #3A3F86', backgroundColor: '#282A4F'}}>
                <div>
                    <img src={image} style={{width: '15%', marginLeft: '42.4%', marginTop: '2%'}} />
                </div>
                <p style={{color: '#D3DCFF', fontFamily: 'Amoreiza', fontSize: '200%', marginTop: '0.5%'}}>{servicesImagesNames[index2]}</p>
            </div>


            <div style={{paddingTop: '3%'}}>
                <div>
                    {platformActions['length'] !== 0 ?
                    <div>
                        <h1 style={{color: '#D3DCFF', fontFamily: 'Amoreiza', fontSize: '250%', marginLeft: '7.5%'}}>Actions</h1>
                        <div className='serviceServicesContainer' style={{borderBottom: '2px solid #3A3F86'}}>
                            {platformActions.map((action, index) => (
                                <div key={index} className={index % 3 === 0 ? 'serviceServiceContainer' : 'serviceServiceContainer2'}>
                                
                                    <div className='serviceTitle'>
                                        <p style={{fontFamily: 'Amoreiza', color: '#D3DCFF', fontSize: '160%'}}>{action['title']}</p>
                                    </div>
                                    <div style={{marginTop: '-3%', borderBottom: '2px solid #3A3F86', marginLeft: '5%', marginRight: '5%'}} />

                                    <div className='serviceDescription'>
                                        <p style={{fontFamily: 'Amoreiza', color: '#D3DCFF', fontSize: '120%'}}>{action['description']}</p>

                                        {action['inputs'].map((input, indexAction) => {
                                            return (
                                                <div key={indexAction} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                    {input[0] === '[' ? 
                                                        <>
                                                        <p style={{ fontFamily: 'Amoreiza', color: '#D3DCFF', fontSize: '120%', marginBottom: '1%' }}>{input.substring(1, input.length - 1)} :</p>
                                                        <p style={{color: '#D3DCFF'}}>Separate {input.substring(1, input.length - 1)} with ';'</p>
                                                        </>
                                                    : <p style={{ fontFamily: 'Amoreiza', color: '#D3DCFF', fontSize: '120%', marginBottom: '1%' }}>{input} :</p>}
                                                    <input
                                                        style={{ color: '#D3DCFF', backgroundColor: '#1C1E3D', fontFamily: 'Amoreiza', fontSize: '120%', width: '95%', borderRadius: '8px', textAlign: 'center', border: 'none' }}
                                                        type='text'
                                                        value={inputValues[String(action['title'])] && inputValues[String(action['title'])][String(input)]}
                                                        onChange={(e) => handleInputChange(action['title'], input, e.target.value)}
                                                    />
                                                </div>
                                            );
                                        })}

                                        <h2 className='chooseActionOrReaction' style={{color: '#D3DCFF', fontFamily: 'Amoreiza', width: '15%', marginLeft: '48%'}} onClick={() =>
                                        {
                                            localStorage.setItem("action", JSON.stringify({platform: servicesImagesNames[index2], name: action['title'], parameters: inputValues[Object(action['title'])], variables: action['variables']}))
                                            navigate('/services')
                                        }}>Ok</h2>


                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    : null }





                    {platformReactions['length'] !== 0 ?
                    <div>
                        <h1 style={{color: '#D3DCFF', fontFamily: 'Amoreiza', fontSize: '250%', marginLeft: '7.5%', marginTop: '5%'}}>Reactions</h1>
                        <div className='serviceServicesContainer'>
                            {platformReactions.map((reaction, index) => (
                                <div key={index} className={index % 3 === 0 ? 'serviceServiceContainer' : 'serviceServiceContainer2'}>
                                    <div className='serviceTitle'>
                                        <p style={{fontFamily: 'Amoreiza', color: '#D3DCFF', fontSize: '160%'}}>{reaction['title']}</p>
                                    </div>
                                    <div style={{borderBottom: '2px solid #3A3F86', marginLeft: '5%', marginRight: '5%'}} />

                                    <div className='serviceDescription'>
                                        <p style={{fontFamily: 'Amoreiza', color: '#D3DCFF', fontSize: '120%'}}>{reaction['description']}</p>

                                        {localStorage.getItem('action') ?
                                            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                                {JSON.parse(String(localStorage.getItem('action')))['variables'].map((variable, indexVariable) => {
                                                    return (
                                                        <div key={indexVariable} className='variablesContainer' onClick={() => handleInputChange(lastInputChoosen['actionTitle'], lastInputChoosen['inputTitle'], ' @' + variable + '$ ')}>
                                                            <p style={{color: '#D3DCFF', fontFamily: 'Amoreiza'}}>{variable}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        : null }

                                        {reaction['inputs'].map((input, index) => {
                                            return (
                                                <div key={index} style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                                                    {input[0] === '[' ? 
                                                        <>
                                                            <p style={{fontFamily: 'Amoreiza', color: '#D3DCFF', fontSize: '120%', marginBottom: '1%'}}>{input.substring(1, input.length - 1)} :</p>
                                                            <p style={{color: '#D3DCFF', fontFamily: '', marginTop: '0%', marginBottom: '2%'}}>Separate {input.substring(1, input.length - 1)} with ';'</p>
                                                        </>
                                                    : <p style={{fontFamily: 'Amoreiza', color: '#D3DCFF', fontSize: '120%', marginBottom: '1%'}}>{input} :</p>}
                                                    {input !== "file name" && input !== "start" && input !== "end" ?
                                                        <input
                                                            style={{ color: '#D3DCFF', backgroundColor: '#1C1E3D', fontFamily: 'Amoreiza', fontSize: '120%', width: '95%', borderRadius: '8px', textAlign: 'center', border: 'none' }}
                                                            type='text'
                                                            value={inputValues[String(reaction['title'])] && inputValues[String(reaction['title'])][String(input)]}
                                                            onChange={(e) => handleInputChange(reaction['title'], input, e.target.value)}
                                                            onClick={() => setLastInputChoosen({actionTitle: reaction['title'], inputTitle: input})}
                                                        />
                                                    : input === "file name" ?
                                                        <input
                                                            style={{marginLeft: '15%', color: '#D3DCFF', backgroundColor: '#1C1E3D', fontFamily: 'Amoreiza', fontSize: '120%', width: '60%'}}
                                                            type='file'
                                                            accept={reaction['title'] === "Upload image" ? '.png,.jpg,.jpeg'
                                                                    : reaction['title'] === "Upload file" ? '.txt,.csv,.xml,.rtf'
                                                                    : '.pdf,.zip'}
                                                            onChange={(e) => changeHandler(e, reaction['title'], input)}
                                                            onClick={() => setLastInputChoosen({actionTitle: reaction['title'], inputTitle: input})}
                                                        />
                                                    :
                                                        <input
                                                            style={{marginLeft: '15%', color: '#D3DCFF', backgroundColor: '#1C1E3D', fontFamily: 'Amoreiza', fontSize: '120%', width: '60%'}}
                                                            type='datetime-local'
                                                            onChange={(e) => dateHandler(e, reaction['title'], input)}
                                                        />
                                                    }
                                                </div>
                                            );
                                        })}

                                        <h2 className='chooseActionOrReaction' style={{color: '#D3DCFF', fontFamily: 'Amoreiza', width: '15%', marginLeft: '48%'}} onClick={() =>
                                        {
                                            if (selectedFile) {
                                                uploadFile(lastInputChoosen['actionTitle'], lastInputChoosen['inputTitle'])
                                            }
                                            let reactionsServices = []
                                            let reactions = []
                                            if (localStorage.getItem('reaction')) {
                                                reactions = JSON.parse(Object(localStorage.getItem('reaction')))   
                                                reactions.map((reaction) => {
                                                    reactionsServices.push(reaction)
                                                })
                                            }
                                            if (sessionStorage.getItem('modify')) {
                                                Object(reactionsServices)[String(sessionStorage.getItem('modify'))] = {platform: servicesImagesNames[index2], name: reaction['title'], parameters: inputValues[Object(reaction['title'])]}
                                            } else
                                                Object(reactionsServices).push({platform: servicesImagesNames[index2], name: reaction['title'], parameters: inputValues[Object(reaction['title'])]})


                                            localStorage.setItem("reaction", JSON.stringify(reactionsServices))
                                            sessionStorage.removeItem('modify')
                                            navigate('/services')
                                        }}>Ok</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    : null}
                </div>
            </div>
        </div>
    )
}