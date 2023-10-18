const express = require("express");
const { certificaCadastroConta, certificaListagemConta, certificaAtualizacaoConta, certificaExcluirConta } = require("../certificado/certificadoContas")
const { listarConta, criarConta, atualizarConta, excluirConta } = require("../controladores/contaEstrutura");
const { certificaDepositar, certificaSacar, certificaTransferir, certificaConsultarSaldo, certificaExtrato } = require("../certificado/certificadoFuncionalidade");
const { depositar, sacar, transferir, consultarSaldo, extrato } = require("../controladores/contaFuncionalidade");


const rotas = express();

rotas.get('/contas', certificaListagemConta, listarConta);
rotas.post('/contas', certificaCadastroConta, criarConta);
rotas.put('/contas/:numeroConta/usuario', certificaAtualizacaoConta, atualizarConta);
rotas.delete('/contas/:numeroConta',certificaExcluirConta,excluirConta);

rotas.get('/contas/saldo',certificaConsultarSaldo,consultarSaldo);
rotas.get('/contas/extrato',certificaExtrato,extrato);

rotas.post('/transacoes/depositar',certificaDepositar,depositar);
rotas.post('/transacoes/sacar',certificaSacar,sacar);
rotas.post('/transacoes/tranferir',certificaTransferir,transferir);
module.exports = rotas