import { Component, OnInit } from '@angular/core';
import { INewsResponse } from 'src/app/shared/interfaces/news/news.interface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public pageNews: Array<INewsResponse> = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNews()
  }

  loadNews(): void {
    this.newsService.getAll().subscribe(data => {
      this.pageNews = data;
    }, err => {
      console.log('load news error', err);
    })
  }


}
