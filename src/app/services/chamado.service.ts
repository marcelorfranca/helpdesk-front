import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Chamado } from '../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }
  
  findAll(): Observable<Chamado[]> { /** metodo que lista todos os chamados */
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
  }

  /** o método posto precisa retornar dois argumentos */
  create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, chamado);
  }
    

}
