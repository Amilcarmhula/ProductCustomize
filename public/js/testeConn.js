const mongoose = require('mongoose');


async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mymongodb');
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro de conexão:', error);
  }
}

async function disconnectDB() {
    try {
      await mongoose.disconnect();
      console.log('Desconectado do MongoDB com sucesso!');
    } catch (error) {
      console.error('Erro ao desconectar:', error);
    }
  }

// connectDB();

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nome: String,
  email: String,
  idade: Number,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

async function main() {
    await connectDB()
  const novoUsuario = new Usuario({
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    idade: 30,
  });

  try {
    await novoUsuario.save();
    console.log('Usuário salvo com sucesso!');

    const usuarios = await Usuario.find({});
    console.log(usuarios);

    // await Usuario.updateOne({ nome: 'João Silva' }, { idade: 31 });
    // console.log('Usuário atualizado com sucesso!');

    // await Usuario.deleteOne({ nome: 'João Silva' });
    // console.log('Usuário deletado com sucesso!');
  } catch (error) {
    console.error('Erro:', error);
  }
await disconnectDB()
}

main();

