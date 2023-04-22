import React, { useContext, useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import { getUserAreas } from '../../Api'
import { AreaContext } from '../../Contexts/AreaContext'
import { AuthContext } from '../../Contexts/AuthContext'
import FooterComponent from '../Footer'
import HeaderComponent from '../Header'

export default function MyAreaScreen({navigation}) {

    const {accessToken} = useContext(AuthContext)
    const {platforms, reaction} = useContext(AreaContext)
    
    const [areas, setAreas] = useState([])
    const [areaStates, setAreaStates] = useState(areas.map(() => ({ showInfos: false })));

    useEffect(() => {
        getUserAreas(accessToken)
            .then((data) => {
                console.log(data.data)
                setAreas(data.data)
                setAreaStates(data.data.map(() => ({ showInfos: false })))
            })
            .catch((err) => console.log(err))
    }, [reaction.length])

    const handleInfosButton = (index) => {
        const newAreaStates = [...areaStates];
        if (newAreaStates[index])
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


    return (
        <View style={styles.container}>
            <HeaderComponent navigation={navigation} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>My Areas</Text>
                <ScrollView scrollEnabled={true} style={styles.areasContainer}>
                    {areaStates.length > 0 && areas.map((area, index) => {
                        console.log(area)
                        if (!areaStates[index])
                            return null
                        const {showInfos} = areaStates[index]
                        return (
                            <View key={index} style={styles.areaContainer}>
                                <TouchableOpacity style={[styles.topAreaContainer, {backgroundColor: showInfos ? '#2D2E38' : '#D3DCFF'}]} onPress={() => handleInfosButton(index)}>
                                    <View style={{display: 'flex', width: '100%', flexDirection: 'row', height: 100}}>
                                        <Image source={{uri: getImageFromPlatform(area.action.platform)}} style={{marginLeft: '7%', width: '30%', resizeMode: 'contain', opacity: showInfos ? 0.2 : 1}} />
                                        <Image source={{uri: 'https://github.com/VandeveldePaul/AreaAssets/blob/main/BlueArrow.png?raw=true'}} style={{marginLeft: '10%', width: '10%', resizeMode: 'contain', opacity: showInfos ? 0.2 : 1}} />
                                        { Object.keys(area.reactions).length === 1 ?
                                            <Image source={{uri: getImageFromPlatform(area.reactions[0].platform)}} style={{marginLeft: '10%', marginRight: '3%', width: '30%', resizeMode: 'contain', opacity: showInfos ? 0.2 : 1}} />
                                        : <Image source={{uri: 'https://github.com/VandeveldePaul/AreaAssets/blob/main/multipleReactions.png?raw=true'}} style={{marginLeft: '10%', marginRight: '3%', width: '30%', resizeMode: 'contain', opacity: showInfos ? 0.2 : 1}} />
                                        }
                                        {showInfos ?
                                        <>
                                            { Object.keys(area['reactions']).length === 1 ?
                                                <Text style={{margin: '2%', position: 'absolute', color: '#D3DCFF', fontSize: '18px', fontFamily: 'Amoreiza'}}>{Object(area).action.name + ' -> ' + Object(area).reactions['0'].name}</Text>
                                            :   <Text style={{margin: '2%', position: 'absolute', color: '#D3DCFF', fontSize: '18px', fontFamily: 'Amoreiza'}}>{Object(area).action.name}</Text>
                                            }
                                        </>
                                        : null }
                                    </View>
                                    { showInfos && Object.keys(area['reactions']).length > 1 ?
                                        <View style={{backgroundColor: '#6F7488', borderRadius: '20px'}}>

                                            {Object(area).reactions.map((reaction, index) => (
                                                <View key={index} style={{display: 'flex', flexDirection: 'row', marginLeft: '12%', marginBottom: '5%', marginRight: '12%', marginTop: '3%'}}>
                                                    <Image source={{uri: getImageFromPlatform(reaction.platform)}} style={{width: '25%', height: '10%'}} />
                                                    <View style={{overflowWrap: 'break-word', marginLeft: '15%', overflow: 'hidden'}}>
                                                        <Text style={{fontSize: '24px', wordWrap: 'break-word', color: '#D3DCFF', fontFamily: 'Amoreiza'}}>{reaction.name}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    : null}
                                </TouchableOpacity>
                                { Object.keys(area['reactions']).length === 1 ?
                                    <View style={styles.servicesText}>
                                        <Text style={{fontSize: '20px', color: '#D3DCFF', fontFamily: 'Amoreiza'}}>{Object(area).action.platform.charAt(0).toUpperCase() + Object(area).action.platform.slice(1)} | {Object(area).reactions['0'].platform.charAt(0).toUpperCase() + Object(area).reactions['0'].platform.slice(1)}</Text>
                                    </View>
                                :   <View style={styles.servicesText}>
                                        <Text style={{fontSize: '20px', color: '#D3DCFF', fontFamily: 'Amoreiza'}}>{Object(area).action.platform.charAt(0).toUpperCase() + Object(area).action.platform.slice(1)} | Multiple reactions</Text>
                                    </View>
                                }
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <FooterComponent navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1E3D',
    },
    contentContainer: {
        marginTop: '3%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '40%'
    },
    title: {
        fontSize: '30%',
        color: '#D3DCFF',
        fontFamily: 'Amoreiza'
    },
    areasContainer: {
        width: '80%',
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '10%'
    },
    areaContainer: {
        width: '100%',
        marginBottom: 60,
        display: 'flex',
        alignItems: 'center'
    },
    topAreaContainer: {
        width: '100%',
        height: 100,
        // display: 'flex',
        // flexDirection: 'row',
        borderRadius: '10%',
    },
    servicesText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2%',
        fontFamily: 'Amoreiza'
    }
})