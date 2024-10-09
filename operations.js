// Actualizar el campo informativo
function updateInfo(message) {
    document.getElementById('info').textContent = message;
}

// Validación de entrada
function validateNumber(input) {
    const number = parseFloat(input);
    if (isNaN(number)) {
        updateInfo('Error: Por favor, ingresa un número válido.');
        return false;
    }
    return true;
}

// Cuadrado
document.getElementById('square').addEventListener('click', function() {
    const input = document.getElementById('inputField').value;
    if (!validateNumber(input)) return;
    const number = parseFloat(input);
    const result = number * number;
    document.getElementById('inputField').value = result;
    fillInfo(result);
});

// Raíz cuadrada
document.getElementById('sqrt').addEventListener('click', function() {
    const input = document.getElementById('inputField').value;
    if (!validateNumber(input)) return;
    const number = parseFloat(input);
    if (number < 0) {
        updateInfo('Error: La raíz cuadrada de un número negativo no es real.');
    } else {
        const result = Math.sqrt(number);
        document.getElementById('inputField').value = result;
        fillInfo(result);
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
        updateInfo('Error: No se puede calcular el factorial de un número negativo.');
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
    const values = input.split(',').map(Number);
    if (values.some(isNaN)) {
        updateInfo('Error: Todos los valores deben ser números válidos.');
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
    updateInfo(`Lista revertida: ${reversed.join(', ')}`);
});

// Eliminar un elemento de CSV
document.getElementById('csvRemoveElement').addEventListener('click', function() {
    const csvInput = document.getElementById('csvField').value;
    const values = validateCSV(csvInput);
    if (!values) return;
    const element = prompt('¿Qué elemento deseas eliminar?');
    const index = values.indexOf(parseFloat(element));
    if (index === -1) {
        updateInfo(`Error: El elemento ${element} no se encuentra en la lista.`);
    } else {
        values.splice(index, 1);
        updateInfo(`Lista actualizada: ${values.join(', ')}`);
    }
});
