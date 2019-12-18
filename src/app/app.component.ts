import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  


export class AppComponent implements OnInit ,OnDestroy{
 title = 'angular-http';

  form: FormGroup;
  dataArray = [];
  error = null;
  private errSub: Subscription;
  constructor(private httpService: HttpService,
    private http: HttpClient) { }

  ngOnInit() {

    this.errSub = this.httpService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })

    this.form = new FormGroup({
      'title': new FormControl(''),
      'description' : new FormControl('',)
    })
    
    this.fetchPost();
  }

  onPost() {

    let url = "https://angular-http-aae81.firebaseio.com/posts.json"
    this.httpService.post(url, this.form.value);
    console.log(this.error);
    // this.http.post('https://angular-http-aae81.firebaseio.com/posts.json', this.form.value).
    //   subscribe(responseData => {
    //     console.log(responseData);
    //   });

  }

  fetchPost() {
    let url = "https://angular-http-aae81.firebaseio.com/posts.json"
    this.httpService.get(url).
      subscribe((responseData) => {
        this.dataArray = responseData;
      }, error => {
        console.log(error.message)
    });

  }

  clearPost() {
    let url = "https://angular-http-aae81.firebaseio.com/posts.json";
    this.httpService.delete(url).
      subscribe(responseData=> {
        this.dataArray = [];
    });
  }

  ngOnDestroy() {
    this.errSub.unsubscribe();
  }
}


