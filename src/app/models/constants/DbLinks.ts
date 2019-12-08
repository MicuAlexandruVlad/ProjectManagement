export class DbLinks {
    private baseLink = 'http://192.168.0.19:3000/'
    registerUser = this.baseLink + 'users/register-user/'
    authUser = this.baseLink + 'users/auth-user/'
    updateUser = this.baseLink + 'users/update-user/'
}