const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    // console.log(title, description, price, quantity, categoryId, images);

    let category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: "Default Category Name",
        },
      });
      console.log("New Category Created:", category);
    }

    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: category.id,
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });

    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.listProduct = async (req, res) => {
  // ดึงข้อมูลสินค้าทั้งหมด
  try {
    const { count } = req.params; // จำนวนสินค้าที่ต้องการดึง
    const products = await prisma.product.findMany({
      // ดึงข้อมูลสินค้าทั้งหมด
      take: parseInt(count), // จำนวนสินค้าที่ต้องการดึง
      orderBy: { createdAt: "desc" }, // จัดเรียงจากวันที่สร้างล่าสุด
      include: {
        category: true, // รวมข้อมูลหมวดหมู่
        images: true, // รวมข้อมูล
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    console.log(title, description, price, quantity, categoryId, images);

    // ตรวจสอบว่า categoryId มีอยู่ในฐานข้อมูลหรือไม่
    let category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!category) {
      // สร้างหมวดหมู่ใหม่หากไม่พบ categoryId
      category = await prisma.category.create({
        data: {
          name: "Default Category Name",
        },
      });
      console.log("New Category Created:", category);
    }

    // ลบรูปภาพเก่า
    await prisma.image.deleteMany({
      where: {
        productId: parseInt(id),
      },
    });

    // อัพเดทข้อมูลสินค้า
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: category.id,
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });

    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // remove image
    const product = await prisma.product.findFirst({
      where: { id: Number(id) },
      include: { images: true },
    });
    // console.log(product);

    if (!product) {
      return res.status(401).json({ message: "Product not found!" });
    }

    const deletedImage = product.images
      .map((image) => new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(image.public_id, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      }))

    await Promise.all(deletedImage)
    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.send("Delete product");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.readProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.listProductById = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    // console.log(sort, order, limit);
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: {
        [sort]: order,
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const handleQuery = async (req, res, query) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    console.log(products)
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Search Error" });
  }
};

const handleCategory = async (req, res, categoryId) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: {
          in: categoryId.map((id) => Number(id)),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Search Error" });
  }
};

const handlePrice = async (req, res, priceRange) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: priceRange[0],
          lte: priceRange[1],
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Search Error" });
  }
};

exports.searchFilters = async (req, res) => {
  try {
    const { query, category, price } = req.body;
    
    if (query) {
      console.log("Search Query", query);
      await handleQuery(req, res, query);
    }
    
    if (category) {
      console.log("Search Query", category);
      await handleCategory(req, res, category);
    }
    
    if (price) {
      console.log("Search Query", price);
      await handlePrice(req, res, price);
    }

    // res.send("searchFilters");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createImages = async (req, res) => {
  try {
    const images = req.body.images;
    const result = await cloudinary.uploader.upload(images, {
      public_id: `${Date.now()}`,
      result_type: "auto",
      folder: "Ecommerce",
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.removeImage = async (req, res) => {
  try {
    const public_id = req.body.public_id;
    cloudinary.uploader.destroy(public_id, () => {
      res.send("Romove success!!");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
