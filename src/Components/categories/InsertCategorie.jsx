import axios from 'axios';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const InsertCategorie = () => {
  const [categorie, setCategorie] = useState({ nomCategorie: '', imageCategorie: '' });
  const navigate = useNavigate();

  // Gestion de la sauvegarde
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/categories', categorie);
      navigate('/categories');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la catégorie:', error);
    }
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h2 className="text-center mb-4">Insérer une Catégorie</h2>
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

export default InsertCategorie;
