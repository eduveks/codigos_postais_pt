
const importacaoCodigosPostais = () => {
    _out.println(`<p><h2>Códigos Postais</h2></p>`)
    _out.flush()
    
    const fileReader = _storage.filesystem('server', 'codigos_postais.csv')
          .file()
          .bufferedReader(1024)

    const csv = _csv.parser(fileReader, _csv.format('default'))

    let csvPrimeiraLinha = null

    const dbBatchCodigoPostal = _db.batch(`
    insert into codigo_postal(id, localidade_id, numero, extensao, active)
    values(nextval('codigo_postal_id'), ?, ?, ?, true)
`)

    let counter = 0

    const csvIterator = csv.iterator()
    while (csvIterator.hasNext()) {
        counter++
        const csvLinha = csvIterator.next()
        const dadosLinha = _val.map()
        for (let i = 0; i < csvLinha.size(); i++) {
            const csvValor = csvLinha.get(i).trim().replaceAll('\0', '')
            if (csvValor == '') {
                continue
            }
            let csvColuna = csvPrimeiraLinha ? csvPrimeiraLinha.get(i).trim().replaceAll('\0', '') : null
            if (csvColuna) {
                dadosLinha.set(csvColuna, csvValor)
            }
        }
        if (csvPrimeiraLinha == null) {
            csvPrimeiraLinha = csvLinha
        } else if (!dadosLinha.isEmpty() && dadosLinha.has('cod_distrito') && dadosLinha.has('cod_concelho') 
                   && dadosLinha.has('cod_localidade') && dadosLinha.has('num_cod_postal')) {
            const dbDistrito = _db.queryFirst(`SELECT * FROM distrito WHERE codigo = ?`, dadosLinha.getString('cod_distrito'))
            if (dbDistrito == null) {
                _log.error(`No registo ${csvLinha.getRecordNumber()} do CSV, o distrito para o código ${dadosLinha.getString('cod_distrito')} não foi encontrado.`)
                _out.print(` &nbsp; <b>Falhou Distrito [${csvLinha.getRecordNumber()}]</b> &nbsp; `)
                continue
            }
            const dbConcelho = _db.queryFirst(
                `SELECT * FROM concelho WHERE codigo = ? AND distrito_id = ?`, 
                dadosLinha.getString('cod_concelho'), dbDistrito.getInt('id')
            )
            if (dbConcelho == null) {
                _log.error(`No registo ${csvLinha.getRecordNumber()} do CSV, o concelho para o código ${dadosLinha.getString('cod_concelho')} não foi encontrado.`)
                _out.print(` &nbsp; <b>Falhou Concelho [${csvLinha.getRecordNumber()}]</b> &nbsp; `)
                continue
            }
            const dbLocalidade = _db.queryFirst(
                `SELECT * FROM localidade WHERE codigo = ? AND concelho_id = ?`, 
                dadosLinha.getString('cod_localidade'), dbConcelho.getInt('id')
            )
            let dbLocalidadeId = 0
            if (dbLocalidade == null) {
                dbLocalidadeId = _db.insertIfNotExists(
                    'localidade',
                    _val.map()
                        .set('concelho_id', dbConcelho.getInt('id'))
                        .set('codigo', dadosLinha.getString('cod_localidade'))
                        .set('nome', dadosLinha.getString('nome_localidade'))
                )
            } else {
                dbLocalidadeId = dbLocalidade.getInt('id')
            }
            dbBatchCodigoPostal.put(dbLocalidadeId, dadosLinha.getString('num_cod_postal'), dadosLinha.getString('ext_cod_postal'))
        }
        if (counter % 1000 == 0) {
            _out.print('.')
            _out.flush()
            dbBatchCodigoPostal.execute()
            dbBatchCodigoPostal.clear()
            _log.info(`Linha ${counter}`, _monitor.performanceData().getValues('memory').getValues('process').toJSON())
            //_monitor.stats()
        }
    }

    dbBatchCodigoPostal.execute()
    dbBatchCodigoPostal.close()

    csv.close()
    fileReader.close()
    
    _out.println()
    _out.println(`<br>${counter}`)
}
