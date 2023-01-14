import React, { useState } from 'react';
import Axios from 'axios';
import { Pagination } from 'react-pagination-bar';
import './Table.css';
import 'react-pagination-bar/dist/index.css';
// import Filter from './Filter';

const Table = () => {

const [product, setProduct] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const pagePostsLimit = 5;

const getProduct = () => { Axios.get("https://reqres.in/api/products").then((response) => { 
setProduct(response.data.data)

})}
console.log(currentPage)
  
return (
<div className="app-container">
    <div > 
        <table onClick={getProduct}>
            <thead>
                <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Year</th>
                </tr>
            </thead>
            <tbody>
            {product.length > 0 
            && product.slice
                ((currentPage - 1) * pagePostsLimit, currentPage * pagePostsLimit)
            .map((d, i)=>{
            return <tr  key={i}>
                <td style={{backgroundColor: d.color}}>{d.id}</td>
                <td style={{backgroundColor: d.color}}>{d.name}</td>
                <td style={{backgroundColor: d.color}}>{d.year}</td>
                </tr>
           
             })}
             <Pagination 
             currentPage={currentPage}
             itemsPerPage={pagePostsLimit}
             onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
             totalItems={product.length}
             pageNeighbours={2}
            />
            </tbody>
        </table>
        
        

        
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