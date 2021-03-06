/**
  *
  *  CODE GENERATED AUTOMATICALLY
  *
  *  THIS FILE SHOULD NOT BE EDITED BY HAND
  *
  */

_form.createIfNotExists(
	_val.init()
	.set("big", false)
	.set("control_active", true)
	.set("control_group", false)
	.set("control_user", false)
	.set("description", "")
	.set("displayname", "C\u00F3digo Postal")
	.set("export_id", false)
	.set("export_json", true)
	.set("export_lastchange", false)
	.set("export_uid", true)
	.set("export_xls", true)
	.set("export_xml", true)
	.set("firebase", "")
	.set("name", "codigo_postal")
	.set("reorder", 0)
	.set("report", false)
	.set("show_id", true)
	.set("uid", "dadc22b0-88e7-4f29-be54-f3459ab64a1a")
)
_form.createComponentIfNotExists(
	"dadc22b0-88e7-4f29-be54-f3459ab64a1a",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Art\u00E9ria")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "arteria_id")
	.set("notnull", false)
	.set("primarykey", false)
	.set("properties", "{\"MAX_COLUMN_LENGTH\":{\"default\":\"0\",\"type\":\"INTEGER\",\"value\":\"0\"},\"COLUMN_SEPARATOR\":{\"default\":\" - \",\"type\":\"LINK_SEPARATOR\",\"value\":\" - \"},\"LINK\":{\"default\":\"\",\"type\":\"LINK\",\"value\":\"arteria:codigo_id,tipo_id,titulo_id,nome_id,local_id\"},\"SERVICE\":{\"default\":\"com/Select.netuno\",\"type\":\"STRING\",\"value\":\"com/Select.netuno\"},\"ONLY_ACTIVES\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "select")
	.set("uid", "49db4a7c-5f05-483c-b520-14d9ca6571d8")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", false)
	.set("whennew", true)
	.set("whenresult", false)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 6)
)
_form.createComponentIfNotExists(
	"dadc22b0-88e7-4f29-be54-f3459ab64a1a",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Extens\u00E3o")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "extensao")
	.set("notnull", true)
	.set("primarykey", false)
	.set("properties", "{\"MASK_REVERSE\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK_SELECTONFOCUS\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK\":{\"default\":\"\",\"type\":\"STRING\",\"value\":\"\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "text")
	.set("uid", "450eb9a7-28f2-4fc7-bc2b-59bf04b58978")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", true)
	.set("whennew", true)
	.set("whenresult", true)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 2)
)
_form.createComponentIfNotExists(
	"dadc22b0-88e7-4f29-be54-f3459ab64a1a",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "GPS BING Processado")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "gps_bing_processado")
	.set("notnull", false)
	.set("primarykey", false)
	.set("properties", "{\"DEFAULT\":{\"default\":\"true\",\"type\":\"BOOLEAN\",\"value\":\"true\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "checkbox")
	.set("uid", "7aaef97d-7fe6-4623-80e6-50705ad4bed3")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", false)
	.set("whennew", true)
	.set("whenresult", false)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 2)
	.set("y", 5)
)
_form.createComponentIfNotExists(
	"dadc22b0-88e7-4f29-be54-f3459ab64a1a",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "GPS Processado")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "gps_processado")
	.set("notnull", false)
	.set("primarykey", false)
	.set("properties", "{\"DEFAULT\":{\"default\":\"true\",\"type\":\"BOOLEAN\",\"value\":\"true\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "checkbox")
	.set("uid", "22484099-a690-44e4-9df3-bbbd915cbb00")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", false)
	.set("whennew", true)
	.set("whenresult", false)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 5)
)
_form.createComponentIfNotExists(
	"dadc22b0-88e7-4f29-be54-f3459ab64a1a",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Latitude")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "latitude")
	.set("notnull", false)
	.set("primarykey", false)
	.set("properties", "{\"MASK_REVERSE\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK_SELECTONFOCUS\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK\":{\"default\":\"\",\"type\":\"STRING\",\"value\":\"\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "text")
	.set("uid", "9d5e3e40-7a0e-4ad1-87c3-7e75a47efc11")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", false)
	.set("whennew", true)
	.set("whenresult", false)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 4)
)
_form.createComponentIfNotExists(
	"dadc22b0-88e7-4f29-be54-f3459ab64a1a",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Localidade")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "localidade_id")
	.set("notnull", true)
	.set("primarykey", false)
	.set("properties", "{\"MAX_COLUMN_LENGTH\":{\"default\":\"0\",\"type\":\"INTEGER\",\"value\":\"0\"},\"COLUMN_SEPARATOR\":{\"default\":\" - \",\"type\":\"LINK_SEPARATOR\",\"value\":\" - \"},\"LINK\":{\"default\":\"\",\"type\":\"LINK\",\"value\":\"localidade:concelho_id,nome\"},\"SERVICE\":{\"default\":\"com/Select.netuno\",\"type\":\"STRING\",\"value\":\"com/Select.netuno\"},\"ONLY_ACTIVES\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "select")
	.set("uid", "bf18d726-785e-4368-858a-7b8981527be7")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", true)
	.set("whennew", true)
	.set("whenresult", true)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 3)
)
_form.createComponentIfNotExists(
	"dadc22b0-88e7-4f29-be54-f3459ab64a1a",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Longitude")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "longitude")
	.set("notnull", false)
	.set("primarykey", false)
	.set("properties", "{\"MASK_REVERSE\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK_SELECTONFOCUS\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK\":{\"default\":\"\",\"type\":\"STRING\",\"value\":\"\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "text")
	.set("uid", "e2dfa370-ff87-40a8-a6bc-e8e0722e4f36")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", false)
	.set("whennew", true)
	.set("whenresult", false)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 2)
	.set("y", 4)
)
_form.createComponentIfNotExists(
	"dadc22b0-88e7-4f29-be54-f3459ab64a1a",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "N\u00FAmero")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "numero")
	.set("notnull", true)
	.set("primarykey", false)
	.set("properties", "{\"MASK_REVERSE\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK_SELECTONFOCUS\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK\":{\"default\":\"\",\"type\":\"STRING\",\"value\":\"\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "text")
	.set("uid", "0ae3a76d-1e46-48db-8d4b-fa8bde899a49")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", true)
	.set("whennew", true)
	.set("whenresult", true)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 1)
)
