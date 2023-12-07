import React, { Component } from "react";
import { connect } from "react-redux";
import { xoaSinhVien, suaSinhVien } from "../../redux/reducers/action";

class TableSinhVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStudent: null,
      searchTerm: "",
    };
  }

  handleDelete = (maSV) => {
    this.props.xoaSinhVien(maSV);
  };

  handleEdit = (sinhVien) => {
    this.setState({
      selectedStudent: sinhVien,
      isEditing: true,
    });
  };

  handleSearch = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  renderSinhVien = () => {
    const { mangSinhVien } = this.props;
    const { searchTerm } = this.state;

    // Filter students based on the search term
    const filteredStudents = mangSinhVien.filter((sinhVien) =>
      sinhVien.hoTen.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredStudents.map((sinhVien, index) => {
      return (
        <tr key={index}>
          <td className="px-2 py-3 font-bold">{sinhVien.maSV}</td>
          <td className="px-2 py-3">{sinhVien.hoTen}</td>
          <td className="px-2 py-3">{sinhVien.soDienThoai}</td>
          <td className="px-2 py-3">{sinhVien.email}</td>
          <td className="px-2 py-3 space-x-3">
            <button
              onClick={() => {
                this.props.onEdit(sinhVien);
              }}
            >
              <ion-icon
                color="warning"
                size="large"
                name="create-outline"
              ></ion-icon>
            </button>
            <button
              onClick={() => {
                this.handleDelete(sinhVien.maSV);
              }}
            >
              <ion-icon
                color="danger"
                size="large"
                name="trash-outline"
              ></ion-icon>
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { selectedStudent } = this.state;
    return (
      <div>
        {/* Add a search input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tìm kiếm sinh viên theo họ tên:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập tên sinh viên..."
            value={this.state.searchTerm}
            onChange={this.handleSearch}
          />
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-50 uppercase bg-gray-800 rounded-sm">
              <tr>
                <th scope="col" className="px-2 py-3">
                  Mã SV
                </th>
                <th scope="col" className="px-2 py-3">
                  Họ tên
                </th>
                <th scope="col" className="px-2 py-3">
                  Số điện thoại
                </th>
                <th scope="col" className="px-2 py-3">
                  Email
                </th>
                <th scope="col" className="px-2 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>{this.renderSinhVien()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mangSinhVien: state.QuanLySinhVienReducer.mangSinhVien,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    xoaSinhVien: (maSV) => dispatch(xoaSinhVien(maSV)),
    suaSinhVien: (sinhVien) => dispatch(suaSinhVien(sinhVien)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSinhVien);
