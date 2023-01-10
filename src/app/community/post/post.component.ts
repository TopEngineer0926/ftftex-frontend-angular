import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../community.component.scss']
})
export class PostComponent implements OnInit {
  posts: any;
  constructor() { }

  ngOnInit(): void {
    this.posts = [
      {
        profile_img: 'assets/images/community/user-1.png' , display_name: 'Ankr Team' , user_name: '@AnkrTeam' , date: '2022-09-15T12:12:34Z' ,
        content: {
          text: 'Our App Chains help you to scale the future of Web3 🔨\n' +
            '\n' +
            'Devs can focus on creating dApps that defy expectations, our App Chains have:\n' +
            '\n' +
            '👷 Streamlined Building\n' +
            '⚖️ Enhanced Scalability\n' +
            '🧰 Customizable Features\n' +
            '\n' +
            'Get started now ⬇️' ,
          image: 'assets/images/community/post-1.png'
        },
        comments: [

        ]
      },
    ]
  }

}
