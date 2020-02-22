var questions = [
  { question: "What's your first name?" },
  { question: "What's your last name?" },
  {
    question: "What's your email?",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  { question: "Create your password", type: "password" },
  {
    question: "Enter your contact number",
    pattern: /^[1-9]{1}[0-9]{9}$/
  },
  { question: "Enter your work experience years", pattern: /^[0-9]+$/ }
];

function done() {
  register.className = "close";
  var form = document.getElementById("myForm").elements;
  form.firstName.value = questions[0].value;
  form.lastName.value = questions[1].value;
  form.email.value = questions[2].value;
  form.password.value = questions[3].value;
  form.contact.value = questions[4].value;
  if (parseInt(questions[5].value <= 2)) {
    form.type.value = "fresher";
  } else {
    form.type.value = "experienced";
  }
  document.getElementById("myForm").submit();
}
