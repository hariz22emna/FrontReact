import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditScategorie = () => {
  const [scategorie, setScategorie] = useState({ nomscategorie: '', imagescategorie: '' });
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID de la sous-catégorie depuis l'URL

  // Charger les données de la sous-catégorie
  const loadScategorie = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/scategories/${id}`);
      setScategorie(res.data);
    } catch (error) {
      console.error('Erreur lors du chargement de la sous-catégorie:', error);
    }
  };

  // Mettre à jour les données
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/scategories/${id}`, scategorie);
      navigate('/scategories'); // Redirige vers la liste des sous-catégories après la mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la sous-catégorie:', error);
    }
  };

  // Charger les données de la sous-catégorie à l'ouverture
  useEffect(() => {
    loadScategorie();
  }, []);

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h2 className="text-center mb-4">Modifier une Sous-Catégorie</h2>
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3">
          <Form.Label>Nom Sous-Catégorie</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom de la sous-catégorie"
            required
            value={scategorie.nomscategorie}
            onChange={(e) => setScategorie({ ...scategorie, nomscategorie: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image Sous-Catégorie</Form.Label>
          <Form.Control
            type="text"
            placeholder="Lien de l'image de la sous-catégorie"
            required
            value={scategorie.imagescategorie}
            onChange={(e) => setScategorie({ ...scategorie, imagescategorie: e.target.value })}
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success btn-sm">
            <i className="fa-solid fa-floppy-disk"></i> Enregistrer
          </button>
          <Link to="/scategories">
            <button type="button" className="btn btn-danger btn-sm">
              <i className="fa-solid fa-rectangle-xmark"></i> Annuler
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default EditScategorie;
