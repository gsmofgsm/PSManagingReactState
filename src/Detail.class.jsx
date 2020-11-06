import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { Fetch } from "./services/useFetch";
import Spinner from "./Spinner";
import { CartContext } from "./cartContext";

export default function DetailWrapper() {
  const { id } = useParams();
  return <Detail id={id} navigate={useNavigate()}></Detail>;
}

export class Detail extends React.Component {
  state = {
    sku: "",
  };

  static contextType = CartContext; // this exposes the context under this.context

  render() {
    const { id, navigate } = this.props;
    const { sku } = this.state;

    return (
      <Fetch url={`products/${id}`}>
        {(product, loading, error) => {
          if (loading) return <Spinner />;
          if (!product) return <PageNotFound />;
          if (error) throw error;
          return (
            <div id="detail">
              <h1>what {product.name}</h1>
              <p>{product.description}</p>
              <p id="price">${product.price}</p>

              <select
                id="sku"
                value={sku}
                onChange={(e) => this.setState({ sku: e.target.value })}
              >
                <option value="">What size</option>
                {product.skus.map(({ sku, size }) => (
                  <option key={sku} value={sku}>
                    {size}
                  </option>
                ))}
              </select>
              <p>
                <button
                  disabled={!sku}
                  className="btn btn-primary"
                  onClick={() => {
                    this.context.dispatch({ type: "add", id, sku });
                    navigate("/cart");
                  }}
                >
                  Add to cart
                </button>
              </p>
              <img src={`/images/${product.image}`} alt={product.category} />
            </div>
          );
        }}
      </Fetch>
    );
  }
}
