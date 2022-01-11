import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../../models/comentario.model';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})

export class ComentarioComponent implements OnInit {
  @Input() comentario!: Comentario;
  constructor() {}
  ngOnInit(): void {}
}