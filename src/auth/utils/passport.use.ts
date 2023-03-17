import passport = require("passport");

// Para indicarle el tipo de estrategia
// Es una instancia de una clase
type TypeStrategy<T, U, X> = { new (params: U, callback: X): T };

// Utilización de 'Passport'
// Función de tipo genérica
export function PassportUse<T extends passport.Strategy, U, X>(
    name: string,
    Strategy: TypeStrategy<T, U, X>,
    params: U,
    callback: X
) {
    // Registrando el passport
    passport.use(name, new Strategy(params, callback));
}
