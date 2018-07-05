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

    fileToUpload: File = null;

    ngOnInit(): void {
        this.articleService.getArticles()
        .subscribe(articles => {
            this.articlesList = articles
            console.log(articles)
        })
    }

    create(): void {
        console.log(this.newArticle)
        // const formData: FormData = new FormData();
        // formData.append('title', this.newArticle.title)
        // formData.append('description', this.newArticle.description)
        // formData.append('image', this.fileToUpload, this.fileToUpload.name);
        // console.log(formData)
        this.articleService.createArticle(this.newArticle)
        .subscribe(res => {
            this.articlesList.push(res.data)
            this.newArticle = new Article()
        })
    }

    editArticle(article: Article): void {
        console.log(article)
        if(this.articlesList.includes(article)){
            if(!this.editArticles.includes(article)){
                this.editArticles.push(article)
            }
            else {
                this.editArticles.splice(this.editArticles.indexOf(article), 1)
                this.articleService.editArticle(article).subscribe(res =>{
                    console.log("Edit successful")
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

    title = 'app'
}