import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {ItemPayload} from '../../dto/responses/item-payload';
import {ItemService} from '../../services/item.service';

@Component({
  selector: 'item-modal-content',
  templateUrl: './item-modal-content.html'
})
export class ItemModalContent {

  itemPayload: ItemPayload;
  saveItemForm: FormGroup;
  item = new FormControl('');
  price = new FormControl('');

  constructor(public activeModal: NgbActiveModal, private router: Router, private itemService: ItemService)
  {
    this.saveItemForm = new FormGroup({
      item: this.item,
      price: this.price
    });

    this.itemPayload = {
      id: null,
      item: '',
      price: null,
      active:null,
      image_url:null
    }
  }

  // loadData(tweetid:number)
  // {
  //   this.tweetService.getTweet(tweetid).subscribe( (data:SingleTweet) =>{
  //     this.tweetPayload.tweet_id = data.data.tweet_id;
  //     this.addTweetForm.controls.tweet.setValue(data.data.tweet_message);
  //   },(error:any)=>{
  //     alert(error);
  //   });
  // }

  update()
  {
    // this.tweetPayload.tweet_message = this.addTweetForm.get('tweet').value;
    // this.tweetService.updateTweet(this.tweetPayload).subscribe( data=>{
    //   window.location.reload();
    // },error =>{
    //   alert(error);
    // });
  }

  save(){
    if(this.itemPayload.id > 0){
      this.update();
      return;
    }
    this.itemPayload.item = this.saveItemForm.get('item').value;
    this.itemPayload.price = (this.saveItemForm.get('price').value * 100);
    this.itemService.newItem(this.itemPayload).subscribe( data=>{
      window.location.reload();
    }, error => {
      alert(error);
    });
  }

}

@Component({
  selector: 'item-modal',
  templateUrl: './item-modal-component.html'
})
export class ItemModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(ItemModalContent);
  }


}
