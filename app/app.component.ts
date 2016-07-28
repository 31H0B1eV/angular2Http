import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { UserService } from "./User.service";
import { User } from "./User";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'my-app',
    template: `
        <div [hidden]="!isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
        <div [hidden]="isLoading">
            <div class="media">
              <div class="media-left">
                <a href="{{ user.html_url }}" target="__blank">
                  <img class="media-object avatar" src="{{ user.avatar_url }}" alt="...">
                </a>
              </div>
              <div class="media-body">
                <h4 class="media-heading">@{{ user.login }}</h4>
                <p>{{ user.name }}</p>
              </div>
            </div>
            <h3>Followers</h3>
            <div class="media" *ngFor="let user of followers">
              <div class="media-left">
                <a href="#" target="__blank">
                  <img class="media-object avatar" src="{{ user.avatar_url }}" alt="...">
                </a>
              </div>
              <div class="media-body">
                <p>@{{ user.login }}</p>
              </div>
            </div>
        </div>
    `,
    styles: [`
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 100%;
        }
    `],
    providers: [UserService, HTTP_PROVIDERS]
})
export class AppComponent implements OnInit {
    isLoading = true;
    username = 'octocat';
    user = {};
    followers: User[];

    constructor(private _userService: UserService) {}

    ngOnInit() {
        Observable.forkJoin(
            this._userService.getUser(this.username), 
            this._userService.getFollowers(this.username)
        )
        .subscribe(
            res => {
                this.user = res[0];
                this.followers = res[1];
            }, 
            null, 
            () => { this.isLoading = false; })
    }
}
