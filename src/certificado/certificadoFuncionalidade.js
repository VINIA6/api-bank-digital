const BD = require("../bancodedados");

const certificaDepositar = (req, res, next) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "O campo Numero da Conta é obrigatório." });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: "O campo com o valor do depósito é obrigatório." });
    }

    let validaId = false;

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numero_conta) {
            validaId = true;
            break;
        }
    }

    if (!validaId) {
        return res.status(404).json({ mensagem: "A conta não existe." });
    }

    if (valor < 1) {
        return res.status(400).json({ mensagem: "O valor inserido para depósito não pe permitido." })
    }

    next();
}

const certificaSacar = (req, res, next) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "O campo Número da Conta é obrigatório." });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: "O campo com o valor do depósito é obrigatório." });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "Ensira sua senha." })
    }

    let validaId = false;
    let data;
    for (const conta of BD.contas) {
        if (conta.numero.toString() === numero_conta) {
            validaId = true;
            data = conta;
            break;
        }
    }

    if (!validaId) {
        return res.status(404).json({ mensagem: "A conta não existe." });
    }

    if (senha) {
        if (data.usuario.senha !== senha) {
            return res.status(400).json({ mensagem: "Ensira uma senha válida." });
        }
    }

    if (valor > data.saldo) {
        return res.status(400).json({ mensagem: `Saldo de ${data.saldo} insuficiete, saque superior ao saldo em conta.` })
    }
    next();
}

const certificaTransferir = (req, res, next) => {

    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    let validaIdDestino = false;
    let validaIdOrigem = false;
    let data_destino;
    let data_origem;

    if(numero_conta_origem === numero_conta_destino){
        return res.status(401).json({mensagem: "Impossível realizar a tranferência. A conta de destino é a mesma de origem."})
    }

    if (!numero_conta_destino) {
        return res.status(401).json({ mensagem: "O campo número da conta de destino é obrigatório." });
    }

    if (!numero_conta_origem) {
        return res.status(401).json({ mensagem: "O campo número da conta de origem é obrigatório." });
    }

    if (!valor) {
        return res.status(401).json({ mensagem: "O campo com o valor da transferência é obrigatório." });
    }

    if (!senha) {
        return res.status(401).json({ mensagem: "Ensira sua senha." });
    }

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numero_conta_destino) {
            validaIdDestino = true;
            data_destino = conta;
            break;
        }
    }

    if (!validaIdDestino) {
        return res.status(404).json({ mensagem: "A conta de destino não existe." });
    }

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numero_conta_origem) {
            validaIdOrigem = true;
            data_origem = conta;
            break;
        }
    }

    if (!validaIdOrigem) {
        return res.status(404).json({ mensagem: "A conta de origem não existe." });
    }

    if (senha) {
        if (data_origem.usuario.senha !== senha) {
            return res.status(400).json({ mensagem: "Ensira uma senha válida para sua conta de origem." });
        }
    }

    if (valor > data_origem.saldo) {
        return res.status(400).json({ mensagem: "Não é permitido transferências com valores superiores ao saldo em conta." });
    }

    next();
}

const certificaConsultarSaldo = (req, res, next) => {

    const {numero_conta,senha} = req.query;

    if(!numero_conta){
        return res.status(401).json({mensagem:"O número da conta é obrigatório."})
    }

    if (!senha) {
        return res.status(401).json({ mensagem: "Ensira sua senha." });
    }

    let validaId = false;
    let data;

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numero_conta) {
            data = conta;
            validaId = true;
            break;
        }
    }

    if (!validaId) {
        return res.status(404).json({ mensagem: "A conta não existe." });
    }

    if (senha) {
        if (data.usuario.senha !== senha) {
            return res.status(400).json({ mensagem: "Ensira uma senha válida para a conta informada." });
        }
    }

    next();
}

const certificaExtrato = (req, res, next) => {
    const {numero_conta,senha} = req.query;

    if(!numero_conta){
        return res.status(401).json({mensagem:"O número da conta é obrigatório."})
    }

    if (!senha) {
        return res.status(401).json({ mensagem: "Ensira sua senha." });
    }

    let validaId = false;
    let data;

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numero_conta) {
            data = conta;
            validaId = true;
            break;
        }
    }

    if (!validaId) {
        return res.status(404).json({ mensagem: "A conta não existe." });
    }

    if (senha) {
        if (data.usuario.senha !== senha) {
            return res.status(400).json({ mensagem: "Ensira uma senha válida para a conta informada." });
        }
    }
    
    next();
}

module.exports = {
    certificaDepositar,
    certificaSacar,
    certificaTransferir,
    certificaConsultarSaldo,
    certificaExtrato
}