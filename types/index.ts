
export interface Props {
    params: { slug: string };
}

export interface APIResponse {
    file_id: string,
    mime_type: string
}

export interface Response {
    success: boolean,
    id: string | null
}