import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { IUser, User } from '../user'

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnChanges {
  @Input() user!: IUser
  readonly currentUser$ = new BehaviorSubject(new User())

  get editMode() {
    return !this.user
  }

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.currentUser$.next(User.Build(changes['user'].currentValue))
  }

  editUser(id: string) {
    this.router.navigate(['/user/profile', id])
  }
}
