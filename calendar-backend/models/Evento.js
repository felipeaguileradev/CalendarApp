const { Schema, model } = require("mongoose");

// definimos el modelo de evento, lo que necesitamos para realizar post, get

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId, // asi le decimos a mongoose que es una referencia
    ref: "Usuario", // hacemos referencia a usuario
    required: true,
  },
});

// esto se ejecuta solo a la hora de verlo no modifica la base de datos
EventoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
});

module.exports = model("Evento", EventoSchema);
