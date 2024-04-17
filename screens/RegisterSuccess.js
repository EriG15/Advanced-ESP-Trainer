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

import CustomButton from '../components/CustomButton';

const RegisterSuccess = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

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

      <Text style={styles.successText}>
        Success!
      </Text>

      <Text style={styles.paragraph}>
        Your account has been created. Log in to start connecting with your community.
      </Text>

      <TouchableOpacity onPress={handleLogin} style={styles.login}>
        <Text style={[styles.loginText, {color: activeColors.primary}]}>Back to Login</Text>
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
  successText: {
    color: '#7b9189',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textAlign: 'left',
    width: '90%',
    marginTop: 100,
    marginBottom: 30,
  },
  paragraph: {
    color: '#7b9189',
    fontSize: 16,
    fontWeight: 'bold',
    width: '90%',
    marginBottom: 40
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
});

export default RegisterSuccess;
