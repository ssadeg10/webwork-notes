
if( document.readyState !== 'loading' ) {
    restoreText();
}

const problemFooter = document.querySelector("#problemFooter");
const p = problemFooter.getElementsByTagName('form')[0].lastChild;

var webnoteButton = document.createElement("input");
webnoteButton.className = "webnote btn btn-primary";
webnoteButton.value = "Problem Notes";
webnoteButton.type = "button";
webnoteButton.style.margin = "0 0.5ex"

p.childNodes[0].style.margin = "0 0.5ex";
p.appendChild(webnoteButton);

var textAreaDiv = document.createElement("div");
textAreaDiv.id = "textAreaDiv";
textAreaDiv.hidden = true;
var hideBool = textAreaDiv.hidden;
p.after(textAreaDiv);

var textArea = document.createElement("textarea");
textArea.id = "tiny";
textArea.rows = "5";
textArea.cols = "40";
textAreaDiv.appendChild(textArea);

var saveButton = document.createElement("input");
saveButton.className = "webnote btn";
saveButton.id = "saveButton"
saveButton.value = "Save";
saveButton.type = "button";
saveButton.style.margin = "0 0.5ex";
textAreaDiv.appendChild(saveButton);

var saveNotif = document.createElement("div");
saveNotif.className = "alert alert-success";
saveNotif.role = "alert";
saveNotif.innerText = "Your note has been saved";
saveNotif.hidden = true;
document.querySelector("#body-row").appendChild(saveNotif);

webnoteButton.addEventListener("click", function(){
    if(hideBool){
        $("#textAreaDiv").slideDown();
    } else {
        $("#textAreaDiv").slideUp();
    }
    hideBool = !hideBool;
    toggleHidden();
});

var textInputBool = false;

textArea.addEventListener("input",  function(){
    textInputBool = true;
});

$("#saveButton").click(function(){
    if(textInputBool){
        textInputBool = false;
        $(".alert-success").slideDown().delay(4000).slideUp();
    }
});

saveButton.addEventListener("click", function(){
    saveText();
});

function toggleHidden(){
    var textHidden = textAreaDiv.hidden;
    textAreaDiv.hidden = !textHidden;
}

let breadcrumb = document.querySelector("ul.breadcrumb");
let problemURL = breadcrumb.childNodes[breadcrumb.childNodes.length - 1].baseURI;
var problemPath = problemURL.substr(0, problemURL.indexOf('?'));

// url looses '?...' after checking answer resulting in an empty string
if(problemPath === ''){ problemPath = problemURL }

function saveText(e){
    browser.storage.local.set({
        [problemPath]: textArea.value
    });
    e.preventDefault();
}

function restoreText(){
    var storageText = browser.storage.local.get(problemPath);
    storageText.then((res) => {
        textArea.value = res[problemPath] || '';
    });
}
