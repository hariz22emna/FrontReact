import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la navigation
import axios from 'axios';

const ListScategorie = () => {
  const [scategories, setScategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Hook de navigation

  // Récupérer toutes les sous-catégories
  const getScategories = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/scategories');
      setScategories(res.data);
      setIsLoading(false);
      console.log(res.data);
    } catch (error) {
      console.log('Erreur lors de la récupération des sous-catégories:', error);
    }
  };

  // Supprimer une sous-catégorie
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?')) {
      try {
        await axios.delete(`http://localhost:8000/api/scategories/${id}`);
        setScategories(scategories.filter((scat) => scat.id !== id)); // Met à jour la liste localement
        alert('Sous-catégorie supprimée avec succès !');
      } catch (error) {
        console.error('Erreur lors de la suppression de la sous-catégorie:', error);
        alert('La suppression a échoué.');
      }
    }
  };

  // Gérer la modification (redirection vers la page de modification)
  const handleEdit = (id) => {
    navigate(`/scategories/edit/${id}`); // Redirige vers la page de modification
  };

  // Charger les sous-catégories au montage du composant
  useEffect(() => {
    getScategories();
  }, []);

  if (isLoading) {
    return <div>En Cours De Chargement...</div>;
  }

  return (
    <div>
      <h1 className="text-center my-4">Liste des Sous-Catégories</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom Sous-Catégorie</th>
            <th>Image Sous-Catégorie</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {scategories.map((scat) => (
            <tr key={scat.id}>
              <td>{scat.nomscategorie}</td>
              <td>
                <img
                  src={scat.imagescategorie}
                  alt="Sous-catégorie"
                  width={100}
                  height={100}
                />
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(scat.id)} // Appeler la fonction handleEdit avec l'ID
                >
                  <i className="fa-regular fa-pen-to-square"></i> Modifier
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(scat.id)} // Appeler la fonction handleDelete avec l'ID
                >
                  <i className="fa-solid fa-trash"></i> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListScategorie;
