export type INote = {
    id: number;
    title: string,
    body: string,
    is_new?: boolean,
    is_favorite?: boolean,
    color?: string,
    visible_blockColor?: boolean,
}