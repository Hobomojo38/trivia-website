import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../trivia.service';

@Component({
  selector: 'app-trivia-page',
  templateUrl: './trivia-page.component.html',
  styleUrls: ['./trivia-page.component.css']
})

export class TriviaPageComponent implements OnInit {
  // This could be simplified like a java class, but that's
  // an issue for future me.
  question: any[] = []; // Stores the question and answer JSON data
  choices: string[] = []; // Stores the answer options
  selectedChoice: string = ""; // Stores the answer that the user selects

  questionTotal = 0;
  promptQuestion = true; // When true, a question is displayed. When false, the answer is displayed.
  correctAnswerGiven = true; // Decides which screen is shown when an answer is submitted. 
  gameWon = false; // Decides which screen is shown when the game is won.

  difficulty = "easy";


  constructor(private triviaService: TriviaService) { }
  

  // Pulls a question from the API when the page is loaded
  ngOnInit(): void {
    this.refreshQuestion();
  }

  // Pulls a new question from the API
  refreshQuestion(): void {
    this.triviaService.getQuestions('9', this.difficulty).subscribe(data => {
      console.log(this.difficulty);
      this.question = data.results;

      // Defines the choices for the question
      // (if multiple choice, jumbles the answers)
      if (this.question[0].type == "boolean") {
        this.choices = ["True", "False"];
      }
      else { // Keeps the JSON data from being modified in case it needs to be referenced later
        this.choices = this.question[0].incorrect_answers;
        this.choices.splice(Math.floor(Math.random() * (this.choices.length + 1)), 0, this.question[0].correct_answer);
      }
    });
    // console.log(this.question);
    this.promptQuestion = true;
  }

  // Checks if the answer is correct and changes difficulty if necessary
  submitAnswers(): void {
    if (this.selectedChoice == this.question[0].correct_answer) {
      this.correctAnswerGiven = true;
    }
    else {
      this.correctAnswerGiven = false;
    }

    this.questionTotal++;
    if (this.questionTotal == 4) {
      this.difficulty = "medium";
    }
    else if (this.questionTotal == 8) {
      this.difficulty = "hard";
    }
    else if (this.questionTotal == 10) {
      this.promptQuestion = false;
      this.gameWon = true;
    }
    this.promptQuestion = false;
  }

  // Resets the page to display a new question
  // (Not really necessary rn, but can build on in the future)
  continueTrivia(): void {
    this.refreshQuestion();
  }

  // Resets all variables to their default values and brings a new question
  restartTrivia(): void {
    this.questionTotal = 0;
    this.question = [];
    this.difficulty = "easy";
    this.gameWon = false;
    this.refreshQuestion();
  }
}
