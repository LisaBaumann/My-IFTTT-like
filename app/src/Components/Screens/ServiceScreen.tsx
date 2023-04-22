import React, {useContext, useEffect, useState} from "react";
import {Text, View, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import { getPlatformInfos } from "../../Api";
import { AreaContext } from "../../Contexts/AreaContext";
import { AuthContext } from "../../Contexts/AuthContext";
import FooterComponent from "../Footer";
import HeaderComponent from "../Header";
import LoginButton from "../LoginButton";
import MyTextInput from '../MyTextInput'

interface Item {
    title: String
    description: String
    inputs: Array<String>
    variables: Array<String>
}

export default function ServiceScreen({navigation}) {
    const {currentPlatform, reaction, action, setAction, isAction, setReaction, modify, setModify} = useContext(AreaContext)
    const {accessToken} = useContext(AuthContext)
    const [platformActions, setPlatformActions] = useState<Array<Item>>([])
    const [platformReactions, setPlatformReactions] = useState<Array<Item>>([])


    const parseCurrentPlatform = () => {
        const index = currentPlatform.indexOf(':')
        console.log(currentPlatform.slice(0, index))
        if (currentPlatform.slice(0, index) === 'Google calendar')
            return ['Google Calendar', currentPlatform.slice(index + 1).trim()]
        return [currentPlatform.slice(0, index), currentPlatform.slice(index + 1).trim()]
    }
    
    useEffect(() => {
        let platform = parseCurrentPlatform()[0].replace(' ', '')
        getPlatformInfos(accessToken, platform.toLowerCase())
            .then((data) => {
                console.log(data.data)
                setPlatformActions(data.data.actions)
                setPlatformReactions(data.data.reactions)
            })
            .catch((err) => console.log(err));
    }, [parseCurrentPlatform()[0].toLowerCase()]);

    const [inputValues, setInputValues] = useState({});

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

    const findAREAVariables = (actionTitle) => {
        
        const result = platformActions.map((action) => {
            if (action.title === actionTitle)
                return action
        })

        // console.log('avant le return: ', result)
        if (result[0] && result[0].variables)
            return result[0].variables
        return undefined
    }

    
    const [lastInputChoosen, setLastInputChoosen] = useState({})

    return (
        <View style={styles.container}>
            <HeaderComponent navigation={navigation} />
            <View style={styles.headerContainer}>
                <Image source={{uri: parseCurrentPlatform()[1]}} style={{width: '100%', height: '65%', resizeMode: 'contain'}}/>
                <Text style={styles.platformName}>{parseCurrentPlatform()[0]}</Text>
            </View>
            <ScrollView scrollEnabled={true} style={styles.scrollView}>
                {platformActions.length !== 0 && isAction !== 2 ?
                    <View>
                        <Text style={styles.title}>Actions</Text>
                        {platformActions.map((action, index) => (
                            <View key={index} style={styles.actionContainer}>
                                <Text style={{color: '#D3DCFF', fontSize: '18px', marginTop: '3%', marginHorizontal: '3%', fontFamily: 'Amoreiza'}}>{action.title}</Text>
                                <View style={styles.delimiter}></View>
                                <Text style={{color: '#D3DCFF', fontSize: '16px', marginHorizontal: '3%', marginBottom: '3%', fontFamily: 'Amoreiza'}}>{action.description}</Text>

                                <View style={styles.inputsContainer}>
                                    {action.inputs.map((input, index) => (
                                        <View key={index} style={{display: 'flex', marginTop: '5%', flexDirection: 'column'}}>
                                            {input[0] === '[' ? 
                                                <>
                                                    <Text style={{color: '#D3DCFF', fontSize: '16px', fontFamily: 'Amoreiza', marginBottom: '1%'}}>{input.substring(1, input.length - 1)} :</Text>
                                                    <Text style={{color: '#D3DCFF', marginTop: '0%', marginBottom: '2%'}}>Separate {input.substring(1, input.length - 1)} with ';'</Text>
                                                </>
                                            : <Text style={{color: '#D3DCFF', fontSize: '16px', fontFamily: 'Amoreiza'}}>{input} :</Text>}
                                            <MyTextInput
                                                style={{borderRadius: '5%', marginTop: '2%', color: '#D3DCFF', backgroundColor: '#1C1E3D', fontSize: '16px', width: '95%', fontFamily: 'Amoreiza'}}
                                                value={inputValues[String(action.title)] && inputValues[String(action.title)][String(input)]}
                                                onChange={(text) => handleInputChange(action.title, input, text)}
                                            />
                                        </View>
                                    ))}
                                </View>
                                <TouchableOpacity onPress={() =>
                                {
                                    // console.log('result: ', {platform: parseCurrentPlatform()[0], name: action.title, parameters: inputValues, variables: findAREAVariables(action.title)})
                                    setAction({platform: parseCurrentPlatform()[0], name: action.title, parameters: inputValues[String(action.title)], variables: findAREAVariables(action.title)})
                                    navigation.navigate('Home')
                                }}>
                                    <Text style={styles.okButton}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                : null }

                { platformActions.length !== 0 && platformReactions.length !== 0 && isAction === 0 ?
                    <View style={[styles.delimiter, {marginTop: '10%'}]}></View>
                : null}


                { platformReactions.length !== 0 && isAction !== 1 ?
                    <View>
                        <Text style={styles.title}>Reactions</Text>
                        {platformReactions.map((reac, index) => (
                            <View key={index} style={styles.actionContainer}>
                                <Text style={{color: '#D3DCFF', fontSize: '18px', marginTop: '3%', marginHorizontal: '3%', fontFamily: 'Amoreiza'}}>{reac.title}</Text>
                                <View style={styles.delimiter}></View>
                                <Text style={{color: '#D3DCFF', fontSize: '16px', marginHorizontal: '3%', marginBottom: '3%', fontFamily: 'Amoreiza'}}>{reac.description}</Text>

                                {action && action.variables !== undefined ?
                                    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                        {action.variables.map((variable, indexVariable) => {
                                            return (
                                                <TouchableOpacity key={indexVariable} style={styles.variablesContainer} onPress={() => {
                                                    console.log(lastInputChoosen)
                                                    handleInputChange(lastInputChoosen['actionTitle'], lastInputChoosen['inputTitle'], ' @' + variable + '$ ')}
                                                }>
                                                    <Text style={{color: '#D3DCFF', fontFamily: 'Amoreiza', marginVertical: '2%'}}>{variable}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                : null }

                                <View style={styles.inputsContainer}>
                                    {reac.inputs.map((input, index) => (
                                        <View key={index} style={{display: 'flex', marginTop: '5%', flexDirection: 'column'}}>
                                            {input[0] === '[' ? 
                                                <>
                                                    <Text style={{color: '#D3DCFF', fontSize: '16px', fontFamily: 'Amoreiza', marginBottom: '1%'}}>{input.substring(1, input.length - 1)} :</Text>
                                                    <Text style={{color: '#D3DCFF', marginTop: '0%', marginBottom: '2%'}}>Separate {input.substring(1, input.length - 1)} with ';'</Text>
                                                </>
                                            : <Text style={{color: '#D3DCFF', fontSize: '16px', fontFamily: 'Amoreiza'}}>{input} :</Text>}
                                            <MyTextInput
                                                style={{borderRadius: '5%', marginTop: '2%', color: '#D3DCFF', backgroundColor: '#1C1E3D', fontSize: '16px', width: '95%', fontFamily: 'Amoreiza'}}
                                                value={inputValues[String(reac.title)] && inputValues[String(reac.title)][String(input)]}
                                                onChange={(text) => {
                                                    handleInputChange(reac.title, input, text)
                                                    setLastInputChoosen({actionTitle: reac.title, inputTitle: input})
                                                }}
                                            />
                                        </View>
                                    ))}
                                </View>
                                <TouchableOpacity onPress={() =>
                                {
                                    let reactionServices = []

                                    if (reaction.length > 0) {
                                        reaction.map((event) => {
                                            reactionServices.push(event)
                                        })
                                    }
                                    if (modify !== '') {
                                        reactionServices[modify] = {platform: parseCurrentPlatform()[0], name: reac.title, parameters: inputValues[String(reac.title)]}
                                        setModify('')
                                    } else
                                        reactionServices.push({platform: parseCurrentPlatform()[0], name: reac.title, parameters: inputValues[String(reac.title)]})

                                    setReaction(reactionServices)
                                    navigation.navigate('Home')
                                }}>
                                    <Text style={styles.okButton}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                    </View>
                : null}

            {/* <LoginButton serviceName={parseCurrentPlatform()[0].toLowerCase()} /> */}
            </ScrollView>
            <FooterComponent navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1E3D'
    },
    headerContainer: {
        paddingVertical: '3%',
        width: '100%',
        height: '18%',
        backgroundColor: '#282a4f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderBottomWidth: '1%',
        borderColor: '#3A3F86'
    },
    scrollView: {
        marginBottom: '30%'
    },
    platformName: {
        paddingTop: '2%',
        color: '#D3DCFF',
        fontSize: '24px',
        fontFamily: 'Amoreiza',
    },
    title: {
        color: '#D3DCFF',
        fontSize: '22px',
        paddingTop: '5%',
        paddingLeft: '6%',
        fontFamily: 'Amoreiza',
    },
    actionContainer: {
        flexDirection: 'column',
        marginLeft: '10%',
        marginTop: '10%',
        width: '80%',
        backgroundColor: '#282a4f',
        borderRadius: '10%'
    },
    delimiter: {
        borderBottomColor: '#3A3F86',
        borderBottomWidth: '2px',
        width: '90%',
        marginLeft: '5%',
        marginTop: '5%',
        marginBottom: '5%',
    },
    inputsContainer: {
        marginHorizontal: '05%',
        marginBottom: '5%',
    },
    okButton: {
        color: '#D3DCFF',
        fontSize: '18px',
        marginLeft: '46%',
        marginVertical: '3%',
        fontFamily: 'Amoreiza',
    },
    variablesContainer: {
        display: 'flex',
        paddingLeft: '2%',
        paddingRight: '2%',
        marginRight: '5%',
        marginBottom: '2%',
        marginLeft: '3%',
        marginRight: '3%',
        backgroundColor: '#62ABF0',
        borderRadius: '10%',
        // height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})