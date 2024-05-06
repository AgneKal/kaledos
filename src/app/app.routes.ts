import { Routes } from '@angular/router';
import { ListOfGoodsComponent } from './components/list-of-goods/list-of-goods.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

export const routes: Routes = [
    {path: '', component: LoginFormComponent},
    {path: 'list', component: ListOfGoodsComponent},
    {path: 'addnew', component: AddNewProductComponent},
    {path: 'edit/:id', component: EditProductComponent},
];
