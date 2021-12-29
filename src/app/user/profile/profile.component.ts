import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Observable, filter, tap, startWith, map } from 'rxjs'
import { Role } from 'src/app/auth/auth.enum'
import { AuthService } from 'src/app/auth/auth.service'
import { UiService } from 'src/app/common/ui.service'
import {
  OneCharValidation,
  OptionalTextValidation,
  RequiredTextValidation,
  USAPhoneNumberValidation,
  USAZipCodeValidation,
} from 'src/app/common/validations'
import { EmailValidation } from 'src/app/common/validators'
import { ErrorSets } from 'src/app/user-controls/field-error/field-error-directive'
import { SubSink } from 'subsink'
import { $enum } from 'ts-enum-util'

import { IPhone, IUser, PhoneType } from '../user'
import { UserService } from '../user.service'
import { IUSState, USStateFilter } from './data'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  Role = Role
  PhoneType = PhoneType
  PhoneTypes = $enum(PhoneType).getKeys()
  formGroup!: FormGroup
  states$!: Observable<IUSState[]>
  userError = ''
  currentUserId!: string
  ErrorSets = ErrorSets
  now = new Date()
  subs = new SubSink()

  constructor(
    private formBuilder: FormBuilder,
    private uiService: UiService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm()

    if (this.route.snapshot.data['user']) {
      let user = this.route.snapshot.data['user']
      this.currentUserId = user._id
      this.formGroup.patchValue(user, { onlySelf: false })
    } else {
      this.authService.currentUser$
        .pipe(
          filter((user) => user !== null),
          tap((user) => {
            ;(this.currentUserId = user._id), this.buildForm(user)
          })
        )
        .subscribe()
    }
  }

  get dateOfBirth() {
    return new Date(this.formGroup.get('dateOfBirth')?.value) || this.now
  }

  get age() {
    return this.now.getFullYear() - this.dateOfBirth.getFullYear()
  }

  minDate = new Date(
    this.now.getFullYear() - 100,
    this.now.getMonth(),
    this.now.getDate()
  )

  private get currentUserRole() {
    return this.authService.authStatus$.value.userRole
  }

  buildForm(user?: IUser) {
    this.formGroup = this.formBuilder.group({
      email: [
        { value: user?.email || '', disabled: this.currentUserRole !== Role.Manager },
        EmailValidation,
      ],
      name: this.formBuilder.group({
        first: [user?.name?.first || '', RequiredTextValidation],
        middle: [user?.name?.middle || '', OneCharValidation],
        last: [user?.name?.last || '', RequiredTextValidation],
      }),
      level: [user?.level || 0, Validators.required],
      role: [
        { value: user?.role || '', disabled: this.currentUserRole !== Role.Manager },
        [Validators.required],
      ],
      dateOfBirth: [user?.dateOfBirth || '', Validators.required],
      address: this.formBuilder.group({
        line1: [user?.address?.line1 || '', RequiredTextValidation],
        line2: [user?.address?.line2 || '', OptionalTextValidation],
        city: [user?.address?.city || '', RequiredTextValidation],
        state: [user?.address?.state || '', RequiredTextValidation],
        zip: [user?.address?.zip || '', USAZipCodeValidation],
      }),
      phones: this.formBuilder.array(this.buildPhoneArray(user?.phones || [])),
    })

    const state = this.formGroup.get('address.state')
    if (state != null) {
      this.states$ = state.valueChanges.pipe(
        startWith(''),
        map((value) => USStateFilter(value))
      )
    }
  }

  get phonesArray(): FormArray {
    return this.formGroup.get('phones') as FormArray
  }

  addPhone() {
    this.phonesArray.push(
      this.buildPhoneFormControl(this.formGroup.get('phones')?.value.length + 1)
    )
  }

  private buildPhoneArray(phones: IPhone[]) {
    const groups = []
    if (phones?.length === 0) {
      groups.push(this.buildPhoneFormControl(1))
    } else {
      phones.forEach((p) => {
        groups.push(this.buildPhoneFormControl(phones.indexOf(p), p.type, p.digits))
      })
    }
    return groups
  }

  private buildPhoneFormControl(id: number, type?: string, phoneNumber?: string) {
    return this.formBuilder.group({
      id: [id],
      type: [type || '', Validators.required],
      digits: [phoneNumber || '', USAPhoneNumberValidation],
    })
  }

  convertTypeToPhoneType(type: string): PhoneType {
    return PhoneType[$enum(PhoneType).asKeyOrThrow(type)]
  }

  async save(form: FormGroup) {
    this.subs.add(
      this.userService.updateUser(this.currentUserId, form.value).subscribe({
        next: (res: IUser) => {
          this.formGroup.patchValue(res)
          this.uiService.showToast('Updated User')
        },
        error: (err) => (this.userError = err.message),
      })
    )
  }
}
