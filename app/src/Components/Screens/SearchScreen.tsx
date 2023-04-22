import React, { useContext, useEffect } from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import { getPlatforms } from "../../Api";
import { AreaContext } from "../../Contexts/AreaContext";
import { AuthContext } from "../../Contexts/AuthContext";
import FooterComponent from "../Footer";
import HeaderComponent from "../Header";

export default function HomeScreen({navigation}) {

    const {platforms, setPlatforms, setCurrentPlatform} = useContext(AreaContext)
    const {accessToken} = useContext(AuthContext)

    useEffect(() => {
        getPlatforms(accessToken)
            .then((data) => {
                setPlatforms(data.data.platforms)
            })
            .catch((err) => console.log(err));
    }, [])


    
    return (
        <View style={styles.container}>
            <HeaderComponent navigation={navigation}/>
            <View style={styles.body}>
                <Text style={styles.bodyTitle}>Services</Text>
                <ScrollView scrollEnabled={true} style={styles.scrollView}>
                    <View style={styles.boxServices}>
                        { platforms.map((platform, index) => (
                                <View key={index} style={styles.box}>
                                    <TouchableOpacity onPress={() => {setCurrentPlatform(platform.name + ':' + platform.imagePath); navigation.navigate('Service')}}>
                                        <Image style={{height: 75, width: 90, right: "3%", top: "6%", resizeMode: 'contain'}}
                                            source={{uri: platform.imagePath}}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        )}
                    </View>
                </ScrollView>
            </View>
            <FooterComponent navigation={navigation} />
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

    body :{
        height: '80%',
        top: '5%',

    },

    scrollView: {
        // maxHeight: "74%",
    },
    bodyTitle: {
        fontSize: '25%',
        color: '#D3DCFF',
        left: '5%',
        top: '-2%',
        fontFamily: 'Amoreiza',
    },
    boxServices: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "center"
    },
    box: {
        height: 100,
        width: 100,
        left: '4%',

        marginRight: '15%',
        marginBottom: '15%',
        borderWidth: '7%',
        backgroundColor: '#D3DCFF',
        borderRadius: '10%',
        borderColor:'#D3DCFF'
    },

})