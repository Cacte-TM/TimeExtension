class Extension {
  constructor() {
    this.apiUrl = 'https://worldtimeapi.org/api/timezone/Etc/UTC'; // URL de l'API UTC
    this.timestamp = 0;  // Variable pour stocker le dernier timestamp obtenu
    this.syncTime();  // Synchroniser le temps au démarrage
  }

  // Fonction pour synchroniser l'heure UTC avec l'API
  syncTime() {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => {
        // Utilise l'Unix timestamp en secondes, on le multiplie par 1000 pour obtenir les millisecondes
        this.timestamp = data.unixtime * 1000; 
      })
      .catch(error => {
        console.error('Erreur de récupération de l\'heure UTC:', error);
        this.timestamp = 'Erreur';
      });
  }

  // Fonction pour obtenir l'Unix timestamp synchronisé
  getSynchronizedUnixTime() {
    return this.timestamp;  // Retourne le dernier Unix timestamp synchronisé
  }

  getInfo() {
    return {
      id: 'utcUnixTimeExtension',
      name: 'UTC Unix Time Extension',
      blocks: [
        {
          opcode: 'getSynchronizedUnixTime',
          blockType: Scratch.BlockType.REPORTER,
          text: 'obtenir l\'Unix timestamp synchronisé',
          arguments: {}
        }
      ]
    };
  }
}

Scratch.extension.register(new Extension());
