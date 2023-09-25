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
  question: any[] = [];
  choices: string[] = [];
  selectedChoice: string = "";

  totalCount = 0;
  correctCount = 0;
  continue = true;
  correctAnswer = true;


  constructor(private triviaService: TriviaService) { }

  ngOnInit(): void {
    this.refreshQuestion();
  }

  refreshQuestion(): void {
    // Pulls a new question from the API
    this.triviaService.getQuestions().subscribe(data => {
      this.question = data.results;

    // Jumbles up the correct answer and the incorrect answers
    // (if multiple choice)
      if (this.question[0].type == "boolean") {
        this.choices = ["True", "False"];
      }
      else {
        this.choices = this.question[0].incorrect_answers;
        this.choices.splice(Math.floor(Math.random() * (this.choices.length + 1)), 0, this.question[0].correct_answer);
      }
    });
    console.log(this.question);
    this.continue = true;
  }

  submitAnswers(): void {
    if (this.selectedChoice == this.question[0].correct_answer) {
      this.correctCount++;
      this.correctAnswer = true;
    }
    else {
      this.correctAnswer = false;
    }

    this.totalCount++;
    this.continue = false;
  }

  restartTrivia(): void {
    this.totalCount = 0;
    this.correctCount = 0;
    this.refreshQuestion();
  }
}
