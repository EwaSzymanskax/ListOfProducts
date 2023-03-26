import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useSearchParams} from "react-router-dom";
import { Pagination } from 'react-pagination-bar';
import './Table.css';
import 'react-pagination-bar/dist/index.css';
import Modal from 'react-modal';


const Table = ({filterValue}) => {

const [product, setProduct] = useState([]);
const [filterProducts, setFilterProducts] = useState(-1)
const [currentPage, setCurrentPage] = useState(1);
const [modalIsOpen, setIsOpen] = useState(false);
const [currentProduct, setCurrentProduct] = useState('') 
const pagePostsLimit = 5;
const navigate = useNavigate();
const [searchParams] = useSearchParams();

useEffect(() => {
    const pageFromURL= searchParams.get('page');
    if(pageFromURL){
        setCurrentPage(Number(pageFromURL))
    } else { navigate({
    pathname: '/',
    search: `?page=1`,
  });}
},[searchParams, navigate])

useEffect(() => { 
    const getProduct = () => { Axios.get (`https://reqres.in/api/products?page=${currentPage}&per_page=${pagePostsLimit}`).then((response) => { 
    setProduct(response.data.data)
    
    })
    .catch((error) => {
        console.log("error", error.message);
        alert('an error has occurred!')
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
    const testProduct = product.find((el) => el.id === id);
    setCurrentProduct(testProduct)
}

const closeModal = () =>{
    setIsOpen(false);
}

const visibleProducts = filterProducts !== -1 ? filterProducts : product

const handlePageChange=(pageNumber) => {
    navigate({
        pathname: '/',
        search: `?page=${pageNumber}`,
      });
      setCurrentPage(pageNumber);
}

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
            .map((d, i)=>{
            return <tr key={i} onClick={() => openModal(d.id)} >
                <td style={{backgroundColor: d.color}}>{d.id}</td>
                <td style={{backgroundColor: d.color}}>{d.name}</td>
                <td style={{backgroundColor: d.color}}>{d.year}</td>
                </tr>
           
             })}
             
            </tbody>
        </table>
        <Pagination className='pagination'
             currentPage={currentPage}
             itemsPerPage={pagePostsLimit}
             onPageChange={(pageNumber)=>handlePageChange(pageNumber)}
             totalItems={12}
             pageNeighbours={0}
            />
        <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ><div>
                <button onClick={closeModal}>X</button>
                <table>
                    <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Color</th>
                    <th>Pantone value</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                        <td style={{backgroundColor: currentProduct.color}}>{currentProduct.id}</td>
                        <td style={{backgroundColor: currentProduct.color}}>{currentProduct.name}</td>
                        <td style={{backgroundColor: currentProduct.color}}>{currentProduct.year}</td>
                        <td style={{backgroundColor: currentProduct.color}}>{currentProduct.color}</td>
                        <td style={{backgroundColor: currentProduct.color}}>{currentProduct.pantone_value}</td>
                        </tr>
                    </tbody>
                </table>
        
            </div>
        </Modal>
    </div>   
</div>

)
}
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default Table;