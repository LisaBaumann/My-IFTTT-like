import React, {useContext, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { AuthContext } from "../Contexts/AuthContext";

const CustomDrawer = (props) => {
    const {navigation} = props

    const {name} = useContext(AuthContext)

    return(
        <View style={styles.container}>
            <View style={styles.UserInfo}>
                <Image style={{width: 80, height: 80, left: '-6%', top: '-8%'}}
                       source={require('../../assets/icons/profile.png')}/>
            </View>
            <Text style={styles.Username}>{name}</Text>
            <View style={styles.separator}/>

            <TouchableOpacity  style={styles.ProfileButton} onPress={() => navigation.navigate('Profile')}>
                <Image style={{width: 40, height: 40, left: '-6%', top: '-8%'}}
                       source={require('../../assets/icons/settings.png')}/>
                <Text style={styles.ProfileButtonDrawer}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.DisplaysButton}>
                <Image style={{width: 40, height: 40, left: '-6%', top: '-8%'}}
                       source={require('../../assets/icons/displaymode.png')}/>
                <Text style={styles.DisplaysButtonDrawer}>Display mode</Text>

            </TouchableOpacity>
            <TouchableOpacity  style={styles.HelpButton}>
                <Image style={{width: 40, height: 40, left: '-6%', top: '-8%'}}
                       source={require('../../assets/icons/help.png')}/>
                <Text style={styles.HelpButtonDrawer}>Help</Text>

            </TouchableOpacity>
            <TouchableOpacity  style={styles.LogoutButton}>
                <Image style={{width: 40, height: 40, left: '-6%', top: '-8%'}}
                       source={require('../../assets/icons/logout.png')}/>
                <Text style={styles.LogoutButtonDrawer}>Logout</Text>

            </TouchableOpacity>

        </View>
    )
}

export default CustomDrawer
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1C1E3D",
        height : '100%'

    },
     UserInfo: {
        width: 80,
         height: 80,
         top: '5%',
         left: '35%',
         borderColor: '#3A3F86',
         borderWidth: 5,
         backgroundColor: '#3A3F86',
         borderRadius: 50,

     },

    Username: {
        top: '7%',
        left: '43%',
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: 'Amoreiza'
    },

    separator: {
        borderBottomWidth: 5,
        borderColor: '#3A3F86',
        top: "10%"
    },

    ProfileButton: {
        flexDirection: "row",
        top: '60%',
        left: '3%'
    },

    ProfileButtonDrawer: {
        top: '-6%',
        fontSize: 24,
        color: '#D3DCFF',
        left: '55%',
        fontFamily: 'Amoreiza'
    },
    DisplaysButton: {
        flexDirection: "row",
        top: '70%',
        left: '3%'
    },
    DisplaysButtonDrawer: {
        top: '-6%',
        fontSize: 24,
        color: '#D3DCFF',
        left: '55%',
        fontFamily: 'Amoreiza'
    },
    HelpButton: {
        flexDirection: "row",
        top: '80%',
        left: '3%'
    },
    HelpButtonDrawer: {
        top: '-6%',
        fontSize: 24,
        color: '#D3DCFF',
        left: '55%',
        fontFamily: 'Amoreiza'
    },
    LogoutButton: {
        flexDirection: "row",
        top: '90%',
        left: '3%'
    },
    LogoutButtonDrawer: {
        top: '-6%',
        fontSize: 24,
        color: '#D3DCFF',
        left: '55%',
        fontFamily: 'Amoreiza'
    },
})

