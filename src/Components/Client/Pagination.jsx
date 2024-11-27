const Pagination = 
({
    handlePrevPage,
    handleNextPage,
    handlePageChange,
    totalPages,
    currentPage,
  }) => {
    return (
      <div className="pagination">
        {/* Bouton Précédent */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
  
        {/* Liens de pagination */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={currentPage === index + 1 ? 'page-link active' : 'page-link'}
          >
            {index + 1}
          </button>
        ))}
  
        {/* Bouton Suivant */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  