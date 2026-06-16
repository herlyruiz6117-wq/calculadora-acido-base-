document.addEventListener("DOMContentLoaded", () => {
    
    // === INTERACTIVIDAD DE MENÚS (MOSTRAR / OCULTAR CONSTANTES) ===
    const acidType = document.getElementById("acid-type");
    const kaContainer = document.getElementById("ka-acid-container");
    
    acidType.addEventListener("change", () => {
        if (acidType.value === "weak") {
            kaContainer.classList.remove("hidden");
        } else {
            kaContainer.classList.add("hidden");
        }
    });

    const baseType = document.getElementById("base-type");
    const kbContainer = document.getElementById("kb-base-container");

    baseType.addEventListener("change", () => {
        if (baseType.value === "weak") {
            kbContainer.classList.remove("hidden");
        } else {
            kbContainer.classList.add("hidden");
        }
    });

    // === CÁLCULOS PARA ÁCIDOS ===
    document.getElementById("btn-calculate-acid").addEventListener("click", () => {
        const type = acidType.value;
        const conc = parseFloat(document.getElementById("acid-conc").value);
        const resultsDiv = document.getElementById("acid-results");

        if (isNaN(conc) || conc <= 0) {
            alert("Por favor, ingresa una concentración válida mayor a 0.");
            return;
        }

        let hConc = 0;

        if (type === "strong") {
            hConc = conc;
        } else {
            const ka = parseFloat(document.getElementById("acid-ka").value);
            if (isNaN(ka) || ka <= 0) {
                alert("Por favor, ingresa una constante Ka válida.");
                return;
            }
            // Fórmula aproximada para ácidos débiles: [H+] = √(Ka * C)
            hConc = Math.sqrt(ka * conc);
        }

        const ph = -Math.log10(hConc);
        const poh = 14 - ph;
        const ohConc = Math.pow(10, -poh);

        resultsDiv.innerHTML = `
            <h4>Resultados del Ácido:</h4>
            <p><strong>pH:</strong> ${ph.toFixed(2)}</p>
            <p><strong>pOH:</strong> ${poh.toFixed(2)}</p>
            <p><strong>[H<sup>+</sup>]:</strong> ${hConc.toExponential(4)} M</p>
            <p><strong>[OH<sup>-</sup>]:</strong> ${ohConc.toExponential(4)} M</p>
        `;
        resultsDiv.classList.remove("hidden");
    });

    // === CÁLCULOS PARA BASES ===
    document.getElementById("btn-calculate-base").addEventListener("click", () => {
        const type = baseType.value;
        const conc = parseFloat(document.getElementById("base-conc").value);
        const resultsDiv = document.getElementById("base-results");

        if (isNaN(conc) || conc <= 0) {
            alert("Por favor, ingresa una concentración válida mayor a 0.");
            return;
        }

        let ohConc = 0;

        if (type === "strong") {
            ohConc = conc;
        } else {
            const kb = parseFloat(document.getElementById("base-kb").value);
            if (isNaN(kb) || kb <= 0) {
                alert("Por favor, ingresa una constante Kb válida.");
                return;
            }
            // Fórmula aproximada para bases débiles: [OH-] = √(Kb * C)
            ohConc = Math.sqrt(kb * conc);
        }

        const poh = -Math.log10(ohConc);
        const ph = 14 - poh;
        const hConc = Math.pow(10, -ph);

        resultsDiv.innerHTML = `
            <h4>Resultados de la Base:</h4>
            <p><strong>pH:</strong> ${ph.toFixed(2)}</p>
            <p><strong>pOH:</strong> ${poh.toFixed(2)}</p>
            <p><strong>[H<sup>+</sup>]:</strong> ${hConc.toExponential(4)} M</p>
            <p><strong>[OH<sup>-</sup>]:</strong> ${ohConc.toExponential(4)} M</p>
        `;
        resultsDiv.classList.remove("hidden");
    });
});
