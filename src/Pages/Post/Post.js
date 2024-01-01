import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ProfileContext } from "../../App";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "../../App.sass";
import { firebaseApp } from "../../firebaseConnect";
import { collection, getDocs } from "firebase/firestore";
import PostDataTable from "../../Components/PostDataTable/PostDataTable";

const { db } = firebaseApp;

const Posts = () => {
  const { userName } = useContext(ProfileContext);
  const [data, setData] = useState([]);
  // const usersData = [];

  useEffect(() => {
    // Function to fetch data
    const getUsersData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "AdminPost"));
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersData();
  }, []);
  console.log(data);

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="products_list_container">
            <div className="products_list_container_title">
              <h4
                className="p-2 mb-0"
                style={{
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  padding: "0 0.5rem",
                  color: "#20B2AA",
                }}
              >
                Products handled by Admin | {userName}
              </h4>
            </div>
            {/* <ListInTable
              rows={productListTableRows}
              columns={productListTableColumns}
              height={400}
            /> */}
            <div>
              <h2>Your Data:</h2>
              <ul>
                <PostDataTable tableRows={data} />
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const ProductListContainer = styled.div`
  /* Resetting MUI table color props */
  p,
  .css-rtrcn9-MuiTablePagination-root .MuiTablePagination-selectLabel,
  div.MuiTablePagination-actions > button button {
    color: inherit;
  }

  .MuiToolbar-root {
    color: inherit;
  }
  /* END */
`;

export default Posts;
