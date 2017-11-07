import React, { Component } from 'react';
import { Card, CardItem, H1, H3, Text, Button, Input, Form, Item, Label } from 'native-base';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { saveDeckTitle } from '../store';

class NewDeck extends Component {
    static navigationOptions = {
        tabBarLabel: 'New Deck',
      };

    constructor(props) {
        super(props);

        this.state = {
            title: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)   
    }
    handleSubmit() {
        const { navigate } = this.props.navigation;
        const { title } = this.state;
        saveDeckTitle(title)
        .then((deck) => navigate('DeckDetail', { id: deck.id }))
        .then(() => this.setState({ title: ''}))
        .then(() => this.props.screenProps.update())
    }
    render() {
        return (
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <View style={styles.infoContainer}>
                        <H1 style={styles.deckName}> What's the title of your new deck? </H1>
                        <Form style={styles.input}>
                            <Item floatingLabel>
                                <Label>Deck Title</Label>
                                <Input
                                    onChangeText={(title) => this.setState({title})}
                                    value={this.state.title}
                                />
                            </Item>
                        </Form>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button primary style={styles.button} block onPress={this.handleSubmit}>
                            <Text> Create Deck </Text>
                        </Button>
                    </View>
                </CardItem>
            </Card>
        
        );
    }
}

const styles = StyleSheet.create({
    card : {
        flex: 1
    },
    cardItem: {
        alignItems: 'stretch',
        flexDirection: 'column',
        flex: 1
    },
    deckName: {
        flex: 1,
        marginTop: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 1,
    },
    input: {
        flex: 2,
        alignSelf: 'stretch'
    },
    button: {
        margin: 15,
    },
    infoContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default NewDeck;