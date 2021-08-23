import React, { Fragment, useState, useEffect } from "react";

import '../home/TodoItem.css';
import { todoList } from '../home/TodoItemJq';

import { Button, Badge } from 'react-bootstrap';



export function TodoItem() {
    todoList();


    let user = {};
    const storedTodos = JSON.parse(localStorage.getItem('user'));
    user = storedTodos;

    const urlCategories = 'https://v3.tissini.app/api/v3/categories';
    const urlProducts = 'https://v3.tissini.app/api/v3/categories/1/products';

    const [categories, setCategories] = useState();
    const fetchCategories = async () => {

        const res = await fetch(urlCategories);
        const resJson = await res.json();
        setCategories(resJson);
    }

    const [products, setProducts] = useState();
    const fetchProducts = async () => {

        const res = await fetch(urlProducts);
        const resJson = await res.json();
        const { products } = resJson
        setProducts(products);
    }


    const logOut = () => {

        localStorage.removeItem('user');
        window.location.reload();
    }



    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);








    return (

        <Fragment>

            <div id="wrapper">

                <div className="cart-icon-bottom">
                </div>

                <div id="checkout">
                    CHECKOUT
                </div>


                <div id="header">
                    <ul>
                        <li> <div className="logo-tissini-2"></div></li>
                        <li><a href="/#">Home</a></li>
                        <li><a href="/#">BRANDS</a></li>
                        <li><a href="/#">DESIGNERS</a></li>
                        <li><a href="/#">CONTACT</a></li>
                        <li> <Button variant="danger" onClick={logOut}>logOut </Button></li>
                        <li>  <Badge bg="info">Welcome {user.nombre}</Badge></li>

                    
                        
                    </ul>
                    
                </div>

                <div id="sidebar">

                    <h3>CART</h3>
                    <div id="cart">
                        <span className="empty">No items in cart.</span>
                    </div>

                 

                    <h3>CATEGORIES</h3>
                    <div className="checklist categories" >
                        <ul>
                            {!categories ? 'loading...' :
                                categories.map((category, index) => {
                                    return <li key={index}><a href="/#"><span></span>{category.name}</a></li>
                                })


                            }

                        </ul>
                    </div>

                  

               
               




                </div>


                <div id="grid">
                
                <div id="grid-selector">
                    {!products ? 'loading...' : products.length} results
                </div>

                    {

                    !products ? 'loading...' :

                        products.map((product, index) => {

                            return <div className="product" key={index}>
                                <div className="info-large">
                                    <h4>{product.name}</h4>
                                    <div className="sku">
                                        PRODUCT SKU: <strong>89356</strong>
                                    </div>

                                    <div className="price-big">
                                        <span>${product.price}</span>
                                    </div>

                                    <h3>COLORS</h3>
                                    <div className="colors-large">
                                        <ul>
                                            <li><a href="/#"><span></span></a></li>
                                            <li><a href="/#"><span></span></a></li>
                                            <li><a href="/#"><span></span></a></li>
                                            <li><a href="/#"><span></span></a></li>
                                        </ul>
                                    </div>

                                    <h3>SIZE</h3>
                                    <div className="sizes-large">
                                    
                                        {
                                            product.variants.map((variant) =>{
                                                return variant.size + ".  ";
                                            })
                                        }
                                    </div>

                                    <button className="add-cart-large">Add To Cart</button>

                                </div>
                                <div className="make3D">
                                    <div className="product-front">
                                        <div className="shadow"></div>
                                       
                                        <img src= {"https://v3.tissini.app/"+product.images[0].url} alt="" />
                                        <div className="image_overlay"></div>
                                        <div className="add_to_cart">Add to cart</div>
                                        <div className="view_gallery">View gallery</div>
                                        <div className="stats">
                                            <div className="stats-container">
                                                <span className="product_price">${product.price}</span>
                                                <span className="product_name">{product.name}</span>
                                                <p>{product.category.name}</p>

                                                <div className="product-options">
                                                    <strong>SIZES</strong>
                                                    <span>
                                                    {
                                                        product.variants.map((variant) =>{
                                                            return variant.size + ".  ";
                                                        })
                                                    }
                                                    </span>
                                                    <strong>COLORS</strong>
                                                    <div className="colors">
                                                        <div className="c-blue"><span></span></div>
                                                        <div className="c-red"><span></span></div>
                                                        <div className="c-white"><span></span></div>
                                                        <div className="c-green"><span></span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-back">
                                        <div className="shadow"></div>
                                        <div className="carousel">
                                            <ul className="carousel-container">

                                            {
                                                product.images.map((image,index) =>{
                                                    return <li key={index}><img src={"https://v3.tissini.app/"+image.url} alt="" /></li>
                                                })
                                            }

                                            </ul>
                                            <div className="arrows-perspective">
                                                <div className="carouselPrev">
                                                    <div className="y"></div>
                                                    <div className="x"></div>
                                                </div>
                                                <div className="carouselNext">
                                                    <div className="y"></div>
                                                    <div className="x"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flip-back">
                                            <div className="cy"></div>
                                            <div className="cx"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            })
                    }


                </div>

            </div>
        </Fragment>



    );

}


