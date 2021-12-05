// test to check if extension is loaded
document.body.style.border = "5px solid red";

const problemFooter = document.querySelector("#problemFooter");
const p = problemFooter.getElementsByTagName('form')[0].lastChild;

var webnote_button = document.createElement("input");
webnote_button.className = "webnote btn btn-primary";
webnote_button.value = "Problem Notes";
webnote_button.type = "button";
webnote_button.style.margin = "0 0.5ex"

p.childNodes[0].style.margin = "0 0.5ex";
p.appendChild(webnote_button);


