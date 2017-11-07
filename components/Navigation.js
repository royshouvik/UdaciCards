import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Header, Title } from 'native-base';
import { Platform } from 'react-native';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import DeckDetail from './DeckDetail';
import NewCard from './NewCard';
import Quiz from './Quiz';
  
const Tab = TabNavigator(
    {
        DeckList: {
            screen: DeckList,
        },
        AddDeck: {
            screen: NewDeck,
        },
    },
    {
        tabBarOptions: {
            activeTintColor: (Platform.OS === 'ios') ? '#4285f4' : '#ffffff',
            indicatorStyle: {
                backgroundColor: '#ffffff'
            }
        }   
    }
);

export default StackNavigator({
    Main: { 
        screen: Tab,
        navigationOptions: {
            header: () => (<Header style={{ alignItems: 'center'}}>
                                <Title>UdaciCards</Title>
                            </Header>)
          },
    },
    DeckDetail: { screen: DeckDetail },
    NewCard: { screen: NewCard },
    Quiz: { screen: Quiz }
  });