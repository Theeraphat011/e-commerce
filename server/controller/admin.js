const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.changeOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;
    const orderUpdate = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: orderStatus,
      },
    });
    console.log(orderId, orderStatus);
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

exports.getOrderAdmin = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
        orderBy: {
          select: {
            id: true,
            email: true,
            address: true,
          },
        },
      },
    });

    console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};
