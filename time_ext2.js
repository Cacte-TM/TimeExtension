let lastSyncTime = null; // Dernière heure synchronisée
let localTimeOffset = 0; // Décalage local

// Fonction pour obtenir l'heure UTC depuis une API
async function getUTCTime() {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
    const data = await response.json();
    return new Date(data.utc_datetime).getTime(); // Retourne l'heure en millisecondes (unixtime)
}

// Fonction pour mettre à jour l'heure et le décalage local toutes les 15 secondes
async function updateTimeSync() {
    const utcTime = await getUTCTime();
    lastSyncTime = utcTime; // Mise à jour du dernier temps synchronisé
    localTimeOffset = Date.now() - lastSyncTime; // Calcul du décalage local
}

// Initialisation du mécanisme de synchronisation toutes les 15 secondes
setInterval(updateTimeSync, 15000); // Chaque 15 secondes, on met à jour l'heure

// Définition de l'extension pour TurboWarp
(function (Scratch) {
    'use strict';

    // Création de l'extension
    class TimeExtension {
        // Nom de l'extension
        getInfo() {
            return {
                id: 'timeExtension',
                name: 'Time Extension',
                blocks: [
                    {
                        opcode: 'getTimeSync',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'obtenir l\'heure synchronisée',
                    },
                ],
            };
        }

        // Fonction associée au bloc qui renvoie l'heure synchronisée
        getTimeSync() {
            // Retourne l'heure actuelle avec le décalage calculé
            return Date.now() - localTimeOffset;
        }
    }

    // Enregistrement de l'extension dans Scratch
    Scratch.extensions.register(new TimeExtension());
})(Scratch);
