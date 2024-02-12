import { IncomingHttpHeaders } from "http";

export function getUserIdAndEmailFromHeaders(headers: IncomingHttpHeaders) {
    return {
        user_id: headers.extracted_requester_id?.toString() || '', 
        email: headers.extracted_requester_email?.toString() || ''
    };
}