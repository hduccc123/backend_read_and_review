import orderService from "../service/orderService";

const index = async (req, res) => {
    // Controller logic for handling requests
    const userId = req.body.userId;
    try {
        const orders = await orderService.getOrdersList(userId);
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const show = async (req, res) => {
    const userId = req.body.userId;
    const orderId = req.params.id;
    try {
        const order = await orderService.getOrderById(userId, orderId);
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const create = async (req, res) => {
    const userId = req.body.userId;
    const orderDetails = req.body.orderDetails;
    try {
        const order = await orderService.createOrder(userId, orderDetails);
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateStatus = async (req, res) => {
    const userId = req.body.userId;
    const orderId = req.params.id;
    const status = req.body.status;
    try {
        const order = await orderService.updateOrderStatus(userId, orderId, status);
        res.json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const destroy = async (req, res) => {
    const userId = req.body.userId;
    const orderId = req.params.id;
    try {
        const order = await orderService.deleteOrder(userId, orderId);
        res.json(order);
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default {
    index,
    show,
    create,
    updateStatus,
    destroy
};