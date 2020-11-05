import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function Detail(props) {
  const { id } = useParams();
  const skuRef = useRef();
  const navigate = useNavigate();
  const { data: product, error, loading } = useFetch(`products/${id}`);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>what {product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>

      <select id="sku" ref={skuRef}>
        <option value="">What size</option>
        {product.skus.map(({ sku, size }) => (
          <option key={sku} value={sku}>
            {size}
          </option>
        ))}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            const sku = skuRef.current.value;
            if (!sku) return alert("Select size.");
            props.dispatch({ type: "add", id, sku });
            navigate("/cart");
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
