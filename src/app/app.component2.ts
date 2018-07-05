import Article from './models/article.model';
import { ArticleService } from './services/article.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent2 implements OnInit {
    constructor( private articleService: ArticleService){}

    private newArticle: Article = new Article();

    articlesList : Article[];
    editArticles: Article[] = [];

    imageFile: File =  null;

    ngOnInit(): void {
        // Get all articles
        this.articleService.getArticles()
        .subscribe(articles => {
            this.articlesList = articles
            console.log(articles)
        })
    }

    create(): void {
        console.log(this.newArticle)        
        this.articleService.createArticle(this.newArticle)
        .subscribe(res => {
            this.articlesList.push(res.data)
            this.newArticle = new Article()
        })
    }

    editArticle(article: Article): void {
        console.log(article)
        // Check if article exists
        if(this.articlesList.includes(article)){
            // Check if it already exists in edit list
            if(!this.editArticles.includes(article)){
                // If not, push it in the list
                this.editArticles.push(article)
            }
            else {
                // Else remove it from the list and send put request with edited article
                this.editArticles.splice(this.editArticles.indexOf(article), 1)
                article.image = this.imageFile
                this.imageFile = null
                this.articleService.editArticle(article).subscribe(res =>{
                    console.log("Edit successful")

                    // After sending put request, request new list of all articles
                    this.articleService.getArticles()
                        .subscribe(articles => {
                            this.articlesList = articles
                        })
                }, err => {
                    this.editArticle(article)
                    console.log("Edit unsuccessful")
                })
            }
        }
    }

    submitArticle(event, artcile: Article) {
        if (event.keyCode == 13) {
            this.editArticle(artcile)
        }
    }

    handleFileInput(files: FileList) {
        this.newArticle.image = files.item(0);
    }

    setFile(files: FileList) {
        this.imageFile = files.item(0);
    }

    title = 'app'
}