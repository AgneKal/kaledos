import { EventEmitter, Injectable } from '@angular/core';
import { Good } from '../models/good';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  
  public goods: Good[] = [];

  public onGoodsCountChange = new EventEmitter();
  public onStatusChange = new EventEmitter<Number>();


  constructor(private http:HttpClient, private authService: AuthService) {  }

  public addGood(item: Good) {
    this.goods.push(item);
    return this.http.post(`https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods.json?auth=${this.authService.auth?.idToken}`, item)
    .pipe (
      tap(() => this.onGoodsCountChange.emit())
    );
  }

  public loadData() {
    return this.http
      .get<{[key:string]: Good}>(`https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods.json?auth=${this.authService.auth?.idToken}`)
      .pipe(
        map( (data):Good[] => {
          let goods = [];
          for(let x in data) {
            goods.push ({...data[x], id:x});
          }
          return goods;
        }),
        tap((data)=> {
        this.goods = data;
        this.onStatusChange.emit(0);
        }),
        catchError((err, c) => {
          this.onStatusChange.emit(1);
          throw 'klaida';
        })
      );
  }

  public loadRecord(id:string) {
    return this.http.get<Good>(`https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods/${id}.json?auth=${this.authService.auth?.idToken}`);
  }

  public updateRecord(item: Good) {
    return this.http.patch(`https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods/${item.id}.json?auth=${this.authService.auth?.idToken}`, item)
  }

  public deleteRecord(id:string) {
    return this.http.delete(`https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods/${id}.json?auth=${this.authService.auth?.idToken}`)
      .pipe (
        tap(() => this.onGoodsCountChange.emit())
      );
  }
}
