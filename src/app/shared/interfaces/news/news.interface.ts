export interface INewsRequest {
    newsName: string
    imagePath: string;
    description: string;
}

export interface INewsResponse {
    id: number;
    newsName: string
    imagePath: string;
    description: string;
}