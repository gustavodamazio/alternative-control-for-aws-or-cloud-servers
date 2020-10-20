import { ENV } from '@env/config-env';
import mongoose from 'mongoose';

if (ENV.MONGO_DB) {
    mongoose
        .connect(ENV.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
        .then(() => {
            console.log('Success connect in NoSQL db.');
        })
        .catch((err) => {
            console.error('Error in database connection.');
            throw new Error(err.message);
        });
} else {
    throw new Error(`fail to connect in db because process.env.MONGO_DB not existis.`);
}

export default mongoose;
