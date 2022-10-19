export interface Mission {
    title: String;
    tag: String[];
    missionImg: String;
    target: number;
    avancementCount: number;
    description: String;
    percentage: String;
    globalRank: String | undefined;
}