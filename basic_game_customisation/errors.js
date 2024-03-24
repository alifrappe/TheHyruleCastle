"use strict";
// gestion des erreurs
Object.defineProperty(exports, "__esModule", { value: true });
exports.quitError = exports.defaultError = void 0;
// erreur par défault
// Erreur par défault à définir en fonction de la fonction
function defaultError(message) {
    this.message = message;
    this.name = "dafault";
}
exports.defaultError = defaultError;
// Erreur qui prévient l'utilisateur qu'il a arrêté le jeu
// cas 1: quand il choisis cancel dans "set the difficulty"
function quitError() {
    this.message = "You quit.";
    this.name = "quit";
}
exports.quitError = quitError;
