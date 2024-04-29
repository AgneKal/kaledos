import { Component } from '@angular/core';
import { GoodsService } from '../../services/goods.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent {
    public recipient: string|null = null;
    public description: string|null = null;
    public status: string|null = null;

    public constructor(private goodsService: GoodsService){

    }

  public addGood(){
    if (this.recipient!=null && this.description!=null && this.status!=null){
      this.goodsService.addGood({
        recipient: this.recipient,
        description: this.description,
        status: this.status,
        id: null,
      }).subscribe(()=>{
        this.recipient=null;
        this.description=null;
        this.status=null;
      })
    }
  }
}
