import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../models/post.models';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  private _apiUrl :  string = "https://jsonplaceholder.typicode.com/posts"

  constructor(private _http : HttpClient) { }

  // CRUD 

  // Get ALL
  RecupererPosts() {
    return this._http.get<Post[]>(this._apiUrl);
  } 

  // Create

  // Update

  // Delete
}
