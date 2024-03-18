import { Component } from '@angular/core';
import { News } from './model/news';
import { NewsService } from './services/news.service';
import * as moment from 'moment';
import { Sources } from './model/sources';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'salt-testwork';
  news: News[] = [];
  newsBitcoin: News[] = [];
  newsSources: Sources[] = [];
  loading: boolean = true;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.getTopHeadline();
    this.getSources();
    this.getChannels();
  }

  getChannels() {
    this.loading = true;
    this.newsService.getChannel().subscribe(
      (data: Sources[]) => {
        this.loading = false;
        this.newsSources = data;
        console.log(this.newsSources);
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching news:', error);
      }
    );
  }

  getTopHeadline() {
    this.loading = true;
    this.newsService.getNewsTopHeadline().subscribe(
      (data: News[]) => {
        this.loading = false;
        this.news = data;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching news:', error);
      }
    );
  }

  getSources() {
    this.loading = true;
    this.newsService.getNewsSource().subscribe(
      (data: News[]) => {
        this.loading = false;
        this.newsBitcoin = data;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching news:', error);
      }
    );
  }

  cutString(desc: string, max: number) {
    return desc.length > max ? desc.substring(0, max) + '...' : desc;
  }

  returnDate(date: string) {
    return moment(date).format('MMMM DD, YYYY');
  }

  toUrl(url: string) {
    window.open(url, '_blank');
  }
}
