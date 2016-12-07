import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Survey} from '../models/survey.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const apiUrl = 'http://localhost:9000/api';

@Injectable()
export class SurveyService{
    constructor(private http:Http){}
    getSurveys():Observable<Survey[]>{
        return this.http.get(apiUrl+'/surveys')
            .map((res:Response)=>res.json())
            .catch((error:any)=>Observable.throw(error.error || 'Server error'))
    }
    
    getSurvey(id):Observable<Survey>{
        return this.http.get(apiUrl+'/surveys/'+id)
            .map((res:Response)=>res.json())
            .catch((error:any)=>Observable.throw(error || 'Server error'))
    }

    saveSurvey(newSurvey: Survey, token):Observable<Survey>{
        let headers = new Headers({'Content-Type':'application/json', 'x-auth':token});
        let options = new RequestOptions({headers: headers});
        return this.http.post(apiUrl+'/surveys',JSON.stringify(newSurvey), options)
            .map((res:Response)=>res.json())
            .catch((error:any)=>console.log(error || 'Server error'));
    }

    saveOption(survey_id, option_id):Observable<Survey>{
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.put(apiUrl+'/surveys/'+survey_id+'/options/'+option_id,{},options)
            .map((res:Response)=>res.json())
            .catch((error:any)=>console.log(error || 'Server error'))
    }
    deleteSurvey(survey_id, token):Observable<Survey>{
        let headers = new Headers({'Content-Type':'application/json', 'x-auth':token});
        let options = new RequestOptions({headers: headers});
        return this.http.delete(apiUrl+'/surveys/'+survey_id, options)
            .map((res:Response)=>res.json())
            .catch((error:any)=>console.log(error || 'Server error'))
    }
    
    addNewOption(survey_id, body):Observable<Survey>{
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(apiUrl+'/surveys/'+survey_id+'/options', body, options)
            .map((res:Response)=>res.json())
            .catch((error:any)=>console.log(error || 'Server error'))
    }
    /*
    createUser(newUser:User):Observable<User>{
        console.log('service trying to create user')
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.post(apiUrl+'/users', JSON.stringify(newUser), options)
            .map((res:Response)=>res.json())
            .catch((error:any)=>Observable.throw(error.error || 'Server error'))
    }
    login(user:User):Observable<User>{
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(apiUrl+'/users/login', JSON.stringify(user), options)
            .map((res:Response)=>res.json())
            .catch((error:any)=>Observable.throw(error.error || 'Server error'))
    }
    */
}