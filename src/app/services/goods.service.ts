import { Injectable } from '@angular/core';
import { Good } from '../models/good';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  
public goods: Good[] = [];

  constructor(private http:HttpClient) {  }

  private addToDatabase(item: Good){
    this.http.post("https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods.json", item).subscribe(()=>{});
  }

  public addGood(item: Good) {
    this.goods.push(item);
    this.addToDatabase(item)
  }

  public loadData() {
    return this.http.get<{[key:string]: Good}>("https://kaledos-36744-default-rtdb.europe-west1.firebasedatabase.app/goods.json");
  }
}
