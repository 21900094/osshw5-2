import React, { useEffect, useState } from "react";

const EditProductModal = ({ product, onClose, updateProduct }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      isNaN(updatedProduct.price) ||
      isNaN(updatedProduct.discount)
    ) {
      alert("가격과 할인율에는 숫자만 입력해야 합니다.");
      return;
    }
    updateProduct(product.id, updatedProduct);
  };

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">상품 수정</h5>
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
              value={updatedProduct.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              className="form-control mb-2"
              value={updatedProduct.description}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Category"
              name="category"
              className="form-control mb-2"
              value={updatedProduct.category}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              className="form-control mb-2"
              value={updatedProduct.price}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Discount"
              name="discount"
              className="form-control mb-2"
              value={updatedProduct.discount}
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

export default EditProductModal;
