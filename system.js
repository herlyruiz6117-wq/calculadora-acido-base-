// Manejo dinámico de campos condicionales (Ka y Kb)
document.getElementById('acid-type').addEventListener('change', function() {
    const kaGroup = document.querySelector('.id-ka');
    kaGroup.style.display = this.value === 'weak' ? 'flex' : 'none';
});

document.getElementById('base-type').addEventListener('change', function() {
    const kbGroup = document.querySelector('.id-kb');
    kbGroup.style.display = this.value === 'weak' ? 'flex' : 'none';
});

// Constante del producto iónico del agua (Kw)
const Kw = 1e-14;

// Función auxiliar para formatear en notación científica si es muy pequeño
function formatValue(val) {
    return val < 0.001 || val > 1000 ? val.toExponential(4) : val.toFixed(4);
}

// CÁLCULOS PARA ÁCIDOS
function calcularAcido() {
    const type = document.getElementById('acid-type').value;
    const conc = parseFloat(document.getElementById('acid-conc').value);
    const resultsDiv = document.getElementById('acid-results');
    
    if (isNaN(conc) || conc <= 0) {
        alert("Por favor, introduce una concentración válida mayor que 0.");
        return;
    }

    let h_concentration = 0;

    if (type === 'strong') {
        // Ácido fuerte: [H+] = Concentración inicial
        h_concentration = conc;
    } else {
        // Ácido débil: Requiere constante Ka
        const ka = parseFloat(document.getElementById('acid-ka').value);
        if (isNaN(ka) || ka <= 0) {
            alert("Por favor, introduce un valor válido para Ka.");
            return;
        }
        // Resolución exacta usando la ecuación cuadrática: x^2 + Ka*x - Ka*C = 0
        h_concentration = (-ka + Math.sqrt(Math.pow(ka, 2) + 4 * ka * conc)) / 2;
    }

    // Cálculos derivados
    const pH = -Math.log10(h_concentration);
    const oh_concentration = Kw / h_concentration;
    const pOH = 14 - pH;

    // Renderizar resultados
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = `
        <h4>Resultados del Análisis:</h4>
        <p><strong>pH:</strong> ${pH.toFixed(2)}</p>
        <p><strong>pOH:</strong> ${pOH.toFixed(2)}</p>
        <p><strong>Concentración de protones [H⁺]:</strong> ${formatValue(h_concentration)} M</p>
        <p><strong>Concentración de hidroxilos [OH⁻]:</strong> ${formatValue(oh_concentration)} M</p>
    `;
}

// CÁLCULOS PARA BASES
function calcularBase() {
    const type = document.getElementById('base-type').value;
    const conc = parseFloat(document.getElementById('base-conc').value);
    const resultsDiv = document.getElementById('base-results');
    
    if (isNaN(conc) || conc <= 0) {
        alert("Por favor, introduce una concentración válida mayor que 0.");
        return;
    }

    let oh_concentration = 0;

    if (type === 'strong') {
        // Base fuerte: [OH-] = Concentración inicial
        oh_concentration = conc;
    } else {
        // Base débil: Requiere constante Kb
        const kb = parseFloat(document.getElementById('base-kb').value);
        if (isNaN(kb) || kb <= 0) {
            alert("Por favor, introduce un valor válido para Kb.");
            return;
        }
        // Resolución exacta usando la ecuación cuadrática: x^2 + Kb*x - Kb*C = 0
        oh_concentration = (-kb + Math.sqrt(Math.pow(kb, 2) + 4 * kb * conc)) / 2;
    }

    // Cálculos derivados
    const pOH = -Math.log10(oh_concentration);
    const pH = 14 - pOH;
    const h_concentration = Kw / oh_concentration;

    // Renderizar resultados
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = `
        <h4>Resultados del Análisis:</h4>
        <p><strong>pH:</strong> ${pH.toFixed(2)}</p>
        <p><strong>pOH:</strong> ${pOH.toFixed(2)}</p>
        <p><strong>Concentración de hidroxilos [OH⁻]:</strong> ${formatValue(oh_concentration)} M</p>
        <p><strong>Concentración de protones [H⁺]:</strong> ${formatValue(h_concentration)} M</p>
    `;
}
