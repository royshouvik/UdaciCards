import React, { Component } from 'react';
import { Card, CardItem, H1, H3, Text, Button } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { getDeck } from '../store';
import { setLocalNotification, clearLocalNotification } from '../notification';
import FlipCard from './FlipCard';

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: `Quiz`,
      });

    constructor(props) {
        super(props);
        this.state = {
            deck : null,
            currentIndex: 0,
            numCorrect: 0,
        }
        this.onCorrect = this.onCorrect.bind(this);
        this.onIncorrect = this.onIncorrect.bind(this);
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const { id } = params;
        if (id) {
            getDeck(id).then(deck => this.setState({ 
                deck,
            }))
        }

        clearLocalNotification()
            .then(setLocalNotification);
    }

    componentWillReceiveProps(nextProps) {
        const { params } = nextProps.navigation.state;
        const { id } = params;
        if (id) {
            getDeck(id).then(deck => this.setState({ deck }))
        }
    }

    onCorrect() {
        const { deck, currentIndex, numCorrect } = this.state;
        if ((currentIndex + 1) < deck.questions.length ) {
            this.setState({
                numCorrect: numCorrect + 1,
                currentIndex: currentIndex + 1,
            });
        } else {
            this.setState({
                numCorrect: 0,
                currentIndex: 0,
            })
        }
    }

    onIncorrect() {
        const { deck, currentIndex } = this.state;
        if ((currentIndex + 1) < deck.questions.length ) {
            this.setState({
                currentIndex: currentIndex + 1,
            });
        } else {
            this.setState({
                numCorrect: 0,
                currentIndex: 0,
            })
        }

    }

    render() {
        const { deck, currentIndex, numCorrect } = this.state;
        const questions = deck && deck.questions;
        return deck && (
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <Text>{`Correct: ${numCorrect} Total: ${questions.length}`}</Text>
                   <FlipCard
                        question={questions[currentIndex].question}
                        answer={questions[currentIndex].answer}
                    />
                    <Text style={styles.question}>Swipe card to view answer</Text>
                    <View style={styles.buttonContainer}>
                        <Button success style={styles.button} block onPress={this.onCorrect}>
                            <Text> Correct </Text>
                        </Button>
                        <Button danger style={styles.button} block onPress={this.onIncorrect}>
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