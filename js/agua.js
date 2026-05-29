// Función para verificar si un número es primo
function esPrimo(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

// Generar serie de consumo usando Fibonacci
function generarSerieFibonacci(base, dias) {
  if (dias <= 0) return [];
  if (dias === 1) return [base];
  let serie = [base, base];
  for (let i = 2; i < dias; i++) {
    let siguiente = serie[i-1] + serie[i-2];
    serie.push(siguiente);
  }
  return serie.slice(0, dias);
}

// Calcular días de autonomía real considerando la serie de consumo
function diasAutonomiaConCrecimiento(capacidad, serieConsumo) {
  let acumulado = 0;
  let diasDuraron = 0;
  for (let i = 0; i < serieConsumo.length; i++) {
    if (acumulado + serieConsumo[i] <= capacidad) {
      acumulado += serieConsumo[i];
      diasDuraron++;
    } else {
      break;
    }
  }
  return { diasDuraron, aguaRestante: capacidad - acumulado };
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
  const resultadosDiv = document.getElementById("resultadosDinamicos");
  resultadosDiv.innerHTML = `<div class="result-box" style="background:#9e2a2b; text-align:center;">❌ ${mensaje}</div>`;
}

// Función principal que analiza el consumo y actualiza la página
function analizarConsumo() {
  const personas = parseInt(document.getElementById("personas").value);
  let consumoDiario = parseFloat(document.getElementById("consumoDiario").value);
  const diasProyectar = parseInt(document.getElementById("dias").value);
  const capacidadTanque = parseFloat(document.getElementById("capacidadTanque").value);

  if (isNaN(personas) || personas <= 0) {
    mostrarError("Ingrese un número válido de personas.");
    return;
  }
  if (isNaN(consumoDiario) || consumoDiario <= 0) {
    mostrarError("El consumo diario debe ser mayor a 0 litros.");
    return;
  }
  if (isNaN(diasProyectar) || diasProyectar <= 0) {
    mostrarError("Días a proyectar deben ser positivos.");
    return;
  }
  if (isNaN(capacidadTanque) || capacidadTanque <= 0) {
    mostrarError("La capacidad del tanque debe ser mayor a 0.");
    return;
  }

  const serieConsumo = generarSerieFibonacci(consumoDiario, diasProyectar);
  const consumoTotalProyectado = serieConsumo.reduce((a, b) => a + b, 0);
  
  const diasPrimos = [];
  serieConsumo.forEach((valor, idx) => {
    let entero = Math.round(valor);
    if (esPrimo(entero)) {
      diasPrimos.push(idx + 1);
    }
  });

  const autonomia = diasAutonomiaConCrecimiento(capacidadTanque, serieConsumo);
  const diasConAgua = autonomia.diasDuraron;
  const restanteFinal = autonomia.aguaRestante;
  const consumoActualEsPrimo = esPrimo(Math.round(consumoDiario));

  let recomendacion = "";
  if (consumoActualEsPrimo) {
    recomendacion = "⚠️ Tu consumo diario actual es un número PRIMO → posible consumo irregular o fuga. ¡Revisa tuberías!";
  } else if (diasConAgua < diasProyectar / 2) {
    recomendacion = "💧 El agua alcanzará para menos de la mitad del tiempo proyectado. Reduce el consumo un 15% o aumenta la reserva.";
  } else if (consumoTotalProyectado > capacidadTanque * 1.2) {
    recomendacion = "📉 El consumo crecerá demasiado con Fibonacci. Aplica riego por goteo y reutiliza agua.";
  } else if (diasConAgua < diasProyectar) {
    recomendacion = "⏳ El agua no alcanzará todos los días proyectados. Ahorra al menos un 10% diario.";
  } else {
    recomendacion = "✅ Buena planificación: tu reserva podría cubrir los días con crecimiento Fibonacci. Continúa monitoreando.";
  }

  const resultadoHTML = `
    <div class="result-box">
      <div class="result-item">
        <span class="result-label">👪 Hogar:</span>
        <span class="result-value">${personas} personas</span>
      </div>
      <div class="result-item">
        <span class="result-label">💧 Consumo base diario:</span>
        <span class="result-value">${consumoDiario} L/día</span>
      </div>
      <div class="result-item">
        <span class="result-label">📈 Consumo total proyectado (${diasProyectar} días con Fibonacci):</span>
        <span class="result-value">${Math.round(consumoTotalProyectado)} L</span>
      </div>
      <div class="result-item">
        <span class="result-label">🗲 Capacidad del tanque:</span>
        <span class="result-value">${capacidadTanque} L</span>
      </div>
      <div class="result-item">
        <span class="result-label">⏳ Días que alcanza el agua (con crecimiento real):</span>
        <span class="result-value">${diasConAgua} días</span>
      </div>
      <div class="result-item">
        <span class="result-label">💦 Agua restante después de ${diasConAgua} días:</span>
        <span class="result-value">${Math.max(0, restanteFinal)} L</span>
      </div>
      ${consumoActualEsPrimo ? `<div class="result-item alerta">
        <span class="result-label">🚨 ALERTA PRIMO (consumo actual):</span>
        <span class="result-value">${Math.round(consumoDiario)} es número primo → revisión urgente</span>
      </div>` : ''}
      ${diasPrimos.length > 0 ? `<div class="result-item alerta">
        <span class="result-label">🔢 Días con consumo PRIMO (crítico):</span>
        <span class="result-value">días ${diasPrimos.join(", ")}</span>
      </div>` : `<div class="result-item">
        <span class="result-label">✅ Consumos primos detectados:</span>
        <span class="result-value">Ninguno (buena estabilidad)</span>
      </div>`}
      <div class="result-item recomendacion">
        <span class="result-label">📢 Recomendación inteligente:</span>
        <span class="result-value" style="font-size:1rem;">${recomendacion}</span>
      </div>
    </div>
    <div style="margin-top:1rem;">
      <details>
        <summary style="color:#90e0ef; cursor:pointer;">🔍 Ver secuencia Fibonacci (consumo diario proyectado)</summary>
        <div class="fibonacci-list">
          ${serieConsumo.map((val, idx) => {
            let enteroVal = Math.round(val);
            let esPrimoVal = esPrimo(enteroVal);
            return `<div style="padding:4px 0;">📆 Día ${idx+1}: ${val.toFixed(1)} L ${esPrimoVal ? '<span class="primo-highlight">⚠️ PRIMO</span>' : ''}</div>`;
          }).join('')}
        </div>
      </details>
    </div>
  `;

  document.getElementById("resultadosDinamicos").innerHTML = resultadoHTML;
}

// Eventos e interactividad extra
document.addEventListener("DOMContentLoaded", () => {
  const botonAnalizar = document.getElementById("btnAnalizar");
  if (botonAnalizar) botonAnalizar.addEventListener("click", analizarConsumo);
  analizarConsumo();

  const btnFib = document.getElementById("verFibonacciBtn");
  const demoFib = document.getElementById("demoFibonacci");
  if (btnFib && demoFib) {
    let expanded = false;
    const fibCorto = "1, 1, 2, 3, 5, 8, 13...";
    const fibLargo = "1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233...";
    btnFib.addEventListener("click", () => {
      if (!expanded) {
        demoFib.textContent = fibLargo;
        btnFib.textContent = "Mostrar menos ➖";
      } else {
        demoFib.textContent = fibCorto;
        btnFib.textContent = "Mostrar más ➕";
      }
      expanded = !expanded;
    });
  }
});