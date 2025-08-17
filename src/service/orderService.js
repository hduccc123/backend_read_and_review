import db from '../models/models/index.js';

const createOrder = async (userId, orderDetails) => {
    let total = 0;
    const orderItems = [];
    for (const detail of orderDetails) {
        const book = await db.Book.findByPk(detail.book_id);
        if (book) {
            const item = {
                book_id: book.id,
                quantity: detail.quantity,
                price: book.price * detail.quantity
            };
            orderItems.push(item);
            total += item.price;
        }
    }
    const order = await db.Order.create({
        user_id: userId,
        total: total,
        details: orderItems
    });
    return order;
}

const getOrdersList = async (userId) => {
    const orders = await db.Order.findAll({
        where: { user_id: userId },
        include: [{ model: db.Book, as: 'details' }]
    });
    return orders;
}

const getOrderById = async (userId, orderId) => {
    const order = await db.Order.findOne({
        where: { id: orderId, user_id: userId },
        include: [{ model: db.Book, as: 'details' }]
    });
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
}


const updateOrderStatus = async (userId, orderId, status) => {
    const order = await db.Order.findOne({
        where: { id: orderId, user_id: userId }
    });
    if (!order) {
        throw new Error('Order not found');
    }
    order.status = status;
    await order.save();
    return order;
}

const deleteOrder = async (userId, orderId) => {
    const order = await db.Order.findOne({
        where: { id: orderId, user_id: userId }
    });
    if (!order) {
        throw new Error('Order not found');
    }
    await order.destroy();
    return order;
}

export default {
    createOrder,
    getOrdersList,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};