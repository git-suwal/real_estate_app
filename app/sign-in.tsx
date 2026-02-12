import icons from '@/constants/icons';
import images from '@/constants/images';
import { login } from '@/lib/appwrite';
import React from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const handlelogin = async () => {
    const result = await login();
    if (result) {
      console.log("Login Successful");
    }else { 
      Alert.alert("Login Failed", "Unable to login with Google. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* the house images */}
        <Image
          source={images.onboarding}
          style={{ width: '100%', height: '60%' }} 
          resizeMode="contain"
        />

        <View
          style={{
            paddingHorizontal: 40,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              textTransform: 'uppercase',
              fontFamily: 'Rubik',
              color: '#666876',
              marginBottom: 6,
            }}
          >
            Welcome to ReState
          </Text>

          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Rubik-Bold',
              color: '#333333',
              textAlign: 'center',
            }}
          >
            Let's Get You Closer to
          </Text>

          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Rubik-Bold',
              color: '#0061FF',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            Your Ideal Home
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Rubik',
              color: '#333333',
              textAlign: 'center',
              marginBottom: 16, 
            }}
          >
            Login to ReState with Google
          </Text>

          <TouchableOpacity
            onPress={handlelogin}
            activeOpacity={0.85}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4"
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={icons.google}
                style={{ width: 18, height: 18, marginRight: 8 }}
                resizeMode="contain"
              />

              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  lineHeight: 18,
                  fontFamily: 'Rubik-Medium',
                  color: '#333333',
                  includeFontPadding: false,
                  textAlignVertical: 'center',
                }}
              >
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

