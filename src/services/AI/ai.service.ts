import axios from "axios";

class AiService {
    async fetchFileUrls(body: any) : Promise<{ urls: string[] }> {
        try {
            const response = await axios.post(`${process.env.AI_MICROSERVICE_URL}/image_search/search`,  body );
            return response.data as { urls: string[] };
        } catch (error) {
            console.error(`Error fetching file urls:`, error);
            throw error;
        }
    }
}

export default AiService;