import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['../community.component.scss']
})
export class FeedComponent implements OnInit {
  posts;
  LogginIn = {0:''};
  toggled: boolean = false;
  CreatePostText = '';
  TempPost: any;
  TheImage;
  constructor(private api: DataService) { }

  ngOnInit(): void {
    this.api.Loggedin.subscribe((res: any) => {
      if (!res[0]){
      } else {
        this.LogginIn = res;
      }
    });
    this.posts = [
      {
        profile_img: 'https://s3.coinmarketcap.com/static/img/portraits/628367a8ab0e763d5f77e525.png' , display_name: 'Everscale' , user_name: '@Everscale' , date: '2022-09-29T12:12:34Z' ,
        content: {
          text: 'Most users can’t look under the hood of the blockchain, and even for developers it can take a lot of time to browse through all the data 🤯' ,
          image: 'https://s3.coinmarketcap.com/static-gravity/thumbnail/large/2a23b013e67f4b6b97a59b8b68e78e83.png'
        }
      },
      {
        profile_img: 'https://s3.coinmarketcap.com/static/img/portraits/6271e49a7d1c136ae3841de1.png' , display_name: 'Corte' , user_name: '@Corte' , date: '2022-09-28T12:12:34Z' ,
        content: {
          text: 'LIVE on by Bybit at 2PM UTC, to celebrate @ByBit has set up a Trade-And-Earn competition. \n' +
          'Make a Spot trade of at least 20,000 $CO and get an equal share of the prize pool Enjoy 0 trading fees! \n' ,
          image: 'https://s3.coinmarketcap.com/static-gravity/thumbnail/large/58faf7dc4936487b825ab4026ee4d79a.jpeg'
        }
      },
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
        }
      },
      {
        profile_img: 'assets/images/community/user-2.png' , display_name: 'pSTAKEfinance' , user_name: '@pSTAKEfinance' , date: '2022-09-15T12:12:34Z' ,
        content: {
          text: 'We\'ve reached 20,000+ BNB staked on pSTAKE 🎉\n' +
            '\n' +
            '🔓 Unlock liquidity of BNB here:   Web link\n' +
            '\n' +
            '🗣 Spread the word:   Web link' ,
          image: 'assets/images/community/post-3.png'
        }
      },
      {
        profile_img: 'assets/images/community/user-3.png' , display_name: 'FlareToken' , user_name: '@FlareToken' , date: '2022-09-15T12:12:34Z' ,
        content: {
          text: 'Refer Our #NFTs To Friends For 5% Commission. Refer NFTs Now. 👉   Web link\n' +
            '\n' +
            'In Addition To NFT Purchase Commission, You Will Earn Commission Any Time Your Referrals:\n' +
            '\n' +
            '💸 Claim From The Faucet\n' +
            '🤝Become PipeFlare Supporters\n' +
            '🔐Stake Their 1FLR\n' +
            '🎉And MORE' ,
          image: 'assets/images/community/post-2.png'
        }
      }
    ]


  /*  this.api.GetCommunityFEED().subscribe( (res: any) => {
      this.posts = res;
    })*/


  }

  handleSelection(event) {
    console.log(event.char);
    this.CreatePostText += event.char;
  }

  uploadImage() {

  }

  post() {
    this.TempPost = {
      content: this.CreatePostText
    }
  }

  OnFileUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.TheImage = reader.result;

      reader.readAsDataURL(file);
    }

  }
}
