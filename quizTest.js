import { LightningElement, track, wire } from 'lwc';
import getQuizOptions from '@salesforce/apex/quizControl.getQuizOptions';
import getQuizQuestions from '@salesforce/apex/quizControl.getQuizQuestions';
import getDifficultyLevelOptions from '@salesforce/apex/quizControl.getDifficultyLevelOptions';
import submitQuiz from '@salesforce/apex/quizControl.submitQuiz';
import style from './style.css';

export default class QuizTest extends LightningElement {
    @track quizQuestions = [];
    @track showStartPage = true;
    @track showSelectionPage = false;
    @track selectedQuizId;
    @track quizOptions = [];
    @track showQuestions = false;
    @track showLastPage = false;
    @track selectedDifficulty;
    @track selectedAnswers = [];
    @track showQuizScore = false;
    @track currentQuestionIndex = 0;
    @track quizCompleted = false;
    @track quizScore = 0;
    @track difficultyOptions = [];
    @track currentQuestion;
    @track questionNumber;
    @track questionElement;
    @track showResultPage = false;

    static stylesheets = [style];

// Get data from the Apex

        // Get quiz options
        @wire(getQuizOptions)
        wiredQuizOptions({ error, data }) {
            if (data) {
                this.quizOptions = data.map(quiz => ({
                    label: quiz.Name,
                    value: quiz.Id
                }));
            } else if (error) {
                console.error('Error fetching quiz options', error);
            }
        }

        // Get difficulty level options
        @wire(getDifficultyLevelOptions)
        wiredDifficultyLevelOptions({ error, data }) {
            if (data) {
                this.difficultyOptions = data.map(difficultyLevel => ({
                    label: difficultyLevel,
                    value: difficultyLevel
                }));
            } else if (error) {
                console.error('Error fetching difficulty level options', error);
            }
        }

        // Get quiz questions based on selected quiz and difficulty level
        @wire(getQuizQuestions, { quizId: '$selectedQuizId', difficultyLevel: '$selectedDifficulty' })
        wiredQuizQuestions({ error, data }) {
            if (data) {
                this.quizQuestions = data.map(question => ({
                    label: question.Question_Text__c,
                    value: question.Id,
                    answers: question.Answers__r.map(answer => ({
                        label: answer.Answer_Text__c,
                        value: answer.Id
                    }))
                }));
                this.displayCurrentQuestion();
            } else if (error) {
                console.error('Error fetching quiz questions', error);
            }
        }

// Quiz functionality

        // Open Selection Page
        handleStart() {
            this.showStartPage = false;
            this.showSelectionPage = true;
        }

        // Start with Questions
        startQuiz() {
            this.showStartPage = false;
            this.showSelectionPage = false;
            this.showQuestions = true;
            this.displayCurrentQuestion();
        }

        // Display current question
        displayCurrentQuestion() {
            this.currentQuestion = this.quizQuestions[this.currentQuestionIndex];
            this.questionNumber = this.currentQuestionIndex + 1;
            this.questionElement = `${this.questionNumber}. ${this.currentQuestion.label}`;

            // Check if an answer was previously selected for the current question
            const previousAnswer = this.selectedAnswers[this.currentQuestionIndex];
            if (previousAnswer) {
                // Set the selected answer for the current question
                this.selectedAnswerId = previousAnswer;
            }
        }

        // Display answers
        get answerOptions() {
            return this.quizQuestions[this.currentQuestionIndex].answers.map(answer => ({
                label: answer.label,
                value: answer.value
            }));
        }

        // Next question
        nextQuestion() {
            if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
                this.currentQuestionIndex++;
                this.displayCurrentQuestion();
            }
        }

        // Previous question
        previousQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
                this.displayCurrentQuestion();
            }
        }

        // Submit quiz
        submit() {
            console.log('Submit button clicked');
    
            // Call the Apex method to submit the quiz
            submitQuiz({ selectedAnswers: this.selectedAnswers })
                .then(result => {
                    console.log('Number of correct answers:', result);
                    this.correctAnswersCount = result;
                })
                .catch(error => {
                    console.error('Error submitting quiz:', error);
                });
    
            // Update UI
            this.showStartPage = false;
            this.showSelectionPage = false;
            this.showQuestions = false;
            this.showLastPage = true;
        }

        checkResult(){
            this.showStartPage = false;
            this.showSelectionPage = false;
            this.showQuestions = false;
            this.showLastPage = false;
            this.showResultPage = true;
        }
    
// Get return information from the Quiz

        // Get quiz Id selection
        handleQuizSelection(event) {
            this.selectedQuizId = event.detail.value;
        }

        // Get difficulty level selection
        handleDifficultySelection(event) {
            this.selectedDifficulty = event.detail.value;
        }

        // Save selected answers in the list
        handleAnswerSelection(event) {
            // Retrieve the selected answer ID from the event
            const selectedAnswerId = event.detail.value;
            
            // Store the selected answer ID for the current question
            this.selectedAnswers[this.currentQuestionIndex] = selectedAnswerId;
        }

}
