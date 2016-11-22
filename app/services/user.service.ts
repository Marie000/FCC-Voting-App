import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {User} from '../models/user.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const apiUrl = 'http://localhost:9000/api';

@Injectable()
export class UserService{
    constructor(private http:Http){}
    createUser(newUser:User):Observable<User>{
        console.log('service trying to create user')
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers, 'Access-Control-Allow-Origin':"*" });
        return this.http.post(apiUrl+'/users', JSON.stringify(newUser), options)
            .map((res:Response)=>res.json())
            .catch((error:any)=>Observable.throw(error.error || 'Server error'))
    }
}