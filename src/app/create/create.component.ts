import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CreateComponent implements OnInit {

	articles: Array<Article>;
	articleForm: FormGroup;

  constructor(private _articleService: ArticleService, 
  		private router: Router, private aR: ActivatedRoute,
  		private fb: FormBuilder) { }

  ngOnInit() {
  	this._articleService.getArticles()
  		.subscribe(res => this.articles = res);
  		
  	this.articleForm = this.fb.group({
  		'title': [null, Validators.compose([Validators.required, Valiator.minLength(10), Valiator.maxLength(45)])],
  		'content': [null, Validators.compose([Validators.required, Valiator.minLength(10)])],
  	})
  }

  addArticle(article: Article){
  	this._articleService.insertArticle(article)
  		.subscribe(newArticle => {
  			this.articles.push(newArticle);
  			this.route.navigateByUrl('/');
  		})
  }

}
