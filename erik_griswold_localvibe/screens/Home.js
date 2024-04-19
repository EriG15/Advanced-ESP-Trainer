import React, { useContext, useState, useRef } from 'react';
import { colors } from '../config/theme';
import { ThemeContext } from '../context/ThemeContext';
import { View, ScrollView, RefreshControl, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import {db, app, auth} from "../services/firebaseConfig"

const Home = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Fetch new data here and update your state

    // After fetching the data, set refreshing to false
    setRefreshing(false);
  };

  const [isDarkTheme, setIsDarkTheme] = useState(theme.mode === 'dark');

  const toggleTheme = () => {
  console.log(`toggling theme`)

    updateTheme();


    setIsDarkTheme((prev) => !prev);
  };

  {/*const getDarkModeSetting = async () => {

    const db = app.firestore();
    
    const user = auth.currentUser;
    
    if (user) {
        
        const docRef = db.collection('userSettings').doc(user.uid);
        console.log('printing', docRef)
        try {
            
            const doc = await docRef.get();
            console.log('here')
            if (doc.exists) {
                const userData = doc.data();
                console.log('Dark mode is:', userData.darkMode);
                return userData.darkMode; 
            } else {
                console.log('No user settings found!');
                return false; 
            }
        } catch (error) {
            console.error('Error fetching dark mode setting:', error);
            return false; // Handle errors or defaults as appropriate
        }
    } else {
        console.error('No user logged in!');
        return false; 
    }
  };

  console.log("testing",getDarkModeSetting())*/}

  // const test = db
  //   .collection('Users')
  //   .add({
  //     name: 'Ada Lovelace',
  //     age: 30,
  //   })
  //   .then(() => {
  //     console.log('User added!');
  //   });



  // const data = app.firestore()
  //   .collection('Users')
  //   .doc('ABC')
  //   .get()
  //   .then(documentSnapshot => {
  //     console.log('User exists: ', documentSnapshot.exists);

  //     if (documentSnapshot.exists) {
  //       console.log('User data: ', documentSnapshot.data());
  //     }
  //     else{
  //       console.log('nothing')
  //     }
  //   });


  

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        {
          backgroundColor: activeColors.primary,
        },
        styles.Container,
      ]}
      contentContainerStyle={{ flexGrow: 1 }}
      >

      <Image
        source={require('../assets/logo.png')}
        style={styles.image}
        resizeMode='contain'
      />


        


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
  },
});

export default Home;
