export interface IProduct {
    Id: number;
    Ma: string;
    Ten: string;
    DonGia: number;
    DonGiaNhap: number;
    IdNhomVatTu: number;
    TenNhomVatTu: string;
    IdNhaCungCap: number;
    TenNhaCungCap: string;
    DiaChi: string;
    SDT: string;
    SoLuong: number;
    CreatedAt?: Date;
    UpdatedAt?: Date;
    GhiChu?: string;
}

export interface IDiglogData {
    type: string;
    data: any;
    extendData?: any;
}

export interface IGroupProduct {
    Id: number;
    Ma: String;
    Ten: String;
    CreatedAt?: string;
    UpdatedAt?: string;
}
