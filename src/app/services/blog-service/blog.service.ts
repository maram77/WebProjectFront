import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";


const BASIC_URL = environment["BASIC_URL"]
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  updatedBlog:any;
  constructor(private http:HttpClient) { }

  createBlog(blogData: any): Observable<any> {
    return this.http.post(`${BASIC_URL}api/auth/Blogs`,blogData);
  }
  uploadImage(blogId: number, imageFile:File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post<any>(BASIC_URL + `api/auth/Blogs/${blogId}/image`, formData);
  }
  getAllBlogs(): Observable<any>{
    return this.http.get(BASIC_URL + `api/auth/Blogs`);
  }
  fetchBlogsAndLog(): void {
    this.getAllBlogs().subscribe(
      (response) => {
        console.log('Blogs:', response);
      },
      (error) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

  getBlogById(Id:number): Observable<any>{
    return this.http.get(BASIC_URL + `api/auth/Blogs/${Id}`);
  }
  likeBlog(Id:number): Observable<any>{
    return this.http.put(BASIC_URL + `api/auth/Blogs/${Id}/like`,{});
  }
  searchByTitle(title:string): Observable<any>{
    return this.http.get(BASIC_URL + `api/auth/Blogs/search/${title}`);
  }
  updateBlog(Id:number,updatedBlog: any){
    return this.http.put(BASIC_URL + `api/auth/Blogs/${Id}`,updatedBlog);

  }
  deleteBlog(Id:number){
    return this.http.delete(BASIC_URL + `api/auth/Blogs/${Id}`);

  }

  getBlogImageById(Id:number): Observable<any> {
    return this.http.get(BASIC_URL + `api/auth/Blogs/${Id}/image`, { responseType: 'blob' });
  }
}
