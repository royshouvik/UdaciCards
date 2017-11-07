import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDecks } from '../store';
import Deck from './Deck';

export default class DeckList extends Component {
    
    static navigationOptions = {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards"
          />
        ),
      };
    

    render() {
        const data = this.props.screenProps.data || [] ;
        const { navigate } = this.props.navigation;
        return(
            <ScrollView>
                {
                    data.map(deck => <Deck
                                        key={deck.title}
                                        deck={deck}
                                        navigate={navigate}
                                    />)
                }
            </ScrollView>
            );
        }
}