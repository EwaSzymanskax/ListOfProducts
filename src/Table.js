import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Pagination } from 'react-pagination-bar';
import './Table.css';
import 'react-pagination-bar/dist/index.css';
import Modal from 'react-modal';
// import Filter from './Filter';

const Table = ({filterValue}) => {

const [product, setProduct] = useState([]);
const [filterProducts, setFilterProducts] = useState(-1)
const [currentPage, setCurrentPage] = useState(1);
const [modalIsOpen, setIsOpen] = useState(false);
const [currentProduct, setCurrentProduct] = useState('') 
const pagePostsLimit = 6;

useEffect(() => { 
    const getProduct = () => { Axios.get(`https://reqres.in/api/products?page=${currentPage}`).then((response) => { 
    setProduct(response.data.data)
    console.log(response)
    
    })}

    getProduct()
  },[currentPage]);


  useEffect(() => { 
    const filterNum = Number(filterValue);
    if (filterNum) { 
  const filterProducts = product.filter((prod)=>prod.id === filterNum);
  setFilterProducts(filterProducts);}
    else { setFilterProducts(-1)}

  },[filterValue]);

const openModal = (id) => {
    setIsOpen(true);
    const testProduct = product.find(el=> el.id=id);
    setCurrentProduct(testProduct)
    console.log(testProduct)
    console.log(id)
}
const afterOpenModal=() =>{
    

};

const closeModal = () =>{
    setIsOpen(false)
}
console.log(currentPage)
console.log(product)

const visibleProducts = filterProducts !== -1 ? filterProducts : product


return (
<div className="app-container">
    <div>
        <table>
            <thead>
                <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Year</th>
                </tr>
            </thead>
            <tbody>
            {visibleProducts.length > 0 && visibleProducts
            // && visibleProducts.slice
            //     ((currentPage - 1) * pagePostsLimit, currentPage * pagePostsLimit)
            .map((d, i)=>{
            return <tr key={i} onClick={()=>openModal(d.id)} >
                <td style={{backgroundColor: d.color}}>{d.id}</td>
                <td style={{backgroundColor: d.color}}>{d.name}</td>
                <td style={{backgroundColor: d.color}}>{d.year}</td>
                </tr>
           
             })}
             
            </tbody>
        </table>
        <Pagination 
             currentPage={currentPage}
             itemsPerPage={pagePostsLimit}
             onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
             totalItems={12}
             pageNeighbours={2}
            />
            <Modal
            // details={product.find()}
            isOpen={modalIsOpen}
            ariaHideApp={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      ><p>{currentProduct.name}</p></Modal>
    </div>
</div>
)
}


    /* {getProduct.map((d)=> { return <div key={d.id} style={{backgroundColor: d.color}}>
  
    <div className='app-container'>
        <table>
            <thead>
                <tr>
                <th>Id {d.name}</th>
                <th>Name</th>
                <th>Year</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>12</td>
                <td>Ewa</td>
                <td>2012</td>
                </tr>
            </tbody>
        </table>
        </div>
        </div>})} */

export default Table;