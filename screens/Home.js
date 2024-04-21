import React, { useContext, useState, useRef } from 'react';
import { colors } from '../config/theme';
import { ThemeContext } from '../context/ThemeContext';
import { View, ScrollView, RefreshControl, Image } from 'react-native';
import { StyleSheet } from 'react-native';

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
