import { Request, Response } from 'express';
import Order from '../models/orders.model';
import IOrder from '../interfaces/orders.interface';
import mongoose from 'mongoose';

const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderData: IOrder = req.body;
        await Order.create(orderData);
        res.status(201).json({
            message: 'Order created successfuly'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating order',
            error
        });
    }
};

const getOrders = async (req: Request, res: Response): Promise<any> => {
    const order_id = req.params.id;

    try {
        if (order_id) {
            if (!mongoose.Types.ObjectId.isValid(order_id)) {
                return res.status(400).json({
                    message: 'Invalid _id format'
                });
            }

            const order = await Order.findById(order_id).populate('user').populate('items.product');
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            return res.status(200).json(order);
        } else {
            const orders = await Order.find({}).populate('user').populate('items.product');
            return res.status(200).json(orders);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching orders',
            error
        });
    }
};

const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updates: Partial<IOrder> = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedOrder) {
            res.status(404).json({
                message: 'Order not found'
            });
            return;
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({
            message: 'Error updating order',
            error
        });
    }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { order_id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(order_id);
        if (!deletedOrder) {
            res.status(404).json({
                message: 'Order not found'
            });
            return;
        }
        res.status(200).json({
            message: 'Order deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting order',
            error
        });
    }
};

export { createOrder, getOrders, updateOrder, deleteOrder };