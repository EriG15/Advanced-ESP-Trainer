import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput
} from 'react-native';
import { colors } from '../config/theme';
import { ThemeContext } from '../context/ThemeContext';


import DatePicker from 'react-native-date-picker';

import CustomInputField from '../components/CustomInputField';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import {auth} from "../services/firebaseConfig"
import CustomButton from '../components/CustomButton';

const Register = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [errors, setErrors] = useState({}); 
  const [isFormValid, setIsFormValid] = useState(false); 

  const validateForm = () => {
    let errors = {};

    // Validate email
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    // Validate password
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    // Validate password confirmation
    if (!passwordConfirmation) {
      errors.confirmPassword = 'Password confirmation is required.';
    } else if (password !== passwordConfirmation) {
      errors.confirmPassword = 'Passwords do not match';
    }

    let isFormValid = Object.keys(errors).length === 0;
    setErrors(errors);
    setIsFormValid(isFormValid);

    return isFormValid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        console.log('User registered successfully:', userCredential.user);
        navigation.navigate('RegisterSuccess');
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Form is not valid');
    }
  };



  const handleLogin = () => {
    navigation.navigate('Login');
  };

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

      <Text style={styles.registerText}>
        Register Account With Us
      </Text>

      <TextInput
        style={[
          styles.input,
          { borderColor: activeColors.text, color: activeColors.text },
        ]}
        placeholder='Username'
        placeholderTextColor={activeColors.placeholder}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

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

      <TextInput
        style={[
          styles.input,
          { borderColor: activeColors.text, color: activeColors.text },
        ]}
        placeholder='Password Confirmation'
        placeholderTextColor={activeColors.placeholder}
        secureTextEntry={true}
        value={passwordConfirmation}
        onChangeText={(text) => setPasswordConfirmation(text)}
      />

      <TouchableOpacity onPress={handleSignUp} style={styles.signup}>
        <Text style={[styles.signupText, {color: activeColors.primary}]}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.login}>
        <Text style={styles.loginText}>Log In Instead</Text>
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
  registerText: {
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
  signup: {
    backgroundColor: '#7b9189',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 30,
  },
  signupText: {
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
  },
  login: {
    marginTop: 20,
  },
  loginText: {
    color: '#7b9189',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
});

export default Register;
