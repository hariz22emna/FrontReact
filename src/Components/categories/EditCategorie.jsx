import axios from 'axios';
import  { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditCategorie = () => {
  const [categorie, setCategorie] = useState({ nomCategorie: '', imageCategorie: '' });
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID de la catégorie depuis l'URL

  // Charger les données de la catégorie
  const loadCategorie = async () => {
    try {
      const res = await axios.get(`https://laravel-omega-swart.vercel.app/api/api/categories/${id}`);
      setCategorie(res.data);
    } catch (error) {
      console.error('Erreur lors du chargement de la catégorie:', error);
    }
  };

  // Mettre à jour les données
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://laravel-omega-swart.vercel.app/api/api/categories/${id}`, categorie);
      navigate('/categories'); // Redirige vers la liste des catégories après la mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
    }
  };

  // Charger les données de la catégorie à l'ouverture
  useEffect(() => {
    loadCategorie();
  }, []);

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h2 className="text-center mb-4">Modifier la Catégorie</h2>
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3">
          <Form.Label>Nom Catégorie</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom de la catégorie"
            required
            value={categorie.nomCategorie}
            onChange={(e) => setCategorie({ ...categorie, nomCategorie: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image Catégorie</Form.Label>
          <Form.Control
            type="text"
            placeholder="Lien de l'image de la catégorie"
            required
            value={categorie.imageCategorie}
            onChange={(e) => setCategorie({ ...categorie, imageCategorie: e.target.value })}
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success btn-sm">
            <i className="fa-solid fa-floppy-disk"></i> Enregistrer
          </button>
          <Link to="/categories">
            <button type="button" className="btn btn-danger btn-sm">
              <i className="fa-solid fa-rectangle-xmark"></i> Annuler
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default EditCategorie;
