
const remoteBing = _remote.init('bing')

const dbCodigosPostais = _db.query(`
    SELECT *
    FROM codigo_postal
    WHERE latitude = '' AND longitude = ''
      AND gps_processado = TRUE
      AND gps_bing_processado = FALSE
    LIMIT 30
`)

for (const dbCodigoPostal of dbCodigosPostais) {
    const responseBing = remoteBing.get(
        '/',
        _val.map()
            .set('countryRegion', 'PT')
            .set('postalCode', `${dbCodigoPostal.getString('numero')}-${dbCodigoPostal.getString('extensao')}`)
            .set('key', _app.settings().getValues('bing').getString('key'))
    )
    const errorInfo = `Codigo Postal ${dbCodigoPostal.getString('numero')}-${dbCodigoPostal.getString('extensao')} com o ID ${dbCodigoPostal.getInt('id')}`
    if (responseBing.ok()) {
        const resourceSets = responseBing.json().getValues('resourceSets')
        if (resourceSets && resourceSets.isList() && resourceSets.size() > 0) {
            const resourceSetsItem = resourceSets.getValues(0)
            const resources = resourceSetsItem.getValues('resources')
            if (resourceSetsItem.getInt('estimatedTotal') > 0 && resources.isList() && resources.size() > 0) {
                const resource = resources.getValues(0)
                const geocodePoints = resource.getValues('geocodePoints')
                if (geocodePoints.isList() && geocodePoints.size() > 0) {
                    const geocodePoint = geocodePoints.getValues(0)
                    const coordinates = geocodePoint.getValues('coordinates')
                    if (coordinates.isList() && coordinates.size() >= 2) {
                        const latitude = coordinates.getString(0)
                        const longitude = coordinates.getString(1)
                        _db.update(
                            'codigo_postal',
                            dbCodigoPostal.getInt('id'),
                            _val.map()
                                .set('latitude', latitude)
                                .set('longitude', longitude)
                                .set('gps_bing_processado', true)
                        )
                    } else {
                        _log.fatal(`${errorInfo} sem as coordenadas GPS.`)
                    }
                } else {
                    _log.fatal(`${errorInfo} sem o objeto geocodePoints esperado.`)
                }
            } else {
                _log.fatal(`${errorInfo} sem a lista de resources esperada.`)
            }
        } else {
            _log.fatal(`${errorInfo} sem o resourceSets esperado.`)
        }
    } else {
        _log.fatal(`${errorInfo} falhou o pedido com o status ${responseBing.statusCode}.`)
    }
    _exec.sleep(500)
}
