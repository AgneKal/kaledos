import { Routes } from '@angular/router';
import { ListOfGoodsComponent } from './components/list-of-goods/list-of-goods.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';

export const routes: Routes = [
    {path: 'list', component: ListOfGoodsComponent},
    {path: 'addnew', component: AddNewProductComponent}
];
