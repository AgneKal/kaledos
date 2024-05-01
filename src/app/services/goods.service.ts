import { Injectable } from '@angular/core';
import { Good } from '../models/good';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  
public goods: Good[] = [];

  constructor(private http:HttpClient) {  }

  public addGood(item: Good) {
    this.goods.push(item);
    return this.http.post("https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods.json", item);
  }

  public loadData() {
    return this.http
      .get<{[key:string]: Good}>("https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods.json")
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
      }));
  }

  public loadRecord(id:string) {
    return this.http.get<Good>(`https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods/${id}.json`);
  }

  public updateRecord(item: Good) {
    return this.http.patch(`https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods/${item.id}.json`, item)
  }

  public deleteRecord(id:string) {
    return this.http.delete(`https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods/${id}.json`)
  }
}
