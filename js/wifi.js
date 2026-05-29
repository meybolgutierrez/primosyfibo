// Función para saber si un número es primo
function esPrimo(numero) {
  if (numero <= 1) return false;
  for (let i = 2; i < numero; i++) {
    if (numero % i === 0) return false;
  }
  return true;
}

// Función principal de optimización
function optimizarWifi() {
  let redes = parseInt(document.getElementById("redes").value);
  let canal = parseInt(document.getElementById("canal").value);
  let lugar = document.getElementById("lugar").value;
  let interferencia = document.getElementById("interferencia").value;
  let resultado = document.getElementById("resultado");

  // Validación
  if (isNaN(redes) || isNaN(canal)) {
    resultado.innerHTML = `<div class="result-box bad">❌ Complete correctamente los campos.</div>`;
    return;
  }

  // Verificar si el canal actual es primo
  let primo = esPrimo(canal);

  // Generar lista de canales primos hasta 20 (rango común WiFi 2.4 GHz)
  let canalesPrimos = [];
  for (let i = 2; i <= 20; i++) {
    if (esPrimo(i)) {
      canalesPrimos.push(i);
    }
  }

  // Nivel de riesgo
  let riesgo = "";
  let barras = "";
  if (interferencia === "Alta" || redes > 15) {
    riesgo = "🔴 Interferencia ALTA";
    barras = "🟥🟥⬜⬜⬜";
  } else if (interferencia === "Media" || redes > 8) {
    riesgo = "🟡 Interferencia MEDIA";
    barras = "🟨🟨🟨⬜⬜";
  } else {
    riesgo = "🟢 Interferencia BAJA";
    barras = "🟩🟩🟩🟩⬜";
  }

  // Recomendación final
  let recomendacion = "";
  if (primo) {
    recomendacion = "✅ Tu canal actual es primo. Tiene menor probabilidad de interferencia repetitiva.";
  } else {
    recomendacion = "⚠️ El canal actual NO es primo. Se recomienda cambiar a canales primos.";
  }

  // Mostrar resultados
  resultado.innerHTML = `
    <div class="result-box">
      <div class="result-item"><strong>📶 Redes cercanas:</strong> ${redes}</div>
      <div class="result-item"><strong>📡 Canal actual:</strong> ${canal}</div>
      <div class="result-item"><strong>🏢 Tamaño del lugar:</strong> ${lugar}</div>
      <div class="result-item"><strong>⚠️ Estado de interferencia:</strong> ${riesgo}</div>
      <div class="wifi-bars">${barras}</div>
      <hr style="margin:15px 0;">
      <div class="result-item">
        ${primo ? "<span class='good'>✅ El canal es número primo.</span>" : "<span class='bad'>❌ El canal NO es número primo.</span>"}
      </div>
      <div class="result-item">
        <strong>📡 Canales primos recomendados:</strong> ${canalesPrimos.join(", ")}
      </div>
      <div class="result-item">
        <strong>💡 Recomendación:</strong> ${recomendacion}
      </div>
    </div>
  `;
}

// Asignar evento al botón después de cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnOptimizar");
  if (btn) btn.addEventListener("click", optimizarWifi);
});