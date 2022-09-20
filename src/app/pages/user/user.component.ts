import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  list:any=[]
  constructor(
    public UserService:UserService,
    private modal: NzModalService,
    public router:Router
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('users')) {

      let obj = localStorage.getItem('users') || '{}'

      this.list =  JSON.parse(obj)

    } else {

     this.list=this.UserService.getUserList()

    }

  }
// 删除

delete(data: any) {

  this.modal.confirm({

    nzTitle: '<i>你想删除该用户?</i>',

    nzOnOk: () => {

      let users = JSON.parse(localStorage.getItem('users') || '[]');

      let filterList = users.filter((item: any) => item.uuid !== data.uuid);

      localStorage.setItem('users', JSON.stringify(filterList));

      this.list = filterList

    }

  });



}
goInfo(){
   this.router.navigateByUrl('/user/add')
}
edit(data:any){
  this.router.navigateByUrl('/user/edit/'+data.uuid)
}
}
