import axios from 'axios';
import  { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const InsertScategorie = () => {
  const [scategorie, setScategorie] = useState({ nomscategorie: '', imagescategorie: '' });
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/scategories', scategorie);
      navigate('/scategories'); // Redirection vers la liste des sous-catégories
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la sous-catégorie:', error);
    }
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h2 className="text-center mb-4">Ajouter une Sous-Catégorie</h2>
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

export default InsertScategorie;
