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

    return (
        <div className="container">
            <h2>상품 목록</h2>
            <div className="mb-4">
        <Link to="/create" className="btn btn-success">
          상품 추가
        </Link>
      </div>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card">
                            <div className="card-category">{product.category}</div>
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p>{product.description}</p>
                                <Link to={`/detail/${product.id}`} className="btn btn-info">
                                    상세보기
                                </Link>
                                <Link to={`/update/${product.id}`} className="btn btn-primary">
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
