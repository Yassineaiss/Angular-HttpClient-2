import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Post } from "./post.model";


@Injectable({providedIn: 'root'})
export class PostService{
constructor(private http:HttpClient){}
  createAndStorePost(title:string,  content:string){
    const postData: Post={title:title, content:content}
    this.http.post< {[key: string]: Post }>('https://ng-complete-guide-8c240-default-rtdb.firebaseio.com/posts.json',postData
   )
   .subscribe(ResponseData =>{
     console.log(ResponseData);
   });
  }


fetchPosts(){
 return  this.http.get< {[key: string]: Post }>('https://ng-complete-guide-8c240-default-rtdb.firebaseio.com/posts.json')
  .pipe
  (map((responseData) =>{
    const postsArray : Post[]=[];
    for(const key in responseData){
      if (responseData.hasOwnProperty(key)){
         postsArray.push({...responseData[key], id: key})
      }

    }
    return postsArray;
  })
  )
 ;
}

deletePosts(){
 return this.http.delete('https://ng-complete-guide-8c240-default-rtdb.firebaseio.com/posts.json')
}



}
