import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

const apiUrl = "https://67296e3b6d5fa4901b6d1e4b.mockapi.io/products";

const UpdatePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [editCount, setEditCount] = useState(0);
  const inputRefs = useRef({});

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setProduct((prevProduct) => {
      const updatedProduct = { ...prevProduct, [name]: value };
      if (validateInputs()) {
        updateProduct(updatedProduct);
      }
  
      return updatedProduct;
    });
  
    setEditCount((prevCount) => prevCount + 1);
  };
  

  const updateProduct = async (updatedProduct) => {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
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
  
  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg" style={{ maxWidth: "600px", margin: "0 auto", borderRadius: "15px" }}>
        <div className="card-header bg-warning text-white text-center" style={{ borderRadius: "15px 15px 0 0" }}>
          <h2 className="mb-0">상품 수정</h2>
        </div>
        <div className="card-body">
          <form>
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
          </form>
        </div>
        <div className="card-footer text-center">
          <p className="mb-2 text-muted">총 수정 횟수: {editCount}</p>
          <Link to="/" className="btn btn-outline-primary me-2">
            목록으로 돌아가기
          </Link>

        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
