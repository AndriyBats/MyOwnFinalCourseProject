import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPackageRequest, IPackageResponse } from '../../interfaces/research-package/products.inteface';

@Injectable({
  providedIn: 'root'
})
export class ResearchPackagesService {
  private url = environment.BACKEND_URL;
  private api = { researchPackages: `${this.url}/research-packages` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<IPackageResponse[]> {
    return this.http.get<IPackageResponse[]>(this.api.researchPackages);
  }

  getOne(id: number): Observable<IPackageResponse> {
    return this.http.get<IPackageResponse>(`${this.api.researchPackages}/${id}`);
  }

  create(researchPackages: IPackageRequest): Observable<void> {
    return this.http.post<void>(this.api.researchPackages, researchPackages)
  }

  update(researchPackages: IPackageRequest, id: number): Observable<void> {
    return this.http.patch<void>(`${this.api.researchPackages}/${id}`, researchPackages)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.researchPackages}/${id}`)
  }
}
