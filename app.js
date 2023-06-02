const fs = require('fs');
const readline = require('readline');

// Function to write to a new file
function writeToFile(filename) {
  fs.writeFile(filename, 'You are awesome', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('File created and written successfully.');
  });
}

// Function to check if a file exists
function fileExists(filename) {
  return fs.existsSync(filename);
}

// Function to get a new filename from the user
async function getNewFilename(existingFiles) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  while (true) {
    const filename = await new Promise((resolve) => {
      rl.question('Enter a filename: ', (answer) => {
        resolve(answer);
      });
    });

    if (existingFiles.includes(filename)) {
      console.log('File already exists. Please enter a new filename.');
    } else {
      rl.close();
      return filename;
    }
  }
}

// Function to save filenames to a separate text file
function saveFilenames(filenames) {
  fs.writeFile('filenames.txt', filenames.join('\n'), (err) => {
    if (err) {
      console.error('Error saving filenames:', err);
      return;
    }
    console.log('Filenames saved successfully.');
  });
}

// Function to load filenames from the text file
function loadFilenames() {
  if (fs.existsSync('filenames.txt')) {
    const data = fs.readFileSync('filenames.txt', 'utf8');
    return data.split('\n').filter((filename) => filename.trim() !== '');
  }
  return [];
}

// Main function
async function main() {
  const existingFilenames = loadFilenames();

  // Prompt the user for a filename
  let filename = await getNewFilename(existingFilenames);

  // Write to the new file
  writeToFile(filename);

  // Add the new filename to the list
  existingFilenames.push(filename);

  // Save filenames to the separate text file
  saveFilenames(existingFilenames);
}

main();

