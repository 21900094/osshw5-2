import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";
const ProductList = ({
  products,
  setEditingProduct,
  deleteProduct,
  setShowEditModal,
}) => {
  return (
    <div className="row">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          setEditingProduct={setEditingProduct}
          deleteProduct={deleteProduct}
          setShowEditModal={setShowEditModal}
        />
      ))}
    </div>
  );
};

export default ProductList;
