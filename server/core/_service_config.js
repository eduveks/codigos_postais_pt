
/**
 *  When service need public access...
 */
if (_env.is("dev")) {
    _service.allow()
}


if (_service.path.startsWith('public/')) {
    _service.allow()
}

