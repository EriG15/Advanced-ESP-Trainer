import React, { useContext, useState } from 'react';
import { colors } from '../config/theme';
import { ThemeContext } from '../context/ThemeContext';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import CustomInputField from '../components/CustomInputField';
import {auth} from "../services/firebaseConfig"

const Login = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log('User registered successfully:', userCredential.user);
        global.userEmail = email
        navigation.navigate('Footer');
      } 
    catch (error) {
      console.error(error);
    } 
  };

  const handleRegistration = () => {
    navigation.navigate('Register');
  };

  const handlePasswordReset = () => {};

  return (
    <SafeAreaView
      style={{
        backgroundColor: activeColors.primary,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.image}
        resizeMode='contain'
      />

      <Text style={styles.welcomeText}>
        Welcome!
      </Text>

      <TextInput
        style={[
          styles.input,
          { borderColor: activeColors.text, color: activeColors.text },
        ]}
        placeholder='Email'
        placeholderTextColor={activeColors.placeholder}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={[
          styles.input,
          { borderColor: activeColors.text, color: activeColors.text },
        ]}
        placeholder='Password'
        placeholderTextColor={activeColors.placeholder}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.login}>
        <Text style={[styles.loginText, {color: activeColors.primary}]}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePasswordReset}
        style={styles.otherOption}>
        <Text style={styles.otherOptionText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegistration} style={styles.otherOption}>
        <Text style={styles.otherOptionText}>New User?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
  },
  welcomeText: {
    color: '#7b9189',
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textAlign: 'left',
    width: '90%',
    marginTop: 100,
    marginBottom: 50,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  login: {
    backgroundColor: '#7b9189',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 30,
  },
  loginText: {
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
  },
  otherOption: {
    marginTop: 20,
  },
  otherOptionText: {
    color: '#7b9189',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
});

export default Login;
