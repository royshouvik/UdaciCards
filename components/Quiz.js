import React from 'react';
import { Card, CardItem, H1, H3, Text, Button } from 'native-base';
import { StyleSheet, View } from 'react-native';
import FlipCard from './FlipCard';

const Quiz = ({ question, cardCount }) => (
    <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
           <FlipCard
                question={question}
                answer="answer"
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