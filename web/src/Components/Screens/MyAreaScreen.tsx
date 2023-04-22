import Header from "../Header";
import '../../Styles/MyAreaScreen.css'
import { useContext, useEffect, useState } from "react";
import { deleteArea, getUserAreas } from "../../Api";
import PageTitle from "../PageTitle";

const multipleReactions = require('../../assets/multipleReactions.png')
const BlueArrow = require('../../assets/BlueArrow.png')

const Bin = require('../../assets/bin.png')
const BinSelected = require('../../assets/BinSelected.png')

export default function MyAreaScreen() {
    const [binImage, setBinImage] = useState(false)

    const [areas, setAreas] = useState([])
    const [platforms, setPlatforms] = useState([])


    const [areaStates, setAreaStates] = useState(areas.map(() => ({ showInfos: false })));

    useEffect(() => {
        getUserAreas()
            .then((data) => {
                console.log(data.data)
                setAreas(data.data)
                setAreaStates(data.data.map(() => ({ showInfos: false })))
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        setPlatforms(JSON.parse(Object(localStorage.getItem('platforms'))))
    }, [localStorage.getItem('platforms')])

    const getBinImage = () => {
        if (binImage === false)
            return Bin
        return BinSelected
    }
    

    const handleInfosButton = (index) => {
        const newAreaStates = [...areaStates];
        newAreaStates[index].showInfos = !newAreaStates[index].showInfos;
        setAreaStates(newAreaStates);
    };

    const getImageFromPlatform = (platformName) => {
        let imagePath = ''
        platforms.map((platform) => {
            if (String(platform['name']).toLowerCase() === platformName)
                imagePath = platform['imagePath']
        })

        return imagePath
    }

    const removeArea = (area) => {
        deleteArea(area)
            .then((data) => {
                console.log(data)
                window.location.reload()
            })
            .catch((err) => console.log(err))
    }

    return (
        <div style={{width: '100%'}}>
            <Header />
            <div className="content">
                <PageTitle>My Areas</PageTitle>

                <div className='areasContainer'>
                    {areas.map((area, index) => {
                        const {showInfos} = areaStates[index]
                        return (
                            <div key={index} className={index % 3 === 0 ? 'areaContainer' : 'areaContainer2'}>
                                <div className="TEST" style={{display: 'flex', flexDirection: 'column', backgroundColor: '#6F7488', borderRadius: '20px'}} onMouseEnter={() => handleInfosButton(index)} onMouseLeave={() => handleInfosButton(index)}>
                                    <div className="area">
                                        <div className="area-content">
                                            <img src={getImageFromPlatform(Object(area).action.platform)} style={{width: '30%', marginTop: '9%', marginBottom: '9%', marginLeft: '9%'}} />
                                            <img src={BlueArrow} style={{width: '10%', height: '30%', marginTop: '16%', marginLeft: '8%'}} />
                                            { Object.keys(area['reactions']).length === 1 ?
                                                <img src={getImageFromPlatform(Object(area).reactions['0'].platform)} style={{width: '30%', marginTop: '9%', marginBottom: '9%', marginLeft: '6.5%'}} />
                                            : <img src={multipleReactions} style={{width: '30%', marginTop: '9%', marginBottom: '9%', marginLeft: '6.5%'}} />}
                                        </div>
                                        { Object.keys(area['reactions']).length === 1 ?
                                            <h2 style={{position: 'absolute', fontFamily: 'Amoreiza', color: '#D3DCFF'}}>{Object(area).action.name + ' -> ' + Object(area).reactions['0'].name}</h2>
                                        : <h2 style={{position: 'absolute', fontFamily: 'Amoreiza', color: '#D3DCFF'}}>{Object(area).action.name}</h2>
                                        }
                                        <img id='myAreaBin' src={getBinImage()} style={{position: 'absolute', width: '15%', height: '30%', left: '85%', top: '66%'}} onMouseEnter={() => setBinImage(true)} onMouseLeave={() => setBinImage(false)} onClick={() => removeArea(area)} />
                                    </div>
                                    { showInfos && Object.keys(area['reactions']).length > 1 ?
                                        <div style={{backgroundColor: '#6F7488', borderRadius: '20px'}}>

                                            {Object(area).reactions.map((reaction, index) => (
                                                <div key={index} style={{display: 'flex', flexDirection: 'row', marginLeft: '12%', marginBottom: '5%', marginRight: '12%', marginTop: '3%'}}>
                                                    <img src={getImageFromPlatform(reaction.platform)} style={{width: '25%', height: '10%'}} />
                                                    <div style={{overflowWrap: 'break-word', marginLeft: '15%', overflow: 'hidden'}}>
                                                        <p style={{fontFamily: 'Amoreiza', fontSize: '24px', wordWrap: 'break-word', color: '#D3DCFF'}}>{reaction.name}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    : null}
                                </div>
                                { Object.keys(area['reactions']).length === 1 ?
                                    <div className='servicesText'>
                                        <p style={{fontFamily: 'Amoreiza', color: '#D3DCFF'}}>{Object(area).action.platform.charAt(0).toUpperCase() + Object(area).action.platform.slice(1)} | {Object(area).reactions['0'].platform.charAt(0).toUpperCase() + Object(area).reactions['0'].platform.slice(1)}</p>
                                    </div>
                                :   <div className='servicesText'>
                                        <p style={{fontFamily: 'Amoreiza', color: '#D3DCFF'}}>{Object(area).action.platform.charAt(0).toUpperCase() + Object(area).action.platform.slice(1)} | Multiple reactions</p>
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}