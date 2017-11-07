import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Container, Header, Content,  Title,  Left, Right } from 'native-base';
import { View, Text } from 'react-native';
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
            activeTintColor: '#ffffff',
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