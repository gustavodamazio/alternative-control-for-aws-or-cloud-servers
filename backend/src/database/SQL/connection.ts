import { createConnection } from 'typeorm';

const Connection = createConnection();
console.log('Success connect in SQL db.');
export default Connection;
