const validaEmail = (email) => {
    const parts = email.split('@');
    return parts.length === 2 && parts[1].includes('.');
}

const validaNumeroCPF = (cpf) => {
    if (cpf.length === 11) {
        return true;
    } else {
        return false;
    }
}

const CPFExistente = (banco, bodyCPF) => {
    for (const conta of banco) {
        if (conta.usuario.cpf === bodyCPF) {
            return res.status(400).json({ mensagem: "O campo CPF já existe." });
        }
    }
}

const mergeJson = (target, source) => {
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
                  mergeJson(target[key], source[key]);
            } else {
                 target[key] = source[key];
            }
        }
    }
}

const validaId = (contaBD, numeroConta) => {
    let validaId = false;
    for (const conta of contaBD) {
        if (conta.numero.toString() === numeroConta) {
            validaId = true;
            break;
        }
    }
    if (!validaId) {
        return res.status(404).json({ mensagem: "O Id não existe." });
    }
}

function DataHoraFormatada() {
    const dataAtual = new Date();

    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');

    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

    const dataHoraFormatada = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    return dataHoraFormatada;
}

module.exports = {
    validaEmail,
    validaNumeroCPF,
    CPFExistente,
    mergeJson,
    validaId, 
    DataHoraFormatada
}