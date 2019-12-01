import 'dotenv';

const locale = process.env.LOCALE ? process.env.LOCALE : 'en_us';
const validation = require(`./${locale}/validation.json`);
const auth = require(`./${locale}/auth.json`);

export { locale, validation, auth };
