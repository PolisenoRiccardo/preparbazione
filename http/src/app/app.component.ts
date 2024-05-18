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
  observPrenotazione !:  Observable<Prenotazione>;
  observPrenotazioneArray !: Observable<Prenotazione[]>;
  prenotazioni : Prenotazione[] = [];
  nuovaPrenotazione !: Prenotazione;
  prenotazioneSelezionata !:Prenotazione;
  selezionata: boolean = false;
 
  constructor(public http: HttpClient) {
    this.makeTypedRequest()
  }

  makeTypedRequest() : void
  {
    this.observPrenotazioneArray = this.http.get<Prenotazione[]>('https://my-json-server.typicode.com/PolisenoRiccardo/fakeServer/prenotazioni');
    this.observPrenotazioneArray.subscribe(prenotazioni => {this.prenotazioni = prenotazioni;}); // Vengono salvati i dati ricevuti con il get, nella variabile prenotazioni.
  }

  prenota(
          newNome:HTMLInputElement, 
          newCognome:HTMLInputElement, 
          newIndirizzo:HTMLInputElement, 
          newTelefono:HTMLInputElement, 
          newMail:HTMLInputElement, 
          newData:HTMLInputElement, 
          newOra:HTMLInputElement): boolean 
        {
          this.nuovaPrenotazione = new Prenotazione(newNome.value, newCognome.value, newIndirizzo.value, newTelefono.value, newMail.value, newData.value, newOra.value);
          this.prenotazioni.push(this.nuovaPrenotazione)
          this.makePost()
          return false;
        }
    
  makePost() {
    let posted = JSON.stringify(this.nuovaPrenotazione);
    const headers = {'Content-Type': 'application/json', 'My-Custom-Header': 'foobar' };
    this.observPrenotazione = this.http.post<Prenotazione>("https://my-json-server.typicode.com/PolisenoRiccardo/fakeServer/prenotazioni", posted, {headers});
    this.observPrenotazione.subscribe(postPrenotazione => {this.nuovaPrenotazione = postPrenotazione;});
  }

  selezione(prenotazione: Prenotazione) {
    this.prenotazioneSelezionata = prenotazione;
    this.selezionata = true;
  }


}
