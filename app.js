const sequelize = require('./config/database');
const Producto = require('./models/producto');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');

    await sequelize.sync();
    console.log('Tabla sincronizada correctamente');

    console.log('\n--- CREATE ---');
    const nuevoProducto = await Producto.create({
      nombre: 'Laptop',
      precio: 1200.5,
    });
    console.log('Producto creado:', nuevoProducto.toJSON());

    console.log('\n--- READ ALL ---');
    const productos = await Producto.findAll();
    console.log(productos.map((p) => p.toJSON()));

    console.log('\n--- READ BY PK ---');
    const productoEncontrado = await Producto.findByPk(nuevoProducto.id);
    console.log(productoEncontrado ? productoEncontrado.toJSON() : 'No encontrado');

    console.log('\n--- UPDATE ---');
    await Producto.update(
      { precio: 1150 },
      { where: { id: nuevoProducto.id } }
    );

    const productoActualizado = await Producto.findByPk(nuevoProducto.id);
    console.log(productoActualizado ? productoActualizado.toJSON() : 'No encontrado');

    console.log('\n--- DELETE ---');
    await Producto.destroy({
      where: { id: nuevoProducto.id },
    });
    console.log('Producto eliminado');

    console.log('\n--- ESTADO FINAL ---');
    const productosFinales = await Producto.findAll();
    console.log(productosFinales.map((p) => p.toJSON()));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
    console.log('\nConexión cerrada');
  }
}

main();