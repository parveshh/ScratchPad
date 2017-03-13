import { AngularfireMock } from "./mock/angulafire2.mock";
import { UserService } from "../app/services/UserService";
import { async, TestBed, inject, } from "@angular/core/testing";
import { AngularFire, AngularFireModule } from "angularfire2";
import { RegisterModel } from "../app/models/resgitermodel";

describe("Userservice", () => {

    let userService: UserService;
    let user: RegisterModel = {
        confirmPassword: '', display: '', email: 'test@test.com',
        password: '', userId: '', username: ''
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AngularFireModule],
            providers: [{ provide: AngularFire, useClass: AngularfireMock }, UserService]
        });

    });
    beforeEach(inject([UserService], (userservice: UserService) => {
        userService = userservice;
    }));

    it("Userservice should be defined", () => {
        expect(userService).toBeTruthy();
    });

    it("should return a userid", async(() => {
        userService.createUser(user).then((state) => {
            expect(state.uid).toBeDefined();
        })
    }));

    it("should return  correct userid", async(() => {
        userService.createUser(user).then((state) => {
            expect(state.uid).toEqual('xvbctyhsfdgtlsgdhd');
        })
    }));

});