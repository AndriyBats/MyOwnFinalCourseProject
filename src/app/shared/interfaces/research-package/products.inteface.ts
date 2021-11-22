import { IAnalyzesResponse } from "../analyzes-and-cost/analyzes-and-cost.interface";

export interface IPackageRequest {
    researchPackageName: string;
    imagePath: string;
    mainIndicators: string;
    numberOfTickets: number;
    indicators: Array<IAnalyzesResponse>;
    price: number,
}

export interface IPackageResponse {
    id: number;
    researchPackageName: string;
    imagePath: string;
    mainIndicators: string;
    numberOfTickets: number;
    indicators: Array<IAnalyzesResponse>;
    price: number,
    tickets?: Array<any>
}