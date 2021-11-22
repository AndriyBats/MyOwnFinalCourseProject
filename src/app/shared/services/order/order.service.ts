import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrderRequest, IOrderResponse } from '../../interfaces/order/order.inteface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  changeBasket = new Subject<boolean>();
  private url = environment.BACKEND_URL;
  private api = { orders: `${this.url}/orders` };

  constructor(
    private http: HttpClient,
    ) { }

  getAll(): Observable<IOrderResponse[]> {
    return this.http.get<IOrderResponse[]>(this.api.orders);
  }

  create(order: IOrderRequest): Observable<void> {
    return this.http.post<void>(this.api.orders, order);
  }

  update(order: IOrderResponse, id: number): Observable<void> {
    return this.http.patch<void>(`${this.api.orders}/${id}`, order);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.orders}/${id}`);
  }

}
