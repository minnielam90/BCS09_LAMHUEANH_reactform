//action.js

import { THEM_SINH_VIEN, XOA_SINH_VIEN, SUA_SINH_VIEN } from "./actionType";

export const themSinhVien = (sinhVien) => {
  return {
    type: THEM_SINH_VIEN,
    sinhVien,
  };
};

export const xoaSinhVien = (maSV) => {
  return {
    type: XOA_SINH_VIEN,
    maSV,
  };
};

export const suaSinhVien = (sinhVien) => {
  return {
    type: SUA_SINH_VIEN,
    sinhVien,
  };
};
