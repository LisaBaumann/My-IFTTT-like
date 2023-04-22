import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from "react";
import { register } from '../../Api';

export default function RegisterScreen({navigation}) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [nameError, setNameError] = useState(false)
    const [surnameError, setSurnameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const tryRegister = async () => {
        if ((name && surname && email && re.test(email)) && password && confirmPassword ) {
            register({name, surname, email, password, confirmPassword })
            .then(async (data) => {
                console.log(data.data)
                if (data.status === 201)
                    navigation.navigate('Login')
            })
            .catch(err => console.log(err))
        } else {
            if ((!re.test(email))) {
                setEmailError(true)
            } else {
                setEmailError(true)
            }
        }
        if (!name) {
            setNameError(true)
        }
        if (!surname) {
            setSurnameError(true)
        }
        if (!email) {
            setEmailError(true)
        }
        if (!password) {
            setPasswordError(true)
        }
        if (!confirmPassword) {
            setConfirmPasswordError(true)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleArea}>AREA</Text>

            <Text style={styles.legendeArea}>AUTOMATION PLATFORM OF HIS DIGITAL LIFE</Text>

            <View style={styles.containerRegister}>

                <Text style={styles.titleRegister}>Register</Text>

                <Text style={styles.titleInput}>Name</Text>
                <TextInput
                    placeholder="" placeholderTextColor = "#1C1E3D" selectionColor= "#1C1E3D"
                    value={name} onChangeText={text => setName(text)} style={[styles.input]}
                    >
                </TextInput>
                {/* SURNAME */}
                <Text style={styles.titleInput}>Surname</Text>
                <TextInput
                    placeholder="" placeholderTextColor = "#1C1E3D" selectionColor= "#1C1E3D"
                    value={surname} onChangeText={text => setSurname(text)} style={[styles.input]}
                    >
                </TextInput>
                {/* EMAIL */}
                <Text style={styles.titleInput}>Email</Text>
                <TextInput
                    placeholder="" placeholderTextColor = "#1C1E3D" selectionColor= "#1C1E3D"
                    value={email} onChangeText={text => setEmail(text)} style={[styles.input]}
                >
                </TextInput>
                {/* PASSWORD */}
                <Text style={styles.titleInput}>Password</Text>
                <TextInput
                    placeholder="" placeholderTextColor = "#1C1E3D" selectionColor= "#1C1E3D"
                    value={password} onChangeText={text => setPassword(text)} style={[styles.input]}
                    secureTextEntry
                >
                </TextInput>
                {/* CONFIRM PASSWORD */}
                <Text style={styles.titleInput}>Confirm Password</Text>
                <TextInput
                    placeholder="" placeholderTextColor = "#1C1E3D" selectionColor= "#1C1E3D"
                    value={confirmPassword} onChangeText={text => setConfirmPassword(text)} style={[styles.input]}
                    secureTextEntry
                >
                </TextInput>

                <TouchableOpacity style={styles.buttonSubmit}
                                  onPress={ () =>  {tryRegister()}}>
                    <Text style={styles.submit}>OK</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonlogin} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.login}>I already have an account</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '80%',
        width: '100%',
        //backgroundColor: "#090a23"
        backgroundColor: '#1C1E3D',
    },

    titleArea: {
        fontFamily: 'Amoreiza',
        color: '#D3DCFF',
        textAlign: 'center',
        top: '5%',
        fontSize: '50%',
    },

    legendeArea: {
        top: '6%',
        textAlign: 'center',
        fontSize: '15%',
        color: '#D3DCFF',
        fontFamily: 'Amoreiza',
    },

    containerRegister: {
        top: '10%',
        left: '10%',
        borderWidth: '3%',
        borderColor: '#D3DCFF',
        borderRadius: '15%',
        width: '80%',
        height: '70%',
    },

    titleRegister: {
        textAlign: 'center',
        top: '1%',
        fontSize: '30%',
        color: '#D3DCFF',
        fontFamily: 'Amoreiza',
    },

    titleInput: {
        top: '3%',
        left: '13%',
        color: '#D3DCFF',
        fontFamily: 'Amoreiza',
    },

    input: {
        top: '4%',
        left: '10%',
        marginBottom: '10%',
        borderWidth: '5%',
        borderRadius: '15%',
        borderColor: '#D3DCFF',
        width: '80%',
        height: '7%',
        color: '#1C1E3D',
        backgroundColor: '#D3DCFF',
        fontFamily: 'Amoreiza',
    },

    buttonSubmit: {
        left : '47%',
        width: '10%',
        top: '2%',
    },

    submit: {
        color: '#D3DCFF',
        fontSize: '20%',
        fontFamily: 'Amoreiza',
    },

    buttonlogin: {
        top: '5%',
        left: '5%',
    },

    login: {
        color: '#D3DCFF',
        fontFamily: 'Amoreiza',
    },


})
