import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const BASIC_URL = " http://localhost:8090/"

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
    return this.http.post<any>(BASIC_URL+`Comments`,content,{params});
  }
 

  getAllCommentsByBlog(blogId:number) :Observable<any>{
    return this.http.get(BASIC_URL+`Comments/${blogId}`);

  }

  updateComment(id:number, data:any) {
    return this.http.put(BASIC_URL + `Comments/${id}`, data);
  }

  deleteComment(Id:number){
    return this.http.delete(BASIC_URL + `Comments/${Id}`);

  }
}
