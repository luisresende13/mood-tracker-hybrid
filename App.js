import React, { Component, createContext, useContext } from 'react';
import { ImageBackground, Text, ActivityIndicator, Platform } from 'react-native';
import { Icon } from 'react-native-eva-icons'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Today } from './components/EntrancesComponent';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createDrawerNavigator } from '@react-navigation/drawer';

import EntrancesScreen from './components/EntrancesComponent';
import PostEntranceScreen from './components/PostEntryComponent';
import LoginScreen from './components/LoginComponent'
import SettingsScreen from './components/SettingsScreen';
import UserContext from './shared/UserContext';
import { WallpapersComponent } from './components/WallpapersComponent';
import { WallpaperZoom } from './components/WallpaperZoomComponent';

import * as Linking from 'expo-linking';
const linking = {
  prefixes: [Linking.createURL('/')],//, 'https://luisresende13.github.io/Mood-Tracker'],
  config: {
    screens: {
      Home: {
        screens: {
          Entrances: 'Entrances',
          Settings: 'Settings',
        },
      },
      PostEntrance: 'PostEntrance',
      WallpaperTopics: 'WallpaperTopics',
      Wallpapers: 'Wallpapers',
      WallpaperZoom: 'WallpaperZoom'
    }
  }
};

// cors-midpoint uri (needed to avoid cors' allow-cross-origin error when fetching in web platforms)
const corsURI = Platform.OS == 'web' ? 'https://morning-journey-78874.herokuapp.com/' : ''
const appServerURI = 'https://mood-tracker-server.herokuapp.com/'

const LoadingScreen = () => (
  <ImageBackground source={require('./assets/wallpaper.png')} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <ActivityIndicator size='large' color='#fff' />
  </ImageBackground>
)

const SettingsScreenProvider = (props) => {
  const appState = useContext(UserContext)
  return(
    <SettingsScreen  appState={appState} {...props} />
  )
}

const EntrancesScreenProvider = (props) => {
  const appState = useContext(UserContext)
  return(
    <EntrancesScreen  appState={appState} {...props} />
  )
}

const PostEntranceScreenProvider = (props) => {
  const appState = useContext(UserContext)
  return(
    <PostEntranceScreen  appState={appState} {...props} />
  )
}

const WallpapersScreenProvider = (props) => {
  const appState = useContext(UserContext)
  return(
    <WallpapersComponent  appState={appState} {...props} />
  )
}

const WallpaperZoomScreenProvider = (props) => {
  const appState = useContext(UserContext)
  return(
    <WallpaperZoom appState={appState} {...props} />
  )
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function tabBarIcon(iconName) {
  const iconFunc = ({ focused, color, size }) => {
    let newIconName = focused
    ? iconName + '-outline'
    : iconName + '-outline';
    return <Icon name={newIconName} width={size} height={size} fill={ focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.6)' } />
  }
  return iconFunc
}

const HomeTab = (props) => {
  const appState = useContext(UserContext)
  const mainScreenOptions = ({ route }) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    tabBarBackground: () => (
      <LinearGradient
        colors={['#f4f3f4', route.name=='Settings' ? route.params.selectedColor : appState.user.settings.backgroundColor, '#f4f3f4']}
        start={[route.name=='Entrances' ? -0.5 : 1.5, 1]}
        end={[route.name=='Entrances' ? 1 : 0, 1]}
        location={[0, 0.5, 1]}
        style={{flex: 1}}
      />
    ),
  })

  return(
    <Tab.Navigator
    initialRouteName='Entrances'
    screenOptions={mainScreenOptions}
    >
      <Tab.Screen
      name="Entrances"
      component={EntrancesScreenProvider}
      options={{
        tabBarIcon: tabBarIcon('inbox')
      }}
      />
      <Tab.Screen
      name="Settings"
      component={SettingsScreenProvider}
      initialParams={{
        selectedColor: appState.user.settings.selectedColor
      }}
      options={{
        tabBarIcon: tabBarIcon('settings-2')
      }}
      />
    </Tab.Navigator>    
  )
}

const HomeStack = () => {

  console.log('Returning "HomeScreen" component...')
  return(
    <Stack.Navigator 
    initialRouteName='Home'
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen
      name="Home"
      component={HomeTab}
      />
      <Stack.Screen
      name="PostEntrance"
      component={PostEntranceScreenProvider}
      initialParams={{
        currentEntry: {type: 'new', date: Today(), entry: null},
      }}
      />
      <Stack.Screen
      name="WallpaperTopics"
      component={WallpapersScreenProvider}
      initialParams={{
        headerText: 'Tópicos',
      }}
      />
      <Stack.Screen
      name="Wallpapers"
      component={WallpapersScreenProvider}
      initialParams={{
        headerText: 'Clique em uma imagem para ampliar',
      }}
      />
      <Stack.Screen
      name="WallpaperZoom"
      component={WallpaperZoomScreenProvider}
      />
    </Stack.Navigator>
  )  
}

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isUserAuth: false,
      isUserDataSyncing: false,
    };

    this.logout = this.logout.bind(this);
    this.getAppState = this.getAppState.bind(this);
    this.syncUserData = this.syncUserData.bind(this);
  }

  componentDidMount() {
    console.log('App component did mount...')
  }

  logout() {
    console.log('User logged out. Navigating to "LoginScreen"...')
    this.setState({isUserAuth: false, user: null})
  }

  getAppState() {
    return this.state
  }

  async syncUserData() {
    console.log('SYNC USER DATA STATUS: Started...')
    this.setState({ isUserDataSyncing: true });
    try {
        var UserResult = await fetch( corsURI + appServerURI + 'Users/' + this.state.user.username, { method: 'GET' });
        const userStatus =  'Status: ' + UserResult.status + ', ' + UserResult.statusText
        if (UserResult.ok) {
            console.log('fetch GET request for user DATA successful.')
            console.log(userStatus)
            console.log('SYNC USER DATA STATUS: Successful.')
            const user = await UserResult.json();
            this.setState({user: user})

        } else {
            console.log( new Error('"fetch" GET request for user DATA failed. Throwing error...') )
            throw new Error(userStatus)
        }
    } catch (error) {
            console.log('SYNC USER DATA STATUS: Error captured. Printing error...')
            console.log(error);
            alert('Não foi possível sincronizar as entradas. Por favor, aguarde..')

    } finally {
        this.setState({ isUserDataSyncing: false });
        console.log('SYNC USER DATA STATUS: Finished.')
    }    
}

  render() {
    console.log('Rendering "App" component...')

    return !this.state.isUserAuth ? (
      <LoginScreen
      user={this.state.user}
      getAppState={this.getAppState}
      setAppState={this.setState.bind(this)}
      />
    ) : (
      <UserContext.Provider
      value={{
        ...this.state,
        logout: this.logout,
        setAppState: this.setState.bind(this),
        syncUserData: this.syncUserData
      }}>
          <NavigationContainer
          linking={linking}
          fallback={<LoadingScreen />}
          >
            <HomeStack />
          </NavigationContainer>    
      </UserContext.Provider>
    );  
  }
}