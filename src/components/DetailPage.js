import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const apiUrl = "https://67296e3b6d5fa4901b6d1e4b.mockapi.io/products";

const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg" style={{ maxWidth: "600px", margin: "0 auto", borderRadius: "15px" }}>
        <div className="card-header bg-primary text-white text-center" style={{ borderRadius: "15px 15px 0 0" }}>
          <h2 className="mb-0">상품 상세 정보</h2>
        </div>
        <div className="card-body">
          <h4 className="card-title text-center text-dark font-weight-bold mb-4">{product.name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>설명:</strong> {product.description}
            </li>
            <li className="list-group-item">
              <strong>카테고리:</strong> {product.category}
            </li>
            <li className="list-group-item">
              <strong>가격:</strong> {product.price}원
            </li>
            <li className="list-group-item">
              <strong>할인율:</strong> {product.discount}%
            </li>
          </ul>
        </div>
        <div className="card-footer text-center">
          <Link to="/" className="btn btn-outline-primary me-2">
            목록으로 돌아가기
          </Link>
          <Link to={`/update/${id}`} className="btn btn-outline-secondary">
            수정하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
