
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Madrid", "Berlin", "Rome", "Paris"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Giraffe", "Elephant", "Blue Whale", "Lion"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Methane"],
        correctAnswer: "Carbon dioxide"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

const questionElement = document.getElementById("question");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-button");
const optionsContainer = document.getElementById("options");
const prevButton = document.getElementById("prev-btn");

// To load each questions described above

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.id = `option-${index}`;
        radio.name = "option";
        radio.value = option;

        const label = document.createElement("label");
        label.setAttribute("for", `option-${index}`);
        label.textContent = option;
        label.name="option";

        radio.addEventListener("change", () => {
            // Handle radio button selection
            selectedOption = option;
            checkAnswer(selectedOption);
        });


        li.appendChild(radio);
        li.appendChild(label);
        optionsContainer.appendChild(li);
    });
}

// to check answer once it is selected
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color ="Green";
        score++;
    } else {
        feedbackElement.textContent = "Incorrect!";
        feedbackElement.style.color ="Red";
    }
    nextButton.disabled = false;
}
// to handle next button & prev button
 nextButton.addEventListener("click", () => {    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        feedbackElement.textContent = "";
        nextButton.disabled = true;
    } else {
        showFinalScore();
    }
    selectedOption=null;

});
prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        feedbackElement.textContent = "";
        nextButton.disabled = false;
    }
});

//restart button moves to first page to start a fresh quiz again
restartButton.addEventListener("click",()=>{
    selectedOption=null;
    currentQuestionIndex=0;
    score=0;
    scoreElement.textContent= 0;
    loadQuestion();
    feedbackElement.textContent = "";
    nextButton.style.display="inline";
    nextButton.disabled = false;
    prevButton.style.display="inline";
})

function showFinalScore() {
    questionElement.textContent = "Quiz Completed!";
    optionsContainer.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.style.display="none";
    prevButton.style.display="none";
    scoreElement.textContent = score + " out of " + questions.length;
    
}

loadQuestion();
nextButton.disabled = true;


