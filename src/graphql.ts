
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Provider {
    id: string;
    order: number;
    code: string;
    title: string;
    description: string;
    videos: Video[];
}

export abstract class IQuery {
    abstract stakeholder(id: string): Stakeholder | Promise<Stakeholder>;

    abstract provider(code: string): Provider | Promise<Provider>;

    abstract video(id: string): Video | Promise<Video>;

    abstract videos(): Video[] | Promise<Video[]>;
}

export class Stakeholder {
    id: string;
    code: string;
    title: string;
    description?: string;
}

export class Video {
    id: string;
    order: number;
    videoUrl: string;
    title: string;
    description: string;
    stakeholder: Stakeholder;
}
