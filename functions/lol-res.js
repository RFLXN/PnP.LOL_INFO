class LolMatchDataExtractor {
  #_matchData;

  constructor(matchDataResponse) {
    this.#_matchData = matchDataResponse;
  }

  get matchData() {
    return this.#_matchData;
  }

  set matchData(matchData) {
    throw new Error("matchData is readonly");
  }

  get #info() {
    return this.matchData.info;
  }

  get #meta() {
    return this.matchData.metadata;
  }

  /**
   * get match id
   * @returns {string} match id
   */
  get matchId() {
    return this.#meta.matchId;
  }

  /**
   * get participant puuids
   * @returns {Array<string>} array of participant puuids
   */
  get participantsId() {
    return this.#meta.participants;
  }

  /**
   * get game id
   * @returns {number} game id
   */
  get gameId() {
    return this.#info.gameId;
  }

  /**
   * get game duration (unit is seconds)
   * @returns {number} duration of game
   */
  get gameDuration() {
    return this.#info.gameDuration;
  }

  /**
   * get game creation unix timestamp
   * @returns {number} game creation date
   */
  get gameCreation() {
    return this.#info.gameCreation;
  }

  /**
   * get game end unix timestamp
   * @returns {number} game end date
   */
  get gameEnd() {
    return this.#info.gameEndTimestamp;
  }

  /**
   * get game mode name
   * @returns {string} game mode name;
   */
  get gameMode() {
    return this.#info.gameMode;
  }

  /**
   * get game map id (you should refer to LolAssetManager.getMaps())
   * @returns {number} map id
   */
  get mapId() {
    return this.#info.mapId;
  }

  /**
   * get LolMatchParticipantDataExtractor array
   * @returns {Array<LolMatchParticipantDataExtractor>} LolMatchParticipantDataExtractor array
   */
  get participants() {
    return this.#info.participants.map(participant => new LolMatchParticipantDataExtractor(participant));
  }
}

class LolMatchParticipantDataExtractor {
  #_participant;

  constructor(participant) {
    this.#_participant = participant;
  }

  get participant() {
    return this.#_participant;
  }

  set participant(participant) {
    throw new Error("participant is readonly");
  }

  /**
   * get player puuid
   * @returns {string} puuid
   */
  get puuid() {
    return this.participant.puuid;
  }

  /**
   * get summoner name
   * @returns {string} summoner name
   */
  get summonerName() {
    return this.participant.summonerName;
  }

  /**
   * get team id
   * @returns {number} team id
   */
  get teamId() {
    return this.participant.teamId;
  }

  /**
   * get champion name
   * @returns {string} champion name
   */
  get championName() {
    return this.participant.championName;
  }

  /**
   * get champion id
   * @returns {number} champion id
   */
  get championId() {
    return this.participant.championId;
  }

  /**
   * get position (lanne)
   * @returns {"TOP" | "MIDDLE" | "JUNGLE" | "SUPPORT" | "BOTTOM"} position
   */
  get position() {
    return this.participant.lane;
  }

  /**
   * get champion level
   * @returns {number} champion level
   */
  get level() {
    return this.participant.champLevel;
  }

  /**
   * get kills
   * @returns {number} kills
   */
  get kills() {
    return this.participant.kills;
  }

  /**
   * get deaths
   * @returns {number} deaths
   */
  get deaths() {
    return this.participant.deaths;
  }

  /**
   * get assists
   * @returns {number} assists
   */
  get assists() {
    return this.participant.assists;
  }

  /**
   * get kda
   * @returns {number} kda
   */
  get kda() {
    return this.participant.challenges.kda;
  }

  /**
   * get earned gold
   * @returns {number} earned gold
   */
  get earnedGold() {
    return this.participant.goldEarned;
  }

  /**
   * get spent gold
   * @returns {number} spent gold
   */
  get spentGold() {
    return this.participant.goldSpent;
  }

  /**
   * get gold per minute
   * @returns {number} gold per minute
   */
  get goldPerMinute() {
    return this.participant.challenges.goldPerMinute;
  }

  /**
   * get total dealt champion damage
   * @returns {number} damage
   */
  get dealtChampionDamage() {
    return this.participant.totalDamageDealtToChampions;
  }

  /**
   * get total taken damage
   * @returns {number} damage
   */
  get takenDamage() {
    return this.participant.totalDamageTaken;
  }

  /**
   * get taken team damage percentage (value between 0~1)
   * @returns {number} percentage
   */
  get takenTeamDamagePercentage() {
    return this.participant.challenges.damageTakenOnTeamPercentage;
  }

  /**
   * get given CC time
   * @returns {number} CC time;
   */
  get givenCcTime() {
    return this.participant.timeCCingOthers;
  }

  /**
   * get item ids / if item id == 0, it's empty item
   * @returns {Array<number>} array of item ids
   */
  get items() {
    const slot1 = this.participant.item0;
    const slot2 = this.participant.item1;
    const slot3 = this.participant.item2;
    const slot4 = this.participant.item3;
    const slot5 = this.participant.item4;
    const slot6 = this.participant.item5;
    const slot7 = this.participant.item6;

    return [slot1, slot2, slot3, slot4, slot5, slot6, slot7];
  }

  /**
   * get total minion kills (CS)
   * @returns {number} minion kills
   */
  get minionKills() {
    return this.participant.totalMinionsKilled;
  }

  /**
   * get placed wards
   * @returns {number} placed wards
   */
  get placedWard() {
    return this.participant.wardsPlaced;
  }

  /**
   * get killed wards
   * @returns {number} killed wards
   */
  get killedWard() {
    return this.participant.wardsKilled;
  }

  /**
   * get placed control wards
   * @returns {number} placed control wards
   */
  get placedControlWard() {
    return this.participant.challenges.controlWardsPlaced;
  }

  /**
   * get vision score
   * @returns {number}
   */
  get visionScore() {
    return this.participant.visionScore;
  }

  /**
   * get dragon kills
   * @returns {number} dragon kills
   */
  get dragonKills() {
    return this.participant.dragonKills;
  }

  /**
   * get baron kills
   * @returns {number} baron kills
   */
  get baronKills() {
    return this.participant.baronKills;
  }

  /**
   * get damage per minute
   * @returns {number} damage per minute
   */
  get dpm() {
    return this.participant.challenges.damagePerMinute;
  }

  get perks() {
    return new LolMatchParticipantPerkDataExtractor(this.participant.perks);
  }
}

class LolMatchParticipantPerkDataExtractor {
  #_perks;

  constructor(perks) {
    this.#_perks = perks;
  }

  get perks() {
    return this.#_perks;
  }

  set perks(perks) {
    throw new Error("perks is readonly");
  }

  /**
   * get stat perks data
   * @returns {{offense:number, flex: number, defense: number}}
   */
  get statPerks() {
    return this.perks.statPerk;
  }

  /**
   * get offense stat perk id
   * @returns {number} perk id
   */
  get offenseStatPerk() {
    return this.statPerks.offense;
  }

  /**
   * get flex stat perk id
   * @returns {number} perk id
   */
  get flexStatPerk() {
    return this.statPerks.flex;
  }

  /**
   * get defense stat perk id
   * @returns {number} perk id
   */
  get defenseStatPerk() {
    return this.statPerks.defense;
  }

  /**
   * get primary perk data
   * @returns {{description: string, selections: Array, style: number}}
   */
  get primaryPerks() {
    return this.perks.styles.filter(perkData => perkData.description === "primaryStyle")[0];
  }

  /**
   * get primary perk id
   * @returns {number} perk id
   */
  get primaryPerkId() {
    return this.primaryPerks.style;
  }

  /**
   * get primary perk selections
   * @returns {Array<{perk: number, var1: number, var2: number, var3: number}>}
   */
  get primaryPerkSelections() {
    return this.primaryPerks.selections;
  }

  /**
   * get sub perk data
   * @returns {{description: string, selections: Array, style: number}}
   */
  get subPerks() {
    return this.perks.styles.filter(perkData => perkData.description === "subStyle")[0];
  }

  /**
   * get sub perk id
   * @returns {number} perk id
   */
  get subPerkId() {
    return this.subPerks.style;
  }

  /**
   * get sub perk selections
   * @returns {Array<{perk: number, var1: number, var2: number, var3: number}>}
   */
  get subPerkSelections() {
    return this.subPerks.selections;
  }
}

export { LolMatchParticipantPerkDataExtractor, LolMatchDataExtractor, LolMatchParticipantDataExtractor };
