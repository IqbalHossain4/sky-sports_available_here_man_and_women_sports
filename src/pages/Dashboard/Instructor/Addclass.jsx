import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import Swal from "sweetalert2";
import DashHeader from "../Header/DashHeader";

const image_hoisting_token = import.meta.env.VITE_imgApi;

const Addclass = () => {
  const { user } = useContext(AuthContext);

  const img_hoisting_url = `https://api.imgbb.com/1/upload?key=${image_hoisting_token}`;

  const [selectedFile, setSelectedFile] = useState(null);
  const [storeImg, setStoreImg] = useState(null);
  const handleOnchange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

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

  const handleAddClass = (e) => {
    e.preventDefault();
    const instructor_name = user.displayName;
    const sport_name = e.target.product.value;
    const available_seats = e.target.quantity.value;
    const price = e.target.price.value;
    const email = user.email;
    const picture = storeImg;
    const status = "pending";
    const enrolled = 0;
    const classes = {
      instructor_name,
      sport_name,
      available_seats: parseFloat(available_seats),
      price: parseFloat(price),
      picture,
      email,
      enrolled: parseFloat(enrolled),
      status,
    };

    fetch("https://assignment-12-server-gamma.vercel.app/topclass", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(classes),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
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
      <DashHeader text="Add Class"></DashHeader>
      <form
        onSubmit={handleAddClass}
        className="border p-16 rounded border-blue-400 my-16"
      >
        <div className="w-full text-center">
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
            />
            <input
              className="p-2 mr-4 mb-4 w-full md:w-1/3 border outline-none border-blue-400 rounded"
              type="text"
              name="price"
              placeholder="Price"
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

export default Addclass;
