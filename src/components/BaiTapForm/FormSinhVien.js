import React, { Component } from "react";
import { connect } from "react-redux";
import { themSinhVien, suaSinhVien } from "../../redux/reducers/action";

class FormSinhVien extends Component {
  state = {
    values: {
      maSV: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
    },
    errors: {
      maSV: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
      general: "",
    },
    isEditing: false,
  };

  componentDidUpdate(prevProps) {
    // Check if the selectedStudent prop has changed
    if (prevProps.selectedStudent !== this.props.selectedStudent) {
      // Update the form values when a student is selected for editing
      const selectedStudent = this.props.selectedStudent;
      this.setState({
        values: {
          maSV: selectedStudent ? selectedStudent.maSV : "",
          hoTen: selectedStudent ? selectedStudent.hoTen : "",
          email: selectedStudent ? selectedStudent.email : "",
          soDienThoai: selectedStudent ? selectedStudent.soDienThoai : "",
        },
        errors: {
          maSV: "",
          hoTen: "",
          email: "",
          soDienThoai: "",
          general: "",
        },
        isEditing: selectedStudent ? true : false,
      });
    }
  }

  handleChange = (e) => {
    // lấy giá trị mỗi lần value input thay đổi bởi người dùng
    let tagInput = e.target;
    let { name, value, type } = tagInput;

    let errorMessage = "";

    if (value.trim() === "") {
      //kiểm tra bất kì control input nào người dùng nhập
      errorMessage = "Vui lòng không bỏ trống !";
    } else if (name === "soDienThoai") {
      const pattern = /^(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

      if (!pattern.test(value)) {
        errorMessage = "Vui lòng nhập đúng định dạng!";
      }
    } else if (type === "email") {
      const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!emailPattern.test(value)) {
        errorMessage = "Vui lòng nhập đúng định dạng!";
      }
    }

    let values = { ...this.state.values, [name]: value }; //cập nhật giá trị values cho state
    let errors = { ...this.state.errors, [name]: errorMessage }; //cập nhật lỗi cho state

    // Check for empty values and update the general error message
    console.log("Values:", values);

    const emptyFields =
      values &&
      typeof values === "object" &&
      values !== null &&
      Object.values(values).some((val) => {
        console.log("Val:", val);
        return val !== undefined && String(val).trim() === "";
      });

    errors["general"] = emptyFields ? "Vui lòng không bỏ trống!" : "";

    this.setState(
      {
        values: values,
        errors: errors,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.isEditing) {
      // Check for duplicate maSV
      const isDuplicate = this.props.mangSinhVien.some(
        (sv) => sv.maSV === this.state.values.maSV
      );

      if (isDuplicate) {
        const updatedErrors = {
          ...this.state.errors,
          maSV: "Mã sinh viên đã được sử dụng",
        };
        this.setState({ errors: updatedErrors });
        return;
      }
    }

    // Check for errors in the state
    const errors = this.state.errors;
    const hasErrors = Object.values(errors).some((error) => error !== "");

    // Check for empty values
    const values = this.state.values;
    const isEmpty = Object.values(values).some((value) => value.trim() === "");

    if (isEmpty || hasErrors) {
      const updatedErrors = {};
      for (const key in values) {
        updatedErrors[key] =
          values[key].trim() === "" ? "Vui lòng không bỏ trống!" : errors[key];
      }

      this.setState({ errors: updatedErrors }, () => {});

      return;
    }

    // If no errors, dispatch the action to add student
    this.props.themSinhVien(this.state.values);

    // Clear the form values
    this.setState({
      values: {
        maSV: "",
        hoTen: "",
        email: "",
        soDienThoai: "",
      },
      errors: {
        maSV: "",
        hoTen: "",
        email: "",
        soDienThoai: "",
      },
    });
  };

  handleUpdate = () => {
    // Check for errors in the state
    const errors = this.state.errors;
    const hasErrors = Object.values(errors).some((error) => error !== "");

    // Check for empty values
    const values = this.state.values;
    const isEmpty = Object.values(values).some((value) => value.trim() === "");

    if (isEmpty || hasErrors) {
      const updatedErrors = {};
      for (const key in values) {
        updatedErrors[key] =
          values[key].trim() === "" ? "Vui lòng không bỏ trống!" : errors[key];
      }

      this.setState({ errors: updatedErrors }, () => {});
      return;
    }

    // If no errors, dispatch the action to update student
    this.props.suaSinhVien(this.state.values);

    // Clear the form values and set isEditing to false
    this.setState({
      values: {
        maSV: "",
        hoTen: "",
        email: "",
        soDienThoai: "",
      },
      errors: {
        maSV: "",
        hoTen: "",
        email: "",
        soDienThoai: "",
      },
      isEditing: false,
    });
  };

  renderSinhVien = () => {
    const { mangSinhVien } = this.props;
    const { searchTerm } = this.state;

    // Filter students based on the search term
    const filteredStudents = mangSinhVien.filter((sinhVien) =>
      sinhVien.hoTen.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Render the filtered students
    return filteredStudents.map((sinhVien) => (
      <tr key={sinhVien.maSV}>
        <td>{sinhVien.maSV}</td>
        <td>{sinhVien.hoTen}</td>
        <td>{sinhVien.soDienThoai}</td>
        <td>{sinhVien.email}</td>
      </tr>
    ));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="max-w-7xl mx-auto py-10">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="maSV"
              >
                Mã sinh viên
              </label>
              <input
                // Add disabled attribute when editing
                disabled={this.state.isEditing}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="maSV"
                name="maSV"
                type="text"
                value={this.state.values.maSV}
                onChange={this.handleChange}
                placeholder="Vui lòng nhập mã sinh viên"
              />
              <p className="text-red-500 text-xs italic">
                {this.state.duplicateError || this.state.errors.maSV}
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="hoTen"
              >
                Họ tên
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="hoTen"
                name="hoTen"
                type="text"
                value={this.state.values.hoTen}
                onChange={this.handleChange}
                placeholder="Vui lòng nhập họ tên"
              />
              <p className="text-red-500 text-xs italic">
                {this.state.errors.hoTen}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="soDienThoai"
              >
                Số điện thoại
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="soDienThoai"
                name="soDienThoai"
                type="text"
                value={this.state.values.soDienThoai}
                onChange={this.handleChange}
                placeholder="Vui lòng nhập số điện thoại"
              />
              <p className="text-red-500 text-xs italic">
                {this.state.errors.soDienThoai}
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                name="email"
                type="email"
                value={this.state.values.email}
                onChange={this.handleChange}
                placeholder="Vui lòng nhập email"
              />
              <p className="text-red-500 text-xs italic">
                {this.state.errors.email}
              </p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`bg-green-600 text-white py-2 px-4 rounded-md ${
                this.state.isEditing ? "cursor-not-allowed" : ""
              } ${this.state.isEditing ? "bg-green-400" : ""}`}
              disabled={this.state.isEditing}
            >
              Thêm sinh viên
            </button>
            <button
              onClick={this.handleUpdate}
              type="button"
              className={`py-2 px-5 rounded-md ${
                this.state.isEditing
                  ? "bg-yellow-500 text-black"
                  : "bg-yellow-300 text-gray-500 cursor-not-allowed"
              } ml-4`}
              disabled={!this.state.isEditing}
            >
              Cập nhật sinh viên
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mangSinhVien: state.QuanLySinhVienReducer.mangSinhVien,
    // other props...
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    themSinhVien: (sinhVien) => {
      const action = themSinhVien(sinhVien);
      dispatch(action);
    },
    suaSinhVien: (sinhVien) => {
      const action = suaSinhVien(sinhVien);
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormSinhVien);
