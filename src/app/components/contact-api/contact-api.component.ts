import { Component } from '@angular/core';
import { ContactApiService } from '../../tools/service/contact-api.service';
import { log } from 'console';
import { Post } from '../../models/post.models';
import { title } from 'process';

@Component({
  selector: 'app-contact-api',
  standalone: false,
  templateUrl: './contact-api.component.html',
  styleUrl: './contact-api.component.scss'
})
export class ContactApiComponent {


  constructor(private _contactApi: ContactApiService) { }

  messageErreur: string = "";

  posts: Post[] = [];

  etatModif: boolean = false;

  postModifie!: Post;

  nouveauPost: Post = {
    userId: 1,
    id: 0,
    title: '',
    body: '',
  };

  ngOnInit(): void {
    this._contactApi.RecupererPosts()
      .subscribe({
        next: (data) => {
          this.posts = data.slice(0, 10);

        },
        error: (error) => {
          this.messageErreur = error.message;

        },
        complete: () => {
          console.log("Récupération des posts ok !!!!");

        }
      });

  }
  AjouterPost(): void {
    console.log("AjouterPost() appelé");
    if (!this.nouveauPost.title.trim() || !this.nouveauPost.body.trim()) {
      console.warn("Titre ou contenu vide !");
      return;
    }


    this._contactApi.AjoutPosts(this.nouveauPost).subscribe({
      next: (data) => {
        console.log("Réponse API :", data);

        // On l’ajoute manuellement à la liste locale
        this.posts.unshift(data);

        // On vide le formulaire
        this.nouveauPost = {
          userId: 1,
          id: 0,
          title: '',
          body: ''
        };
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout :", error.message);
        this.messageErreur = error.message;
      }
    });
  }


  ModifPost(): void {
    this._contactApi.ModifPost(this.postModifie).subscribe({
      next: (data) => {
        //On retrouve le post dans la liste initiale et on le remplace
        const index = this.posts.findIndex((p) => p.id === data.id);
        if (index !== -1) {
          this.posts[index] = data;
          this.etatModif = false;

        }
      },
      error: (error) => {
        console.error("Erreur lors de la modif :", error.message);
      },
      complete: () => {
        console.log("Modification ok !!!!");

      }
    });
  }

DeletePost(post: Post): void {
  this._contactApi.DeletePost(post).subscribe({
    next: () => {
      
      const index = this.posts.findIndex((p) => p.id === post.id);
      if (index !== -1) {
        this.posts.splice(index, 1);
      }
    },
    error: (error) => {
      console.error("Erreur lors de la suppression :", error.message);
      this.messageErreur = error.message;
    },
    complete: () => {
      console.log("Suppression réussie !");
    }
  });
}


  /**
   * Active l'état de modifcation et clone le post cliqué
   * @param post le post sélectionner pour modification
   */
  Modif(post: Post): void {
    // on clone le post pour éviter de modifir la liste
    this.postModifie = { ...post };
    this.etatModif = true;

  }

}
