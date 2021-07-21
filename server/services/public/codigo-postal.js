
const codigoPostal = _req.getString('codigo_postal')

const codigoPostalPartes = codigoPostal.split('-')

if (codigoPostalPartes.length < 2) {
    _header.statusCode = 406
    _out.json(
        _val.map()
            .set('error', 'invalido')
    )
    _error.warn(`Código postal inválido: ${codigoPostal}`)
}

const dbCodigoPostal = _db.queryFirst(`
    SELECT
       localidade.nome AS "localidade",
       concelho.nome AS "concelho",
       distrito.nome AS "distrito"
    FROM codigo_postal
       INNER JOIN localidade ON codigo_postal.localidade_id = localidade.id
       INNER JOIN concelho ON localidade.concelho_id = concelho.id
       INNER JOIN distrito ON concelho.distrito_id = distrito.id
    WHERE codigo_postal.numero = ? AND codigo_postal.extensao = ?
`, codigoPostalPartes[0], codigoPostalPartes[1])

if (dbCodigoPostal) {
    _out.json(
        _val.map()
            .set('localidade', dbCodigoPostal.getString('localidade'))
            .set('concelho', dbCodigoPostal.getString('concelho'))
            .set('distrito', dbCodigoPostal.getString('distrito'))
    )
} else {
    _header.statusCode = 404
    _out.json(
        _val.map()
            .set('error', 'nao-encontrado')
    )
    _error.info(`Código postal não encontrado: ${codigoPostal}`)
}
