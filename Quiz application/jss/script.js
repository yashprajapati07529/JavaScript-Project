const quizData = [
    {
        question: "1. Which of the following is the correct extension of a C++ source file?",
        options: [".c", ".cpp", ".obj", ".exe"],
        answer: ".cpp"
    },
    {
        question: "2. Which function is the entry point of every C and C++ program?",
        options: ["start()", "init()", "main()", "program()"],
        answer: "main()"
    },
    {
        question: "3. Which of the following is used for output in C++?",
        options: ["cin", "cout", "print", "scanf"],
        answer: "cout"
    },
    {
        question: "4. Which header file is required to use 'printf()' and 'scanf()' in C?",
        options: ["<iostream>", "<conio.h>", "<stdio.h>", "<stdlib.h>"],
        answer: "<stdio.h>"
    },
    {
        question: "5. What is a pointer in C and C++?",
        options: ["A variable that stores a value", "A variable that stores the memory address of another variable", "A keyword used to loop", "A data type"],
        answer: "A variable that stores the memory address of another variable"
    },
    {
        question: "6. Which of the following is NOT a feature of Object-Oriented Programming (OOP) in C++?",
        options: ["Inheritance", "Polymorphism", "Encapsulation", "Pointers"],
        answer: "Pointers"
    },
    {
        question: "7. Which operator is used to deallocate memory dynamically in C++?",
        options: ["free()", "delete", "remove", "clear"],
        answer: "delete"
    },
    {
        question: "8. What is the size of an 'int' data type in most 32-bit/64-bit compilers?",
        options: ["1 Byte", "2 Bytes", "4 Bytes", "8 Bytes"],
        answer: "4 Bytes"
    },
    {
        question: "9. Which keyword is used to handle exceptions in C++?",
        options: ["try-catch", "throw", "try", "All of these"],
        answer: "All of these"
    },
    {
        question: "10. In C++, which access specifier makes members accessible only within the same class?",
        options: ["public", "protected", "private", "global"],
        answer: "private"
    },
    {
        push: "11. Which loop is guaranteed to execute at least once in C/C++?",
        question: "11. Which loop is guaranteed to execute at least once in C/C++?",
        options: ["for loop", "while loop", "do-while loop", "None of these"],
        answer: "do-while loop"
    },
    {
        question: "12. What is a constructor in C++?",
        options: ["A function used to delete an object", "A special member function used to initialize objects", "A keyword to define constants", "A type of loop"],
        answer: "A special member function used to initialize objects"
    },
    {
        question: "13. Which symbol is used for single-line comments in C and C++?",
        options: ["//", "/* */", "#", "--"],
        answer: "//"
    },
    {
        question: "14. Which of the following correctly declares an array of 5 integers in C/C++?",
        options: ["int arr(5);", "int arr[5];", "array arr[5];", "int[5] arr;"],
        answer: "int arr[5];"
    },
    {
        question: "15. What does 'OOP' stand for in C++?",
        options: ["Office Oriented Programming", "Object Oriented Programming", "Output Oriented Programming", "Object Online Programming"],
        answer: "Object Oriented Programming"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const timerElement = document.getElementById('timer');
const timerContainer = document.getElementById('timer-container');
const resultElement = document.getElementById('result');
const nextButton = document.querySelector('.next-btn');

// HTML टैग्स को सुरक्षित रूप से टेक्स्ट में बदलने का फंक्शन (ताकि ब्राउज़र भ्रमित न हो)
function escapeHTML(text) {
    return text.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function loadQuestion() {
    startTimer();
    const currentQuiz = quizData[currentQuestionIndex];

    // सुरक्षित रूप से सवाल दिखाएं
    questionElement.innerHTML = escapeHTML(currentQuiz.question);
    optionsContainer.innerHTML = '';

    // सुरक्षित रूप से ऑप्शंस दिखाएं
    currentQuiz.options.forEach((option) => {
        const safeOption = escapeHTML(option);
        const label = document.createElement('label');
        label.className = 'option-item';
        label.innerHTML = `<input type="radio" name="quiz-option" value="${safeOption}"> ${safeOption}`;
        optionsContainer.appendChild(label);
    });
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    timerContainer.classList.remove('time-warning');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 5) {
            timerContainer.classList.add('time-warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeOutAction();
        }
    }, 1000);
}

function timeOutAction() {
    const radioButtons = document.querySelectorAll('input[name="quiz-option"]');
    radioButtons.forEach(button => button.disabled = true);
    alert("Time is up! Please click the Next button.");
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');

    if (selectedOption && timeLeft > 0) {

        const decodedValue = selectedOption.value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        if (decodedValue === quizData[currentQuestionIndex].answer) {
            score++;
        }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        clearInterval(timerInterval);
        questionElement.textContent = "Quiz Completed!";
        optionsContainer.innerHTML = '';
        timerContainer.style.display = 'none';
        nextButton.style.display = 'none';
        resultElement.textContent = `Your total score: ${score} / ${quizData.length}`;
    }
}

loadQuestion();