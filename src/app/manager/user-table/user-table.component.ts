import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort, SortDirection } from '@angular/material/sort'
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  map,
  merge,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs'
import { OptionalTextValidation } from 'src/app/common/validations'
import { IUser } from 'src/app/user/user'
import { IUsers, UserService } from 'src/app/user/user.service'
import { SubSink } from 'subsink'

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnDestroy, AfterViewInit {
  displayedColumns = ['name', 'email', 'role', '_id']
  items$!: Observable<IUser[]>
  resultsLength = 0
  hasError = false
  errorText = ''
  private skipLoading = false
  private subs = new SubSink()
  readonly isLoadingResult$ = new BehaviorSubject(true)
  loading$!: Observable<boolean>
  refresh$ = new Subject()
  search = new FormControl('', OptionalTextValidation)

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator

  @ViewChild(MatSort, { static: false })
  sort!: MatSort

  constructor(private userService: UserService) {
    this.loading$ = this.isLoadingResult$
  }

  getUsers(
    pageSize: number,
    searchText: string,
    pagesToSkip: number,
    sortColumn: string,
    sortDirection: SortDirection
  ): Observable<IUsers> {
    return this.userService.getUsers(
      pageSize,
      searchText,
      pagesToSkip,
      sortColumn,
      sortDirection
    )
  }

  ngAfterViewInit(): void {
    this.subs.sink = this.sort.sortChange.subscribe(() => this.paginator.firstPage())
    if (this.skipLoading) return
    this.items$ = merge(
      this.refresh$,
      this.sort.sortChange,
      this.paginator.page,
      this.search.valueChanges.pipe(debounceTime(1000))
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResult$.next(true)
        return this.getUsers(
          this.paginator.pageSize,
          this.search.value,
          this.paginator.pageIndex,
          this.sort.active,
          this.sort.direction
        )
      }),
      map((results: IUsers) => {
        this.isLoadingResult$.next(false)
        this.hasError = false
        this.resultsLength = results.total
        return results.data
      }),
      catchError((err) => {
        this.isLoadingResult$.next(false)
        this.hasError = true
        this.errorText = err.message
        return of([])
      })
    )
    this.items$.subscribe()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
