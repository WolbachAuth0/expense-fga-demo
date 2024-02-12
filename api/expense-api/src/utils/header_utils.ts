import { IncomingHttpHeaders } from "http";

export function getUserIdFromHeaders(headers: IncomingHttpHeaders) {
    return headers.extracted_requester_email; //?.toString() || '';
}

export function getEmailFromHeaders(headers: IncomingHttpHeaders) {
    return headers.extracted_requester_email; //?.toString() || ''
}