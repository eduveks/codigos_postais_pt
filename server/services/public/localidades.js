
const dbConcelho = _db.get('concelho', _req.getString('concelho_uid'))

if (dbConcelho) {
    const dbLocalidades = _db.query(`
        SELECT localidade.*
        FROM localidade INNER JOIN concelho
            ON localidade.concelho_id = concelho.id
        WHERE localidade.active = true AND concelho.active = TRUE
            AND concelho.id = ?
    `, dbConcelho.getInt('id'))

    const lista = _val.list()

    for (const dbLocalidade of dbLocalidades) {
        lista.add(
            _val.map()
                .set('uid', dbLocalidade.getString('uid'))
                .set('codigo', dbLocalidade.getString('codigo'))
                .set('nome', dbLocalidade.getString('nome'))
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
