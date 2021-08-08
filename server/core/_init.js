
_storage.filesystem('server', 'importacao.json').file().output().writeAndClose(
    _val.map()
        .set("execucao", false)
        .toJSON()
)
