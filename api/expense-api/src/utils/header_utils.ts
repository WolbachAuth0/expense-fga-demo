import { IncomingHttpHeaders } from "http";

export function getUserIdFromHeaders(headers: IncomingHttpHeaders) {
    return headers.extracted_requester_id; //?.toString() || '';
}

export function getEmailFromHeaders(headers: IncomingHttpHeaders) {
    return headers.extracted_requester_email; //?.toString() || ''
}