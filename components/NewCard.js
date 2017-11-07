import React, { Component } from 'react';
import { Card, CardItem, H1, H3, Text, Button, Input, Form, Item, Label } from 'native-base';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { addCardToDeck } from '../store';


class NewCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            answer: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)   
    }
    handleSubmit() {
        const { goBack, state } = this.props.navigation;
        const { id } = state.params;
        const { question, answer } = this.state;
        addCardToDeck(id, {
            question,
            answer
        })
        .then((id) => goBack())
        .then(() => this.setState({
            question: '',
            answer: '',
        }))
        .then(() => this.props.screenProps.update())
    }

    render() {
        const { state } = this.props.navigation;       
        return (
            <Card behavior={'padding'} style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <View style={styles.infoContainer}>
                        <Form style={styles.input}>
                            <Item floatingLabel>
                                <Label>Question</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>Answer</Label>
                                <Input />
                            </Item>
                        </Form>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button primary style={styles.button} block onPress={this.handleSubmit}>
                            <Text> Submit </Text>
                        </Button>
                    </View>
                </CardItem>
            </Card>
        );
    
    }

}

NewCard.navigationOptions = ({ navigation }) => ({
    headerTitle: 'New Card'
  });

const styles = StyleSheet.create({
    card : {
        flex: 1
    },
    cardItem: {
        alignItems: 'stretch',
        flexDirection: 'column',
        flex: 1
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

export default NewCard;