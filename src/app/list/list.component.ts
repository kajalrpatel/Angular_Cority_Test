import { Component, OnInit } from '@angular/core';
import {DatePipe,formatDate } from '@angular/common';
import { List } from '../list';
import { Listall } from '../list-items';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	Listall = Listall;
	date = new Date();
	public shouldShow = true;
	const showcount = 3;
  constructor(private sanitizer: DomSanitizer) { 
  }
	
  ngOnInit() {
	 this.newPostCount();
  }
	removeList(list){
		 this.Listall = this.Listall.filter( element =>
		  element !== list 
		);  
		alert('"'+list.title +'"'+ ' will be Deleted!');
		this.newPostCount();
	}
	
	downloadFile(data: Response) {
		const filedata = "Title = "+data.title+"\nTagline = "+data.tagline+"\nDescription = "+data.desc;
		const blob: Blob = new Blob([filedata], {type: 'text/plain'});
		const fileName: string = data.title+'.text';
		const objectUrl: string = URL.createObjectURL(blob);
		const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
		a.href = objectUrl;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();        
		document.body.removeChild(a);
		URL.revokeObjectURL(objectUrl);
		 this.newPostCount();
	}
	  onSubmit(blogform: NgForm) {
		const nextBlogId = (Listall.reduce((max, b) => Math.max(max, b.id), Listall[0].id))+1;  
		this.Listall.splice(0, 0, {
		   id:nextBlogId, title: blogform.value.title,tagline: blogform.value.tagline, desc:blogform.value.desc, img_url: "", is_new : true 
		});
		this.closeDialog();
		alert('Blog "'+blogform.value.title+'"'+ ' Added !');
		this.newPostCount();
	  }
	  showDialog(){
		  document.getElementById('dialogbox').style.display = "block";
	  }
	  closeDialog(){
		   document.getElementById('dialogbox').style.display = "none";;
		   document.getElementById('blog-detail').style.display = "none";;
	  }
	  openBlogDetail(list){
		   document.getElementById('blog-detail').style.display = "block";
		   this.blog_title = list.title;
		   this.blog_tagline = list.tagline;
		   this.blog_desc = list.desc;
		   this.blog_img_url = (list.img_url == "" ? "assets/thumb.png" : list.img_url);
		   list.is_new = false;
		   this.newPostCount();
	  }
	  newPostCount(){
		  const count=0;
		   this.Listall.forEach(List => {
				 if (List.is_new){ 
				  count++; 
				}
			});
		this.new_count = count;
	  }
	loadMore() {
		this.showcount += 3;
	}
}
