import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

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
  useEffect(() => {
    fetchProduct();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => {
      const updatedProduct = { ...prevProduct, [name]: value };
      updateProduct(updatedProduct);
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

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>상품 수정</h2>
      <form>
        <div className="form-group">
          <label>이름</label>
          <input
            ref={(el) => (inputRefs.current["name"] = el)}
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleInputChange}
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
          />
        </div>
      </form>
      <p>총 수정 횟수: {editCount}</p>
    </div>
  );
};

export default UpdatePage;
