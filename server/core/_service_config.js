
/**
 *  When service need public access...
 */
if (_env.is("dev")) {
    _service.allow()
}


if (_service.indexOf('public/') == 0) {
    _service.allow()
}

