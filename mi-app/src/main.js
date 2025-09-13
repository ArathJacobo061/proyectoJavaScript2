import dayjs from 'dayjs';
import { diHola } from './saludo.js';

document.getElementById('app').innerHTML = `
  <h1>${diHola('Arath')}</h1>
  <p>Hoy es ${dayjs().format('YYYY-MM-DD HH:mm')}</p>
`;