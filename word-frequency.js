'use strict';

/*
Word Frequency
Tier: 1-Beginner
https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Word-Frequency-App.md
Calculating the frequency of words in a block of text is a technique which has various uses in algorithms such as searching, sorting, and semantic analysis. The objective of the Word Frequency app is count the frequency of words in a block of text and create a tabular display of each unique word in the text along with its frequency, in descending order by frequency.
*/

/*
* User Stories
  //User can see a text input box, a 'Translate' button, and a word frequency table. -> search a way to display the result as a table
  //User can enter text (or cut and paste) into the input box. This input box must allow the entry of large blocks of text (maximum of 2048 characters).
  //User can click the 'Translate' button to analyze the word frequency in the text that has been input.
  //User can see an error message if the text input box is empty.
  //User can see the word frequency table populated when the 'Translate' button is clicked. Each row in the table contains a word and the number of times it occurs in the input text.
  //User can see the word frequency table ordered in descending sequence by word frequency.
*/

//* Selecting elements
const textInput = document.querySelector('#text-input');
const translateButton = document.querySelector('#btn-translate');
const textOutput = document.querySelector('#text-output');

// Create a map to store each word as a key and store its frequency as value
const frequencyMap = new Map(); // [word, frequency]

//* Functions

// Populates the frequencyMap with the words and frequencies
const populateFrequency = words => {
  words.forEach(word => {
    word = word.toUpperCase().trim();
    if (word !== '') {
      // If the word already exists in the array, upgrade the frequency coounter
      if (frequencyMap.has(word)) {
        frequencyMap.set(word, frequencyMap.get(word) + 1);
      } else {
        // If it doesn't, set it with a initial frequency of 1
        frequencyMap.set(word, 1);
      }
    }
  });
};

// Returns the frequency map as an array, sorted by word frequency
const sortFrequencyMap = () => [...frequencyMap].sort((a, b) => b[1] - a[1]);

//* Translate button event listener
translateButton.addEventListener('click', () => {
  // Check if the user typed something:
  if (textInput.value.trim() === '') {
    textOutput.textContent = 'Please type some text in the input field.';
    return;
  }

  // Clear the frequency map
  frequencyMap.clear();

  // Get the text input and split its words into and array;
  const words = textInput.value.split(' ');

  // Populate the frequencyMap with the words and frequencies
  populateFrequency(words);

  // Convert the frequency map into a array of key and values, them sort it by frequency
  const frequencyArray = sortFrequencyMap();

  // Displaying the result as a table

  // Create and html table element
  const table = document.createElement('table');

  // Iterate through the sorted frequency array
  for (const [word, frequency] of frequencyArray) {
    // Create a new row
    const row = document.createElement('tr');

    // Create two cells for word and frequency
    const wordCell = document.createElement('td');
    const frequencyCell = document.createElement('td');

    // Set the content of the cells
    wordCell.textContent = word;
    frequencyCell.textContent = frequency;

    // Append cells to the row
    row.appendChild(wordCell);
    row.appendChild(frequencyCell);

    // Append the row to the table
    table.appendChild(row);
  }

  // Append the table to the textOutput div
  textOutput.innerHTML = ''; // Clear previous content
  textOutput.appendChild(table);
});
