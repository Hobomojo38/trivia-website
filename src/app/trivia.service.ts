import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }

  getQuestions(category?: string, difficulty?: string, type?: string): Observable<any> {
    let url = `${this.apiUrl}?amount=1`;

    if (category) {
      url += `&category=${category}`;
    }
    else {
      url += `&category=9`;
    }

    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }
    else {
      url += `&difficulty=easy`;
    }

    if (type) {
      url += `&type=${type}`;
    }
    else {
      url += `&type=multiple`;
    }

    console.log(url);

    return this.http.get(url)
  }
}
