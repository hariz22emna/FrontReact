import axios from 'axios';
import { useEffect, useState } from 'react';
import  Card  from './Card';
import ReactLoading from 'react-loading';
import Pagination from './Pagination';
const Listarticlescard = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const[pageSize,setPageSize]=useState(18);
    const[currentPage,setCurrentPage]=useState(1); 
    const[totalPages,setTotalPages]=useState(1); 

    // Charger les articles
    const loadarticles = async (pageSize,page) => {
      try {
        const res = await axios.get(`http://localhost:8000/api/articles/art/articlespaginate?pagesize=${pageSize}&page=${page}`);
        setArticles(res.data.products);
        setIsloading(false);
        setTotalPages(res.data.totalPages);
        
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      loadarticles(pageSize,currentPage);

    }, [currentPage,pageSize]);
    const handlePrevPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
        };
        const handleNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
        };
        const handlePageChange = (page) => {
        setCurrentPage(page);
        };
  

  
    if (isLoading) {
      return(
      <center>
      <ReactLoading type="spin" color="red" height={300} width={200} />
    </center>)}
  return (
    <>
        <div className="card-container">
{
    articles.map((art,index)=>
    <Card article={art} key={index}/> 
    )}

    </div>
    <Pagination handlePrevPage={handlePrevPage}
    handleNextPage={handleNextPage}
    handlePageChange={handlePageChange}
    totalPages={totalPages}
    currentPage ={currentPage }
    />
    

    </>

  )
}

export default Listarticlescard
