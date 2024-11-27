import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

const Listarticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  // Charger les articles
  const loadarticles = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/articles');
      setArticles(res.data);
      setIsloading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadarticles();
  }, []);

  // Supprimer un article
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await axios.delete(`https://backendecomgs1.vercel.app/api/api/articles/${id}`);
        setArticles(articles.filter((art) => art.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Affichage du loader si les données ne sont pas encore chargées
  if (isLoading) {
    return (
      <center>
        <ReactLoading type="spin" color="red" height={300} width={200} />
      </center>
    );
  }

  return (
    <div>
      <center>
        <h1>Liste des articles</h1>
      </center>
      <Link to="/articles/add">
        <button className="btn btn-success btn-sm">
          <i className="fa-solid fa-square-plus"></i> Ajouter
        </button>
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Désignation</th>
            <th>Marque</th>
            <th>Stock</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Sous catégorie</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((art) => (
            <tr key={art.id}>
              <td>{art.reference}</td>
              <td>{art.designation}</td>
              <td>{art.marque}</td>
              <td>{art.qtestock}</td>
              <td>{art.prix}</td>
              <td>
                <img src={art.imageart} alt="article" width={100} height={100} />
              </td>
              <td>{art.scategorieID}</td>
              <td>
                <Link to={`/articles/edit/${art.id}`}>
                  <button className="btn btn-warning btn-sm">
                    <i className="fa-solid fa-pen-to-square"></i> Update
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(art.id)}
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

export default Listarticles;
