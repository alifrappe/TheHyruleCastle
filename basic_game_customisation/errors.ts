// gestion des erreurs

// erreur par défault
// Erreur par défault à définir en fonction de la fonction
export function defaultError(message) {
    this.message = message;
    this.name = "dafault";
}


// Erreur qui prévient l'utilisateur qu'il a arrêté le jeu
// cas 1: quand il choisis cancel dans "set the difficulty"
export function quitError() {
    this.message = "You quit.";
    this.name = "quit";
}



