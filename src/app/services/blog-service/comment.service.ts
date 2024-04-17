import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";


const BASIC_URL = environment["BASIC_URL"]
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { 

  }

  
  createComment(blogId:number,userId:number,content:string) :Observable<any>{ 
    const params = new HttpParams()
      .set('blogId', blogId.toString())
      .set('userId', userId.toString());
    return this.http.post<any>(BASIC_URL+`api/auth/Comments`,content,{params});
  }
 

  getAllCommentsByBlog(blogId:number) :Observable<any>{
    return this.http.get(BASIC_URL+`api/auth/Comments/${blogId}`);

  }

  updateComment(id:number, data:any) {
    return this.http.put(BASIC_URL + `api/auth/Comments/${id}`, data);
  }

  deleteComment(Id:number){
    return this.http.delete(BASIC_URL + `api/auth/Comments/${Id}`);

  }
}
