import axios from 'axios';
import React, { useEffect, useState } from 'react';

import s from "./Detail.module.css";

//_________________________module_________________________
const DetailPage = ({ match }) => {

    //states:
    const [product, setProduct] = useState(null);

    //const:
    const productId = match.params.id;

    //functions:
    const fetchProductById = async () => {
        try {
            const response = await axios.get(`/api/products/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    //life-cycles:
    useEffect(() => {
        fetchProductById();
    }, []);


    //component:
    return (
        <main>
            {
                product ? (
                    <div className={s.container}>
                        <h2 className={styles.name}>{product.name}</h2>
                        <p className={styles.description}>{product.description}</p>
                        <p className={styles.price}>Price: ${product.price}</p>
                        <img src={product.image} alt={product.name} />
                        <p className={styles.category}>Category: {product.category}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
            <div className={styles.Shop}>
                <h1 className={styles.title}>TU CARRITO DE COMPRAS</h1>
                <h1 className={styles.total}>TOTAL :</h1>
                <span>
                    {/* sumar */}
                </span>
            </div>
        </main>
    );
};

export default DetailPage;