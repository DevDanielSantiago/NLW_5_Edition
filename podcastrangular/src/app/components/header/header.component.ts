import { Component, OnInit } from '@angular/core';
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentDate: string

  constructor() { }

  ngOnInit(): void {
    this.currentDate = format(new Date, 'EEEEEE, d MMMM', {
      locale: ptBR,
    })
  }

}
