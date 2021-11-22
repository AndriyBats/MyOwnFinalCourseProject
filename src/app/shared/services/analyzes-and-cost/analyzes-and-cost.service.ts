import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAnalyzesRequest, IAnalyzesResponse } from '../../interfaces/analyzes-and-cost/analyzes-and-cost.interface';

@Injectable({
  providedIn: 'root'
})
export class AnalyzesAndCostService {
  private url = environment.BACKEND_URL;
  private api = { analyz: `${this.url}/analyzes` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<IAnalyzesResponse[]> {
    return this.http.get<IAnalyzesResponse[]>(this.api.analyz);
  }

  getOne(id: number): Observable<IAnalyzesResponse> {
    return this.http.get<IAnalyzesResponse>(`${this.api.analyz}/${id}`);
  }

  create(analyz: IAnalyzesRequest): Observable<void> {
    return this.http.post<void>(this.api.analyz, analyz)
  }

  update(analyz: IAnalyzesRequest, id: number): Observable<void> {
    return this.http.patch<void>(`${this.api.analyz}/${id}`, analyz)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.analyz}/${id}`)
  }
}
