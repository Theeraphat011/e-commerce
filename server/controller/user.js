const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
      },
    });
    res.send(users);
    // res.status(200).json({ message: 'getAllUsers' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;
    // console.log(id, enabled);
    const users = await prisma.user.update({
      where: { id: Number(id) },
      data: { enabled: enabled },
    });
    res.send("Update Status Seccessfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body;
    const users = await prisma.user.update({
      where: { id: Number(id) },
      data: { role: role },
    });
    res.send("Update Role Seccessfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const user = await prisma.user.findFirst({
      where: { id: Number(req.user.id) },
    });

    await prisma.productOnCart.deleteMany({
      where: { cart: { orderById: user.id } },
    });

    await prisma.cart.deleteMany({
      where: { orderById: user.id },
    });

    //เตรียมสินค้า
    let products = cart.map((item) => ({
      productId: item.id,
      count: item.count,
      price: item.price,
    }));

    //ราคาสินค้าทั้งหมด
    let cartTotal = products.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    // New cart
    const newCart = await prisma.cart.create({
      data: {
        products: { create: products },
        cartTotal: cartTotal,
        orderById: user.id,
      },
    });

    // debug
    // console.log(cart);
    // console.log(user);
    console.log(newCart);
    // console.log(req.user.id);
    res.status(200).json({ message: "Create Cart Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderById: Number(req.user.id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    // console.log(user);
    res.json({
      products: cart.products,
      cartTotal: cart.cartTotal,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { orderById: Number(req.user.id) },
    });

    if (!cart) {
      return res.status(400).json({ message: "No cart" });
    }

    await prisma.productOnCart.deleteMany({
      where: { cartId: cart.id },
    });

    const result = await prisma.cart.deleteMany({
      where: { orderById: Number(req.user.id) },
    });

    console.log(result);
    res.status(200).json({
      message: "Emptycart Success",
      deletedCount: result.count,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const { address } = req.body;

    const addressUser = await prisma.user.update({
      where: {
        id: Number(req.user.id),
      },
      data: {
        address: address,
      },
    });

    res.status(200).json({ ok: true, message: "Address updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.saveOrder = async (req, res) => {
  try {
    // get usercart
    const userCart = await prisma.cart.findFirst({
      where: { orderById: Number(req.user.id) },
      include: {
        products: true,
      },
    });

    // Check Cart empty
    if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({ ok: false, message: "Cart is empty" });
    }

    // Check quantity
    for (const item of userCart.products) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { quantity: true, title: true },
      });

      //   console.log(product);
      //   console.log(item);

      if (!product || item.count > product.quantity) {
        return res.status(400).json({
          ok: false,
          message: `Product ${product.title} not enough quantity`,
        });
      }
    }

    // Create new order
    const order = await prisma.order.create({
      data: {
        products: {
          create: userCart.products.map((item) => ({
            productId: item.productId,
            count: item.count,
            price: item.price,
          })),
        },
        orderBy: {
          connect: { id: req.user.id },
        },
        cartTotal: userCart.cartTotal,
      },
    });

    // Update quantity
    const update = userCart.products.map((item) => ({
      where: { id: item.productId },
      data: {
        quantity: { decrement: item.count },
        sold: { increment: item.count },
      },
    }));

    console.log(update);

    await Promise.all(update.map((updated) => prisma.product.update(updated)));

    // Delete cart
    await prisma.cart.deleteMany({
      where: { orderById: Number(req.user.id) },
    });

    res.status(200).json({ ok: true, message: "save order success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { orderById: Number(req.user.id) },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (orders.length === 0) {
      return res.status(400).json({ ok: false, message: "No order" });
    }

    console.log(orders);
    res.status(200).json({ Ok: true, orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
