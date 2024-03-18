import { Component } from '@angular/core';
import { NewsService } from './services/news.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'salt-testwork';
  data: any[] = [];
  groupedData: any[][] = [];
  loading: boolean = true;

  constructor(private service: NewsService) {}

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.loading = true;
    this.service.getNews().subscribe({
      next: (arrId: number[]) => {
        const per20data = arrId.slice(0, 20);
        if (per20data) {
          for (let id of per20data) {
            this.service.getNewsItem(id).subscribe({
              next: (detail: any) => {
                this.loading = false;
                this.data.push(detail);
                if (this.data.length === per20data.length) {
                  this.groupData();
                }
              },
              error: (e) => {
                this.loading = false;
                console.log(e);
              },
            });
          }
        }
      },
      error: (e) => {
        this.loading = false;
        console.log(e);
      },
    });
  }

  groupData(): void {
    for (let i = 0; i < this.data.length; i += 5) {
      this.groupedData.push(this.data.slice(i, i + 5));
    }

    // console.log(this.groupedData);
    console.log(this.groupedData);
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
