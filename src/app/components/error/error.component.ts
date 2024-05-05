import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
 
 @Input() 
 message:String="";

 @Output()
 close=new EventEmitter();

 constructor(){
  setTimeout(()=>{
    this.close.emit();
  },5000);
 }

 public closeClick(){
   this.close.emit();
 }
}
