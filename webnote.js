
// test to check if extension is loaded
document.body.style.border = "5px solid red";

// document.head.insertAdjacentHTML('beforeend',
//     '<script>tinymce.init({selector: "#textArea"});</script>');



const problemFooter = document.querySelector("#problemFooter");
const p = problemFooter.getElementsByTagName('form')[0].lastChild;

var webnoteButton = document.createElement("input");
webnoteButton.className = "webnote btn btn-primary";
webnoteButton.value = "Problem Notes";
webnoteButton.type = "button";
webnoteButton.style.margin = "0 0.5ex"

p.childNodes[0].style.margin = "0 0.5ex";
p.appendChild(webnoteButton);

// var mathSpan = document.createElement("span");
// mathSpan.id = "mathSpan";
// mathSpan.className = "mq-editable-field mq-math-mode";
// mathSpan.style.width = "32.6px";
// mathSpan.style.height = "20.1px";
// mathSpan.style.padding = "4px 5px 2px 5px";

// p.appendChild(mathSpan);
// var mathField = MQ.MathField(mathSpan);

// var form = document.createElement("form");
// form.id = "parentForm";
// p.appendChild(form);

var textArea = document.createElement("textarea");
// form.appendChild(textArea);
p.after(textArea);


