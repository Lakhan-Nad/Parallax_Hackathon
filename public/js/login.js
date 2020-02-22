var questions = [
  {
    question: "What's your email?",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  { question: "Create your password", type: "password" }
];

function done() {
  register.className = "close";

  var form = document.getElementById("myForm").elements;
  form.email.value = questions[0].value;
  form.password.value = questions[1].value;
  document.getElementById("myForm").submit();
}
