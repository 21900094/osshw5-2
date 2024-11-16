import React, { useState } from "react";
import "./AddProductModal.css";
const AddProductModal = ({ onClose, addProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discount: "",
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.category ||
      isNaN(newProduct.price) ||
      isNaN(newProduct.discount)
    ) {
      alert("모든 필드를 올바르게 입력하세요.");
      return;
    }
    addProduct(newProduct);
  };

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">새 상품 추가</h5>
            <button className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="form-control mb-2"
              value={newProduct.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              className="form-control mb-2"
              value={newProduct.description}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Category"
              name="category"
              className="form-control mb-2"
              value={newProduct.category}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              className="form-control mb-2"
              value={newProduct.price}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Discount"
              name="discount"
              className="form-control mb-2"
              value={newProduct.discount}
              onChange={handleChange}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              취소
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
