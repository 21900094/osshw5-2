import React from "react";
import "./ProductCard.css";

const ProductCard = ({
  product,
  setEditingProduct,
  deleteProduct,
  setShowEditModal,
}) => {
  const handleEdit = () => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-category">{product.category}</div>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-content">상세 설명: {product.description}</p>
          <p className="card-content">가격: {product.price}원</p>
          <p className="card-content">할인율: {product.discount}%</p>
          <button className="btn btn-primary btn-sm" onClick={handleEdit}>
            수정
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteProduct(product.id)}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
