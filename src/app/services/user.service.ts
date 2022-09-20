import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserList(){



     return [
      {
        "uuid": 1,

        "name": "Jimmy",

        "position": "Frontend"
      },
      {
        "uuid": 2,

        "name": "Jim",

        "position": "Backend"

      }
     ]


  }

}
