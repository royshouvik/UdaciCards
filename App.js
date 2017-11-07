import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Container, Header, Content, Tab, Body, Title,  Left, Right } from 'native-base';
import { AppLoading } from 'expo';
import { key, seedData, getDecks, seedInitialData } from './store';
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import Quiz from './components/Quiz';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import Navigation from './components/Navigation';
import { StackNavigator } from 'react-navigation';
import { setLocalNotification } from './notification';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
    }
    this.loadResource = this.loadResource.bind(this);
    this.update = this.update.bind(this);
  }
  
  async loadResource() {
    await Promise.all(
      [
        Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        }),
      seedInitialData()
      .then(this.update),
      setLocalNotification()
    ])

  }

  async componentDidMount() {
    await getDecks().then(data => this.setState({ data }));
  }

  async update() {
    await getDecks().then(data => this.setState({ data }));
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <AppLoading
        startAsync={this.loadResource}
        onFinish={() => this.setState({ isLoading: false })}
        onError={console.warn}
      />
    ) : (
      <Container>
        <Navigation screenProps={{
          update: this.update,
          data: this.state.data,
        }}/>
    </Container>
    );
  }
}

