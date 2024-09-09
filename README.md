# Salesforce-Quiz-App
Overview
The quiz application allows users to:
  Select a quiz and its difficulty level.
  Answer questions from the selected quiz.
  Submit their answers and view their score.

Components
User Interface Components:
  Start Page: Displays a button to start the quiz.
  Selection Page: Allows users to select a quiz and a difficulty level from dropdown menus.
  Question Page: Displays one question at a time with multiple-choice answers.
  Submission Page: Confirms quiz submission and shows a button to check results.
  Result Page: Displays the number of correct answers.

Backend Integration:
  Apex Methods: These server-side methods fetch quiz options, difficulty levels, and questions from the Salesforce database, submit answers, and create quiz attempt records.
-----------------------
Detailed Functionality
  Loading Quiz Options and Difficulty Levels:
    Upon loading, the application fetches available quizzes and their difficulty levels using Apex methods. These options are displayed in dropdown menus on the selection page.
  Starting the Quiz:
    The user begins by clicking a "Sure" button on the start page, which navigates to the selection page.
    The user selects a quiz and difficulty level. If quiz questions are available, a "Start Quiz" button appears.
  Displaying Questions:
    Upon starting the quiz, the first question is displayed with multiple-choice answers.
    Users can navigate between questions using the "Previous" and "Next" buttons.
    The current question number and text are shown at the top of the question page.
  Submitting the Quiz:
    After answering all questions, the user submits the quiz by clicking the "Submit" button.
    The submission records the start and end times and calculates the number of correct answers.
    An Apex method processes the answers to determine the score and creates a quiz attempt record in Salesforce.
  Viewing Results:
    After submission, the user can view their results on the result page, which shows the number of correct answers. If the score is the highest so far, it will be saved on the Lesson Progress object.
  
