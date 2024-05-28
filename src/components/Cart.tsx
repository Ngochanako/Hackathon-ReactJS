import React from 'react';

type CartProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  idProduct: number;
};

type Props = {
  product: CartProduct;
  index: number;
  deleteItem: (id: number) => void;
  update: (id: number, quantity: number) => void;
};

export default function Cart({ product, index, deleteItem, update }: Props) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    update(product.idProduct, newQuantity);
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{product.name}</td>
      <td>{product.price} USD</td>
      <td>
        <input
          name="cart-item-quantity-1"
          type="number"
          value={product.quantity}
          onChange={handleQuantityChange}
        />
      </td>
      <td>
        <a className="label label-info update-cart-item" data-product="">
          Update
        </a>
        <a
          onClick={() => deleteItem(product.id)}
          className="label label-danger delete-cart-item"
          data-product=""
        >
          Delete
        </a>
      </td>
    </tr>
  );
}
