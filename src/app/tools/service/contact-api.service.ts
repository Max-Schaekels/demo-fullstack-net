import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../models/post.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  private _apiUrl :  string = "https://jsonplaceholder.typicode.com/posts"

  constructor(private _http : HttpClient) { }

  // CRUD 

  // Get ALL
  RecupererPosts() : Observable<Post[]> {
    return this._http.get<Post[]>(this._apiUrl);
  } 

  // Create

  AjoutPosts(post : Post) : Observable<Post>{
    return this._http.post<Post>(this._apiUrl , post);
  }

  // Update
  ModifPost(post : Post) : Observable<Post>{
    return this._http.put<Post>(`${this._apiUrl}/${post.id}`, post);
  }

  // Delete
  DeletePost(post : Post) : Observable<{}>{
    return this._http.delete(`${this._apiUrl}/${post.id}`);
  }
}
