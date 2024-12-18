const startButton = document.getElementById("start-button");
const quizArea = document.getElementById("quiz-area");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-button");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const playAgainButton = document.getElementById("play-again");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

function resetValues() {
    questions = [];
    currentQuestionIndex = 0;
    score = 0;
}


async function fetchQuestions() {
    resetValues();
    const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
    const data = await response.json();
    questions = data.results.map((q) => ({
        question: q.question,
        correctAnswer: q.correct_answer,
        options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
    }));
}

startButton.addEventListener("click", async () => {
    document.getElementById("start-screen").classList.add("hidden");
    quizArea.classList.remove("hidden");

    await fetchQuestions();
    showQuestion();
});

playAgainButton.addEventListener("click", async () => {
   
    resetValues();

    
    endScreen.classList.add("hidden");
    quizArea.classList.remove("hidden");

   
    await fetchQuestions();
    showQuestion();
});

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;
    choicesElement.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("choice-button");
        button.addEventListener("click", () => selectAnswer(option));
        choicesElement.appendChild(button);
    });

    nextButton.classList.add("hidden");
}

function selectAnswer(selected) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selected === currentQuestion.correctAnswer) {
        score++;
    }
    nextButton.classList.remove("hidden");
}


nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
});


function endQuiz() {
    quizArea.classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalScore.textContent = `Your final score is ${score} out of ${questions.length}!`;
}
