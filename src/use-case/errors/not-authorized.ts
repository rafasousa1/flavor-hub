export class NotAuthorized extends Error {
    constructor() {
        super('No authorized to do this!')
    }
}