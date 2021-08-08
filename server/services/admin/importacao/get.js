
// _core : importacao/download
// _core : importacao/distritos
// _core : importacao/concelhos
// _core : importacao/codigos-postais

_out.println(`<p><h1>${_convert.toHTML('Importação dos Dados')}</h1></p>`)

if (_val.fromJSON(_storage.filesystem('server', 'importacao.json').file().input().readAllAndClose()).getBoolean("execucao")) {
    const mensagem = 'Já está em execução.'
    _out.println(`<p><h4>${_convert.toHTML(mensagem)}</h4></p>`)
} else {
    _storage.filesystem('server', 'importacao.json').file().output().writeAndClose(
        _val.map()
            .set("execucao", true)
            .toJSON()
    )

    _out.flush()

    importacaoDownload()

    importacaoDistritos()

    importacaoConcelhos()

    importacaoCodigosPostais()

    _out.println()
    _out.println(`<p><h4>Fim</h4></p>`)

    _storage.filesystem('server', 'importacao.json').file().output().writeAndClose(
        _val.map()
            .set("execucao", false)
            .toJSON()
    )
}
