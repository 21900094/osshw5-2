import React, { useEffect, useState } from "react";
import AddProductModal from "./AddProductModal";
import "./App.css";
import EditProductModal from "./EditProductModal";
import ProductList from "./ProductList";

const apiUrl = "https://67296e3b6d5fa4901b6d1e4b.mockapi.io/products";

const App = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async (product) => {
    try {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      fetchProducts();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      fetchProducts();
      setShowEditModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2>상품 정보 CRUD / 5.2</h2>
      <button onClick={fetchProducts} className="getbutton">
        전체 목록 가져오기
      </button>
      <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
        상품 추가하기
      </button>
      <h4>상품 목록</h4>
      <ProductList
        products={products}
        setEditingProduct={setEditingProduct}
        deleteProduct={deleteProduct}
        setShowEditModal={setShowEditModal}
      />
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          addProduct={addProduct}
        />
      )}
      {showEditModal && editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setShowEditModal(false)}
          updateProduct={updateProduct}
        />
      )}
    </div>
  );
};

export default App;
