// Once document is loaded, restore the text area
if( document.readyState !== 'loading' ) {
    restoreText();
}

const problemFooter = document.querySelector("#problemFooter");
const form = problemFooter.getElementsByTagName('form')[0];
const p = form.lastChild;
form.setAttribute("accept-charset", "UTF-8");

// note button initialization
var webnoteButton = document.createElement("input");
webnoteButton.className = "webnote btn btn-primary";
webnoteButton.value = "Problem Notes";
webnoteButton.type = "button";
webnoteButton.style.margin = "0 0.5ex"

p.childNodes[0].style.margin = "0 0.5ex";
p.appendChild(webnoteButton);

// div containing text area and save button
var textAreaDiv = document.createElement("div");
textAreaDiv.id = "textAreaDiv";
textAreaDiv.hidden = true;
var hideBool = textAreaDiv.hidden;
p.after(textAreaDiv);

// text area initialization
var textArea = document.createElement("textarea");
textArea.id = "tiny";
textArea.rows = "5";
textArea.cols = "40";
textAreaDiv.appendChild(textArea);

// save button initialization
var saveButton = document.createElement("input");
saveButton.className = "webnote btn";
saveButton.id = "saveButton"
saveButton.value = "Save";
saveButton.type = "button";
saveButton.style.margin = "0 0.5ex";
textAreaDiv.appendChild(saveButton);

// save alert initialization
var saveNotif = document.createElement("div");
saveNotif.className = "alert alert-success";
saveNotif.role = "alert";
saveNotif.innerText = "Your note has been saved";
saveNotif.hidden = true;
document.querySelector("#body-row").appendChild(saveNotif);

// Testing mathquill integration for later release:
/*
let test = document.createElement("p")
let testSpan = document.createElement("span");
testSpan.id = "problem";
testSpan.innerText = "ax^2 + bx + c = 0";
test.appendChild(testSpan);
textAreaDiv.appendChild(test);

let testScript = document.createElement('script');
testScript.innerHTML = 
`
var problemSpan = document.getElementById('problem');
MQ.MathField(problemSpan);
`;

document.head.appendChild(testScript);
*/

// note button listener for hiding note panel
webnoteButton.addEventListener("click", function(){
    if(hideBool){
        $("#textAreaDiv").slideDown();
    } else {
        $("#textAreaDiv").slideUp();
    }
    hideBool = !hideBool;
    toggleHidden();
});

// checks if text area has been modified
var textInputBool = false;
textArea.addEventListener("input",  function(){
    textInputBool = true;
});

// success alert on saving modified text area
$("#saveButton").click(function(){
    if(textInputBool){
        textInputBool = false;
        $(".alert-success").slideDown().delay(4000).slideUp();
    }
});

// activate saveText() on clicking save button
saveButton.addEventListener("click", function(){
    saveText();
});

// toggles div hidden state
function toggleHidden(){
    var textHidden = textAreaDiv.hidden;
    textAreaDiv.hidden = !textHidden;
}

let breadcrumb = document.querySelector("ul.breadcrumb");
let problemURL = 
    breadcrumb.childNodes[breadcrumb.childNodes.length - 1].baseURI;
var problemPath = problemURL.substr(0, problemURL.indexOf('?'));

// url looses '?...' after checking answer resulting in an empty string
if(problemPath === ''){ problemPath = problemURL }

// save text area to local storage
function saveText(e){
    browser.storage.local.set({
        [problemPath]: textArea.value
    });
    e.preventDefault();
}

// restore text area from local storage
function restoreText(){
    var storageText = browser.storage.local.get(problemPath);
    storageText.then((res) => {
        textArea.value = res[problemPath] || '';
    });
}
