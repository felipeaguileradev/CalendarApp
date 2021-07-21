/*
    Event Routes
    /appi/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

const router = Router();

// todas tienen que pasar por la validacion jwt
// si necesito validar el token en cada evento puedo aplicar el middleware de la sig manera
// validara todas las que estan debajo de use,
// si hay una sobre use quedará como publica
router.use(validarJWT);

// obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar un evento
router.put("/:id", actualizarEvento);

// Borrar un evento
router.delete("/:id", eliminarEvento);

module.exports = router;
