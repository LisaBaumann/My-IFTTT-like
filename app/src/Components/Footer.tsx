import React, {useContext} from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import { AreaContext } from "../Contexts/AreaContext";

export default function FooterComponent({navigation}) {
    const {setIsAction} = useContext(AreaContext)
    return(
        <View style={styles.footer}>
            <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.FooterButton]} onPress={() => navigation.navigate('MyArea')}>
                <Image style={{width: 40, height: 40}}
                       source={require('../../assets/icons/menu.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.FooterButton]} onPress={() => {setIsAction(0); navigation.navigate('Search')}}>
                <Image style={{width: 40, height: 40}}
                       source={require('../../assets/icons/search.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.FooterButton]} onPress={() => navigation.navigate('Discover')}>
                <Image style={{width: 40, height: 40}}
                       source={require('../../assets/icons/look.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        top: '91%',
        width: '100%',
        height: '9%',
        backgroundColor: '#22254F',
        display: 'flex',
        alignItems: 'center',
    },
    buttonsContainer: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        top: '3%',
        left: '25%'
    },
    FooterButton: {
        width: 80,
        height: 80

    },

    Display: {
        top: "1%",
        left: "5%",
    },

    Help: {
        top: "-92.5%",
        left: "40%"
    },

    Look: {
        top: "-187.5%",
        left: "75%"
    }

})