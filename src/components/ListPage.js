import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = "https://67296e3b6d5fa4901b6d1e4b.mockapi.io/products";

const ListPage = () => {
    const [products, setProducts] = useState([]);

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
    const deleteProduct = async (id) => {
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
            });
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="container">
            <h2 className="text-primary">상품 목록</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Link to="/create" className="btn btn-success btn-lg shadow-sm">
                    상품 추가
                </Link>
            </div>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card shadow-lg rounded-lg" style={{ position: "relative", border: "1px solid #dee2e6" }}>
                            <button
                                onClick={() => deleteProduct(product.id)}
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "50%",
                                    padding: "6px",
                                }}
                            ></button>

<div className="card-header bg-primary text-white text-center font-weight-bold" style={{ borderRadius: "0.5rem 0.5rem 0 0" }}>{product.category}</div>
                            <div className="card-body text-center">
                                <h5 className="card-title text-dark font-weight-bold">{product.name}</h5>
                                <p className="card-text text-muted">{product.description}</p>
                                <Link to={`/detail/${product.id}`} className="btn btn-outline-primary me-2">
                                    상세보기
                                </Link>
                                <Link to={`/update/${product.id}`} className="btn btn-outline-secondary">
                                    수정
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListPage;
