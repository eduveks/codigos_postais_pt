
const completo = _req.getString('completo')

let numero = _req.getString('numero')
let extensao = _req.getString('extensao')

const codigoPostalPartes = completo.split('-')

if (completo != '') {
    if (codigoPostalPartes.length < 2) {
        _header.statusCode = 406
        _out.json(
            _val.map()
                .set('error', 'invalido')
        )
        _exec.stop()
    }
    numero = codigoPostalPartes[0]
    extensao = codigoPostalPartes[1]
}

if (!/[0-9]{4}/.test(numero)) {
    _header.statusCode = 406
    _out.json(
        _val.map()
            .set('error', 'numero-invalido')
    )
    _exec.stop()
}

if (!/[0-9]{3}/.test(extensao)) {
    _header.statusCode = 406
    _out.json(
        _val.map()
            .set('error', 'extensao-invalida')
    )
    _exec.stop()
}

const dbCodigoPostal = _db.queryFirst(`
    SELECT
       localidade.uid AS "localidade_uid",
       localidade.codigo AS "localidade_codigo",
       localidade.nome AS "localidade_nome",
       concelho.uid AS "concelho_uid",
       concelho.codigo AS "concelho_codigo",
       concelho.nome AS "concelho_nome",
       distrito.uid AS "distrito_uid",
       distrito.codigo AS "distrito_codigo",
       distrito.nome AS "distrito_nome",
       codigo_postal.latitude,
       codigo_postal.longitude,
       codigo_postal.arteria_id
    FROM codigo_postal
       INNER JOIN localidade ON codigo_postal.localidade_id = localidade.id
       INNER JOIN concelho ON localidade.concelho_id = concelho.id
       INNER JOIN distrito ON concelho.distrito_id = distrito.id
    WHERE codigo_postal.numero = ? AND codigo_postal.extensao = ?
`, numero, extensao)

if (dbCodigoPostal) {
    const dados = _val.map()
          .set(
              'localidade',
              _val.map()
                  .set('uid', dbCodigoPostal.getString('localidade_uid'))
                  .set('codigo', dbCodigoPostal.getString('localidade_codigo'))
                  .set('nome', dbCodigoPostal.getString('localidade_nome'))
          )
          .set(
              'concelho',
              _val.map()
                  .set('uid', dbCodigoPostal.getString('concelho_uid'))
                  .set('codigo', dbCodigoPostal.getString('concelho_codigo'))
                  .set('nome', dbCodigoPostal.getString('concelho_nome'))
          )
          .set(
              'distrito',
              _val.map()
                  .set('uid', dbCodigoPostal.getString('distrito_uid'))
                  .set('codigo', dbCodigoPostal.getString('distrito_codigo'))
                  .set('nome', dbCodigoPostal.getString('distrito_nome'))
          )
          .set('latitude', dbCodigoPostal.getString('latitude'))
          .set('longitude', dbCodigoPostal.getString('longitude'))
          .set('arteria', dbCodigoPostal.getString('arteria_id'))
    const dbArteria = _db.get('arteria', dbCodigoPostal.getInt('arteria_id'))
    let	morada = ''
    if (dbArteria) {
        const arteria = _val.map()
        const arteriaSubparte = (nome)=> {
            const dbArteriaSubparte = _db.get(`arteria_${nome}`, dbArteria.getInt(`${nome}_id`))
            if (dbArteriaSubparte) {
                arteria.set(nome, dbArteriaSubparte.getString(nome))
            }
        };
        arteriaSubparte('codigo')
        arteriaSubparte('local')
        arteriaSubparte('tipo')
        arteriaSubparte('titulo')
        arteriaSubparte('nome')
        dados.set('arteria', arteria)
        if (arteria.getString('tipo') != '') {
            morada += `${arteria.getString('tipo')} `
        }
        if (arteria.getString('title') != '') {
            morada += `${arteria.getString('title')} `
        }
        if (arteria.getString('nome') != '') {
            morada += `${arteria.getString('nome')} `
        }
        morada = morada.trim()
    }
    dados.set('morada', morada)
    _out.json(dados)
} else {
    _header.status(404)
    _out.json(
        _val.map()
            .set('error', 'nao-encontrado')
    )
}
