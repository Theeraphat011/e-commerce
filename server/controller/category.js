const prisma = require("../config/prisma");

exports.createCategory = async (req, res) => {
  try {
    await prisma.$executeRaw`ALTER TABLE category AUTO_INCREMENT = 1`;
    const { name } = req.body;
    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.listCategory = async (req, res) => {
  try {
    const category = await prisma.category.findMany();
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: {
        id: Number(id), // Convert id to number
      },
    });
    await prisma.$executeRaw`ALTER TABLE category AUTO_INCREMENT = 1`;
    res.send("Delete category");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
