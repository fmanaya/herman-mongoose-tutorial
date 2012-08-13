// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/supermercado'
  , db              = mongoose.createConnection(db_lnk)

// Creación de variables para cargar el modelo
var producto_schema = require('../models/producto')
  , Producto = db.model('Producto', producto_schema)

exports.index = function (req, res, next) {

  Producto.find(gotProducts)

  // NOTA: Creo que es bueno usar verbos en inglés para las funciones,
  //       por lo cómodo que son en estos casos (get, got; find, found)
  function gotProducts (err, productos) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.render('index', {title: 'Lista de Productos', productos: productos})
  }
}

exports.show_edit = function (req, res, next) {
  Producto.findById(req.params.id, function(error, prod){
        if(error) throw error;
        res.render('edit', { title: "Notes Mongo", postpath: "/note/"+req.params.id, producto:prod });
        //res.send('show_edit '+  req.params.id + producto.nombre);
    });  
  
  
}

exports.update = function (req, res, next) {
  Producto.findById(req.body._id, function(error, prod){
        if(error) throw error;
        prod.nombre = req.body.nombre;
        prod.descripcion = req.body.descripcion;
        prod.precio = req.body.precio;
 
        prod.save(function(err) {
          if (err)
            console.log('error');
          else {
            console.log('success');
            res.redirect('/');
          }
        });  
        
        
        //res.render('edit', { title: "Notes Mongo", postpath: "/note/"+req.params.id, producto:prod });
        //res.send('show_edit '+  req.params.id + producto.nombre);
    });

  
  //res.send('update' +  req.body._id +'*' + req.body.nombre);
}

exports.remove = function (req, res, next) {
  res.send('remove')
}

exports.create = function (req, res, next) {
  res.send('create')
}
