import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ListInTable from "../../Reusable Components/DataTable";
import { userListTableColumns } from "./AddUsersData";
import "../../Reusable Styling/AddItem.sass";

const AddUsers = () => {
  const [file, setFile] = useState("");
  const [userRows, setUserRows] = useState([]);
  const UUID = uuidv4();

  function handleSubmit(e) {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const newRow = {
        id: uuidv4(),
        userImg: reader.result,
      };
      setUserRows([...userRows, newRow]);

      setFile("");
    };
  }

  const handleDelete = (id) => {
    setUserRows(userRows.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom_header",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cell_action_div">
            <Link
              to="/users"
              style={{ textDecoration: "none", color: "unset" }}
              className="view_btn"
            >
              View
            </Link>
            <div
              className="delete_btn"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    document.title = "New Users | Admin Dashboard";
  }, []);

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="add_item_title_div">
            <h6>Add users</h6>
          </div>
          <div className="add_item_container">
            <div className="add_user_item_div_wrapper">
              <div className="add_user_item_div">
                <div className="add_user_div_left">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : require("../../Img/no_img.png")
                    }
                    alt="Upload"
                  />
                </div>
                <div className="form_div">
                  <form onSubmit={handleSubmit}>
                    <div className="file_upload_div">
                      <label
                        htmlFor="file"
                        className="d-flex align-items-center"
                        style={{ color: "#20B2AA" }}
                      >
                        Upload Image:{" "}
                        <DriveFolderUploadOutlinedIcon className="icon mx-1" />
                      </label>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                    <button type="submit">Save</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="item_list_div">
              {userRows.length > 0 && (
                <>
                  <h6 className="px-2 mb-0 mt-2">List of users</h6>
                  <ListInTable
                    key={UUID}
                    rows={userRows}
                    columns={userListTableColumns.concat(actionColumn)}
                    height={400}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddUsers;
