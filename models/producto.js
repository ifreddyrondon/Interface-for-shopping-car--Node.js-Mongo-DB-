var Schema = require('mongoose').Schema

var producto_schema = new Schema({
  titulo						: 	{ type: String,	 required: true },
  summary						: 	{ type: String,  required: true }, //browser title
  descripcion				:		{ type: String,  required: true },
  precio						: 	{ type: Number,  required: true, trim: true	},
  peso							: 	{ type: Number,  required: true, trim: true	},
  tamano						: 	{ type: Number,  required: true, trim: true	},
  cantidad_inicial	:  	{ type: Number,  required: true, trim: true	},
  cantidad_restante	:  	{ type: Number,	 required: true, trim: true	},
  publicado					:		{ type: Boolean, required: true },
  disponibilidad		:		{ type: Boolean, required: true },
  tags							:		{ type: Array },
  images						:	 	{ type: Array },
  creado  					: 	{ type: Date, default: Date.now },
  modificado				:	  { type: Date, default: Date.now },
  variaciones				: 	{ type: Array },  
  proveedor					: 	{ type: Array },
  categoria					:  [{ type: Schema.Types.ObjectId, ref: 'categoria_schema' }],
});

var categoria_schema = new Schema({
	titulo						: 	{ type: String, required: true },
  descripcion				: 	{ type: String },
  parent						: 	{ type: Schema.Types.ObjectId, ref: 'categoria_schema' },
  images						: 	{ type: Array },
});
  
module.exports = producto_schema;
module.exports = categoria_schema;