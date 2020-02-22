var curPage = 0,
  correct = 0;
var myAnswers = [];
var myQuiz = JSON.parse(document.getElementById("quizdata").innerHTML);
// var myQuiz = [
//   {
//     question: "What is addEventListener() used for?",
//     answer: 1,
//     option1: "attach a click event",
//     option2: "nothing",
//     option3: "never use it",
//     option4: "listens to HTML"
//   },
//   {
//     question: "What does DOM stand for",
//     answer: 1,
//     option1: "Document Object Model ",
//     option2: "Document Over Mountains",
//     option3: "Do Over Models",
//     option4: "Nothing"
//   },
//   {
//     question: "What does BOM stand for",
//     answer: 4,
//     option1: "document Object Model",
//     option2: "nothing",
//     option3: "Big Object Model",
//     option4: " Browser Object Model "
//   },
//   {
//     question: "Hitler party which came into power in 1933 is known as",
//     answer: 2,
//     option1: "Labour Party",
//     option2: "Nazi Party",
//     option3: "Ku-Klux-Klan",
//     option4: "Democratic Party"
//   },
//   {
//     question: "For which of the following disciplines is Nobel Prize awarded?",
//     answer: 4,
//     option1: "Physics and Chemistry",
//     option2: "Physiology or Medicine",
//     option3: "Literature, Peace and Economics",
//     option4: "All of the above"
//   }
// ];
var myHeader = document.getElementById("quizHeader");
var classname = document.getElementsByClassName("answer");
var myQuestion = document.getElementById("questions");
var progressBar = document.getElementById("progressBar");
var btnNext = document.getElementById("btnNext");
var btnPrevious = document.getElementById("btnPrevious");
var btnFinish = document.getElementById("finishQuiz");
checkPage();
btnNext.addEventListener("click", moveNext);
btnPrevious.addEventListener("click", moveBack);
btnFinish.addEventListener("click", endQuiz);
for (var i = 0; i < classname.length; i++) {
  classname[i].addEventListener("click", myAnswer, false);
}

function myAnswer() {
  var idAnswer = this.getAttribute("data-id");
  myAnswers[curPage] = idAnswer;
  // ANSWER IS GETTING CHECKED HERE
  addBox();
}

function addBox() {
  for (var i = 0; i < myQuestion.children.length; i++) {
    var curNode = myQuestion.children[i];
    if (myAnswers[curPage] == i + 1) {
      curNode.classList.add("selAnswer");
    } else {
      curNode.classList.remove("selAnswer");
    }
  }
}

function moveNext() {
  ///check if an answer has been made
  if (myAnswers[curPage]) {
    if (curPage < myQuiz.length - 1) {
      curPage++;
      checkPage();
    } else {
      if (myQuiz.length >= curPage) {
        endQuiz();
      }
    }
  }
}

function endQuiz() {
  var output = "<div class='output'>Quiz Results<BR>";
  var questionResult = "NA";
  for (var i = 0; i < myAnswers.length; i++) {
    if (myQuiz[i].answer == myAnswers[i]) {
      questionResult =
        '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
      correct++;
    } else {
      questionResult =
        '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>';
    }
    output = output + "<p>Question " + (i + 1) + " " + questionResult + "</p> ";
  }
  output =
    output +
    "<p>You scored " +
    correct +
    " out of " +
    myQuiz.length +
    "</p></div> ";
  document.getElementById("quizContent").innerHTML = output;
}

function checkPage() {
  /// add remove disabled buttons if there are no more questions in que
  if (curPage == 0) {
    btnPrevious.classList.add("hide");
  } else {
    btnPrevious.classList.remove("hide");
  }
  if (curPage + 1 < myQuiz.length) {
    btnNext.classList.remove("hide");
  } else {
    btnNext.classList.add("hide");
    btnFinish.classList.remove("hide");
  }
  myHeader.innerHTML = `<pre>${myQuiz[curPage].question}</pre>`;
  for (var i = 0; i < myQuestion.children.length; i++) {
    var s = "option" + (i + 1);
    var curNode = myQuestion.children[i];
    curNode.childNodes[1].innerHTML = capitalise(myQuiz[curPage][s]);
    //check if answered already
    if (myAnswers[curPage] == i + 1) {
      curNode.classList.add("selAnswer");
    } else {
      curNode.classList.remove("selAnswer");
    }
  }
  ///update progress bar
  var increment = Math.ceil((curPage / myQuiz.length) * 100);
  progressBar.style.width = increment + "%";
  progressBar.innerHTML = increment + "%";
}

function moveBack() {
  if (curPage > 0) {
    curPage--;
    checkPage(curPage);
  }
}

function capitalise(str) {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}
