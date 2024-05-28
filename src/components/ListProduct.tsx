import React from 'react';

type Product = {
  id: number;
  img: string;
  name: string;
  detail: string;
  price: number;
  quantity: number;
};

type ListProductProps = {
  product: Product;
  addProduct:(id:number)=>void,
};

export default function ListProduct({ product,addProduct }: ListProductProps) {
  return (
    <div key={product.id}>
      <div className="media product">
        <div className="media-left">
          <a href="#">
            <img
              className="media-object"
              src={product.img}
              alt={product.name}
            />
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{product.name}</h4>
          <p>{product.detail}</p>
          {product.quantity > 0 ? (
            <>   
              <input
                name={`quantity-product-${product.id}`}
                type="number"
                value={product.quantity}
                readOnly
              />
              <a onClick={()=>addProduct(product.id)} data-product={product.id} className="price">
                {product.price} USD
              </a>
            </>
          ) : (
            <span className="price">{product.price} USD</span>
          )}
        </div>
      </div>
    </div>
  );
}
