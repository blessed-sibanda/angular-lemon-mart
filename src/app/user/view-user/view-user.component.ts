import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { IUser, User } from '../user'

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnChanges, OnInit {
  @Input() user!: IUser
  readonly currentUser$ = new BehaviorSubject(new User())

  get editMode() {
    return !this.user
  }

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    if (this.route.snapshot.data['user']) {
      this.currentUser$.next(this.route.snapshot.data['user'])
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentUser$.next(User.Build(changes['user'].currentValue))
  }

  editUser(id: string) {
    this.router.navigate(['/user/profile', id])
  }
}
