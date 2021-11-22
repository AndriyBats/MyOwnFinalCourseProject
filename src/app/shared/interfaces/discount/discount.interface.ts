export interface IDiscountRequest {
    discountName: string
    imagePath: string;
    valueDiscount: number;
    description: string;
    price: number,
    validityPeriod: string  
}

export interface IDiscountResponse {
    id: number;
    discountName: string
    imagePath: string;
    valueDiscount: number;
    description: string;
    price: number,
    validityPeriod: string  
}