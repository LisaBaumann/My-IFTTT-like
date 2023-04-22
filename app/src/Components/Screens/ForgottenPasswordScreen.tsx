import {useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput,TouchableOpacity  } from 'react-native';

export default function ForgottenPasswordScreen({navigation}) {
    const [email, setemail] = useState('');
    return (
        <View style={styles.bckg}>
            <Image style={styles.image} source={require('../../../assets/logo_blue.png')}></Image>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Email address" onChangeText={setemail} value={email}/>
                <TouchableOpacity style={styles.buttonRegistration} onPress={() => navigation.navigate('Login')}>
                    <Text style={{textAlign: 'center', fontFamily: 'Amoreiza'}}>reset password</Text>
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
      height: '25%',
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
      left: '15%',
      top: '65%',
      width: '30%'
  },
  buttonRegistration: {
      backgroundColor: "#D3DCFF",
      borderRadius: 10,
      paddingVertical: "10%",
      paddingHorizontal: 12,
      position: "absolute",
      top: '55%',
      width: '50%',
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
      fontFamily: 'Amoreiza',
  },
  forgottenPassword: {
      color: '#2192FF',
      top: '60%',
      fontSize: 17,
      fontFamily: 'Amoreiza'
  },
});