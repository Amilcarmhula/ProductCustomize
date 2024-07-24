const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mymongodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', function() {
  console.log('Conectado ao MongoDB com sucesso!');
});

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nome: String,
  email: String,
  idade: Number,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

const novoUsuario = new Usuario({
  nome: 'João Silva',
  email: 'joao.silva@example.com',
  idade: 30
});

novoUsuario.save((err) => {
  if (err) return console.error(err);
  console.log('Usuário salvo com sucesso!');

  Usuario.find({}, (err, usuarios) => {
    if (err) return console.error(err);
    console.log(usuarios);

    Usuario.updateOne({ nome: 'João Silva' }, { idade: 31 }, (err, res) => {
      if (err) return console.error(err);
      console.log('Usuário atualizado com sucesso!');

      Usuario.deleteOne({ nome: 'João Silva' }, (err) => {
        if (err) return console.error(err);
        console.log('Usuário deletado com sucesso!');
      });
    });
  });
});
