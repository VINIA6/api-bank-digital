let BD = require("../bancodedados");
const { DataHoraFormatada } = require("../util/funcoesConta");

const depositar = (req, res) => {

    const { numero_conta, valor } = req.body;
    let data;

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numero_conta) {
            data = conta;
            break;
        }
    }

    const valorAtual = data.saldo;

    data.saldo = valorAtual + valor;

    dataReturn = {
        data: DataHoraFormatada(),
        numero_conta,
        valor: valor,
    }

    BD.depositos.push(dataReturn);

    res.status(201).json({ mensagem: "Depósito realizado com sucesso." });
}

const sacar = (req, res) => {
    const { numero_conta, valor } = req.body;
    let data;

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numero_conta) {
            data = conta;
            break;
        }
    }

    const valorAtual = data.saldo;

    data.saldo = valorAtual - valor;

    dataReturn = {
        data: DataHoraFormatada(),
        numero_conta,
        valor: valor,
    }

    BD.saques.push(dataReturn);

    res.status(201).json({ mensagem: "Saque realizado com sucesso." });
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body;
    let data_destino;
    let data_origem;

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numero_conta_destino) {
            data_destino = conta;
            break;
        }
    }

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numero_conta_origem) {
            data_origem = conta;
            break;
        }
    }

    data_destino.saldo = data_destino.saldo + valor;
    data_origem.saldo = data_origem.saldo - valor;

    dataReturn = {
        data: DataHoraFormatada(),
        numero_conta_origem,
        numero_conta_destino,
        valor: valor,
    }

    BD.transferencias.push(dataReturn);

    res.status(201).json({ mensagem: "Transferência realizado com sucesso." });
}

const consultarSaldo = (req, res) => {

    const { numero_conta } = req.query;

    let data;

    for (const conta of BD.contas) {
        if (conta.numero.toString() === numero_conta) {
            data = conta;
            break;
        }
    }

    dataReturn = {
        saldo: data.saldo,
    }

    res.status(200).json(dataReturn);
}

const extrato = (req, res) => {

    const { numero_conta } = req.query;
    const numero_conta_req = numero_conta;
    const saques = [];
    const depositos = [];
    const transferenciasEnviadas = [];
    const transferenciasRecebidas = [];

    console.log(BD.saques);

    for (const saque of BD.saques) {
        console.log(saque);
        const { data, numero_conta, valor } = saque;
        if (numero_conta === numero_conta_req) {
            saques.push({
                data,
                numero_conta,
                valor
            })
        }
    }

    for (const deposito of BD.depositos) {
        const { data, numero_conta, valor } = deposito;
        if (numero_conta === numero_conta_req) {
            depositos.push({
                data,
                numero_conta,
                valor
            })
        }
    }

    for (const transferencia of BD.transferencias) {
        const { data, numero_conta_origem, numero_conta_destino, valor } = transferencia;

        if (numero_conta_origem === numero_conta_req) {
            transferenciasEnviadas.push({
                data,
                numero_conta_origem,
                numero_conta_destino,
                valor,
            });
        } else if (numero_conta_destino === numero_conta_req) {
            transferenciasRecebidas.push({
                data,
                numero_conta_origem,
                numero_conta_destino,
                valor,
            });
        }
    }

    res.send({
        saques,
        depositos,
        transferenciasEnviadas,
        transferenciasRecebidas
    });

}

module.exports = {
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    extrato
}