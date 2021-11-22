export interface IAnalyzesRequest {
    analyzName: string
    testMethod: string;
    priceOption1: number;
    priceOption2: number;
    priceOption3: number;
    priceOption4: number;
    count: number
}

export interface IAnalyzesResponse {
    id: number;
    analyzName: string
    testMethod: string;
    priceOption1: number;
    priceOption2: number;
    priceOption3: number;
    priceOption4: number;
    count: number
}


export interface IArrivalToPlaceRequest{
    analyzName: string
    testMethod: string;
    priceOption1: number;
    priceOption2: number;
    priceOption3: number;
    priceOption4: number;
    kilometer: number
}