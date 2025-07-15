import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);

  // readonly users = signal<User[]>([]); // local state

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  createUser(user: Partial<User>) {
    return this.http.post<User>(this.baseUrl, user);
  }

  updateUser(id: number, user: Partial<User>) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
