'use strict'

const USERSCONF = './users.conf';

const fs = require('fs')

const listartodos = async (req, res) => {
  let retorno = true

  try {
    const data = fs.readFileSync(USERSCONF, 'utf8')
    // const data é usado para ler o conteúdo de um arquivo de texto síncrono e armazenar esse conteúdo na variável data.
    
    return res.json(data);

  } catch (err) {

    return res.status(404).json({ error: 'Sem usuario' });
  }
};

const buscarusuario = async (req, res) => {
  const usuarioDesejado = req.params.usuario; 
// 'usuarioDesejado' variável que representa o nome de usuário que eu desejo encontrar ou verificar.
// 'usuario' esta é a variável que representa o nome de usuário lido de uma linha no arquivo users.conf
  try {
    const data = fs.readFileSync(USERSCONF, 'utf8');
    // const data é usado para ler o conteúdo de um arquivo de texto síncrono e armazenar esse conteúdo na variável data.
    
    const linhas = data.split('\n');
    //divide uma string data em um array de substrings usando o caractere de nova linha ('\n') como separador
    //resultado desse código é a criação de um array chamado linhas, onde serão armazenados novos dados.
    
    for (const linha of linhas) {
      const [usuario, senha, grupo] = linha.split(':');
      // divide uma string em várias linhas com base no caractere de nova linha ('\n')
      if (usuario === usuarioDesejado) { // verifica se duas variáveis são iguais
        // Encontra o usuário, pode retornar as informações ou fazer o que for necessário
        return res.status(200).json({ userId: usuario, pass: senha, groupId: grupo });
      }
    }

    return res.status(404).json({ error: 'Usuário não cadastrado!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


const atualizausuario = async (req, res) => {
  const usuarioDesejado = req.params.usuario;
  const { senhaNova, grupoNovo } = req.body; // Suponhamos que você queira atualizar a senha e o grupo.

  try {
    const data = fs.readFileSync(USERSCONF, 'utf8');
    const linhas = data.split('\n');
    let novoConteudo = '';

    for (const linha of linhas) {
      const [usuario, senhaAtual, grupoAtual] = linha.split(':');
      //percorre cada elemento do array separando eles por (dois pontos)
      //Ele atribui os elementos do array retornado por linha.split(':') a três variáveis diferentes 

      if (usuario === usuarioDesejado) {
        // Encontrou o usuário, atualiza as informações
        novoConteudo += `${usuario}:${senhaNova}:${grupoNovo}\n`; //responsável por criar uma nova linha de conteúdo no formato
        //novoConteudo += ...: adiciona uma nova linha ao conteúdo novoConteúdo. 
        //O operador += é usado para concatenar strings.
      } else {
        // Mantenha as outras linhas inalteradas
        novoConteudo += linha + '\n';
      }
    }

    //executa operações de manipulação de 'arquivo síncronas' 
    const fd = fs.openSync(USERSCONF, 'w');
    //abre o arquivo especificado em modo de escrita ('w'). A função fs.openSync 'retorna um descritor de arquivo' (fd), 
    //que é um identificador numérico para o arquivo aberto.
    fs.writeSync(fd, novoConteudo);
    //escreve o conteúdo da variável novoConteúdo no arquivo associado ao descritor de arquivo fd. 
    //O conteúdo é escrito de forma síncrona, 
    //o que significa que o programa aguardará até que a operação de escrita seja concluída antes de continuar a execução.
    fs.closeSync(fd);
    //fecha o arquivo associado ao descritor de arquivo fd. 
    //Após fechar o arquivo, ele não poderá mais ser usado para leitura ou escrita, a menos que seja aberto novamente.
    return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const incluiusuario = async (req, res) => {
  const { usuarioNovo, senhaNova, grupoNovo } = req.body; //incluir um novo usuário com senha e grupo.

  try {
    // Ler o conteúdo atual do arquivo
    const data = fs.readFileSync(USERSCONF, 'utf8');

    // Criar uma nova linha para o novo usuário
    const novaLinha = `${usuarioNovo}:${senhaNova}:${grupoNovo}\n`;

    // Concatenar a nova linha com o conteúdo existente e adicionar uma quebra de linha
    const novoConteudo = data + novaLinha;

    // Executar operações de manipulação de arquivo síncronas
    const fd = fs.openSync(USERSCONF, 'w');
    fs.writeSync(fd, novoConteudo);
    fs.closeSync(fd);

    return res.status(200).json({ message: 'Usuário incluído com sucesso!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


//semelhante ao incluiusuario
const deletausuario = async (req, res) => {
  const usuarioParaDeletar = req.params.usuario; // nome do usuário a ser deletado a partir dos parâmetros da rota.

  try {
    // Ler o conteúdo atual do arquivo
    const data = fs.readFileSync(USERSCONF, 'utf8');
    const linhas = data.split('\n');

    // Filtrar as linhas para manter apenas as que não correspondem ao usuário a ser deletado
    const linhasFiltradas = linhas.filter((linha) => {
      const [usuario] = linha.split(':');
      return usuario !== usuarioParaDeletar;
    });
    
    // linha representa cada elemento do array linhas, que neste contexto é uma linha do arquivo users.conf.
    // função de filtro é verificar se o usuario não é igual ao usuarioParaDeletar, que é o usuário que você deseja excluir.
    // Se a condição usuario !== usuarioParaDeletar for verdadeira, a linha é mantida no novo array linhasFiltradas.
    // Se a condição for falsa, a linha não será incluída no novo array.

    // Criar o novo conteúdo com as linhas filtradas
    const novoConteudo = linhasFiltradas.join('\n');

    // Executar operações de manipulação de arquivo síncronas
    const fd = fs.openSync(USERSCONF, 'w');
    fs.writeSync(fd, novoConteudo);
    fs.closeSync(fd);

    return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { listartodos, buscarusuario, atualizausuario, incluiusuario, deletausuario };