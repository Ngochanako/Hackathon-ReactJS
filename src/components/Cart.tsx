import React from 'react';
type Product = {
    id: number;
    img: string;
    name: string;
    detail: string;
    price: number;
    quantity: number;
  };
type CartProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  idProduct: number;
  quantityChange:number;
};

type Props = {
  product: CartProduct;
  index: number;
  deleteItem: (id: number) => void;
  update: (id: number) => void;
  handleQuantityChange:(id:number,e:React.ChangeEvent<HTMLInputElement>)=>void;
};

export default function Cart({ product, index, deleteItem, update,handleQuantityChange }: Props) {
    let listProduct:Product[]=JSON.parse(localStorage.getItem("listProduct")||'[]');
    let productFind=listProduct.find(item=>item.id===product.idProduct);
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{product.name}</td>
      <td>{product.price} USD</td>
      <td>
        <input
          name="cart-item-quantity-1"
          type="number"
          min={1}
          max={productFind?.quantity}
          value={product.quantityChange}
          onChange={(e)=>handleQuantityChange(product.id,e)}
        />
      </td>
      <td>
        <a onClick={()=>update(product.id)} className="label label-info update-cart-item" data-product="">
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
