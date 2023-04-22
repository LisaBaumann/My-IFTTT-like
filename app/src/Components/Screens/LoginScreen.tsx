import React, {useContext, useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { login } from '../../Api';
import { AuthContext } from '../../Contexts/AuthContext';

export default function LoginScreen({navigation}) {
    const [email, setEmailInput] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const {setAccessToken, setName} = useContext(AuthContext)

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const tryConnexion = async () => {
        if ((email && re.test(email)) && password) {
            login(email, password)
                .then(async (data) => {
                    console.log(data.data)
                    if (data.data.access_token != null) {
                        setAccessToken(data.data.access_token)
                        navigation.navigate('Home')
                    }
                })
                .catch(err => console.log(err))
        } else {
            if ((!email || !re.test(email)) && password) {
                setEmailError(true)
            } else if (re.test(email) && !password) {
                setPasswordError(true)
            } else {
                setEmailError(true)
                setPasswordError(true)
            }
        }
    }

    return (
        <View style={styles.bckg}>
            <Image style={styles.image} source={require('../../../assets/logo_blue.png')}></Image>
            <View style={styles.container}>
                <Text style={{color: '#D3DCFF', fontSize: '25', fontFamily: 'Amoreiza', marginTop: '2%'}}>Login</Text>
                <TextInput style={styles.input} placeholder="Email address" onChangeText={setEmailInput} value={email}/>
                <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry={true}/>
                <TouchableOpacity>
                    <Text style={styles.forgottenPassword} onPress={() => navigation.navigate('Forgot')}>Forgotten password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonConnection} onPress={() => {tryConnexion()} }>
                    <Text style={{textAlign: 'center', fontFamily: 'Amoreiza'}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRegistration} onPress={() => navigation.navigate('Register')}>
                    <Text style={{textAlign: 'center', fontFamily: 'Amoreiza'}}>No account ?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  bckg: {
    backgroundColor: '#1C1E3D',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '15%',
    width: '60%',
    height: '15%',
  },
  container: {
      backgroundColor: '#1C1E3D',
      borderWidth: 3,
      borderColor: '#D3DCFF',
      height: '40%',
      width: '75%',
      top: '30%',
      borderRadius: 20,
      alignItems: 'center',
  },
  buttonConnection: {
      backgroundColor: "#D3DCFF",
      borderRadius: 10,
      paddingVertical: "11%",
      paddingHorizontal: 12,
      position: "absolute",
      left: '8%',
      top: '75%',
      width: '40%'
  },
  buttonRegistration: {
      backgroundColor: "#D3DCFF",
      borderRadius: 10,
      paddingVertical: "11%",
      paddingHorizontal: 12,
      position: "absolute",
      left: '52%',
      top: '75%',
      width: '40%',
  },
  input: {
      borderWidth: 3,
      borderColor: '#D3DCFF',
      width: "80%",
      top: '5%',
      borderRadius: 10,
      padding: 10,
      backgroundColor: "#D3DCFF",
      margin: 9,
      fontFamily: 'Amoreiza'
  },
  forgottenPassword: {
      color: '#2192FF',
      top: '60%',
      fontSize: 17,
      fontFamily: 'Amoreiza'
  },
});