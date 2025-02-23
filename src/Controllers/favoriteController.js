import FavoritosModel from '../Models/favoriteModel.js';

class FavoritosController {
  static async getAll(req, res) {
    try {
      const favoritos = await FavoritosModel.getAllByUser(req.user.id_usuario);
      res.json(favoritos);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los favoritos' });
    }
  }

  static async add(req, res) {
    const { id_producto } = req.body;

    if (!id_producto) {
      return res.status(400).json({ error: 'El ID del producto es obligatorio' });
    }

    try {
      const favorito = await FavoritosModel.add(req.user.id_usuario, id_producto);
      res.status(201).json(favorito);
    } catch (err) {
      res.status(500).json({ error: 'Error al agregar el producto a favoritos' });
    }
  }

  static async remove(req, res) {
    const { id_favorito } = req.params;

    try {
      const favoritoEliminado = await FavoritosModel.remove(req.user.id_usuario, id_favorito);

      if (!favoritoEliminado) {
        return res.status(404).json({ error: 'Favorito no encontrado' });
      }

      res.json({ message: 'Producto eliminado de favoritos' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el favorito' });
    }
  }
}

export default FavoritosController;
