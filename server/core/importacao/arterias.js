
const importacaoArterias = () => {
    _out.println(`<p><h2>Artérias</h2></p>`)
    _out.flush()
    
    const fileReader = _storage.filesystem('server', 'codigos_postais.csv')
          .file()
          .bufferedReader(1024)

    const csv = _csv.parser(fileReader, _csv.format('default'))

    let csvPrimeiraLinha = null

    let counter = 0

    const getArteriaSubparteId = (dbDesignacao, dadosValor) => {
        const dbItem = _db.queryFirst(
            `SELECT * FROM arteria_${dbDesignacao} WHERE ${dbDesignacao} = ?`,
            dadosValor
        )
        let dbId = 0
        if (dbItem == null && dadosValor && dadosValor != '') {
            dbId = _db.insert(
                `arteria_${dbDesignacao}`,
                _val.map()
                    .set(dbDesignacao, dadosValor)
            )
        } else if (dbItem != null) {
            dbId = dbItem.getInt('id')
        }
        return dbId
    }

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
            // Obtém os ids de base dados referente a cada uma das partes que constituem uma artéria.
            const dbArteriaCodigoId = getArteriaSubparteId('codigo', dadosLinha.getString('cod_arteria'))
            const dbArteriaTipoId = getArteriaSubparteId('tipo', dadosLinha.getString('tipo_arteria'))
            const dbArteriaTituloId = getArteriaSubparteId('titulo', dadosLinha.getString('titulo_arteria'))
            const dbArteriaNomeId = getArteriaSubparteId('nome', dadosLinha.getString('nome_arteria'))
            const dbArteriaLocalId = getArteriaSubparteId('local', dadosLinha.getString('local_arteria'))
            // Obtém o Código Postal associado à Artéria
            const dbCodigoPostal = _db.queryFirst(
                `SELECT id FROM codigo_postal WHERE numero = ? AND extensao = ?`,
                dadosLinha.getString('num_cod_postal'), dadosLinha.getString('ext_cod_postal')
            )
            // Verificar se a artéria já existe em base de dados.
            const dbArteria = _db.queryFirst(`
                SELECT *
                FROM arteria
                WHERE codigo_id = ? AND tipo_id = ? AND titulo_id = ?
                    AND nome_id = ? AND local_id = ?`, 
                dbArteriaCodigoId, dbArteriaTipoId, dbArteriaTituloId,
                dbArteriaNomeId, dbArteriaLocalId
            )
            let dbArteriaId = 0
            if (dbArteria == null && dbCodigoPostal) {
                // Insere a Nova Artéria
                dbArteriaId = _db.insert(
                    'arteria',
                    _val.map()
                        .set('codigo_id', dbArteriaCodigoId)
                        .set('tipo_id', dbArteriaTipoId)
                        .set('titulo_id', dbArteriaTituloId)
                        .set('nome_id', dbArteriaNomeId)
                        .set('local_id', dbArteriaLocalId)
                )
            } else {
                dbArteriaId = dbArteria.getInt(`id`)
            }
            if (dbArteriaId > 0) {
                _db.insert(
                    'codigo_postal_arteria',
                    _val.map()
                        .set('codigo_postal_id', dbCodigoPostal.getInt('id'))
                        .set('arteria_id', dbArteriaId)
                )
            }
        }
        if (counter % 100 == 0) {
            _out.print('.')
            _out.flush()
            _log.info(`Linha ${counter}`, _monitor.performanceData().getValues('memory').getValues('process').toJSON())
            //_monitor.stats()
        }
    }

    csv.close()
    fileReader.close()
    
    _out.println()
    _out.println(`<br>${counter}`)
}
