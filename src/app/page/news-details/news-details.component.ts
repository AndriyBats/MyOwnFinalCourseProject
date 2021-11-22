import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewsResponse } from 'src/app/shared/interfaces/news/news.interface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  public currentNews!: INewsResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.loadCurrentNews()
  }

  loadCurrentNews(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.newsService.getOne(id).subscribe( data => {
      this.currentNews = data
    }, err => {
      console.log('load news error', err);
     
    })
  }


}
