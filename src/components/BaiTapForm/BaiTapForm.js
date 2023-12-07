// BaiTapForm.js

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  xoaSinhVien,
  suaSinhVien,
  themSinhVien,
} from "../../redux/reducers/action";
import FormSinhVien from "./FormSinhVien";
import TableSinhVien from "./TableSinhVien";

class BaiTapForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStudent: null,
    };
  }

  handleDelete = (maSV) => {
    this.props.xoaSinhVien(maSV);
  };

  handleEdit = (sinhVien) => {
    this.setState({
      selectedStudent: sinhVien,
    });
  };

  handleUpdate = (updatedStudent) => {
    this.props.suaSinhVien(updatedStudent);
    this.setState({
      selectedStudent: null,
    });
  };

  handleAdd = (newStudent) => {
    this.props.themSinhVien(newStudent);
  };

  render() {
    return (
      <div className="mt-3 max-w-7xl mx-auto">
        <h3 className="px-2 py-3 font-bold text-2xl bg-gray-800 text-gray-50 rounded-sm">
          Thông tin sinh viên
        </h3>
        <FormSinhVien
          selectedStudent={this.state.selectedStudent}
          onUpdate={this.handleUpdate}
          onAdd={this.handleAdd}
        />
        <TableSinhVien
          mangSinhVien={this.props.mangSinhVien}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
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
    themSinhVien: (sinhVien) => dispatch(themSinhVien(sinhVien)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaiTapForm);
