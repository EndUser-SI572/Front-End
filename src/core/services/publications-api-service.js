import http from "./http-common"

class PublicationsApiService{
    getAll(){
        return http.get("/publications");
    }
    getTags(){
        return http.get("/tags");
    }

    getPublicationTags(publicationId){
        return http.get(`/publications/${publicationId}/tags`);
    }

    getById(id) {
        return http.get(`/publications/${id}`);
    }

    getByAgricultorId(agricultorId){
        return http.get(`/publications/agricultor/${agricultorId}`);
    }

    create(data, agricultorId) {
        return http.post(`/publications/agricultors/${agricultorId}`,data);
    }

    createTag(data){
        return http.post("/tags", data);
    }

    update(id, data) {
        return http.put(`/publications/${id}`, data);
    }

    delete(id) {
        return http.delete(`/publications/${id}`);
    }

    findByTitle(title) {
        return http.get(`/publications?title=${title}`);
    }
}

export default new PublicationsApiService();