import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const image_hoisting_token = import.meta.env.VITE_imgApi;
const UpdateClass = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();

  const img_hoisting_url = `https://api.imgbb.com/1/upload?key=${image_hoisting_token}`;

  const [selectedFile, setSelectedFile] = useState(null);
  const [storeImg, setStoreImg] = useState(null);
  const handleOnchange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    fetch(img_hoisting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgdata) => {
        setStoreImg(imgdata?.data?.display_url);
      });

    const sport_name = e.target.product.value;
    const available_seats = e.target.quantity.value;
    const price = e.target.price.value;
    const picture = storeImg;
    const classes = {
      sport_name,
      available_seats: parseFloat(available_seats),
      price: parseFloat(price),
      picture,
    };
    fetch(`http://localhost:5000/topclass/${data._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(classes),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          console.log(data);
          Swal.fire({
            title: "Success!",
            text: "Toy added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });
  };
  return (
    <div className="bg-white">
      <form
        onSubmit={handleUpdate}
        className="border p-16 rounded border-blue-400 my-16"
      >
        <div className="w-full  text-center">
          <div className="mb-8 w-auto  ">
            <input
              className="mr-4 mb-4 w-full md:w-1/3 p-2 md:w-1/3 border outline-none border-blue-400 rounded"
              type="text"
              name="name"
              readOnly
              defaultValue={user.displayName}
            />
            <input
              className="p-2 w-full md:w-1/3 border outline-none border-blue-400 rounded"
              type="text"
              name="author"
              readOnly
              defaultValue={user.email}
            />
          </div>
          <div className="mb-8 w-auto">
            <input
              className="mr-4 mb-4 w-full md:w-1/3 p-2 border outline-none border-blue-400 rounded"
              type="text"
              name="product"
              placeholder="Class name"
              defaultValue={data.sport_name ? data.sport_name : data.class_name}
            />
            <input
              className="p-2 w-full md:w-1/3 border outline-none border-blue-400 rounded"
              max="4"
              type="file"
              onChange={handleOnchange}
            />
          </div>
          <div className="mb-8 w-auto">
            <input
              className="mr-4 mb-4 w-full md:w-1/3 p-2 border outline-none border-blue-400 rounded"
              type="text"
              name="quantity"
              placeholder="Available Seats"
              defaultValue={data.available_seats}
            />
            <input
              className="p-2 mb-4 w-full md:w-1/3 border outline-none border-blue-400 rounded"
              type="text"
              name="price"
              placeholder="Price"
              defaultValue={data.price}
            />
          </div>
        </div>

        <input
          className="transition hover:bg-gray-800 bg-blue-500 text-center w-full mt-4 py-2 rounded text-white font-bold"
          type="submit"
          value="Add Class"
        />
      </form>
    </div>
  );
};

export default UpdateClass;
