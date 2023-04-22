import React, {useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import FooterComponent from "../Footer";
import HeaderComponent from "../Header";


export default function ProfileScreen  ( {navigation} ) {
    const [ShowName, setShowName] = useState(false);
    const [ShowSurName, setShowSurName] = useState(false);
    const [ShowEmail, setShowEmail] = useState(false);
    const [ShowPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [surName, setSurName] = useState('');
    const [surNameError, setSurNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passWord, setPassWord] = useState('');
    const [passWordError, setPassWordError] = useState(false);

    return(
        <View style={styles.container}>
            <HeaderComponent navigation={navigation}/>
            <View style={styles.body}>
                <View>
                    <Text style={styles.titleSet}>Settings</Text>
                </View>
                <View>
                    <Text style={styles.infoSet}>See here your informations about your account and change them. Choose your visual preferences for the application.</Text>
                </View>
                <View style={styles.inputList}>
                    <View style={styles.nameBox}>
                        <Text style={styles.nameTitle}>Name</Text>
                        <TouchableOpacity style={{width: 30, height: 30, left: "85%", top: "-15%"}}
                                          onPress={() => { if (ShowName){ setShowName(false); setName(''); console.log(name)} else {setShowName(true)}}}>
                            <Image style={{width: 25, height: 25, top: '25%'}}
                                   source={require('../../../assets/icons/modif.png')}/>
                            {
                                ShowName ? <TextInput style={[styles.input, {top: -24}]} placeholder="Name" onChangeText={setName} value={name}/>: null
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.surNameBox}>
                        <Text style={styles.surNameTitle}>Surname</Text>
                        <TouchableOpacity style={{width: 30, height: 30, left: "85%", top: "-15%"}}
                                          onPress={() => { if (ShowSurName){ setShowSurName(false); setSurName(''); console.log(surName)} else {setShowSurName(true)}}}>
                            <Image style={{width: 25, height: 25, top: '-10%'}}
                                   source={require('../../../assets/icons/modif.png')}/>
                            {
                                ShowSurName ? <TextInput style={styles.input} placeholder="Surname" onChangeText={setSurName} value={surName}/>: null
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emailBox}>
                        <Text style={styles.emailTitle}>Email</Text>
                        <TouchableOpacity style={{width: 30, height: 30, left: "85%", top: "-15%"}}
                                          onPress={() => { if (ShowEmail){ setShowEmail(false); setEmail(''); console.log(email)} else {setShowEmail(true)}}}>
                            <Image style={{width: 25, height: 25, top: '-10%'}}
                                   source={require('../../../assets/icons/modif.png')}/>
                            {
                                ShowEmail ? <TextInput style={styles.input} placeholder="Name" onChangeText={setEmail} value={email}/>: null
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.passWordBox}>
                        <Text style={styles.passWordTitle}>Password</Text>
                        <TouchableOpacity style={{width: 30, height: 30, left: "85%", top: "-15%"}}
                                          onPress={() => { if (ShowPassword){ setShowPassword(false); setPassWord(''); console.log(passWord)} else {setShowPassword(true)}}}>
                            <Image style={{width: 25, height: 25, top: '-10%'}}
                                   source={require('../../../assets/icons/modif.png')}/>
                            {
                                ShowPassword ? <TextInput style={styles.input} placeholder="Name" onChangeText={setPassWord} value={passWord}/>: null
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.iconList}>
                    <TouchableOpacity style={styles.buttonDisplay}>
                        <Image style={{width: 50, height: 50, alignItems: "center"}}
                               source={require('../../../assets/icons/displaymode.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonHelp}>
                        <Image style={{width: 50, height: 50}}
                               source={require('../../../assets/icons/help.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLogout}>
                        <Image style={{width: 50, height: 50}}
                               source={require('../../../assets/icons/logout.png')}/>
                    </TouchableOpacity>

                </View>
            </View>
            {<FooterComponent navigation={navigation}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        //backgroundColor: "#090a23"
        backgroundColor: '#1C1E3D',
    },
    ButtonPanel: {
        //backgroundColor: "white",
        width: 50,
        height: 50,
        top: -70,
        left: 10,

    },
    body :{
        height: '100%',
        top: '5%',
    },
    titleSet: {
        textAlign: 'center',
        fontSize: 50,
        color: "#FFFFFF",
        fontFamily: 'Amoreiza'
    },
    infoSet: {
        textAlign: 'center',
        fontSize: 15,
        color: "#FFFFFF",
        fontFamily: 'Amoreiza'
    },

    inputList:{
        marginBottom: "6%"
    },

    nameBox:{
        top: "10%",
        width: "70%",
        height: "9%",
        justifyContent: 'center',
        left: "15%",
        position: 'relative',
        backgroundColor: "#3A3F86",
        marginBottom: "23%",
        borderRadius: 10,
    },
    nameTitle:{
        position: "absolute",
        top: "-60%",
        color: "#FFFFFF",
        fontSize: 15,
        left: "1%",
        fontFamily: 'Amoreiza'
    },
    surNameBox:{
        marginBottom: "9%",
        width: "70%",
        height: "9%",
        justifyContent: 'center',
        left: "15%",
        position: 'relative',
        backgroundColor: "#3A3F86",
        borderRadius: 10,
    },
    surNameTitle:{
        top: "-50%",
        color: "#FFFFFF",
        fontSize: 15,
        left: "1%",
        fontFamily: 'Amoreiza'
    },
    emailBox:{
        marginBottom: "9%",
        width: "70%",
        height: "9%",
        justifyContent: 'center',
        left: "15%",
        position: 'relative',
        backgroundColor: "#3A3F86",
        borderRadius: 10,
    },
    emailTitle:{
        top: "-50%",
        color: "#FFFFFF",
        fontSize: 15,
        left: "1%",
        fontFamily: 'Amoreiza'
    },
    passWordBox:{
        width: "70%",
        height: "9%",
        justifyContent: 'center',
        left: "15%",
        position: 'relative',
        backgroundColor: "#3A3F86",
        borderRadius: 10,
    },
    passWordTitle:{
        top: "-50%",
        color: "#FFFFFF",
        fontSize: 15,
        left: "1%",
        fontFamily: 'Amoreiza'
    },

    input: {
        position: "relative",
        borderWidth: 3,
        borderColor: '#D3DCFF',
        width: 220,
        height: 40,
        bottom: 34,
        right: 230,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#3A3F86",
        //margin: 9
    },

    iconList: {

    },
    buttonDisplay: {
        width: 50,
        height: 50,
        left: "25%",
        top: "-60%",
    },

    buttonHelp: {
        width: 50,
        height: 50,
        left: "45%",
        top: "-95%"
    },
    buttonLogout: {
        width: 50,
        height: 50,
        left: "65%",
        top: "-126%"
    }


})
