// Once document is loaded, restore the text area
if( document.readyState !== 'loading' ) {
    restoreText();
}

const problemFooter = document.querySelector("#problemFooter");
const form = problemFooter.getElementsByTagName('form')[0];
const p = form.lastChild;
form.setAttribute("accept-charset", "UTF-8");

// note button initialization
const webnoteButton = document.createElement("input");
    webnoteButton.className = "webnote btn btn-primary";
    webnoteButton.value = "Problem Notes";
    webnoteButton.type = "button";
    webnoteButton.style.margin = "0 0.5ex";

p.childNodes[0].style.margin = "0 0.5ex";
p.appendChild(webnoteButton);

// div containing text area and save button
const textAreaDiv = document.createElement("div");
    textAreaDiv.id = "textAreaDiv";
    textAreaDiv.hidden = true;
var hideBool = textAreaDiv.hidden;
p.after(textAreaDiv);

// text area initialization
const textArea = document.createElement("textarea");
    textArea.id = "tiny";
    textArea.rows = "5";
    textArea.cols = "40";
    textArea.style.margin = "0 1ex 0 0.5ex";
textAreaDiv.appendChild(textArea);

// div for buttons
const buttonsDiv = document.createElement("div");
    buttonsDiv.style.display = "inline-block";
    buttonsDiv.id = "buttonsDiv";
textAreaDiv.appendChild(buttonsDiv);

// save button initialization
const saveButton = document.createElement("input");
    saveButton.className = "webnote btn";
    saveButton.id = "saveButton";
    saveButton.value = "Save";
    saveButton.type = "button";
    saveButton.style.margin = "1ex 0";
buttonsDiv.appendChild(saveButton);

// save alert initialization
const saveNotif = document.createElement("div");
    saveNotif.className = "alert alert-success";
    saveNotif.role = "alert";
    saveNotif.innerText = "Your note has been saved";
    saveNotif.hidden = true;
document.querySelector("#body-row").appendChild(saveNotif);

// button group init
const insertGroup = document.createElement("div");
    insertGroup.className = "btn-group";
    insertGroup.style.display = "block";
    insertGroup.style.margin = "1ex";
    insertGroup.setAttribute("role", "group");

// math symbol button init
const sqrtButton = document.createElement("button");
    sqrtButton.type = "button";
    sqrtButton.className = "btn";
    sqrtButton.id = "sqrt";
    sqrtButton.innerText = '\u{221A}';
    sqrtButton.value = '\u{221A}';
    sqrtButton.title = "square root";
const piButton = document.createElement("button");
    piButton.type = "button";
    piButton.className = "btn";
    piButton.id = "pi";
    piButton.innerText = '\u{03C0}';
    piButton.value = '\u{03C0}';
    piButton.title = "pi";
const infButton = document.createElement("button");
    infButton.type = "button";
    infButton.className = "btn";
    infButton.id = "inf";
    infButton.innerText = '\u{221E}';
    infButton.value = '\u{221E}';
    infButton.title = "infinity";
    

insertGroup.append(sqrtButton, piButton, infButton);
buttonsDiv.appendChild(insertGroup);

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

sqrtButton.addEventListener("click", () => {insertAtCaret(sqrtButton.value)});
piButton.addEventListener("click", () => {insertAtCaret(piButton.value)});
infButton.addEventListener("click", () => {insertAtCaret(infButton.value)});

// toggles div hidden state
function toggleHidden(){
    var textHidden = textAreaDiv.hidden;
    textAreaDiv.hidden = !textHidden;
}

const breadcrumb = document.querySelector("ul.breadcrumb");
const problemURL = 
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

function insertAtCaret(text) {
    let txtarea = textArea;
  
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
      "ff" : (document.selection ? "ie" : false));
    if (br == "ie") {
      txtarea.focus();
      var range = document.selection.createRange();
      range.moveStart('character', -txtarea.value.length);
      strPos = range.text.length;
    } else if (br == "ff") {
      strPos = txtarea.selectionStart;
    }
  
    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br == "ie") {
      txtarea.focus();
      var ieRange = document.selection.createRange();
      ieRange.moveStart('character', -txtarea.value.length);
      ieRange.moveStart('character', strPos);
      ieRange.moveEnd('character', 0);
      ieRange.select();
    } else if (br == "ff") {
      txtarea.selectionStart = strPos;
      txtarea.selectionEnd = strPos;
      txtarea.focus();
    }
  
    txtarea.scrollTop = scrollPos;
}