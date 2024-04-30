import http from "./http-common"

class AgricultorsApiService {
    getAll() {
        return http.get("/agricultors");
    }

    getById(id) {
        return http.get(`/agricultors/${id}`);
    }

    create(data) {
        return http.post("/agricultors", data);
    }

    update(id, data) {
        return http.put(`/agricultors/${id}`, data);
    }

    delete(id) {
        return http.delete(`/agricultors/${id}`);
    }

    findByName(name) {
        return http.get(`/agricultors/name/${name}`);
    }

    findByGenre(genre){
        return http.get(`/agricultors/genre/${genre}`);
    }
    
    findByEmail(email){
        return http.get(`/agricultors/email/${email}`);
    }

}

export default new AgricultorsApiService();