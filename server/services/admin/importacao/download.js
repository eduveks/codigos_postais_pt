
const respostaCodigoPostal = _remote.get(
    `https://github.com/centraldedados/codigos_postais/raw/master/data/codigos_postais.csv`
)

if (respostaCodigoPostal.ok()) {
    _storage.filesystem('server', 'codigos_postais.csv')
        .saveFile(respostaCodigoPostal.file())

    const respostaConcelhos = _remote.get(
        `https://github.com/centraldedados/codigos_postais/raw/master/data/concelhos.csv`
    )
    if (respostaConcelhos.ok()) {
        _storage.filesystem('server', 'concelhos.csv')
            .saveFile(respostaConcelhos.file())

        const respostaDistritos = _remote.get(
            `https://github.com/centraldedados/codigos_postais/raw/master/data/distritos.csv`
        )
        if (respostaDistritos.ok()) {
            _storage.filesystem('server', 'distritos.csv')
                .saveFile(respostaDistritos.file())
        } else {
            _log.error(`O download dos distritos falhou: ${respostaDistritos.statusCode}`)
        }
    } else {
        _log.error(`O download dos concelhos falhou: ${respostaConcelhos.statusCode}`)
    }
} else {
    _log.error(`O download dos códigos postais falhou: ${respostaCodigoPostal.statusCode}`)
}
