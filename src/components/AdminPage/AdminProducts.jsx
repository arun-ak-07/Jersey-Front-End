import React, { useEffect, useState } from "react";
import { myContext } from "../context/context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {apiUrl} from '../../utils/api'

export default function AdminProducts() {
    const { myJersey, setMyJersey
    } = useContext(myContext)
    const [editId, setEditId] = useState(null)
    const [prodImage, setProdImage] = useState("")
    const [prodName, setProdName] = useState("")
    const [prodPrice, setProdPrice] = useState("")
    const [prodCategory, setProdCategory] = useState("")
    const [prodDescription, setProdDescription] = useState("")
    const [prodQuantity,setProdQuantity] = useState("")

    const [editedProduct, setEditedProduct] = useState({
        image: "",
        name: "",
        price: "",
        category: "",
        description: "",
    });

    useEffect(() => {
        getProducts()
      }, [])
      
      const getProducts = async () => {
        try{
      
            const response = await axios.get(`${apiUrl}/api/product/getProduct`)
            const data = response.data.products
            console.log("response", data)
            setMyJersey(data)
      
        }catch(error){
            console.log(error)
        }
      }

    const prodDele = async (productId) => {
        try {
            const response = await axios.delete(`${apiUrl}/api/product/deleteProduct/${productId}`)
            if(response.status === 200){
                toast.success(response.data.message)
            }
            setMyJersey(myJersey.filter((data, i) => data._id !== productId))
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.errors);
            } else {
                toast.error('An error occurred while creating the product.');
            }
        }
    }

    function prodEdit(id) {
        setEditId(id)
        const productToEdit = myJersey.find((product) => product._id === id);
        setEditedProduct(productToEdit);

    }
    // Reading Adding Items
    function inpImage(a) {
         setProdImage(a.target.value)  
        
    }
    function inpName(c) {
        setProdName(c.target.value)
    }
    function inpPrice(d) {
        setProdPrice(d.target.value)
    }
    function inpCategory(e) {
        setProdCategory(e.target.value)
    }
    function inpDescription(f) {
        setProdDescription(f.target.value)
    }
    function inpQuantity(g){
        setProdQuantity(parseInt(g.target.value))
    }


    // ADDING LIST PRODUCTS

    const AddList = async () => {

        try {
            
            const jerseyImage = myJersey.find((userD) => userD.image === prodImage  )
            if(jerseyImage){
                alert("product image already added")
            }
            else if(prodImage === ""){
                alert("product image link not be blank")
            }
            else if(prodName === ""){
                alert("product name not be blank")
            }
            else if(prodPrice === ""){
                alert("product price not be blank")
            }
            else if(prodCategory === ""){
                alert("product category not be blank")
            }
            else if(prodDescription === ""){
                alert("product description not be blank")
            }
            else{
                const response = await axios.post(`${apiUrl}/api/product/createProduct`,{
                    image: prodImage, 
                    name: prodName, 
                    price: prodPrice, 
                    category: prodCategory, 
                    description: prodDescription,
                    qty:prodQuantity
                })

                if(response.status === 201){
                    toast.success("Product added succefully")
                    getProducts()
                }
                else{
                    toast.error(response.data.error)
                }

                setMyJersey([...myJersey, { image: prodImage,  name: prodName, price: prodPrice, category: prodCategory, description: prodDescription,qty:prodQuantity }])
            }  


        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                error.response.data.errors.forEach(err => {
                    toast.error(err);
                });
            } else if (error.response && error.response.data && error.response.data.msg) {
                toast.error(error.response.data.msg);
            } else {
                toast.error('Something went wrong. Please try again later.');
            }
        }
    }
    
    const handleUpdateProd = async (productId, index) => {
        try{
            const response = await axios.put(`${apiUrl}/api/product/productUpdate/${productId}`,{
                id: editedProduct.id,  
                    image: editedProduct.image, 
                    name: editedProduct.name, 
                    price: editedProduct.price, 
                    category: editedProduct.category, 
                    description: editedProduct.description,
                    qty:editedProduct.qty
            })

            if(response.status === 200){
                toast.success("product updated succesfully")
                getProducts()
            }
    //     const updatedData = myJersey.map((data, ind) =>
    //   ind === index ? { ...data, ...editedProduct } : data
    // );

    setMyJersey(response.data.updatedproduct);
    getProducts()
    setEditId(null)
}
catch(error){
    console.log(error)
}
    }

    // CANCEL ID
    function handleCancelProd() {
        setEditId(null)
    }

    // REMOVING LAST INDEX
    function removeList() {
        const newArray = [...myJersey]
        newArray.pop();
        setMyJersey(myJersey)
    }

    return (
        <div>
            <div className="productTitles" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <h1>Products List</h1></div>
            <div className="displayProducts">

                <div className="addNewProducts" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '50px' }}>
                    <div className="newProducts"><h3>ADD NEW PRODUCTS</h3></div>
                    <div className="newProducts"><input type="text" onChange={inpImage} placeholder="Enter image link..." /></div><br />
                    <div className="newProducts"><input type="text" onChange={inpName} placeholder="Enter name..." /></div><br />
                    <div className="newProducts"><input type="number" onChange={inpPrice} placeholder="Enter price..." /></div><br />
                    <div className="newProducts"><input type="text" onChange={inpCategory} placeholder="Enter category..." /></div><br />
                    <div className="newProducts"><input type="text" onChange={inpDescription} placeholder="Enter description" /></div><br />
                    <div className="newProducts"><input type="number" onChange={inpQuantity} placeholder="Enter quantity" /></div><br />
                    <div className="newProducts"><button onClick={AddList} style={{ width: '300px', borderRadius: '5px' }}>ADD</button></div><br />
                    <div className="newProducts"><button style={{ width: '300px', borderRadius: '5px' }} onClick={removeList}>REMOVE</button></div><br />
                    <div className="newProducts">Total Products : {myJersey?.length}</div>
                    <div className="newProducts"><Link to={'/'}>Home</Link></div>
                    <div className="newProducts"><Link to={'/MyStore'}>MyStore</Link></div>
                    <div className="newProducts"><Link to={'/UsersPage'}>UsersPage</Link></div>


                </div>

                <div className="center-details" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', marginTop: '50px' }} >

                    {
                        myJersey?.map((data, index) => (
                            <div class="card" style={{ height: '900px', width: '400px', marginBottom: '40px', border: '10px bold black' }} key={index}>
                                {editId === data._id ? (
                                    <>

                                        <div className="newProducts"><input type="text" onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                image: e.target.value,
                                            })
                                        }
                                            value={editedProduct.image} defaultValue={data.image} placeholder="Enter image link..." /></div><br />
                                        
                                        <div className="newProducts"><input type="text" onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                name: e.target.value,
                                            })
                                        }
                                            value={editedProduct.name} defaultValue={data.name} placeholder="Enter name..." /></div><br />
                                        <div className="newProducts"><input type="number" onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                price: e.target.value,
                                            })
                                        }
                                            value={editedProduct.price} defaultValue={data.price} placeholder="Enter price..." /></div><br />
                                        <div className="newProducts"><input type="text" onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                category: e.target.value,
                                            })
                                        }
                                            value={editedProduct.category} defaultValue={data.category} placeholder="Enter category..." /></div><br />
                                        <div className="newProducts"><input type="text" onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                description: e.target.value,
                                            })
                                        }
                                            value={editedProduct.description} defaultValue={data.description} placeholder="Enter description" /></div><br />
                                        <div className="newProducts"><button style={{ width: '100%' }} onClick={() => handleUpdateProd(data._id)}>update</button></div><br />
                                        <div className="newProducts"><button style={{ width: '100%' }} onClick={() => handleCancelProd()}>cancel</button></div>
                                    </>
                                ) : (
                                    <>

                                        <div style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="acard-image">
                                            <img class="card-img-top" style={{ width: '300px' }} src={data.image} alt="Card image cap" />
                                        </div>
                                        <div class="card-body" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <h5 class="card-title card_text product-title medium t-16_24 mt-15_20 mb8 lineClamp dkn-product-card-name" style={{ fontSize: '16px', lineHeight: '24px' }}>name : {data.name}</h5>
                                            <p class="card-text">price : {data.price}</p>
                                            <p class="card-text">category : {data.category}</p>
                                            <p class="card-text">description : {data.description}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="editDelete"><button style={{ width: '100%', borderRadius: '5px' }} onClick={() => prodEdit(data._id)}>EDIT</button></div><br />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="editDelete"><button style={{ width: '100%', borderRadius: '5px' }} onClick={() => prodDele(data._id)}>DELETE</button></div>

                                    </>
                                )}
                            </div>
                        ))}

                </div>



            </div>

        </div >
    )
}