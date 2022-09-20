import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  validateForm!: FormGroup;
  public isAdd: boolean = true;

  public userInfo: any = []

  public uuid: number = 0;
  constructor(
    private fb: FormBuilder,
    public UserService:UserService,
    private route: ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('users') || '[]')
    this.route.paramMap.subscribe((params: ParamMap)=>{

      this.uuid = parseInt(params.get('uuid') || '0')
      console.log(this.uuid)
    })
    if(this.uuid) {

      this.isAdd = false

    }
    if(this.isAdd) {
      console.log(17421752)
      this.validateForm = this.fb.group({

        username: [null, [Validators.required]],

        position: [null, [Validators.required]]

      });

    } else {

      let current = (this.userInfo.filter((item: any) => item.uuid === this.uuid))[0] || {}
      console.log(this.userInfo)
      // 信息回填

      this.validateForm = this.fb.group({

        username: [current.name, [Validators.required]],

        position: [current.position, [Validators.required]]

      })

    }
  }
  submitForm(){
    console.log(5454)
    if(!this.validateForm.valid) {

      Object.values(this.validateForm.controls).forEach((control: any) => {

        if(control?.invalid) {

          control?.markAsDirty();

          control?.updateValueAndValidity({ onlySelf: true });

        }

      })

      return

    }
    const data = this.validateForm.value
        // 新增用户

        if(this.isAdd) {



          let lastOne = (this.userInfo.length > 0 ? this.userInfo[this.userInfo.length-1] : {});

          this.userInfo.push({

            uuid: (lastOne.uuid ? (lastOne.uuid + 1) : 1),

            name: data.username,

            position: data.position

          })

          localStorage.setItem('users', JSON.stringify(this.userInfo))

        } else { // 编辑用户，更新信息

          let mapList = this.userInfo.map((item: any) => {

            if(item.uuid === this.uuid) {

              return {

                uuid: this.uuid,

                name: data.username,

                position: data.position

              }

            }

            return item

          })

          localStorage.setItem('users', JSON.stringify(mapList))

        }
        this.router.navigateByUrl('/user')

  }
}
