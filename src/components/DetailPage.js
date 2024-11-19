import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiUrl = "https://67296e3b6d5fa4901b6d1e4b.mockapi.io/products";

const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!product) return <div></div>;

  return (
    <div className="container">
      <h2>상품 상세 정보</h2>
      <p>이름: {product.name}</p>
      <p>설명: {product.description}</p>
      <p>카테고리: {product.category}</p>
      <p>가격: {product.price}원</p>
      <p>할인율: {product.discount}%</p>
    </div>
  );
};

export default DetailPage;
