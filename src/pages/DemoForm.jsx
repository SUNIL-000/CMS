import axios from "axios";
import React, { useState } from "react";

const DemoForm = () => {
  const [name, setName] = useState("");
  const [image, setimage] = useState("");
  console.log(image, name);

  const handleSumbit = async (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("name", name);
    form.append("image", image);
    // console.log(form)

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/demo",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={handleSumbit} className="mt-36">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id=""
        />
        <input
          type="file"
          name="image"
          id=""
          onChange={(e) => setimage(e.target.files[0])}
        />
        <button type="submit" className="border">
          submit
        </button>
      </form>
    </div>
  );
};

export default DemoForm;
