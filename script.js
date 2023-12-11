const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const VER_HISTORIAL = document.getElementById('verHistorial');

let historialCalculos = [];

CALCULAR.addEventListener('click', () => {
    const DATO = parseFloat(document.getElementById('peso').value);

    if (!isNaN(DATO) && DATO > 0) {
        ERROR.style.display = 'none';

        let { flujo, mantenimiento } = calcularFlujoMantenimiento(DATO);

        flujo = flujo.toFixed(2);
        mantenimiento = mantenimiento.toFixed(2);

        FLU.innerHTML = flujo + ' cc/hr';
        MAN.innerHTML = 'm+m/2 ' + mantenimiento + ' cc/hr';
        FLU.style.display = 'block';
        MAN.style.display = 'block';

        historialCalculos.push({ peso: DATO, flujo, mantenimiento });
    } else {
        ERROR.style.display = 'block';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
    }
});

VER_HISTORIAL.addEventListener('click', () => {
    mostrarHistorial();
});

function mostrarHistorial() {
    
    alert("Historial de Cálculos:\n" + JSON.stringify(historialCalculos, null, 2));
}

function calcularFlujoMantenimiento(peso) {
    let resto = peso;
    let flujo = 0;

    if (resto > 20) {
        let aux = resto - 20;
        flujo += aux * 1;
        resto -= aux;
    }

    if (resto > 10) {
        let aux = resto - 10;
        flujo += aux * 2;
        resto -= aux;
    }

    flujo += resto * 4;

    let mantenimiento = flujo * 1.5;

    return { flujo, mantenimiento };
}
