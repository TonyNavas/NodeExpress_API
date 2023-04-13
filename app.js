const { error } = require("console");
const express = require("express");
const Product = require("./models/ProductModel");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.json({ mensaje: "¡Hola Mundo!" });
});

// Mostrar
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Buscar por id
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {}
});

// Guardar
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Editar
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    // Si no se encuentra el producto en la base de datos
    if (!product) {
      return res
        .status(404)
        .json({ message: `No se puede encontrar el producto con id ${id}` });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Eliminar

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `No se puede encontrar el producto con id ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:Admin123@tonyapi.xuv2gje.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conected to MongoDB");
    app.listen(3000, () => {
      console.log("listening on port", 3000);
    });
  })
  .catch((error) => {
    console.log(error);
  });
