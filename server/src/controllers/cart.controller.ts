import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import ICart from '../interfaces/cart.interface';
import mongoose from 'mongoose';

const createCart = async (req: Request, res: Response): Promise<Response> => {
    try {
        const cart: ICart = req.body;
        const newCart = await Cart.create(cart);

        return res.status(201).json({
            message: 'Cart created successfully',
            data: newCart,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating cart',
            error: error instanceof Error ? error.message : error,
        });
    }
};

const getCarts = async (req: Request, res: Response): Promise<Response> => {
    const { cart_id } = req.params;

    try {
        if (cart_id) {
            if (!mongoose.Types.ObjectId.isValid(cart_id)) {
                return res.status(400).json({
                    message: 'Invalid _id format'
                });
            }

            const cart = await Cart.findById(cart_id).populate('user').populate('items.product');
            if (!cart) {
                return res.status(404).json({
                    message: 'Cart not found'
                });
            }

            return res.status(200).json({
                message: 'Cart retrieved successfully',
                data: cart,
            });
        } else {
            const carts = await Cart.find({});
            return res.status(200).json(carts);
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching cart',
            error: error instanceof Error ? error.message : error,
        });
    }
}

const updateCart = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedCart = await Cart.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        }).populate('user').populate('items.product');

        if (!updatedCart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        return res.status(200).json({
            message: 'Cart updated successfully',
            data: updatedCart,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating cart',
            error: error instanceof Error ? error.message : error,
        });
    }
};

const deleteCart = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const deletedCart = await Cart.findByIdAndDelete(id);

        if (!deletedCart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        return res.status(200).json({
            message: 'Cart deleted successfully',
            data: deletedCart,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting cart',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export {
    createCart,
    getCarts,
    updateCart,
    deleteCart
}
