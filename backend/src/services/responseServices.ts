import Response from '../interfaces/Response'

export async function getAllResponsesStarton (requestId: string): Promise<string[]> {
  return []
}

export async function getResponseDetailsStarton (requestId: string, responseId: string): Promise<Response> {
  return {
    response: 'Response content.'
  }
}

export default {
  getAll: {
    starton: getAllResponsesStarton
  },
  details: {
    starton: getResponseDetailsStarton
  }
}
