export interface IRegistration {
    name: string;
    last_name: string;
    email: string;
    password: string;
    address_main: string;
    address_secondary?: string;
    postcode: string;
    city: string;
    country: string;
}