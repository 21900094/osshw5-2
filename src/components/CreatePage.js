import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://67296e3b6d5fa4901b6d1e4b.mockapi.io/products";

const CreatePage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    discount: 0,
  });
  const [createCount, setCreateCount] = useState(0);
  const inputRefs = useRef({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    setCreateCount((prevCount) => prevCount + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product successfully created!");
        navigate("/"); // Redirect to the list page after creation
      } else {
        alert("Failed to create product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="container">
      <h2>상품 추가</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>이름</label>
          <input
            ref={(el) => (inputRefs.current["name"] = el)}
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>설명</label>
          <input
            ref={(el) => (inputRefs.current["description"] = el)}
            type="text"
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>카테고리</label>
          <input
            ref={(el) => (inputRefs.current["category"] = el)}
            type="text"
            className="form-control"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>가격</label>
          <input
            ref={(el) => (inputRefs.current["price"] = el)}
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>할인율</label>
          <input
            ref={(el) => (inputRefs.current["discount"] = el)}
            type="number"
            className="form-control"
            name="discount"
            value={product.discount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          상품 추가
        </button>
      </form>

    </div>
  );
};

export default CreatePage;
