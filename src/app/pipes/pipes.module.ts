import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaxLengthStringPipe } from './max-length-string.pipe';
import { FechaPipe } from './fecha.pipe';



@NgModule({
  declarations: [
    MaxLengthStringPipe,
    FechaPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MaxLengthStringPipe,
    FechaPipe
  ]
})
export class PipesModule { }
