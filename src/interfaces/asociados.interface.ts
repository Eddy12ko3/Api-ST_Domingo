import { Person } from "./persona.interface";

export interface Associate extends Person {
    folio: number;
    numDocument: number;
}