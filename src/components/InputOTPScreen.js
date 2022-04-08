import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';

export function InputOTPScreen({
  navigation,
  route: {
    params: {phonenumber},
  },
}) {
  let textInput = useRef(null);
  const lengthInput = 4;
  let clockCall = null;
  const defaultCountdown = 30;
  const [internalVal, setInternalVal] = useState('');
  const [countDown, setCountDown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);

  const onChangeText = val => {
    setInternalVal(val);
    if (val.length === lengthInput) {
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const decrementClock = () => {
    if (countDown === 0) {
      setEnableResend(true);
      setCountDown(0);
      clearInterval(clockCall);
    } else {
      setCountDown(countDown - 1);
    }
  };

  const onChangeOTP = () => {
    if (enableResend) {
      setCountDown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock(0);
      }, 1000);
      //navigation.navigate('Authentication');
    }
  };

  // const verifyOtp = () => {
  //   // console.log(otp);
  //   // navigation.navigate('Home');
  //   fetch(`https://sihpaymentapis.herokuapp.com/verifyOTP?code=${otp}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       // dispatch({type: 'ADD_DATA', payload: data});
  //       if (data.Message == 'Verified') {
  //         // setOtp(data);
  //         navigation.navigate('Main');
  //         console.log('pressed');
  //         console.log(otp);
  //       } else {
  //         Alert.alert('Invalid OTP');
  //         navigation.navigate('Authentication');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // console.log(otp);
  // };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Authentication');
            }}>
            <Icon name="chevron-left" size={24} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Verification Code </Text>
          </View>
          <View style={{width: 20}} />
        </View>
      </SafeAreaView>
      <View>
        <View style={styles.svgWrapper}>
          <Svg viewBox="0 0 1440 320">
            <Path
              fill="#5566ee"
              d="M0,128L60,149.3C120,171,240,213,360,213.3C480,213,600,171,720,128C840,85,960,43,1080,42.7C1200,43,1320,85,1380,106.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </Svg>
        </View>
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.confirm}>CONFIRMATION</Text>
        </View>
        <View>
          <Text style={styles.OtpText}>
            Please Enter OTP sent to{' '}
            <Text style={styles.phonenumberText}>{phonenumber}</Text>
          </Text>
        </View>

        <View>
          <TextInput
            ref={input => (textInput = input)}
            onChangeText={onChangeText}
            style={{width: 0, height: 0}}
            value={internalVal}
            maxLength={lengthInput}
            returnKeyType="done"
            keyboardType="numeric"
          />

          <View style={styles.containerInput}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View
                  key={index}
                  style={[
                    styles.cellView,
                    {
                      borderBottomColor:
                        index === internalVal.length ? 'white' : 'black',
                    },
                  ]}>
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}>
                    {internalVal && internalVal.length >= 0
                      ? internalVal[index]
                      : ''}
                  </Text>
                </View>
              ))}
          </View>
        </View>

        <View style={styles.resendOTP}>
          <TouchableOpacity onPress={onChangeOTP}>
            <View>
              <Text
                style={[
                  styles.resendText,
                  {
                    color: enableResend ? 'black' : 'white',
                  },
                ]}>
                Resend OTP in {countDown}s
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/*  <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={styles.button}>
            <Icon name="arrow-right" size={25} style={styles.Iconbtn} />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    //fontWeight: 'bold',
    color: '#151515',
  },
  svgWrapper: {
    height: 100,
  },
  content: {
    backgroundColor: '#5566ee',
    flex: 1,
    marginTop: -10,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  roundContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //paddingVertical: 10,
  },
  round: {
    height: 60,
    width: 60,
    borderRadius: 60,
    fontSize: 90,
    backgroundColor: '#7788ef',
    alignItems: 'center',
  },
  confirm: {
    fontSize: 24,
    color: '#fff',
    //fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  otp: {
    fontSize: 30,
    color: 'white',
  },
  OtpText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#a2b2fd',
    textAlign: 'center',
    paddingVertical: 20,
  },
  phonenumberText: {
    color: '#fff',
    fontWeight: '700',
  },
  resendOTP: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  resendText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  Iconbtn: {
    color: '#4355ee',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cellView: {
    paddingVertical: 5,
    height: 40,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});
