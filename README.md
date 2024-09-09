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

Detailed Functionality
-------
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

Objects and Relationships
-----
  Account object (students) are central, linking to Enrollments (students in courses) and Courses (lecturers creating courses).
  Enrollments connect students to Courses and track their progress through Lesson Progress and Assignments.
  Courses consist of multiple Lessons, each of which can have related Quizzes.
  Quizzes are composed of several Questions with corresponding Answers. 
  Quiz Attempts record students' performance on quizzes, linking back to their Lesson Progress and Enrollments. More in detail:

Account Object:
  Account represents users (students) in the system.
  Standard fields like Salutation, First Name, Last Name, and Email help in personalizing user profiles.
  Relationships:
  Linked to Enrollment to manage student enrollments in courses.
  Linked to Lecturer through Course objects to associate courses with lecturers.

Enrollment Object:
  Tracks student enrollments in specific courses.
  Fields like Course, Start Date, and Enrollment Status provide detailed enrollment data.
  Relationships:
  Student (Lookup to Account) - Links each enrollment to a student.
  Course (Lookup to Course) - Links each enrollment to a specific course.

Course Object:
  Represents courses offered by lecturers.
  Includes fields like Course Level, Course Name, Description, and Duration.
  Relationships:
  Lecturer (Lookup to User) - Associates courses with lecturers.
  Lessons (Master-Detail relationship) - Courses have multiple lessons.
  
Lesson Object:
  Details the content and structure of each lesson within a course.
  Fields include Content, Lesson Name, Lesson Order, and Related Course.
  Relationships:
  Related Course (Master-Detail to Course) - Connects lessons to their respective courses.
  Quiz (Lookup to Quiz) - Associates quizzes with lessons.

Assignment Object:
  Manages assignments given to students, as their weekly task of lesson and quiz to do.
  Fields like Assignment Name, Description, Due Date, and Submission Status track assignment details.
  Relationships:
  Enrollment (Lookup to Enrollment) - Links assignments to specific student enrollments.
  Lesson (Lookup to Lesson) - Connects assignments to lessons.
  Quiz (Lookup to Quiz) - Associates assignments with quizzes.

Lesson Progress Object:
  Tracks student progress in lessons.
  Fields like Achieved Level, Achieved Score, and Completion Status measure student performance.
  Relationships:
  Enrollment (Master-Detail to Enrollment) - Connects progress records to student enrollments.
  Lesson (Lookup to Lesson) - Links progress records to specific lessons.
  Quiz (Lookup to Quiz) - Associates progress with quiz results.
  
Quiz Object:
  The Quiz object comprises several questions forming a complete quiz and represents quizzes associated with specific lessons and courses.
  Fields include Quiz Name, Description, and Difficulty Level.
  Relationships:
  Questions (Master-Detail relationship) - Quizzes contain multiple questions.
  Related Course (Lookup to Course) - Links quizzes to courses.
  Related Lesson (Lookup to Lesson) - Connects quizzes to lessons.
 
Question Object:
  Details individual questions within a quiz.
  Fields like Question Name, Question Text, and Difficulty Level specify question details.
  Relationships:
  Related Quiz (Lookup to Quiz) - Connects questions to their respective quizzes.
  
Answer Object:
  Manages possible answers for each question.
  Fields include Answer Text and Correct Answer checkbox (boolean) to indicate correct responses.
  Relationships:
  Related Question (Master-Detail to Question) - Connects answers to their respective questions.
  
Quiz Attempt Object:
  Tracks student attempts at completing quizzes.
  Fields like Difficulty Level Achieved, Score, and Total Time measure performance on quizzes.
  Relationships:
  Lesson Progress (Master-Detail to Lesson Progress) - Links quiz attempts to lesson progress.
  Quiz (Lookup to Quiz) - Associates attempts with specific quizzes.
  Student (Lookup to User) - Links attempts to student users.


