const { Router } = require("express");
const createOrderRules = require("./middlewares/create-orders-rules");
const updateOrderRules = require("./middlewares/update-orders-rules");
const OrderModel = require("./orders-model");

const ordersRoute = Router();

ordersRoute.get("/orders", async (req, res) => {
    const allOrders = await OrderModel.find();

    res.json(allOrders ? allOrders : []);
});

ordersRoute.get("/orders/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const maybeOrder = await OrderModel.findById(id);

        if (!maybeOrder) {
            res.status(404).send("Order not found");
        } else {
            res.status(200).json(maybeOrder);
        }
    } catch (e) {
        res.status(500).send("Unable to get order by id");
    }
});

ordersRoute.post("/orders", createOrderRules, async (req, res) => {
    try {
        const newOrder = await OrderModel.create({
            ...req.body,
        });

        res.status(200).json(newOrder);
    } catch (e) {
        res.status(500).send("Unable to add order");
    }
});

ordersRoute.put("/orders/:id", updateOrderRules, async (req, res) => {
    const orderId = req.params.id;

    try {
        const orderExists = await OrderModel.exists({ _id: orderId });

        if (!orderExists) {
            res.status(404).send("Order not found");
        } else {
            const updatedOrder = await OrderModel.findByIdAndUpdate(
                orderId,
                req.body,
                { new: true }
            );

            if (!updatedOrder) {
                res.status(500).send("Unable to update order");
            } else {
                res.status(200).json(updatedOrder);
            }
        }
    } catch (e) {
        res.status(500).send("Unable to update order");
    }
});

ordersRoute.delete("/orders/:id", async (req, res) => {
    const orderId = req.params.id;

    try {
        const maybeOrder = await OrderModel.findById(orderId);

        if (!maybeOrder) {
            res.status(404).send("Order not found");
        } else {
            const deletedOrder = await OrderModel.deleteOne({
                _id: orderId,
            });

            if (!deletedOrder) {
                res.status(500).send("Unable to delete order");
            } else {
                res.status(200).json(maybeOrder);
            }
        }
    } catch (e) {
        res.status(500).send("Unable to delete order");
    }
});

module.exports = { ordersRoute };
