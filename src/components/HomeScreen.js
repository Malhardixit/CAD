import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Linking,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SlideShow from './SlideShow';
import {dummyData} from '../assets/consts/Data';
import {dummyDataName} from '../assets/consts/Aadhar';
import Profile from './Profile';
import {useBackHandler} from '@react-native-community/hooks';
import HomeIcon from './HomeIcon';
import {InputOTPScreen} from './InputOTPScreen';

const {height, width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  function backActionHandler() {
    Alert.alert('', 'Are you sure you want to exit the app?', [
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  }
  useBackHandler(backActionHandler);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}>
      <SlideShow data={dummyData} />
      <HomeIcon navigation={navigation} />

      {/* <Text
        style={{
          textAlign: 'center',
          position: 'absolute',
          width: 94,
          // height: 42
          top: 20,
          color: 'white',
          fontFamily: 'Poppins',
          fontSize: 14,
        }}>
        Book Appointment
      </Text>
      <Text
        style={{
          position: 'relative',
          textAlign: 'center',
          width: width / 5,
          height: height,
          //left: 120,
          top: 20,
          color: 'white',
          fontFamily: 'Poppins',
          fontSize: 14,
        }}>
        Make Payment
      </Text> */}
      {/* <Text
          style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            textAlign: 'center',
            // width: 94,
            // height: 42,
            // left: 20,
            // top: 5,
            color: 'white',
            fontFamily: 'Poppins',
            fontSize: 14,
          }}>
          Upcoming Appointment
        </Text>
        <Text
          style={{
            textAlign: 'center',
            // width: 94,
            // height: 42,
            // left: 35,
            top: 5,
            color: 'white',
            fontFamily: 'Poppins',
            fontSize: 14,
          }}>
          Transaction History
        </Text> */}

      <Profile data={dummyDataName} />
    </View>
  );
};

const styles = StyleSheet.create({
  textProp: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default HomeScreen;
