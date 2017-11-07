import { AsyncStorage } from 'react-native';

function generateId() {
  return Number(new Date());
}
export const key = '@UdaciCards:key';

export const seedData = [
  {
      title: 'React',
      id: '1510026244595',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
   {
      title: 'JavaScript',
      id: '1510026244596',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
];

// export function seedInitialData() {
//   return new Promise((resolve, reject) => {
//     AsyncStorage.removeItem(key)
//     .then(() => AsyncStorage
//     .getItem(key)
//     .then(value => JSON.parse(value))
//   })
// }
export function getDecks() {
    return new Promise((resolve, reject) => {
      AsyncStorage
      .getItem(key)
      .then(value => JSON.parse(value))
      .then(resolve)
      .catch(reject); 
    })
}

export function saveDeckTitle(title) {
  const id = generateId();
  const newDeck = {
    title,
    id,
    questions: [],
  };

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
    .then(value => JSON.parse(value))
    .then(data => data.concat([newDeck]))
    .then(updatedData => AsyncStorage.setItem(key, JSON.stringify(updatedData)))
    .then(() => resolve(newDeck))
    .catch(reject)
  })
}

export function getDeck(id) {
  return new Promise((resolve, reject) => {
    getDecks()
    .then(decks =>  decks.filter(deck => deck.id === id)[0])
    .then((deck) => resolve(deck))
    .catch(reject);
    });
}

export function addCardToDeck(id, card) {
  return new Promise((resolve, reject) => {
  getDecks()
  .then(decks => {
    const deckToUpdate = decks.filter(deck => deck.id === id)[0];
    const otherDecks = decks.filter(deck => deck.id !== id);
    const updatedQuestions = [...deckToUpdate.questions, card]
    const updatedDeck = Object.assign({}, deckToUpdate, { questions: updatedQuestions});
    const allDecks = [updatedDeck, ...otherDecks];
    return allDecks;
  })
  .then((data) => AsyncStorage.setItem(key, JSON.stringify(data)))
  .then(() => resolve(id))
  .catch(reject);
  });
}