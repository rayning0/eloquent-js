JOURNAL = require('./04_data.js')

// Does event (like 'exercise') exist in events array for that day?
function hasEvent(event, entry) {
  return entry.events.indexOf(event) != -1; // -1 means event isn't in array
}

function tableFor(event, journal) {
  var table = [0, 0, 0, 0];
  for (var i = 0; i < journal.length; i++) {
    var entry = journal[i], index = 0;
    if (hasEvent(event, entry)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

console.log(tableFor("pizza", JOURNAL));