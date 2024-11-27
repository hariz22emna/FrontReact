import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Insertarticle = () => {
  const [scategories, setScategories] = useState([]);
  const [article, setArticle] = useState({});
  const navigate = useNavigate();

  // Charger les sous-catégories
  const loadscategories = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/scategories');
      setScategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Charger les données au démarrage
  useEffect(() => {
    loadscategories();
  }, []);

  // Gestion de la sauvegarde de l'article
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/articles', article).then(() => {
        navigate('/articles');
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <center>
        <h1>Insérer un article</h1>
      </center>
      <Form>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Référence</Form.Label>
            <Form.Control
              type="text"
              placeholder="Référence"
              value={article.reference || ''}
              onChange={(e) => setArticle({ ...article, reference: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} mb="6">
            <Form.Label>Désignation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Désignation"
              value={article.designation || ''}
              onChange={(e) => setArticle({ ...article, designation: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Marque</Form.Label>
            <Form.Control
              type="text"
              placeholder="Marque"
              value={article.marque || ''}
              onChange={(e) => setArticle({ ...article, marque: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} mb="6">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="text"
              placeholder="Stock"
              value={article.qtestock || ''}
              onChange={(e) => setArticle({ ...article, qtestock: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type="text"
              placeholder="Prix"
              value={article.prix || ''}
              onChange={(e) => setArticle({ ...article, prix: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} mb="6">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image"
              value={article.imageart || ''}
              onChange={(e) => setArticle({ ...article, imageart: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Sous Catégorie</Form.Label>
            <Form.Control
              as="select"
              placeholder="Sous Catégorie"
              value={article.scategorieID || ''}
              onChange={(e) => setArticle({ ...article, scategorieID: e.target.value })}
            >
              {scategories.map((scat) => (
                <option key={scat.id} value={scat.id}>
                  {scat.nomscategorie}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
      </Form>
      <button className="btn btn-success btn-sm" onClick={handleSave}>
        <i className="fa-solid fa-floppy-disk"></i> Enregistrer
      </button>
      &nbsp;
      <Link to="/articles">
        <button className="btn btn-danger btn-sm">
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Annuler
        </button>
      </Link>
    </div>
  );
};

export default Insertarticle;
