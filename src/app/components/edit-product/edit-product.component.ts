import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoodsService } from '../../services/goods.service';
import { Good } from '../../models/good';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  public id:string;
  public description:string|null = null;
  public recipient:string|null = null;
  public status:string|null = null;
  public isLoading = false;

  constructor(private route:ActivatedRoute, private router:Router, private goodsService: GoodsService){
    this.id = this.route.snapshot.params['id'];
    this.goodsService.loadRecord(this.id).subscribe((data)=>{
      this.description = data.description;
      this.recipient = data.recipient;
      this.status = data.status;
    })
  }

  public updateRecord(){
    if(this.description !=null && this.recipient != null && this.status != null) {
      const record: Good = {
        id: this.id,
        description: this.description,
        recipient: this.recipient,
        status: this.status
      }
      this.isLoading = true;
      this.goodsService.updateRecord(record).subscribe(()=>{
        this.isLoading = false;
        this.router.navigate(['list']);
      })
    }
  }
}
