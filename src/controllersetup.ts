import { Request, Response } from 'express';
import pool from './database';

export const createProduct = async (req: Request, res: Response) => {
  const { name, content, category } = req.body;
  const [result] = await pool.execute('INSERT INTO products (name, content, category) VALUES (?, ?, ?)', [name, content, category]);
  res.status(201).json({ id: result.insertId, name, content, category });
};

export const getProducts = async (_req: Request, res: Response) => {
  const [rows] = await pool.query('SELECT * FROM products');
  res.json(rows);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(rows[0]);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, content, category } = req.body;
  await pool.execute('UPDATE products SET name = ?, content = ?, category = ? WHERE id = ?', [name, content, category, id]);
  res.json({ message: 'Product updated' });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.execute('DELETE FROM products WHERE id = ?', [id]);
  res.json({ message: 'Product deleted' });
};
