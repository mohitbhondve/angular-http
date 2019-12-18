import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
    error = new Subject<String>();

  constructor(private http : HttpClient) { }


  post(url,body){
    

    this.http.post(url, body,
      {
        observe: 'response'
      }
    ).subscribe((response) => {
        console.log(response);
      }, error => {
          this.error.next(error.message);
    })
  }

  get(url):Observable<any> {
    
    return this.http.get(url,
      {
        headers: new HttpHeaders({ "custom-headers": "Hello" }),
        params: new HttpParams().set("print","pretty")
      }
    )
    .pipe(map(responseData => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push(responseData[key]);
          }

        }
        return postsArray;
      }),
        catchError(errRes => {
          return throwError(errRes);
        })
        );
  }

  delete(url): any {
    return this.http.delete(url).
      pipe(map(responseData => {
        return responseData;
      }));
  }
}


