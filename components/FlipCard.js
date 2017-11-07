import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, CardItem, H1, H3, Text, Button } from 'native-base';
import FlipCard from 'react-native-flip-card';

export default class Flipper extends Component {

    constructor(props) {
        super(props);
   
    }
    
    render() {
        const {question, answer } = this.props;
        return (
            <View  style={styles.container}>
                <FlipCard
                    style={styles.flipper}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    friction={50}
                    useNativeDriver
                >
                    <Card style={styles.card}>
                        <CardItem style={styles.cardItem}>
                            <View style={styles.infoContainer}>
                                <H1 style={styles.deckName}> {question} </H1>
                            </View>
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <CardItem style={[styles.cardItem, styles.back]}>
                            <View style={styles.infoContainer}>
                                <H1 style={[styles.deckName, styles.backText]}> {answer} </H1>
                            </View>
                        </CardItem>
                    </Card>
                </FlipCard>
            </View>
          );
    }
            
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'flex-start',
    },
    flipper: {
        borderWidth: 0,
    },
    card : {
        flex: 1,
    },
    cardItem: {
        flex: 1,
    },
    deckName: {
        textAlign: 'center',
        flex: 1
    },
    infoContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    back: {
        backgroundColor: '#fff',
        
    },
    backText: {
        color: '#000',
    }
});