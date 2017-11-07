import React, { Component } from 'react';
import { Card, CardItem, H1, H3, Text, Button } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { getDeck } from '../store';
import FlipCard from './FlipCard';

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deck : null,
            currentIndex: 0,
            numCorrect: 0,
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const { id } = params;
        if (id) {
            getDeck(id).then(deck => this.setState({ 
                deck,
            }))
        }
    }

    componentWillReceiveProps(nextProps) {
        const { params } = nextProps.navigation.state;
        const { id } = params;
        if (id) {
            getDeck(id).then(deck => this.setState({ deck }))
        }
    }

    render() {
        const { deck, currentIndex } = this.state;
        const questions = deck && deck.questions;
        return deck && (
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                   <FlipCard
                        question={questions[currentIndex].question}
                        answer={questions[currentIndex].answer}
                    />
                    <View style={styles.buttonContainer}>
                        <Button success style={styles.button} block>
                            <Text> Correct </Text>
                        </Button>
                        <Button danger style={styles.button} block>
                            <Text> Incorrect </Text>
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
    question: {
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 1,
    },
    button: {
        margin: 15,
    },
});

export default Quiz;