let BD = require("../bancodedados");
const { mergeJson } = require("../util/funcoesConta");

const listarConta = (req, res) => {

    if(BD.contas.length===0){
        return res.send({mensagem:"Ainda não foi cadastrado nenhuma conta."})
    }

    return res.status(200).json(BD.contas);
}

const criarConta = (req, res) => {

    const { nome, email, cpf, data_nascimento, telefone, senha } = req.body;

    const conta = {

        numero: BD.id_contas++,//Dessa forma eu já garanto que não teremos números repetidos ?
        saldo:0,
        usuario:{
            nome,
            email,
            cpf,
            data_nascimento,
            telefone,
            senha
        }

    };  
   
    BD.contas.push(conta);

    return res.status(201).json(conta);
}

const atualizarConta = (req, res) => {

    const body = req.body;
    const { numeroConta } = req.params;

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numeroConta) {
            mergeJson(conta.usuario, body);
        }
    }

    return res.status(200).json({mensagem: "Conta atualizada com sucesso."});
}

const excluirConta = (req, res) => {

    const { numeroConta } = req.params;

    BD.contas.splice(numeroConta-1, 1);

    res.status(204).json({ mensagem: 'Conta excluída com sucesso.' });

}

module.exports = {
    listarConta,
    criarConta,
    atualizarConta,
    excluirConta
}