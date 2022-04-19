
const remoteCodigosPostaisGPS = _remote.init('codigo-postal')

const dbCodigosPostais = _db.query(`
    SELECT *
    FROM codigo_postal
    WHERE latitude = '' AND longitude = ''
      AND gps_processado = FALSE
    LIMIT 30
`)

for (const dbCodigoPostal of dbCodigosPostais) {
    const responseCodigosPostaisGPS = remoteCodigosPostaisGPS.get(
        '/',
        _val.map()
            .set('cp4', dbCodigoPostal.getString('numero'))
            .set('cp3', dbCodigoPostal.getString('extensao'))
    )
    const errorInfo = `Codigo Postal ${dbCodigoPostal.getString('numero')}-${dbCodigoPostal.getString('extensao')} com o ID ${dbCodigoPostal.getInt('id')}`
    if (responseCodigosPostaisGPS.ok()) {
        const htmlContent = _html.parse(responseCodigosPostaisGPS.getContent())
        const spanGPS = htmlContent.select('span.gps').first()
        if (spanGPS) {
            const gpsText = spanGPS.text()
            if (gpsText.indexOf('GPS: ') == 0) {
                let gpsTextClean = gpsText.substring('GPS: '.length)
                const gpsParts = gpsTextClean.split(',')
                if (gpsParts.length == 2) {
                    _db.update(
                        'codigo_postal',
                        dbCodigoPostal.getInt('id'),
                        _val.map()
                            .set('latitude', gpsParts[0])
                            .set('longitude', gpsParts[1])
                            .set('gps_processado', true)
                    )
                } else {
                    _log.fatal(`${errorInfo} sem a informação GPS.`)
                    _db.update(
                        'codigo_postal',
                        dbCodigoPostal.getInt('id'),
                        _val.map()
                            .set('gps_processado', true)
                    )
                }
            } else {
                _log.fatal(`${errorInfo} falhou o prefixo do GPS.`)
                _db.update(
                    'codigo_postal',
                    dbCodigoPostal.getInt('id'),
                    _val.map()
                        .set('gps_processado', true)
                )
            }
        } else {
            _log.fatal(`${errorInfo} elemeneto GPS inexistente.`)
            _db.update(
                'codigo_postal',
                dbCodigoPostal.getInt('id'),
                _val.map()
                    .set('gps_processado', true)
            )
        }
    } else {
        _log.fatal(`${errorInfo} falhou o GPS.`)
        break
    }
    _exec.sleep(500)
}
