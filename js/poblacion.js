// Función que genera la serie de Fibonacci para crecimiento poblacional
function generarCrecimientoFibonacci(poblacionInicial, años) {
  if (años <= 0) return [];
  if (años === 1) return [poblacionInicial];
  let serie = [poblacionInicial, poblacionInicial];
  for (let i = 2; i < años; i++) {
    let siguiente = serie[i-1] + serie[i-2];
    serie.push(siguiente);
  }
  return serie.slice(0, años);
}

// Función principal para calcular y mostrar resultados
function calcularPoblacion() {
  const poblacionInicial = parseInt(document.getElementById("poblacion").value);
  const años = parseInt(document.getElementById("anios").value);
  const tipoCiudad = document.getElementById("ciudad").value;
  const resultadoDiv = document.getElementById("resultado");

  // Validaciones
  if (isNaN(poblacionInicial) || poblacionInicial <= 0) {
    resultadoDiv.innerHTML = '<div class="result-box" style="background:#9e2a2b;">❌ Ingrese una población inicial válida (mayor a 0).</div>';
    return;
  }
  if (isNaN(años) || años <= 0) {
    resultadoDiv.innerHTML = '<div class="result-box" style="background:#9e2a2b;">❌ Ingrese una cantidad de años válida (mayor a 0).</div>';
    return;
  }

  // Generar proyección Fibonacci
  const proyeccion = generarCrecimientoFibonacci(poblacionInicial, años);
  const poblacionFinal = proyeccion[proyeccion.length - 1];
  const crecimientoTotal = poblacionFinal - poblacionInicial;

  // Recomendación según tipo de ciudad
  let recomendacion = "";
  if (tipoCiudad === "Pequeña" && poblacionFinal > 50000) {
    recomendacion = "⚠️ La ciudad podría saturarse. Planificar expansión de servicios.";
  } else if (tipoCiudad === "Mediana" && poblacionFinal > 200000) {
    recomendacion = "⚠️ Se recomienda infraestructura vial y de agua potable.";
  } else if (tipoCiudad === "Grande" && poblacionFinal > 1000000) {
    recomendacion = "🔴 Alerta: Crecimiento descontrolado. Necesita políticas de ordenamiento territorial.";
  } else {
    recomendacion = "✅ Crecimiento manejable. Monitorear cada 5 años.";
  }

  // Construir tabla de proyección (año a año)
  let tabla = "<table style='width:100%; border-collapse: collapse; margin-top: 1rem;'>";
  tabla += "<tr style='border-bottom: 1px solid #48cae4;'><th>Año</th><th>Población (habitantes)</th></tr>";
  proyeccion.forEach((valor, idx) => {
    tabla += `<tr style='border-bottom: 1px solid rgba(255,255,255,0.2);'>`;
    tabla += `<td style='padding: 0.5rem;'>${idx + 1}</td>`;
    tabla += `<td style='padding: 0.5rem; text-align: right;'>${Math.round(valor).toLocaleString()}</td>`;
    tabla += `</tr>`;
  });
  tabla += "</table>";

  const resultadoHTML = `
    <div class="result-box">
      <div class="result-item"><strong>👥 Población inicial:</strong> ${poblacionInicial.toLocaleString()} hab.</div>
      <div class="result-item"><strong>📅 Años proyectados:</strong> ${años}</div>
      <div class="result-item"><strong>🏙️ Tipo de ciudad:</strong> ${tipoCiudad}</div>
      <div class="result-item"><strong>📈 Población final (Fibonacci):</strong> ${Math.round(poblacionFinal).toLocaleString()} hab.</div>
      <div class="result-item"><strong>📊 Crecimiento total:</strong> ${Math.round(crecimientoTotal).toLocaleString()} hab.</div>
      <div class="result-item"><strong>💡 Recomendación:</strong> ${recomendacion}</div>
      <details>
        <summary style="color:#90e0ef; cursor: pointer; margin-top: 1rem;">📋 Ver proyección año por año</summary>
        ${tabla}
      </details>
    </div>
  `;
  resultadoDiv.innerHTML = resultadoHTML;
}

// Asignar evento al botón después de cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnCalcular");
  if (btn) {
    btn.addEventListener("click", calcularPoblacion);
  }
  // Ejecutar una vez para mostrar datos iniciales
  calcularPoblacion();
});