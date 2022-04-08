import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Splash from '../assets/consts/icon.svg';
import Snackbar from 'react-native-snackbar';

const {height, width} = Dimensions.get('window');

export function Authentication({navigation}) {
  const [phonenumber, setPhoneNumber] = useState();

  const onChangePhone = number => {
    setPhoneNumber(number);
  };

  const fetchOTP = () => {
    fetch(
      `https://sihpaymentapis.herokuapp.com/generateOTP?phoneNumber=${phonenumber}`,
    )
      .then(res => res.json())

      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(phonenumber);
  };

  const inputRef = useRef();

  const onPressContinue = () => {
    if (phonenumber == null) {
      Snackbar.show({
        text: "Field Can't be empty",
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'red',
        backgroundColor: '#F5F5F5',
      });
    } else if (phonenumber.length !== 10) {
      Snackbar.show({
        text: 'Please Enter Valid Number',
        duration: Snackbar.LENGTH_SHORT,
        textColor: 'red',
        backgroundColor: 'white',
      });
    } else if (phonenumber.length == 10) {
      navigation.navigate('InputOTP', {phonenumber});
      console.log('pressed');
      //fetchOTP();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={150}
        behavior={'padding'}
        style={styles.avoidingView}>
        <SafeAreaView style={styles.headerWrapper}>
          <StatusBar backgroundColor="#5566ee" barStyle="light-content" />
          <View style={styles.header}>
            <View>
              <Icon
                name="chevron-left"
                size={24}
                style={styles.iconwhite}
                onPress={() => {
                  BackHandler.exitApp();
                }}
              />
            </View>
            <View>
              <Text style={styles.headerText}>Send Code</Text>
            </View>
            <View style={{width: 20}} />
          </View>

          <View style={styles.splash}>
            <Splash height={80} width={80} />
          </View>
        </SafeAreaView>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Enter Your Number &gt;</Text>
          </View>

          <View>
            <TextInput
              ref={inputRef}
              onLayout={() => inputRef.current.focus()}
              style={styles.input}
              placeholder="Your Phone Number"
              placeholderTextColor="#ababab"
              maxLength={10}
              keyboardType="numeric"
              onChangeText={onChangePhone}
              value={phonenumber}
            />
          </View>
          <View>
            <Text style={styles.description}>
              We will send you a verification code to your phone number
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={onPressContinue}>
              <Icon name="arrow-right" size={25} style={styles.Iconbtn} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerWrapper: {
    backgroundColor: '#5566ee',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconwhite: {
    color: '#fff',
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    //fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
  splash: {
    padding: 60,
    paddingBottom: 160,
    alignItems: 'center',
  },
  content: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: -60,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    //fontWeight: 'bold',
    fontSize: 18,
    color: '#2d2d2d',
    paddingVertical: 20,
  },
  input: {
    fontFamily: 'Poppins-SemiBold',
    //fontWeight: '500',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 2,
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 20,
    color: 'black',
  },
  description: {
    fontFamily: 'Poppins-SemiBold',
    color: '#989898',
    textAlign: 'center',
    fontSize: 18,
    padding: 20,
    //fontWeight: '500',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginVertical: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4355ee',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  Iconbtn: {
    color: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});
