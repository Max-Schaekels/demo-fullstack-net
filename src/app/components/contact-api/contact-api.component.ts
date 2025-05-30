import { Component } from '@angular/core';
import { ContactApiService } from '../../tools/service/contact-api.service';
import { log } from 'console';
import { Post } from '../../models/post.models';

@Component({
  selector: 'app-contact-api',
  standalone: false,
  templateUrl: './contact-api.component.html',
  styleUrl: './contact-api.component.scss'
})
export class ContactApiComponent {


  constructor(private _contactApi :ContactApiService) {  }

 messageErreur : string = "";

 posts : Post[] = [];

 etatModif : boolean = false;

 postModifie! : Post;

  ngOnInit() : void {
    this._contactApi.RecupererPosts()
      .subscribe({
        next : (data) => {
          this.posts = data.slice(0,10);
          
        },
        error : (error) =>{
          this.messageErreur = error.message;
          
        },
        complete : () => {
          console.log("Récupération des posts ok !!!!");
          
        }
      })
    
  } 

}
