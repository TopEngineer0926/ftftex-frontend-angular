import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  MediaData = [
    {title : 'sample media title' , url : 'https://www.youtube.com/embed/EEuPmA8w0Kc' , thumbnail : 'assets/images/community/1.jpg'},
    {title : 'sample media title' , url : 'https://www.youtube.com/embed/gvKstUUdueM' , thumbnail : 'assets/images/community/3.jpg'},
    {title : 'sample media title' , url : '' , thumbnail : 'assets/images/community/2.jpg'},
    {title : 'sample media title' , url : '' , thumbnail : 'assets/images/community/1.jpg'},
    {title : 'sample media title' , url : '' , thumbnail : 'assets/images/community/6.jpg'},
    {title : 'sample media title' , url : '' , thumbnail : 'assets/images/community/5.jpg'},
    {title : 'sample media title' , url : '' , thumbnail : 'assets/images/community/7.jpg'},
    {title : 'sample media title' , url : '' , thumbnail : 'assets/images/community/4.jpg'},

    ];
  constructor() { }
  ngOnInit(): void {
  }

}
