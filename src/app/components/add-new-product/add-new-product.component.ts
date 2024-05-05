import { Component } from '@angular/core';
import { GoodsService } from '../../services/goods.service';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [FormsModule, LoadingComponent, CommonModule, ErrorComponent],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent {
    public recipient: string|null = null;
    public description: string|null = null;
    public status: string|null = null;
    public isLoading = false;
    public isError = false;

    public constructor(private goodsService: GoodsService){

    }

  public addGood(){
    if (this.recipient!=null && this.description!=null && this.status!=null){
      this.isLoading = true;
      this.goodsService.addGood({
        recipient: this.recipient,
        description: this.description,
        status: this.status,
        id: null,
      }).subscribe({
        next: ()=>{
        this.recipient=null;
        this.description=null;
        this.status=null;
        this.isLoading = false;
        this.isError = false;
        },
        error: ()=>{
          this.isLoading = false;
          this.isError = true;
        }
      })
    }
  }
}
