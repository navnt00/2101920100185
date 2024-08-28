const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());


const generatePrimes = (n) => {
    const primes = [];
    let i = 2;
    while (primes.length < n) {
        if (primes.every(p => i % p !== 0)) {
            primes.push(i);
        }
        i++;
    }
    return primes;
};

const generateFibonacci = (n) => {
    const fib = [0, 1];
    while (fib.length < n) {
        fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
    }
    return fib.slice(1); 
};

const generateEvens = (n) => {
    const evens = [];
    for (let i = 2; evens.length < n; i += 2) {
        evens.push(i);
    }
    return evens;
};

const generateRandoms = (n, min = 1, max = 100) => {
    const randoms = [];
    while (randoms.length < n) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!randoms.includes(num)) { 
            randoms.push(num);
        }
    }
    return randoms;
};


app.get('/numbers/:id', (req, res) => {
    const numberId = req.params.id;
    let numbers = [];
    
    
    switch (numberId) {
        case 'p': 
            numbers = generatePrimes(4); 
            break;
        case 'f': 
            numbers = generateFibonacci(4);
            break;
        case 'e': 
            numbers = generateEvens(4);
            break;
        case 'r': 
            numbers = generateRandoms(4); 
            break;
        default:
            return res.status(400).json({ error: "Invalid number ID" });
    }

    
    const windowPrevState = []; 
    const windowCurrState = numbers;
    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;

    
    const data = {
        windowPrevState: windowPrevState,
        windowCurrState: windowCurrState,
        numbers: numbers,
        avg: avg.toFixed(2),
    };
    res.json(data);
});


app.listen(9876, () => {
    console.log('Microservice running on http://localhost:9876');
});