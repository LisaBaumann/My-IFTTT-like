import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HeaderComponent from "../Header";
import FooterComponent from "../Footer";
export default function DiscoverScreen({navigation}) {
    return(
        <View style={styles.container}>
            <HeaderComponent navigation={navigation}/>
            <View style={styles.body}>
                <Text style={styles.title}>Discover</Text>
                <Text style={styles.info}>Connect to the platforms of your choice. choose your action and the REActions associated with them.</Text>
                <Text style={styles.infoPlus}>1. From the main menu choose your Action and REAction</Text>
                <TouchableOpacity style={styles.ActionContainer} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.addAction}>+</Text>
                </TouchableOpacity>
                <Text style={styles.actionTitle}>Action</Text>
                <View style={styles.bodyMarge}/>

                <TouchableOpacity style={styles.ReactionContainer} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.addReaction}>+</Text>
                </TouchableOpacity>
                <Text style={styles.reactionTitle}>Reaction</Text>
            </View>
            <FooterComponent navigation={navigation} />
        </View>
    )

}
const styles = StyleSheet.create({
    container: {

        height: '100%',
        width: '100%',
        //backgroundColor: "#090a23"
        backgroundColor: '#1C1E3D',
    },
    body :{
        marginLeft: '5%',
        height: '100%',
        width: '90%',
        top: '5%',

    },
    title: {
        fontSize: 24,
        color: '#D3DCFF',
        top: '1%',
        left: '36%',
        fontWeight: 'bold',
        fontFamily: 'Amoreiza'
    },
    info: {
        fontSize: 20,
        textAlign: "center",
        justifyContent: "center",
        color: "#D3DCFF",
        top: "3%",
        fontFamily: 'Amoreiza'
    },

    infoPlus: {
        fontSize: 19,
        textAlign: "center",
        justifyContent: "center",
        color: "#D3DCFF",
        top: "5%",
        fontFamily: 'Amoreiza'
    },

    ActionContainer: {
        width: 100,
        height: 100,
        top: '10%',
        left: '37%',
        backgroundColor: '#22254F',
        borderRadius: 15
    },
    addAction: {
        fontSize: 90,
        color: '#D3DCFF',
        textAlign: "center",
        justifyContent: "center",
        top: '-10%'
    },
    actionTitle: {
        fontSize: 24,
        color: '#D3DCFF',
        top: '11%',
        left: '2.5%',
        textAlign: 'center',
        fontFamily: 'Amoreiza'
    },
    bodyMarge: {
        borderBottomWidth: 5,
        borderColor: '#22254F',
        top: '15%'
    },
    ReactionContainer: {
        width: 100,
        height: 100,
        top: '20%',
        left: '37%',
        backgroundColor: '#22254F',
        borderRadius: 15
    },
    addReaction: {
        fontSize: 90,
        color: '#D3DCFF',
        textAlign: "center",
        justifyContent: "center",
        top: '-10%'
    },
    reactionTitle: {
        fontSize: 24,
        color: '#D3DCFF',
        top: '21%',
        left: '3%',
        textAlign: 'center',
        fontFamily: 'Amoreiza'
    },


})
