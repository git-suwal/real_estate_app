import icons from '@/constants/icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native'; // or 'expo'

const TabIcon=({ focused, icon, title}:{focused: boolean, icon: any, title: string}) => (
  <View style={{
    flex: 1,
    marginTop: 6, 
    flexDirection: "column", 
    alignItems: "center",
  }}>
    <Image
      source={icon}
      tintColor={focused ? '#0061ff' : '#666876'}
      resizeMode="contain"
      style={{
        width: 24,
        height: 24,
      }}
    />
    <Text
      style={{
        color: focused ? '#666876' : '#666876', // change if your black-200 is different
        fontFamily: focused ? 'Rubik-Medium' : 'Rubik-Regular',
        fontSize: 12,
        width: '100%',
        textAlign: 'center',
        marginTop: 4,
      }}
      >
      {title} 
      </Text>
  </View>
)
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          borderTopColor: '#0061FF1A',
          borderTopWidth: 1,
          minHeight: 70,
        }
      }}
     >
      <Tabs.Screen
        name="index"
        options={{
          title:"Home",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon icon={icons.home} focused ={focused} title="Home" ></TabIcon>
          )
        }}
        />
        <Tabs.Screen
        name="explore"
        options={{
          title:"Explore",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon icon={icons.search} focused ={focused} title="Explore" ></TabIcon>
          )
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
          title:"Profile",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon icon={icons.person} focused ={focused} title="Profile" ></TabIcon>
          )
        }}
        />
     </Tabs>
  )

}

export default TabsLayout