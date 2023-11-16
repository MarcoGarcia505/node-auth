export class PaginationDto {
    constructor(
        public readonly page: number,
        public readonly limit: number
    ){}

    static create(page: number = 1, limit: number = 10): [string?, PaginationDto?] {

        if(isNaN(limit) || isNaN(page)) return ["the params must be number"]
        if (page <= 0 ) return ["don't accepted numbers less than 1"]
        if (limit <= 0 ) return ["don't accepted numbers less than 1"]

        return [undefined, new PaginationDto(page, limit)]
    }
}