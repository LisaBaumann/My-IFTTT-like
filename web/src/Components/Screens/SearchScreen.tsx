import { useNavigate } from 'react-router-dom';
import Header from '../Header'
import '../../Styles/SearchScreen.css'
import { useState, useEffect } from 'react';
import CreateApplet from '../CreateApplet';
import { getPlatforms } from '../../Api';
import PageTitle from '../PageTitle';

const searchImage = require('../../assets/searchImage.png')


export default function SearchScreen() {
    const navigate = useNavigate()

    useEffect(() => {
        getPlatforms()
            .then((data) => {
                localStorage.setItem('platforms', JSON.stringify(data.data.platforms))
            })
            .catch((err) => console.log(err));
    }, [])

    const formatEventName = (eventName: string | undefined): string => {
        if (!eventName) return "";
        return eventName
            .toLowerCase()
            .replace(/\s/g, '');
    };

    const [search, setSearch] = useState('')

    return (
        <div style={{width: '100%'}}>
            <Header />
            <div className="content">
                {/* <CreateApplet /> */}
                <div className='button' style={{marginLeft: '6%'}} onClick={() => navigate('/services')}>
                    <h2 style={{color: '#D3DCFF', fontFamily: 'Amoreiza', fontSize: '34px'}}>Back</h2>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '46%'}}>
                    <PageTitle>Services</PageTitle> 
                    <div style={{display: 'flex', alignItems: 'center', marginLeft: '35%', backgroundColor: '#282A4F', borderRadius: '25px', marginRight: '10%', paddingTop: '1%', paddingBottom: '1%', overflow: 'hidden'}}>
                        <img src={searchImage} style={{marginLeft: '2%', width: '7%', height: '10%'}} />
                        <input
                            className='searchBar'
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                </div>

                <div className='servicesContainer'>
                    {localStorage.getItem('platforms') ? JSON.parse(Object(localStorage.getItem('platforms'))).filter(event => formatEventName(event['name']).includes(search.toLowerCase()))
                        .length > 0 ?
                            JSON.parse(Object(localStorage.getItem('platforms'))).filter(event => formatEventName(event['name']).includes(search.toLowerCase()))
                                .map((event, index) => {
                                    return (
                                        <div key={index} className={index % 5 === 0 ? 'serviceContainer' : 'serviceContainer2'}>
                                            <div key={index} className='services' onClick={() => navigate(`/services/${formatEventName(event['name'])}`)}>
                                                <img src={event['imagePath']} style={{width: '80%', marginTop: '20%', marginBottom: '20%', marginLeft: '10.5%'}}/>
                                            </div>
                                            <div className='servicesText'>
                                                <p style={{fontFamily: 'Amoreiza', color: '#D3DCFF'}}>{event['name']}</p>
                                            </div>
                                        </div>
                                    )
                                })
                        : <h2 className='noEventFound'>No event found. . .</h2>
                    : null }
                </div>
            </div>
        </div>
    )
}