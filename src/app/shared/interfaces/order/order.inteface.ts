import { IAnalyzesResponse, IArrivalToPlaceRequest } from "../analyzes-and-cost/analyzes-and-cost.interface";

export interface IOrderRequest {
    basket: Array<IAnalyzesResponse>;
    basketArrival: Array<IArrivalToPlaceRequest>;
    price: number;
    companyName: string;
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    dateArrival: string;
    timeArrival: string;
    addressArrival: string;
    optionPrice: number;
    status:string;
}

export interface IOrderResponse {
    id: number | string;
    basket: Array<IAnalyzesResponse>;
    basketArrival: Array<IArrivalToPlaceRequest>;
    price: number;
    companyName: string;
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    dateArrival: string;
    timeArrival: string;
    addressArrival: string;
    optionPrice: number;
    status:string;
}