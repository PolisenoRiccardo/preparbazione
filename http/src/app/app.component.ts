import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Prenotazione } from './prenotazione.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  observPrenotazioneArray !: Observable<Prenotazione[]>;
  prenotazioni : Prenotazione[] = [];
 
  constructor(public http: HttpClient) {
    this.makeTypedRequest()
  }

  makeTypedRequest() : void
  {
    this.observPrenotazioneArray = this.http.get<Prenotazione[]>('https://my-json-server.typicode.com/PolisenoRiccardo/fakeServer/prenotazioni');
    this.observPrenotazioneArray.subscribe(prenotazioni => {this.prenotazioni = prenotazioni;}); // Vengono salvati i dati ricevuti con il get, nella variabile prenotazioni.

  }

}
