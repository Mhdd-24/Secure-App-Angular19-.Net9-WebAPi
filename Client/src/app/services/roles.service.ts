import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getRoles = () : Observable<Role[]> => 
    this.http.get<Role[]>(`${this.apiUrl}roles`);
  
}
