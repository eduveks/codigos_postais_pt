
const csv = _csv.parser(_storage.filesystem('server', 'concelhos.csv'), _csv.format('default'))

let primeiraLinha = true

for (const csvLinha of csv) {
    const dbRegisto = _val.map()
    for (let i = 0; i < csvLinha.size(); i++) {
        const csvValor = csvLinha.get(i).trim().replaceAll('\0', '')
        if (csvValor == '') {
            continue
        }
        switch (i) {
            case 0:
            dbRegisto.set('distrito_codigo', csvValor)
            break
            case 1:
            dbRegisto.set('codigo', csvValor)
            break
            case 2:
            dbRegisto.set('nome', csvValor)
            break
            default:
            break
        }
    }
    if (primeiraLinha) {
        primeiraLinha = false
    } else if (!dbRegisto.isEmpty() && dbRegisto.has('codigo') && dbRegisto.has('nome')) {
        const dbDistrito = _db.queryFirst(`SELECT * FROM distrito WHERE codigo = ?`, dbRegisto.getString('distrito_codigo'))
        if (dbDistrito == null) {
            _log.error(`Distrito para o código ${dbRegisto.getString('distrito_codigo')} não foi encontrado.`)
            _out.println(`<b>Falhou:</b>`)
        } else {
            dbRegisto.set(
                'distrito_id',
                _db.queryFirst(`SELECT * FROM distrito WHERE codigo = ?`, dbRegisto.getString('distrito_codigo'))
                    .getInt('id')
            )
        }
        _out.print(`<pre>${dbRegisto.toJSON()}</pre>`)
        _db.insertIfNotExists('concelho', dbRegisto)
    }
}
