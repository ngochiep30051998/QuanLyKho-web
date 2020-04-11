export interface IProduct {
    Ma: string;
    Ten: string;
    DonGia: number;
    NhomVatTu: string;
    NhaCungCap: string;
    DonViTinh: string;
    SoLuong: number;
    CreatedAt?: Date;
    UpdatedAt?: Date;
}

export interface IDiglogData {
    type: string;
    data: any;
}

export interface IGroupProduct {
    Id: number;
    Ma: String;
    Ten: String;
    CreatedAt?: string;
    UpdatedAt?: string;
}
