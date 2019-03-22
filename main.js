window.addEventListener("load", sidenVises);
console.log("siden vises");


function sidenVises() {
}

(function () {
    function buildQuiz() {
        const output = [];


        // for hvert svar
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {
                // ...add an HTML radio button
                answers.push(
                    `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
            );
        });

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
    }

    function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = "lightgreen";
            } else {
                // if answer is wrong or blank
                // color the answers red
                answerContainers[questionNumber].style.color = "red";
            }

            ringeKlokke();


        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} rigtige ud af ${myQuestions.length}`;
    }

    function ringeKlokke() {
        console.log("ringeklokke");
        document.querySelector("#ring").play();

        document.querySelector("#ring").currentTime = 0;
    }

    const quizContainer = document.querySelector("#quizzen");
    const resultsContainer = document.querySelector("#results");
    const submitButton = document.querySelector("#submit");
    const myQuestions = [{
            question: "Hvor meget CO2 sparer du årligt, hvis du tager cyklen 2 1/2 km i stedet for at tage bilen?",
            answers: {
                a: "ca. 150 kg - svarende til forbruget ved et tændt 42 tommer TV konstant i 38 dage",
                b: "ca. 80 kg - svarende til en 11.36 sekunders flyvetur i en jumbojet",
                c: "ca. 200 kg - svarende til det samlede energiforbrug i en gennemsnitlig husstand i ca. 6 dage."
            },
            correctAnswer: "a"
                },
        {
            question: "Antallet af hovedskader efter cykeluheld er på ti år faldet 50 procent for børn - hvor mange procent er tallet faldet for ældre over 70 år?",
            answers: {
                a: "ca. 15",
                b: "ca. 25",
                c: "Antallet er uændret"
            },
            correctAnswer: "c"
                },
        {
            question: "Hvor meget reducerer en cykelhjelm risikoen for hovedskader?",
            answers: {
                b: "35%",
                c: "40%",
                d: "50%"
            },
            correctAnswer: "d"
                }
            ];

    // display quiz right away
    buildQuiz();

    // on submit, show results
    submitButton.addEventListener("click", showResults);
})();
<<<<<<< HEAD



/*Pie Chart*/
 document.addEventListener("DOMContentLoaded", hentJson);
        let valueArray = [];
        let offsetArray = [0];
        let omkreds = 200*Math.PI;
        //cirklen er 200 x pi så derfor vil 33% være 209.333333333.//
        let myData;
        async function hentJson() {
            const myJson = await fetch("pie.json");
            myData = await myJson.json();
            lavArray();
        }
        function lavArray() {
            myData.forEach(data => {
                offsetArray.push(data.value + offsetArray[offsetArray.length - 1]);
                valueArray.push(data.value);
            })
            animer();
        }
        function animer() {
            document.querySelectorAll(".piechart circle").forEach( (pie,i) =>{
                pie.style.strokeDasharray = valueArray[i] + " " + omkreds;
                pie.style.strokeDashoffset = -offsetArray[i];
                pie.setAttribute("data-value",valueArray[i]);
            });
        }
        document.querySelector(".piechart").addEventListener("mouseover",e =>{
              let valgt = e.target.getAttribute("data-value");
            if(valgt){
            console.log(valgt);
                }
        });
