import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASIC_URL = " http://localhost:8090/"
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  updatedBlog:any;
  constructor(private http:HttpClient) { }

  createBlog(blogData: any): Observable<any> {
    return this.http.post(BASIC_URL + 'Blogs',blogData);
  }
  uploadImage(blogId: number, imageFile:File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post<any>(BASIC_URL + `Blogs/${blogId}/image`, formData);
  }
  getAllBlogs(): Observable<any>{
    return this.http.get(BASIC_URL + `Blogs`);
  }
  getBlogById(Id:number): Observable<any>{
    return this.http.get(BASIC_URL + `Blogs/${Id}`);
  }
  likeBlog(Id:number): Observable<any>{
    return this.http.put(BASIC_URL + `Blogs/${Id}/like`,{});
  }
  searchByTitle(title:string): Observable<any>{
    return this.http.get(BASIC_URL + `Blogs/search/${title}`);
  }
  updateBlog(Id:number,updatedBlog: any){
    return this.http.put(BASIC_URL + `Blogs/${Id}`,updatedBlog);

  }
  deleteBlog(Id:number){
    return this.http.delete(BASIC_URL + `Blogs/${Id}`);

  }

  getBlogImageById(Id:number): Observable<any> {
    return this.http.get(BASIC_URL + `Blogs/${Id}/image`, { responseType: 'blob' });
  }
}
