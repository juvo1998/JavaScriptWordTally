var log = "";
var displayTally = "";

function getExtension(filename) {
    var substrings = filename.split(".");
    return substrings.pop();
}

function testLog(statement) {
    var logDisplay = document.getElementById("log");
    log += (statement + "<br>");
    logDisplay.innerHTML = log;
}

function tallyWords() {
    var input = document.getElementById("inputFiles");
    var display = document.getElementById("display");
    displayTally = "";

    // Check if there are files selected
    if (input.files.length == 0) {
        display.innerHTML = "There are no files selected.";

    } else {
        // There are files, so check if all of them are .txt files
        for (var i = 0; i < input.files.length; i++) {
            var filename = input.files[i].name;
            var extension = getExtension(filename);

            if (extension != "txt") {
                display.innerHTML = (filename + " is not a .txt file.");
                return;
            }
        }

        // If here, then all files should be .txt files. Start reading
        var wordsDict = {};
        var numFilesRead = 0;

        // Read each file
        for (var i = 0; i < input.files.length; i++) {
            var reader = new FileReader();
            var currFile = input.files[i];
            reader.readAsText(currFile, "UTF-8");

            reader.onload = function (evt) {
                var contents = evt.target.result;
                var wordsList = contents.trim();    
                wordsList = wordsList.split(/[ ]+/);

                // Go through each word in the currFile and tally them up
                for (var j = 0; j < wordsList.length; j++) {
                    var currWord = wordsList[j];

                    // If the word exists in the dict, increment it
                    if (currWord in wordsDict) {
                        wordsDict[currWord] = wordsDict[currWord] + 1;

                    } else {
                        wordsDict[currWord] = 1
                    }
                }

                numFilesRead++;
                
                // Check if this is the last file, display results if so
                if (numFilesRead == input.files.length) {
                    var sorted = [];
                    for (var currWord in wordsDict) {
                        sorted.push([currWord, wordsDict[currWord]]);
                    }
                    sorted.sort(function(a, b) {
                        return (b[1] - a[1]);
                    });
                    var displayStr = "";
                    for (var i = 0; i < sorted.length; i++) {
                        var curr = sorted[i];
                        displayStr += (curr[0] + ": " + curr[1] + "<br>");
                    }
                    display.innerHTML = displayStr;
                }
            }
        }
    }
}