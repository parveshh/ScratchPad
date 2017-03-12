import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from "@angular/forms";
import { RegisterModel } from "../models/resgitermodel";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserService } from "../services/UserService";
import { matchingPasswords } from "./validation";
import { BaseComponent } from "../sharedcomponents/BaseComponent";

@Component({
    templateUrl: './register.html',
    selector: 'register'

})

export class RegisterComponent extends BaseComponent {

    public model: RegisterModel;
    public formGroup: FormGroup;
    private _formBuilder: FormBuilder;
    public isDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _userService: UserService;
    public messagesAsync: Subject<string> = new Subject<string>();
    public registerSuccessful: boolean = false;
    public showError: boolean = true;

    constructor(formBuilder: FormBuilder, userService: UserService) {
        super();
        this._formBuilder = formBuilder;
        this.model = new RegisterModel();
        this.createFormModel();
        this._userService = userService;
        this._formBuilder;
        this.formGroup;

    }

    public createFormModel() {
        try {
            this.formGroup = this._formBuilder.group({
                email: [this.model.email, [Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
                username: [this.model.username, [Validators.required, Validators.minLength(6)]],
                password: [this.model.password, [Validators.required, Validators.minLength(6)]],
                confirmPassword: [this.model.confirmPassword, [Validators.required, Validators.minLength(6)]],
                displayName: [this.model.display, [Validators.required, Validators.minLength(6)],
                { validator: matchingPasswords('password', 'confirmPassword') }]
            });
        }
        catch (error) {
            console.log(error);
        }

        this.subscriptions.push(this.formGroup.valueChanges.subscribe(this.onValuesChanged));


    }

    public onValuesChanged = (data?: any) => {

        for (const controlName in this.formErrors) {
            this.formErrors[controlName] = '';
            var control: AbstractControl = this.formGroup.get(controlName);
            if (!control.pristine) {
                if (control.errors) {
                    console.log(control.errors);
                    const messages = this.validationMessages[controlName];
                    for (const key in control.errors) {
                        this.formErrors[controlName] += messages[key] + ' ';
                    }

                }
            }
        }
    }
    public validationMessages = {
        'username': {
            'required': 'username cannot be empty',
            'minlength': 'username must be atleast 6 characters long'
        },
        'email': {
            'required': 'email cannot be empty',
            'pattern': 'not a valid email address'
        },
        'password': {
            'required': 'password cannot be empty',
            'minlength': 'password must be atleast 6 characters long'
        },
        'confirmPassword': {
            'required': 'field cannot be empty',
            'minlength': 'field must be atleast 6 characters long'
        },
        'displayName': {
            'required': 'field cannot be empty',
            'minlength': 'field must be atleast 6 characters long'
        }


    };
    public formErrors = {
        'username': '',
        'email': '',
        'password': '',
        'confirmPassword': '',
        'displayName': ''
    };
    onRegister(event: Event): void {

        if (this.formGroup.valid) {
            this.isDisabled.next(true);
            this.model = this.formGroup.value;
            var result = this._userService.createUser(this.model)
                .then((_) => {
                    if (_) {
                        this._userService.RegisterUser(_.uid, this.model)
                    }
                },
                (error) => {

                    throw error; // chain catch
                })
                .then((res) => {
                    this.registerSuccessful = true;
                }, (error) => {

                    this.isDisabled.next(false);
                    this.messagesAsync.next(error.message);

                });
        }
    }
}