export class RegisterModel {

    public username: string;
    public password: string;
    public confirmPassword: string;
    public display: string;
    public email: string;
    public userId: string;

    public static getNew(): RegisterModel {
        var user = {
            confirmPassword: '',
            password: '',
            userId: '',
            display: '',
            email: '',
            username: ''
        }
        return user;
    }
}