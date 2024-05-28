import React, { useEffect, useState } from 'react';
import ListProduct from './ListProduct';
import Cart from './Cart';

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
  idProduct: number;
  name: string;
  price: number;
  quantity: number;
};

export default function ShoppingCart() {
  // Initialize the product list
  const listProductFix: Product[] = [
    {
      id: 1,
      img: 'https://images.squarespace-cdn.com/content/v1/58b15f88b3db2b9cf99a60cd/1554707595712-QJGW8NKAFDS8HTKV1YUZ/image-asset.jpeg?format=1500w',
      name: 'Pizza',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
      price: 30,
      quantity: 10,
    },
    {
      id: 2,
      img: 'https://afamilycdn.com/thumb_w/650/150157425591193600/2020/12/5/xac-5-mon-an-nhanh-duoc-ua-chuong-nhat-the-gioif413cea463-16071362188141792796206.jpg',
      name: 'Hamburger',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
      price: 15,
      quantity: 10,
    },
    {
      id: 3,
      img: 'https://vnvinaphone.vn/wp-content/uploads/2021/11/Veggie-mania.jpg',
      name: 'Cake',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
      price: 20,
      quantity: 5,
    },
    {
      id: 4,
      img: 'https://banhmipho.vn/wp-content/uploads/2021/08/vuong.jpg-602x470.png',
      name: 'Bread',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
      price: 10,
      quantity: 20,
    },
  ];
  // Save initial products to localStorage
  useEffect(() => {
    localStorage.setItem('listProduct', JSON.stringify(listProductFix));
  }, []);

  // Retrieve product list from localStorage
  const [listProduct, setListProduct] = useState<Product[]>(() => {
    let listLocal = localStorage.getItem('listProduct');
    return listLocal ? JSON.parse(listLocal) : [];
  });

  // Retrieve cart from localStorage
  const [cartLocal, setCartLocal] = useState<CartProduct[]>(() => {
    let cartLocal = localStorage.getItem('cart');
    return cartLocal ? JSON.parse(cartLocal) : [];
  });
   //clear status Notification
   const clearNotification=()=>{
    setActiveProduct(false);
    setActiveDelete(false);
  }
//Initialize activeProduct
 const [activeProduct,setActiveProduct]=useState<boolean>(false);
 //Initialize activeDelete
 const [activeDelete,setActiveDelete]=useState<boolean>(false);
  // Initialize totalPrice
  const [totalPrice, setTotalPrice] = useState<number>(0);
  // Add product to cart
  const addProduct = (id: number) => {
    const productChange = listProduct.find((item) => item.id === id);
    if (productChange) {
        clearNotification();
        let  productInCart = cartLocal.find((product) => product.idProduct === id);
        if(productInCart){
            let newCart=cartLocal.map((product) =>
                product.idProduct === id
                  ? { ...product, quantity: product.quantity + 1 }
                  : product
              );
            setCartLocal(newCart);
            setActiveProduct(true);        
        }else{
            let newCart=[
                ...cartLocal,
                {
                  id: Math.floor(Math.random()*100000000), 
                  idProduct: productChange.id,
                  name: productChange.name,
                  price: productChange.price,
                  quantity: 1,
                },
              ];
            setCartLocal(newCart);
            setActiveProduct(true);
        }
    }
  };

  useEffect(() => {
    // Save cart to localStorage whenever it updates
    localStorage.setItem('cart', JSON.stringify(cartLocal));

    // Update total price whenever cart updates
    const newTotalPrice = cartLocal.reduce((total, product) => total + product.price * product.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cartLocal]);
   //delete product from cart
   const deleteItem=(id:number)=>{
      clearNotification();
      let newCart=cartLocal.filter(product=>product.id!==id);
      setCartLocal(newCart);
      setActiveDelete(true);
   }
   //update quantity to cart
   const update=(id:number)=>{
        console.log(1);
        
   }
  return (
    <>
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">List Products</h1>
              </div>
              <div className="panel-body" id="list-product">
                {listProduct.map((product) => (
                  <ListProduct
                    key={product.id}
                    product={product}
                    addProduct={addProduct}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="panel panel-danger">
              <div className="panel-heading">
                <h1 className="panel-title">Your Cart</h1>
              </div>
              <div className="panel-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: '4%' }}>STT</th>
                      <th>Name</th>
                      <th style={{ width: '15%' }}>Price</th>
                      <th style={{ width: '4%' }}>Quantity</th>
                      <th style={{ width: '25%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody id="my-cart-body">
                    {cartLocal.map((product, index) => (
                        
                      <Cart key={product.id} product={product} index={index} deleteItem={deleteItem} update={update} />
                    ))}
                  </tbody>
                  <tfoot id="my-cart-footer">
                    <tr>
                      <td colSpan={4}>
                        There are <b>{cartLocal.length}</b> items in your shopping cart.
                      </td>
                      <td colSpan={2} className="total-price text-left">
                        {totalPrice} USD
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            {cartLocal.length===0?(<div className="alert alert-success" role="alert" id="mnotification">
             There is no product in your cart !
            </div>):''}
            {activeProduct &&<div className="alert alert-success" role="alert" id="mnotification">
              Add to cart successfully
            </div>}
            {activeDelete &&<div className="alert alert-danger" role="alert" id="mnotification">
              Delete product successfully!
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}
