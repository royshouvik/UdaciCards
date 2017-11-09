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
            showResult: false,
        }
        this.onCorrect = this.onCorrect.bind(this);
        this.onIncorrect = this.onIncorrect.bind(this);
        this.showResult = this.showResult.bind(this);
        this.onRestart = this.onRestart.bind(this);
        this.onBackToDeck = this.onBackToDeck.bind(this);
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

    onRestart() {
        this.setState({
            currentIndex: 0,
            numCorrect: 0,
            showResult: false,
        });
    }

    onBackToDeck() {
        const { goBack } = this.props.navigation;
        goBack();
    }

    onCorrect() {
        const { currentIndex, numCorrect } = this.state;
        this.setState({
            numCorrect: numCorrect + 1,
            currentIndex: currentIndex + 1,
        });
        this.showResult();
    }

    showResult() {
        const { deck, currentIndex } = this.state;
        if ((currentIndex + 1) === deck.questions.length ) {
            this.setState({
                showResult: true,
            });
        }
    }

    onIncorrect() {
        const { currentIndex } = this.state;
        this.setState({
            currentIndex: currentIndex + 1
        });

        this.showResult();
    }

    render() {
        const { deck, currentIndex, numCorrect, showResult } = this.state;
        const questions = deck && deck.questions;
        return deck && (
            <Card style={styles.card}>
                { showResult ? (
                    <CardItem style={styles.result}>
                        <View style={styles.score}>
                            <H1>{`Correct: ${numCorrect}`}</H1>
                            <H1>{`Total: ${questions.length}`}</H1>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button info style={styles.button} block onPress={this.onRestart}>
                                <Text> Restart Quiz </Text>
                            </Button>
                            <Button primary style={styles.button} block onPress={this.onBackToDeck}>
                                <Text> Back to Deck </Text>
                            </Button>
                        </View>
                </CardItem>
                ) :
                (<CardItem style={styles.cardItem}>
                    <Text>{`Remaining cards: ${questions.length - currentIndex - 1}`}</Text>
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
                </CardItem>)
                }
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
    result: {
        alignItems: 'stretch',
        flexDirection: 'column',
        flex: 1
    },
    score: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
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