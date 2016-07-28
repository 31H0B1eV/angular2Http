import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from './User';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    private _userUrl: string = "https://api.github.com/users/";
    
    constructor(private _http: Http) {}

    getUser(login: string): Observable<User> {
        return this._http.get(this._userUrl + login)
            .map(res => res.json());
    }

    getFollowers(login: string): Observable<any> {
        return  this._http.get(this._userUrl + login + '/followers')
            .map(res => res.json());
    }
}