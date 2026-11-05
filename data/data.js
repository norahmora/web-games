/* modulo para los textos de los cursos */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
function getGamesText() {
  const coursesText = fs.readFileSync(path.join(dataDir, 'games.json'), 'utf8');
  return JSON.parse(coursesText);
}

function getFacilitiesText() {
  const facilitiesText = fs.readFileSync(path.join(dataDir, 'facilities.json'), 'utf8');
  return JSON.parse(facilitiesText);
}

module.exports = {
  getGamesText,
  getFacilitiesText
};