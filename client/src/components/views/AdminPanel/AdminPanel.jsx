import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_products_all, post_Products, delete_Products,get_categories, post_categories, clearCourses, clearMessage, delete_categories, get_courses_all, post_course, delete_course } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import Categories from "./Categories";
import Courses from "./Courses"
import Products from "./Products"
import User from './User'
import Subscriptions from './Subscriptions'
import styles from "./AdminPanel.module.css";

//_________________________module_________________________
const  AdminPanel =() =>{

    //global state: 
    const message = useSelector((state) => state.message);
    
    //const:
    const dispatch = useDispatch();

    const [showcategories,setshowcategories]= useState(false)
    const [showcursos,setshowcursos]= useState(false)
    const [showproducts, setshowproducts]=useState(false)
    const [showUsers,setShowUsers] = useState(false)
    const [showSubscriptions,setShowSubscriptions] = useState(false)


    //functions:
    const handleShowCategories = (event) => {
        event.preventDefault();
        setshowcategories(!showcategories);
        setshowcursos(false);
        setshowproducts(false);
        setShowUsers(false);
        setShowSubscriptions(false);
      }
      
      const handleShowCursos = (event) => {
        setshowcursos(!showcursos);
        setshowcategories(false);
        setshowproducts(false);
        setShowUsers(false);
        setShowSubscriptions(false);
      }
      
      const handleShowProducts = (event) => {
        setshowproducts(!showproducts);
        setshowcategories(false);
        setshowcursos(false);
        setShowUsers(false);
        setShowSubscriptions(false);
      }
      
      const handleShowUsers = (event) => {
        setShowUsers(!showUsers);
        setshowcategories(false);
        setshowcursos(false);
        setshowproducts(false);
        setShowSubscriptions(false);
      }
      
      const handleShowSubscription = (event) => {
        setShowSubscriptions(!showSubscriptions);
        setshowcategories(false);
        setshowcursos(false);
        setshowproducts(false);
        setShowUsers(false);
      }
      

    //life-cycles:
    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_categories());
        dispatch(get_courses_all());
        dispatch(get_products_all());

        

        return () => {                // return ocupar para hacer algo en el desmontaje          
            dispatch(clearMessage()); // limpiar 
            dispatch(clearCourses()); 
        }
    }, [dispatch]);


      

    //component:
    return (
        <main className={`${styles.component} ${styles[theme("component")]}`} >

            <div className={styles.message}>Respuesta desde Servidor: {message}</div>

            <div>
                <button onClick={handleShowCategories} >
                    <h1 className={styles.h1} >ADMINISTRAR CATEGORIAS</h1>
                </button>
                {showcategories&&(<Categories></Categories>)}
            
            <div/>

            <div>   
        
          <button onClick={handleShowCursos}>
                    <h1 className={styles.h1}>ADMINISTRAR CURSOS</h1>
                </button>
                {showcursos && (
               <Courses></Courses>
            )}</div>
            

              <div>
                <button onClick={handleShowProducts}>
                    <h1 className={styles.h1}>ADMINISTRAR PRODUCTOS</h1>
                </button>
                 {showproducts&& ( 
              <Products></Products>
            )}
              </div>

              <div>
                <button  onClick={handleShowUsers}>
                    <h1 className={styles.h1}>ADMINISTRAR USUARIOS</h1>
                </button>
                {showUsers && (<User></User>)}
              </div>

              <div>
                <button  onClick={handleShowSubscription}>
                    <h1 className={styles.h1}>ADMINISTRAR SUSCRIPCIONES</h1>
                </button>
                {showSubscriptions && (<Subscriptions></Subscriptions>)}
              </div>
              </div>
        </main>
    );
};

export default AdminPanel;


