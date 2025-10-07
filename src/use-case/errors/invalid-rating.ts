export class InvalidRating extends Error {
    constructor() {
        super('Error, Rating must be beetween 1 and 5')
    }
}