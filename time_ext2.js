let lastSyncTime = null; // Dernier temps synchronisé
let localTimeOffset = 0; // Décalage local

// Fonction pour obtenir l'heure UTC depuis l'API
async function syncTime() {
    try {
        console.log("Appel à l'API pour synchroniser l'heure...");
        const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
        const data = await response.json();
        const utcDatetime = data.utc_datetime;
        const unixTimestamp = new Date(utcDatetime).getTime();

        // Mise à jour des variables
        lastSyncTime = unixTimestamp;
        localTimeOffset = Date.now() - lastSyncTime;
        console.log(`Temps synchronisé : ${unixTimestamp}`);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'heure UTC :", error);
    }
}

// Fonction pour obtenir l'heure synchronisée
function getSyncedTime() {
    if (lastSyncTime === null) {
        console.log("Temps non synchronisé, appel à l'API...");
        syncTime();
        return 0; // Retourner un timestamp arbitraire jusqu'à la synchronisation
    }

    // Calculer le temps synchronisé
    const syncedTime = lastSyncTime + (Date.now() - lastSyncTime + localTimeOffset);
    console.log(`Temps synchronisé (calculé) : ${syncedTime}`);
    return syncedTime;
}

// Définition de l'extension pour TurboWarp
(function (Scratch) {
    'use strict';

    class TimeExtension {
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
            if (lastSyncTime === null) {
                console.log("Synchronisation en cours...");
                await syncTime();
            }
            return getSyncedTime();
        }
    }

    // Enregistrement de l'extension
    Scratch.extensions.register(new TimeExtension());

})(Scratch);

// Mettre à jour le temps toutes les 15 secondes
setInterval(syncTime, 15000);
