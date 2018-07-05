import Article from '../models/article.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable()
export class ArticleService {
    api_url = 'http://localhost:3000';
    articleUrl = `${this.api_url}/api/articles`;

    constructor(private http: HttpClient) { }

    createArticle(article: Article): Observable<any> {
        var formData: FormData = new FormData()
        formData.append('file', article.image, article.image.name)
        formData.append('data', JSON.stringify(article))
        return this.http.post(`${this.articleUrl}`, formData);
    }

    getArticles(): Observable<Article[]> {
        return this.http.get(this.articleUrl).pipe(
            map(res => {
                return res["data"].docs as Article[];
            }));
    }

    editArticle(article: Article) {
        let editUrl = `${this.articleUrl}`;
        var formData: FormData = new FormData()
        if(article.image) {
            formData.append('file', article.image, article.image.name)
        }
        formData.append('data', JSON.stringify(article))
        return this.http.put(editUrl, formData);
    }    

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}