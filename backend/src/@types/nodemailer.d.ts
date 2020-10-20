import { Options } from '@types/nodemailer/lib/mailer';

export interface OptionsExpressHandlebars extends Options {
    template: string;
    context: { [key: string]: string | number };
}
