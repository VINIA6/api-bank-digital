let BD = require("../bancodedados");
const { validaEmail, validaNumeroCPF, CPFExistente, validaId } = require("../util/funcoesConta");

const certificaCadastroConta = (req, res, next) => {
    const body = req.body

    if (!body.nome) {
        return res.status(400).json({ mensagem: "O campo Nome é obrigatório." });
    }

    if (body.email) {

        if (!validaEmail(body.email)) {
            return res.status(400).json({ mensagem: "O campo inserido não é um Email." });
        }
        for (const conta of BD.contas) {

            if (conta.usuario.email === body.email) {
                return res.status(400).json({ mensagem: "O campo Email já existe." });
            }
        }
    } else {
        return res.status(400).json({ mensagem: "O campo Email é obrigatório." });
    }

    if (body.cpf) {

        if (!validaNumeroCPF(body.cpf)) {
            return res.status(400).json({ mensagem: "O campo CPF inserido está incorreto." });
        }
 
        for (const conta of BD.contas) {

            if (conta.usuario.cpf === body.cpf) {
                return res.status(400).json({ mensagem: "O campo CPF já existe." });
            }
        }
    } else {
        return res.status(400).json({ mensagem: "O campo CPF é obrigatório." });
    }

    if (!body.data_nascimento) {
        return res.status(400).json({ mensagem: "O campo Data de Nascimento é obrigatório." });
    }

    if (!body.telefone) {
        return res.status(400).json({ mensagem: "O campo Telefone é obrigatório." });
    }

    if (!body.senha) {
        return res.status(400).json({ mensagem: "O campo Senha é obrigatório." });
    }

    next();
};

const certificaListagemConta = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(401).json({ mensagem: "A senha deve ser informada." });
    }

    if (senha_banco !== BD.banco.senha) {
        return res.status(401).json({ mensagem: "A senha está incorreta." });
    }

    next();
}

const certificaAtualizacaoConta = (req, res, next) => {

    const { numeroConta } = req.params;
    const { nome, email, cpf, data_nascimento, telefone, senha } = req.body;

    let validaId = false;

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numeroConta) {
            validaId = true;
            break;
        }
    }

    if (!validaId) {
        return res.status(404).json({ mensagem: "O Id não existe." });
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Nenhuma propriedade foi passada no corpo da requisição.' });
    }

    if (email) {
        for (const conta of BD.contas) {

            if (conta.usuario.email === req.body.email) {
                return res.status(400).json({ mensagem: "O campo Email já existe." });
            }
        }
    }
    
    if (cpf) {
        for (const conta of BD.contas) {
            if (conta.usuario.cpf === req.body.cpf) {
                return res.status(400).json({ mensagem: "O campo CPF já existe." });
            }
        }
    }

    next();
}


const certificaExcluirConta = (req,res,next) => {

    const { numeroConta } = req.params;
    let data;
    let validaId = false;

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numeroConta) {
            data = conta;
            validaId = true;
            break;
        }
    }

    if (!validaId) {
        return res.status(404).json({ mensagem: "O Id não existe." });
    }

    if(data.saldo!==0){
        return res.status(404).json({ mensagem: "Não é permitido excluir conta bancária que possua saldo em conta." });
    }
    
    next(); 
}

module.exports = {
    certificaCadastroConta,
    certificaListagemConta,
    certificaAtualizacaoConta,
    certificaExcluirConta
};