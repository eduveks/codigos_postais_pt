
const importacaoDistritos = () => {
    _out.println(`<p><h2>Distritos</h2></p>`)
    _out.flush()

    const csv = _csv.parser(_storage.filesystem('server', 'distritos.csv'), _csv.format('default'))

    let primeiraLinha = true

    let counter = 0
    for (const csvLinha of csv) {
        const dbRegisto = _val.map()
        for (let i = 0; i < csvLinha.size(); i++) {
            const csvValor = csvLinha.get(i).trim().replaceAll('\0', '')
            if (csvValor == '') {
                continue
            }
            switch (i) {
            case 0:
                dbRegisto.set('codigo', csvValor)
                break
            case 1:
                dbRegisto.set('nome', csvValor)
                break
            default:
                break
            }
        }
        if (primeiraLinha) {
            primeiraLinha = false
        } else if (!dbRegisto.isEmpty()) {
            counter++
            _out.print('.')
            _out.flush()
            //_out.print(`<pre>${dbRegisto.toJSON()}</pre>`)
            _db.insertIfNotExists('distrito', dbRegisto)
        }
    }

    _out.println()
    _out.println(`<br>${counter}`)
}
