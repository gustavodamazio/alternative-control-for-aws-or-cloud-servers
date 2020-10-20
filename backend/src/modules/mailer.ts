import { ENV } from '@env/config-env';
import * as nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

const transport = nodemailer.createTransport({
    host: ENV.MAIL_HOST,
    port: ENV.MAIL_PORT,
    auth: {
        user: ENV.MAIL_USER,
        pass: ENV.MAIL_PASS
    }
});

const options = {
    viewEngine: {
        extname: '.html', // handlebars extension
        layoutsDir: path.resolve('./src/resources/mail/'), // location of handlebars templates
        defaultLayout: 'forgot-pass', // name of main template
        partialsDir: path.resolve('./src/resources/mail/') // location of your subtemplates aka. header, footer etc
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
};

transport.use(
    'compile',
    hbs(options)
);

export default transport;
