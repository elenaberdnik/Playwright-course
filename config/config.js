import * as dotenv from "dotenv";
dotenv.config();

const config =  {
    baseURL: process.env.BASE_URL,
    baseURLStage: process.env.BASE_URL_STAGE,
    httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME,
        password: process.env.HTTP_CREDENTIALS_PASSWORD,
    },
}

export default config;