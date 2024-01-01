import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "../../Reusable Styling/AddItem.sass";
import { addDoc, collection } from "firebase/firestore";
import { firebaseApp } from "../../firebaseConnect";
// import storage from "../../firebaseConnect";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const { db, storage } = firebaseApp;

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const handleClick = () => {
    if (image === null) return;
    const fileRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(fileRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log("error :(");
      },
      () => {
        console.log("success!!");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };
  // const [productRows, setProductRows] = useState([]);
  const UUID = uuidv4();
  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthAbbreviation = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const formattedDate = `${day} ${monthAbbreviation} ${year}`;

  async function handleSubmit(e) {
    e.preventDefault();
    handleClick();
    // Check if all fields are filled in
    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    // Get a reference to a Firestore collection
    const usersCollection = collection(db, "AdminPost");

    // Data to be added to the collection
    const newPost = {
      title: title,
      description: description,
      image: url,
      data: formattedDate,
      id: UUID,
      status: "true",
      // Other user data
    };

    // Add a new document to the 'users' collection
    await addDoc(usersCollection, newPost)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    // Create new product object with truncated fields if necessary
    // Add new product to productRows and reset form fields
    // setProductRows([...productRows, newProduct]);

    setTitle("");
    setDescription("");
    setImage("");
  }

  useEffect(() => {
    document.title = "New Products | Admin Dashboard";
  }, []);

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="add_item_title_div">
            <h6>Add post</h6>
          </div>
          <div className="add_item_container">
            <div className="add_user_item_div_wrapper">
              <div className="add_user_item_div">
                <div className="form_div">
                  <form onSubmit={handleSubmit}>
                    <div
                      className="file_upload_div"
                      style={{ margin: "20px 0" }}
                    >
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
                        style={{ display: "none", cursor: "pointer" }}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form_input_div">
                      <div className="form_input">
                        <label>Title</label>
                        <input
                          type="text"
                          value={title}
                          placeholder="title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="form_input">
                        <label>discription</label>
                        <input
                          type="text"
                          value={description}
                          placeholder="description"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <button style={{ marginTop: "10px" }} type="submit">
                      Add Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddPost;
