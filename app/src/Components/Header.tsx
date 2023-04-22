import React from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {DrawerActions} from '@react-navigation/native';

 export default function HeaderComponent({navigation}) {
     return (
         <View style={styles.header}>
             {/* profile Icon */}
             <TouchableOpacity style={{marginLeft: '3%', width: '20%', top: '25%'}} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                 <Image style={{width: '80%', height: '85%'}}
                        source={require('../../assets/icons/profile.png')}/>
             </TouchableOpacity>
             {/* Title Icon */}
             <TouchableOpacity style={{width: '30%', left: '35%', top: '-50%'}} onPress={() => navigation.navigate('Home')}>
                <Image style={{width: '100%', height: '70%'}}
                    source={require('../../assets/icons/title/title.png')}/>
            </TouchableOpacity>
         </View>
     )
 }

const styles = StyleSheet.create({
    header: {
        marginTop: '3%',
        height: '10%',
        borderBottomWidth: '1%',
        borderColor: '#3A3F86',
        display: 'flex',
        flexDirection: 'column'
    },
})
