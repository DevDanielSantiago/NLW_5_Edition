import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  episodesList () {
    let params: any = {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
    
    return this.http.get(`${this.API}/episodes`, { params: params });
  }

  episode (slug: string) {
    return this.http.get(`${this.API}/episodes/${slug}`)
  }
}
