import { THEM_SINH_VIEN, XOA_SINH_VIEN, SUA_SINH_VIEN } from "./actionType";

const stateDefault = {
  mangSinhVien: [],
};

export const QuanLySinhVienReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case THEM_SINH_VIEN:
      return {
        ...state,
        mangSinhVien: [...state.mangSinhVien, action.sinhVien],
      };

    case XOA_SINH_VIEN:
      return {
        ...state,
        mangSinhVien: state.mangSinhVien.filter(
          (sinhVien) => sinhVien.maSV !== action.maSV
        ),
      };

    case SUA_SINH_VIEN:
      return {
        ...state,
        mangSinhVien: state.mangSinhVien.map((sinhVien) =>
          sinhVien.maSV === action.sinhVien.maSV ? action.sinhVien : sinhVien
        ),
      };

    default:
      return state;
  }
};
