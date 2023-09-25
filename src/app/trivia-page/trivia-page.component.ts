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

  difficulty = "easy";


  constructor(private triviaService: TriviaService) { }

  ngOnInit(): void {
    this.refreshQuestion();
  }

  refreshQuestion(): void {
    // Pulls a new question from the API
    
    this.triviaService.getQuestions('9', this.difficulty).subscribe(data => {
      console.log(this.difficulty);
      this.question = data.results;

      // Jumbles up the correct answer and the incorrect answers
      // (if multiple choice)
      if (this.question[0].type == "boolean") {
        this.choices = ["True", "False"];
      }
      else { // Keeps the JSON data from being modified in case it needs to be referenced later
        this.choices = this.question[0].incorrect_answers;
        this.choices.splice(Math.floor(Math.random() * (this.choices.length + 1)), 0, this.question[0].correct_answer);
      }
    });
    console.log(this.question);
    this.promptQuestion = true;
  }

  submitAnswers(): void {
    if (this.selectedChoice == this.question[0].correct_answer) {
      this.correctAnswerGiven = true;
    }
    else {
      this.correctAnswerGiven = false;
    }

    this.questionTotal++;
    this.promptQuestion = false;
  }

  continueTrivia(): void {
    if (this.questionTotal == 4) {
      this.difficulty = "medium";
    }
    else if (this.questionTotal == 8) {
      this.difficulty = "hard";
    }
    this.refreshQuestion();
  }

  restartTrivia(): void {
    this.questionTotal = 0;
    this.question = [];
    this.difficulty = "easy";
    this.refreshQuestion();
  }
}
