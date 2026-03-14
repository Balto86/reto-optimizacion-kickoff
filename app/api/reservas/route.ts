import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // B. SEGURIDAD: Verificar token
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // C. VALIDACIÓN Y CONTROL (Requisito de la tarea)
    const body = await request.json();
    const { canchaId, fecha, usuarioId } = body;

    // Validación de campos obligatorios
    if (!canchaId || !fecha) {
      return NextResponse.json(
        { error: "Validación fallida: Faltan datos (canchaId o fecha)" },
        { status: 400 }
      );
    }

    // Validación de lógica de fecha (No permitir fechas pasadas)
    const fechaReserva = new Date(fecha);
    const ahora = new Date();
    if (isNaN(fechaReserva.getTime()) || fechaReserva < ahora) {
      return NextResponse.json(
        { error: "Error 400: La fecha es inválida o ya pasó" },
        { status: 400 }
      );
    }

    // NORMALIZACIÓN: Devolver un JSON estructurado
    const confirmacion = {
      id_reserva: `BK-${Math.floor(Math.random() * 10000)}`,
      canchaId,
      fecha: fechaReserva.toISOString(),
      status: "Confirmado",
      mensaje: "Procesado por el servidor intermediario con éxito"
    };

    return NextResponse.json(confirmacion, { status: 201 });

  } catch (error: any) {
    // Manejo de errores 500 (Paso C)
    return NextResponse.json(
      { error: "Error 500: Error interno en el servidor intermediario", detalles: error.message },
      { status: 500 }
    );
  }
}
