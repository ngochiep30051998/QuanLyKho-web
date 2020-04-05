export interface IProduct {
    Ma: string;
    Ten: string;
    DonGia: number;
    NhomVatTu: string;
    NhaCungCap: string;
    DonViTinh: string;
    SoLuong: number;
}

export interface IDiglogProduct {
    type: string;
    data: IProduct;
}
