import React, {useContext, useState} from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { sendAppletInfos } from "../../Api";
import { AreaContext } from "../../Contexts/AreaContext";
import { AuthContext } from "../../Contexts/AuthContext";
import FooterComponent from "../Footer";
import HeaderComponent from "../Header";

const ArrowLeft = require('../../../assets/arrow-left.png')
const ArrowRight = require('../../../assets/arrow-right.png')
const Pen = require('../../../assets/Pen.png')
const Bin = require('../../../assets/Bin.png')



export default function AppletScreen({navigation}) {
    const [inActionZone, setInActionZone] = useState(false)
    const [inReactionZone, setInReactionZone] = useState(false)
    const [indexOfReaction, setIndexOfReaction] = useState(1)

    const {accessToken} = useContext(AuthContext)
    const {action, reaction, setIsAction, setCurrentPlatform, setModify, setAction, setReaction} = useContext(AreaContext)

    const getImageAction = () => {
        if (Object.keys(action).length === 0)
            return require('../../../assets/Croix.png')
        return {uri: `https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/${action.platform}.png`}
    }

    const getImageReaction = () => {
        if (Object.keys(reaction).length === 0)
            return require('../../../assets/Croix.png')
        return {uri: `https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/${reaction[indexOfReaction - 1].platform}.png`}
    }

    const navigateToPlatform = () => {
        const obj = reaction[indexOfReaction - 1]
        setCurrentPlatform(obj.platform + ':' + `https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/${obj.platform}.png`)
        setInReactionZone(false)
        setIsAction(2)
        setModify(indexOfReaction - 1)
        navigation.navigate('Service')
    }

    return (
        <View style={styles.container}>
            <HeaderComponent navigation={navigation} />

            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose your AREAs</Text>
                </View>

                <View style={styles.actionContainer}>
                    {inActionZone === false ? // A FAIRE
                        <TouchableOpacity style={styles.actionChoose} onPress={() => {setIsAction(1); navigation.navigate('Search')}}>
                            <Image style={styles.actionImage} source={getImageAction()}></Image>
                        </TouchableOpacity>
                    : null }
                    <Text style={styles.actionTitle}>ACTION</Text>
                </View>

                <View style={styles.delimiter}>
                    <Image style={{resizeMode: 'contain', width: '100%', height: '100%'}} source={require('../../../assets/ArrowApplet.png')} />
                </View>

                

                {Object.keys(reaction).length !== 0 ? 
                    <Text style={{position: 'absolute', color: '#D3DCFF', left: '32%', top: '54%', fontSize: '15px'}}>({indexOfReaction}/{Object.keys(reaction).length})</Text>
                : null}
                <View style={styles.reactionContainer}>
                    {Object.keys(reaction).length > 1 ?
                        <TouchableOpacity style={styles.arrowLeft} onPress={() => { setInReactionZone(false); if (indexOfReaction > 1) setIndexOfReaction(indexOfReaction - 1);}}>
                            <Image source={ArrowLeft} />
                        </TouchableOpacity>
                    : null }

                    {inReactionZone === true && Object.keys(reaction).length > 0 ? 
                        <View style={[styles.actionContainer, {paddingBottom: '5%', position: 'relative'}]}>
                            <View style={[styles.actionChoose, {backgroundColor: '#2E3269'}]}>
                                <Image style={[styles.actionImage, {opacity: 0.2}]} source={getImageReaction()}></Image>
                                <View style={{ position: 'absolute', top: '45%', left: '15%'}}>
                                    <TouchableOpacity onPress={() => navigateToPlatform()}>
                                        <Image source={Pen} style={{width: 40, height: 40}} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ position: 'absolute', top: '43%', left: '65%'}}>
                                    <TouchableOpacity onPress={() => console.log('TouchableOpacity pressed')}>
                                        <Image source={Bin} style={{width: 45, height: 45}} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {Object.keys(reaction).length > 1 ?
                                <Text style={styles.actionTitle}>REACTIONS</Text>
                            :   <Text style={styles.actionTitle}>REACTION</Text>
                            }
                        </View>
                    : 
                        <View style={[styles.actionContainer, {paddingBottom: '5%'}]}>
                            <TouchableOpacity style={styles.actionChoose} onPress={() => {
                                if (Object.keys(reaction).length === 0) {
                                    setIsAction(2)
                                    setInReactionZone(false)
                                    navigation.navigate('Search')
                                } else
                                    setInReactionZone(true)
                            }}>
                                <Image style={styles.actionImage} source={getImageReaction()}></Image>
                            </TouchableOpacity>
                            {Object.keys(reaction).length > 1 ?
                                <Text style={styles.actionTitle}>REACTIONS</Text>
                            :   <Text style={styles.actionTitle}>REACTION</Text>
                            }
                        </View>
                    }


                    {Object.keys(reaction).length > 1 ?
                        <TouchableOpacity style={styles.arrowRight} onPress={() => { setInReactionZone(false); if (indexOfReaction < Object.keys(reaction).length) setIndexOfReaction(indexOfReaction + 1);}}>
                            <Image source={ArrowRight} />
                        </TouchableOpacity>
                    : null }
                </View>
                <TouchableOpacity style={styles.button} onPress={() =>
                {
                    action['platform'] = action['platform'].toLowerCase()

                    if (action['parameters']) {
                        Object.keys(action['parameters']).map((parameter) => {
                            if (parameter.startsWith('[') && parameter.endsWith(']')) {
                                action['parameters'][parameter.substring(1, parameter.length - 1)] = action['parameters'][parameter].split(';')
                                delete action['parameters'][parameter]
                            }
                        })
                    }
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

                    sendAppletInfos(accessToken, {
                        action: action,
                        reactions: updatedReactions
                    });
                    setAction({})
                    setReaction([])
                    navigation.navigate('MyArea')
                }}>
                    <Text style={{fontSize: '20px', color: '#D3DCFF', fontFamily: 'Amoreiza'}}>Ok</Text>
                </TouchableOpacity>
            </View>



            <FooterComponent navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1E3D'
    },
    contentContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    titleContainer: {
        paddingTop: '4%',
    },
    title: {
        color: '#D3DCFF',
        fontSize: '28px',
        fontFamily: 'Amoreiza',
    },
    actionContainer: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        paddingBottom: '5%'
    },
    actionChoose: {
        backgroundColor: '#D3DCFF',
        paddingTop: '10%',
        paddingBottom: '10%',
        paddingHorizontal: '10%',
        borderRadius: '20%'
    },
    actionImage: {
        height: 120,
        width: 120,
        resizeMode: 'contain'
    },
    actionTitle: {
        paddingTop: '5%',
        fontSize: '22px',
        color: '#D3DCFF',
        fontFamily: 'Amoreiza',
    },
    delimiter: {
        width: '70%',
        height: '8%',
        // paddingBottom: '0%'
    },
    button: {
        backgroundColor: '#62ABF0',
        paddingHorizontal: '10%',
        paddingVertical: '2%',
        marginLeft: '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '25px',
    },
    reactionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '-5%'
    },
    arrowLeft: {
        top: '-6%',
    },
    arrowRight: {
        top: '-6%',
    },
})