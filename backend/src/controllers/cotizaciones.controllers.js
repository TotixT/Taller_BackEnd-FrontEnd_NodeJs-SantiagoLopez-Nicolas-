import getConnection from "./../db/database.js";

const getCotizaciones = async (req, res) => {
    const connection = await getConnection();
    const cotizaciones = await connection.query("SELECT id_cotizacion, empleados.nombre_empleado, constructoras.nombre_constructora, fecha_cotizacion, hora_cotizacion, dia_alquiler, duracion_alquiler FROM cotizaciones INNER JOIN empleados ON cotizaciones.fk_id_empleado = empleados.id_empleado INNER JOIN constructoras ON cotizaciones.fk_id_constructora = constructoras.id_constructora");
    res.json(cotizaciones);
    return cotizaciones;
}

const  addCotizaciones = async (req, res) => {
    const connection = await getConnection();
    const { id_cotizacion,fk_id_empleado,fk_id_constructora,fecha_cotizacion,hora_cotizacion,dia_alquiler,duracion_alquiler} = req.body;
    const obj = {id_cotizacion,fk_id_empleado,fk_id_constructora,fecha_cotizacion,hora_cotizacion,dia_alquiler,duracion_alquiler};
    const result = await connection.query("INSERT INTO cotizaciones SET ?", obj);
    res.json({"message": "Cotizacion creada"});
}

const getCotiID = async (req, res) => {
    const { id } = req.params;
    const connection = await getConnection();
    const cotizaciones = await connection.query("SELECT * FROM cotizaciones WHERE id_cotizacion = ?", id);
    res.json(cotizaciones);
    return cotizaciones;
}

const DelCotiID = async (req, res) => {
    const { id } = req.params;
    const connection = await getConnection();
    const cotizaciones = await connection.query("DELETE FROM cotizaciones WHERE id_cotizacion = ?", id);
    res.json({"message": "Cotizacion eliminada"});
}

const updateCotizaciones= async (req, res) => {
    const { id } = req.params;
    const { id_cotizacion,fk_id_empleado,fk_id_constructora,fecha_cotizacion,hora_cotizacion,dia_alquiler,duracion_alquiler} = req.body;
    const obj = {id_cotizacion,fk_id_empleado,fk_id_constructora,fecha_cotizacion,hora_cotizacion,dia_alquiler,duracion_alquiler};
    const connection = await getConnection();
    const cotizaciones = await connection.query("UPDATE cotizaciones SET ? WHERE id_cotizacion = ?", [req.body, id]);
    res.json({"message": "Cotizacion actualizada"});
}

export const methodsCOTI = {
    getCotizaciones,
    addCotizaciones,
    getCotiID,
    DelCotiID,
    updateCotizaciones
}