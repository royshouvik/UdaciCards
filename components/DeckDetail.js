import React, { Component } from 'react';
import { Card, CardItem, H1, H3, Text, Button } from 'native-base';
import { StyleSheet, View } from 'react-native';

class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: `${navigation.state.params.deck.title}`,
      });
    render() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        return (
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <View style={styles.infoContainer}>
                        <H1 style={styles.deckName}> {params.deck.title} </H1>
                        <H3 style={styles.cardCount}> {`${params.deck.questions.length} card(s)`}</H3>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button info style={styles.button} block onPress={() => navigate('NewCard')}>
                            <Text> Add Card </Text>
                        </Button>
                        <Button primary style={styles.button} block>
                            <Text> Start Quiz </Text>
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
        marginBottom: 20,
    },
    buttonContainer: {
        flex: 1,
    },
    button: {
        margin: 15,
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default DeckDetail;