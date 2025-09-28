export class UserAlreadyExist extends Error {
    constructor() {
        super('E-mail already exists!')
    }
}