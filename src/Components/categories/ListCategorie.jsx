import axios from 'axios';
import  { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

const ListCategorie = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les catégories
  const getCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/categories');
      setCategories(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Supprimer une catégorie
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await axios.delete(`http://localhost:8000/api/categories/${id}`);
        setCategories(categories.filter((cat) => cat.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Loader en cas de chargement
  if (isLoading) {
    return (
      <center>
        <ReactLoading type="spinningBubbles" color="red" height={300} width={200} />
      </center>
    );
  }

  return (
    <div>
      <Link to="/categories/add">
        <button className="btn btn-success btn-sm">
          <i className="fa-solid fa-square-plus"></i> Nouveau
        </button>
      </Link>
      <center>
        <h1>Liste des catégories</h1>
      </center>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom Catégorie</th>
            <th>Image Catégorie</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.nomcategorie}</td>
              <td>
                <img
                  src={cat.imagecategorie}
                  alt={`Catégorie: ${cat.nomcategorie}`}
                  width={100}
                  height={100}
                />
              </td>
              <td>
                <Link to={`/categories/edit/${cat.id}`}>
                  <button className="btn btn-warning btn-sm">
                    <i className="fa-regular fa-pen-to-square"></i> Update
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cat.id)}
                >
                  <i className="fa-solid fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategorie;
