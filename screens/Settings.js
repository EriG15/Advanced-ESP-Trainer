import {
  View,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Appearance,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { colors } from '../config/theme';
import { ThemeContext } from '../context/ThemeContext';
import StyledText from '../components/texts/StyledText';
import SettingsItem from '../components/settings/SettingsItem';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebaseConfig'

const Settings = ({ navigation }) => {

  const { theme, updateTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  let activeColors = colors[theme.mode];

  //here we set the state of the switch to the current theme
  //theme.mode is the current theme which we get from the context
  const [isDarkTheme, setIsDarkTheme] = useState(theme.mode === 'dark');

  //here we toggle the theme and update the state of the switch
  const toggleTheme = () => {
  console.log(`toggling theme`)

    updateTheme();
    setIsDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    //here we listen for the color scheme change and update the state of the switch
    //this is necessary so that the switch automatically updates
    //when the user changes the theme from the settings
    Appearance.addChangeListener(({ colorScheme }) => {
      console.log(`colorScheme: ${colorScheme}`)
      colorScheme === 'dark' ? setIsDarkTheme(true) : setIsDarkTheme(false);
    });
  }, []);

  useEffect(() => {
    const userEmail = auth.currentUser.email;
    setEmail(userEmail);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={[{ backgroundColor: activeColors.primary }, styles.Container]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >

      <StyledText style={{ color: activeColors.accent }} bold>
        Theme Switch
      </StyledText>

      <View style={styles.section}>
        <SettingsItem label='Dark Mode'>
          <Switch
            value={isDarkTheme}
            onValueChange={toggleTheme}
            thumbColor={isDarkTheme ? '#fff' : activeColors.tertiary}
            ios_backgroundColor={activeColors.primary}
            trackColor={{
              false: activeColors.primary,
              true: activeColors.accent,
            }}
          ></Switch>
        </SettingsItem>
      </View>
      <View style={styles.section}>
        <SettingsItem label={'Email: ' + global.userEmail}>
        </SettingsItem>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <SettingsItem>
            <Ionicons name='log-out-outline' size={24} color='red' />
            <StyledText style={{ color: 'red' }}> Logout</StyledText>
          </SettingsItem>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 25,
  },
  section: {
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 25,
    marginBottom: 25,
  },
  logout: {
    bottom: 0,
    position: 'absolute',
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 25,
    alignSelf: 'center',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Settings;
