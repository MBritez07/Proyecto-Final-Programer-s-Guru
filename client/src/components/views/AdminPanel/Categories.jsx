import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_categories, post_categories, delete_categories, clearMessage } from "../../../Redux/actions";
import theme from "../../../theme/theme";
import {validate} from "./validate";
import styles from "./Categories.module.css";

const Categories = () => {

    // Global state:
    const categories = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    // States:
    const [inputCategory, setInputCategory] = useState({ category: "" });
    const [error, setError] = useState({});
    const [backmessage, setbackmessage] = useState("");
    const [showitem, setShowitem] = useState(true);


  
    //functions:
    const handleInputChange = (event) => {
        setbackmessage("");
        const { value } = event.target;
        setInputCategory({ category: value });
    };

    const handlePostCategories = async (event) => {
        event.preventDefault();

        try {
            await dispatch(post_categories({ technology: inputCategory.category }));
            setInputCategory({ category: "" });
            await dispatch(get_categories());
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await dispatch(delete_categories(id));
            await dispatch(get_categories());
        } catch (error) {
            console.log("error");
        }
    };

    //life-cycles:
    useEffect(() => {
        setError(validate(inputCategory));
    }, [inputCategory]);

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_categories());

        return () => {
            dispatch(clearMessage());
        };
    }, [dispatch]);

    //component:
    return (
        <div className={styles.container}>
            {showitem && (
                <section className={styles.item}>
                <form>
                    <span>
                    <input
                        onChange={handleInputChange}
                        value={inputCategory.category}
                        name="name"
                        placeholder="Ingresa el nombre de la categoría"
                    />
                    <button onClick={handlePostCategories}>
                        Postear categorías
                    </button>
                    {backmessage && <p>{backmessage}</p>}
                    </span>
                    <span>{error && <p>{error.category}</p>}</span>
                </form>

                <div>
                    <h2>Categories</h2>
                    <div>
                    {categories &&
                        categories?.map((category, index) => (
                        <span key={index}>
                            <label>
                            {category.id} : {category.name}
                            </label>
                            <button onClick={() => deleteCategory(category.id)}>
                            X
                            </button>
                        </span>
                        ))}
                    </div>
                </div>
                </section>
            )}
        </div>
    );
};

export default Categories;
