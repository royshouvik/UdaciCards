import React from 'react';
import { Card, CardItem, H1, Text } from 'native-base';
import { View } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';


const Deck = ({ deck, navigate }) => (
    <Card style={styles.card}>
        <TouchableOpacity onPress={() => navigate('DeckDetail', { title: deck.title, deck })}>
            <CardItem style={styles.cardItem}>
                <H1> {deck.title} </H1>
                <Text style={styles.cardCount}> {`${deck.questions.length} card(s) `}</Text>
            </CardItem>
        </TouchableOpacity>
    </Card>

);

const styles = StyleSheet.create({
    card : {
        minHeight: 200,
    },
    cardItem: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        flexDirection: 'column',
    }
});

export default Deck;