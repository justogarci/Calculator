// Variables para el registro de errores
const errorLog = [];

// Actualizar el campo informativo
function updateInfo(message) {
    document.getElementById('info').textContent = message;
}

// Registrar errores
function logError(message) {
    errorLog.push(message);
    console.error(message); // También se puede ver en la consola
}

// Validación de entrada
function validateNumber(input) {
    if (input.trim() === '') {
        const errorMessage = 'Error: El campo no puede estar vacío.';
        logError(errorMessage);
        updateInfo(errorMessage);
        return false;
    }

    const number = parseFloat(input);
    if (isNaN(number)) {
        const errorMessage = 'Error: Por favor, ingresa un número válido.';
        logError(errorMessage);
        updateInfo(errorMessage);
        return false;
    }
    return true;
}

// Variables globales para almacenar el primer número y el operador
let firstOperand = null;
let operator = null;

// Función para almacenar el primer número y el operador seleccionado
function setOperation(op) {
    const inputField = document.getElementById('inputField');
    if (!validateNumber(inputField.value)) return; // Validar el primer número
    firstOperand = parseFloat(inputField.value);
    operator = op;
    inputField.value = ''; // Limpiar el campo para ingresar el segundo número
}

// Función para calcular el resultado cuando se presiona el botón "="
function eq() {
    const inputField = document.getElementById('inputField');
    if (!validateNumber(inputField.value)) return; // Validar el segundo número
    const secondOperand = parseFloat(inputField.value);
    let result = 0;

    if (operator === 'addition') {
        result = firstOperand + secondOperand;
        updateInfo(`Operation: Addition. Result: ${result}`); // Actualizar el campo informativo
    } else if (operator === 'multiplication') {
        result = firstOperand * secondOperand;
        updateInfo(`Operation: Multiplication. Result: ${result}`); // Actualizar el campo informativo
    } else {
        updateInfo('Error: No operation selected.'); // Mensaje de error si no hay operación
        return;
    }
    // Mostrar el resultado en el campo de entrada
    inputField.value = result;
    // Restablecer las variables después de la operación
    firstOperand = null;
    operator = null;
}

// Event listeners para los botones
document.getElementById('add').addEventListener('click', function() {
    setOperation('addition');
});

document.getElementById('multiply').addEventListener('click', function() {
    setOperation('multiplication');
});

document.getElementById('equal').addEventListener('click', eq);

// Cuadrado
document.getElementById('square').addEventListener('click', function() {
    const input = document.getElementById('inputField').value;
    if (!validateNumber(input)) return;
    const number = parseFloat(input);
    const result = number * number;
    document.getElementById('inputField').value = result;
    updateInfo(result); // Cambia fillInfo por updateInfo
});

// Raíz cuadrada
document.getElementById('sqrt').addEventListener('click', function() {
    const input = document.getElementById('inputField').value;
    if (!validateNumber(input)) return;
    const number = parseFloat(input);
    if (number < 0) {
        const errorMessage = 'Error: La raíz cuadrada de un número negativo no es real.';
        logError(errorMessage);
        updateInfo(errorMessage);
    } else {
        const result = Math.sqrt(number);
        document.getElementById('inputField').value = result;
        updateInfo(result);
    }
});

// Módulo
document.getElementById('modulo').addEventListener('click', function() {
    const input = document.getElementById('inputField').value;
    if (!validateNumber(input)) return;
    const number = parseFloat(input);
    const result = number < 0 ? -number : number;
    document.getElementById('inputField').value = result;
    updateInfo(`El resultado del módulo es ${result}`);
});

// Factorial
document.getElementById('factorial').addEventListener('click', function() {
    const input = document.getElementById('inputField').value;
    if (!validateNumber(input)) return;
    const number = parseInt(input);
    if (number < 0) {
        const errorMessage = 'Error: No se puede calcular el factorial de un número negativo.';
        logError(errorMessage);
        updateInfo(errorMessage);
    } else {
        const result = factorial(number);
        document.getElementById('inputField').value = result;
        updateInfo(`El factorial de ${number} es ${result}`);
    }
});

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Potencia
document.getElementById('exponentiation').addEventListener('click', function() {
    const base = document.getElementById('inputField').value;
    const exponent = document.getElementById('exponentField').value;
    if (!validateNumber(base) || !validateNumber(exponent)) return;
    const result = Math.pow(parseFloat(base), parseFloat(exponent));
    document.getElementById('inputField').value = result;
    updateInfo(`El resultado de elevar ${base} a la potencia de ${exponent} es ${result}`);
});

// Operaciones CSV
function validateCSV(input) {
    if (input.trim() === '') {
        const errorMessage = 'Error: El campo CSV no puede estar vacío.';
        logError(errorMessage);
        updateInfo(errorMessage);
        return false;
    }
    const values = input.split(',').map(Number);
    if (values.some(isNaN)) {
        const errorMessage = 'Error: Todos los valores deben ser números válidos.';
        logError(errorMessage);
        updateInfo(errorMessage);
        return false;
    }
    return values;
}

// Suma CSV
document.getElementById('csvSum').addEventListener('click', function() {
    const csvInput = document.getElementById('csvField').value;
    const values = validateCSV(csvInput);
    if (!values) return;
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    updateInfo(`La suma de los valores es ${sum}`);
});

// Promedio CSV
document.getElementById('csvAvg').addEventListener('click', function() {
    const csvInput = document.getElementById('csvField').value;
    const values = validateCSV(csvInput);
    if (!values) return;
    const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
    updateInfo(`El promedio de los valores es ${avg}`);
});

// Ordenar CSV
document.getElementById('csvSort').addEventListener('click', function() {
    const csvInput = document.getElementById('csvField').value;
    const values = validateCSV(csvInput);
    if (!values) return;
    const sorted = values.sort((a, b) => a - b);
    updateInfo(`Lista ordenada: ${sorted.join(', ')}`);
});

// Revertir CSV
document.getElementById('csvReverse').addEventListener('click', function() {
    const csvInput = document.getElementById('csvField').value;
    const values = validateCSV(csvInput);
    if (!values) return;
    const reversed = values.reverse();
    updateInfoupdateInfo(`Lista revertida: ${reversed.join(', ')}`);
});
// Eliminar un elemento de CSV
document.getElementById('csvRemoveElement').addEventListener('click', function() {
    const csvInput = document.getElementById('csvField').value;
    const values = validateCSV(csvInput);
    if (!values) return;
    const element = prompt('¿Qué elemento deseas eliminar?');
    const index = values.indexOf(parseFloat(element));
    if (index === -1) {
        const errorMessage = `Error: El elemento ${element} no se encuentra en la lista.`;
        logError(errorMessage);
        updateInfo(errorMessage);
    } else {
        values.splice(index, 1);
        updateInfo(`Lista actualizada: ${values.join(', ')}`);
    }
});

// Función para validar la entrada del usuario
function validate(input, type = 'number') {
    // Validar números enteros y decimales (positivos y negativos)
    if (type === 'number') {
        const numberPattern = /^-?\d+(\.\d+)?$/;
        if (!numberPattern.test(input)) {
            const errorMessage = 'Error: Entrada inválida. Debes ingresar un número válido.';
            logError(errorMessage);
            updateInfo(errorMessage);
            return false;
        }
    }

    // Validar listas CSV (números enteros y decimales separados por comas)
    if (type === 'csv') {
        const csvPattern = /^-?\d+(\.\d+)?(,-?\d+(\.\d+)?)*$/;
        if (!csvPattern.test(input)) {
            const errorMessage = 'Error: Entrada inválida. Debes ingresar una lista CSV válida de números.';
            logError(errorMessage);
            return false;
        }
    }

    // Si la validación es exitosa
    return true;
}

// Función para descargar el registro de errores
function downloadErrorLog() {
    const blob = new Blob([errorLog.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'error_log.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Botón para descargar el registro de errores
document.getElementById('downloadLog').addEventListener('click', downloadErrorLog);

document.getElementById('equal').addEventListener('click', function() {
    const image = document.getElementById('animated-img');
    
    // Reiniciar la animación para permitir múltiples ejecuciones
    image.style.transition = 'none';
    image.style.transform = 'translateX(0)';
    
    // Forzar un reflow para que el navegador reconozca el cambio de estado
    void image.offsetWidth;
    
    // Iniciar la animación con un pequeño retardo para asegurar el reflow
    setTimeout(() => {
        image.style.transition = 'transform 2s ease-in-out'; // Duración de 2 segundos
        image.style.transform = 'translateX(100vw)'; // Mover la imagen de izquierda a derecha
    }, 100);
});