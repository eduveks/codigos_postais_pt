
const filter = _req.getValues("filter")
const pagination = _req.getValues("pagination")
const sorter = _req.getValues("sorter")

const pageSize = 10

let page = { start: 0, size: pageSize }

if (pagination != null) {
    page.size = pagination.getInt('pageSize', pageSize)
    page.start = (pagination.getInt('current', 1) - 1) * page.size
}
if (page.size > 100) {
    page.size = 100
}

const queryFilter = _val.list()
let queryWhere = '';


if (filter != null) {
    if (filter.getString('distrito') != '') {
        queryWhere += ' AND distrito.nome LIKE ?'
        queryFilter.add(`%${ filter.getString('distrito') }%`)
    }

    if (filter.getString('concelho') != '') {
        queryWhere += ' AND concelho.nome LIKE ?'
        queryFilter.add(`%${ filter.getString('concelho') }%`)
    }

    if (filter.getString('localidade') != '') {
        queryWhere += ' AND localidade.nome LIKE ?'
        queryFilter.add(`%${ filter.getString('localidade') }%`)
    }

    if (filter.getString('numero') != '') {
        queryWhere += ' AND codigo_postal.numero LIKE ?'
        queryFilter.add(`%${ filter.getString('numero') }%`)
    }

    if (filter.getString('extensao') != '') {
        queryWhere += ' AND codigo_postal.extensao LIKE ?'
        queryFilter.add(`%${ filter.getString('extensao') }%`)
    }
}


let querySorter = 'codigo_postal.numero ASC, codigo_postal.extensao ASC';
if (sorter != null) {
    const order = sorter.getString("order") == 'descend' ? 'DESC' : 'ASC'
    if (sorter.getString("field") == 'distrito') {
        querySorter = ' distrito.nome '+ order;
    } else if (sorter.getString("field") == 'concelho') {
        querySorter = ' concelho.nome '+ order;
    } else if (sorter.getString("field") == 'localidade') {
        querySorter = ' localidade.nome '+ order;
    } else if (sorter.getString("field") == 'numero') {
        querySorter = ' codigo_postal.numero '+ order;
    } else if (sorter.getString("field") == 'extensao') {
        querySorter = ' codigo_postal.extensao '+ order;
    }
}

const queryFrom = `
    FROM distrito
       INNER JOIN concelho ON distrito.id = concelho.distrito_id
       INNER JOIN localidade ON concelho.id = localidade.concelho_id
       INNER JOIN codigo_postal ON localidade.id = codigo_postal.localidade_id
`;

const dbResultados = _db.query(`
    SELECT
        distrito.nome AS "distrito",
        concelho.nome AS "concelho",
        localidade.nome AS "localidade",
        codigo_postal.numero AS "numero",
        codigo_postal.extensao AS "extensao"
    ${queryFrom}
    WHERE 1 = 1
    ${queryWhere}
    ORDER BY ${querySorter}
    LIMIT ${page.size} OFFSET ${page.start}
`, queryFilter)

const resultados = _val.list()

for (const dbResultado of dbResultados) {
    resultados.add(
        _val.map()
            .set('distrito', dbResultado.getString('distrito'))
            .set('concelho', dbResultado.getString('concelho'))
            .set('localidade', dbResultado.getString('localidade'))
            .set('numero', dbResultado.getString('numero'))
            .set('extensao', dbResultado.getString('extensao'))
    )
}

_out.json(
    _val.map()
        .set(
            'total',
            _db.queryFirst(`
                SELECT COUNT(1) "total"
                ${queryFrom}
                WHERE 1 = 1
                ${queryWhere}
            `, queryFilter).getInt("total")
        ).set('resultados', resultados)
)
