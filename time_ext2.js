let lastSyncTime = null; // Le dernier temps synchronisé avec l'API
let localTimeOffset = 0; // Décalage local basé sur la dernière synchronisation

// Fonction pour obtenir l'heure UTC depuis l'API et mettre à jour le temps
async function syncTime() {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
    const data = await response.json();
    const utcDatetime = data.utc_datetime;

    // Convertir en Unix timestamp (millisecondes)
    const unixTimestamp = new Date(utcDatetime).getTime();

    // Sauvegarder l'heure et le décalage local
    lastSyncTime = unixTimestamp;
    localTimeOffset = Date.now() - lastSyncTime; // Calculer le décalage local par rapport au temps UTC
}

// Fonction pour obtenir le temps synchronisé localement
function getSyncedTime() {
    if (lastSyncTime === null) {
        // Si la synchronisation n'a pas encore eu lieu, on fait l'appel à l'API
        syncTime();
        return 0; // Retourner un timestamp arbitraire jusqu'à la synchronisation
    }

    // Calculer le temps local en ajoutant l'offset au temps actuel
    const syncedTime = lastSyncTime + (Date.now() - lastSyncTime + localTimeOffset);
    return syncedTime;
}

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
                        opcode: 'getSyncedTime',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'obtenir le temps synchronisé UTC',
                    },
                ],
            };
        }

        // Fonction associée au bloc
        async getSyncedTime() {
            // Si le temps n'a pas encore été synchronisé, on le fait maintenant
            if (lastSyncTime === null) {
                await syncTime();
            }
            return getSyncedTime();
        }
    }

    // Enregistrement de l'extension dans Scratch
    Scratch.extensions.register(new TimeExtension());

})(Scratch);

// Mettre à jour le temps toutes les 15 secondes
setInterval(syncTime, 15000); // Synchroniser toutes les 15 secondes
