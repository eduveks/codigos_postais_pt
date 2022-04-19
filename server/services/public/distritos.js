
const dbDistritos = _db.query(`
    SELECT * FROM distrito WHERE active = true
`)

const lista = _val.list()

for (const dbDistrito of dbDistritos) {
    lista.add(
        _val.map()
            .set('uid', dbDistrito.getString('uid'))
            .set('codigo', dbDistrito.getString('codigo'))
            .set('nome', dbDistrito.getString('nome'))
    )
}

_out.json(lista)
