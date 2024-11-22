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
  const inputRefs = useRef({});

  const validateInputs = () => {
    const { name, description, category, price, discount } = inputRefs.current;

    if (!name.value.trim()) {
      alert("이름을 입력하세요.");
      name.focus();
      return false;
    }
    if (!description.value.trim()) {
      alert("설명을 입력하세요.");
      description.focus();
      return false;
    }
    if (!category.value.trim()) {
      alert("카테고리를 입력하세요.");
      category.focus();
      return false;
    }
    if (price.value <= 0) {
      alert("가격은 0보다 커야 합니다.");
      price.focus();
      return false;
    }
    if (discount.value < 0 || discount.value > 100) {
      alert("할인율은 0에서 100 사이여야 합니다.");
      discount.focus();
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return; // Validate inputs before submitting

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
    <div className="container mt-5">
      <div className="card shadow-lg" style={{ maxWidth: "600px", margin: "0 auto", borderRadius: "15px" }}>
        <div className="card-header bg-success text-white text-center" style={{ borderRadius: "15px 15px 0 0" }}>
          <h2 className="mb-0">상품 추가</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label font-weight-bold">이름</label>
              <input
                ref={(el) => (inputRefs.current["name"] = el)}
                type="text"
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label font-weight-bold">설명</label>
              <input
                ref={(el) => (inputRefs.current["description"] = el)}
                type="text"
                className="form-control"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label font-weight-bold">카테고리</label>
              <input
                ref={(el) => (inputRefs.current["category"] = el)}
                type="text"
                className="form-control"
                name="category"
                value={product.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label font-weight-bold">가격</label>
              <input
                ref={(el) => (inputRefs.current["price"] = el)}
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label font-weight-bold">할인율</label>
              <input
                ref={(el) => (inputRefs.current["discount"] = el)}
                type="number"
                className="form-control"
                name="discount"
                value={product.discount}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-success w-100">
              상품 추가
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
