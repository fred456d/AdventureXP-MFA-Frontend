const isLocal = window.location.hostname === 'localhost';
export const BASE_URL = isLocal
    ? 'http://localhost:8010/proxy'
    : 'https://adventurexp-g5freqhuangfa9ab.northeurope-01.azurewebsites.net';
