
const dbDistrito = _db.get('distrito', _req.getString('distrito_uid'))

if (dbDistrito) {
    const dbConcelhos = _db.query(`
        SELECT concelho.*
        FROM concelho INNER JOIN distrito
            ON concelho.distrito_id = distrito.id
        WHERE concelho.active = true AND distrito.active = TRUE
            AND distrito.id = ?
    `, dbDistrito.getInt('id'))

    const lista = _val.list()

    for (const dbConcelho of dbConcelhos) {
        lista.add(
            _val.map()
                .set('uid', dbConcelho.getString('uid'))
                .set('codigo', dbConcelho.getString('codigo'))
                .set('nome', dbConcelho.getString('nome'))
        )
    }

    _out.json(lista)
} else {
    _header.status(404)
    _out.json(
        _val.map()
            .set('error', 'nao-encontrado')
    )
}
